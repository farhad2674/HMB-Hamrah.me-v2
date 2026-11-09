# Hamrah v3.1.0 — Academy release

Released: 9 November 2026

This directory records the v3.1.0 release independently from earlier tagged versions. The runnable application remains at the repository root so deployment and dependency paths stay stable.

## Highlights

- Shared SQLite Academy curriculum for the homepage, public catalog, course pages and member library.
- Public lesson previews and sample-course enrollment.
- Private member overview, learning library, lesson reader, completion tracking and resume flow.
- Owned-session listing and revocation controls.
- Schema version 3 migrations, idempotent Academy seeding, export coverage and deletion cleanup.
- Responsive Academy artwork, catalog, course detail, dashboard and member navigation.

## Setup

```powershell
npm ci
$env:HMB_DATABASE_PATH = Join-Path $PWD 'data/hmb.sqlite'
npm run seed:academy
npm run dev
```

Use the same persistent `HMB_DATABASE_PATH` for the application and seed command. Review [`docs/hmb/academy-database-roadmap.md`](../../docs/hmb/academy-database-roadmap.md) before configuring real curriculum or deploying an existing database.

## Verification gate

- TypeScript validation
- 20 automated tests covering the existing application, Academy access, progress and session ownership
- Next.js production build
- Responsive public and member-flow review documented in the Academy roadmap

## Compatibility and deferred work

This release preserves the existing application, journal, editorial and administrative flows. Paid grants, private video delivery, account recovery, MFA and HMBbot integration remain future work and must not be inferred from the Academy preview.
