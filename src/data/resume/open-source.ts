export interface ResumeOpenSourceEntry {
  title: string;
  link: string;
  period: string;
  /** Markdown — inline links for PRs and releases. */
  highlights: string[];
}

const openSource: ResumeOpenSourceEntry[] = [
  {
    title: 'LibreLane',
    link: 'https://github.com/librelane/librelane',
    period: 'Aug. 2026',
    highlights: [
      'Shipped [3.0.8](https://github.com/librelane/librelane/releases/tag/3.0.8): gated deprecated `abc -fast` for Yosys ≥ 0.68 ([#1015](https://github.com/librelane/librelane/pull/1015)).',
      'Shipped [3.0.10](https://github.com/librelane/librelane/releases/tag/3.0.10): summed pre/post-synth `chk.rpt` errors ([#1016](https://github.com/librelane/librelane/pull/1016)).',
    ],
  },
  {
    title: 'OpenROAD',
    link: 'https://github.com/The-OpenROAD-Project/OpenROAD',
    period: 'Aug. 2026',
    highlights: [
      'Fixed ODB LEF58 parser so production tech files with trailing whitespace load ([#11107](https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107)).',
    ],
  },
  {
    title: 'Verilator',
    link: 'https://github.com/verilator/verilator',
    period: 'Aug. 2026',
    highlights: [
      'Switched Linux peak-memory from VmPeak to VmHWM so `--stats` matches RSS (~10× less inflation) ([#8070](https://github.com/verilator/verilator/pull/8070)).',
    ],
  },
  {
    title: 'OpenFPGA',
    link: 'https://github.com/lnis-uofu/OpenFPGA',
    period: 'Aug. 2026',
    highlights: [
      'Aligned direct interconnect docs with XML parser ([#2683](https://github.com/lnis-uofu/OpenFPGA/pull/2683)).',
      'Restored contributor guide ([#2682](https://github.com/lnis-uofu/OpenFPGA/pull/2682)).',
    ],
  },
];

export default openSource;
