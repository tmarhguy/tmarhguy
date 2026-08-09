---
title: 'Formalizing the SPICE Automation Framework'
date: '2026-08-08'
description: 'Formalizing one-off NGSpice scripts from the SRAM tapeout into a reusable Python package — dynamic deck rewriting, F_max binary search, and JSON/CSV/Markdown PPA reports.'
project: spice-automation
---

**See also:** [16×4 SRAM](/projects/#full-custom-sram) · [8-bit ripple-carry adder](/projects/#8-bit-ripple-carry-adder-ese-3700) · [SPICE Automation Framework](/projects/#spice-automation) · [repo](https://github.com/tmarhguy/spice-automation)

## Where this started

When I first worked on the [16×4 full-custom 6T SRAM](/projects/#full-custom-sram) macro and the [8-bit ripple-carry adder](/projects/#8-bit-ripple-carry-adder-ese-3700) months ago (Spring 2026), I relied on a lot of customized C++ and Python tooling to verify speed and PPA metrics. The course [ESE 3700](https://www.engineering.upenn.edu/~ese3700/) required a minimum speed of **500 MHz**. After deep optimization — and verifying functional readbacks in NGSpice — I hit a **9× margin**, pushing the macro to **4.571 GHz** sustained f<sub>max</sub>. But extracting those numbers relied on heavily hardcoded C++ and Python scripting I had thrown together just to get through the iterations.

### SRAM results (proof circuit)

| Metric | Value | Notes |
| --- | --- | --- |
| Sustained f<sub>max</sub> | **4.571 GHz** | Binary search on CLK period, W/W/R/R pattern |
| Spec margin | **9.14×** vs 500 MHz | f<sub>max</sub> / 0.5 GHz |
| Min CLK period | **218.75 ps** | At sustained closure |
| CLK → DOUT delay | **110.65 ps** | @ 0.5 V functional readback |
| Avg power | **21.37 µW** | Over 0.984 ns measurement window |
| FOM (access sweep) | **≈ 1.26×10<sup>−22</sup>** | `60 × Area × Power × Delay²` |
| Steady-state verify | **PASS** | 32 macros, 128 CLK cycles, 64 readback checks |

Pattern: **W/W/R/R** with `addr0=0x5`, `addr1=0xA` @ **0.5 V** VDD. Width-scale sweeps (0.50–1.00) all reproduced the same ~4.57 GHz closure — the limiter is the shared cycle envelope, not a single cell tweak.

---

## Why I'm building this

In a quest to organize my workflow for the obvious future where I will work with SPICE in advanced courses, research, my career, and personal explorations, I am building this automation framework to quickly verify my SPICE tooling metrics.

I decided to pull the old optimization loop out of the specific project repo and formalize it into a clean, reusable Python package. On the technical side, the framework is built to **decouple the generic runner from the specific circuit recipes**:

- **Dynamic deck rewriting** — Instead of hardcoding predictive 22 nm HP model paths into every SPICE deck, the framework intercepts the deck and dynamically rewrites the `.include` lines at runtime via environment variables. This keeps the original circuit files perfectly clean for version control and automated CI/CD runs.

- **Automated NGSpice runner** — A Python pipeline natively drives NGSpice subprocesses to automatically run binary searches for sustained **F<sub>max</sub>** and execute concurrent parametric width-scale sweeps.

- **PPA reporting** — The framework parses the `.meas` extractions, calculates custom Figure of Merit formulas (like `60 × Area × Power × Delay²`), and automatically spits out comparative results directly into **JSON**, **CSV**, and **Markdown** reports.

Same instinct as [Orange Metrics API](/projects/#orange) — when a process introduces friction, structure the data and hand it back automatically. See [Automating Vivado + OpenLane PPA extraction](/writing/2026-08-08-automating-vivado-openlane-ppa-extraction/) for that parallel.

---

## What this is

This is a project I am organizing in the [spice-automation](https://github.com/tmarhguy/spice-automation) repository. As I continue to iterate on custom silicon, having the data structured and handed to me automatically is absolutely essential. Perhaps it'll be found useful to someone else out there building from the transistor up.

**Proof circuit:** ESE 3700 Proj2 SRAM macro — [`examples/64b-sram`](https://github.com/tmarhguy/spice-automation/tree/main/examples/64b-sram) in the repo, same design as the [16×4 SRAM](/projects/#full-custom-sram) project.

**Artifacts:** [`reports/sram_fmax_baseline.json`](https://github.com/tmarhguy/spice-automation/blob/main/reports/sram_fmax_baseline.json), [`reports/sram_sweep_results.csv`](https://github.com/tmarhguy/spice-automation/blob/main/reports/sram_sweep_results.csv).
