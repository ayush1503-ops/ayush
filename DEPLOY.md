# Deployment — Ayush Thakur portfolio

The site is a **Vite + React SPA with history-mode client-side routing** (no hash, no router dependency). Every route (`/`, `/portfolio`, `/resume`) must fall back to `dist/index.html` on refresh or direct links. All configs below include that SPA fallback.

## Prerequisites

```bash
cd ayush-portfolio
npm install        # once
npm run build      # production output → dist/   (~339 KB JS, 41 KB CSS)
npm run preview    # serve dist/ locally at :4173 to verify
```

Build output: `dist/` (gitignored, never commit it).

---

## Option 1 — Vercel (recommended, zero config)

**Via dashboard:**
1. Push the repo to GitHub/GitLab/Bitbucket.
2. Add New Project → import the repo → Framework preset: **Vite**.
3. Build command: `npm run build` · Output directory: `dist` · Install command: `npm install`.
4. Deploy. Vercel automatically rewrites all unknown paths to `index.html` for SPAs.

**Or with `vercel.json`** (already in repo) for explicit cache headers and the `index.html` fallback.

Custom domain: add it in the Vercel project settings → Domains.

---

## Option 2 — Netlify

**Via dashboard:**
1. Connect the GitHub repo.
2. Build command: `npm run build` · Publish directory: `dist`.
3. Deploy. `netlify.toml` (already in repo) handles the SPA redirect and asset caching.

**Via CLI:**
```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod --dir=dist
```

---

## Option 3 — GitHub Pages (subdirectory: `user.github.io/ayush-portfolio/`)

1. In the repo settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and deploys automatically.
3. Site URL: `https://<user>.github.io/ayush-portfolio/`.

What was wired for this:
- `vite.config.ts` reads `base` from `VITE_BASE` env (defaults to `/`, so local dev is unchanged).
- `src/lib/router.ts` strips the base path so `/portfolio` resolves inside the subdirectory.
- The workflow sets `VITE_BASE=/ayush-portfolio/`.

If you ever deploy to a root domain instead of a subdirectory, unset `VITE_BASE` (or remove it) so `base` falls back to `/`.

---

## Option 4 — Any static host (Surge, S3, Netlify Drop, etc.)

1. `npm run build`
2. Upload the entire contents of `dist/` to the host's root.
3. Configure the host's **SPA / single-page app fallback**: every request that isn't a real file must serve `dist/index.html` with a `200` status (not a 404).
   - **Surge:** `surge dist/` then add a `200.html` = copy of `index.html` in `dist/`.
   - **S3:** enable static website hosting, set index & error document to `index.html`.
   - **Netlify Drop:** drag `dist/` onto the drop zone, then add the `/* → /index.html` redirect in site settings.

---

## Pre-deploy checklist

- [ ] `npm run build` exits cleanly (TypeScript + Vite)
- [ ] `npm run preview` loads `/`, `/portfolio`, `/resume` and direct-link refreshes all work
- [ ] Console has no errors on any route
- [ ] `/ayush-thakur-cv.pdf` is present in `public/` (it's copied into `dist/` by Vite)
- [ ] SPA fallback is configured on the host (see Option 4)

---

## What was added

| File | Purpose |
|---|---|
| `vercel.json` | Explicit build output (`dist`) + SPA fallback + asset cache headers |
| `netlify.toml` | Build command/publish dir + `/* → /index.html` redirect + caching |
| `.github/workflows/deploy.yml` | GitHub Pages build + deploy on push to `main` |
| `vite.config.ts` | `base` from `VITE_BASE` env (defaults to `/`) |
| `src/lib/router.ts` | Strips the base path so history routing works in subdirectories |
| `DEPLOY.md` | This guide |
