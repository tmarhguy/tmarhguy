# First Open Source Contributions

*August 9, 2026*

---

Published: [/writing/2026-08-09-first-open-source-contributions/](/writing/2026-08-09-first-open-source-contributions/)

I have always assumed the entry to OS contribution was a high one, and rightfully so. There are so many people eventually going to use the tools and changes you make if approved! Yesterday, I made my first OS contributions to [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA).

It was a rather obvious one, there was a broken contribution URL in the root readme, the very one I wanted to read before making any contributions at all. I forked, branched and made the changes to point to the correct Read the Docs page. I opened a pull request ([PR #2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682) fixing Issue #1534), and it was approved and merged!

I then moved on to fix interconnect documentation. The goal was to learn the workflow of problem to fix to pull request. I tackled an issue with outdated `directlist` syntax ([PR #2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683) fixing Issue #518). I separated the VPR `<directlist>` syntax from the OpenFPGA `<direct_connection>` syntax, fixed an incorrect closing tag (`</directlist>` to `</direct_connection>`), and updated the attributes so they actually match the XML parser rules in `read_xml_routing_circuit.cpp`.

I also discovered that reading issues is one way to find pending problems worth solving, and that's where I look at now to help fix. In the next challenge to contribute meaningfully to OS, I will be contributing to even more within my capacity to learn and appreciate the workflow.

It was exciting seeing the approved status, and the mere idea that someone will click on the link, it will work and I, sitting here have a hand in that narrative! A good start it is!
