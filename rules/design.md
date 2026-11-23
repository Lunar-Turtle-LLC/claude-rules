---
paths:
  - "**/*.tsx"
  - "**/*.css"
  - "**/*.swift"
---

# Design: quiet like Apple Notes

Every Lunar Turtle app and site should feel as quiet as Apple Notes: content first, almost no chrome, and nothing on screen that the visitor didn't come for. The web design rule and the repo's own design rule say how this looks in that codebase. Where they are more specific, follow them.

## How Apple Notes is built

These are the traits worth copying, drawn from the app itself and Apple's Human Interface Guidelines (HIG).

- **Content is the interface.** A note is plain text on a plain background, with no paper texture, frame or decoration. The text is what you look at.
- **A clear, fixed hierarchy.** Folders, then a list of notes, then the note. Each level is a simple list or a page, never a dashboard.
- **Plain lists.** Each row has a bold title, then a gray line of detail. Rows are separated by hairlines inset from the left edge, with no icons, badges or cards.
- **Type does the work.** Hierarchy comes from size and weight in one typeface. No light weights, and few typefaces.
- **One accent colour, used sparingly.** The accent marks what you can act on and keeps one meaning. Labels use primary, secondary and tertiary grays rather than more colours.
- **Layered backgrounds instead of borders.** Content is separated by background levels and hairline separators, not boxes and shadows.
- **A small toolbar of plain icons.** A few monochrome glyphs, each a direct action. Tools appear when needed and get out of the way after.
- **Progressive disclosure.** Advanced options live behind one tap, and defaults just work.
- **Quiet motion.** Short slides and fades that explain where something went. Nothing animates for its own sake.

## Structure

- Each page or screen does one thing. Don't add sidebars, stats, banners or promos.
- One large title per page or screen, with an optional gray line under it. No eyebrow labels and no extra subtitles.
- Group related items into rows on the surface colour with hairline separators between them. Don't wrap content in bordered cards, and don't use shadows or lift-on-hover.
- Use whitespace, not lines and boxes, to group things.
- Show the controls needed for the common case. Put rarely used options behind a single disclosure or menu, with defaults that work without touching them.
- Empty states say what to do in one plain line. No illustrations.

## Colour

- The accent colour is for the one main action on a page or screen. Don't use it for headline words, tags, badges, icon tints, hover states or selected states.
- Selected and toggled states use the secondary surface with primary text.
- Use the colour tokens the codebase already defines. Don't add a colour outside the place the platform or repo rule allows.

## Copy

- No taglines, pitches or slogans. Labels name things.
- No exclamation marks and no emoji.
- Don't explain or reassure in extra sentences. If a note is needed, it's one short line under the control it's about.
- Keep the first-person voice and personal touches. Don't cut them to make a page quieter.

## Icons and touch

- Use an icon only on something the visitor taps, or when it carries meaning that text doesn't. No decorative icons beside headings, values or links.
- Every link, button and control is at least 44 by 44 points to tap. Make a secondary action quiet by its style, never by shrinking it.

## Motion

- The interface uses motion only to show a change of state: a row appearing, a section expanding, a message arriving. Keep it short and respect the reduced-motion setting.
- No entrance animations, parallax, hover lifts, background effects or decorative scroll animations. Content the visitor came for, such as a game board, may move more.

## Before you finish a UI change

Ask of each element: would Apple Notes show this? If removing it loses nothing the visitor needs, remove it. In particular check for:

- More than one emphasis colour on the screen
- Borders or cards around content that whitespace could separate
- Icons that sit next to text without adding meaning
- A second sentence that explains the first
- Options visible by default that most people won't change
