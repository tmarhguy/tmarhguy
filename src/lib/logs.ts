import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import { getLogProject, getLogProjectOrder } from '@/data/log-projects';
import { smoothLogContent, smoothLogDescription } from '@/lib/log-content';

export interface LogFrontmatter {
  title: string;
  date: string;
  description: string;
  project: string;
  draft?: boolean;
  image?: string;
  imageAlt?: string;
  /** Same-day tiebreaker — higher sorts first. */
  priority?: number;
}

export interface LogEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  project: string;
  projectLabel: string;
  projectLink?: string;
  projectSite?: string;
  content: string;
  draft?: boolean;
  image?: string;
  imageAlt?: string;
  priority?: number;
}

const logsDirectory = path.join(process.cwd(), 'content/writing');

function isPublished(entry: LogEntry): boolean {
  return !entry.draft || process.env.NODE_ENV === 'development';
}

function readAllSlugs(): string[] {
  if (!fs.existsSync(logsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(logsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredText(value: unknown, field: string, source: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(
      `Invalid frontmatter in ${source}: "${field}" must be a non-empty string`,
    );
  }
  return value.trim();
}

function isCalendarDate(value: string): boolean {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!parts) {
    return false;
  }

  const [, year, month, day] = parts;
  const parsed = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  );
  return (
    parsed.getUTCFullYear() === Number(year) &&
    parsed.getUTCMonth() === Number(month) - 1 &&
    parsed.getUTCDate() === Number(day)
  );
}

export function validateLogFrontmatter(
  value: unknown,
  source = 'log',
): LogFrontmatter {
  if (!isRecord(value)) {
    throw new TypeError(
      `Invalid frontmatter in ${source}: must be a YAML object`,
    );
  }

  const title = requiredText(value.title, 'title', source);
  const date = requiredText(value.date, 'date', source);
  const description = requiredText(value.description, 'description', source);
  const project = requiredText(value.project, 'project', source);

  if (!getLogProject(project)) {
    throw new TypeError(
      `Invalid frontmatter in ${source}: unknown project "${project}"`,
    );
  }

  if (!isCalendarDate(date)) {
    throw new TypeError(
      `Invalid frontmatter in ${source}: "date" must be YYYY-MM-DD`,
    );
  }

  if (value.draft !== undefined && typeof value.draft !== 'boolean') {
    throw new TypeError(
      `Invalid frontmatter in ${source}: "draft" must be a boolean when provided`,
    );
  }

  const image =
    value.image === undefined
      ? undefined
      : requiredText(value.image, 'image', source);
  const imageAlt =
    value.imageAlt === undefined
      ? undefined
      : requiredText(value.imageAlt, 'imageAlt', source);

  if (image && (!image.startsWith('/') || image.startsWith('//'))) {
    throw new TypeError(
      `Invalid frontmatter in ${source}: "image" must be a root-relative path in public/`,
    );
  }
  if (image && !imageAlt) {
    throw new TypeError(
      `Invalid frontmatter in ${source}: "imageAlt" is required when "image" is provided`,
    );
  }

  if (value.priority !== undefined) {
    if (
      typeof value.priority !== 'number' ||
      !Number.isInteger(value.priority)
    ) {
      throw new TypeError(
        `Invalid frontmatter in ${source}: "priority" must be an integer when provided`,
      );
    }
  }

  return {
    title,
    date,
    description,
    project,
    ...(value.draft === undefined ? {} : { draft: value.draft }),
    ...(image === undefined ? {} : { image }),
    ...(imageAlt === undefined ? {} : { imageAlt }),
    ...(value.priority === undefined ? {} : { priority: value.priority }),
  };
}

function readLog(slug: string): LogEntry | null {
  if (!isSafeSlug(slug)) {
    return null;
  }

  const fullPath = path.join(logsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = validateLogFrontmatter(
    data,
    path.relative(process.cwd(), fullPath),
  );
  const projectMeta = getLogProject(frontmatter.project);
  const smoothedContent = smoothLogContent(content, frontmatter.title);
  const smoothedDescription = smoothLogDescription(
    frontmatter.description,
    content,
    frontmatter.title,
  );

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: smoothedDescription,
    project: frontmatter.project,
    projectLabel: projectMeta?.label ?? frontmatter.project,
    projectLink: projectMeta?.link,
    projectSite: projectMeta?.site,
    content: smoothedContent,
    draft: frontmatter.draft,
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    priority: frontmatter.priority,
  };
}

function readPublishedLogs(): LogEntry[] {
  return readAllSlugs()
    .map(readLog)
    .filter((entry): entry is LogEntry => entry !== null)
    .filter(isPublished)
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) {
        return dateDiff;
      }

      const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return b.slug.localeCompare(a.slug);
    });
}

let cachedLogs: LogEntry[] | undefined;

export function getAllLogs(): LogEntry[] {
  if (process.env.NODE_ENV === 'development') {
    return readPublishedLogs();
  }

  cachedLogs ??= readPublishedLogs();
  return [...cachedLogs];
}

/** Homepage “Recent writing” strip — pinned lead, then newest. */
const HOME_RECENT_PIN = '2026-08-21-first-lights-and-flux';

