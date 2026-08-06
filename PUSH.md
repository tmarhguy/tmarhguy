# Ready to push

The site is validated and ready. CI will build and deploy to GitHub Pages when you merge to `main`.

## One-time GitHub setup (do this once)

1. **Settings → Pages** → Build and deployment source: **GitHub Actions**
2. **Actions** tab → enable workflows if this is a fork (disabled by default)
3. **Custom domain** (`tmarhguy.com`): add under Settings → Pages and configure DNS per [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
4. **Optional analytics**: add repository variable `NEXT_PUBLIC_GA_TRACKING_ID` with your GA4 measurement ID

## What was prepared

- `.github/workflows/node.js.yml` — CI + GitHub Pages deploy on push to `main`
- `.github/dependabot.yml` — weekly dependency updates
- `.gitignore` — excludes `out/`, `legacy/`, `node_modules/`, `.next/`, env files
- Test fix for the About page "Now - (Fall 2026)" section heading
- Full validation passed: format, lint, type-check, 424 tests, og:check, build, verify-export

## Commit and push

From the repo root:

```powershell
git add -A
git reset HEAD out legacy node_modules .next tsconfig.tsbuildinfo next-env.d.ts 2>$null

git status   # confirm: no out/, legacy/, or node_modules/

git commit -m "feat: replace Vite portfolio with Next.js static site"

git push origin main
```

If you prefer a topic branch and PR (recommended by AGENTS.md):

```powershell
git checkout -b feat/nextjs-site
git add -A
git reset HEAD out legacy node_modules .next tsconfig.tsbuildinfo next-env.d.ts 2>$null
git commit -m "feat: replace Vite portfolio with Next.js static site"
git push -u origin feat/nextjs-site
```

Then open a PR on GitHub and merge when CI is green. Deploy runs automatically on merge to `main`.

## Do not commit

| Path | Reason |
|------|--------|
| `out/` | CI builds the static export |
| `legacy/` | Old Vite site kept locally for reference |
| `node_modules/` | Installed by `npm ci` in CI |
| `.next/` | Dev/build cache |
| `.env` / `.env.local` | Secrets |

## Local validation (optional)

If `npm ci` fails under OneDrive, pause sync or run from a temp copy:

```powershell
npm run format
npm run lint
npm run type-check
npm test
npm run og:check
npm run build
npm run verify-export
```

## After push

1. Watch the **Actions** tab — CI should pass and deploy
2. Visit https://tmarhguy.com (or your Pages URL) once deploy completes
3. Spot-check: home, resume, writing, contact, light/dark theme
