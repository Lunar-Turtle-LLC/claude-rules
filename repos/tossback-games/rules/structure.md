# Code Structure

Two targets build from this repo: the iOS app (`Tossback`) and the Messages extension (`TossbackMessages`). Where a file lives says which of them uses it. The folder tree is in `docs/architecture.md`.

- `Tossback/Core/` and `Games/`: both targets. Core also holds the screens both targets show (Ready, score rows, ad slot) in `UI/` and their view models in `ViewModels/`.
- `Tossback/App/`: app only.
- `Tossback/Messages/`: Messages only, including the extension's Swift code (`MessagesViewController` and its views).
- `TossbackMessages/`: the extension target's `Info.plist`, storyboard and assets only. No Swift files.

## Rules

- **Put a new file by who uses it.** Both targets: `Core/`. App only: `App/`. Messages only: `Messages/`. Don't put app-only or Messages-only code in `Core/` because it is convenient.
- **When a second target needs a file, promote it.** Move it to `Core/` in the same change.
- **`Core/` and `Games/` never import from `App/` or `Messages/`.** `App/` and `Messages/` never use each other's types.
- **Messages Swift code goes in `Tossback/Messages/`, not `TossbackMessages/`.** The test bundle is hosted by the app (`@testable import Tossback`), so it can't see code compiled only into the extension. Because of this, `Tossback/Messages/` is also compiled into the app, and only the extension uses it at runtime.
- **Tests mirror the layout.** `TossbackTests/Core/`, `App/`, `Messages/` and `Games/` match the source folders, with `<Thing>Tests.swift` and `<Thing>TestsIT.swift` as in `testing.md`.

## Moving files

Move files with `git mv`. Don't hand-edit `project.pbxproj` beyond the exception in `swift.md`. Both targets read `Tossback/` by folder, so a moved file is built into both unless the project lists it as an exception. After moving files, open Xcode and check the `Tossback` folder's membership exceptions for `TossbackMessages`: `Tossback/App/` and `Tossback/ContentView.swift` should be unchecked. If a file moved out of a folder that had an exception, set it again at the new path. Cloud threads can't do this, so the PR description lists the steps for Kyle.
