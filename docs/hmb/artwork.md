# Hamrah generated artwork

Created on 2026-10-28 using the built-in image_gen tool, with transparent_background=true for each asset. The original supplied taste attachments remain unchanged.

## Asset set

| File under public/images/hamrah | Purpose | Source size |
| --- | --- | --- |
| footer-companionship.png | Retired iteration: marble hands and book. Retained on disk; no longer used by the footer after owner feedback. | 2172 x 724 |
| footer-decision-review-v2.png | Previous workspace-only iteration retained as the reference for v3. | 2048 x 768 |
| footer-hands-workspace-light-v3.png | Previous digital-hands workspace iteration, retained on disk. | 2048 x 768 |
| footer-marble-book-brand-v4.png | Active footer: owner-selected marble hands and glass book, refined with Hamrah deep green, lime and ivory. See footer-v4-prompt.json. | 2172 x 724 |
| capability-learning.png | Open amber-glass book, rising pages and orbital sphere: structured learning. | 1536 x 1024 |
| capability-journal.png | Layered amber-glass checklist journal and stylus: recording plan and execution. | 1536 x 1024 |
| capability-feedback.png | Connected amber-glass dialogue frames: observation, exchange and the next practice. | 1536 x 1024 |
| hamrah-principles-sculpture.png / .webp | Transparent ivory frame and three green glass planes for the homepage principles chapter. | PNG 1448 x 1086; WebP 1200 x 900 |
| hamrah-guidance-sculpture.png / .webp | Ivory sculptural hands reviewing a green decision sheet for the human-guidance chapter. | PNG 1448 x 1086; WebP 1200 x 900 |

The capabilities set follows the amber Clarity taste file's glass, warm light and fine-contour direction while making each object specific to Hamrah's educational purpose. These are decorative images; the headings, descriptions and destinations remain real HTML. No text, claims or testimonials are embedded into the artwork.

All source images are RGBA PNGs with fully transparent pixels. Dimensions, alpha extrema and source file sizes are recorded in artwork-assets.json. The exact final prompt set is in [artwork-prompts.json](artwork-prompts.json). The built-in generated originals remain in the Codex generated_images directory; website references use workspace copies.

## Implementation

- Homepage capabilities use next/image with a reserved responsive image stage and viewport sizes. Existing card links, titles and prose remain intact.
- The shared footer uses the owner's newly selected marble-hands and glass-book image, refined to the brand palette and composited directly onto the existing dark green footer with no added background. Previous panel labels were removed to match this composition. The image cannot cover or intercept footer navigation. Prior artwork iterations remain on disk.
- Images load lazily and are optimized by Next.js. Original PNGs and alpha remain available in public/images/hamrah.
- artwork.css scopes the new sizing and hover treatment. Reduced-motion preferences disable the image hover translation.

## Verification

TypeScript and production build pass. Browser inspection confirms the new assets load, and the alpha channel is verified directly from each PNG. Desktop/mobile section sizing and document overflow are checked in the browser; screenshots are stored in screenshots/artwork/.



