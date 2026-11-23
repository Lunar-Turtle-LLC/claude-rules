# Testing and test-driven development

Build behaviour test first, and test it thoroughly. The repo's `CLAUDE.md` gives its test folder and file names.

## Red, green, refactor

1. **Red:** write a failing test for the next small behaviour. Run it and confirm it fails for the right reason.
2. **Green:** write the smallest code that makes it pass.
3. **Refactor:** tidy up with the tests green, without changing behaviour.

- A bug fix starts with a test that reproduces the bug.
- Cover the success path, every error or failure branch, edge cases (empty, maximum, boundary values, unexpected input) and each state a screen or component can show (loading, empty, error, ready).
- A change that adds behaviour without tests isn't done, even if CI is green.

## Where tests live

- Tests never go in the source folder. They live in the repo's test folder (or test target), separate from the code they test.
- The test folder mirrors the source tree: the tests for `<source>/<path>/<Name>` live at `<tests>/<path>/`, named after the file they test. Moving or renaming a source file tells you exactly which tests move with it.
- A file has at most one unit test file and one integration test file, side by side in the mirrored folder.
- Shared helpers, setup and factories live in a support folder inside the test folder, never in `src` and never in a test file.

## Unit and integration tests

- **Unit tests** check one module on its own, with its collaborators stubbed and small made-up data. Every logic module gets them, and they cover each branch.
- **Integration tests** drive several real parts together through a public entry point, the way a user or client would, stubbing only what leaves the process (network, clock, randomness). Every screen, component or endpoint with user-facing behaviour gets them.
- Keep unit and integration tests in separate files. Integration test files carry an `IT` marker in their name, in the form the repo's `CLAUDE.md` gives.
- Don't test the same branch at both levels. Unit tests cover the branches; integration tests prove the pieces are wired together and cover each outcome a caller can see.

## Tests that don't go stale

- Test behaviour through the public interface, not implementation details. Don't assert on private helpers, internal state or the order of internal calls, so a refactor that keeps behaviour keeps the tests green.
- Assert on outcomes (the returned value, the response, the stored row, the text on screen) rather than on which mocks were called. Check a mock call only when the call itself is the behaviour, such as a request sent to another service.
- Name each test after the behaviour it proves ("rejects an expired code"), not the function it calls.
- Build test data with shared factories that fill in valid defaults, and set only the fields the test is about. When a shape changes, one factory changes instead of every test.
- When a test depends on a limit or setting in the code, import that constant instead of repeating the number.
- Assert on the wording only when the wording is the behaviour (an error message the user reads). Otherwise find elements by role or label and check state, not copy.
- When behaviour changes or is removed, change or delete its tests in the same change. A test for behaviour that no longer exists is dead code.

## Hygiene

- Keep tests fast, isolated and deterministic, with one reason to fail. No real network, timers or randomness in assertions: stub them.
- Prefer small, focused assertions over snapshot tests.
- Use small, synthetic fixtures. Never commit real personal data, keys or tokens, even in tests.
- Never skip, focus, delete or loosen a test to get a green run. Fix the code or the test.
