# Homepage evidence and media

Updated September 8, 2026. The homepage separates the running FPGA machine from the ongoing discrete implementation.

- Tomato demo: existing `public/images/os/hdmi-demo-games-ui.mp4` and poster, originating in Tomato's `web/assets/os/`. User-controlled playback; no automatic video download.
- Soldering photo: copied from local `tomato/web/assets/gallery/assembly/placing-and-soldering-1280w.webp`.
- SRAM image: WebP conversion of local `64b-sram/media/array_16x4.png`.
- UDP image: WebP conversion of local `udp-stack/media/impl_device_design.png`.
- Mango: existing screenshot in `public/images/mango/main_menu.png`.
- Running CPU, assembler, TomatoOS and HDMI: local Tomato README, “It boots!” section. This describes a 6.25 MHz multicycle implementation; the old homepage's unqualified 58 MHz figure was removed rather than conflated with that machine.
- Register capacity: Tomato `web/journal/register-upgrade.html`, describing 32,768 × 32-bit logical locations, a 256-register window, and mirrored SRAM. Presented as discrete register-file design capacity, not a claim that the physical register board is complete.
- Blackwell: https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html#occupancy — 64K 32-bit registers per SM. The homepage explicitly scopes the comparison to capacity.
- ALU: https://alu.tmarhguy.com and Tomato's current comparison document 624 discrete MOSFETs plus 2,864 transistors inside 74HC ICs. Tomato describes the predecessor as set aside before assembly; the portfolio now says designed and simulation-tested rather than physically brought up.
- MAC: https://github.com/tmarhguy/mac describes local LibreLane configuration and later shuttle submission. Removed completed tapeout language without claiming an undocumented completed hardening run.
- Professional context: `src/data/resume/work.ts`; preserves the incoming status of Fluid Silicon.
- Contribution descriptions: `src/data/resume/open-source.ts`; links to releases and individual patches.

The sibling repositories were read only; no source project files were changed.
