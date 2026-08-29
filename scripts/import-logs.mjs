#!/usr/bin/env node
/**
 * Import Obsidian build notes from tomato/docs/log, tools/log, and alu/docs/log
 * into content/writing/. Prefers in-repo clones, then sibling checkouts.
 * Skips files that already exist under content/writing/ (polished posts win).
 * Run after adding new log files: npm run import-logs
 * Force overwrite: IMPORT_LOGS_FORCE=1 npm run import-logs
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
const TARGET = resolve(ROOT, 'content/writing');
const FORCE = process.env.IMPORT_LOGS_FORCE === '1';

/** Prefer in-repo clones, then sibling checkouts next to this website. */
const SOURCE_DIRS = [
  resolve(ROOT, 'tomato/docs/log'),
  resolve(ROOT, 'tools/log'),
  resolve(ROOT, 'alu/docs/log'),
  resolve(ROOT, '../tomato/docs/log'),
  resolve(ROOT, '../tools/log'),
  resolve(ROOT, '../alu/docs/log'),
].filter((dir) => existsSync(dir));

/** Stub vault index files that are not publishable build notes. */
const SKIP_FILES = new Set(['Welcome.md']);

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
  '2026-08-03-mango-arrow-navigation-video-pipeline.md': 'mango',
  '2026-08-11-system-wide-call.md': 'mango',
  '2026-08-27-images-to-pdf-and-uninstall.md': 'mango',
  '2026-08-02-designing-additional-boards.md': 'tomato',
  '2026-08-07-ordered-tomato.md': 'tomato',
  '2026-08-13-front-page-news-in-ashtown-valley.md': 'tomato',
  '2026-08-13-solder-station-arrives.md': 'tomato',
  '2026-08-15-pcbs-arrive.md': 'tomato',
  '2026-08-15-isa-as-a-wire.md': 'tomato',
  '2026-08-16-tomato-web-optimization.md': 'tomato',
  '2026-08-18-first-phase-of-assembly.md': 'tomato',
  '2026-08-20-the-gallery-paradox.md': 'tomato',
  '2026-08-21-first-lights-and-flux.md': 'tomato',
  '2026-08-23-the-invisible-logic.md': 'tomato',
  '2026-08-26-the-pmod-pivot.md': 'tomato',
  '2026-08-28-exploring-beyond-vivado-open-source-synthesis-pivot.md': 'tomato',
  '2026-08-28-one-press-one-key.md': 'tomato',
  '2026-08-28-successful-video-fpga-pmod.md': 'tomato',
  '2026-08-29-tomato-works-beautifully.md': 'tomato',
  '2026-08-29-register-upgrade.md': 'tomato',
  '2026-08-25-fab-overhead.md': 'alu',
  '2026-08-01-itch-ethernet-lab-bring-up.md': 'itch-hw',
  '2026-08-02-successful-synthesis-implementation-bitstream.md': 'itch-hw',
  '2026-08-08-understanding-udp-stack-and-connecting-to-itch.md': 'udp-stack',
  '2026-08-08-automating-vivado-openlane-ppa-extraction.md': 'orange',
  '2026-08-09-first-open-source-contributions.md': 'open-source',
  '2026-08-11-librelane-verilator-openfpga.md': 'open-source',
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
    /open.?source|verilator|openfpga|openroad/.test(haystack) ||
    (/librelane/.test(haystack) && !/\bmac\b|tapeout|sky130/.test(haystack))
  ) {
    return 'open-source';
  }
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
  text = text.replace(/\]\(\.\.\/\.\.\/\.\.\/media\//g, '](/images/');
  text = text.replace(/\bsrc=["']\.\.\/\.\.\/media\//g, 'src="/images/');
  text = text.replace(/\bsrc=["']\.\.\/\.\.\/\.\.\/media\//g, 'src="/images/');
  // tomato/docs/log → ../../web/assets/assembly/foo.webp
  text = text.replace(/\]\(\.\.\/\.\.\/web\/assets\//g, '](/images/');
  text = text.replace(/\bsrc=["']\.\.\/\.\.\/web\/assets\//g, 'src="/images/');
  text = text.replace(
    /\bposter=["']\.\.\/\.\.\/web\/assets\//g,
    'poster="/images/',
  );
  text = text.replace(/\bposter=["']\.\.\/\.\.\/media\//g, 'poster="/images/');
  // tools/log → ../media/foo.png
  text = text.replace(/\]\(\.\.\/media\//g, '](/images/mango/');
  text = text.replace(/\bsrc=["']\.\.\/media\//g, 'src="/images/mango/');

  const rewriteAssetSrc = (src) =>
    src
      .replace(/^\.\.\/\.\.\/web\/assets\//, '/images/')
      .replace(/^\.\.\/\.\.\/media\//, '/images/')
      .replace(/^\.\.\/media\//, '/images/mango/');

  text = text.replace(
    /<video\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)>/gi,
    (_m, pre, src, post) =>
      `<video${pre}src="${rewriteAssetSrc(src)}"${post.replace(
        /\bposter=["']([^"']+)["']/gi,
        (_p, poster) => `poster="${rewriteAssetSrc(poster)}"`,
      )}>`,
  );

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

if (SOURCE_DIRS.length === 0) {
  console.error(
    'No log sources found (tomato/docs/log, tools/log, alu/docs/log, or sibling clones).',
  );
  process.exit(1);
}

mkdirSync(TARGET, { recursive: true });

const seen = new Map();
for (const sourceDir of SOURCE_DIRS) {
  for (const filename of readdirSync(sourceDir).filter((name) =>
    name.endsWith('.md'),
  )) {
    if (SKIP_FILES.has(filename)) {
      continue;
    }
    if (!seen.has(filename)) {
      seen.set(filename, join(sourceDir, filename));
    }
  }
}

const files = [...seen.keys()];
let written = 0;
let skipped = 0;

for (const filename of files) {
  const sourcePath = seen.get(filename);
  const raw = readFileSync(sourcePath, 'utf8');
  const { date, title, slug } = parseFilename(filename);
  const outPath = join(TARGET, `${slug}.md`);

  if (!FORCE && existsSync(outPath)) {
    skipped += 1;
    continue;
  }

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

  writeFileSync(outPath, output, 'utf8');
  written += 1;
  console.log(`imported ${slug} → ${project}`);
}

const synced = syncWritingMedia();
console.log(`\nWrote ${written} entries to content/writing/`);
if (skipped > 0) {
  console.log(
    `Skipped ${skipped} existing entries (set IMPORT_LOGS_FORCE=1 to overwrite)`,
  );
}
console.log(`Synced ${synced} image(s) to public/images/`);
