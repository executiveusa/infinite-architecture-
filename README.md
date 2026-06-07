# Infinite Architecture

Free open-source construction knowledge base and digital studio system.

**Site**: foam, ferrocement, thin-shell concrete, barrel roofs, XPS panels, mesh systems, bathroom/counter builds, raised beds, outdoor kitchens, and climate-aware DIY infrastructure.

**Field context**: Puerto Vallarta, Jalisco, México.

## Stack

- Next.js 15 (App Router)
- TypeScript + Zod
- Tailwind CSS
- GSAP + Framer Motion
- Three.js / React Three Fiber
- MDX content
- Filesystem JSON registries (→ Supabase in production)
- Pi Agent integration (stub → live)

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Public Routes

| Route | Description |
|-------|-------------|
| `/` | Cinematic landing page |
| `/build-systems` | Build systems library |
| `/build-systems/[id]` | Individual build system |
| `/field-notes` | Editorial field notes |
| `/materials` | Material registry |
| `/materials/[id]` | Individual material |
| `/guides` | Beginner tutorials |
| `/lab` | Experimental lab |
| `/safety` | Safety canon |

## Dashboard Routes (private)

| Route | Description |
|-------|-------------|
| `/dashboard` | Command center |
| `/dashboard/editorial` | Editorial pipeline |
| `/dashboard/materials` | Material registry editor |
| `/dashboard/build-systems` | Build systems registry |
| `/dashboard/social` | Social queue studio |
| `/dashboard/pi-agent` | Pi Agent chat |
| `/dashboard/beads` | Beads timeline |

## Environment Variables

See `.env.example` for all required variables.

Key vars:
- `DASHBOARD_SECRET` — dashboard access key
- `PI_AGENT_BASE_URL` — Pi Agent backend URL
- `PI_AGENT_API_KEY` — Pi Agent API key

## Beads Protocol

All major changes create a BEAD checkpoint in `/data/beads.json`.
Beads are viewable in the dashboard at `/dashboard/beads`.
Current bead: **IA-BEAD-0002** (architecture phase, active)

## Safety

All content follows `/SAFETY_CANON.md`. Engineering review is mandatory for any
spanning, load-bearing, inhabited, or structural system.

## Documentation

- `INFINITE_ARCHITECTURE_HANDSHAKE.md` — system identity and builder protocol
- `ARCHITECTURE.md` — technical architecture
- `STYLE_GUIDE.md` — design system
- `ROADMAP.md` — development roadmap
- `SAFETY_CANON.md` — safety requirements
- `agents/editorial/` — editorial agent role definitions
- `skills/uigen/` — UI/UX generation specs
