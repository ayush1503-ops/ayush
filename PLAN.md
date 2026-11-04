# Recreation plan — uimaven.art design → Ayush Thakur content

## What I inspected (for real, via a headless browser)
| Page | URL | Notes |
|---|---|---|
| Cover | `uimaven.art/home/` | Full-viewport Konva canvas illustration: orange striped wall, "scroll ruler" in the middle, white taped note with a 4‑line headline (one line orange), 3 circular rotating badge stickers, 3 tabbed "folders" (Résumé / Portfolio / Contact) on the right, a hanging lanyard ID badge with avatar + social icons. |
| Portfolio | `uimaven.art/portfolio/` | White toolbar (Home / Portfolio chips, yellow hint bubble, mint "Résumé" + yellow "Download CV"), then a desk illustration with a laptop whose screen is an **interactive** `PORTFOLIO.EXE` window: sidebar filters (All / Released / In Dev / Frozen / Draft) + category chips (All / Games / Web / App) + a cartridge grid. Floating round home button at the bottom. |
| Résumé | `uimaven.art/resume/` | Same toolbar, then a scrolling "dossier": `RESUME.EXE` window card, 4 colour stat cards with hard offset shadows, then a 2‑column layout — left sticky sidebar (`skills.cfg`, `languages.txt`, `education.doc` window cards), right column of experience/timeline cards, all in a comic/neobrutalist style. |

## Design DNA extracted from the live CSS
- **Font:** Jost (400–900). Headings 900 weight.
- **Palette:** primary `#fbccaf #f79a5e #f3670e #be4f09 #873807`; secondary `#a5b5ff #4b6aff #002af0 #0021ba #001785`; yellow `#fff0b4 #dfb400 #ffd31e`; green `#84ebb4 #1fc16b`; red `#fb3748 #fb2c36`; neutral `#fff #e8e8e8 #d2d2d2 #4a4a4a #606060`.
- **Type scale:** display 64/0.95 (40 phone), title 34, heading 24, card‑title 20, stat 44, lead 18, body 16, eyebrow/caption 14, chip 12.
- **Surfaces:** 2px black borders, radius 6–16px, **hard offset shadows** `4px 4px 0 #000` … `8px 8px 0 #000` (no blur), press-in hover (`translate(1px,1px)` + shadow shrink).
- **Texture:** `feTurbulence` grain overlay at 40% opacity; `repeating-linear-gradient` wall stripes (`1.36vw / 6.82vw`).
- **Nav:** white toolbar, 4px black bottom border, chip-style breadcrumb, rotated tooltip "hint" bubble with arrow tail.

## Build mapping (60/40 rule)
| Reference | Mine |
|---|---|
| Leila Abbassova, Game UI/UX designer | **Ayush Thakur**, full‑stack developer, Delhi |
| Cover headline "WORKING DESIGN FOR COMPLEX SYSTEMS" | "CUSTOM CODE FOR BOLD BRANDS" (same 4‑line rhythm, orange dot word) |
| Tabs Résumé / Portfolio / Contact | Same 3 tabs, same interaction (hover/click raises a sheet) |
| `PORTFOLIO.EXE` cartridge rack | Same rack, filters by my 4 real projects (E‑commerce / 3D / Creative) |
| Resume dossier | Same dossier structure: skills.cfg, languages.txt, education.doc, experience cards |
| Leila's artwork & avatars | **Regenerated original artwork** (flat screenprint style, same aspect ratios) — nothing copied |
| Project screenshots | Real screenshots of my 4 live sites |

## Stack
React 18 + TypeScript + Vite + Tailwind (tokens mirrored from the reference) + Framer Motion (route wipes, sheets, overlays) + Canvas/SVG illustration. Self-hosted Jost.

## Animation checklist
- [x] Boot / "loading" card with segmented progress bars (`.nb-loading` replica) on first load
- [x] Page transition: zipper reveal wipe (reference uses zip-open / zip-close keyframes)
- [x] Sticker rotation (SVG textPath) + slow float + pointer parallax
- [x] Tabbed folder hover/click raise, spring easing
- [x] Toolbar hint slide-in, button press physics
- [x] Scroll reveals on dossier (stagger, reduced-motion aware)
- [x] Case-study overlay (scale + slide, Esc / click-out)
- [x] Cartridge hover tilt + "CHOOSE" caret

