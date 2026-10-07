# Infinite Architecture — Private Concept Studio v1

Reviewed: 2026-10-06

## Decision

The software is an **internal operating system**, not the product.

Infinite Architecture sells concept development and owner-side coordination for properties such as Airbnbs, glamping retreats, off-grid compounds, land concepts, and real-estate presentations. The private studio turns a plain-language outcome into:

1. a bounded concept brief;
2. a supplier and quote plan;
3. an internal cost model;
4. a client offer;
5. a controlled Blender production job;
6. a presentation package after owner review.

The customer buys the concept and coordination outcome. They do not buy access to this software.

## Single-chat operating model

Owner input example:

> Create a six-dome glamping retreat near Puerto Vallarta with shared amenities, solar, water storage, native planting, and a strong guest arrival sequence.

The studio should then:

- separate known facts from assumptions;
- ask only materially blocking questions;
- propose 2–4 coherent concept directions;
- identify supplier categories;
- create cost lanes without inventing prices;
- create a bounded 3D scene job;
- keep regulated professional scopes visible;
- preserve a decision log for the proposal.

Complex model/provider choices stay under the hood.

## 3D architecture

### Scene of record: Blender

Blender is the preferred owned production layer because it supports scripted scene generation, editable source files, rendering, animation, file conversion, and background execution.

Source:
- https://docs.blender.org/api/main/info_tips_and_tricks.html
- https://docs.blender.org/api/main/info_advanced_blender_as_bpy.html

The repository includes `workers/blender/generate_concept.py` as the first bounded concept generator.

### Optional open-source accelerator: TRELLIS

TRELLIS can generate visual 3D assets from text or images and export meshes/GLB. The official repository states that most code and models are MIT licensed, while some submodules carry separate licenses. Treat it as an optional asset generator, not a structural geometry source.

Source:
- https://github.com/microsoft/TRELLIS

### Optional paid accelerator: Meshy

Meshy offers a REST API and an official Blender integration. Use it only when speed or asset quality justifies the paid dependency. Generated assets are visual inputs to Blender, not architectural certification.

Sources:
- https://docs.meshy.ai/en/api
- https://docs.meshy.ai/en/webapp/plugins/blender/introduction

Provider plans, model names, retention, and credits change. Re-verify before changing the integration.

## Supplier architecture

Supplier records must distinguish:

- candidate;
- contacted;
- quote requested;
- verified quote;
- selected;
- rejected/expired.

No price becomes a client commitment until a written quote records:

- quote date;
- currency;
- model/configuration;
- quantities;
- inclusions;
- exclusions;
- freight/last-mile terms;
- tax/import assumptions;
- install assumptions;
- validity period.

Pacific Domes is registered only as a candidate dome supplier. No catalog price is stored in this repository.

## Internal offer math

A target **30% gross margin** means:

```text
client price = landed cost / (1 - 0.30)
```

A 30% gross margin is therefore about a 42.86% markup on cost. Do not confuse margin with markup.

Landed cost should include, when applicable:

- supplier package;
- freight/import/last mile;
- site and foundation work;
- labor/installation;
- utilities;
- landscape/guest areas;
- professional services;
- permitting/fees;
- contingency;
- financing/tax effects when relevant.

The studio calculator is internal. Contractual compensation must use a clear fixed fee, management percentage, disclosed supplier margin, or another legally reviewed arrangement. Never hide costs or fabricate savings.

## Professional boundary

The studio may coordinate concept design, visualization, supplier selection, quote comparison, procurement planning, landscape/living systems, and progress documentation.

The studio must not imply that a concept render is:

- stamped architecture;
- structural engineering;
- geotechnical approval;
- foundation design;
- MEP design;
- fire/life-safety approval;
- accessibility certification;
- permit approval;
- construction documentation.

Those scopes remain with appropriately qualified local professionals.

## Security boundary

The private dashboard is protected by `DASHBOARD_SECRET` through an HttpOnly cookie.

Studio APIs also require that authenticated cookie.

The Blender API accepts a fixed job schema only. It cannot receive arbitrary Python or shell commands from chat.

Provider keys remain server-side environment variables.

## Current implementation

- `/studio-access` — private dashboard login
- `/dashboard/studio` — owner concept studio
- `/api/studio/plan` — concept brief via Pi Agent with deterministic fallback
- `/api/studio/estimate` — verified internal margin math
- `/api/studio/blender` — bounded job draft/queue
- `workers/blender/generate_concept.py` — background Blender scene generator
- `data/studio-provider-registry.json` — provider roles
- `data/studio-supplier-candidates.json` — supplier verification registry

## Proof target

The first proof is one real concept:

1. real site/listing/plan;
2. six or fewer primary structures;
3. one supplier-backed structure option;
4. one Blender scene;
5. three stills plus one site view;
6. supplier quote ledger;
7. cost model;
8. 30% target-margin client price;
9. owner-approved presentation;
10. explicit list of professional scopes still required.

Do not add more tools until this path works end to end.
