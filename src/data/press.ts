import coverage from './press.json';

export const PRESS_TOPICS = [
  'Rights & education',
  'Academic milestones',
  'Engineering',
  'Interviews',
] as const;
export const PRESS_MEDIA = [
  'Articles',
  'Interviews & video',
  'Social posts',
  'Research',
] as const;
export type PressTopic = (typeof PRESS_TOPICS)[number];
export interface PressEntry {
  id: string;
  date: string;
  publisher: string;
  title: string;
  url: string;
  topic: string;
  summary: string;
  format: string;
  featured?: string;
  note?: string;
  evidence: string;
  checked: string;
  related?: { publisher: string; title: string; url: string; kind: string }[];
}
export const pressEntries: PressEntry[] = coverage;
export const pressLinkCount = coverage.reduce(
  (count, entry) => count + 1 + (entry.related?.length ?? 0),
  0,
);
export const yearChapters: Record<string, string> = {
  '2021': 'The right to an education',
  '2023': 'Finishing school, looking ahead',
  '2024': 'From Ghana to Penn',
  '2025': 'A new chapter in Philadelphia',
  '2026': 'Building from first principles',
};
export function formatPressDate(date: string) {
  if (date.length === 4) return date;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
export function filterPressEntries(
  query: string,
  topic: string,
  newestFirst: boolean,
  medium = 'All formats',
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return pressEntries
    .filter((entry) => {
      const text = [
        entry.title,
        entry.publisher,
        entry.summary,
        entry.date,
        entry.format,
        ...(entry.related ?? []).flatMap((item) => [
          item.title,
          item.publisher,
        ]),
      ]
        .join(' ')
        .toLocaleLowerCase();
      const hasSocial =
        /Social/.test(entry.format) ||
        (entry.related ?? []).some((item) => /Social/.test(item.kind));
      const mediaMatch =
        medium === 'All formats' ||
        (medium === 'Social posts' && hasSocial) ||
        (medium === 'Interviews & video' &&
          /Interview|Video|Podcast/i.test(entry.format)) ||
        (medium === 'Research' && entry.format === 'Research') ||
        (medium === 'Articles' &&
          !/Social|Interview|Video|Podcast|Research/i.test(entry.format));
      return (
        mediaMatch &&
        (topic === 'All' || entry.topic === topic) &&
        terms.every((term) => text.includes(term))
      );
    })
    .sort((a, b) => {
      const dates = a.date.localeCompare(b.date);
      return (newestFirst ? -dates : dates) || a.id.localeCompare(b.id);
    });
}
