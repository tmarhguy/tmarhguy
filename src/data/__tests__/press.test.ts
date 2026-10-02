import { describe, expect, it } from 'vitest';
import {
  filterPressEntries,
  formatPressDate,
  pressEntries,
  pressLinkCount,
} from '../press';

describe('press archive', () => {
  it('keeps source URLs unique and directly links to original publishers', () => {
    const urls = pressEntries.flatMap((entry) => [
      entry.url,
      ...(entry.related ?? []).map((item) => item.url),
    ]);
    expect(new Set(urls).size).toBe(urls.length);
    expect(pressLinkCount).toBe(urls.length);
    expect(new Set(pressEntries.map((entry) => entry.id)).size).toBe(
      pressEntries.length,
    );
    for (const url of urls) {
      expect(new URL(url).protocol).toBe('https:');
      expect(new URL(url).hostname).not.toMatch(/google\./);
    }
    for (const entry of pressEntries) {
      expect(entry.date).toMatch(/^\d{4}(-\d{2}-\d{2})?$/);
      expect(formatPressDate(entry.date)).not.toContain('Invalid');
      expect(entry.evidence).toBeTruthy();
    }
  });
  it('searches related publishers and intersects topic and format filters', () => {
    const social = filterPressEntries(
      'Kobe',
      'Engineering',
      false,
      'Social posts',
    );
    expect(social.map((entry) => entry.id)).toContain('kobe-social');
    expect(filterPressEntries('Kobe', 'Academic milestones', false)).toEqual(
      [],
    );
    expect(
      filterPressEntries('Pulse Ghana', 'Engineering', false).map(
        (entry) => entry.id,
      ),
    ).toContain('alu-first');
    expect(
      filterPressEntries('', 'All', false, 'Research').map((entry) => entry.id),
    ).toContain('ucc-commentary');
    expect(filterPressEntries('not-a-real-story-xyz', 'All', false)).toEqual(
      [],
    );
  });
  it('reverses date ordering without mutating the source catalogue', () => {
    const before = pressEntries.map((entry) => entry.id);
    const oldest = filterPressEntries('', 'All', false);
    const newest = filterPressEntries('', 'All', true);
    expect(oldest[0].date).toBe('2021-03-20');
    expect(newest[0].date).toBe('2026-07-20');
    expect(pressEntries.map((entry) => entry.id)).toEqual(before);
    expect(formatPressDate('2024')).toBe('2024');
  });
});
