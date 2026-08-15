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
  },
  {
    title: 'LibreLane',
    slug: 'librelane',
    link: 'https://github.com/librelane/librelane',
    date: '2026-08-11',
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
  },
  {
    title: 'OpenFPGA',
    slug: 'openfpga',
    link: 'https://github.com/lnis-uofu/OpenFPGA',
    date: '2026-08-09',
    period: 'Aug. 2026',
    desc: 'Fixes contribution and interconnect docs so **syntax matches the parser**',
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
