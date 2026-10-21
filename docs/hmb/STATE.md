# HMB final state — 2026-10-21

- Delivered: new local project at `/workspace/hmb-hamrah`, with source archive `/workspace/hmb-hamrah.zip`.
- Implemented and accepted: Persian RTL public site; application and staff review; member/assigned-coach review cycle; lightweight editorial CMS; aggregate metrics; member export/deletion queue.
- Evidence: final production build and TypeScript pass; 11 domain/security tests independently pass; 14 browser checks across full journeys and focused fixes pass. Thirty responsive page/width combinations plus six 720px reflow checks pass. See `verification.md` and raw JSON/screenshots.
- Final runtime smoke: standard `npm start` on port 3001, isolated SQLite; health, SSR homepage,390px fit, stored application and visitor access denial passed. Screenshot artifacts have production output without dev UI.
- Recovery: consistent VACUUM INTO snapshot and integrity check passed; restored copy matched users/applications/entries/content record counts. No production host restore was attempted.
- All specialist tasks accepted. No production publication, real account migration, notifications, payments or DNS changes.
- Canonical requirements: `master-brief.txt`, `contracts.md`; decisions and limitations in `decisions.md` / `operations.md`. Original English expansion preserved only in internal fact records.
- Owner inputs before launch: brand/legal/contact identity, approved people/assets, actual syllabus/commercial terms/capacity, retention/deletion rules, existing identity/journal interfaces and host/domain authorization. See `evidence.md`.
- Limits: one Node/SQLite instance on persistent storage; no MFA/self-service password recovery; no external services/LMS/calendar/payments; no full accessibility certification, native-zoom/screen-reader audit or field performance evidence.
- Next steps: install from lockfile, run locally, provision explicit accounts, review supplied documentation, replace proposed business content with approved facts, then prepare a separately configured production release.