## QA
Screenshots at 390 / 768 / 1440, section-by-section comparison, console clean, keyboard focus states, `prefers-reduced-motion`.

---

## QA results (headless Chromium, 1440 / 820 / 390)

| Check | Result |
|---|---|
| Console / page errors on all 3 routes | **0** |
| Cover → Portfolio via scroll wheel, scroll button, tab click, and keyboard `Enter` | all work |
| Folder tabs (Résumé / Portfolio / Contact) raise on hover + open the right destination | pass |
| Cartridge rack filters (ALL / E-COMMERCE / 3D / CREATIVE) + live counts | pass |
| Case-study window: open, `Esc` close, backdrop close, live-site link | pass |
| Toolbar: Home, breadcrumb chip, Résumé, Download CV (real PDF), hint bubble | pass |
| `/ayush-thakur-cv.pdf` | 1-page A4 PDF, real content |
| Mobile 390px: dedicated cover composition, 2-col rack → list variant, no horizontal scroll | pass |
| Tablet 820px: 2-column rack, 4-stat grid → 2×2, dossier columns collapse | pass |
| `prefers-reduced-motion` | all animation/transition durations collapsed |
| Keyboard focus visible on every control (3px outline) | pass |

Deviations from the reference, on purpose:
- The reference's 3 pages are Konva-canvas illustrations; these are rebuilt as DOM/SVG + Tailwind so they
  stay crisp, responsive and accessible (no rasterised screenshots of UI).
- Project screenshots and artwork are mine/regenerated (per your asset choice), Leila's identity is replaced
  with yours throughout.

---

# Round 2 — "make it a little more unique"

Kept the reference's DNA (Jost, palette, hard shadows, window cards, canvas-free illustration) and added a
signature print/zine layer so it no longer reads as a straight clone:

**Type & print treatment**
- Outlined display letters (`-webkit-text-stroke`) in the cover headline ("CODE FOR") and in chapter titles
  ("THE **WORK**", "THE **PROCESS**", "PICK A **SPRINT**", "TOOL **STICKER WALL**").
- Halftone dot fields over the wall (masked, 25–42% opacity) and inside cards on hover (multiply blend).
- Manga speed-line burst behind the cover cluster, faint concentric rays behind the wall sections.
- Washi-tape strips, torn/perforated ticket stub ("ADMIT ONE · NO. 004 — DELHI" with a barcode) inside the note.
- Rubber-stamp badges (`Stamp`): VERIFIED / SHIPPED ON FRIDAYS / NO PAGE BUILDERS / MOST POPULAR / OPEN FOR WORK.
- Punch-hole margin down the skills card; dashed rules where the reference used solid ones.

**New components**
| Component | Where |
|---|---|
| `Marquee` | black band under the desk scene, yellow reverse band in the footer, résumé masthead |
| `ChapterSpine` | fixed right-edge chapter dots (Origin → Contact) with hover labels + scroll-spy |
| `ScrollProgress` | 4px progress bar with halftone texture under the toolbar on inner pages |
| `InkCursor` | lagging print-ink dot cursor, swells over links/buttons, disabled on touch + reduced-motion |
| `Stamp`, `Tape`, `PunchHoles` | zine flourish primitives |
| `DelhiClock` | live IST clock pill in the toolbar (desktop) — signals a real person, local time |

**Layout personality**
- Missions became a 2×2 poster grid with category tab, hover zoom + halftone wash and a "パラパラ open file"
  badge that slides in — replacing the plain list cards.
- Arsenal is now a hand-pinned sticker wall: alternating tilts, tape on top, halftone corner blot, hover lift.
- Process steps got numbered pins sitting on a connecting rail with ghost kanji numerals (壱 弐 参 肆).
- Rates: "MOST POPULAR" became a rotated stamp; book buttons carry a mini barcode.
- Footer: marquee + halftone-textured black panel + outlined yellow "something".
- Mobile cover rebuilt: note → sticker row → three folder rows → "scroll into the portfolio" CTA →
  red container colophon card with socials (the previous version stacked the desktop container awkwardly).

