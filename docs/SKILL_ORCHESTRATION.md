# Infinite Architecture — Skill Orchestration Plan

This document explains exactly how the uploaded skill libraries will be used to turn Infinite Architecture into a commercial biophilic studio without creating a pile of overlapping agents or duplicate tooling.

The operating model is one Pi Agent with lazy-loaded skills and persona folders. `AGENTS.md` holds only permanent rules. The Pi Agent loads the specific skill needed for the current task.

---

## 1. Operating sequence

### Phase A — Understand the brownfield system

1. Run **Understand Anything** against the repository.
2. Generate a code, route, dependency, content, and business-flow graph.
3. Run **Pauli Graphify** over the architecture knowledge taxonomy.
4. Record current routes, data sources, public/private boundaries, and blast radius.

### Phase B — Lock the commercial and visual system

5. Use **Awesome Design MD** as a reference library.
6. Use **Stitch Design Taste** to encode the chosen direction into a single design specification.
7. Apply **Taste Skill** design dials.
8. Apply **Redesign Existing Projects** to the current app rather than rewriting it.

### Phase C — Build the public conversion slice

9. Select restrained patterns from **Cinematic Site Components**.
10. Implement using **React Best Practices** and **Composition Patterns**.
11. Run **Uncodixfy** and the Taste preflight to remove generic AI output.
12. Use **Full Output Enforcement** for complete files and complete test fixtures.

### Phase D — Build the knowledge and publishing engine

13. Use **Quicky Wiki** for sourced research claims and contradiction tracking.
14. Use **Graphify** to connect climates, materials, build types, services, and articles.
15. Use **Codebase-to-Course** to produce internal owner training after the system stabilizes.

### Phase E — Verify and ship

16. Use the applicable **RTK workflow patterns** for TDD, security, review, recap, and release.
17. Use **Deploy to Vercel** for a preview.
18. Perform independent taste, mobile, accessibility, safety, and commercial review.
19. Merge only after approval and preserve rollback.

---

# 2. Skill-by-skill application

## Understand Anything

**Source archive:** `Understand-Anything-main.zip`

### Purpose in Infinite Architecture

Create a durable map of the repository so Pi Agent and future builders understand:

- routes
- components
- server/client boundaries
- content registries
- public/private features
- data flow
- Pi Agent integration points
- Vercel deployment relationship
- change impact

### Trigger

Run:

- before the homepage redesign begins
- after the public/private layout split
- after the blog, globe, or Pi Agent architecture changes
- when a new builder takes over
- when a change has unclear blast radius

### Inputs

- current branch
- repository files
- existing architecture documents
- README, STYLE_GUIDE, AGENTS, ROADMAP, SAFETY_CANON
- route and component tree

### Actions

1. Scan the repository.
2. Identify architectural layers and domain areas.
3. Generate a structural graph.
4. Generate a business-domain graph.
5. Create a guided tour for a new builder.
6. Mark stale or contradictory documentation.
7. Re-run impact analysis before invasive changes.

### Outputs

- current architecture map
- route map
- domain map
- data-flow map
- onboarding tour
- change-impact report
- stale-document list

### What it must not do

- invent undocumented business rules
- replace code review
- expose secrets
- become a public dependency of the website

---

## Taste Skill — High-Agency Frontend

**Source archive:** `taste-skill-main.zip`  
**Primary skill:** `design-taste-frontend`

### Purpose in Infinite Architecture

Set the visual and interaction ambition high enough to avoid a generic template while retaining usability.

### Locked dials

- `DESIGN_VARIANCE = 8`
- `MOTION_INTENSITY = 6`
- `VISUAL_DENSITY = 3` for public editorial pages
- `VISUAL_DENSITY = 6` for private technical dashboards

### Trigger

- before designing any public page
- during visual review
- before a Vercel preview is approved

### Actions

- reject symmetrical three-card defaults
- verify typography hierarchy
- require responsive mobile collapse
- isolate perpetual motion
- check animation cleanup
- enforce complete empty, error, and loading states
- identify imported-library assumptions
- check for GPU-safe motion

### Outputs

- visual direction checklist
- component-level design decisions
- motion budget
- final preflight score

