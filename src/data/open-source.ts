export interface OpenSourcePull {
  label: string;
  href: string;
}

export interface OpenSourceContribution {
  title: string;
  slug: string;
  link: string;
  /** ISO date for sorting — newest first */
  date: string;
  period: string;
  desc: string;
  pulls: OpenSourcePull[];
}

export const OPEN_SOURCE_BUILD_LOG_HREF =
  '/writing/2026-08-11-librelane-verilator-openfpga/';

const contributions: OpenSourceContribution[] = [
  {
    title: 'LibreLane',
    slug: 'librelane',
    link: 'https://github.com/librelane/librelane',
    date: '2026-08-11',
    period: 'Aug. 2026',
    desc: 'Yosys ≥ 0.68 abc -fast and slang plugin gating',
    pulls: [
      {
        label: '#1015',
        href: 'https://github.com/librelane/librelane/pull/1015',
      },
    ],
  },
  {
    title: 'Verilator',
    slug: 'verilator',
    link: 'https://github.com/verilator/verilator',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Linux peak memory reporting',
    pulls: [
      {
        label: '#8070',
        href: 'https://github.com/verilator/verilator/pull/8070',
      },
    ],
  },
  {
    title: 'OpenFPGA',
    slug: 'openfpga',
    link: 'https://github.com/lnis-uofu/OpenFPGA',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Contribution guide and interconnect docs',
    pulls: [
      {
        label: '#2682',
        href: 'https://github.com/lnis-uofu/OpenFPGA/pull/2682',
      },
      {
        label: '#2683',
        href: 'https://github.com/lnis-uofu/OpenFPGA/pull/2683',
      },
    ],
  },
];

export function getOpenSourceContributions(): OpenSourceContribution[] {
  return [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export default contributions;
