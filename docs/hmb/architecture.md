# Architecture and operations

## Decision

Next.js App Router on standard Node 24, TypeScript, server-rendered public pages, JSON route handlers and `node:sqlite` persistent single-instance storage. There was no existing HMB repository, identity source or journal in the supplied workspace. No external HMB data was migrated. SQLite avoids provisioning an unconfirmed external provider; use a durable local disk. Do not deploy multiple replicas against separate SQLite files. PostgreSQL is the next migration when concurrent/multi-host deployment becomes necessary; current interfaces keep that change behind `src/lib/db.ts`.

`src/lib/db.ts` owns schema creation (SQLite `user_version=1`), transactions, state transitions, row permissions and audit. `auth.ts` owns scrypt password hashes, opaque sessions and provisioning. `validation.ts` contains request schemas; `api.ts` handles bounded bodies, origin checks and redacted errors. API routes are thin adapters. Root layout and public rendering remain separate from private records.

## Provisioning and configuration

Use `HMB_DATABASE_PATH` (default `./data/hmb.sqlite`), `HMB_ORIGIN` (exact public origin including scheme), and `HMB_SECURE_COOKIES=1` behind production HTTPS. Set initial credentials using environment variables through the operator's secret mechanism, then run `npm run seed`: `HMB_SEED_EMAIL`, `HMB_SEED_PASSWORD` (minimum 12 characters), `HMB_SEED_NAME`, `HMB_SEED_ROLE` (`admin`, `member`, `coach`, `editor`, `reviewer`), optional `HMB_SEED_COACH_ID`. There are no committed accounts, credentials or signup endpoint. Accounts can be assigned/reassigned and suspended by an administrator; new accounts are provisioned by CLI. Supply each person a distinct strong password over a trusted channel. Password reset and MFA are not implemented; production identity integration remains an explicit follow-up.

Sessions last eight hours, use random 256-bit tokens, and store only SHA-256 token hashes. Cookies are HTTP-only, SameSite=Lax, and Secure for HTTPS configuration. Suspension and role changes revoke existing sessions. A suspended member may authenticate only to export their own journal or request deletion; all operational endpoints deny inactive accounts. Those access checks run server-side on every request, including direct object IDs. Authorized administrator/coach journal reads, administrator/reviewer application queue reads, and administrator account/deletion-queue reads append restricted audit records containing actor ID, action, object ID or collection scope, and timestamp only. No journal text, contact information, feedback or application answers are copied into audit records. Member own reads are not redundantly logged; exports have a dedicated audit event. Reassignment immediately withdraws the previous coach's access. Coach scope is assigned active members only; editors cannot read applications or journals; reviewers read assigned applications only.

## Applications

Public submission validates bounded input, contact format, consent and honeypot. Persian/Arabic digits normalize at the boundary. An opaque UUID idempotency key and canonical payload hash prevent duplicate records; retry with changed payload returns conflict. Transactions store applications and audit before a success is shown. Notifications are deliberately not configured, so receipt never claims an email, acceptance, reserved capacity or scheduled call. The durable queue itself is the operating handoff.

Status transitions: submitted → under_review / closed; under_review → information_requested / accepted / waitlisted / declined / closed; information_requested → under_review / closed; waitlisted → under_review / accepted / declined / closed; accepted or declined → closed. Closed records cannot silently reopen. Notes are staff-private. Assignment and status updates are audited. Application records are not silently deleted when a member requests journal deletion: the operator must assess independently collected enquiry records against the actual retention policy.

## Journal

Member records are drafts with optional reflection and execution notes. Submit locks the version. Assigned coach review releases an observation and suggested exercise; member acknowledges with a next action then records follow-up. Version numbers reject stale writes. Every transition preserves its prior snapshot. `revise` returns a non-draft entry to a new draft version, preserving reviewed feedback in history; current feedback is cleared and the new version must be submitted again. No automated AI feedback, profit calculation, clinical inference or trading execution exists.

Export returns the authenticated member's own profile and journal as JSON, including history. Deletion requests enter a persistent admin queue; an admin can fulfill or decline. Fulfillment deletes journal entries and sessions, disables and anonymizes the profile, and removes the request's free text. Non-identifying event audit retains object IDs; backups and separately collected application records require operator retention handling. Do not promise immediate irreversible deletion of backups. Only member accounts support this erasure operation.

## Editorial

Content uses plain-text bodies rendered as text, never untrusted HTML. Draft → in_review → published; published may return to draft or archive; archived may return to draft. Direct draft-to-published changes are rejected. Only published rows appear through public reads. Admin/editor access provides preview from restricted data; public slugs and search cannot expose drafts. Programs, articles and events share this basic editorial model; commercial availability and event scheduling require verified content from the owner before publication.

## Security and measurement

Mutation endpoints require the exact configured `HMB_ORIGIN` (default `http://localhost:3000`, independent of the internal bind host) in `Origin` and JSON content type, except logout which is bodyless but still origin-checked. Streaming body reads stop above 64 KiB. Application and authentication rate limits are persisted, with global and contact/account budgets; they do not depend on untrusted proxy IP headers. Global budgets are a basic preview defense, not a substitute for a production reverse-proxy/WAF policy. Safe metrics accept controlled property values only and aggregate by day without account IDs or personal text. Server-only milestone events are emitted by successful persisted actions, not accepted from browsers. No session replay is installed. Unexpected error logs contain error class only.

No encryption-at-rest or backup scheduler is bundled; protect the persistent volume, restrict OS access and establish encrypted backups. No email provider, payment gateway, Telegram entitlement, external LMS or calendar is enabled. Set the exact origin behind a trusted reverse proxy; do not expose an unconfigured production origin.

## Database recovery and release

Before an upgrade, stop the application (or use SQLite's online backup mechanism), copy the SQLite database plus any live WAL/SHM files as one consistent snapshot, and protect the backup as private data. Prefer a stopped-server backup of the database after checkpointing. Restore to a separate path and point `HMB_DATABASE_PATH` there; verify `/api/health` and a test login before changing traffic. Never commit data files. Backups are operator-managed; recovery has not been tested against a production host. Schema initialization uses idempotent CREATE statements and no destructive migration. Future changes require explicit migrations and a restore plan.

Rollback application code to the prior source/build with its compatible database snapshot. Validate environment values, seed only intentionally required accounts, run tests/build, and verify health under the intended service account. A host/domain/deployment integration was not supplied, so this project does not claim production deployment.
