# COMPONENT REGISTRY

## Design System Primitives

### Layout
- `Container` — max-width wrapper with responsive padding
- `Section` — vertical rhythm section with scroll trigger
- `Grid` — responsive grid with gap control
- `Stack` — vertical flex stack

### Typography
- `DisplayHeading` — hero and section display text, GSAP-ready
- `EditorialBody` — body copy with reading measure
- `Label` — monospace uppercase category label
- `MonoStat` — large number display for dashboard stats

### Interactive
- `Button` — primary | secondary | ghost | destructive
- `Badge` — category, status, difficulty chips
- `Card` — surface card with hover states
- `GlassPanel` — dark glass surface for dashboard
- `Drawer` — right-slide panel
- `Modal` — centered overlay with backdrop

### Data Display
- `DataTable` — registry table with filters and inline edit
- `KanbanBoard` — editorial pipeline kanban
- `Timeline` — beads timeline
- `StatCard` — command center metric card

### Content
- `BuildSystemCard` — build system preview card
- `MaterialTile` — material lab tile
- `FieldNoteCard` — editorial field note card
- `SocialQueueItem` — social queue list item

### Feedback
- `Toast` — notification toast (Framer Motion)
- `SafetyNote` — safety warning callout (warn | critical)
- `EngineeringNote` — mandatory engineering disclaimer
- `StatusBadge` — bead/content status indicator

### Navigation
- `NavBar` — top navigation bar
- `NavRail` — dashboard icon-only rail
- `CommandPalette` — ⌘K search/action palette

### Special
- `HeroCanvas` — Three.js R3F canvas for hero background
- `GSAPReveal` — scroll-triggered stagger reveal wrapper
- `PiAgentChat` — chat UI panel for Pi Agent
- `BeadEntry` — timeline entry for beads viewer

---

## Component Location Map

```
components/
├── landing/
│   ├── Hero.tsx               ← HeroCanvas + DisplayHeading + GSAP
│   ├── Mission.tsx            ← Section + Grid + mission pillars
│   ├── BuildSystemGrid.tsx    ← Grid + BuildSystemCard[]
│   ├── MaterialLab.tsx        ← horizontal scroll + MaterialTile[]
│   ├── FieldNotesPreview.tsx  ← Grid + FieldNoteCard[]
│   └── AgentTeaser.tsx        ← full-width dark panel + CTA
│
├── dashboard/
│   ├── CommandCenter.tsx      ← StatCard[] + status strip + activity
│   ├── EditorialPipeline.tsx  ← KanbanBoard
│   ├── MaterialRegistry.tsx   ← DataTable (materials)
│   ├── BuildSystemsRegistry.tsx ← Card grid + Drawer
│   ├── SocialStudio.tsx       ← queue list + preview panel
│   ├── BeadsTimeline.tsx      ← Timeline + BeadEntry[]
│   └── PiAgentChat.tsx        ← chat UI
│
└── shared/
    ├── NavBar.tsx             ← site navigation
    ├── Footer.tsx             ← site footer
    └── DashboardLayout.tsx    ← dashboard chrome (rail + header)
```

---

## Props Conventions

All components accept `className?: string` for extension.
Data-display components accept typed data props from `lib/types.ts`.
Interactive components accept `onAction` callbacks.

## Animation Conventions

GSAP components: accept `delay?: number` for stagger offset.
Framer Motion components: use `initial/animate/exit` props.
All animations: respect `prefers-reduced-motion`.
