---
paths:
  - "**/*.tsx"
  - "**/*.css"
---

# Web design: quiet Lunar Turtle sites

Every Lunar Turtle site is quiet. They share one layout, one palette and one type pairing, so moving between them feels like one place. Build new pages from the same parts, and when in doubt, leave something out.

## The shell

Every site has the same frame around its pages.

- **Width:** content sits in `container-shell` (at most 1120px wide, with a 1rem gutter each side). Don't invent another page width.
- **Header:** sticky at the top, on `bg-background`, with a hairline `border-b border-border-soft` under it. The site name sits on the left as a serif wordmark (`font-serif text-xl font-semibold tracking-tight text-headline`). A short row of nav links sits on the right in `text-sm font-medium text-body`, turning `text-headline` on hover. The nav always includes Projects, which links back to the Lunar Turtle projects list. No banners, badges or calls to action in the header.
- **Footer:** a hairline `border-t border-border-soft` with small links in `text-sm text-body` and one line of `text-sm text-muted`. Nothing else.
- Each site uses the same tokens in its global stylesheet: charcoal and copper colours, Manrope (`font-sans`) for text and Newsreader (`font-serif`) for titles, and the shared radius, shadow and motion values. Use the tokens, never raw values.

## Pages

- **Home:** a centered hero with generous space above and below (`pt-16 pb-12 md:pt-24 md:pb-16`). Top to bottom: the logo card, the title, one gray line, and at most one copper button.
- **The logo card** is the one exception to the no-card and no-shadow rules: a small bordered, shadowed `bg-surface` box (`max-w-sm`), centered, with the site's turtle and its `logo-flip` spin. Don't change its size, border, shadow, text or animation.
- **Other pages:** one centered serif title with an optional gray line under it. Section headings and body text stay left-aligned.
- **Sections** are separated by space (`py-12 md:py-16`), not lines or backgrounds. Each has a serif heading, then its content.
- **Reading width:** body text sits in `max-w-2xl` or narrower, `text-base leading-relaxed text-body`. Widen only for content that needs the room, such as a tool's work area.
- Center images, screenshots and videos, even when the text around them is left-aligned. Give every image `width` and `height` (or an aspect ratio) so the page doesn't jump when it loads.
- No background glows, gradients, grid or noise patterns, and no decorative scroll animations.

## Lists

- A list of things is a set of rows in one rounded container: `divide-y divide-border-soft overflow-hidden rounded-[var(--radius-md)] bg-surface`, with each row padded `px-4 py-3`.
- A row has its name in `text-base font-semibold text-headline`, one line of detail in `text-sm text-muted` underneath, and an action or chevron on the right if it needs one. A small icon on the left is fine when it identifies the thing, such as an app's turtle.
- Never put cards inside cards, and never give rows their own borders or shadows.

## Type

| Role | Classes |
|------|---------|
| Page title | `font-serif text-4xl leading-tight text-headline sm:text-5xl` |
| Section heading | `font-serif text-3xl text-headline sm:text-4xl` |
| Row title, label | `text-base font-semibold text-headline` |
| Body text and inputs | `text-base leading-relaxed text-body` |
| Secondary line | `text-sm text-muted` |
| Metadata, captions | `text-xs text-muted` |
| Code, hashes, output | `font-mono text-sm` |

- Serif is for titles and section headings only; everything else is the sans.
- Three text colours only: `text-headline` for primary, `text-body` for secondary, `text-muted` for tertiary.
- Body text and form inputs are at least `text-base` (16px), because smaller inputs make iOS Safari zoom when focused. Move a page onto this scale when you're already reworking it, rather than in a sweep.
- Use weight for emphasis (`font-medium`, `font-semibold`). No `font-light` or `font-thin`, all-caps labels, or letter-spaced eyebrows.

## Controls

- **Main action:** one copper button per page, `inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover`.
- **Secondary action:** a quiet button, `bg-surface-alt text-body hover:text-headline`, or a plain text link. Never a second copper button.
- **Selected and toggled states:** `bg-surface-alt` with `text-headline`, never copper.
- **Links in body text:** copper and underlined, or `text-body` underlined with `decoration-border-base`.
- **Focus:** every control shows a `focus-visible:ring-2 focus-visible:ring-primary/60` ring.
- Every link and button is at least `min-h-11` (44px) to tap.
- Toolbars are a short row of plain icon or text buttons with `aria-label`s, with no background until hovered or pressed.
- Inputs look like fields and nothing more: one border, the surface background, no inner shadows or gradients. A result appears in place, right below its input, without a page change or modal.
- Put rarely used options behind one disclosure (an accordion or a select).

## Motion

- Keep transitions at or under the stylesheet's base motion duration (240ms) with its standard easing: colour changes on hover, a row appearing, a section opening.
- Respect `prefers-reduced-motion`, which the global stylesheet handles.
