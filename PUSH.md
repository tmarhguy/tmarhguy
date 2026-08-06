# Ready to push

You already have **18 commits** on `main` ahead of `origin/main`. One final commit is needed for the remaining files (including the CI/deploy workflow), then push.

## One-time GitHub setup (do this once)

1. **Settings → Pages** → Build and deployment source: **GitHub Actions**
2. **Actions** tab → enable workflows if this is a fork (disabled by default)
3. **Custom domain** (`tmarhguy.com`): add under Settings → Pages and configure DNS per [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
4. **Optional analytics**: add repository variable `NEXT_PUBLIC_GA_TRACKING_ID` with your GA4 measurement ID

## What was added in this session

- `.github/workflows/node.js.yml` — CI + GitHub Pages deploy on push to `main`
- `.gitignore` — `legacy/` excluded (old Vite site kept locally only)
- Full validation passed: format, lint, type-check, 424 tests, og:check, build, verify-export

## Final commit and push

From the repo root:

```powershell
git add -A
git reset HEAD out legacy node_modules .next tsconfig.tsbuildinfo next-env.d.ts 2>$null

git status   # confirm: no out/, legacy/, or node_modules/

git commit -m "ci: add GitHub Actions deploy workflow and remaining site assets"

git push origin main
```

## Still to be committed (untracked/modified)

- `.github/workflows/node.js.yml` — **required for deploy**
- `app/projects/`, `public/`, `scripts/`, remaining `src/` components and data
- Modified: `app/resume/page.tsx`, `docs/getting-started.md`, `tsconfig.json`
- `PUSH.md`, `AGENTS.md`, `CLAUDE.md`, `.env.example`, `github_push.md`

## Do not commit

| Path | Reason |
|------|--------|
| `out/` | CI builds the static export |
| `legacy/` | Old Vite site kept locally for reference |
| `node_modules/` | Installed by `npm ci` in CI |
| `.next/` | Dev/build cache |
| `.env` / `.env.local` | Secrets |

## After push

1. Watch the **Actions** tab — CI should pass and deploy automatically
2. Visit https://tmarhguy.com once deploy completes
3. Spot-check: home, resume, writing, contact, light/dark theme

## Local validation (optional)

If `npm ci` fails under OneDrive, pause sync or clone to a temp folder:

```powershell
npm run format
npm run lint
npm run type-check
npm test
npm run og:check
npm run build
npm run verify-export
```
