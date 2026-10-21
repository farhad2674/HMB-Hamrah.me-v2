# Evidence, assumptions and owner inputs

Fact register snapshot: 2026-10-21. “Confirmed” means supported by the supplied source or inspected implementation, not independently verified business operations.

| fact_id | Statement | Source | Status | Owner | Last verified | Allowed public wording |
|---|---|---|---|---|---|---|
| F01 | Brand is HMB; domain is hamrah.me | Master brief §1 | confirmed (owner-reported) | Farhad | 2026-10-21 | HMB; hamrah.me. Domain ownership/deployment not verified. |
| F02 | English expansion supplied as “Hamrah Mamlegar Bazar” | Master brief §1 | confirmed as supplied | Farhad | 2026-10-21 | Keep in internal record; public expansion withheld pending approval. |
| F03 | Education, courses, events, coaching and journal feedback are intended offers | Master brief §1–3 | confirmed intent | HMB | 2026-10-21 | Explain paths and invite application; no unverified availability promise. |
| F04 | Learn/practise/record/review/improve chain | Master brief §2 | proposed | Product owner | 2026-10-21 | Method explanation, not proven outcomes or authoritative brand-book claim. |
| F05 | Earlier brand wording includes «همراه معامله‌گر بازار» | Brief's description of missing syllabus | historical | Farhad | 2026-10-21 | Use HMB until final wording is approved. |
| F06 | No prior code, journal or approved asset set was found in supplied project context | Workspace inspection; new-project request | confirmed scope | Engineering | 2026-10-21 | New isolated implementation; no claim of integration or migration. |
| F07 | Prices, dates, instructors, capacity and contact channels are not supplied | Master brief / attachments | unresolved | HMB | 2026-10-21 | Application-only; details before commitment. |
| F08 | Homepage and journal examples are newly authored synthetic data | Source `page.tsx`, `JournalDemo.tsx` | confirmed | Editorial | 2026-10-21 | «نمونهٔ آموزشی ساختگی»; no testimonial/performance claim. |
| F09 | Article exercises and proposed curricula were authored for this project | `src/lib/content.ts` | proposed editorial content | HMB editorial review | 2026-10-21 | Educational exercise; no research claim or invented expert credentials. |
| F10 | Local durable applications and member review APIs exist | API/database implementation; verification tracked separately | confirmed implementation | Engineering | 2026-10-21 | Describe supported workflow, not a staffed production service. |
| F11 | Earlier “70% psychology / 30% technique” text is not scientific proof | Master brief §1 | historical / not adopted | Editorial | 2026-10-21 | Omitted. |
| F12 | FundedNext-specific restriction is described in brief | Master brief §12, S9/S10 | historical; not rechecked here | Service owner | 2026-10-21 | No public firm/permission claim. |

## Material supplied and missing

Supplied: one master orchestrator text, copied verbatim into `master-brief.txt`. Not supplied/inspected: earlier Persian website copy, syllabus PDF, either Telegram specification, current brand book, approved logo, actual HMB repository or journal, team photographs/bios, Instagram URL, consented testimonials, operational calendar, merchant/provider contracts, legal entity and final policies. The implementation does not claim to have read or integrated those missing sources.

## Publication input packet

1. Approve Persian/English names, logo/wordmark and identity; legal entity and verified contact route.
2. Confirm each offer's instructor, curriculum, deliverables, prerequisites, format, timing, price, support/cancellation terms and capacity owner.
3. Confirm coach staffing, assignments, review capacity, response time and access/retention responsibilities.
4. Supply actual journal/identity/Telegram contracts before any migration or integration; use redacted examples.
5. Approve content, author/reviewer attribution and any real people/media consent.
6. Choose deployment host, durable data volume, backups, TLS/domain settings and production authentication policy.
7. Confirm retention/deletion and complaint procedures; policy pages currently state unresolved items.
8. For any prop-related service, supply exact model and target-firm permission; affected concepts remain internal.

These do not block local development. They do block claiming a complete live commercial service. Do not place production secrets in docs or chat; use environment secret management.
