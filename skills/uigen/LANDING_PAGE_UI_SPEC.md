# LANDING PAGE — UI SPECIFICATION

## Design Direction

**Theme**: Cinematic material laboratory + editorial research journal.
**Feel**: Architecture studio in Puerto Vallarta — dark, cool, material, precise.
**Interaction**: Scroll-driven storytelling, GSAP stagger reveals, smooth transitions.

## Color Tokens (on page)
- Background: `#080806`
- Surface: `#1a1916`
- Text: `#f2ede8`
- Secondary: `#a89f94`
- Accent: `#e85d04` (orange), `#4a90d9` (blue), `#c5b358` (gold)

## Typography
- Display: `clamp(4rem, 10vw, 9rem)`, weight 800, tracking tight
- Section title: `clamp(2rem, 5vw, 4rem)`, weight 700
- Body: 1.125rem, weight 400, line-height 1.75
- Label: 0.6875rem, uppercase, tracked 0.1em, monospace

---

## Section 1: Hero

**Height**: 100vh
**Layout**: Full-bleed dark background, centered content column

### Background Layer
- Three.js canvas: abstract material geometry (low-poly concrete plane, slowly rotating)
- OR: CSS grain texture overlay on dark gradient
- Subtle horizontal scan lines (architectural blueprint aesthetic)

### Content
```
[LABEL: OPEN-SOURCE CONSTRUCTION KNOWLEDGE]

INFINITE
ARCHITECTURE

[BODY: Free construction systems for foam, ferrocement, thin-shell concrete,
and climate-aware DIY infrastructure. Puerto Vallarta material laboratory.]

[CTA BUTTON: Explore Build Systems →]   [GHOST BUTTON: Read Safety Canon]
```

### Animation (GSAP)
- Label: fade in, y: 20→0, delay 0.2s
- "INFINITE": chars stagger in from y:80, opacity 0→1, delay 0.4s
- "ARCHITECTURE": same, delay 0.6s
- Body: fade in, delay 0.9s
- CTAs: fade in, delay 1.1s
- Scroll indicator: pulse, delay 1.5s

### Scroll Indicator
- Thin vertical line extending down
- "SCROLL" label in monospace uppercase
- Fade out at 10% scroll position

---

## Section 2: Mission

**Layout**: 2-column: text left, visual right (diagram/graphic)
**Background**: `#080806`, subtle divider line at top

### Content
```
[SECTION LABEL: MISSION]

Free, open, and local.

[3-column grid of mission pillars:]

FREE KNOWLEDGE          LOCAL-FIRST             SAFETY-AWARE
All construction        Primary experiments     Safety canon enforced.
systems are free        in Puerto Vallarta,     No structural claims
and open source.        Jalisco, Mexico.        without evidence.
```

### Animation
- ScrollTrigger entrance: each pillar staggers in from below, 0.15s apart

---

## Section 3: Build Systems Grid

**Layout**: Grid of cinematic cards (3 col desktop, 2 col tablet, 1 col mobile)
**Background**: `#0d0d0b`

### Card Design
- 16:9 aspect ratio thumbnail area (placeholder material image or SVG diagram)
- Category badge: monospace, uppercase, accent border
- Title: large, weight 700
- Difficulty chip: color-coded (green/amber/red)
- Cost estimate in MXN
- Hover: border-left 3px accent orange, slight y lift

### Build Systems to Show
1. Foam-Core Cement Panel — BEGINNER — ~MXN 800
2. Ferrocement Barrel Roof — ADVANCED — ~MXN 4,500
3. XPS Kitchen Counter — INTERMEDIATE — ~MXN 1,500
4. Mesh + Mortar Fence Panel — BEGINNER — ~MXN 600
5. Raised Bed System — BEGINNER — ~MXN 600
6. Outdoor Kitchen System — INTERMEDIATE — ~MXN 8,000

### Animation
- Cards stagger in on scroll, 0.08s apart

---

## Section 4: Material Lab

**Layout**: Full-width horizontal scroll strip (desktop) or vertical list (mobile)
**Background**: `#1a1916`

### Material Tiles
Each tile:
- Material name (large, weight 700)
- Spanish name (secondary, italic)
- Category badge
- 3 key facts (icons + text)
- Hover: expand to show risks and substitutes

### Materials to Show
- FOAMULAR XPS, AR Fiberglass Mesh, Diamond Mesh, Portland Cement, SikaLatex, Pegapiso

---

## Section 5: Field Notes Preview

**Layout**: Editorial 3-column card grid
**Background**: `#080806`

### Note Card
- Date label (monospace)
- Title (medium weight)
- Source type badge (conversation / field-test / youtube)
- 2-line excerpt
- "Read →" link

---

## Section 6: Agent Teaser

**Layout**: Full-width dark panel, centered content, subtle blueprint grid background
**Text**: 
```
THIS SITE IS AGENT-OPERATED.

Pi Agent manages content updates, knowledge queries,
material registry edits, and build system drafts.

[GHOST BUTTON: Learn about the Pi Agent]
```

---

## Section 7: CTA Footer Band

**Layout**: Horizontal split — left text, right 2 buttons
```
Build something real.          [Explore Build Systems →]
                               [View Safety Canon →]
```

---

## Responsive Notes

- Desktop (≥1280px): Full cinematic layout, Three.js hero, 3-col grids.
- Tablet (768–1279px): 2-col grids, reduced hero typography.
- Mobile (<768px): 1-col, no Three.js (performance), GSAP still active.
