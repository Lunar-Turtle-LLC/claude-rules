---
paths:
  - "**/*.swift"
---

# Logging

TestFlight builds can't attach a debugger, and cloud threads have no Xcode, so a log line is often the only way to learn why something silently did nothing (the ad slot hiding itself on a failed load was found this way).

- **Log wherever the app quietly gives up.** If code hides a view, skips a feature, falls back to a default, or returns early on an error, it writes one line saying which step failed and why. Typical places: ad loading and consent, audio and file loading, decoding a challenge URL, saving and reading records, Messages extension setup, and anything that calls a network or a system service.
- **Use the `Log` loggers** in `Tossback/Core/Log.swift` (`os.Logger`, subsystem `com.lunarturtle.Tossback`). Add a new category there, with a one-line doc comment, when no existing one fits. Import `OSLog` in any file that logs.
- **Mark error text `privacy: .public`.** Release and TestFlight builds redact dynamic strings otherwise, so a log line would read `<private>`. Do this only for text that is safe to read: an SDK's error message, a file name, a stage name.
- **Never log player data:** scores, words, opponent names, challenge contents, or anything that could reveal a hidden answer. Say what happened, not what it held.
- **Pick the level by what the player loses.** `error` when a feature didn't work, `info` for a normal step worth following (extension opened, screen chosen), `debug` for noise only useful while developing.
- **Keep logs testable.** When the message depends on a case, such as why an ad failed, put the wording in a small type outside any `#if` (see `AdLoadFailure`) and unit test it, so the SDK-only file just calls `Log`.
- **Say how to read it.** When a PR adds logging for a failure you can't reproduce here, include in the PR description how Kyle reads it: Console.app with the iPhone plugged in, filtered by subsystem `com.lunarturtle.Tossback` and the category.
