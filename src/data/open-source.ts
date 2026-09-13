export interface OpenSourcePull {
  label: string;
  href: string;
}

/** Proof screenshot for a contribution — rendered in the evidence gallery. */
export interface OpenSourceEvidence {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  captionHref: string;
  detail: string;
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
  evidence: OpenSourceEvidence[];
}

export const OPEN_SOURCE_BUILD_LOG_HREF = '/writing/#writing-open-source';

const GITHUB_REPO_HREF = /^https:\/\/github\.com\/([^/]+\/[^/]+)\/?$/;

/** `owner/repo` from a GitHub repository homepage URL. */
export function githubRepoSlug(link: string): string | null {
  return GITHUB_REPO_HREF.exec(link)?.[1] ?? null;
}

/** Live shields.io star badge for a GitHub repository homepage URL. */
export function githubStarsShieldSrc(link: string): string | null {
  const repo = githubRepoSlug(link);
  if (!repo) {
    return null;
  }

  return `https://img.shields.io/github/stars/${repo}?style=flat-square`;
}

export function githubStargazersHref(link: string): string | null {
  const repo = githubRepoSlug(link);
  if (!repo) {
    return null;
  }

  return `https://github.com/${repo}/stargazers`;
}

const contributions: OpenSourceContribution[] = [
  {
    title: 'LibreLane',
    slug: 'librelane',
    link: 'https://github.com/librelane/librelane',
    date: '2026-08-15',
    period: 'Aug. 2026',
    desc: 'Fixes Yosys ≥ 0.68 abc -fast so **synthesis does not die**; ==shipped as 3.0.8==',
    pulls: [
      {
        label: '#1015',
        href: 'https://github.com/librelane/librelane/pull/1015',
      },
      {
        label: '3.0.8',
        href: 'https://github.com/librelane/librelane/releases/tag/3.0.8',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/librelane1015.png',
        width: 1246,
        height: 1199,
        alt: 'LibreLane 3.0.8 release credits tmarhguy for the Yosys compatibility fix',
        caption: 'LibreLane · shipped in 3.0.8',
        captionHref:
          'https://github.com/librelane/librelane/releases/tag/3.0.8',
        detail: 'The compatibility fix, in the release notes.',
      },
    ],
  },
  {
    title: 'LibreLane',
    slug: 'librelane-1016',
    link: 'https://github.com/librelane/librelane',
    date: '2026-08-17',
    period: 'Aug. 2026',
    desc: 'Fixes chk.rpt so **pre- and post-synth errors both count**; ==shipped as 3.0.10==',
    pulls: [
      {
        label: '#1016',
        href: 'https://github.com/librelane/librelane/pull/1016',
      },
      {
        label: '3.0.10',
        href: 'https://github.com/librelane/librelane/releases/tag/3.0.10',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/librelane1016.png',
        width: 1548,
        height: 1452,
        alt: 'LibreLane 3.0.10 release credits tmarhguy for the synthesis check fix',
        caption: 'LibreLane · shipped in 3.0.10',
        captionHref:
          'https://github.com/librelane/librelane/releases/tag/3.0.10',
        detail: 'Pre- and post-synth errors both count.',
      },
    ],
  },
  {
    title: 'OpenROAD',
    slug: 'openroad',
    link: 'https://github.com/The-OpenROAD-Project/OpenROAD',
    date: '2026-08-15',
    period: 'Aug. 2026',
    desc: 'Fixes MINWIDTH WRONGDIRECTION so **production LEF files load**',
    pulls: [
      {
        label: '#11107',
        href: 'https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/openroad11107.png',
        width: 2012,
        height: 1084,
        alt: 'OpenROAD contribution activity showing the LEF58 parser fix',
        caption: 'OpenROAD · inside the parser',
        captionHref:
          'https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107',
        detail: 'The patch and its review, in the open.',
      },
    ],
  },
  {
    title: 'Verilator',
    slug: 'verilator',
    link: 'https://github.com/verilator/verilator',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Fixes Linux peak-memory stats so **--stats matches real RSS**',
    pulls: [
      {
        label: '#8070',
        href: 'https://github.com/verilator/verilator/pull/8070',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/verilator8070.png',
        width: 1830,
        height: 1332,
        alt: 'Merged Verilator pull request #8070 fixing Linux peak-memory reporting',
        caption: 'Verilator · merged upstream',
        captionHref: 'https://github.com/verilator/verilator/pull/8070',
        detail: 'Peak RSS, not peak virtual.',
      },
    ],
  },
  {
    title: 'OpenFPGA',
    slug: 'openfpga',
    link: 'https://github.com/lnis-uofu/OpenFPGA',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Fixes the contributor guide link so **new contributors land in the right place**',
    pulls: [
      {
        label: '#2682',
        href: 'https://github.com/lnis-uofu/OpenFPGA/pull/2682',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/openfpga2682.png',
        width: 1754,
        height: 1330,
        alt: 'Merged OpenFPGA pull request #2682 fixing the contributor guide link',
        caption: 'OpenFPGA · contributor guide link',
        captionHref: 'https://github.com/lnis-uofu/OpenFPGA/pull/2682',
        detail: 'Stale URL fixed in the README.',
      },
    ],
  },
  {
    title: 'OpenFPGA',
    slug: 'openfpga-2683',
    link: 'https://github.com/lnis-uofu/OpenFPGA',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Fixes directlist interconnect docs so **syntax matches the parser**',
    pulls: [
      {
        label: '#2683',
        href: 'https://github.com/lnis-uofu/OpenFPGA/pull/2683',
      },
    ],
    evidence: [
      {
        src: '/images/open-source/openfpga2683.png',
        width: 1880,
        height: 1442,
        alt: 'Merged OpenFPGA pull request #2683 fixing directlist interconnect docs',
        caption: 'OpenFPGA · interconnect docs',
        captionHref: 'https://github.com/lnis-uofu/OpenFPGA/pull/2683',
        detail: 'Syntax now matches the parser.',
      },
    ],
  },
];

export function getOpenSourceContributions(): OpenSourceContribution[] {
  return [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Homepage projects card — LibreLane release proof is the lead evidence image. */
export const HOME_OPEN_SOURCE_FEATURE = {
  title: 'Open source EDA',
  period: 'Aug. 2026',
  desc: 'Upstream patches in LibreLane, OpenROAD, Verilator, and OpenFPGA — including Yosys compatibility and synthesis-error counting fixes that shipped in LibreLane 3.0.8 and 3.0.10.',
  image: '/images/open-source/librelane1015.png',
  imageAlt:
    'LibreLane 3.0.8 release credits tmarhguy for the Yosys compatibility fix',
  href: '/projects/#open-source-title',
} as const;

export default contributions;
