# AGENTS.md — Infinite Architecture

This file contains rules every coding or content agent must know on every turn. Task-specific methods live in `/skills` or `docs/SKILL_ORCHESTRATION.md` and are loaded only when needed.

## Mission

Build Infinite Architecture into a paid biophilic concept-design and project-coordination studio for Airbnbs, glamping retreats, off-grid properties, landowners, and real-estate agents, beginning in Puerto Vallarta.

The public site must generate qualified project inquiries. The private Pi Agent system supports research, content, 3D workflows, vendor coordination, documentation, QA, and releases.

## Commercial priority

The current revenue offer is:

> Site and concept audit → biophilic concept package → coordinated build package → ongoing property evolution.

Do not add unrelated software products before the public offer, inquiry path, and proof portfolio work.

## Project role boundaries

Infinite Architecture may provide:

- concept direction
- 3D visualization
- project planning
- vendor and labor coordination
- procurement support
- landscape and living-system coordination
- progress documentation
- real-estate presentation assets

Do not claim that Infinite Architecture is the licensed architect, engineer, MEP designer, permit authority, or general contractor unless the named qualified party and contractual role are verified.

Structural, permit, electrical, plumbing, fire, accessibility, geotechnical, and other regulated work requires qualified local professionals.

## Branch and release workflow

1. Read current `main`.
2. Work on a focused feature branch.
3. Keep changes isolated and reviewable.
4. Run typecheck, lint, tests, and build.
5. Push the branch to trigger a Vercel preview.
6. Perform mobile, desktop, accessibility, visual, content, and safety review.
7. Record proof.
8. Obtain approval.
9. Merge to `main`.
10. Verify production and retain rollback SHA.

Current redesign branch:

`feature/awwwards-biophilic-resize`

Never merge a builder's own work without an independent review.

## Public/private separation

Public:

- studio
- projects
- build types
- climate atlas
- field notes
- materials
- services
- project intake

Private:

- dashboard
- Pi Agent
- claim review
- vendor records
- project financials
- customer data
- unpublished research
- release controls

Private routes must not appear in public navigation and must not leak secrets or internal records.

## Design rules

Load `STYLE_GUIDE.md` before changing public UI.

Public pages use editorial biophilic mode. Technical and dashboard pages use technical field mode. Do not mix them randomly.

Official brand fonts:

- Bodoni Moda
- Instrument Serif

The first mobile viewport must communicate the service, audience, and primary action without requiring interpretation.

Use motion sparingly. No scroll hijacking on mobile. Respect reduced motion.

## Content rules

- Write specific, plain language.
- Label concept imagery as concept imagery.
- Distinguish built work, proposed work, research, and inspiration.
- Record sources and dates for factual claims.
- Do not publish third-party images without verified rights.
- Do not fabricate testimonials, projects, costs, performance, or environmental benefits.
- Comparisons must expose assumptions and confidence.

## Architecture rules

- Preserve the existing Next.js and React architecture.
- Inspect before changing.
- Reuse before adding.
- Server components by default.
- Keep client components small.
- Dynamically import WebGL and heavy motion.
- Avoid boolean-prop component sprawl.
- Do not add a second library for a capability already present.
- No secrets in code, logs, screenshots, issues, or prompts.
- Every major change needs rollback.

## Skill routing

Use task-specific skills in this order when relevant:

1. Understand Anything — map the current codebase and change impact.
2. Graphify — map build, climate, material, service, and content relationships.
3. Quicky Wiki — manage sourced claims, contradictions, and freshness.
4. Awesome Design MD + Stitch Design Taste — synthesize the visual system.
5. Taste + Redesign Existing Projects — direct and execute the brownfield redesign.
6. Cinematic Site Components — source a small number of proven motion patterns.
7. React Best Practices + Composition Patterns — implement without performance or API debt.
8. Uncodixfy — remove generic AI design patterns.
9. RTK-inspired review, security, TDD, recap, and ship loops — verify and release.
10. Deploy to Vercel — preview first; production only after approval.
11. Codebase-to-Course — create owner and collaborator training after the slice is stable.

Read `docs/SKILL_ORCHESTRATION.md` for exact inputs, outputs, and trigger conditions.

## Definition of done

A task is not done because code exists or a build passes.

Done requires:

- intended behavior works
- mobile and desktop proof
- no critical accessibility failure
- no unresolved safety or role-boundary issue
- public/private separation preserved
- preview deployment reviewed
- rollback SHA recorded
- commercial purpose remains clear
