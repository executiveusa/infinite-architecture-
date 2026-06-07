# INFINITE ARCHITECTURE — SYSTEM HANDSHAKE

## Identity

**Infinite Architecture** is a free public construction knowledge base and digital studio system
for low-cost foam, ferrocement, thin-shell concrete, barrel roofs, XPS panels, mesh systems,
bathroom/counter builds, raised beds, outdoor kitchens, and climate-aware DIY infrastructure.

Primary field context: **Puerto Vallarta, Jalisco, Mexico**

## What This Repo Is

This repository contains:

1. **Public high-design website** — cinematic landing page, build systems library, field notes, material registry, guides, lab.
2. **Private owner dashboard** — editorial pipeline, material/build-system editors, social queue, Pi Agent chat, Beads timeline.
3. **Editorial agent definitions** — Research Miner, Construction Editor, Design Editor, Social Producer, Safety Reviewer, Adams Reviewer, Publisher.
4. **Content layer** — filesystem-based MDX content in `/content/`, JSON registries in `/data/`.
5. **Pi Agent integration stub** — chat and knowledge-query backend wired via env vars.
6. **Beads communication protocol** — rollback-addressable checkpoints for every major change.

## Communication Protocol: BEADS

All major changes produce a BEAD. Format:

```
BEAD:
  id: IA-BEAD-XXXX
  parent: IA-BEAD-XXXX
  phase: discovery | architecture | backend | ui | dashboard | editorial | automation | testing | review | merge
  status: planned | active | blocked | complete | failed
  summary:
  decisions:
  files_touched:
  commands_run:
  tests_run:
  rollback:
  risks:
  next_action:
  questions_for_bambu:
```

Rules:
- Never make a major change without a bead.
- Always include rollback notes.
- If blocked, continue with safest useful adjacent task.
- Address human questions as `Bambu: ...`
- Do not expose secrets. Use `.env.example` for placeholders.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP + Framer Motion
- **3D**: Three.js + React Three Fiber
- **Content**: MDX
- **Validation**: Zod
- **Database**: Filesystem JSON (MVP) → Supabase (production)
- **AI Backend**: Pi Agent (stub → live)
- **Deployment**: Vercel

## Builder Agent Rules

1. Inspect before editing.
2. One BEAD per major change.
3. Small coherent commits.
4. Adams Review before merge.
5. No broken work merges.
6. No secrets in code.
7. Bambu only for: missing credentials, legal approvals, destructive actions, unclear product decisions.