### Do not use

Do not use the skill as permission to maximize animation. Infinite Architecture must feel calm and architectural, not like a motion demo.

---

## Redesign Existing Projects

**Source:** `taste-skill-main/skills/redesign-skill`

### Purpose

Perform the Awwwards redesign as a brownfield upgrade without breaking the existing routes, data, and dashboard.

### Trigger

Use for every public page redesign.

### Sequence

1. Scan the existing implementation.
2. Diagnose generic patterns.
3. Fix the smallest visual slice.
4. Verify behavior.
5. Compare before and after.
6. Keep changes reviewable.

### First application

- homepage
- public navigation
- build-system library presentation
- project intake
- field-note previews

### Required output

A written audit tied to specific files, followed by a focused implementation PR.

---

## Minimalist UI

**Source:** `taste-skill-main/skills/minimalist-skill`

### Purpose

Provide the public site's disciplined editorial base.

### Use for

- navigation
- project index
- service explanation
- forms
- article templates
- footer
- mobile layouts

### Rules adopted

- warm monochrome base
- large whitespace
- no generic gradients
- minimal shadows
- intentional typographic contrast
- no excessive pills
- flat, clear interaction hierarchy

### Do not use

Do not make the site sterile. Photography, curved masks, and natural materials supply emotion.

---

## High-End Visual Design / Soft Skill

**Source:** `taste-skill-main/skills/soft-skill`

### Purpose

Supply agency-level art direction and motion choreography for the cinematic public experience.

### Use for

- full-page hero
- project case-study transitions
- image masking
- curved layouts
- high-end hover and page transitions
- controlled atmospheric depth

### Constraints

- the visual system in `STYLE_GUIDE.md` overrides any generic font suggestions in the skill
- no endless motion
- no false luxury
- no visual effect that weakens the commercial message
- public performance budgets remain binding

---

## Industrial Brutalist Skill

**Source:** `taste-skill-main/skills/brutalist-skill`

### Purpose

Create a separate technical language for diagrams, safety, research, and the Pi Agent dashboard.

### Use for

- hyper-roof diagrams
- climate and material telemetry
- safety warnings
- structural assumptions
- build logs
- private dashboard
- comparison data

### Do not use

Do not apply this mode to the main public homepage. The public site is editorial biophilic; the technical system is industrial field mode.

---

## Stitch Design Taste

**Source:** `taste-skill-main/skills/stitch-skill`

### Purpose

Turn the locked brand direction into a machine-readable `DESIGN.md` for any screen-generation or design agent.

### Trigger

- after `STYLE_GUIDE.md` changes
- before generating a new screen family
- before delegating screens to another builder

### Output

`DESIGN.md` containing:

- atmosphere
- typography
- color
- density
- composition
- motion
- responsive rules
- banned patterns
- component behavior

### Rule

`STYLE_GUIDE.md` remains the human source of truth. `DESIGN.md` is the agent-facing translation.

---

## Full Output Enforcement

**Source:** `taste-skill-main/skills/output-skill`

### Purpose

Prevent partial code, omitted states, placeholder comments, and incomplete file delivery.

### Use for

- complete component files
- complete MDX templates
- complete locale dictionaries
- full test fixtures
- migration scripts
- handoff packages

### Rule

This skill guarantees completeness, not correctness. It must be followed by build, test, and review.

---

## Cinematic Site Components

**Source archive:** `cinematic-site-components-master.zip`

### Purpose

Provide tested interaction patterns that can be translated into the existing Next.js/GSAP stack.

### Approved components for Round 1

1. **Curtain Reveal** — hero image entrance.
2. **Layered Zoom Parallax** — one transition from architecture to landscape.
3. **Sticky Stack Narrative** — service process.
4. **Horizontal Scroll** — desktop project gallery with mobile stacked fallback.
5. **SVG Draw** — climate and systems diagrams.
6. **Text Mask** — one signature headline treatment.

### Deferred components

- glitch effect
- particle explosion
- macOS dock
- text scramble
- magnetic repel grid
- dynamic island navigation

These do not support the current brand.

### Integration process

