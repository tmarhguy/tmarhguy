#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    publish: { type: 'boolean', default: false },
    'verify-only': { type: 'string' },
    engine: { type: 'string', default: 'auto' },
  },
});
const targets = ['hardware', 'software'];
const email = JSON.parse(
  readFileSync(join(root, 'src/data/profile.json'), 'utf8'),
).email;
const run = (command, args) =>
  execFileSync(command, args, { encoding: 'utf8' });
const available = (command) =>
  spawnSync(command, [command === 'pdfinfo' ? '-v' : '--version']).status === 0;

let temporary;
try {
  if (!available('pdfinfo'))
    throw new Error('Install Poppler (pdfinfo) to validate PDF page counts.');
  for (const target of targets) {
    const source = readFileSync(
      join(root, 'docs/resume', `${target}.tex`),
      'utf8',
    );
    if (!source.includes(`\\href{mailto:${email}}{${email}}`)) {
      throw new Error(
        `${target}.tex must use the email in src/data/profile.json: ${email}`,
      );
    }
  }
  let directory;
  if (values['verify-only']) {
    directory = resolve(root, values['verify-only']);
  } else {
    let engine = values.engine;
    if (engine === 'auto') engine = ['latexmk', 'tectonic'].find(available);
    if (!['latexmk', 'tectonic'].includes(engine) || !available(engine)) {
      throw new Error(
        'Install latexmk or Tectonic; select one with --engine latexmk|tectonic.',
      );
    }
    temporary = mkdtempSync(join(tmpdir(), 'tmarhguy-resumes-'));
    directory = temporary;
    for (const target of targets) {
      const source = join(root, 'docs/resume', `${target}.tex`);
      run(
        engine,
        engine === 'tectonic'
          ? ['--outdir', directory, '--keep-logs', source]
          : [
              '-pdf',
              '-halt-on-error',
              '-interaction=nonstopmode',
              '-file-line-error',
              `-outdir=${directory}`,
              source,
            ],
      );
    }
  }
  // Validate both before replacing either website download.
  for (const target of targets) {
    const pdf = join(directory, `${target}.pdf`);
    const info = run('pdfinfo', [pdf]);
    if (!/^Pages:\s+1\s*$/m.test(info))
      throw new Error(`${target}.pdf must contain exactly one page.`);
    const log = readFileSync(join(directory, `${target}.log`), 'utf8');
    if (/Overfull \\[hv]box/.test(log))
      throw new Error(
        `${target}.tex has overflowing text; inspect its compiler log.`,
      );
    console.log(`${target}: one page, no overflowing boxes, current email`);
  }
  if (values.publish) {
    for (const target of targets) {
      const label = target[0].toUpperCase() + target.slice(1);
      copyFileSync(
        join(directory, `${target}.pdf`),
        join(root, 'public', `Tyrone-Marhguy-${label}-Resume.pdf`),
      );
    }
    console.log('Updated both PDFs in public/.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (temporary) rmSync(temporary, { recursive: true, force: true });
}
