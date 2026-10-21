# Decisions and capability record

Snapshot 2026-10-21. Implementation choices are reversible; production requirements are not silently assumed.

| ID | Decision / rationale | Consequence or revisit trigger |
|---|---|---|
| D01 | Create `/workspace/hmb-hamrah` as a separate project, honoring the new-project request | No existing source or member data modified |
| D02 | Standard Node 24 + Next App Router/React/TypeScript; server-render public content | Portable Node deployment; no Cloudflare-only imports |
| D03 | `node:sqlite` durable single-instance storage rather than an unconfigured external database | Durable disk and single process/host assumption; migrate to PostgreSQL for multi-instance use |
| D04 | Application-first offers; event interest only | No imaginary checkout, dates, seat reservation or commercial terms |
| D05 | Implement isolated member core because no real journal integration was supplied | Operator-created accounts and assignments; later integration needs an explicit migration plan |
| D06 | HMB-only provisional wordmark, paper/ink/lime system, self-hosted Persian type | Owner approval needed for final brand identity |
| D07 | Plain-text lightweight CMS with draft/review/publish/archive, safe public reads | Structured calendars/cohorts, rich media and advanced CMS fields deferred |
| D08 | No email, payment, Telegram, calendar, Instagram feed or LMS integration | Stored requests work independently; provider activation needs actual contracts/configuration |
| D09 | New educational exercises and labelled synthetic demonstrations instead of invented evidence | Team bios, testimonials and teaching photographs withheld until verified/consented |
| D10 | Local source package and preview, no production publication | No hamrah.me deployment/DNS claim; `noindex` until business and operational readiness |

## Contract v1 implementation additions

Agreed between backend and workflow specialists during integration, without changing existing callers:

- Entry PATCH additionally accepts `action:'revise'`: preserve prior snapshot/feedback in history, clear current feedback and return to a new draft for resubmission. Reviewed content cannot be silently overwritten.
- Administrator deletion endpoints: `GET /api/admin/deletion-requests`, `PATCH /api/admin/deletion-requests/[id] {action:'fulfill'|'decline'}`. Only member erasure is supported. Fulfillment deletes entries/sessions, anonymizes and disables the profile, clears request text; separate application records/backups remain an operator retention responsibility.
- Private routes explicitly suppress indexing. Inactive members may authenticate solely for their own export/deletion request; operational access remains denied. Public-browser metrics cannot forge server-only persisted milestones.

Built-in article and program copy is versioned in `src/lib/content.ts`. A published CMS record with the same slug overrides its public title/summary/detail; draft or archived overrides fall back to the built-in copy. Archiving an override therefore does not unpublish the built-in page. Removing a built-in requires a source change; this limitation is intentional for the initial bundled editorial content and should be replaced with fully CMS-owned seed records when staff need full lifecycle control. Article lists already deduplicate by slug and program lists now follow the same override rule.

See [architecture](architecture.md) for final database/state/security behavior and [contracts](contracts.md) for original frozen interfaces.

## Actual capability record

| Work role | Available tool/library | Source / revision | Access and limit |
|---|---|---|---|
| Root architecture/design/integration | `exec_command`, `apply_patch`, native collaboration tools | Exposed runtime; no revision identifier provided | Shared writable project, disjoint paths; no production credentials |
| Backend specialist | Node SQLite, Zod, crypto, Next route handlers | Node 24; package lock contains exact installed versions | Local database/APIs, not external HMB services |
| Public editorial/frontend specialist | Next server components, React, Lucide | Project dependencies | Supplied master brief only; no access to missing prior documents |
| Workflow specialist | React client forms, fetch, shared API contract | Project source | UI and private flows; no message sending |
| Independent QA specialist | Actual installed test/browser capabilities discovered by QA | Reported in verification artifact | Evidence scoped to local preview, not production traffic |
| Root Sites workflow guidance | Sites skill read at task start | `c3/sites`; no pinned revision exposed | Local project interpretation, no Sites publication performed |
| Root environment guidance | Cloud environment runtime skill and environment-status tool | `c7/cloud-environment-runtime`; no pinned revision exposed | Network/context inspection; no secret/provider readiness inferred |

Native subagents were actually used, as the user's master brief explicitly requested: backend, public_pages, workflows and qa. They are bounded work packages, not fifteen fictional agents. No external skill was installed and no official framework/provider reference recheck is claimed unless recorded by the root verification report.
