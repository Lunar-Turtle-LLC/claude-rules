---
paths:
  - "Tossback/Games/**/*.swift"
  - "TossbackTests/Games/**/*.swift"
---

# Game Structure

Every game folder under `Tossback/Games/<Game>/` sorts its Swift files into the same places, and its tests mirror them under `TossbackTests/Games/<Game>/`.

- `Services/`: logic and rules with no drawing. Round state, scoring, board and puzzle making, seeded ordering. Name each `<Game><Thing>Service`.
- `Models/`: plain data a game passes around. Boards, cells, settings, speeds and the `<Game>ResultDetail` that travels inside a `GameResult`. No SwiftUI, no services.
- `UI/`: views, view models and everything that decides how something looks or sounds to the player. Colours and swatches, layout, artwork, the Ready screen's content and accessibility text.
- Top level: only `<Game>Game.swift` (the `GamePlugin` the shell talks to) and `<Game>Cues.swift` (which sound goes with each moment).

Rules:

- New logic goes in a service, never in `<Game>Game`, a view or a view model. If a second game needs it, move it to `Tossback/Core/Services/` instead of copying it (see `OneAttemptService`).
- A model must not import SwiftUI or depend on a service. If it does, it belongs in `UI/` or `Services/`.
- A test lives in the same sub-folder as the file it tests. Unit tests are `<Thing>Tests.swift`; integration tests keep the `TestsIT` suffix from `testing.md`.
- When you touch a file that sits in the wrong place, move it in the same change, or say why you left it.
- Move files with `git mv` (see `structure.md`).
