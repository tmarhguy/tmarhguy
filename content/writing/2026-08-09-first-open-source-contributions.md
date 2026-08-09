---
title: 'First Open Source Contributions'
date: '2026-08-09'
description: 'First merged pull requests on OpenFPGA — fixing a broken contribution URL in the README and outdated interconnect documentation syntax.'
project: openfpga
---

**See also:** [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA) · [PR #2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682) · [PR #2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683)

I have always assumed the entry to open-source contribution was a high one, and rightfully so. There are so many people who will eventually use the tools and changes you make if approved. Yesterday, I made my first OS contributions to [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA).

It was a rather obvious one — a broken contribution URL in the root README, the very page I wanted to read before making any contributions at all. I forked, branched, and pointed the link at the correct Read the Docs page. [PR #2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682) ([issue #1534](https://github.com/lnis-uofu/OpenFPGA/issues/1534)) was approved and merged.

I then moved on to interconnect documentation. The goal was to learn the workflow from problem to fix to pull request. I tackled outdated `directlist` syntax in [PR #2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683) ([issue #518](https://github.com/lnis-uofu/OpenFPGA/issues/518)): separated the VPR `<directlist>` syntax from the OpenFPGA `<direct_connection>` syntax, fixed an incorrect closing tag (`</directlist>` → `</direct_connection>`), and updated attributes to match the XML parser rules in `read_xml_routing_circuit.cpp`.

Reading issues is now one way I find pending problems worth solving. For the next challenge, I will keep contributing within my capacity to learn and appreciate the workflow.

It was exciting seeing the approved status — the idea that someone will click the link, it will work, and I sitting here had a hand in that narrative. A good start.
