# Register Upgrade

It was only right to start Tomato with the conventional **32 general-purpose registers**. But there was an obvious waste: the discrete register file was already going to use parallel asynchronous SRAMs with thousands of available addresses.

## From 32 GPR to 32,768 GPR

> **Note — Why 32,768 GPR?**
>
> Tomato exposes **32,768 32-bit GPR locations** because the selected discrete SRAMs (**AS6C62256-55PCN**, 32K × 8) already provide a full **15-bit address space**. The chips, buses, and mirrored 3R1W structure are already in the design — exposing anything less would leave usable address depth disconnected.
>
> As absurd as it sounds, Tomato's architectural GPR space is therefore **half the size of the 65,536 × 32-bit physical register file in a single NVIDIA Blackwell SM** (for their own multi-thread purposes — Tomato is one architectural context, not an SM).

```mermaid
flowchart LR
  A["32 GPR"] --> B["256 GPR"] --> C["32,768 GPR"]
  style A fill:#efe9d8,stroke:#8b1e1e,color:#1a1612
  style B fill:#e8e3d4,stroke:#8b1e1e,color:#1a1612
  style C fill:#8b1e1e,stroke:#1a1612,color:#f4f0e6
```

The evolution is:

1. **32 GPR** — `register:5`
2. **256 GPR** — add the existing `bank:3`
3. **32,768 GPR** — add a latched `superbank:7`

So the final SRAM address becomes:

```text
[ superbank:7 ][ bank:3 ][ register:5 ]
```

$$
7 + 3 + 5 = 15
$$

$$
2^{15} = 32{,}768\text{ 32-bit register locations}
$$

The important part is that the 7-bit secondary bank is **not carried inside every ordinary instruction**.

It is architectural state.

A dedicated custom instruction changes it:

```text
SETBANK2 0x03
```

Conceptually:

```text
superbank_latch <- 0x03
```

Every following register access then automatically becomes:

```text
physical_address = { superbank_latch, bank, register }
```

So one operation changes the entire visible **256-register window** without copying registers, spilling them to RAM, or widening normal instructions.

The existing instruction format remains:

```text
[ opcode:9 ][ A:5 ][ B:5 ][ C/D:5 ][ bank:3 ]
```

while the upper seven address bits persist in the latch until another `SETBANK2` changes them.

---

## Why plain SRAM gives Tomato 3R1W

Tomato's ALU needs three independent register operands, so the register file needs **three reads and one write (3R1W)**.

A normal asynchronous SRAM does not provide that directly, so I mirror the register file three times.

Four ×8 SRAMs in parallel make one 32-bit mirror:

```text
4 × (32K × 8) = 32K × 32
```

Three identical mirrors then provide the three read ports:

```text
             READ A        READ B        READ C
            Mirror A      Mirror B      Mirror C
             SRAM ×4       SRAM ×4       SRAM ×4
                ↑             ↑             ↑
                └──── broadcast write ─────┘
```

Every write address and 32-bit write value is sent to all three mirrors, keeping them identical. During reads, each mirror receives an independent address.

That gives Tomato its effective **3R1W register file using 12 ordinary SRAM chips**, without requiring exotic multiported memory.

---

## The waste that started this

The original 32-register file used only:

$$
\frac{32}{8192}\times100 = 0.390625\%
$$

of an 8K-deep SRAM.

That's **0.39% utilization** and **99.61% of the address depth unused**.

Adding Tomato's existing 3-bit bank field improved this to:

$$
32\times8 = 256\text{ GPR}
$$

but even then:

$$
\frac{256}{8192}\times100 = 3.125\%
$$

Only **3.125% utilization**.

At that point I was already paying for the SRAMs, PCB area, 32-bit buses, and three mirrored copies. The unused depth was simply sitting there.

---

## SRAM Upgrade: AS6C6264 → AS6C62256

A closer look at the SRAM options made the final decision almost ridiculous:

|                             |       AS6C6264 | **AS6C62256-55PCN** |
| --------------------------- | -------------: | ------------------: |
| Organization                |         8K × 8 |         **32K × 8** |
| Capacity                    |        64 Kbit |        **256 Kbit** |
| Address bits                |             13 |              **15** |
| 32-bit addresses per mirror |          8,192 |          **32,768** |
| Access time                 |          55 ns |           **55 ns** |
| Supply                      |      2.7–5.5 V |       **2.7–5.5 V** |
| Interface                   | Async parallel |  **Async parallel** |
| Chips needed for 3R1W       |             12 |              **12** |
| Approx. 12-chip cost\*      |       ~USD 114 |        **~USD 122** |

