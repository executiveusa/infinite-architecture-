# INFINITE ARCHITECTURE — STYLE GUIDE

## Design Philosophy

This is not a template site. It is a luxury architecture/research studio digital system.

Visual direction: **cinematic material laboratory meets editorial research journal.**

Every pixel should feel intentional. Every element should feel weighted.
The site should feel like walking into a high-end architecture studio in Puerto Vallarta —
dark, cool, material, precise, unhurried.

---

## Color Palette

### Base
| Token | Value | Use |
|-------|-------|-----|
| `--bg-base` | `#080806` | Page background |
| `--bg-surface` | `#1a1916` | Cards, panels |
| `--bg-elevated` | `#252420` | Modals, elevated surfaces |
| `--bg-overlay` | `rgba(8,8,6,0.85)` | Nav overlay, backdrop |

### Text
| Token | Value | Use |
|-------|-------|-----|
| `--text-primary` | `#f2ede8` | Headlines, body |
| `--text-secondary` | `#a89f94` | Labels, captions |
| `--text-muted` | `#6b6560` | Disabled, placeholders |
| `--text-inverse` | `#080806` | Text on light accents |

### Accents (construction material palette)
| Token | Value | Material Reference |
|-------|-------|-------------------|
| `--accent-orange` | `#e85d04` | Safety orange, construction tape |
| `--accent-blue` | `#4a90d9` | Blueprint blue, technical drawing |
| `--accent-gold` | `#c5b358` | Oxidized steel, raw brass |
| `--accent-sage` | `#6b8f47` | Lime chalk, site vegetation |
| `--accent-concrete` | `#8a8278` | Raw concrete |
| `--accent-sand` | `#d4c5a9` | Fine sand, foam |
| `--accent-rust` | `#9b3a1a` | Rust, weathered iron |

### Borders and Dividers
| Token | Value | Use |
|-------|-------|-----|
| `--border` | `#2d2c29` | Default borders |
| `--border-subtle` | `#1f1e1b` | Subtle dividers |
| `--border-accent` | `#e85d04` | Accent borders, highlights |

---

## Typography

### Display (Hero Headings)
- Font: System display stack or loaded variable font
- Weight: 700–900
- Letter spacing: -0.02em to -0.04em
- Transform: uppercase for system names, mixed case for editorial
- Size scale: 5rem → 10rem+ for hero

### Editorial (Body, Articles)
- Font: Readable serif or high-quality sans
- Line height: 1.65–1.8 for body
- Measure: max 68ch for reading columns
- Size: 1rem–1.125rem

### Technical (Labels, Data, Code)
- Font: Monospace
- Size: 0.75rem–0.875rem
- Letter spacing: 0.05em
- Transform: uppercase for category labels

### Scale (Tailwind extensions)
```
text-display-xl: clamp(4rem, 10vw, 9rem)
text-display-lg: clamp(2.5rem, 6vw, 5.5rem)
text-display-md: clamp(1.75rem, 4vw, 3rem)
text-body-lg: 1.125rem
text-body: 1rem
text-sm: 0.875rem
text-xs: 0.75rem
text-label: 0.6875rem (uppercase, tracked)
```

---

## Spacing

Use an 8px base grid. Key breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Section vertical rhythm: `py-24 md:py-32 lg:py-40`
Container: `max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16`

---

## Animation

### GSAP Patterns
- **Stagger text reveal**: Split heading into chars/words, stagger y + opacity from below.
- **Section entrance**: `ScrollTrigger` with `start: "top 80%"`, fade + translate.
- **Card hover**: Scale 1.02, border-color accent, subtle shadow.
- **Page transition**: GSAP timeline on route change, curtain wipe.

### Framer Motion Patterns
- **Layout animations**: `layout` prop for list reorders (dashboard kanban).
- **Presence**: `AnimatePresence` for modals, drawers, toast.
- **Micro-interactions**: Spring-based button press, icon state transitions.

### Principles
- Duration: 0.4–0.8s for major, 0.15–0.25s for micro.
- Easing: `power2.out` or custom cubic-bezier `(0.25, 0.46, 0.45, 0.94)`.
- Never animate what the user didn't ask to see.
- Respect `prefers-reduced-motion`.

---

## Component Patterns

### Cards
- Background: `var(--bg-surface)` with 1px `var(--border)` border.
- Radius: `4px` (architectural, not rounded-full).
- Hover: lift + accent border left edge.
- Inner layout: strict grid or flex, no orphaned elements.

### Badges / Labels
- Monospace, uppercase, 0.6875rem.
- Background: transparent, border 1px, accent color text.
- No rounded pills — use 2px radius.

### Dashboard Glass Panels
- Background: `rgba(26, 25, 22, 0.7)`.
- Backdrop filter: `blur(12px)`.
- Border: `1px solid rgba(45, 44, 41, 0.6)`.

### Buttons
- Primary: `--accent-orange` bg, dark text, no shadow.
- Secondary: transparent, 1px border, primary text.
- Ghost: no border, hover shows subtle background.
- Destructive: `--accent-rust` bg.
- All: 2px radius, 0.3s transition.

### Data Tables
- No zebra striping — use subtle row hover.
- Header: monospace uppercase label style.
- Cell: comfortable padding `px-4 py-3`.
- Border: only bottom `var(--border-subtle)`.

---

## Icons

Use `lucide-react`. Size: 16px inline, 20px standalone.
Never use emoji as icons in UI. Use structured icon components.

---

## Photography / Imagery

- Concrete textures, raw material close-ups.
- Never stock-photo construction workers.
- Blueprint line drawings preferred for diagrams.
- SVG diagrams for build systems — clean, architectural.
- No gradients that look like consumer SaaS.

---

## Anti-Patterns (Never Do)

- Rounded-full buttons that look like SaaS.
- Drop shadows everywhere.
- Gradient backgrounds that look like crypto landing pages.
- Default Tailwind color palette without customization.
- Comic Sans, Impact, Papyrus.
- Emojis in navigation or headings.
- Overcrowded layouts.
- Generic dashboard chrome (sidebar with icons and text = boring).
- Template-looking hero sections.
- ANY purple color. This is not a tech startup.