QA re-run after round 2: **0 console errors**, cover scrolls on mobile again (dvh + min-height fix),
all links/buttons/case-study overlays still verified, `prefers-reduced-motion` still collapses motion.

---

# Round 3 — overlap & AI-tell cleanup, driven by `ui-ux-pro-max-skill`

Installed the skill (`git clone` → `/home/user/skills/ui-ux-pro-max-skill`) and applied its
**119 UX guidelines**, **192 reasoning rules** and the pre-delivery checklist. Every change below maps to a rule.

### Overlaps / stacking (the "AI collage" problem)
| Rule | Fix |
|---|---|
| Z-Index Management (High) · Stacking Context (Med) | Introduced a real scale in `:root` — `--z-rail 5 → --z-content 10 → --z-card 20 → --z-spine 40 → --z-nav 70 → --z-modal 150 → --z-zip 190 → --z-boot 200 → --z-cursor 300`. No more `z-[150]`/`z-40` guesswork. |
| Overflow Hidden / Essential Text Truncation (Critical) | Cover note: removed tape that crossed the "since 2025" line, removed the floating stamp pinned over the note's corner and the "new" pill over "BOLD". Desktop badges moved **out of** the note's box into their own floor row — nothing sits on a headline or paragraph now. |
| (same) | Container cluster: three tab sheets are laid out **side by side** (`RÉSUMÉ | PORTFOLIO | CONTACT`) instead of overlapping; the illustrated sheet collage that used to crash through the cards is gone. Tab order still independent — the hover raise is the only motion. |
| Essential Text Truncation (Critical) | Mobile folder rows, cartridge titles and cover contact card no longer `truncate` — they wrap; new `wrap-anywhere` utility for emails/URLs. |
| Contrast on artwork (avoid scrim hacks) | Art panel: gradient scrim replaced with a **solid black text column** + hairline divider, so copy is never over texture. |

### Contrast (was failing)
Automatic ratio audit (computed style colour vs. nearest opaque ancestor background, run per route):
- Before: **13 failures** — e.g. `black/50` labels on orange (2.4:1), yellow on orange (2.16:1), white on
  `#4b6aff` (4.37:1), white on red stamps (3.81:1), `neutral-900` on the blue arsenal cards (4.5:1 borderline).
- After: **0 failures** on `/`, `/portfolio`, `/resume`. Changes: wall-level micro copy → solid black;
  cover accent word → `primary-400` (4.98:1); stamps & popular badge → black on red (5.4:1); arsenal card body
  → black; "most popular"/"fit check" heads → `green-700` / `red-800`; scrim-free art panel.

### Interaction & a11y
- **Skip to content** link (focus-visible only), route change moves focus to `#content`, and an
  `aria-live` region announces "Portfolio page loaded".
- Global `cursor: pointer` on every interactive element + `not-allowed` on disabled (was missing entirely).
- `scroll-padding-top: calc(header + 14px)` → anchored/focused content no longer hidden under the toolbar (*Focus Not Obscured*).
- Touch targets: window close dot 16px → 24px hit area; cover tab CTAs 15/21px → 24px; rack filter chips
  ≥24px tall; sidebar rows 26px; cover social icons 40px (mobile). Audit now reports 0 undersized targets.
