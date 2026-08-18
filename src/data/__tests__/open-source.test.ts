import { describe, expect, it } from 'vitest';

import {
  getOpenSourceContributions,
  githubRepoSlug,
  githubStargazersHref,
  githubStarsShieldSrc,
  OPEN_SOURCE_BUILD_LOG_HREF,
} from '../open-source';

describe('open-source data', () => {
  it('lists contributions newest first', () => {
    const entries = getOpenSourceContributions();
    expect(entries.length).toBeGreaterThan(0);

    for (let index = 1; index < entries.length; index += 1) {
      const previous = new Date(entries[index - 1].date).getTime();
      const current = new Date(entries[index].date).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });

  it('includes OpenROAD, LibreLane, Verilator, and OpenFPGA with pull links', () => {
    const entries = getOpenSourceContributions();
    const openroad = entries.find((entry) => entry.slug === 'openroad');
    const librelane = entries.find((entry) => entry.slug === 'librelane');
    const librelaneChk = entries.find(
      (entry) => entry.slug === 'librelane-1016',
    );
    const verilator = entries.find((entry) => entry.slug === 'verilator');
    const openfpga = entries.find((entry) => entry.slug === 'openfpga');

    expect(entries[0]?.slug).toBe('librelane-1016');
    expect(openroad?.desc).toMatch(/\*\*production LEF files load\*\*/);
    expect(openroad?.pulls[0]?.href).toContain('/pull/11107');
    expect(librelane?.desc).toMatch(/==shipped as 3\.0\.8==/);
    expect(librelane?.pulls[0]?.href).toContain('/pull/1015');
    expect(librelane?.pulls[1]?.href).toContain('/releases/tag/3.0.8');
    expect(librelaneChk?.desc).toMatch(/==shipped as 3\.0\.10==/);
    expect(librelaneChk?.pulls[0]?.href).toContain('/pull/1016');
    expect(librelaneChk?.pulls[1]?.href).toContain('/releases/tag/3.0.10');
    expect(verilator?.desc).toMatch(/Fixes Linux peak-memory/);
    expect(verilator?.pulls[0]?.href).toContain('/pull/8070');
    expect(openfpga?.desc).toMatch(/Fixes contribution/);
    expect(openfpga?.pulls).toHaveLength(2);
  });

  it('exposes the shared build log href', () => {
    expect(OPEN_SOURCE_BUILD_LOG_HREF).toBe('/writing/#writing-open-source');
  });

  it('builds star shield URLs from GitHub repo homepages', () => {
    expect(githubRepoSlug('https://github.com/verilator/verilator')).toBe(
      'verilator/verilator',
    );
    expect(
      githubStarsShieldSrc('https://github.com/The-OpenROAD-Project/OpenROAD'),
    ).toBe(
      'https://img.shields.io/github/stars/The-OpenROAD-Project/OpenROAD?style=flat-square',
    );
    expect(githubStargazersHref('https://github.com/librelane/librelane')).toBe(
      'https://github.com/librelane/librelane/stargazers',
    );
    expect(githubRepoSlug('https://example.com/not-github')).toBeNull();
  });
});
