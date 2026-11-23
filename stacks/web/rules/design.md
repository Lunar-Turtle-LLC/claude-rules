# Web design

How the shared Apple Notes design rule applies to a Lunar Turtle website built with Tailwind and the shared charcoal and copper tokens.

## Pages

- Center the page title. Section headings and body text stay left-aligned.
- Pages that are mostly text keep a centered serif title (`font-serif`) and a left-aligned body.
- Use a single readable column, with long text near 65 to 75 characters per line (`max-w-prose` or similar). Widen only for content that needs the room.
- Center images, screenshots and videos on the page, even when the text around them is left-aligned.
- Give every image `width` and `height` (or an aspect ratio) so its space is reserved and the page doesn't jump when it loads.
- No background glows, grid or noise patterns.

## Rows

- Lists of things are rows on `bg-surface` inside a `divide-y` container, with hairline `border-border-soft` separators. Add a hairline only between rows in a list.
- A row has its name in `font-semibold text-headline`, one line of detail in `text-sm text-muted` underneath, and an action on the right if it needs one.

## Home page logo

- The logo card on the home page is the one exception to the no-card and no-shadow rules. Don't change its size, border, shadow, text or `logo-flip` animation.

## Colour

- Copper (`bg-primary`) is the accent colour, kept for the one main action on a page.
- Links inside body text can stay copper and underlined.
- Selected and toggled states use `bg-surface-alt` with `text-headline`.
- Use the tokens in the global stylesheet only. Don't add new colours.
- Three text colours only: `text-headline` for primary, `text-body` for secondary, `text-muted` for tertiary.

## Type

- Use one sans family (`font-sans`) for UI. The serif is only for the centered title on text-heavy pages.
- Use a small, fixed scale and don't invent sizes:

  | Role | Tailwind | Apple Notes equivalent |
  |------|----------|------------------------|
  | Page title | `text-3xl`–`text-4xl font-semibold` | Title |
  | Section heading | `text-xl font-semibold` | Heading |
  | Row title / label | `text-base font-semibold` | Subheading / Headline |
  | Body text and inputs | `text-base` | Body |
  | Secondary line | `text-sm text-muted` | Subhead / Footnote |
  | Metadata, captions | `text-xs text-muted` | Caption |
  | Code, hashes, output | `font-mono text-sm` | Monostyled |

- Body text and form inputs are `text-base` (16px). Smaller inputs make iOS Safari zoom when focused. Move a page onto this scale when you're already reworking it, rather than in a sweep.
- Use weight for emphasis (`font-medium`, `font-semibold`). No `font-light` or `font-thin`, all-caps labels, or letter-spaced eyebrows.

## Controls

- Toolbars are a short row of plain icon or text buttons with `aria-label`s, with no background until hovered or pressed.
- Inputs look like fields and nothing more: one border, the surface background, no inner shadows or gradients.
- A result appears in place, right below its input, without a page change or modal.
- Put rarely used options behind one disclosure (an accordion or a select).

## Motion

- Keep transitions at or under the stylesheet's base motion duration (240ms) with its standard easing.
- Respect `prefers-reduced-motion`, which the global stylesheet handles.
