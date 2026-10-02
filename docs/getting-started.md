# Getting started

The source for [tmarhguy.com](https://tmarhguy.com) — a portfolio, résumé,
project archive, and writing site built with
[Next.js](https://nextjs.org/), [React](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/), and
[Tailwind CSS](https://tailwindcss.com/).

**[Visit the live site →](https://tmarhguy.com)**

## What is here

- A statically exported Next.js 16 site, deployed to [Vercel](https://vercel.com) at [tmarhguy.com](https://tmarhguy.com).
- A responsive light/dark design system built from semantic CSS tokens.
- Markdown writing with drafts, RSS, and page metadata.
- A filterable résumé that still prints in full.
- Tests for components, content, metadata, and the final static export.

## Setup

With [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you use another version manager, choose a release accepted by `engines.node`
in `package.json`.

## Commands

```bash
npm run dev             # Start the development server
npm run format          # Format with Prettier and Biome
npm run lint            # Run Biome checks
npm run type-check      # Run TypeScript
npm test                # Run Vitest
npm run build           # Build the production static export
npm run verify-export   # Inspect the generated HTML and XML
npm run og              # Regenerate the share card
npm run og:check        # Verify the committed share card is current
```

## PDF resumes

Edit `docs/resume/hardware.tex` and `docs/resume/software.tex`. Each file is
standalone and opens in Codex's LaTeX editor with a live PDF preview. Keep
contact details aligned with `src/data/profile.json`.

For command-line exports, install either Tectonic or a TeX distribution with
`latexmk`, plus Poppler (`pdfinfo`). No npm dependencies are needed by the
resume script.

```bash
npm run resume:check                 # Compile and validate without replacing PDFs
npm run resume:build                 # Validate both, then update website downloads
npm run resume:build -- --engine tectonic
```

The build rejects multi-page PDFs, overflowing text boxes, and an email that
differs from the website profile. It compiles into a temporary directory and
cleans up afterward. Visually inspect the PDFs after content or layout changes;
these automated checks cannot judge spacing or typography.

The Resume workflow compiles both sources, applies the same validation and
uploads review PDFs on pull requests. Main-branch pushes and manual runs on
main also commit the validated PDFs in `public/`. PDF-only commits do not
retrigger the workflow.

## Validation

Run before pushing:

```bash
npm run format
npm run lint
npm run type-check
npm test
npm run og:check
npm run build
npm run verify-export
```

CI runs the same checks on every pull request. Pushes to `main` deploy to
[tmarhguy.com](https://tmarhguy.com).

## Credits

This site started from
**[personal-site](https://github.com/mldangelo/personal-site)** by
[Michael D'Angelo](https://mldangelo.com) — layout, design system, static-export
patterns, and much of the original architecture. This version keeps that
foundation under the [MIT license](../LICENSE) and adapts content, routes, and
features for [tmarhguy.com](https://tmarhguy.com).

If you fork this repository, keep Michael's copyright notice in `LICENSE` and
consider linking back to the [upstream project](https://github.com/mldangelo/personal-site).

## License

MIT — see [LICENSE](../LICENSE).
