# INFINITE ARCHITECTURE — SYSTEM ARCHITECTURE

## Overview

Single-repo Next.js 15 application. App Router. TypeScript throughout.
Filesystem-based content layer (MVP), migrating to Supabase for production.

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with nav, fonts, GSAP init
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles, CSS custom properties
│   ├── build-systems/      # Build systems library
│   ├── field-notes/        # Editorial field notes
│   ├── materials/          # Material registry
│   ├── guides/             # Beginner tutorials
│   ├── lab/                # Experimental lab
│   └── dashboard/          # Private owner dashboard
│
├── components/
│   ├── landing/            # Landing page sections
│   ├── dashboard/          # Dashboard modules
│   └── shared/             # NavBar, Footer, etc.
│
├── lib/
│   ├── types.ts            # All TypeScript types (Zod-backed)
│   └── data.ts             # Data loading utilities
│
├── data/                   # Filesystem JSON registries
│   ├── materials.json
│   ├── build-systems.json
│   ├── social-queue.json
│   ├── beads.json
│   └── review-log.json
│
├── content/                # MDX content
│   ├── field-notes/
│   ├── guides/
│   └── build-systems/
│
├── agents/
│   └── editorial/          # Agent role definitions
│
└── skills/
    └── uigen/              # UI generation specs
```

## Data Layer (MVP: Filesystem JSON)

- All registries are JSON files in `/data/`
- Read via `lib/data.ts` server-side utilities
- API routes at `/api/*` wrap these for dashboard mutations
- Dashboard mutations write back to JSON files in development
- Production target: Supabase tables (migrations ready)

## Content Layer

- MDX files in `/content/`
- Loaded via `next-mdx-remote` or native Next.js MDX support
- Frontmatter drives metadata, relationships, bead links
- Field notes: `content/field-notes/[slug].mdx`
- Guides: `content/guides/[slug].mdx`
- Build systems: `content/build-systems/[slug].mdx`

## API Routes

```
/api/materials          GET list, POST create
/api/materials/[id]     GET, PUT, DELETE
/api/build-systems      GET list, POST create
/api/build-systems/[id] GET, PUT, DELETE
/api/social-queue       GET list, POST create
/api/social-queue/[id]  GET, PUT, DELETE
/api/beads              GET list, POST create
/api/field-notes        GET list
/api/pi-agent           POST chat query (Pi Agent stub)
```

## Pi Agent Integration

- Stub at `/api/pi-agent/route.ts`
- Reads `PI_AGENT_BASE_URL` and `PI_AGENT_API_KEY` from env
- Falls back to local knowledge base if Pi Agent unavailable
- Dashboard chat panel connects to this endpoint

## Auth (Dashboard)

- Dashboard protected by `DASHBOARD_SECRET` env var
- Simple middleware check: `x-dashboard-key` header or cookie
- Production: swap for NextAuth or Supabase Auth

## Deployment

- Vercel (Vercel MCP available in session)
- Env vars via Vercel project settings
- Static generation where possible, ISR for content pages
- Dashboard routes: server-side rendered (no static caching)

## Design System

See `/STYLE_GUIDE.md` for full visual spec.

Core tokens:
```css
--bg-base: #080806;
--bg-surface: #1a1916;
--bg-elevated: #252420;
--text-primary: #f2ede8;
--text-secondary: #a89f94;
--text-muted: #6b6560;
--accent-orange: #e85d04;
--accent-blue: #4a90d9;
--accent-gold: #c5b358;
--accent-sage: #6b8f47;
--border: #2d2c29;
```
