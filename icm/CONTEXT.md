# Infinite Architecture ICM Router

Load only the workflow needed for the current task. Canonical business rules live in `_config/`;
workflow files reference them and do not duplicate them.

| Task                            | Load                                                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Demand research or campaign     | `_config/brand.md`, `_config/icp.md`, `_config/offers.md`, `workflows/01_demand/CONTEXT.md`                          |
| New inquiry or fit review       | `_config/icp.md`, `_config/safety.md`, `workflows/02_qualification/CONTEXT.md`                                       |
| Paid Opportunity Scan           | `_config/offers.md`, `_config/sourcing-standard.md`, `_config/safety.md`, `workflows/03_opportunity_scan/CONTEXT.md` |
| Concept development             | `_config/brand.md`, `_config/design.md`, `_config/safety.md`, `workflows/04_concept/CONTEXT.md`                      |
| Supplier or RFQ research        | `_config/sourcing-standard.md`, `_config/safety.md`, `workflows/05_sourcing/CONTEXT.md`                              |
| Project handoff or coordination | `_config/safety.md`, `workflows/06_delivery/CONTEXT.md`                                                              |
| Case study or evidence          | `_config/brand.md`, `_config/safety.md`, `workflows/07_proof/CONTEXT.md`                                             |

Authority boundaries:

- Next.js: public experience.
- Supabase: inquiry and project records.
- Git/MDX: approved public knowledge.
- ICM: agent routing and operating contracts.

Client working files never enter this public repository. Human approval is required before supplier
outreach, proposals, purchases, regulated conclusions, or public publishing.
