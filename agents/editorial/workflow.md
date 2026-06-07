# INFINITE ARCHITECTURE — EDITORIAL WORKFLOW

## Overview

All content published to Infinite Architecture passes through this editorial pipeline.
Each agent has a defined role and a mandatory gate that must pass before the next stage.

## Workflow Stages

```
RAW INPUT
    │
    ▼
[Research Miner] ──── extracts: materials, methods, risks, costs
    │
    ▼
[Construction Editor] ── converts: raw → build guide with steps, warnings, substitutions
    │
    ▼
[Design Editor] ──────── structures: diagrams, cards, pull quotes, interactive elements
    │
    ▼
[Safety Reviewer] ────── flags: structural risks, adds disclaimers, may BLOCK publication
    │
    ▼
[Social Producer] ────── creates: caption variants, short-form scripts, visual prompts
    │
    ▼
[Adams Reviewer] ─────── reviews: all code and content, issues blockers/nitpicks/praise
    │
    ▼
[Publisher Agent] ────── publishes ONLY after all gates pass, records bead checkpoint
    │
    ▼
PUBLISHED
```

## Gate Rules

1. **Safety Reviewer can BLOCK publication** — no override without Safety Reviewer clearance.
2. **Adams Reviewer must give merge recommendation** before Publisher activates.
3. **Every published piece creates a BEAD** checkpoint.
4. **Social posts require Safety Reviewer pass** before queuing.
5. **Revision triggers re-entry** at the appropriate stage.

## Content Types

| Type | Entry Stage | Exit Stage |
|------|------------|------------|
| Build System | Research Miner | Publisher |
| Field Note | Research Miner | Publisher (can be partial draft) |
| Material Entry | Research Miner | Publisher |
| Guide | Construction Editor | Publisher |
| Lab Entry | Construction Editor | Publisher |
| Social Post | Social Producer | Publisher |

## Draft Status Lifecycle

```
raw → processed → drafted → reviewed → approved → published
```

Rejected drafts return to `drafted` with review notes attached.

## Bead Integration

Every published content piece links to:
- Source field note bead (research origin)
- Construction edit bead (drafting)
- Review bead (Adams Reviewer sign-off)
- Publish bead (final checkpoint)

## Files

- `research-miner.md` — Research Miner agent role
- `construction-editor.md` — Construction Editor agent role
- `design-editor.md` — Design Editor agent role
- `social-producer.md` — Social Producer agent role
- `safety-reviewer.md` — Safety Reviewer agent role
- `adams-reviewer.md` — Adams Reviewer agent role
- `publisher.md` — Publisher agent role
