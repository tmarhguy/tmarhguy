import type { AnchorHTMLAttributes } from 'react';

import { SITE_URL } from '@/lib/utils';

function isSameSiteAbsoluteUrl(href: string): boolean {
  try {
    const url = new URL(href);
    const site = new URL(SITE_URL);
    return url.origin === site.origin;
  } catch {
    return false;
  }
}

/** True for off-site http(s) links. Same-site, hash, mailto, and tel stay in-page. */
export function isExternalHref(href: string | undefined): boolean {
  if (!href) {
    return false;
  }

  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return false;
  }

  if (trimmed.startsWith('//')) {
    return true;
  }

  if (trimmed.startsWith('/')) {
    return false;
  }

  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return false;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return !isSameSiteAbsoluteUrl(trimmed);
  }

  return false;
}

export function externalAnchorProps(
  href: string | undefined,
): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
