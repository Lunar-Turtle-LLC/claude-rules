# Coding standards

These apply to all code, in every language.

## Principles

- Prefer simple, explicit solutions over clever abstractions. Favour boring and predictable.
- Prefer well-known, actively maintained libraries over ad hoc implementations when they clearly fit.
- Optimize for readability first; optimize for performance only when there's a real need.
- Make the smallest viable change. Preserve unrelated behavior and avoid drive-by refactors.
- Match the style, naming and idioms of the surrounding code, and the formatter and linter config in the repo.
- Don't add a dependency, abstraction or feature beyond what the task needs. A new dependency needs a clear, specific benefit.

## Functions and modules

- One job per function, component and module. If you need "and" to describe it, split it.
- Prefer early returns over nested conditionals.
- No boolean flags that switch a function between modes. Write two functions.
- Keep side effects (UI, network, storage, files, system services) at the edges. Keep the logic they call pure.
- No hidden module-level mutable state.
- Use clear, descriptive names; avoid abbreviations.
- No magic numbers or strings. Name repeated or meaningful literals as constants.

## Keep logic reusable

- **Separate logic from presentation.** Parsing, conversion, validation, rules and file-format work live in plain modules that take inputs and return results. They don't draw UI, show messages or build responses.
- **Return results; don't present them.** Logic returns data or a typed result for success and each expected failure, and lets the caller decide how to show it.
- **Check for an existing helper first.** Before writing a helper, search the codebase's shared folders and sibling features. Reuse or move what's there rather than writing a second copy.
- **Promote on the second use.** Logic starts next to the feature that needs it. When a second feature needs it, move it to a shared place in the same change and import it from both. Features never import from each other's folders.
- **Keep shared modules focused.** Name a shared module after what it does, never `utils` or `helpers`. Each export has a clear owner and at least one caller.

Don't build a shared abstraction for a single caller "just in case". Extract when there is a second real use, or when extraction makes the code clearly easier to test.

## Errors

- Handle errors explicitly. Never swallow a failure silently: show it to the user, return a typed error, or log it.
- Catch at the boundary (a component, controller, route or entry point), not deep inside logic, unless you're converting the error into a typed result.

## Cleanliness

- No dead code, unused exports, or commented-out blocks.
- Comment the why of non-obvious tradeoffs near the code. Don't narrate what the code does.
- Never commit secrets or credentials.
- Lint, typecheck and tests must pass in everything you touched.
