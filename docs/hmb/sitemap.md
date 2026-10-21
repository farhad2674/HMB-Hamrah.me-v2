# Routes and CTA map

All public content is Persian (`lang=fa`, RTL). Latin slugs are stable. Root metadata uses HMB titles and hamrah.me as intended metadata base; preview is `noindex,nofollow`. No DNS or site publication occurred. Public API data exposes published CMS records only.

| Route | Purpose / next action |
|---|---|
| `/` | Eight-scene story; primary `/apply`, secondary `/approach` |
| `/approach` | Six-stage method and boundaries → `/apply?offer=consultation` |
| `/programs` | Compare foundation/practice routes → canonical details |
| `/programs/foundations` | Proposed beginner curriculum → `/apply?offer=foundations` |
| `/programs/practice` | Proposed practice curriculum → `/apply?offer=practice` |
| `/programs/[slug]` | Published CMS program detail; otherwise 404 |
| `/coaching` | Human review process/suitability → `/apply?offer=coaching` |
| `/journal` | Fictional interactive demo → `/login` or coaching application |
| `/events` | Published events or honest empty state → `/apply?offer=events` |
| `/events/[slug]` | Published event text; interest only, no booking; otherwise 404 |
| `/insights` | Three educational exercises plus published CMS articles |
| `/insights/before-the-trade` | Preparation exercise → `/journal` |
| `/insights/useful-trading-journal` | Journal-writing exercise → `/journal` |
| `/insights/review-the-decision` | Process-review exercise → `/journal` |
| `/insights/[slug]` | Published editorial detail; otherwise 404 |
| `/about` | Philosophy and transparent team-profile availability → `/approach`, `/apply` |
| `/services` | Directory → canonical `/programs`, `/coaching`, `/services/consultation` |
| `/services/consultation` | Fit discussion → `/apply?offer=consultation` |
| `/services/coaching` | Redirects to canonical `/coaching` |
| `/contact` | Application and member data-request routes; no invented contact details |
| `/apply` | Three-step conditional application; known public offer in query only |
| `/apply/received` | Receipt after server persistence; opaque reference held in sessionStorage |
| `/login` | Credentials; no public signup or fake authentication |
| `/member` | Own entries, feedback, next action, export/deletion request |
| `/coach` | Assigned-member review queue |
| `/admin` | Restricted applications, assignments, users and deletion requests |
| `/admin/content` | Editorial drafts, preview, review, publish/archive |
| `/privacy` | Actual data handling and unresolved operational policy items |
| `/terms` | Usage and application/acceptance boundaries |
| `/risk-disclosure` | Financial-risk and educational-service boundaries |

`/refund-policy`, `/partners`, `/ecosystem`, payment, calendar and prop-operation routes are intentionally absent because their underlying terms/integrations/relationships are unverified. Unknown dynamic slugs use the project's 404 page.

Navigation: method, education, coaching, events, insights, about; separate member utility and application action. On mobile this becomes a keyboard-operable menu. Application navigation contains only controlled offer identifiers, never answers or contact data. Articles link to a practice demonstration rather than a checkout. Custom CMS programs use the consultation route until they have an agreed controlled offer identifier.
