---
paths:
  - "Tossback/**/*.swift"
  - "TossbackMessages/**/*.swift"
---

# Tossback design

The shared design rule says how quiet Tossback should be: quiet screens around games that are fun to look at. When a screen and a game disagree about how loud to be, the screen gets quieter. This rule says how that looks in SwiftUI.

## Screens

- The title is large and left-aligned, with an optional gray line under it for the mode and time, such as `From Sam · 1:30`. No centered headings.
- Group related items into rows with `groupedRows()` (rows on `Theme.groupedRow`, hairline separators between them). A 2pt outline belongs to game tiles only.
- Amber (`accentButton()`) is the accent colour, for the one main action on a screen: Challenge, Start, Rematch, Play again, Submit. Don't use it for capsules or avatars either.
- Settings are standard controls in rows: `Toggle` for on and off, a `.menu` picker for a choice of several.
- Make a secondary action quiet with a gray `.bordered` button, never by shrinking it to plain text.

## Colour

- Use `Theme` colours for screens and shared tiles, and the game's own `<Game>Palette` for its game colours (see `palettes.md`). Dark mode is navy: screen `#1B2636`, rows `#243145`, tiles `#34465F`. Light mode puts navy text on a pale blue screen with white rows.
- Every new colour gets a contrast test; see `palettes.md`.

## Copy

- No exclamation marks in screens or Messages bubbles (`You won`, not `You win!`). The countdown's `Go!` is part of the game and stays.

## Icons

- Use an SF Symbol only on something the player taps (shuffle, backspace, arrows) or when it carries meaning that text doesn't, such as a game's colour chips.
- No decorative symbols beside rules, records, steps or scores.

## Games

- The fun lives in the game art: tilted letter tiles, pads, pieces, and their sounds and haptics. Keep that colour and motion inside the board and the hero picture, and respect `MotionPolicy`.
