# LibreLane, Verilator, OpenFPGA

Date: 2026-08-11

Published: [/writing/2026-08-11-librelane-verilator-openfpga/](/writing/2026-08-11-librelane-verilator-openfpga/)

**See also:** [Projects — open source](/projects/#open-source-title) · [Detailed build log](/writing/2026-08-09-first-open-source-contributions/)

Open-source contributions are getting exactly as fun as I'd hoped. It once felt like a hard barrier to enter, but now feels quite natural — and necessary — as writing my own code. In an exciting turn of events, I've gotten merged contributions in LibreLane, Verilator, and OpenFPGA, with plenty more in the pipeline.

I started small, focusing on documentation just to understand the mechanics of open-source contribution — how a repository actually receives, reviews, and integrates changes before you start touching the core logic. But the underlying motivation has always been the same: the thought that someone out there will be using these tools to design a chip, run simulation and verification, or map out an architecture, and because of my code contribution, their workflow simply _won't break_. They won't have to stress over deprecated synthesis flags or pipeline failures; their flow will just happen.

## Recent merges & contributions

| Project                                                 | Contribution focus                              | Pull request                                                                                                       |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **[LibreLane](https://github.com/librelane/librelane)** | Yosys ≥ 0.68 `abc -fast` & slang plugin gating  | [#1015](https://github.com/librelane/librelane/pull/1015)                                                          |
| **[Verilator](https://github.com/verilator/verilator)** | Linux peak memory reporting                     | [#8070](https://github.com/verilator/verilator/pull/8070)                                                          |
| **[OpenFPGA](https://github.com/lnis-uofu/OpenFPGA)**   | Contribution guide & interconnect documentation | [#2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682), [#2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683) |

I get to sit here at Penn, building my own low-level architecture projects, learning exciting new things, and finding better ways to contribute back to the community. There's a profound satisfaction in knowing that while I'm routing my own boards and working on my own designs, I've had a hand in making someone else's beautiful engineering narrative a reality.

**[Open source on Projects →](/projects/#open-source-title)**
