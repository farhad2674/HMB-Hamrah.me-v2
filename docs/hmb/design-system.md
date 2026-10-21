# Provisional design system

This is a new proposed HMB direction, not an approved brand book. No approved logo or photography was provided. The implementation uses an HMB wordmark and abstract learning artifacts; it does not create a star mark, generated team members or trading-performance proof.

| Token | Value / use |
|---|---|
| `--paper` | `#f8f7f3`, warm reading surface |
| `--ink` | `#172b2b`, primary text and dark actions |
| `--muted` | `#64716b`, secondary prose |
| `--accent` | `#d2f36b`, selected action and educational path accent |
| `--line` | `#dedfd5`, quiet dividers |
| `--radius` | `16px`; compact controls use smaller radii |
| Font | Self-hosted Vazirmatn through `@fontsource/vazirmatn`, 400/500/600/700/800 |
| Icons | Lucide React; icons support readable text labels |

Vazirmatn package licensing is bundled with its installed package; keep its license when redistributing font assets. Root layout imports local font CSS. Primary prose is Persian, with bdi/direction isolation for symbols, email/URLs and machine identifiers. Project title spelling remains HMB until approved expansion is supplied.

## Composition and responsive behavior

Desktop: spacious opening paired with a composed checklist/feedback artifact, full-width route strip, editorial split sections, process tabs, dark journal scene, path selection and article previews. Main container max width is 1240px. Breakpoints in CSS: 1440, 1100, 800 and 600px; mobile stacks the storytelling and form columns. Root layout provides navigation/footer consistently across public and private pages.

Reusable classes include `container`, `section`, `page-intro`, `eyebrow`, `btn-primary`, `btn-secondary`, `btn-dark`, `card`, `grid-2`, `grid-3`, `field`, `form-grid`, `notice`, `error`, `success`, `stack`, `table-wrap`, `dashboard`, `prose`, and `narrow`. The real Persian pages serve as code-native specimens.

## States and interaction

- Buttons have hover/pressed and visible keyboard focus; forms include required labels, validation, pending/retry/error and durable-success states. Disabled actions are visually distinct.
- Process/journal tabs expose selection and panel relationships. Path selection updates contextual copy and destination. FAQ controls expose expanded state. Member/admin interfaces show empty states, statuses and version conflicts.
- Navigation, form flows and private actions remain distinct. Status colors are supplemental to words; no trading-profit colors imply a result.
- Focus uses a 3px `#436620` outline with offset. Controls target approximately 44px or larger where practical. Do not infer WCAG certification from CSS or automated checks alone.
- Motion is short CSS hover/state feedback; no autoplay sound, WebGL dependency, scroll capture or infinite animation. `prefers-reduced-motion` disables animations, transitions and smooth scrolling. Content is immediately readable without waiting for an entrance animation.

Visual review and contrast/browser evidence belong in the verification report. No field performance results, accessibility certification or actual user research are claimed by this design document.
