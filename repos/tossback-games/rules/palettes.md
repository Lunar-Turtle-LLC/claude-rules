---
paths:
  - "Tossback/**/*.swift"
  - "TossbackTests/**/*.swift"
  - "TossbackMessages/**/*.swift"
---

# Colours: Theme and game palettes

Colours live in two places, so `Theme` stays short and every game's colours sit together.

- **`Theme`** (`Tossback/Core/UI/Theme.swift`) holds only what every screen and game shares: screens and rows, text, the amber main action, and the shared letter tiles (open, used, placed). It is split into labelled `// MARK: -` sections; add to the section a colour belongs in.
- **`<Game>Palette`** (`Tossback/Games/<Game>/UI/<Game>Palette.swift`) holds the colours that belong to one game, such as `WordLatchPalette`, `PipeLinksPalette`, `EchoPalette`, `SnakePalette` and `AnagramsPalette`. A game never adds its own colours to `Theme`, and one game never borrows another game's palette.

Palettes:

- A palette is an `enum` of `Swatch` constants only. Call sites use `.color`, or `.light` / `.dark` when drawing with UIKit.
- Name each colour for what it means in the game, in the words the player sees: `rightSpotFill`, `wrongSpotCornerFlag`, `connectedPipe`, `trianglePad`. Never by hue (`blue`) or by an internal term (`partial`, `secondAccent`).
- Group related colours under `// MARK: -` headings, one per thing on screen (one per letter mark, per pad, and so on), with a one-line doc comment saying what the colour is for and why it looks the way it does.
- When a game reuses a shared colour, give it the game's own name in the palette and point at the `Theme` swatch (`static let missedWordFill = Theme.usedTileFillSwatch`), so the meaning is clear where it's used.
- Hex values appear only in `Theme` and palettes, never in views.

Tests:

- Every palette has `<Game>PaletteTests.swift` in `TossbackTests/Games/<Game>/UI/`, and `Theme` has `ThemeTests`. Test each new colour in both appearances with `ColorStandard` (`TossbackTests/Support/ColorStandard.swift`): 4.5:1 for text, 3:1 for outlines, flags and shapes (WCAG AA).
- Test the meaning a colour must keep, such as "right spot is blue" with `ColorStandard.hue(of:)`, not its exact hex value.
