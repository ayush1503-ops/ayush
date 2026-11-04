# Localhost — Ayush Thakur portfolio

| server | command | url |
|---|---|---|
| dev (HMR) | `npm run dev` | http://localhost:5173 |
| production build | `npm run build && npm run preview` | http://localhost:4173 |

Routes: `/` (index), `/portfolio` (full catalogue), `/resume` (CV). CV PDF at `/ayush-thakur-cv.pdf`.

## Design language (current)
Chunky ink borders + hard offset shadows on cream paper, laid over the orange wall — extended into a wider
palette (yellow / cobalt / mint / chilli) so each chapter reads differently. Jost 900 for display, JetBrains
Mono for metadata.

## Feature parity with the reference
Top toolbar (Home / Portfolio / hint / Résumé / Download CV) · cover note + enamel badges + centre zipper +
tilted Résumé/Portfolio/Contact tabs + striped container + ID badge on a lanyard · portfolio page is a laptop
on a desk running `PORTFOLIO.EXE` with a LIBRARY sidebar (All / Live / In dev / Draft), category tabs
(All / E-commerce / 3D / Creative), cartridges that open an "OPENING…" case-file window · contact phone on
the desk · the home-page zip that opens the overview onto the four project sites.

## What moves
- **Cursor** — three-state hand-drawn glove (fist / point / three fingers).
- **Zipper** — on the home page only, and it is the seam between the overview and the work: as you scroll the
  cover peels away from the teeth, the tab runs across, and the four project cards rise out of the opening.
- **Plates** — arrive with the zip on desktop; a normal stacked list on touch/reduced-motion.
- **Case files** — window-styled overlay with focus trap + Escape.
- **Route change** — 340 ms lift-and-fade.
