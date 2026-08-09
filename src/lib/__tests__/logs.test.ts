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

  it('lists Understanding the UDP Stack as the newest writing entry', () => {
    const logs = getAllLogs();
    expect(logs[0]?.slug).toBe(
      '2026-08-08-understanding-udp-stack-and-connecting-to-itch',
    );
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

  it('lists NASDAQ ITCH first on the writing index', () => {
    const groups = getLogsByProject();
    const itchGroup = groups.find((group) => group.project === 'itch-hw');
    if (!itchGroup) {
      return;
    }

    expect(groups[0].project).toBe('itch-hw');
  });

  it('orders writing sections NASDAQ, MAC, Orange Metrics API, Tomato, then the rest', () => {
    const groups = getLogsByProject();
    const order = groups.map((group) => group.project);

    const itchIndex = order.indexOf('itch-hw');
    const macIndex = order.indexOf('mac');
    const orangeIndex = order.indexOf('orange');
    const tomatoIndex = order.indexOf('tomato');

    if (
      itchIndex === -1 ||
      macIndex === -1 ||
      orangeIndex === -1 ||
      tomatoIndex === -1
    ) {
      return;
    }

    expect(itchIndex).toBeLessThan(macIndex);
    expect(macIndex).toBeLessThan(orangeIndex);
    expect(orangeIndex).toBeLessThan(tomatoIndex);
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
