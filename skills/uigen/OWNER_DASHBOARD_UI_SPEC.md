# OWNER DASHBOARD — UI SPECIFICATION

## Design Direction

**Theme**: Private command center — architectural precision meets research workstation.
**Feel**: Dark glass panels, warm accent glows, monospace data, structured spatial grid.
**NOT**: Generic admin dashboard. No Bootstrap tables. No SaaS sidebar.

## Layout System

```
┌─────────────────────────────────────────────────────────────┐
│  INFINITE ARCHITECTURE   DASHBOARD         [BEAD IA-0002]   │ ← Top bar
├─────────┬───────────────────────────────────────────────────┤
│         │                                                     │
│  NAV    │  MAIN CONTENT AREA                                  │
│  RAIL   │                                                     │
│  (64px) │  Module-based, full width                           │
│         │                                                     │
│  ───    │                                                     │
│  CMD    │                                                     │
│  PLTT   │                                                     │
│         │                                                     │
└─────────┴───────────────────────────────────────────────────┘
```

### Nav Rail (left, 64px wide)
Icon-only navigation. Tooltip on hover. Active: accent orange dot indicator.

Icons (lucide-react):
- `LayoutDashboard` → Command Center
- `FileText` → Editorial Pipeline
- `Package` → Material Registry
- `Wrench` → Build Systems
- `Share2` → Social Studio
- `MessageSquare` → Pi Agent Chat
- `GitBranch` → Beads Timeline

---

## Module 1: Command Center

**Grid**: 2x2 stat cards + full-width status strip + recent activity list

### Stat Cards
```
┌─────────────────┐  ┌─────────────────┐
│ ACTIVE BEADS    │  │ PENDING REVIEW  │
│ 2               │  │ 1               │
│ ▲ +1 today      │  │ Safety block: 0 │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│ DRAFT CONTENT   │  │ SOCIAL QUEUE    │
│ 0               │  │ 2 drafts        │
│ ─ no change     │  │ 0 approved      │
└─────────────────┘  └─────────────────┘
```

Card style: glass panel, 1px border, monospace label at top, large number, secondary stat.

### Status Strip
Latest bead ID + phase + timestamp + next recommended action.
`IA-BEAD-0002  architecture  2026-06-06  →  Push branch and create PR`

### Recent Activity
Chronological feed of last 10 events (bead creations, content changes, reviews).

---

## Module 2: Editorial Pipeline

**Layout**: Kanban-style horizontal scroll with status columns

### Columns
```
RAW → PROCESSED → DRAFTED → DESIGN-READY → REVIEWED → APPROVED → PUBLISHED
```

### Cards in each column
- Title
- Type badge (field-note / guide / build-system)
- Bead ID
- Drag to move between columns (Framer Motion layout animation)

---

## Module 3: Material Registry

**Layout**: Full-width data table with filters and inline edit

### Table Columns
- Name | Spanish Name | Category | Supplier | Approx. Price | Test Status | Actions

### Features
- Filter by category
- Inline edit cells
- Add new row
- Export JSON
- Row hover: expand to show risks, substitutes, use cases

---

## Module 4: Build Systems Registry

**Layout**: Card grid with detail drawer

### Card
- System title + category + difficulty chip + test status
- Thumbnail / SVG diagram placeholder
- Click → opens detail drawer from right

### Detail Drawer
- Full system data (steps, materials, mixes, risks)
- Edit controls
- Safety level indicator
- Related content links

---

## Module 5: Social Studio

**Layout**: Split — queue list on left, preview panel on right

### Queue List
- Platform icon + source content slug + status badge
- Filter by platform / status
- Approve / Reject / Schedule actions

### Preview Panel
- Shows caption, hook, hashtags
- Visual prompt rendered as text (placeholder for image generation)
- Short video script in formatted code block
- Edit fields for all content

---

## Module 6: Pi Agent Chat

**Layout**: Full-height chat panel — minimal, clean

### Design
- Messages: user right-aligned (warm accent), Pi Agent left-aligned (dark glass)
- Input: full-width, single-line, monospace
- Suggested actions (chips): 
  - "Turn this field note into a guide"
  - "Update the ferrocement mix ratio"
  - "Generate social post for foam panel"
  - "Show me the material registry"
- Empty state: "Pi Agent is ready. Ask anything about Infinite Architecture."

### Pi Agent Status
- Connected indicator (green pulse dot)
- Fallback: "Pi Agent offline — using local knowledge base"

---

## Module 7: Beads Timeline

**Layout**: Vertical timeline, oldest at bottom, newest at top

### Timeline Entry
```
● IA-BEAD-0002  [architecture]  [active]  2026-06-06
  Foundation — docs, data schemas, agents, app infrastructure
  Files: 50+ | Commands: mkdir, Write | Risks: 2
  [ROLLBACK] [VIEW DIFF] [VIEW FILES]
```

### Rollback Button
Opens confirmation modal:
"Rolling back to IA-BEAD-0001 will undo all changes made after YYYY-MM-DD HH:MM.
This is destructive. Are you sure?"
Requires Bambu confirmation.

---

## Interaction Patterns

- **Command Palette**: `⌘K` opens a floating palette — search beads, content, materials.
- **Toasts**: top-right, 3s auto-dismiss. Success: gold. Error: orange. Warning: rust.
- **Modals**: centered, backdrop blur, Framer Motion scale-in.
- **Drawers**: slide from right, 40% width desktop, 100% mobile.
