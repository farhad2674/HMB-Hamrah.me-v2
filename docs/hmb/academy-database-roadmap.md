# HMB Academy · database and rollout

## What runs locally

The homepage, course catalog, course detail pages and both dashboard views read the same published curriculum. The public preview at `/dashboard-preview` combines this curriculum with a fictional student's progress. The signed-in dashboard at `/member/overview` reads the current member's enrollments, completed lessons and journal activity.

SQLite shares the existing HMB member IDs and works on the project's single Node 24+ server. Point every application and seed process at the same file on persistent storage. For multiple application servers, migrate these tables and the existing account data together to PostgreSQL before distributing writes.

## Configure and seed

From the project root in PowerShell, choose your own database location and the exact address you will open. The parent directory is created on first use. The following commands reproduce the local preview setup.

```powershell
$env:HMB_DATABASE_PATH = Join-Path $PWD 'data/hmb.sqlite'
$env:HMB_ORIGIN = 'http://127.0.0.1:3418'
$env:HMB_SECURE_COOKIES = '0'
npm.cmd run seed:academy
npm.cmd run dev -- --hostname 127.0.0.1 --port 3418
```

Set these variables in the service configuration for a persistent installation. The CLI reads the shell environment. Next also reads `.env.local`. For HTTPS, configure the public HTTPS origin and set `HMB_SECURE_COOKIES=1`. Keep the database outside the public directory and version control. Before upgrading an existing database, use the snapshot and restore procedure in [the operations runbook](operations.md).

The first connection migrates an existing database through schema version 3. The explicit seed command adds three Persian sample courses with two modules and four lessons each. Each course has one public reading preview. Running the command again preserves existing courses, operator edits and member progress. The content seed creates zero users.

For a private learning account, run the existing provisioning command once with your own values. The password prompt keeps your password out of shell history.

```powershell
$env:HMB_SEED_ROLE = 'member'
$env:HMB_SEED_NAME = Read-Host 'Member display name'
$env:HMB_SEED_EMAIL = Read-Host 'Member email'
$credential = Get-Credential -UserName $env:HMB_SEED_EMAIL -Message 'Choose a password of 12 or more characters'
$env:HMB_SEED_PASSWORD = $credential.GetNetworkCredential().Password
try { npm.cmd run seed } finally { Remove-Item Env:HMB_SEED_PASSWORD }
```

Open a sample course, sign in, add the course to your library, open a lesson and mark it complete. The next incomplete lesson becomes the resume destination. The dashboard and library retain progress after signing out and back in.

## Data model

| Table | Identity | Used for |
| --- | --- | --- |
| `users` | Existing member ID | Authentication, role and account status |
| `academy_courses` | Course slug | Title, summary, description, category, level, cover path, outcomes, prerequisite, display order, publication and sample status |
| `academy_modules` | Course and module slugs | Ordered chapters in a course |
| `academy_lessons` | Course and lesson slugs | Ordered reading or exercise, minutes, preview flag, body and practice prompt |
| `academy_enrollments` | Member ID and course slug | Access, enrollment timestamp and revocation |
| `academy_completions` | Member ID, course slug and lesson slug | First completion timestamp, dashboard totals, activity and resume |

Both the enrollment and lesson must exist for a completion. Repeat requests preserve the first completion. Lesson access requires a published course, an active learner account and an active enrollment in that course. Public syllabus queries return titles and durations. The public reader only serves lessons flagged as previews. The personal data export includes enrollments and completions, and fulfilling a deletion request erases both.

## How to configure the curriculum

For a new installation, edit the three examples in [the seed catalog](../../src/lib/academy-seed.ts) before seeding. For existing records, edit the SQLite rows with a database editor or a reviewed migration. The plain-text program editor in the existing CMS manages a separate type of page. Choose distinct slugs across the CMS, legacy paths and academy courses. Use stable slugs once people have enrolled.

| Setting | Effect |
| --- | --- |
| `published = 1` | Course appears in the catalog. The homepage features up to three published courses in display order. |
| `is_sample = 1` | An active member can add the published course to their own library. Set to 0 for operator-provisioned access. |
| `is_preview = 1` | That lesson's entire body and practice prompt become publicly readable. |
| `active = 0` on an enrollment | Blocks the owned reader and completion writes. A member cannot reactivate a revoked grant from the catalog. |
| `position` | Controls display order within a course or module. |

Use local cover images under `public/images/`, store their public paths beginning with `/images/`, and store outcomes as a JSON array of strings. Review lesson copy and preview flags before publishing. Enrollment history relies on these stable course and lesson identifiers.

## Delivery and next stages

| Stage | Owner | Result or next acceptance gate |
| --- | --- | --- |
| 1. Curriculum and storage | Academy data agent | Migration, seed, course queries, owned enrollment and completion endpoints, export and deletion coverage |
| 2. Course discovery | Public academy agent and coordinator | Searchable catalog, course details, expandable curriculum and public lesson previews, linked from the homepage |
| 3. Member experience | Dashboard agent | Desktop navigation rail, mobile navigation, next lesson, personal library, lesson reader, progress, activity and existing journal/security links |
| 4. Integration review | Independent reviewer and coordinator | Check responsive layouts, account boundaries, repeat actions and the full course journey against the seeded database |
| 5. Configure for your site | Site owner | Set the persistent database and origin, provision accounts, review content, flag public previews, rehearse restore and test a learner account |
| 6. Media and paid access | Future learning and commerce work | Add owned media assets and time-limited playback after content rights are known. Define paid grants and verify them before enabling checkout. HMBbot remains a future integration. |

## Local acceptance · 9 November 2026

The production build and TypeScript check passed, along with all 20 automated tests. The database review confirmed that simultaneous seeds against a version 2 database produced one curriculum, retained the existing session and passed SQLite's integrity check.

An independent Chrome review covered five public course and dashboard views from 360 to 1440 pixels. It exercised search, empty results, keyboard syllabus expansion, mobile navigation and reduced motion. The two legacy learning paths now have labeled mobile comparison cards. The dashboard also passed a 320-pixel layout check and a mobile 200% text check.

On a separate database, a production-browser test signed in from a course, enrolled, completed the first lesson, reloaded the page and resumed at the second lesson. The private library showed one course and the dashboard showed one completed lesson. After sign-out, a second account had zero courses and zero completions. Its attempt to complete a lesson from the first account's course was rejected. The main preview database contains the curriculum. Test credentials were confined to the separate test database.

The local preview serves the production build at `http://127.0.0.1:3418`. The homepage, dashboard preview, catalog and individual course each returned HTTP 200 with seeded content. Physical mobile devices, live hosting, RoyalMind's authenticated pages, payment and video delivery were outside this verification.
