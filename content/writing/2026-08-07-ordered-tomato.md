---
title: 'Ordered Tomato'
date: '2026-08-07'
description: 'After months of schematic churn, opcode tables, and the occasional 40b detour, Tomato has left the screen. Bare boards on JLCPCB; every IC, cap, LED, and SIP resistor network on DigiKey — enough for two 07_alu slices.'
project: tomato
image: '/images/kicad/07_alu/pcb/alu_8b_board.png'
imageAlt: 'Tomato ALU — board render'
---

## It is real

After months of schematic churn, opcode tables, and the occasional 40b detour, Tomato has left the screen.

**See also:** [Designing additional boards](/writing/2026-08-02-designing-additional-boards/) · [Falling back to 32b](/writing/2026-07-31-falling-back-to-32b/)

**Yesterday:** bare boards on JLCPCB.  
**Tonight:** every IC, cap, LED, and SIP resistor network on DigiKey — enough for **two** `07_alu` slices.

The dual-LUT ALU is no longer a KiCad fantasy. Copper is being etched. Chips are in a warehouse in Minnesota. I am genuinely excited.

<div class="prose-image-pair">

![Tomato ALU — board render](/images/kicad/07_alu/pcb/alu_8b_board.png)
![Tomato ALU — top copper](/images/kicad/07_alu/pcb/alu_8b_pcb.png)

</div>

_Figure 1 — What we are actually building: `07_alu` — board render (left), routed top copper (right). DRC clean, 0 unrouted nets._

---

## Fabrication — boards

I finally stopped polishing and hit submit. The existential “one more routing pass” voice is quiet for now — and honestly, it was not buying much anymore.

- **Board:** `07_alu` — 8-bit dual-LUT ALU slice
- **Cost:** under **$6** for the PCB order (easy to reorder if something goes wrong)
- **ETA:** ~two weeks to Philadelphia

If there is a fab error, I can spin another batch without heartbreak. That was the whole point of keeping the board small and the order cheap.

![JLCPCB order confirmation](/images/orders/pcb_order_jlcpcb.png)
_Figure 2 — JLCPCB order — copper incoming._

---

## DigiKey — parts (order `100884560`)

Same night, different kind of commitment: **34× 74ACT151** muxes do not lie. This is a real machine, not a simulation.

I sized the cart for **two boards** — a full **16-bit** datapath from day one. One board proves the slice; two boards is the actual Tomato width on the bench. The marginal cost of the second slice (~$20 in parts on top of ~$40 for one) was too good to skip.

| Line | Part | Qty | Role |
| --- | --- | --- | --- |
| 1 | CD74ACT151M96 | **34** | 8:1 LUT muxes — the heart of the dual-LUT plane |
| 2 | CD74ACT283M | **4** | 4-bit ripple adders |
| 3 | SN74ACT00DR | **4** | Quad NAND (glue) |
| 4 | SN74ACT86DR | **2** | Quad XOR |
| 5 | MC74ACT377DWR2G | **2** | Octal D-FF / flag latch |
| 6 | CD74ACT541M96 | **2** | Octal bus buffer |
| 7 | CD74HCT688M96 | **2** | 8-bit identity comparator (zero detect) |
| 8 | CC0603 100nF | **54** | Decoupling (50 + spares) |
| 9 | LTST-C170KRKT red LED | **130** | Debug wall (126 + spares) |
| 10 | 4610X-101-471LF SIP-9 | **14** | Bussed 470Ω LED limiters |

- **Subtotal:** $48.93
- **Total (ship + tariff + tax):** **~$61**
- **Availability:** all lines **immediate** — no backorders
- **BOM on disk:** `07_alu_digikey_bom.csv`
- **Order export:** `100884560.csv` (fabrication copy)

Swapped the backordered Samsung 100nF caps for Yageo `311-1344-1-ND`. Picked `CD74HCT688M96` over SN74HC688 for cleaner 5V ACT interfacing. Same footprint, better margins.

![DigiKey order confirmation](/images/orders/01_digikey.png)
_Figure 3 — DigiKey order `100884560` — 10 line items, two boards worth of silicon._

---

## Still to source

DigiKey does not have the SIP-4 networks without a 2,000-piece reel trap, and I already have headers in the lab:

| Item | Qty (2 boards) | Refs |
| --- | --- | --- |
| SIP-4 bussed 470Ω (`4604X-101-471LF` or equiv.) | **4** | RN9, RN10 |
| 4-pin headers | **4** | J10, J11 |
| 8-pin headers | **14** | J5–J7, J12, J15–J17 |

Fallback for RN9/RN10: discrete 470Ω resistors, common on one side.

---

## What happens next

1. **Wait** — JLC boards (~2 weeks), DigiKey box (days).
2. **Grab** SIP-4 + headers before the soldering marathon.
3. **Assemble** board #1 — 131 placements, 63 LEDs, the whole debug wall.
4. **Bring up** 8-bit — opcode walk, carry chain, flag latch, LED sanity.
5. **Assemble** board #2 — cascade to **16-bit**, wire slice-to-slice, and finally _see_ the dual-LUT datapath breathe.

If something is wrong, I will know because 130 red LEDs do not lie.

This is the best part of the project — the part where the schematic meets flux and patience. Tomato is ordered. Now we build.
