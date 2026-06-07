# UIGEN INTEGRATION PLAN

## Purpose

`uigen` is the UI/UX generation workflow for Infinite Architecture. It produces:
- Landing page visual concepts
- Dashboard UI specifications
- Component hierarchies
- Interaction storyboards
- Responsive layout definitions
- High-class visual system documentation
- Implementation task breakdowns

## Integration Status

**Current**: Spec-only. All UI defined in this skills/uigen folder.
**Target**: When `darula-hpp/uigen` is locally available, wire the generator to produce
component scaffolding from these specs.

## Reference Repository

`https://github.com/darula-hpp/uigen.git`

If not cloned locally, Bambu should clone to:
`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\INFINITE ARCHETECTURE\skills\uigen`

## Workflow

1. Design brief → `LANDING_PAGE_UI_SPEC.md` or `OWNER_DASHBOARD_UI_SPEC.md`
2. uigen reads spec → generates component scaffold
3. Builder agent reviews generated scaffold
4. Adams Reviewer approves
5. Merged into main app

## Current Deliverables (Manual)

All specs in this folder are manually crafted to Webflow-class standard.
They define the design system, component hierarchy, and interaction patterns
until automated uigen generation is wired.

See:
- `LANDING_PAGE_UI_SPEC.md`
- `OWNER_DASHBOARD_UI_SPEC.md`
- `COMPONENT_REGISTRY.md`
