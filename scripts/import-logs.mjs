#!/usr/bin/env node
/**
 * Import Obsidian build notes from ../tomato/docs/log into content/writing/.
 * Run after adding new Tomato log files: npm run import-logs
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { basename, join, resolve } from 'node:path';

import { syncWritingMedia } from './sync-writing-media.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const SOURCE = resolve(ROOT, '../tomato/docs/log');
const TARGET = resolve(ROOT, 'content/writing');

const PROJECT_BY_FILE = {
  'welcome-to-tomato-32.md': 'tomato',
  '2026-06-10-implementing-mul-div-engine.md': 'tomato',
  '2026-06-11-load-store-pipeline-analysis.md': 'tomato',
  '2026-06-15-multiplication-and-division.md': 'tomato',
  '2026-06-16-microcode-control-modularization.md': 'tomato',
  '2026-06-19-alu-segment-display-design.md': 'alu',
  '2026-06-26-alu-redesign-with-74251.md': 'alu',
  '2026-06-26-alu-architecture-refinement-logic-optimization.md': 'alu',
  '2026-06-27-elimination-of-mode-multiplexers.md': 'tomato',
  '2026-07-13-architecture-upgrade.md': 'tomato',
  '2026-07-13-demo-ideas.md': 'tomato',
  '2026-07-13-downgrade-for-an-upgrade-32b-to-16b-x-4.md': 'tomato',
  '2026-07-13-pipelined-fpga-what-if.md': 'tomato',
  '2026-07-13-truth-table-latch.md': 'tomato',
  '2026-07-30-redesign-into-40b-old-design-32b.md': 'tomato',
  '2026-07-31-falling-back-to-32b.md': 'tomato',
  '2026-07-31-the-lingering-thoughts.md': 'tomato',
  '2026-08-01-shell-ui-mango.md': 'mango',
  '2026-08-01-tools.md': 'mango',
  '2026-08-02-designing-additional-boards.md': 'tomato',
  '2026-08-07-ordered-tomato.md': 'tomato',
  '2026-08-01-itch-ethernet-lab-bring-up.md': 'itch-hw',
  '2026-08-02-successful-synthesis-implementation-bitstream.md': 'itch-hw',
  '2026-08-08-understanding-udp-stack-and-connecting-to-itch.md': 'udp-stack',
  '2026-08-08-automating-vivado-openlane-ppa-extraction.md': 'orange',
  '2026-08-03-reassessing-mac-for-optimization.md': 'mac',
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function parseFilename(filename) {
  const base = basename(filename, '.md');
  const dated = /^(\d{4}-\d{2}-\d{2}) - (.+)$/.exec(base);
  if (dated) {
    const [, date, title] = dated;
    return {
      date,
      title,
      slug: `${date}-${slugify(title)}`,
    };
  }

  return {
    date: '2025-08-01',
    title: base,
    slug: slugify(base),
  };
}

function inferProject(slug, title, body) {
  if (PROJECT_BY_FILE[`${slug}.md`]) {
    return PROJECT_BY_FILE[`${slug}.md`];
  }

  const haystack = `${title} ${body}`.toLowerCase();
  if (
    /\bmac\b|librelane/.test(haystack) &&
    !/tomato/.test(title.toLowerCase())
  ) {
    return 'mac';
  }
  if (/mango|shell ui/.test(haystack)) {
    return 'mango';
  }
  if (/ethernet|synthesis|bitstream|vivado|itch|moldudp|nexys/.test(haystack)) {
    return 'itch-hw';
  }
  if (/\balu\b|74283|74251|74182|segment display/.test(haystack)) {
    return 'alu';
  }
  return 'tomato';
}

function normalizeMedia(markdown) {
  let text = markdown.replace(/\r\n/g, '\n');

  text = text.replace(/<p align="center">([\s\S]*?)<\/p>\s*/gi, '$1\n\n');

  text = text.replace(
    /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*\balt=["']([^"']*)["'][^>]*\/?>/gi,
    '![$2]($1)',
  );
  text = text.replace(
    /<img\b[^>]*\balt=["']([^"']*)["'][^>]*\bsrc=["']([^"']+)["'][^>]*\/?>/gi,
    '![$1]($2)',
  );

  text = text.replace(/\]\(\.\.\/\.\.\/media\//g, '](/images/');
  text = text.replace(/\bsrc=["']\.\.\/\.\.\/media\//g, 'src="/images/');

  return text;
}

function stripBrokenMedia(markdown) {
  return markdown
    .replace(/!\[[^\]]*]\([^)]+\)/g, (match) => {
      const href = /\(([^)]+)\)/.exec(match)?.[1] ?? '';
      if (href.startsWith('/') || /^https?:\/\//i.test(href)) {
        return match;
      }
      return '';
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function findSlugForMdHref(href, files) {
  const name = decodeURIComponent(href.split('/').pop() || '');
  if (!name.endsWith('.md')) {
    return null;
  }

  const match = files.find(
    (filename) => filename.toLowerCase() === name.toLowerCase(),
  );
  return match ? parseFilename(match).slug : null;
}

function sanitizeMarkdown(markdown, files) {
  const rewriteLink = (text, href) => {
    if (/^https?:\/\//i.test(href) || href.startsWith('/')) {
      return `[${text}](${href})`;
    }

    const logSlug = findSlugForMdHref(href, files);
    if (logSlug) {
      return `[${text}](/writing/${logSlug}/)`;
    }

    if (
      href.includes('../') ||
      href.includes('./') ||
      href.endsWith('/') ||
      href.endsWith('.md') ||
      href.endsWith('.dig')
    ) {
      return text;
    }

    return `[${text}](${href})`;
  };

  const withLogLinks = markdown.replace(
    /\[([^\]]+)\]\((.+?\.md)\)/g,
    (match, text, href) => rewriteLink(text, href),
  );

  return withLogLinks.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) =>
    rewriteLink(text, href),
  );
}

