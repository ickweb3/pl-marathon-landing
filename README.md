# pl-marathon-landing — «Проявись»

Marketing landing for the 7-day Pershi Ledi marathon. Start **22.08.2026**.

**Target domain: `marathon.pershiledy.com`.** Deploy notes are at the bottom.

Design source: the «Проявляйся» Figma file, frame `v1`, node **`1:245`**,
1440 × 7678.5 (updated 2026-08-14; supersedes `Landing-courses-PL` node
`4882:772`, which had the same structure and older photographs). Ask Illia for
the file link — every node id in this README is from it.

**The designer added phone artboards on 2026-08-17.** Five of them, 390 wide,
beside the desktop frame. They are the source for the phone layout of those five
sections; every other section stays as it was, which is what the designer asked
for.

| Phone frame | node | Size |
|---|---|---|
| Hero | `16:740` | 390 × 981 |
| Що зупиняє | `19:919` | 390 × 540 |
| 7 днів | `19:994` | 390 × 605 |
| Менторка | `19:1111` | 390 × 658 |
| Закриваючий CTA | `19:1170` | 390 × 768 |

> **Assets: take the fill, never the render.** `download_assets` on a
> single-image node returns a rendered export with the node's own background
> baked in. On the mentor card that arrives as a white plate over the blue.
> Use the raw fill URL and the transform that `get_design_context` reports.

---

## How it was built

Every section was pulled with the Figma MCP tool `get_design_context`, one node
at a time, and written from the values it returned. No colour, size, offset or
string in this repo is estimated from a screenshot.

| Section | Figma node |
|---|---|
| Header + hero + stats | `4882:773` |
| Що зупиняє | `4882:860` |
| Внутрішній критик | `4882:835` |
| 7 днів | `4882:870` |
| Менторка | `4882:1024` |
| Подарунки | `4905:1436` |
| Стартуємо 22 серпня | `4882:1062` |
| Питання перед стартом | `4882:1137` |
| Закриваючий CTA | `4882:1148` |
| Footer | `4903:1202` |

All 56 image and vector assets are exports of that frame, named by the role
`get_design_context` gave them, and they live in `public/img`.

**Fidelity check.** Rendered height at 1440 is **7670px** against the frame's
**7679px**.

---

## Why the stack is what it is

The landing is written to **transplant into `pl-fe-cabinet` unchanged**. That
repo (branch `dev`) already carries a widget one-pager at
`src/UI/pages/Landing/`, and this project copies its shape file for file:

| pl-fe-cabinet | this repo |
|---|---|
| `src/UI/pages/Landing/Landing.tsx` | `src/UI/pages/Proyavys/Proyavys.tsx` |
| `providers/ThemeProvider/` | same |
| `widgets/<Section>/index.tsx` | same |
| `assets/index` → `IMAGES` map | same |

Stack matches: **React 19 + TypeScript + Vite + MUI v7 `sx`**. No Tailwind
class appears in that repo's landing widgets, so none appears here. No animation
library — a 60-line IntersectionObserver covers what this page needs.

To hand it over: copy `src/UI/pages/Proyavys/` into `pl-fe-cabinet/src/UI/pages/`,
copy `public/img/` into their assets, route it. Until then it ships on its own —
`npm run build` produces a static `dist/`.

---

## Two composition modes

Four sections are absolutely composed in Figma, not auto-layout: the hero, the
mentor panel, the join panel and the closing CTA. Their artwork overhangs its
box and their offsets are exact, so they are drawn at the Figma width inside
`shared/ui/FixedCanvas` and scaled to the viewport. Above the mobile breakpoint
the result is the same picture, smaller — not a reflow that drifts.

The rest (problem cards, tiles, prizes, FAQ, footer columns) is auto-layout in
the frame and is real responsive flex here.

Below `md` every canvas section switches to a stacked layout.

## The phone

Five sections now come from a phone artboard and are built to it. The other
sections have no artboard and keep the derived layout — the designer looked at
them and left them alone.

**A phone frame is not a scaled canvas.** The desktop sections are drawn at 1440
and scaled, so 64px type becomes 40px on a laptop. A phone frame is drawn at 390
because 390 is the phone: 64 means 64 at 360 and at 430. So these five are flow
layouts with the frame's own type sizes and absolute decorations, not
`FixedCanvas`.

Two rules make that hold at a width the frame never drew:

- **Decorations are anchored to the card's centre, not its left edge.** The
  frame gives `left: -63` for the hero rings; that is `calc(50% + 79.2px)` of a
  390 card. Centre-anchored the composition holds at 360 and 430; left-anchored
  it slides off.
