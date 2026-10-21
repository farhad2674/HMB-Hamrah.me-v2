# HMB verification — 21 October 2026

Independent review by HMB-004, separate from the implementation specialists. Tests used a local Next.js development server on `http://localhost:3000`, system Chromium and synthetic data in `/tmp/hmb-preview.sqlite`. No real applicants, journals or notifications were used. Build verification is recorded separately in the project runbook/state; these browser checks are not production performance measurements.

## Observed outcomes

14 browser checks pass. Independently reran `npm test` successfully and direct `node --experimental-strip-types tests/backend.test.ts`: **11/11 domain/security tests passed**, including restricted-read auditing. Raw browser results: `screenshots/browser-results.json`.

| Check | Evidence / result |
| --- | --- |
| Public pages | 21 representative routes return HTTP 200, a single H1, `lang=fa` and `dir=rtl`. |
| Homepage links | All distinct internal homepage destinations resolve below HTTP 400. |
| Responsive layout | Home, journal demo, application, programs, article and login checked at 360, 390, 768, 1024 and 1440 CSS px; no document overflow. |
| Review screenshots | `screenshots/home-desktop.png`, `screenshots/home-mobile.png`, and mobile opening screenshot. Public synthetic examples only. |
| Navigation/accessibility | Mobile menu opens and navigates; first keyboard focus is skip link; reduced-motion preference respected; process tabs operate and focus tracks selected state. |
| Application | Coaching context retained; back navigation retains draft answers; final mobile form fits; submission returns a persisted reference; same payload/key retry returns the same reference and leaves one database record. |
| Member | Login, journal creation, draft save and submission complete through the UI. Mobile workspace fits. |
| Human feedback | Assigned coach opens submitted entry, writes observation and next exercise; member reads it, records next action, acknowledges and follows up. Stored history contains the review cycle. |
| Privacy boundaries | Visitor cannot read journal API; a second member cannot access the first member’s object ID; member cannot read staff applications. |
| Staff operations | Administrator opens the submitted application, changes status to under review and persists private notes and audit history through the UI. |
| Editorial workflow | Draft absent from public API; review/publish transitions succeed through API; published article resolves publicly. CMS editor UI inspected in source, not independently exercised through all controls. |
| Browser errors | No JavaScript page exceptions observed on the public journey. |
| Reflow | Six representative pages fit at 720 CSS px, equivalent viewport width to a 1440 desktop at 200% browser zoom. This is reflow simulation, not a native browser zoom command. |

## Defects found and repaired

1. Homepage article slugs were inconsistent with detail routes; root repaired before link verification.
2. Mobile hero min-content track expanded to 500 px. Root constrained grid and illustration width.
3. Browser mutations returned 403 due development origin mismatch. Canonical localhost origin fallback fixed; application and login journeys then passed.
4. Decorative trust orbit caused remaining mobile document overflow. Its mobile container now clips decorative overflow; all 30 responsive combinations passed on focused recheck.
5. Arrow navigation changed selected process tab without moving focus. Keyboard focus now follows selected tab.
6. Several small editorial labels had contrast below 4.5:1. Root darkened them. Main body muted text measured 4.76:1; revised labels use `#59674e` and inactive tabs `#58664d` against light surfaces. This was a targeted token review, not complete automated contrast certification.
7. Public wording promised recorded sensitive administrative access while only writes were audited. Backend added read auditing; regression tests cover it.
8. Application validation originally dropped server field errors. Workflow owner added inline field handling and focus behavior.

## Limits and release conditions

- Native browser 200% zoom, screen-reader speech/order, full WCAG 2.2 AA audit, real touch devices and cross-browser engines were not tested. A diagnostic CSS `zoom:2` at 1440 yielded 51 px overflow; CSS zoom does not trigger the native browser’s smaller CSS viewport/media queries. The corresponding 720 px reflow passed.
- No lab performance score or field Core Web Vitals claim. Dev-server timings are not representative. Measure production build under defined network/CPU conditions, then real p75 traffic after launch.
- Browser CMS validation used APIs for state transitions; independent browser UI tests focus on the higher-risk application/member/coach/admin journeys.
- No actual HMB hosting, DNS, existing journal integration, delivery capacity, team credentials, commercial terms, payments, email, Telegram or calendar integration was verified.
- Screenshots may show the local Next development indicator; it is absent from production output.

## Reproduce

Use Node 24+, install project dependencies, start a **disposable local test server** with `HMB_DATABASE_PATH=/tmp/hmb-preview.sqlite` and `HMB_ORIGIN=http://localhost:3000`, then run:

```sh
node --experimental-strip-types tests/browser.mjs
```

The harness creates uniquely named synthetic test accounts with random passwords held in process memory; it does not print credentials. Never point it at a production database or server. Default browser environment uses the available system Chromium and runtime Playwright; to run elsewhere, install optional Playwright (`npm install --no-save playwright`) and set `HMB_CHROMIUM_PATH` to the local Chromium executable. `HMB_PLAYWRIGHT_MODULE` can explicitly select a module path; `HMB_TEST_BASE` changes the server origin. `HMB_DATABASE_PATH` must match the server’s disposable database.

A focused CSS-only recheck updated the responsive/keyboard/screenshots results after the full journey run. Unchanged journey pass results were retained rather than rerunning unrelated flows.

## Root release checks after independent review

- Final `npm run build` completed on Node24 with Next16.4.2, including TypeScript and page generation. Standard Node `npm start` ran successfully on port3001 with an isolated database.
- Production smoke verified health, server-rendered homepage,390px document fit, persisted application receipt, and visitor denial for the staff queue. Raw evidence: `screenshots/production-smoke.json`. No real data was used.
- Production screenshots: `production-home-desktop.png`, `production-home-mobile.png`, `production-home-preview.png`.
- One unthrottled localhost navigation observed DOMContentLoaded58ms and load281ms. These are local navigation observations only, not LCP/INP/CLS or device/field benchmarks.
- Backup helper created a consistent snapshot with `VACUUM INTO`; `PRAGMA integrity_check` returned `ok`. Restoring to an isolated file preserved table counts for users, applications, entries and content. Live-host recovery remains untested.
- New project archive excludes dependencies, build caches, databases, environment secrets and test-account data. Operator setup and remaining launch inputs are documented in README/operations.
