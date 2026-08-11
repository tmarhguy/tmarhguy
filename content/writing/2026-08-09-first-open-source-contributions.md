---
title: 'Open Source Contributions'
date: '2026-08-09'
description: 'First steps into open source: two OpenFPGA docs PRs and a Verilator fix so Linux peak memory matches what the sim actually used.'
project: open-source
---

**See also:** [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA) · [PR #2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682) · [PR #2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683) · [Verilator](https://github.com/verilator/verilator) · [PR #8070](https://github.com/verilator/verilator/pull/8070)

I have always assumed the entry to open-source contribution was a high one, and rightfully so. There are so many people eventually going to use the tools and changes you make if approved! This week, I made my first merged contributions — two on [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA) and one on [Verilator](https://github.com/verilator/verilator).

## OpenFPGA

The first was a rather obvious one: there was a broken contribution URL in the root README, the very one I wanted to read before making any contributions at all. I forked, branched, and made the changes to point to the correct Read the Docs page.

[PR #2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682) (fixing [issue #1534](https://github.com/lnis-uofu/OpenFPGA/issues/1534)) was approved and merged!

I then moved on to fix interconnect documentation. The goal was to learn the workflow of problem to fix to pull request. I tackled outdated `directlist` syntax in [PR #2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683) ([issue #518](https://github.com/lnis-uofu/OpenFPGA/issues/518)). I separated the VPR `<directlist>` syntax from the OpenFPGA `<direct_connection>` syntax, fixed an incorrect closing tag (`</directlist>` → `</direct_connection>`), and updated the attributes so they actually match the XML parser rules in `read_xml_routing_circuit.cpp`.

## Verilator

The Verilator fix was a reporting bug — the simulator wasn't using more memory, it was just reporting it wrongly on Linux.

When Verilator prints `Peak Memory Usage (MB)` in `--stats` or `allocated N MB` at the end of a run, Linux was using a `VmPeak` (peak virtual address space). Windows and macOS were already using peak resident memory. With `--verilate-jobs`, glibc reserves ~64 MB virtual per thread for malloc arenas. Verilator barely touched that RAM, but the stat jumped to 200+ MB while real usage stayed around 20 MB — roughly a 10× inflation.

[PR #8070](https://github.com/verilator/verilator/pull/8070) ([issue #8022](https://github.com/verilator/verilator/issues/8022)) switches Linux to `VmHWM` (peak resident RSS) so all platforms report the exact same kind of number. Docs and a regression test with `--verilate-jobs 2` came along for the ride. No simulation behavior changed — only how memory is measured and displayed.

I also discovered that reading issues is one way to find pending problems worth solving, and that's where I look at now to help fix. In the next challenge to contribute meaningfully to OS, I will be contributing to even more within my capacity to learn and appreciate the workflow.

All three PRs are merged. It was exciting seeing the approved status, and the mere idea that someone will click on the link, it will work, or trust a stat, and I, sitting here have a hand in that narrative! A good start it is!
