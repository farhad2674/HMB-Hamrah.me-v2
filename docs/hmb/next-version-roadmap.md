# Hamrah.me next-version roadmap

## Academy and dashboard · 8 November 2026

The public catalog and individual course pages now share an editable SQLite curriculum with the member library and lesson reader. The local seed provides three example courses. The dashboard includes a desktop rail, mobile navigation, the next lesson, completed lessons, recent activity and access to the existing journal and security area. The public dashboard preview uses fictional activity. Real accounts start with their own records.

The first learning release covers reading, exercises, enrollment, completion and resume. Paid grants, private video playback and HMBbot are later stages. The table below records the earlier sequencing decisions. For the current task assignments, schema, setup commands and next release gates, see the [academy database roadmap](academy-database-roadmap.md).

## Current public redesign execution

The user requested a visibly new website based on the two supplied design and integration documents. The design document supplies structure and interaction targets. Hamrah supplies Persian content, brand identity, imagery and real destinations. The user's clarification keeps HMBbot in the planning stage.

| Task | Assigned agent | Deliverable and acceptance | Status |
| --- | --- | --- | --- |
| V-01 · Shared design system and public templates | Coordinator | Semantic theme tokens, bounded 1280px content, real artwork intros, readable typography and rounded panels across learning, coaching, journal and editorial pages | Accepted locally |
| V-02 · Homepage | version_home | New hero, real learning paths, interactive journal chapter, human coaching, editorial collection, FAQ and final action. Distinct first screen, functional destinations, restrained scroll motion and static fallback | Accepted locally |
| V-03 · Public shell | version_shell | Bounded two-level desktop header, compact scrolling navigation, accessible RTL drawer and branded footer with selected marble artwork | Accepted locally |
| V-04 · Render and interaction review | version_qa | Compare pages at nine widths, exercise keyboard drawer, anchors, journal, reduced motion, no-script reading and account boundaries. Return defects for fixes and retest | Accepted locally |
| V-05 · Integration acceptance | Coordinator | Existing tests, production build, review screenshots and updated acceptance evidence | Accepted locally |

The coordinator uses UI Consistency design and verification skills. The named orchestrator engineering skill was unavailable in the installed skill catalog. Calibration caught a deliberately changed H1 role in an isolated source specimen. Rendering, motion, typography and interaction checks rely on the subsequent real-browser review.

### Public redesign acceptance · 5 November 2026

The coordinated redesign is implemented locally. It replaces the prior homepage sequence with an editorial hero, actual path cards, an interactive journal chapter, a single coaching feature, articles, FAQ and application CTA. The new public shell supplies bounded two-row navigation, a compact scroll header and an RTL modal drawer. Shared page intros, cards and typography carry the visual system into the public learning, coaching, journal and editorial pages. The existing green, ivory and lime identity and selected marble-book footer artwork supply the visual direction. The desktop hero uses larger type than the reference defaults as a brand treatment.

The independent reviewer inspected 12 public pages and two private route boundaries. The five principal pages were measured at nine widths from 360 to 1920px. All reported defects were fixed and retested, including decorative overflow, shrunken course artwork, light text on light syllabus tiles, an oversized sticky course summary and malformed Persian text inside reused article images. Article covers now use the existing HTML cover component. The course summary follows normal document flow so its actions remain reachable.

Journal tabs and keyboard navigation, FAQ expansion, drawer dismissal/focus return, real route destinations and homepage anchors passed. No-JavaScript headings remain visible. A native scroll timeline draws the journal rule from zero to full length as the section passes. Reduced motion removes the animation, sculpture movement and parallax. Text enlarged to 200% reflows at 720px on the five principal pages. All 16 automated tests and the final public production build passed.

Production smoke on an isolated server also passed at 390px and 1440px for the homepage and course detail, including the actual production CSS ordering, journal interaction and corrected sidebar colors/position.

Physical Android/iOS, Telegram WebView, LTR rendering and an exhaustive contrast/theme audit remain unverified. The reflow check enlarged text and resized Chrome, rather than operating the native browser zoom control. Authenticated member/coach ownership behavior is covered by the regression suite and prior isolated browser checks. This review verified unauthenticated redirects and denial responses. Across both reviewers, estimated review cost was 15 page comparisons, 25 source-file reads and 15 source searches, with overlap between the page sets. Source calibration tested heading roles only.

