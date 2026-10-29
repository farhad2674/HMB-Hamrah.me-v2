# Homepage cinematic chapters

Implemented 2026-10-29 from the approved plan. Homepage-only spacing uses 144px on desktop, 104px at 601–1100px, and 72px at 600px and below. The principles and human-guidance chapters use a minimum 88svh above 1100px, with natural document height on smaller screens. Existing hero composition, public subpages, and full-width transparent footer artwork are preserved.

## Content and artwork

- Principles follows capabilities; human guidance follows the learning journey. Numbering now runs 01–08. Existing analytics scene IDs are retained; no API schema is changed.
- Both chapters are server components with real Persian text and links. The decision-review example is explicitly educational. No staff profiles, commercial guarantees, or performance results are invented.
- Built-in image_gen generated two original transparent PNG sculptures. The optimized 1200×900 WebP copies retain alpha and are 82,212 / 72,798 bytes. Originals are preserved in public/images/hamrah/. Prompts are in home-chapter-prompts.json and alpha/dimension checks in home-chapter-assets.json.
- Illustrations are decorative, use empty alt attributes, reserve a 4:3 stage, load lazily, and request responsive sizes. They add no opaque background panel.
- Homepage reveals use 650ms / 12px and 0/80/160ms staggering; decorative parallax is capped at 16px. Subpages retain their prior timings. Existing reduced-motion handling remains in place.

## Verification

- TypeScript and production build pass; generated homepage HTML includes both headings, the example and CTA links before JavaScript executes, with one H1 and no pending/hidden reveal state. Staging noindex and canonical settings are preserved.
- Browser checks at 390, 768, 1100 and 1440px confirm the spacing breakpoints, stacked mobile layout, desktop two-column composition, and no document overflow. At 1440px the minimum chapter height is 880px with a 1000px viewport.
- All three new links resolve to existing destinations: /about, /coaching, and /apply?offer=coaching. Keyboard tabbing between coaching links shows a visible focus outline.
- Reduced-motion CSS and the preference-change cleanup branch were inspected. The browser tool did not expose media emulation, so an emulated reduced-motion run is not claimed. No-JavaScript readability was checked in production HTML rather than with a browser JavaScript toggle.
- Browser screenshots and responsive measurements are saved in screenshots/chapters/. Content checks are in home-chapter-content-checks.json.

SEO/GEO follows the existing architecture: useful visible text, clear entity and service explanations, contextual internal links and semantic headings. No special AI schema or citation/ranking promises are added; robots policy is unchanged.
