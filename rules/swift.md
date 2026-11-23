---
paths:
  - "**/*.swift"
  - "**/*.xcodeproj/**"
---

# Swift

Style references, in order of precedence:

1. [Swift API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/): naming and API shape (Apple's official guide).
2. [Google Swift Style Guide](https://google.github.io/swift/): formatting and file-level conventions.
3. [Kodeco Swift Style Guide](https://github.com/kodecocodes/swift-style-guide): practical iOS-flavored conventions.
4. [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/): UI and UX decisions.

## Tooling

- Format with `swift-format` and lint with `SwiftLint`. The config files in the repo root win over the guides above.
- Write tests with [Swift Testing](https://developer.apple.com/documentation/testing) (`@Test`, `#expect`). Use XCTest only for UI and performance tests.

## Conventions

- Prefer `struct` and `enum` over `class`, and `let` over `var`.
- Model states and failures with enums with associated values rather than optionals and booleans. Expected failures are typed (`Result` or a thrown error type), handled with an exhaustive `switch`.
- Avoid force unwraps (`!`) and `try!` outside tests.
- Use Swift concurrency (`async`/`await`, actors) over callbacks and GCD.
- Keep logic in plain types that don't import SwiftUI or UIKit, so it can be unit tested without a view.
- Import every module a file uses, even when it compiled last time. Swift can fail with "missing import of defining module" when a file leans on another file's import. This matters most in code behind a compile flag that a cloud session can't build, so check each new type or call against the file's import list.
- Don't hand-edit `project.pbxproj`; change project settings through Xcode. Adding or moving a file never needs a project edit when the project uses synced folders.
