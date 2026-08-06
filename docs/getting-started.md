# Getting started

The source for [tmarhguy.com](https://tmarhguy.com) — a portfolio, résumé,
project archive, and writing site built with
[Next.js](https://nextjs.org/), [React](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/), and
[Tailwind CSS](https://tailwindcss.com/).

**[Visit the live site →](https://tmarhguy.com)**

## What is here

- A statically exported Next.js 16 site deployed to GitHub Pages.
- A responsive light/dark design system built from semantic CSS tokens.
- Markdown writing with drafts, RSS, and page metadata.
- A filterable résumé that still prints in full.
- Tests for components, content, metadata, and the final static export.

## Manual setup

With [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you use another version manager, choose a release accepted by `engines.node`
in `package.json`.

## With a coding agent

Open the repository in your agent and ask:

```text
Read AGENTS.md, use the Node version in .nvmrc, install the locked
dependencies, and start the development server. Do not change the site yet.
Tell me the local URL and report any setup failure with its exact output.
```

For a full rebrand or content pass, see
[adapting-guide.md](./adapting-guide.md) and the prompt in that document.

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

CI runs the same checks on every pull request. Pushes to `main` deploy the
static export that CI validates. See [adapting-guide.md](./adapting-guide.md)
for URL and domain setup.

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