- **The photograph's band is reserved in flow, and the photograph is anchored to
  the bottom.** The hero copy ends at 440 of 981, so a 541 spacer follows it.
  A narrower screen wraps a line, the copy grows, the card grows, and the
  photograph keeps the exact height and gap the frame gave it.

What else the frames changed:

- **Two card rails.** «Що зупиняє» and «7 днів» are one row on the phone with
  the frame's prev/next pair under it (node `16:229` — two 60 × 48 pills, 10
  apart, one arrow glyph turned 180° for the left). `shared/ui/Carousel` also
  drags and snaps, moves by one card plus the gap, and dims a button that has
  nothing left to scroll. Rail cards are NOT wrapped in `Reveal`: a card parked
  off the right edge never intersects the viewport, so it would fade in under
  the swiping thumb.
- **Headings go left on the phone.** The desktop centres them; both phone frames
  set them left, with the italic accent on its own line.
- **The mentor photograph is the full cut-out again**, full width and clipped by
  the card's bottom edge, with the copy above it — the frame's own composition.
  It uses the same fill as the desktop card at the same transform, so
  `mentor-face.webp` (the old square head-and-shoulders crop) is deleted.
- **The closing CTA has its photograph back.** `final-photo.webp` could not
  supply it — that file is a render of the desktop node already clipped to
  1344 × 471. `final-photo-mob.webp` is cut from the raw fill to the 390 × 563
  window the phone frame shows.
- **The buttons are the frame's**: 284 × 54, label «Почати безкоштовно», skins
  `heroMob` and `solidMob` in `CtaButton`.
- The header hides on scroll down and returns on scroll up; a permanent bar
  covers a card title on every screen of a page this long. Its geometry is now
  the frame's — 24 from the top, 358 wide, 64 tall, radius 18, and the
  «Приєднатись» pill is visible on a phone, which it was not.
- Every chat bubble holds its final height from the start, so the card cannot
  grow while the critic types and push the page down.

Three places where the code does not copy the frame, and why:

1. **Golos Text.** The frame sets the hero subheading and the closing-CTA
   subheading in Golos Text SemiBold — the only two runs in the whole file that
   leave Manrope, and the variable set names no second family. Manrope SemiBold
   carries both at the frame's size, leading and tracking rather than pulling a
   whole extra webfont onto the critical path for two lines. **Worth one
   question to the designer.**
2. **«Проявись» leading.** The frame writes 64px leading inside a 47-high box,
   centred. That is a 47px line, not a 64px one; at 64 the gap to the line below
   comes out 17px wider than drawn.
3. **The rail buttons dim at the ends.** The frame draws one state. A button
   that does nothing should say so.

The phone card media has a different aspect from the desktop one (262 × 158
against 392 × 200), so the two desktop crop percentages do not carry. The
frame's own phone crop shows the band from 8% to 56% of the fill, which is
`cover` at 32%.

Reviewed by slicing the rendered page into screenfuls at 360, 390 and 430 and
asserting `document.documentElement.scrollWidth === window.innerWidth` at each —
no horizontal overflow at any of the three.

**Where the frame is wrong, the page is not.** The four "7 днів" icons are cut
from two sprite sheets, and the frame's crop window is shorter than the glyph —
reproduced verbatim, the compass loses 7px off the top and the bottom. Each icon
is its own trimmed file instead. Faithful is the default; it is not the goal.

---

## Live

**https://pl-marathon-landing.vercel.app** — the review preview, kept as-is.
The final home is `marathon.pershiledy.com`.

## Assets and weight

Photographs are **WebP, sized to twice the width the element actually renders
at** — not to the source resolution the Figma export arrives in. The render
width is the box width times the image's own percentage, both of which are in
the widget file. `icons-sheet-1` is the clearest case: it renders at 172.79% of
a 97px box, so 168 CSS px, so the file is 336px, not the 1600 it exported at.

Re-deriving a target after a design change is arithmetic on the widget, not a
guess. Quality 90, alpha preserved.

Fonts are **self-hosted** in `public/fonts` with the `@font-face` block inlined
in `index.html`; Google Fonts was a render-blocking third-party request. Manrope
is variable, so one file per unicode subset covers every weight. Three faces are
preloaded — Manrope cyrillic, Manrope latin, Playfair italic cyrillic — along
with the hero image.

Live: **52 requests, ~1.2 MB, no third-party request.**

## Run

