# Task ledger

Final acceptance 2026-10-21. Root integrated specialist work and checked independent browser evidence, final build and runtime smoke.

| Task | Owner / bounded paths | State | Observable output / evidence |
|---|---|---|---|
| Foundation | Root; manifests, global routing/layout/tokens | accepted | New project and frozen contracts; isolated from other workspace files |
| HMB-001 backend | backend; `src/lib/{db,auth,api,validation}.ts`, `src/app/api`, seed/tests | accepted | Durable applications, sessions, journal/review, CMS, assignments/deletion; 11 behavioral tests independently passed |
| HMB-002 public | public_pages; assigned public route directories, content and journal demo | accepted | Full public routes and Persian content; integrated TypeScript check passed in specialist run |
| HMB-003 workflows | workflows; application/login/member/coach/admin UI | accepted | Persisted receipt flow and private role workflows; specialist TypeScript check passed |
| Homepage/design | Root; homepage, shared shell, CSS, HomeExperience | accepted | Eight connected scenes and responsive application UI; independent responsive/keyboard/visual checks passed |
| HMB-004 verification | qa; assigned test/evidence paths | accepted | Consequential integrated journeys, authorization and browser checks; 14 browser checks passed; consult verification report |
| HMB-005 documentation | public_pages; brief/offers/evidence/sitemap/design/decisions/state/ledger | accepted | Compact source-backed product and decision package; no production assertions |
| Release package | Root; README and operating/deployment handoff | accepted | Source archive/run instructions; final build, production runtime smoke and backup/restore passed; limitations documented |

External integrations and production publication are deferred with explicit prerequisites in `evidence.md`, not silently marked complete. No payments, messages, real accounts, live member migrations or DNS changes are part of completed work.
