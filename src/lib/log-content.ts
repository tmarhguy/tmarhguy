const DESIGN_ARTIFACT =
  /\.(?:kicad_sch|kicad_pcb|kicad_pro|dig|sch|pcb|v|hex|xdc|tcl)$/i;

const METADATA_LINE = /^\*\*(?:Date|Status|Related|Supersedes):\*\*\s*.+$/im;

function plainText(markdown: string): string {
  return markdown
    .replace(/^#+\s+.+$/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptFrom(text: string, title: string): string {
  const excerpt = text || title;
  return excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt;
}

/** Strip dates and note metadata that leaked into card excerpts. */
export function stripDescriptionNoise(text: string): string {
  return text
    .replace(/^(?:Date:\s*)?\d{4}-\d{2}-\d{2}\s*/i, '')
    .replace(
      /^(?:Date:\s*)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\s*/i,
      '',
    )
    .replace(/^(?:Date:\s*\d{4}-\d{2}-\d{2}\s*)+/i, '')
    .replace(/^(?:Status:\s*[^.]+?\s*)+/i, '')
    .replace(/^(?:Supersedes:\s*[^.]+?\s*)+/i, '')
    .replace(/^(?:Related:\s*[^.]+?\s*)+/i, '')
    .replace(/^---\s*/, '')
    .trim();
}

/** Compact date for homepage strips and secondary labels. */
export function formatDateCompact(dateStr: string): string {
  if (!dateStr) {
    return '';
  }

  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Writing index + post letterhead: MMM DD, YYYY */
export function formatWritingDate(dateStr: string): string {
  if (!dateStr) {
    return '';
  }

  const date = new Date(`${dateStr}T12:00:00`);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

/** Strip Obsidian note chrome and unlink design artifacts that are not on the site. */
export function smoothLogContent(content: string, title: string): string {
  let body = content.replace(/\r\n/g, '\n').trim();

  const titleHeading = new RegExp(
    `^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n+`,
    'i',
  );
  body = body.replace(titleHeading, '');

  // Post pages already render frontmatter title in the header. Any remaining
  // leading markdown h1 is note chrome — demote it so it does not compete
  // with the page title at base h1 size.
  body = body.replace(/^#\s+(.+)\n+/, '## $1\n\n');

  while (METADATA_LINE.test(body)) {
    body = body.replace(METADATA_LINE, '').trimStart();
  }

  body = body.replace(/^---\s*\n+/, '');

  body = body.replace(
    /\[([^\]]+)]\(([^)]+)\)/g,
    (match, label: string, href: string) => {
      if (/^https?:\/\//i.test(href) || href.startsWith('/')) {
        return match;
      }

      if (DESIGN_ARTIFACT.test(href) || href.includes('/')) {
        return `\`${label}\``;
      }

      return match;
    },
  );

  body = body.replace(/\n{3,}/g, '\n\n');

  return body.trim();
}

export function smoothLogDescription(
  description: string,
  content: string,
  title: string,
): string {
  const cleaned = stripDescriptionNoise(description);
  const looksPolluted =
    /^Date:/i.test(description) ||
    /^\d{4}-\d{2}-\d{2}\b/.test(description) ||
    cleaned.length < 24;

  const source = looksPolluted
    ? plainText(smoothLogContent(content, title))
    : cleaned;

  return excerptFrom(stripDescriptionNoise(source), title);
}
