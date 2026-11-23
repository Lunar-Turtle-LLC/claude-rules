---
paths:
  - "apps/dashboard/tests/**"
---

# Writing dashboard tests

- Tests live in `tests/`, never in `src/`. `tests/` mirrors `src/`: the tests for `src/<path>/<Name>.ts(x)` go in `tests/<path>/`, so moving or renaming a module tells you which tests move with it.
- Unit tests are `<Name>.test.ts(x)` and integration tests carry an `.it` suffix: `<Name>.it.test.ts(x)`. Use `.tsx` only when the test contains JSX.
- Import the code under test through the `@/` alias, not a relative path, so a test never depends on where it sits.
- A test that renders a component and drives it with `userEvent` is an integration test. A test that calls a logic module or hook directly with its collaborators stubbed is a unit test.
- Render with Testing Library and query by role or label, as a user would. Drive input with `userEvent.setup()`.
- Mock `fetch` and use fake timers; stub `crypto.getRandomValues` when output must be fixed.
- Shared test setup, global shims and data factories live in `tests/support/`, imported through the `@tests/` alias. Add new global shims to the setup file there, not to individual tests.
