# Operations and release runbook

## Runtime

Node 24+, one Next.js process, local persistent SQLite. No existing HMB deployment was supplied or modified. A standard Linux Node target is supported; Cloudflare edge-only dependencies were deliberately avoided. SQLite is an explicit single-instance choice for this reviewable project. Before multiple instances or larger operations, migrate transactional models to PostgreSQL with a reviewed data migration and new concurrency tests.

Use a non-root service account; filesystem umask 077. Place the database outside versioned release folders. Set `HMB_DATABASE_PATH` to its absolute path, `HMB_ORIGIN` to the exact browser origin, and `HMB_SECURE_COOKIES=1` for HTTPS. `HMB_ORIGIN` has no trailing slash. Origin mismatch intentionally rejects mutations. Do not expose `.env` files, SQLite/WAL files or backup directories as static assets.

Install with `npm ci`, build with `npm run build`, serve with `npm start`. A process manager should restart the process on failure. Put a TLS reverse proxy in front of port 3000; limit body size to 64 KiB for JSON endpoints, configure request timeouts and per-client rate limits, and forward host/protocol correctly. Do not cache authenticated `/api/*` responses. APIs explicitly return `Cache-Control: no-store`.

This release uses the standard `next start` Node server with the full project and production dependencies. Build output stays in `.next`; copy that output together with `public`, the dependency installation and the same source/lockfile to a versioned release. Keep the database in its separate persistent path.

## Health, migrations, data and recovery

`GET /api/health` checks the database and returns a minimal status. Monitor non-2xx responses, database disk space and backup age. Error logging emits error names only, not contact details or journal bodies. Initial schema is installed idempotently with `PRAGMA user_version=1`; there are no destructive upgrade migrations in this release. Future schema changes require numbered migrations and a restore test.

Create a consistent SQLite snapshot while running:

```bash
HMB_DATABASE_PATH=/srv/hmb/data/hmb.sqlite node --experimental-strip-types scripts/backup.ts /srv/hmb/backups/hmb-2026-10-21.sqlite
```

The script uses SQLite `VACUUM INTO`, refuses overwriting an existing backup and runs `PRAGMA integrity_check`. Schedule backups according to an owner-approved retention policy, encrypt restricted off-host copies, and restrict access. Retention periods are unresolved, not invented here.

Restore procedure: stop the application, preserve the failing database for diagnosis with restricted access, move the database and its `-wal`/`-shm` companions out of the active path, restore the verified snapshot to the configured database path, restore ownership/mode, restart, check health, and verify one test account workflow. Never copy only the live main SQLite file while ignoring pending WAL contents.

Rollback: retain the previous built source/lockfile. Stop service, point it back to the previous release, and use the backup if schema compatibility requires it. Restoring an old backup loses writes after the snapshot; review and reconcile that gap before resuming submissions. No automated production rollback or DNS change has been attempted.

## Accounts, applications and coaching

Provision accounts using the documented seed CLI with secrets supplied through local environment variables. There are no default accounts. Assign member→coach and application→reviewer relationships under `/admin`. Role changes and deactivation revoke sessions. No public registration, MFA or password recovery is implemented; use operator-controlled recovery until a verified identity provider is selected. Do not share accounts.

Applications: submitted → under_review → information_requested / accepted / waitlisted / declined → closed, with permitted return-to-review states. A submitted application is not a seat reservation. Reviewers see assigned applications; editors do not. Staff notes stay operational. No notifications are sent by this preview, so staff must not infer delivery from a stored record. Live contact procedures need an identified operating owner and a verified channel.

Members create, save and submit their own entries. Assigned coaches see their active members' entries and add feedback. Acknowledgement and follow-up belong to the member. Revisions preserve prior versions. No automated financial advice or AI coach is implemented. Admin access exists for support; broader journal-access auditing and MFA are recommended before handling live member data at scale.

Members can export their own data and request deletion. Admins can fulfil deletion requests (journal deletion, session revocation, profile anonymization) or decline after review. Audit identifiers remain for operational integrity; historic application records are a separate data set. Backup erasure and application-retention handling need an owner-approved policy before live operation. Suspension and service entitlement are represented by one `active` flag in this core; real commercial entitlements require a verified source of authority.

## Editorial operations

`/admin/content` supports plain-text articles, programs and events: draft → in_review → published → archived. A draft is previewed only inside authenticated staff UI. Public pages query published content per request. Untrusted HTML is rendered as text, not executed. Proposed built-in program outlines and three educational exercises are in `src/lib/content.ts`; staff-created content uses SQLite. Built-in editorial content is versioned in code and should be migrated to an approved CMS entry before owner editing becomes the sole source of truth.

No dated event is invented. CMS event records in this core are plain-text descriptions; structured scheduling, capacities, booking and timezone conversion are deferred until real events are provided. Payment, Telegram, email, calendar, LMS and Instagram adapters remain unconfigured; their delivery should be scoped when actual providers and permissions are supplied.

## Publication inputs

Need approved brand assets/name, legal operator and contact, confirmed programs/syllabus/fees/terms, coach and reviewer capacity, verified people/photos, event schedules, privacy retention/deletion ownership, actual existing journal/API if any, and target host/domain authority. Keep third-party prop-challenge operation internal pending exact permitted service model and current firm-specific terms. No fake payment or challenge passing is exposed publicly.

After these facts are reconciled, update policy copy, metadata/canonical origin, remove preview noindex in layout and robots, add a sitemap of approved canonical pages, choose a notification provider and verify its sandbox, and rerun consequential acceptance checks. The source package is complete for local review; these are live-operation dependencies rather than failed local workflows.
