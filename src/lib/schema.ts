import contact from '@/data/contact';
import degrees from '@/data/resume/degrees';
import work from '@/data/resume/work';
import type { LogEntry } from '@/lib/logs';
import {
  AUTHOR_NAME,
  SHARE_IMAGE_DIMENSIONS,
  SHARE_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_IMAGE_DIMENSIONS,
  SITE_IMAGE_PATH,
  SITE_URL,
} from '@/lib/utils';

export { SITE_URL } from '@/lib/utils';

/**
 * Centralised JSON-LD (schema.org) graph builders.
 *
 * Every node carries a stable `@id` so crawlers can merge the same entity
 * across pages (e.g. the homepage Person and a blog post's author resolve to
 * one knowledge-graph node). Pages compose these builders into a single
 * `@graph` document via {@link buildGraph}.
 */

// Stable node identifiers, referenced across pages.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WRITING_ID = `${SITE_URL}/writing/#collection`;

export const SITE_LANGUAGE = 'en-US';
export const SITE_IMAGE = `${SITE_URL}${SITE_IMAGE_PATH}`;
export const HOME_URL = `${SITE_URL}/`;

export const WRITING_DESCRIPTION =
  'Build notes from hardware projects — ALU, Tomato CPU, FPGA tapeouts, and lab bring-up.';

type SchemaNode = Record<string, unknown>;

interface Crumb {
  name: string;
  url: string;
}

/** Reference to the canonical Person node. */
export const personRef = () => ({ '@id': PERSON_ID });

/** Reference to the canonical WebSite node. */
export const websiteRef = () => ({ '@id': WEBSITE_ID });

/** Reference to the canonical writing collection node. */
export const writingRef = () => ({ '@id': WRITING_ID });

/**
 * The canonical Person entity. Emitted site-wide so every page anchors to the
 * same node; other nodes reference it via {@link personRef} instead of
 * repeating its properties.
 */
export function personNode(): SchemaNode {
  const socialLinks = contact
    .filter((item) => !item.link.startsWith('mailto:'))
    .map((item) => item.link);

  const emailItem = contact.find((item) => item.link.startsWith('mailto:'));
  const email = emailItem?.link.replace('mailto:', '');

  const currentJob = work[0];

  const [givenName, ...familyParts] = AUTHOR_NAME.split(' ');
  const familyName = familyParts.join(' ');

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR_NAME,
    givenName,
    familyName,
    url: HOME_URL,
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#person-image`,
      url: SITE_IMAGE,
      width: SITE_IMAGE_DIMENSIONS.width,
      height: SITE_IMAGE_DIMENSIONS.height,
      caption: AUTHOR_NAME,
    },
    description: SITE_DESCRIPTION,
    jobTitle: currentJob.position,
    ...(email && { email }),
    sameAs: socialLinks,
    worksFor: {
      '@type': 'Organization',
      name: currentJob.name,
      url: currentJob.url,
    },
    alumniOf: degrees.map((degree) => ({
      '@type': 'CollegeOrUniversity',
      name: degree.school,
      url: degree.link,
    })),
  };
}

/**
 * The canonical WebSite entity. Tells crawlers how to name the site in search
 * results. Emitted site-wide alongside {@link personNode}.
 */
export function websiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: HOME_URL,
    name: AUTHOR_NAME,
    alternateName: ['tmarhguy.com', 'tmarhguy'],
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: personRef(),
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#website-image`,
      url: SITE_IMAGE,
      width: SITE_IMAGE_DIMENSIONS.width,
      height: SITE_IMAGE_DIMENSIONS.height,
      caption: AUTHOR_NAME,
    },
  };
}

/**
 * A BreadcrumbList for a page. `crumbs` should describe the categorisation path
 * ending at the current page. The node id is anchored to the page url.
 */
export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

interface PageNodeOptions {
  url: string;
  name: string;
  description?: string;
  /** Attaches a `breadcrumb` reference (the BreadcrumbList must also be emitted). */
  hasBreadcrumb?: boolean;
}

export interface ArticleImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

function baseWebPage(
  type: string,
  { url, name, description, hasBreadcrumb }: PageNodeOptions,
): SchemaNode {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    isPartOf: websiteRef(),
    inLanguage: SITE_LANGUAGE,
    ...(description ? { description } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };
}

/** A WebPage subtype describing a page about a person (e.g. home, about). */
export function profilePageNode(options: PageNodeOptions): SchemaNode {
  return {
    ...baseWebPage('ProfilePage', options),
    mainEntity: personRef(),
  };
}

/** A WebPage subtype for pages that primarily list things (e.g. writing, archive). */
export function collectionPageNode(options: PageNodeOptions): SchemaNode {
  return {
    ...baseWebPage('CollectionPage', options),
    about: personRef(),
  };
}

/** A plain WebPage, used for individual article pages. */
export function webPageNode(options: PageNodeOptions): SchemaNode {
  return baseWebPage('WebPage', options);
}

/**
 * The writing collection node — build notes grouped by project.
 */
export function writingCollectionNode(dateModified?: string): SchemaNode {
  return {
    '@type': 'Blog',
    '@id': WRITING_ID,
    isPartOf: websiteRef(),
    mainEntityOfPage: { '@id': `${SITE_URL}/writing/#webpage` },
    name: `${AUTHOR_NAME}'s Writing`,
    description: WRITING_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    ...(dateModified ? { dateModified } : {}),
    publisher: personRef(),
  };
}

/** A BlogPosting for an individual writing entry. */
export function writingEntryNode(
  entry: LogEntry,
  articleImage?: ArticleImage,
): SchemaNode {
  const url = `${SITE_URL}/writing/${entry.slug}/`;
  const image = articleImage ?? {
    url: `${SITE_URL}${SHARE_IMAGE_PATH}`,
    width: SHARE_IMAGE_DIMENSIONS.width,
    height: SHARE_IMAGE_DIMENSIONS.height,
  };

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: writingRef(),
    headline: entry.title,
    description: entry.description,
    inLanguage: SITE_LANGUAGE,
    datePublished: entry.date,
    dateModified: entry.date,
    author: personRef(),
    publisher: personRef(),
    about: entry.projectLabel,
    image: {
      '@type': 'ImageObject',
      '@id': `${url}#article-image`,
      url: image.url,
      width: image.width,
      height: image.height,
      ...(image.alt ? { caption: image.alt } : {}),
    },
  };
}

/** Wraps nodes into a single `@graph` JSON-LD document. */
export function buildGraph(nodes: SchemaNode[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
