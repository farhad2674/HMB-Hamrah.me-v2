# HMB — Hamrah website

A new Persian-first, RTL website and operational application, built from the supplied HMB master brief. This is a runnable **local project**, not a deployment to hamrah.me.

## Start

Requires **Node.js 24+** and npm. From this folder:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. Public pages and applications work immediately. SQLite is created at `data/hmb.sqlite`; keep that directory on persistent storage. Application records remain after restarting the server. There are no default passwords or preloaded member accounts.

For a production build:

```bash
npm run typecheck
npm test
npm run build
npm start
```

The project uses Next.js 16, React 19, TypeScript, Node's built-in SQLite, Zod, Lucide icons, and self-hosted Vazirmatn fonts. The lockfile pins resolved versions. On restricted development sandboxes, the Next build requires permission to launch its compiler child processes; direct TypeScript checks may succeed when the sandboxed Next wrapper cannot parse child-process output.

## Included

- Eight-scene homepage with an interactive learning/practice/review example, path selector and FAQ.
- Approach, programs and details, coaching, interactive journal sample, events, educational articles, about, services, contact and policy pages.
- Three-step application, server validation, durable receipt, duplicate prevention, staff queue, assignments, private notes and status history.
- Member login, private journal drafts/submission, assigned-coach feedback, acknowledgements, follow-up and preserved revision history.
- Admin user/coach assignments and deletion requests; member data export.
- Editorial draft, review, publication, archive and private preview for articles, programs and events.
- Aggregate first-party measurement with controlled property values; no journal or application text enters analytics.

## Create accounts

Accounts are provisioned by the operator, not through public sign-up. Set these environment variables securely, then run `npm run seed`:

| Variable | Value |
|---|---|
| `HMB_SEED_EMAIL` | Account email |
| `HMB_SEED_PASSWORD` | Unique password, 12+ characters |
| `HMB_SEED_NAME` | Display name |
| `HMB_SEED_ROLE` | `admin`, `member`, `coach`, `editor`, or `reviewer` |
| `HMB_SEED_COACH_ID` | Optional existing coach UUID for a member |
| `HMB_DATABASE_PATH` | Same database as the running server |

Seed does not load `.env.local` automatically. Export variables in the shell or use Node's `--env-file` support with an untracked secure file. Never commit credentials. No email, SMS, Telegram or payment messages are sent.

Open `/login` after creating an account. Administrators can assign a coach to a member under `/admin`. Members use `/member`; coaches use `/coach`; editors use `/admin/content`.

## Review a complete journey

1. Open `/programs/foundations`, choose the application action and submit test information.
2. Receipt appears only after the database confirms persistence. The reference is held in session storage without form answers in the URL.
3. Sign in as an admin at `/login`; open `/admin`, assign the application and move it to review.
4. Provision a member and coach, then assign the coach through the admin user panel.
5. As the member, create a journal draft and submit it. As the assigned coach, add an observation and exercise.
6. As the member, acknowledge feedback, record the next action and mark the follow-up. Create a revision to correct the entry without erasing its reviewed history.

## Verification and handoff

`npm test` runs authorization, idempotency, editorial isolation, workflow, session, input and deletion tests against isolated databases. Browser evidence and reproduction instructions are in [verification](docs/hmb/verification.md). Business facts, proposed offers, route map, design system and unresolved inputs are under `docs/hmb/`.

Read [operations](docs/hmb/operations.md) before deploying. The preview is intentionally `noindex`, and robots disallows crawling. Actual commercial terms, staff profiles, fulfilment capacity, contact channels and privacy ownership require owner-supplied information before public launch. Programs are proposed application-only paths; no payments, booked appointments or guaranteed outcomes are represented.

Production limitations: single-instance SQLite; no MFA/self-service password recovery; operator-provisioned identity; no existing HMB/Telegram journal migration or provider integration; coarse local rate limits should be supplemented at the trusted reverse proxy. This source is prepared for review and further integration, not a claim that business operations are live.

Font license: Vazirmatn, SIL Open Font License, distributed by `@fontsource/vazirmatn`; see `node_modules/@fontsource/vazirmatn/LICENSE`. Visual learning artifacts are original CSS/SVG compositions, not real testimonials or member records.