- Deep linking: case studies use `#project-<id>` (matches the reference's behaviour), Esc/close resets the URL.

### "AI tells" removed (checklist items)
- **No emojis as icons** — ⚡📱🚀🛡️ replaced with Lucide-style inline SVGs (`BoltIcon`, `PhoneIcon`, `RocketIcon`, `ShieldIcon`); turnaround line uses the bolt glyph icon.
- **No gradient overlays** — all decorative gradients removed except the two structural ones that *are* the
  reference's design (the orange wall stripes and the desk wall), documented as intentional.
- **Motion budget** — only one badge keeps the spinning ring, the hero float loop is gone, marquees pause
  off-screen via IntersectionObserver and on hover, `prefers-reduced-motion` disables spin/float/boot/zip.

### Verification
- `POSSIBLE OVERLAPS: 0` — a DOM audit that walks every visible text element and tests intersection
  (>8px) with any *positioned, non-text* layer above the content.
- Contrast: 0 failures across 3 routes · Targets: 0 sub-24px · Console: 0 errors · Builds clean.

---

# Round 4 — the reference's hand-drawn cursor set

The original doesn't use a JS cursor follower; it ships three hand-drawn glove images and swaps them with CSS:

```css
/* reference (uimaven.art) */
cursor: url(/images/cursor-default.png) 24 5, auto;
cursor: url(/images/cursor-hover.png) 24 5, pointer;
cursor: url(/images/cursor-click.png) 24 15, pointer;  /* :active */
```

Recreated with **my own artwork** (not their files): `public/cursors/fist.svg` (glove, four knuckles),
`point.svg` (index finger out), `three.svg` (three fingers on press) — rendered to 32px + 48px PNGs so the
hotspot is pixel-accurate and the files stay <1.5 KB each.

```css
:root{
  --cursor-default: url('/cursors/hand-fist-32.png') 10 6, auto;
  --cursor-hover:   url('/cursors/hand-point-32.png') 16 5, pointer;
  --cursor-active:  url('/cursors/hand-three-32.png') 16 8, pointer;
}
@media (hover:hover) and (pointer:fine){
  html,body{cursor:var(--cursor-default)}
  a,button,[role=button],label[for],summary,select,.press,.spine-link{cursor:var(--cursor-hover)}
  a:active,button:active,[role=button]:active,.press:active{cursor:var(--cursor-active)}
  input,textarea,[contenteditable]{cursor:text}
  :disabled,[aria-disabled=true]{cursor:var(--cursor-default)}
}
```

Notes
- Hotspot = fingertip on the pointing hand (16,5) and fist's index knuckle (10,6) — measured from the rendered PNG alpha.
- Wrapped in `(hover:hover) and (pointer:fine)` so phones/tablets keep native touch behaviour (verified: touch
  context reports `auto`).
- Removed the earlier `cursor: pointer` shorthand that was out-specifying the image rule (`a[href]` beat `a`).
- Also removed the invented "ink dot follower" — the reference has no follower, so neither do we.
- Verified in Chromium: default over text/headings → fist · over links & buttons → point · while pressed →
  three fingers · cursor PNGs return HTTP 200 · 0 console errors.

Preview image: `cursor-states.png` (fist / point / three on the three brand backgrounds).

---

# Round 5 — "minimise it": reference-level density

The build had drifted ~2× taller and larger than the reference. Measured, then compacted:

| | Before | After | Reference |
|---|---|---|---|
| `/portfolio` height | 6613 px | **5346 px** | 3 fixed-viewport pages |
| `/resume` height | 2440 px | **2044 px** | ~1.9 k px dossier |
| Largest type | 64 px everywhere | **44 px** in-page (64 px only on the cover headline) | 64 / 34 / 24 / 20 / 18 / 16 / 14 / 12 |

How:
- Added a `.dense` type scale (display 44 · title 26 · heading 19 · card-title 16.5 · stat 30 · lead 15 ·
  body 13.5 · caption 11.5 · chip 10.5, and smaller again under 640 px) applied to the portfolio and résumé
  shells — the cover keeps the full 64 px display so it still reads like the original's hero.
- Halved page rhythm: section gap 80→40 px, page padding 64→40 px, card padding 20→12–16 px,
  grid gaps 16–20→12–14 px, art panel 300→220 px tall, stamps/socials scaled down a step.
- Portfolio max-width 1180→1120 px, résumé 1240→1180 px so line lengths stay inside the 65–75ch rule while
  the page gets shorter.
- Kept every section and all copy — nothing was deleted to save height.

Re-verified after compaction: contrast 0 failures · overlaps 0 · targets 0 undersized · console 0 errors ·
mobile (390) and tablet (820) still fit without horizontal scroll.

---

# Round 6 — denser still + the zipper moved from navigation to scroll

**1. Page transition:** the full-screen zipper wipe on route change was over-heavy and covered the page
while the user waited. Deleted `ZipWipe` entirely; routes now commit instantly and cross-fade with a 260 ms
lift-in (`opacity 0→1`, `y 10→0`, ease `[.22,.8,.3,1]`). Router no longer delays navigation by 430 ms.

**2. Zipper is now driven by scroll**, like a real zip being pulled down the page — new
`src/components/ZipDivider.tsx`, used 5× on `/portfolio` (after origin, after the arsenal, before process,
before the rates, before the FAQ):

```
useScroll({ target, offset: ['start 0.99', 'end 0.45'] }) → useSpring
tape-1 (top)    translateY 0 → −14px     tape-2 (bottom) translateY 0 → +14px
open segment    width = progress%   (left)   still-zipped segment width = (100 − progress)%  (right)
slider          left = progress%   + 9° rotate, 30×34px yellow pull-tab
```
So the seam is open behind the slider and still zipped ahead of it, and the dashed thread line only shows in
the opened part. Measured at four scroll positions on the first divider: tape gap 7.3 → 17.2 → 27.6 → 31.9 px
while the slider travelled x 194 → 1270 px. `prefers-reduced-motion` locks the divider closed with the slider
parked at 50 %.

**3. Further minimisation (pass 2):**

| | Round 5 | Round 6 | Reference feel |
|---|---|---|---|
| `/portfolio` | 5346 px | **4923 px** (incl. 5 zippers ≈ 260 px) | 3 viewport scenes |
| content width | 1120 | **1180** | wide, edge-to-edge grids |
| section gap / page pad | 40 / 40 px | **20 / 24 px** | tight, poster-stacked |
| mission thumbnails | 16:9 auto | **fixed 136 px** | card strip |
| footer headline | display 64 | **display 44** | one-liner closers |
| rate rows | 22 px | **19 px + tighter list** | dense spec tables |

Plus `overflow-x: clip` on `html`/`body` — the nudged laptop scene used to create a 6 px sideways scroll at
375/768 px; measured `scrollWidth == innerWidth` at 375 / 768 / 1024 / 1440 on all three routes.

Re-verified: contrast 0 failures (the new zipper label needed a paper chip, 2.85:1 → 12.6:1) · overlaps 0 ·
targets 0 undersized · console 0 errors · case-study dialog open/ESC close fine · build green
(`index-dHennlS4.js` 361.36 kB).

---

# Round 7 — overview first, then the scroll unzips the projects (home page)

The user's correction: the zip should not be a route-transition gimmick — **the home page shows the overview
first, and scrolling pulls a zipper that opens onto the projects.**

New page structure at `/` (`src/pages/Home.tsx`):

```
1. CoverScene      the original collage cover, exactly one viewport
2. Overview        overview.txt — portrait, "I make pixels and code get along.", 4 stat tiles,
                   chips, CTAs (Unzip the work ↓ / Full document → / Résumé)
3. ZipReveal       sticky 100svh × 230vh — the work is behind a closed zip cover
4. Footer          contact strip
```

**ZipReveal mechanics** (`useScroll` on the section + `useSpring`):
- Two cover halves (`bg-primary-400` stripes + halftone + vertical teeth strip) split at the centre seam,
  reading **ZIP OPEN | THE WORK** across it.
- `x` 0→±101 % between progress .05–.80, so the halves peel apart and the project grid underneath fades in
  (`opacity` 0→1 at .18–.55, `scale` 1.05→1).
- The pull tab rides the seam (`y` −6→96 %) with a "scroll to unzip" tag that fades out by .30.
- The grid is `inert` until progress > .30, so nothing hidden is reachable by Tab or click.
- Below 1025 px or with `prefers-reduced-motion`, the whole reveal is skipped: a plain zipper strip sits
  above a normal, always-visible project grid (verified on 390 px).
- CoverScene no longer hijacks the wheel to jump to `/portfolio`; its ruler cue now smooth-scrolls to the
  overview so the page reads as one continuous story.
- `MissionCard` was extracted to `src/components/MissionCard.tsx` and is now shared by `/` and `/portfolio`;
  the case-study dialog opens from the home grid too (verified open/ESC close).

State: home 4163 px desktop / 3765 px mobile · contrast 0 failures · overlaps 0 · console 0 errors ·
horizontal scroll 0 at 375–1440 · build green (`index-DkBkrCW3.js` 371.36 kB).

---

# Round 8 — one zip only

The five scroll zippers used as chapter separators on `/portfolio` were decoration, not story — removed
(`ZipDivider` component deleted). The **only** zipper in the site is now the home reveal:

```
cover → overview.txt → [ scroll: zip pulls apart ] → the 4 project cards → contact
```

`/portfolio` height dropped 4923 → **4583 px** and reads as plain stacked chapters with no gimmicks between
them. Contrast 0 failures · overlaps 0 · console 0 errors · build green (`index-IWSqPSQS.js` 368.88 kB).

---

# Round 9 — full re-skin back to the reference's visual language, with more colour

An earlier "editorial catalogue" direction (bone paper, Fraunces, hairlines) was rejected — it read as a
different, colder site. Everything was rebuilt in the **reference's own language** (chunky ink borders, hard
offset shadows, collage, stickers, marquees, zippers) and then pushed to a **wider palette** so no two
chapters look alike.