const METADATA_LINE = /^\*\*(?:Date|Status|Related|Supersedes):\*\*\s*.+$/im;

const DESIGN_ARTIFACT =
  /\.(?:kicad_sch|kicad_pcb|kicad_pro|dig|sch|pcb|v|hex|xdc|tcl)$/i;

function smoothImportedBody(body, title) {
  let text = body.replace(/\r\n/g, '\n').trim();

  const titleHeading = new RegExp(
    `^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n+`,
    'i',
  );
  text = text.replace(titleHeading, '');

  while (METADATA_LINE.test(text)) {
    text = text.replace(METADATA_LINE, '').trimStart();
  }

  text = text.replace(/^---\s*\n+/, '');

  text = text.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, label, href) => {
    if (/^https?:\/\//i.test(href) || href.startsWith('/')) {
      return match;
    }
    if (DESIGN_ARTIFACT.test(href) || href.includes('/')) {
      return `\`${label}\``;
    }
    return match;
  });

  return text.replace(/\n{3,}/g, '\n\n').trim();
}

function descriptionFrom(body, title) {
  const plain = body
    .replace(/^#+\s+.+$/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const excerpt = plain || title;
  return excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt;
}

function firstArticleImage(body) {
  const match = /!\[([^\]]*)]\((\/images\/[^)]+)\)/.exec(body);
  if (!match) {
    return null;
  }

  return {
    image: match[2],
    imageAlt: match[1]?.trim() || 'Illustration',
  };
}

function yamlEscape(value) {
  return value.replace(/"/g, '\\"');
}

if (!existsSync(SOURCE)) {
  console.error(`Source directory not found: ${SOURCE}`);
  process.exit(1);
}

mkdirSync(TARGET, { recursive: true });

const files = readdirSync(SOURCE).filter((name) => name.endsWith('.md'));
let written = 0;

for (const filename of files) {
  const sourcePath = join(SOURCE, filename);
  const raw = readFileSync(sourcePath, 'utf8');
  const { date, title, slug } = parseFilename(filename);
  const sanitized = sanitizeMarkdown(
    stripBrokenMedia(normalizeMedia(raw)),
    files,
  );
  const body = smoothImportedBody(sanitized, title);
  const project = inferProject(slug, title, body);
  const description = descriptionFrom(body, title);
  const hero = firstArticleImage(body);
  const imageFields = hero
    ? `image: '${hero.image}'
imageAlt: "${yamlEscape(hero.imageAlt)}"
`
    : '';
  const output = `---
title: "${yamlEscape(title)}"
date: '${date}'
description: "${yamlEscape(description)}"
project: ${project}
${imageFields}---

${body}
`;

  writeFileSync(join(TARGET, `${slug}.md`), output, 'utf8');
  written += 1;
  console.log(`imported ${slug} → ${project}`);
}

const synced = syncWritingMedia();
console.log(`\nWrote ${written} entries to content/writing/`);
console.log(`Synced ${synced} image(s) to public/images/`);
