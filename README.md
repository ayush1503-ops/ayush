# Ayush Thakur — portfolio (recreation of the uimaven.art design)

A high-fidelity recreation of the **uimaven.art** site structure, design system and interactions,
re-skinned with Ayush Thakur's content, projects and artwork (per your brief: *uimaven's design +
my content*, artwork regenerated rather than copied).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build
```

## Routes (client-side, no router dependency)

| Route | What it is |
|---|---|
| `/` | Cover page — orange striped wall, scroll ruler, taped paper note headline, 3 rotating badge stickers, tabbed folders (Résumé / Portfolio / Contact) with a hanging lanyard ID badge |
| `/portfolio` | Desk scene with a laptop whose screen is an interactive `PORTFOLIO.EXE` cartridge rack (library filters + category chips + 4 projects → case-study windows), then the intro, missions, arsenal, process, rates, guarantees, fit/FAQ and the closing CTA |
| `/resume` | `RESUME.EXE` dossier: masthead, 4 stat cards, sticky `SKILLS.CFG` / `LANGUAGES.TXT` / `EDUCATION.DOC` sidebar and experience cards |

`/ayush-thakur-cv.pdf` — printable one-page CV (generated from `public/cv.html`).

## What was reproduced from the reference

- **Design tokens** mirrored from the reference's compiled CSS: Jost 400–900, the orange/blue/yellow/green/red
  ramps, the 64→12px type scale, 2px black borders, hard offset shadows (no blur), 6–16px radii.
- **Textures**: `feTurbulence` grain overlay at 40% opacity, vertical wall stripes, paper noise.
- **Components**: toolbar with breadcrumb chips + rotated hint bubble, window cards with traffic-light dots,
  stat cards, chip/tag system, press-in button physics, cartridge rack, sticker badges with curved rotating text.
- **Motion**: boot/"loading" card with segmented progress bars, zipper route wipe, tab raise on hover,
  pointer parallax on the cover, sticker rotation + float, scroll reveals, case-study window spring-in,
  cartridge hover tilt with JP sound effects, `prefers-reduced-motion` respected throughout.
- **Responsive**: dedicated mobile composition (stacked note → stickers → folder rows → container + badge),
  tablet keeps the 2-column rack, desktop gets the full desk scene.

## Structure

```
src/
  lib/site.ts        all copy + data (projects, arsenal, process, rates, faq, résumé)
  lib/router.ts      tiny history router + route transition state
  components/        Icons, ui (chips/buttons/window/sticker), CoverScene, SiteToolbar,
                     DeskScene, CartridgeRack, CaseStudy
  pages/             Portfolio, Resume
public/art           regenerated artwork (mascots, avatar, folder collage)
public/shots         real screenshots of the four live projects
```