## Delivery order

The first increment refreshes the public reading and navigation experience in this workspace. The following increments bring a returning learner from their journal into a private learning area. The integration reference describes two repositories. Confirm the deployed website and bot revisions before deploying either system.

| Task | Owner | Dependencies and deliverable | Acceptance gate |
| --- | --- | --- | --- |
| UI-01 · Homepage | Homepage agent | Reuse Persian copy, sculptural artwork and the existing reveal system. Build a distinct chapter between the hero and the learning paths. | Hero anchor reaches the chapter. Links open real destinations. Mobile and reduced-motion layouts read in order. |
| UI-02 · Public shell | Navigation agent | Reuse current destinations and account entry. Implement compact scroll navigation and a mobile drawer. | Keyboard users can open, navigate and dismiss the drawer, then resume at its trigger. Compact navigation leaves reading space. |
| QA-01 · Integration review | Independent reviewer and coordinator | Review UI-01 and UI-02 together, run tests, type checking and public build. | Record responsive, keyboard and motion results against the delivered version. Return defects to their implementer before acceptance. |
| M-01 · Member overview and security | Website team | Confirm deployment and account provisioning. Add a right-hand RTL member rail, mobile navigation, overview and owned session revocation. Keep the existing journal reachable at /member. | Member and coach complete the existing feedback cycle. Revoking a session prevents further use. Empty states reflect real account data. |
| A-01 · Identity bridge | Website and bot teams | Agree on one canonical member ID and authenticated server adapter. Bind short-lived Telegram challenges to an authenticated website session and require confirmation on both sides. | Replay, expiry, duplicate Telegram identities and cross-session confirmation are rejected. Journal works during a bot outage. |
| A-02 · Access scopes | Bot team | Inventory grant readers and writers. Expand schema, backfill historic grants as VIP, then switch renewal, channel and access checks to explicit scopes. | A course grant cannot open VIP or another course. Refunding one grant preserves independently valid access. |
| L-01 · Library and player | Learning team | After A-01/A-02, confirm real media, caption availability and distribution rights. Build owned library, syllabus, short-lived playback, resume and links to journal exercises. Start with explicitly provisioned access. | Revocation blocks renewal. Rewind survives a second device. Account switching clears private state. Test Android, iOS and Telegram WebView with real media. |
| C-01 · Billing and support | Commerce and support teams | Confirm catalog, prices, provider setup and who handles tickets. Reuse bot orders, receipts and support through the server adapter. | Duplicate and reordered events grant once. Redirects cannot create access. Members see only their own receipts and tickets. |

## Release and rollback

Review each row as a separate change. Public presentation work can ship independently after preview approval. For the member rollout, enable new routes first for provisioned accounts and retain the existing journal entry point. Keep checkout in application mode until the commerce gate passes. For database changes, expand and backfill before switching readers. Rehearse reverting readers while preserving new records, receipts and journal history.

## Decisions before private rollout

Confirm which branches serve production, who provisions accounts, which products grant VIP, course or review access, and where private lesson media lives. The product owner supplies real catalog and commercial terms. The operations owner confirms account recovery, support, privacy requests and deployment rollback.

## Local acceptance record · 5 November 2026

UI-01 and UI-02 are implemented in the workspace. The coordinator ran the existing test suite (15 passed), TypeScript checks and the public production build (35 static pages generated). Independent Chrome testing covered 11 viewport widths from 360 to 1920 pixels, with zero page-level horizontal overflow. The homepage has one H1, and all ten H2 headings remained visible with scripting disabled. Homepage anchors resolved. Keyboard dismissal restored focus to the drawer trigger. The reviewer identified drawer naming and resize issues, and confirmed the fixes, including scroll restoration when switching to a desktop width.

At 1280 × 800 the reviewer inspected the rendered strengths chapter and confirmed readable text and unobstructed links. The rail advanced from 5% to 40% to 64% across three scroll positions. Enabling reduced motion while the page was open removed the animated fill and released the sticky introduction.

This is local preview evidence. Physical iOS, Android, Telegram WebView and production deployment checks remain open. M-01 through C-01 are planned work; the owner column identifies the team needed for each handoff.
