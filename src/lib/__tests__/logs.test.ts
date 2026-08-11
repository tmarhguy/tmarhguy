import { describe, expect, it } from 'vitest';

import {
  getAdjacentLogs,
  getAllLogs,
  getLogBySlug,
  getLogSlugs,
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

  it('lists Open Source Contributions as the newest writing entry', () => {
    const logs = getAllLogs();
    expect(logs[0]?.slug).toBe('2026-08-11-system-wide-call');
  });

  it('includes project labels on every entry', () => {
    for (const entry of getAllLogs()) {
      expect(entry.projectLabel).toBeTruthy();
      expect(entry.project).toBeTruthy();
    }
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
    if (!openSourceGroup) {
      return;
    }

    // Open Source and Mango both have 2026-08-11 entries; catalog order keeps Open Source first.
    expect(groups[0].project).toBe('open-source');
    expect(openSourceGroup.entries[0]?.slug).toBe(
      '2026-08-11-librelane-verilator-openfpga',
    );
    expect(openSourceGroup.entries.map((entry) => entry.slug)).toEqual([
      '2026-08-11-librelane-verilator-openfpga',
      '2026-08-09-first-open-source-contributions',
    ]);
  });

  it('keeps older sections below any project with a newer log', () => {
    const groups = getLogsByProject();
    const order = groups.map((group) => group.project);

    const openSourceIndex = order.indexOf('open-source');
    const mangoIndex = order.indexOf('mango');
    const tomatoIndex = order.indexOf('tomato');
    const itchIndex = order.indexOf('itch-hw');

    if (
      openSourceIndex === -1 ||
      mangoIndex === -1 ||
      tomatoIndex === -1 ||
      itchIndex === -1
    ) {
      return;
    }

    // Open Source / Mango (Aug 11) above Tomato (Aug 7) above ITCH (Aug 2).
    expect(openSourceIndex).toBeLessThan(tomatoIndex);
    expect(mangoIndex).toBeLessThan(tomatoIndex);
    expect(tomatoIndex).toBeLessThan(itchIndex);
  });
});

describe('writing section anchors', () => {
  it('builds section hrefs that match the writing index headings', () => {
    expect(getWritingSectionHref('tomato')).toBe('/writing/#writing-tomato');
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
