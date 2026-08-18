import { describe, expect, it } from 'vitest';

import {
  getAdjacentLogs,
  getAllLogs,
  getLogBySlug,
  getLogSlugs,
  getLogProjectGroupKey,
  getLogsByProject,
  getWritingSectionHref,
  projectHasWriting,
  validateLogFrontmatter,
} from '@/lib/logs';

describe('getAllLogs', () => {
  it('returns published logs sorted newest first', () => {
    const logs = getAllLogs();
    expect(logs.length).toBeGreaterThan(0);

    for (let index = 1; index < logs.length; index += 1) {
      const previous = new Date(logs[index - 1].date).getTime();
      const current = new Date(logs[index].date).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });

  it('lists the newest Tomato log as the lead writing entry', () => {
    const logs = getAllLogs();
    expect(logs[0]?.slug).toBe('2026-08-16-tomato-web-optimization');
  });

  it('includes project labels on every entry', () => {
    for (const entry of getAllLogs()) {
      expect(entry.projectLabel).toBeTruthy();
      expect(entry.project).toBeTruthy();
    }
  });

  it('attaches the Tomato site next to the GitHub repo on tomato logs', () => {
    const tomato = getAllLogs().find((entry) => entry.project === 'tomato');
    expect(tomato?.projectSite).toBe('https://tomato.tmarhguy.com');
    expect(tomato?.projectLink).toBe('https://github.com/tmarhguy/tomato');
  });
});

describe('getLogBySlug', () => {
  it('returns a log entry for a known slug', () => {
    const [slug] = getLogSlugs();
    const entry = getLogBySlug(slug);
    expect(entry?.slug).toBe(slug);
  });

  it('returns null for unknown or unsafe slugs', () => {
    expect(getLogBySlug('not-a-real-log')).toBeNull();
    expect(getLogBySlug('../secret')).toBeNull();
  });
});

describe('getAdjacentLogs', () => {
  it('returns older and newer neighbours for a middle entry', () => {
    const logs = getAllLogs();
    if (logs.length < 3) {
      return;
    }

    const middle = logs[1];
    const adjacent = getAdjacentLogs(middle.slug);

    expect(adjacent.next?.slug).toBe(logs[0].slug);
    expect(adjacent.previous?.slug).toBe(logs[2].slug);
  });

  it('returns null neighbours for unknown slugs', () => {
    expect(getAdjacentLogs('not-a-real-log')).toEqual({
      previous: null,
      next: null,
    });
  });
});

describe('getLogsByProject', () => {
  it('groups logs by project with newest entry first in each group', () => {
    const groups = getLogsByProject();
    expect(groups.length).toBeGreaterThan(0);

    for (const group of groups) {
      expect(group.entries.length).toBeGreaterThan(0);
      for (let index = 1; index < group.entries.length; index += 1) {
        const previous = new Date(group.entries[index - 1].date).getTime();
        const current = new Date(group.entries[index].date).getTime();
        expect(previous).toBeGreaterThanOrEqual(current);
      }
    }
  });

  it('lists the section with the newest log first on the writing index', () => {
    const groups = getLogsByProject();
    expect(groups.length).toBeGreaterThan(1);

    for (let index = 1; index < groups.length; index += 1) {
      const previous = new Date(
        groups[index - 1].entries[0]?.date ?? 0,
      ).getTime();
      const current = new Date(groups[index].entries[0]?.date ?? 0).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }

    const openSourceGroup = groups.find(
      (group) => group.project === 'open-source',
    );
    const tomatoAugGroup = groups.find((group) => group.project === 'tomato-aug');
    const tomatoJulGroup = groups.find((group) => group.project === 'tomato-jul');
    if (!openSourceGroup || !tomatoAugGroup || !tomatoJulGroup) {
      return;
    }

    // Tomato August (Aug 16) above Open Source (Aug 11); July and Earlier fold below fresher projects.
    expect(groups[0].project).toBe('tomato-aug');
    expect(openSourceGroup.entries[0]?.slug).toBe(
      '2026-08-11-librelane-verilator-openfpga',
    );
    expect(openSourceGroup.entries.map((entry) => entry.slug)).toEqual([
      '2026-08-11-librelane-verilator-openfpga',
      '2026-08-09-first-open-source-contributions',
    ]);
    expect(tomatoAugGroup.projectLabel).toBe('Tomato CPU — August');
    expect(tomatoAugGroup.entries[0]?.slug).toBe(
      '2026-08-16-tomato-web-optimization',
    );
    expect(tomatoAugGroup.entries.map((entry) => entry.slug).slice(0, 4)).toEqual([
      '2026-08-16-tomato-web-optimization',
      '2026-08-15-pcbs-arrive',
      '2026-08-15-isa-as-a-wire',
      '2026-08-13-front-page-news-in-ashtown-valley',
    ]);
    expect(tomatoJulGroup.projectLabel).toBe('Tomato CPU — July');
    expect(tomatoJulGroup.entries[0]?.date).toBe('2026-07-31');
  });

  it('splits Tomato into August, July, and Earlier folds', () => {
    const groups = getLogsByProject();
    const tomatoGroups = groups.filter((group) =>
      group.project.startsWith('tomato-'),
    );

    expect(tomatoGroups.map((group) => group.project)).toEqual([
      'tomato-aug',
      'tomato-jul',
      'tomato-earlier',
    ]);
    expect(
      getAllLogs()
        .filter((entry) => entry.project === 'tomato')
        .every((entry) =>
          ['tomato-aug', 'tomato-jul', 'tomato-earlier'].includes(
            getLogProjectGroupKey(entry),
          ),
        ),
    ).toBe(true);
    expect(
      groups
        .find((group) => group.project === 'tomato-earlier')
        ?.entries.some((entry) => entry.slug === 'welcome-to-tomato-32'),
    ).toBe(true);
  });

  it('keeps older sections below any project with a newer log', () => {
    const groups = getLogsByProject();
    const order = groups.map((group) => group.project);

    const openSourceIndex = order.indexOf('open-source');
    const mangoIndex = order.indexOf('mango');
    const tomatoAugIndex = order.indexOf('tomato-aug');
    const tomatoJulIndex = order.indexOf('tomato-jul');
    const itchIndex = order.indexOf('itch-hw');

    if (
      openSourceIndex === -1 ||
      mangoIndex === -1 ||
      tomatoAugIndex === -1 ||
      tomatoJulIndex === -1 ||
      itchIndex === -1
    ) {
      return;
    }

    // Tomato August above Open Source above Mango above ITCH above Tomato July.
    expect(tomatoAugIndex).toBeLessThan(openSourceIndex);
    expect(openSourceIndex).toBeLessThan(mangoIndex);
    expect(mangoIndex).toBeLessThan(itchIndex);
    expect(itchIndex).toBeLessThan(tomatoJulIndex);
  });
});

describe('writing section anchors', () => {
  it('builds section hrefs that match the writing index headings', () => {
    expect(getWritingSectionHref('tomato')).toBe('/writing/#writing-tomato-aug');
    expect(getWritingSectionHref('itch-hw')).toBe('/writing/#writing-itch-hw');
  });

  it('knows which log projects have published entries', () => {
    expect(projectHasWriting('tomato')).toBe(true);
    expect(projectHasWriting('not-a-project')).toBe(false);
  });
});

describe('validateLogFrontmatter', () => {
  it('accepts valid frontmatter', () => {
    expect(
      validateLogFrontmatter({
        title: 'Test log',
        date: '2024-01-15',
        description: 'A test log entry',
        project: 'tomato',
      }),
    ).toEqual({
      title: 'Test log',
      date: '2024-01-15',
      description: 'A test log entry',
      project: 'tomato',
    });
  });

  it('rejects unknown projects', () => {
    expect(() =>
      validateLogFrontmatter({
        title: 'Test log',
        date: '2024-01-15',
        description: 'A test log entry',
        project: 'unknown-project',
      }),
    ).toThrow(/unknown project/);
  });
});