```bash
npm install
npm run dev      # http://localhost:5178
npm run build    # dist/
npm run lint     # tsc --noEmit
```

## Deploy to `marathon.pershiledy.com`

It is a **static site**. There is no server, no API call, no environment
variable, and no runtime configuration — the build output is HTML, CSS, JS,
fonts and images, and it can sit behind any web server or CDN.

```bash
npm ci
npm run build      # → dist/
```

Serve `dist/` at the domain root. Points worth knowing before you wire it up:

- **Node 20 or newer** (Vite 6).
- **One page, no client-side router.** No SPA rewrite rule is needed; a plain
  static host is enough. A 404 handler is yours to choose.
- **No `vercel.json` / `netlify.toml` on purpose.** Both platforms detect Vite
  and use `npm run build` → `dist/` without one. Add whichever config your
  platform needs.
- **Caching.** `dist/assets/*` is content-hashed and safe to serve immutable for
  a year. `index.html` must NOT be cached that way — serve it `no-cache`, or a
  deploy will not reach a returning visitor. Everything under `public/` (fonts,
  `img/`, favicons, `og.jpg`) keeps its filename across builds, so cache it for
  hours, not a year.
- **Fonts are self-hosted** in `public/fonts` and preloaded from `index.html`.
  Serve them from the same origin, or the preloads miss and the first paint
  swaps faces. No Google Fonts request exists and none should be added.
- **Three absolute URLs to swap on go-live.** `index.html` carries `og:image`,
  `og:url` and `twitter:image` pointing at the preview host; they are marked
  with a comment in the file. Repoint them at
  `https://marathon.pershiledy.com/` or the social preview keeps advertising
  `pl-marathon-landing.vercel.app`. Every other URL in the page is relative.

### Auto-deploy from this repo

`main` is the deploy branch. Connect the platform to it and let it run
`npm ci && npm run build` with output `dist/`. Nothing in the build depends on
a secret, so pull-request previews are safe to switch on.

If you would rather run it from CI onto your own server, that is the whole job:

```yaml
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: npm }
- run: npm ci
- run: npm run build
# then ship dist/ to the host
```

---

## Where things live

| What | File |
|---|---|
| Section order and the frame's 140px gaps | `src/UI/pages/Proyavys/Proyavys.tsx` |
| The card rail and its prev/next pair | `shared/ui/Carousel/index.tsx` |
| Colours, gradients, shadows, fonts | `providers/ThemeProvider/index.tsx` |
| Every link and the start date | `shared/config.ts` |
| FAQ copy | `shared/faq.ts` |
| Image names ↔ Figma roles | `src/assets/index.ts` |

Fonts are **Manrope** (400–800) and **Playfair Display** (400/600/700, upright
and italic) — both named by the frame.

---

## Open items

1. **Four FAQ answers still need a client read — 3, 4, 8 and 9.** The frame
   draws every row but the first collapsed, so no answer existed. The client
   supplied answers 2, 5, 6 and 7 on 2026-08-17 and those are now verbatim
   (question 7 was re-worded by the client too, so that row no longer matches
   the frame's question text). The remaining four are written from this
   project's docs and Pershi Ledi's, each naming its source in the header of
   `shared/faq.ts`. Nothing is invented — but nobody has approved the wording.
2. **CTA target.** `shared/config.ts` → `ctaUrl` points at
   `pershiledy.com/registration`. Confirm registration vs the community club vs
   the bot.
3. **Mentor Instagram and the store links** are placeholders in `shared/config.ts`.
4. **One deliberate deviation from the frame:** the header keeps its designed
   glass look over the hero, then takes a solid brand fill once the hero is
   behind it. The frame only ever draws it over blue; white-on-white would be
   unreadable on the sections below.
5. **The italic accent face on two phone runs.** See "Golos Text" above — one
   question to the designer closes it.

---

## Verification

`npm run lint` is `tsc -b --noEmit`, and `npm run build` type-checks before it
bundles. Neither catches a layout regression, so the page is also reviewed by
screenshot at 1440 and at 360 / 390 / 430.

Two things to know if you write your own screenshot pass:

- **Scroll the whole page first, then wait on `document.images`.** Sections
  reveal on an IntersectionObserver, and a capture taken before large artwork
  has decoded reads as a missing image when the page is fine.
- **Take sliced viewport captures, not `fullPage`.** Chrome's full-page capture
  intermittently drops clipped, absolutely positioned artwork — which is most of
  the hero, the mentor card and the closing CTA — that the page renders
  correctly on screen.