### Design system (`src/index.css`, `tailwind.config.js`)
| token | value | used for |
|---|---|---|
| `tang` | #f3670e / #d2550a | primary wall, hero, plates band |
| `sun` | #ffd31e | window bars, primary CTA, stamps |
| `grape` | #4b6aff / #2438d6 | catalogue masthead, zip panel, book buttons |
| `mint` | #84ebb4 / #1fc16b | availability, CV masthead, guarantees |
| `chilli` | #fb3748 | "most popular" stamp, not-for-you panel |
| `cream` | #fffdf6 / #f8f3e6 / #efe7d4 | paper, cards, section grounds |
| ink | #0a0a0a | 2px borders, hard 2–8px shadows |

Type: **Jost 900 uppercase** display (the reference's voice), Jost 500/600 body, **JetBrains Mono** for
metadata. Radii 8–18px, shadows `npx npx 0 #0a0a0a`, `.stripes` / `.halftone` / `.grain` textures, `.tape`,
`.stamp`, `.chip`, `.card`, `.win-bar` primitives.

### Structure (kept the flow the user asked for)
`/` — cover note + collage → overview.txt (4 colour stat tiles, practice strip) → **zip seam that peels apart
on scroll** → pinned horizontal plate track → tariff cards → FAQ → black contact band.
`/portfolio` — masthead (blue) → origin → plates (orange stripes) → practice (9 coloured tiles) → method
(4 cards) → tariff → terms (mint / chilli windows) → notes → contact.
`/resume` — mint masthead, avatar polaroid, contact / languages / education windows, experience cards in
rotating colours, capability + plates windows.

### Interactions
- Hand-drawn three-state glove cursor restored (`public/cursors/`).
- GSAP ScrollTrigger pin + horizontal plate track on desktop; native swipe row on touch.
- Scroll-driven zip on the home page (two halves split apart, tab rides the seam, `inert` grid until open).
- Framer Motion: line-mask headlines, magnetic CTA, reveal-on-scroll, window modal for case files.
- Scroll progress bar, running-head section chip, live IST clock, marquee bands (paused off-screen).

### Verification
contrast **0 failures** on `/`, `/portfolio`, `/resume` · targets < 24px **0** · overlaps **0** · console
**0 errors** · no horizontal scroll at 375/390/768/1024/1440 · dossier opens/closes on click and Escape ·
build green (`index-Bjp41-pn.js` 448 kB / 151 kB gzip, css 33 kB).

Two rendering traps fixed along the way: `.card` used to hard-set its own background and beat every
`bg-*` utility (coloured cards rendered paper-white), and `-webkit-text-stroke` on the self-hosted Jost
variable font ghosts its inner contours — accent words now use solid ink-blue or a yellow highlight block.

---

# Round 10 — the zip now opens *the overview onto the projects*

The zip used to reveal a title card, and the plates sat below it in a separate pinned track. It is now one
stage: **the zip is the seam between the overview above and the project sites below, and the sites come in as
it opens.**

`ZipStage` (`src/pages/Home.tsx`), 215vh scroll track with a 100svh sticky viewport:

| scroll | what happens |
|---|---|
| 0 – 0.06 | closed: yellow top half + cobalt bottom half meet at the seam, tab parked at the left |
| 0.06 – 0.52 | halves peel away from the seam (top `−102%`, bottom `+102%`), tab travels `0 → 100%` across the seam |
| 0.22 – 0.75 | each of the four project cards **rises out of the seam in sequence** (`y 90 → 0`, `opacity 0 → 1`, `scale .94 → 1`, alternating ±2.5° tilt settling to 0) |
| 0.56 | tab fades out — the zip is open, the sites are in |
| ≥ 0.97 | next section ("Pick a sprint") scrolls in normally |

- The grid underneath is `inert` until progress > 0.12, so a closed zip can't be tabbed into or clicked.
- Mobile / reduced-motion: no pin, no curtains — the four project cards sit in a normal stack (verified 390px,
  section is content-height).
- Clicking any plate while the zip is open opens its case file (verified on dev and on the production build).

Verified: contrast 0 failures · targets < 24px 0 · overlaps 0 · console 0 errors · build green
(`index-Co1WrOQy.js` 331 kB / 104 kB gzip).

---

# Round 11 — feature parity with the reference (audited against the live site)

Re-inspected `uimaven.art/home/` (Konva canvases + `PORTFOLIO.EXE` app shell). Feature-by-feature audit:

| reference feature | where it lives now |
|---|---|
| Top toolbar: `← HOME` · `PORTFOLIO` · hint chip · `RÉSUMÉ` · `↓ DOWNLOAD CV` | `components/Chrome.tsx` → `Toolbar` (route-aware hint text, active pill) |
| Cover: paper note with rivets, "since …" line, 3-line headline with one coloured word | `CoverScene` note |
| Cover: 3 enamel badges overlapping the note | `EnamelBadge` (scalloped edge, spinning inner art, mascot art) |
| Cover: vertical zipper with a slider + "scroll" tag running down the page | `CoverScene` centre zipper (`zipY` parallax) |
| Cover: 3 tilted tabs `RÉSUMÉ / PORTFOLIO / CONTACT` (read / choose / write) | `TabCard` trio, all wired to routes |
| Cover: pink-striped container with collage art + caption bar | cover container with `folder-art.png` + ink caption bar |
| Cover: ID badge on a lanyard, portrait, name, role, social icons | `IdBadge` (lanyard strap, name + role plates, in/@/wa/gh buttons) |
| Portfolio page: laptop on a desk, wall with tower + striped wallpaper | `DeskScene` |
| `PORTFOLIO.EXE` window: yellow title bar + 3 dots | `CartridgeRack` title bar |
| LIBRARY sidebar: All / Live / In dev / Draft with counts | status list with counts (0-count rows disabled) |
| Category tabs ALL · E-COMMERCE · 3D · CREATIVE | live filter (`aria-selected`, re-filters the rack) |
| Cartridge thumbnails with "CHOOSE ▸" header and name band | cartridge grid, 3 per row, click → case file |
| "OPENING… / <name>" progress dialog before the content | `Dossier` boot state (620 ms bar) |
| Case study overlay with meta + bullets + live link | `Dossier` window modal (focus trap, Escape) |
| Contact phone as a desk prop (LinkedIn / Email / WhatsApp) | `DeskScene` phone with real links closing over the laptop |
| Desk props (can, phone) | `DeskScene` can + phone |
| Home button under the laptop screen | house button in the laptop chin |
| Footer / closing CTA, socials, CV download everywhere | `ContactBand` + toolbar CV |

Deliberately **not** copied (no value / would be fake): the canvas/Konva rendering itself, placeholder
"SOON" cartridges, and BlueSky (the user has no account).

Verification after the additions: contrast **0 failures**, targets < 24 px **0**, overlaps **0**, console
**0 errors**, filters verified by count (All 4 · 3D 1 · Creative 1), dossier opens/closes, mobile 390 px clean.
