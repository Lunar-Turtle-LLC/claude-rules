---
paths:
  - "**/*.swift"
  - "**/*.xcodeproj/**"
---

# Swift & Xcode

Style references, in order of precedence:

1. [Swift API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/): naming and API shape (Apple's official guide).
2. [Google Swift Style Guide](https://google.github.io/swift/): formatting and file-level conventions.
3. [Kodeco Swift Style Guide](https://github.com/kodecocodes/swift-style-guide): practical iOS-flavored conventions.
4. [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/): UI and UX decisions.

Tooling:

- Format with `swift-format` and lint with `SwiftLint`; config files in the repo root win over the guides above.
- Write tests with [Swift Testing](https://developer.apple.com/documentation/testing) (`@Test`, `#expect`); use XCTest only for UI and performance tests.

Conventions:

- Prefer `struct` and `enum` over `class`; use `let` over `var`.
- Avoid force unwraps (`!`) and `try!` outside tests.
- Use Swift concurrency (`async/await`, actors) over callbacks and GCD.
- Don't hand-edit `project.pbxproj`; change project settings through Xcode (see `structure.md` for moving files). The one exception is a small target-membership exception or build setting change that Kyle asks for; say so in the PR description. Adding or moving a file never needs a project edit, because the folders are synced.
- Import every module a file uses, even when it compiled last time. Swift can fail with "missing import of defining module" when a file leans on another file's import (`OSLog` for `Log`, `SwiftUI`, `UIKit`, `Foundation`). This matters most in code behind `#if ADMOB`, which cloud threads can't compile, so check each new type or call against the file's import list before committing.