1. Study the vanilla HTML/CSS/GSAP implementation.
2. Rebuild it as a small React client component.
3. Use the existing GSAP dependency.
4. Add cleanup for ScrollTrigger and timelines.
5. Add reduced-motion mode.
6. Provide non-animated content fallback.
7. Test mobile performance.

### Rule

Use no more than three major cinematic systems on the homepage.

---

## Codebase-to-Course

**Source archive:** `codebase-to-course-main.zip`

### Purpose

Teach the owner and collaborators how Infinite Architecture works without requiring them to read the source code.

### Trigger

Run after the first commercial slice is stable.

### Internal course

Create a private interactive course:

1. What the public site sells.
2. How the routes and content work.
3. How Pi Agent and persona folders operate.
4. How claims, sources, and translations move through the system.
5. How a branch becomes a preview and production release.
6. How to recover or roll back.

### Public adaptation

A separate public learning experience may teach:

`How an Infinite Architecture project moves from land and idea to concept, specialist team, and coordinated delivery.`

Do not expose private system code or credentials in the public course.

---

## RTK Master

**Source archive:** `rtk-master.zip`

RTK is primarily a Rust CLI repository. Do not install the whole Rust-specific system into the Next.js site. Reuse its workflow patterns and adapt only compatible skills.

### Repo recap

Use after every meaningful phase to summarize:

- open branch
- recent commits
- changed files
- preview status
- risks
- next decision

### TDD patterns

Use for:

- intake validation
- localization fallback
- content schema parsing
- public/private route checks
- claim confidence logic
- comparison calculator
- data registry changes

### Security guardian

Adapt for:

- Pi Agent API authentication
- dashboard access
- file upload validation
- prompt injection boundaries
- command execution
- webhook verification
- secrets and logs
- untrusted content ingestion

### Code simplifier

Use the principle, not the Rust-specific rules:

- remove unnecessary abstraction
- reduce nesting
- avoid duplicated state
- eliminate needless client components
- preserve behavior
- do not simplify safety checks or explicit domain boundaries

### Ship workflow

Adapt into:

1. quality checks
2. preview deployment
3. independent review
4. approval
5. merge
6. production verification
7. rollback record

### Worktree practices

Use isolated branches/worktrees when parallel builders are active. Do not let two agents edit the same feature surface without coordination.

---

## Vercel Agent Skills

**Source archive:** `agent-skills-main-1.zip`

### React Best Practices

Use during every implementation and review.

Highest-priority applications:

- parallelize independent server data
- direct imports instead of barrels
- dynamically import 3D and heavy motion
- minimize client-side JavaScript
- keep server data on the server
- prevent unnecessary rerenders
- use passive scroll listeners
- isolate expensive animation
- preload project assets intentionally
- prevent hydration flicker

### Composition Patterns

Use when building:

- project gallery
- comparison modules
- climate globe controls
- article layouts
- service process
- intake flow

Prefer explicit variants and compound components over growing lists of boolean props.

### Deploy to Vercel

Use preview deployment by default.

For this project:

- locked Vercel project ID: `prj_4jmm1ZRDm05LVJaFJw0wQqwDW1Jr`
- feature branches create previews
- `main` is production
- paid or production-impacting actions require approval
- return preview URL and record commit SHA
- do not claim production verification from a build alone

---

## Pauli Graphify

**Source archive:** `pauli-graphify-master.zip`

### Purpose

Convert the hierarchical architecture corpus into a relationship graph.

### Nodes

- build type
- structure
- material
- climate
- hazard
- water system
- energy system
- planting system
- service
- project
- article
- expert
- supplier
- assumption
- claim

### Edges

- suitable-for
- incompatible-with
- requires-review-by
- performs-in
- sourced-from
- used-in
- reduces
- increases
- depends-on
- alternative-to
- maintained-by
- described-in

### Use cases

- climate atlas
- related field notes
- recommended systems
- material compatibility
- project dependency maps
- Pi Agent retrieval
- warning propagation

### Rule

Graphify captures structure. It does not determine truth. Claims still require source and confidence review.

---

## Quicky Wiki

**Source archive:** `quicky-wiki-main.zip`

### Purpose