export function getHomeRecentLogs(limit = 3): LogEntry[] {
  const logs = getAllLogs();
  const pinned = logs.find((entry) => entry.slug === HOME_RECENT_PIN);
  const rest = logs.filter((entry) => entry.slug !== HOME_RECENT_PIN);

  if (!pinned) {
    return rest.slice(0, limit);
  }

  return [pinned, ...rest.slice(0, Math.max(0, limit - 1))];
}

export function getLogSlugs(): string[] {
  return getAllLogs().map((entry) => entry.slug);
}

export function getLogBySlug(slug: string): LogEntry | null {
  if (!isSafeSlug(slug)) {
    return null;
  }

  return getAllLogs().find((entry) => entry.slug === slug) ?? null;
}

export interface LogAdjacent {
  /** Chronologically older entry. */
  previous: LogEntry | null;
  /** Chronologically newer entry. */
  next: LogEntry | null;
}

/** Neighbours in the global list (newest first). */
export function getAdjacentLogs(slug: string): LogAdjacent {
  const logs = getAllLogs();
  const index = logs.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: logs[index + 1] ?? null,
    next: logs[index - 1] ?? null,
  };
}

export interface LogProjectGroup {
  project: string;
  projectLabel: string;
  link?: string;
  entries: LogEntry[];
}

/** Writing-index group key — splits Tomato by era so one project does not dominate the page. */
export function getLogProjectGroupKey(entry: LogEntry): string {
  if (entry.project !== 'tomato') {
    return entry.project;
  }

  if (entry.date.startsWith('2026-08')) {
    return 'tomato-aug';
  }

  if (entry.date.startsWith('2026-07')) {
    return 'tomato-jul';
  }

  return 'tomato-earlier';
}

function getLogProjectGroupLabel(groupKey: string, fallback: string): string {
  switch (groupKey) {
    case 'tomato-aug':
      return 'Tomato CPU — August';
    case 'tomato-jul':
      return 'Tomato CPU — July';
    case 'tomato-earlier':
      return 'Tomato CPU — Earlier';
    default:
      return fallback;
  }
}

function getLogProjectGroupSortOrder(groupKey: string): number {
  const baseId = groupKey.startsWith('tomato-') ? 'tomato' : groupKey;
  const baseOrder = getLogProjectOrder(baseId);
  const foldOffset =
    groupKey === 'tomato-aug'
      ? 0
      : groupKey === 'tomato-jul'
        ? 1
        : groupKey === 'tomato-earlier'
          ? 2
          : 0;

  return baseOrder * 10 + foldOffset;
}

/** Preferred writing-index lead sections (before date float). */
const WRITING_SECTION_LEAD = ['tomato-aug', 'mango'] as const;

/** Logs grouped by project (Tomato split into August / July / Earlier).
 *  Tomato August, then Mango, then remaining sections by newest entry. */
export function getLogsByProject(): LogProjectGroup[] {
  const groups = new Map<string, LogProjectGroup>();

  for (const entry of getAllLogs()) {
    const groupKey = getLogProjectGroupKey(entry);
    const existing = groups.get(groupKey);
    if (existing) {
      existing.entries.push(entry);
      continue;
    }

    const baseProject = entry.project;
    groups.set(groupKey, {
      project: groupKey,
      projectLabel: getLogProjectGroupLabel(groupKey, entry.projectLabel),
      link: getLogProject(baseProject)?.link,
      entries: [entry],
    });
  }

  return [...groups.values()].sort((a, b) => {
    const aLead = WRITING_SECTION_LEAD.indexOf(
      a.project as (typeof WRITING_SECTION_LEAD)[number],
    );
    const bLead = WRITING_SECTION_LEAD.indexOf(
      b.project as (typeof WRITING_SECTION_LEAD)[number],
    );
    const aPinned = aLead === -1 ? Number.MAX_SAFE_INTEGER : aLead;
    const bPinned = bLead === -1 ? Number.MAX_SAFE_INTEGER : bLead;
    if (aPinned !== bPinned) {
      return aPinned - bPinned;
    }

    const aLatest = new Date(a.entries[0]?.date ?? 0).getTime();
    const bLatest = new Date(b.entries[0]?.date ?? 0).getTime();
    if (aLatest !== bLatest) {
      return bLatest - aLatest;
    }

    return (
      getLogProjectGroupSortOrder(a.project) -
      getLogProjectGroupSortOrder(b.project)
    );
  });
}

/** Section anchor on /writing/ for a log project id (e.g. tomato → newest Tomato fold). */
export function getWritingSectionHref(logProjectId: string): string {
  if (logProjectId === 'tomato') {
    const folds = ['tomato-aug', 'tomato-jul', 'tomato-earlier'] as const;
    const activeFolds = new Set(getAllLogs().map(getLogProjectGroupKey));
    const target = folds.find((fold) => activeFolds.has(fold)) ?? logProjectId;
    return `/writing/#writing-${target}`;
  }

  return `/writing/#writing-${logProjectId}`;
}

let cachedLogProjectIds: Set<string> | undefined;

function getLogProjectIdsWithEntries(): Set<string> {
  cachedLogProjectIds ??= new Set(getAllLogs().map((entry) => entry.project));
  return cachedLogProjectIds;
}

export function projectHasWriting(logProjectId: string): boolean {
  return getLogProjectIdsWithEntries().has(logProjectId);
}