\*Pricing observed during this comparison; distributor and quantity pricing will move.

For roughly **USD 7 more across the entire register file**, the AS6C62256 gives **4× the depth**, with the same number of SRAM chips and the same 55 ns access class.

So instead of deliberately leaving two address lines unused, I am exposing the full device:

```text
128 superbanks
× 8 primary banks
× 32 registers
=
32,768 GPR
```

And yes, that number is absurd.

---

## How absurd?

For perspective:

| Architecture     |    Integer / register space |
| ---------------- | --------------------------: |
| x86-64           |                      **16** |
| ARM AArch64      |                      **31** |
| RISC-V RV32I     |                      **32** |
| NVIDIA Blackwell |    **up to 255 per thread** |
| **Tomato**       | **32,768 32-bit locations** |

So Tomato has:

- **2,048×** the architectural register count of x86-64
- about **1,057×** the count of AArch64
- exactly **1,024×** the 32-register space of RV32I
- about **128×** NVIDIA Blackwell's maximum register allocation to a single thread

That comparison needs one important qualification: modern GPUs have enormous physical register files because they maintain state for many threads simultaneously. NVIDIA Blackwell, for example, physically provides **65,536 32-bit registers per SM**, even though an individual thread can use at most **255**.

So Tomato is not somehow "bigger than a Blackwell register file."

The strange part is different:

**Tomato exposes 32,768 32-bit register locations to one architectural CPU context through hierarchical banking.**

That is not a vanity target. The discrete AS6C62256 SRAMs physically present **15 address bits** — $2^{15} = 32{,}768$ locations per 32-bit mirror. Going any less means leaving address pins unconnected on chips Tomato already buys, routes, and mirrors three times for 3R1W. **Using fewer than 32,768 GPR would be a waste of the silicon already on the board.**

For comparison, RISC-V deliberately describes **32 integer registers** as a conventional base-ISA size. Tomato ends up with 1,024× that count because the physical discrete parts come with fifteen address lines — and once twelve of those SRAMs are in the BOM, **not wiring the remaining bits requires more justification than wiring them.**

That is the part I find interesting.

A completely flat 32K-register ISA would be terrible for Tomato: selecting one of 32,768 registers requires **15 bits per operand**.

With three sources and a destination, that could consume:

$$
4\times15 = 60\text{ bits}
$$

just naming registers.

Instead, Tomato keeps the common 5-bit register fields and amortizes the upper address bits across instructions:

```text
SETBANK2 0x57

ADD r4, r7, r12
MUL r2, r9, r20
...
```

All of those normal instructions operate inside the window selected by `0x57` until another bank operation changes it.

So the register file is huge without making every instruction huge.

---

## Final organization

```text
                 superbank latch
                     7 bits
                        │
                        ▼
Normal instruction: [ bank:3 ][ register:5 ]
                        │
                        ▼
              15-bit SRAM address
                        │
                        ▼
                 1 of 32,768 GPR
```

Three independently addressed mirrors use that same hierarchy:

```text
read_A = { superbank, bank, reg_A }
read_B = { superbank, bank, reg_B }
read_C = { superbank, bank, reg_C }
write  = { superbank, bank, reg_D }
```

The write is broadcast to all three mirrors; the reads remain independent.

## Next

I will:

1. Add the 7-bit secondary-bank latch and custom `SETBANK2` operation
2. Simulate and test it in Hneemann's Digital
3. Update the KiCad register-file/control schematics and SRAM routing
4. Update the hand-written Verilog/SystemVerilog FPGA core
5. Test bank switching, isolation, mirrored writes, independent 3R reads, and preservation across superbank changes
6. Run the architectural/program regressions
7. Take the design through Yosys and the rest of the FPGA flow for hardware testing

The funny part is that this started as trying not to waste an SRAM.

Now Tomato is going to have **32,768 GPR**.

Not because I set out to build a CPU with 32K registers.

Because the physical discrete chips come with **15 address bits**, and once twelve of those SRAMs are already in the design, **using any less is a waste**.

The comparison table uses Intel's documented 16 x86-64 GPRs, Arm's 31 AArch64 GPRs, RISC-V's 32 integer registers, and NVIDIA Blackwell's documented 255-register-per-thread limit / 64K-register-per-SM physical file.
