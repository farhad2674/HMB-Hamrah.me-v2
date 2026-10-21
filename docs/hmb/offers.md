# Offer and operating register

Snapshot 2026-10-21. Owner for commercial confirmation: Farhad / HMB. Fulfilment people, capacity and schedule are unresolved for all offers. No price, seat count or guaranteed response time is fabricated. An application persists an enquiry; it neither purchases nor reserves anything.

| ID / public status | Audience/problem | V stages | Proposed deliverables and format | Prerequisites | CTA / canonical destination |
|---|---|---|---|---|---|
| `foundations` / application_only | Starting learner needs sequence | V1–V4 | Concepts, risk/invalidation plan and demo practice; format confirmed after enquiry | Willingness to study and record practice | `/programs/foundations` → `/apply?offer=foundations` |
| `practice` / application_only | Active trader needs execution/review routine | V2–V6 | Preparation checklist, journal and review exercise; format unconfirmed | Familiarity with fundamentals; practice examples | `/programs/practice` → `/apply?offer=practice` |
| `coaching` / application_only | Trader wants focused human feedback | V1,V4–V6 | Assigned-coach observation and exercise, scope/cadence agreed before acceptance | Willingness to provide decision context | `/coaching` → `/apply?offer=coaching` |
| `consultation` / application_only | Visitor unsure of next learning step | V1 | Suitability/topic discussion; session/time not booked by form | Brief account of need | `/services/consultation` → `/apply?offer=consultation` |
| `events` / waitlist | Visitor wants workshop/group learning | V2,V3,V6 | Interest collection only; no confirmed event initially | Event-specific prerequisites unknown | `/events` → `/apply?offer=events` |
| `prop_readiness` / internal_concept | Proposed rules/process preparation | V2–V5 | Scope not yet confirmed; no public page or form option | Exact target firm/product and allowed activity needed | None; owner decision |
| `third_party_challenge_operation` / internal_concept | Owner-requested challenge-passing concept | Unvalidated | Preserved request; not renamed as education and not publicly promoted | Precise model, current target-firm permission and applicable business review | None; owner decision |

For public offers, `price_status=unresolved`, `availability=application_only` except the event interest list, `review_capacity=unresolved`, `cancellation_terms=unresolved`, and `evidence=owner brief + proposed curriculum`. The two published curriculum outlines are explicitly proposals. Inclusion boundaries must be confirmed before acceptance. Exclusions: guaranteed profit/income/challenge success, account management, executing trades, collecting trading credentials, clinical services and automatic acceptance. No refund page is presented because no paid offer terms or payments exist.

## Handoffs

1. Visitor submits a bounded application with contact consent. Database generates a reference.
2. Administrator assigns an operations reviewer. Only assigned reviewers can read/manage their applications. Status and private notes are retained.
3. Staff checks suitability and actual capacity; use `waitlisted` where appropriate. Accepted status is an operational decision, not automated fulfilment.
4. Operator provisions the account and administrator assigns a coach, after separate service agreement. No automatic identity entitlement/payment connection exists.
5. Member submits practice; assigned coach writes observation and exercise; member acknowledges and follows up.

No messages are sent in this preview. Production staff ownership, contact channel, capacity-full procedure and response commitment require confirmation before accepting real applicants. The exact application state machine is documented in [architecture](architecture.md).

The master brief records a historical FundedNext-specific restriction on account management/challenge-passing services. It was not independently rechecked during this implementation; it must not be generalized to all firms or treated as current permission. Recheck exact firm/product terms before making any such offer public. No affiliation is implied.