Create a living, confidence-scored research base behind the public site.

### Ingest

- research papers
- official guidance
- manufacturer technical sheets
- codes and standards where legally usable
- case studies
- local climate data
- interview notes
- project observations
- existing repository documents

### Store per claim

- statement
- source
- source date
- jurisdiction
- confidence
- contradiction status
- last reviewed date
- public/private status
- safety sensitivity

### Use for

- blog research
- climate atlas
- material claims
- comparison calculators
- Pi Agent answers
- outdated-content detection

### Publication gate

A claim does not become public merely because an LLM extracted it. High-stakes claims require human or qualified-professional review.

---

## Awesome Design MD

**Source archive:** `awesome-design-md-main.zip`

### Purpose

Use established product and editorial design systems as a comparison library.

### Method

1. Review relevant design documents.
2. Extract principles, not copied layouts.
3. Compare those principles against the Infinite Architecture brief.
4. Record accepted and rejected patterns.
5. Synthesize a project-specific `DESIGN.md`.

### Relevant reference families

- Apple: image discipline, product focus, pacing
- Airbnb: hospitality, trust, destination imagery, conversion
- editorial/document systems: hierarchy and readability
- high-quality product systems: component rigor and accessibility

### Rule

Do not collage several brands into one inconsistent site. Infinite Architecture gets one coherent design language.

---

## Uncodixfy

**Source archive:** `Uncodixfy-main.zip`

### Purpose

Run the final anti-slop pass after implementation.

### Audit for

- generic centered hero
- gradient blobs
- floating SaaS cards
- excessive pills
- eyebrow labels everywhere
- fake premium copy
- dramatic shadows
- generic three-column layouts
- unnecessary icon decoration
- overly rounded forms
- meaningless motion
- AI clichés

### Infinite Architecture interpretation

Uncodixfy is a corrective filter, not the primary style source. It must preserve the intentional editorial and cinematic elements defined in `STYLE_GUIDE.md`.

---

# 3. Pi Agent lazy-load structure

```text
agents/
  personas/
    studio-director/
      ROLE.md
    biophilic-concept-designer/
      ROLE.md
    hospitality-strategist/
      ROLE.md
    climate-planner/
      ROLE.md
    materials-researcher/
      ROLE.md
    blender-operator/
      ROLE.md
    vendor-coordinator/
      ROLE.md
    cost-and-scope-planner/
      ROLE.md
    editorial-director/
      ROLE.md
    localization-reviewer/
      ROLE.md
    safety-reviewer/
      ROLE.md
    release-manager/
      ROLE.md

skills/
  understand-anything/
  design-taste/
  redesign-existing-projects/
  cinematic-components/
  react-best-practices/
  composition-patterns/
  uncodixfy/
  graphify/
  quicky-wiki/
  codebase-to-course/
  security-review/
  deploy-to-vercel/
```

The Pi Agent loads one persona and the smallest relevant set of skills. It does not instantiate a separate persistent agent for every folder.

---

# 4. Round 1 skill run order

For the current Awwwards branch:

1. **Understand Anything:** snapshot current architecture.
2. **Redesign Existing Projects:** audit homepage and navigation.
3. **Awesome Design MD:** compare relevant design systems.
4. **Stitch Design Taste:** produce agent-facing design spec.
5. **Taste Skill + Minimalist + Soft:** implement visual direction.
6. **Cinematic Components:** add only hero reveal and one narrative system.
7. **React Best Practices + Composition:** performance and component review.
8. **Uncodixfy:** remove generic patterns.
9. **RTK security/TDD patterns:** validate intake and public/private boundaries.
10. **Deploy to Vercel:** preview.
11. **Taste and commercial review:** independent score.
12. **Ship workflow:** approval, merge, production verification, rollback record.

---

# 5. Success criteria

The skill system is working when:

- a new agent can understand the repo without re-reading everything
- the public site looks coherent across pages
- the public site produces qualified inquiries
- technical claims carry sources and confidence
- no private route or secret leaks into public output
- 3D and motion features do not damage mobile performance
- every release has proof and rollback
- one Pi Agent can switch workflows through lazy-loaded persona and skill folders
