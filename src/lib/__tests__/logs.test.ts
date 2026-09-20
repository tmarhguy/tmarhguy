import { describe, expect, it } from 'vitest';

import {
  getAdjacentLogs,
  getAllLogs,
  getHomeRecentLogs,
  getLogBySlug,
  getLogProjectGroupKey,
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

  it('lists the newest log as the lead writing entry', () => {
    const logs = getAllLogs();
    expect(logs[0]?.slug).toBe('2026-09-15-virtual-fallback-vs-ai');
  });

  it('pins the September wallpaper log first on the homepage recent strip', () => {
    const recent = getHomeRecentLogs(3);
    expect(recent[0]?.slug).toBe(
      '2026-09-11-wallpaper-polish-and-the-rest-of-the-computer',
    );
    expect(recent.map((entry) => entry.slug)).toEqual([
      '2026-09-11-wallpaper-polish-and-the-rest-of-the-computer',
      '2026-09-15-virtual-fallback-vs-ai',
      '2026-09-15-scope-optimization',
    ]);
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

  it('attaches the FramePort Open VSX listing next to the GitHub repo', () => {
    const frameport = getAllLogs().find(
      (entry) => entry.project === 'frameport',
    );
    expect(frameport?.projectSite).toBe(
      'https://open-vsx.org/extension/tmarhguy/frameport',
    );
    expect(frameport?.projectLink).toBe(
      'https://github.com/tmarhguy/frameport',
    );
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

  it('wraps around the ends so every log stays in the loop', () => {
    const logs = getAllLogs();
    if (logs.length < 2) {
      return;
    }

    const newest = getAdjacentLogs(logs[0].slug);
    expect(newest.next?.slug).toBe(logs[logs.length - 1].slug);
    expect(newest.previous?.slug).toBe(logs[1].slug);

    const oldest = getAdjacentLogs(logs[logs.length - 1].slug);
    expect(oldest.previous?.slug).toBe(logs[0].slug);
    expect(oldest.next?.slug).toBe(logs[logs.length - 2].slug);
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

  it('lists Tomato September then Mango ahead of date-floated sections', () => {
    const groups = getLogsByProject();
    expect(groups.length).toBeGreaterThan(1);

    const openSourceGroup = groups.find(
      (group) => group.project === 'open-source',
    );
    const tomatoSepGroup = groups.find(
      (group) => group.project === 'tomato-sep',
    );
    const tomatoAugGroup = groups.find(
      (group) => group.project === 'tomato-aug',
    );
    const tomatoJulGroup = groups.find(
      (group) => group.project === 'tomato-jul',
    );
    if (
      !openSourceGroup ||
      !tomatoSepGroup ||
      !tomatoAugGroup ||
      !tomatoJulGroup
    ) {
      return;
    }

    expect(groups[0].project).toBe('tomato-sep');
    expect(groups[1].project).toBe('mango');
    expect(groups[1].entries[0]?.slug).toBe(
      '2026-08-27-images-to-pdf-and-uninstall',
    );
    expect(openSourceGroup.entries[0]?.slug).toBe(
      '2026-08-11-librelane-verilator-openfpga',
    );
    expect(openSourceGroup.entries.map((entry) => entry.slug)).toEqual([
      '2026-08-11-librelane-verilator-openfpga',
      '2026-08-09-first-open-source-contributions',
    ]);
    expect(tomatoSepGroup.projectLabel).toBe('Tomato CPU — September');
    expect(tomatoSepGroup.entries[0]?.slug).toBe(
      '2026-09-15-virtual-fallback-vs-ai',
    );
    expect(tomatoSepGroup.entries.map((entry) => entry.slug)).toEqual([
      '2026-09-15-virtual-fallback-vs-ai',
      '2026-09-15-discard-previewer-or-integrate',
      '2026-09-14-synthesis-bypass',
      '2026-09-14-multiple-participants',
      '2026-09-14-envelop-tomato-gets-a-message-app',
      '2026-09-13-isa-upgrade',
      '2026-09-11-wallpaper-polish-and-the-rest-of-the-computer',
      '2026-09-11-of-course-tomato-needs-sudoku',
      '2026-09-11-hdmi-properly-captured',
      '2026-09-11-when-assembly-is-still-too-high-level-for-tomato',
    ]);
    expect(tomatoAugGroup.projectLabel).toBe('Tomato CPU — August');
    expect(tomatoAugGroup.entries[0]?.slug).toBe('2026-08-29-register-upgrade');
    expect(
      tomatoAugGroup.entries.map((entry) => entry.slug).slice(0, 5),
    ).toEqual([
      '2026-08-29-register-upgrade',
      '2026-08-29-tomato-works-beautifully',
      '2026-08-28-successful-video-fpga-pmod',
      '2026-08-28-pixels-on-the-glass',
      '2026-08-28-one-press-one-key',
    ]);
    expect(tomatoJulGroup.projectLabel).toBe('Tomato CPU — July');
    expect(tomatoJulGroup.entries[0]?.date).toBe('2026-07-31');
  });

  it('splits Tomato into September, August, July, and Earlier folds', () => {
    const groups = getLogsByProject();
    const tomatoGroups = groups.filter((group) =>
      group.project.startsWith('tomato-'),
    );

    expect(tomatoGroups.map((group) => group.project)).toEqual([
      'tomato-sep',
      'tomato-aug',
      'tomato-jul',
      'tomato-earlier',
    ]);
    expect(
      getAllLogs()
        .filter((entry) => entry.project === 'tomato')
        .every((entry) =>
          ['tomato-sep', 'tomato-aug', 'tomato-jul', 'tomato-earlier'].includes(
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

  it('keeps Tomato September above Mango above remaining date-floated sections', () => {
    const groups = getLogsByProject();
    const order = groups.map((group) => group.project);

    const openSourceIndex = order.indexOf('open-source');
    const mangoIndex = order.indexOf('mango');
    const tomatoSepIndex = order.indexOf('tomato-sep');
    const tomatoAugIndex = order.indexOf('tomato-aug');
    const tomatoJulIndex = order.indexOf('tomato-jul');
    const itchIndex = order.indexOf('itch-hw');
    const aluIndex = order.indexOf('alu');

    if (
      openSourceIndex === -1 ||
      mangoIndex === -1 ||
      tomatoSepIndex === -1 ||
      tomatoAugIndex === -1 ||
      tomatoJulIndex === -1 ||
      itchIndex === -1
    ) {
      return;
    }

    expect(tomatoSepIndex).toBe(0);
    expect(mangoIndex).toBe(1);
    expect(mangoIndex).toBeLessThan(openSourceIndex);
    if (aluIndex !== -1) {
      expect(mangoIndex).toBeLessThan(aluIndex);
      expect(aluIndex).toBeLessThan(openSourceIndex);
    }
    expect(openSourceIndex).toBeLessThan(itchIndex);
    expect(itchIndex).toBeLessThan(tomatoJulIndex);
  });
});

describe('writing section anchors', () => {
  it('builds section hrefs that match the writing index headings', () => {
    expect(getWritingSectionHref('tomato')).toBe(
      '/writing/#writing-tomato-sep',
    );
    expect(getWritingSectionHref('itch-hw')).toBe('/writing/#writing-itch-hw');
    expect(getWritingSectionHref('frameport')).toBe(
      '/writing/#writing-frameport',
    );
  });

  it('knows which log projects have published entries', () => {
    expect(projectHasWriting('tomato')).toBe(true);
    expect(projectHasWriting('frameport')).toBe(true);
    expect(projectHasWriting('envelop')).toBe(true);
    expect(projectHasWriting('not-a-project')).toBe(false);
  });

  it('groups Envelop build notes under their own section', () => {
    const groups = getLogsByProject();
    const envelop = groups.find((group) => group.project === 'envelop');
    expect(envelop?.projectLabel).toBe('Envelop');
    expect(envelop?.entries.map((entry) => entry.slug)).toEqual([
      '2026-09-15-scope-optimization',
      '2026-09-15-parsing-simplest',
      '2026-09-14-website-and-world-connect',
      '2026-09-14-native-time-consuming-but-best',
      '2026-09-14-envelop',
    ]);
  });

  it('groups FramePort build notes under their own section', () => {
    const groups = getLogsByProject();
    const frameport = groups.find((group) => group.project === 'frameport');
    expect(frameport?.projectLabel).toBe('FramePort');
    expect(frameport?.entries.map((entry) => entry.slug)).toEqual([
      '2026-09-13-welcome-frameport',
      '2026-09-13-screenshots-and-recording',
      '2026-09-13-other-device-stream',
    ]);
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
