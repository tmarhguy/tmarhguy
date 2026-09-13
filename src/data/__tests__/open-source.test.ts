import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  getOpenSourceContributions,
  githubRepoSlug,
  githubStargazersHref,
  githubStarsShieldSrc,
  HOME_OPEN_SOURCE_FEATURE,
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
    const openfpgaDocs = entries.find(
      (entry) => entry.slug === 'openfpga-2683',
    );

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
    expect(openfpga?.desc).toMatch(/Fixes the contributor guide link/);
    expect(openfpga?.pulls).toHaveLength(1);
    expect(openfpga?.pulls[0]?.href).toContain('/pull/2682');
    expect(openfpgaDocs?.desc).toMatch(/\*\*syntax matches the parser\*\*/);
    expect(openfpgaDocs?.pulls).toHaveLength(1);
    expect(openfpgaDocs?.pulls[0]?.href).toContain('/pull/2683');
  });

  it('exposes the shared build log href', () => {
    expect(OPEN_SOURCE_BUILD_LOG_HREF).toBe('/writing/#writing-open-source');
  });

  it('gives every contribution gallery evidence that exists on disk', () => {
    const entries = getOpenSourceContributions();
    expect(entries.length).toBeGreaterThan(0);

    for (const entry of entries) {
      expect(entry.evidence.length).toBeGreaterThan(0);
      for (const item of entry.evidence) {
        expect(item.src.startsWith('/images/open-source/')).toBe(true);
        expect(item.width).toBeGreaterThan(0);
        expect(item.height).toBeGreaterThan(0);
        expect(item.alt.trim().length).toBeGreaterThan(0);
        expect(item.captionHref).toMatch(/^https?:\/\/.+/);
        expect(
          existsSync(join(process.cwd(), 'public', item.src)),
          `${entry.slug} evidence missing: ${item.src}`,
        ).toBe(true);
      }
    }
  });

  it('points the homepage feature at gallery evidence that exists on disk', () => {
    expect(HOME_OPEN_SOURCE_FEATURE.image).toBe(
      '/images/open-source/librelane1015.png',
    );
    expect(
      existsSync(join(process.cwd(), 'public', HOME_OPEN_SOURCE_FEATURE.image)),
    ).toBe(true);
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
