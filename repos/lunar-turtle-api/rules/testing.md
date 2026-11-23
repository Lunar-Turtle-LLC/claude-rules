---
paths:
  - "test/**"
---

# Writing tests in the API

The shared testing rule covers TDD and test hygiene. This one covers where API specs go and how they run.

- Specs mirror `src/`, one file per source file and level. Unit specs are `src/<path>/<name>.ts` → `test/<path>/<name>.spec.ts`; integration specs are `test/<path>/<name>.it.spec.ts`. A source file can have both.
- A spec that calls the Worker's `fetch` or uses real local D1 or R2 is an integration spec. A spec that tests one module with its collaborators stubbed is a unit spec.
- Helpers shared by several specs go in `test/support/`, never in a spec file. Global setup (schema, outbound fetch stubs, mock restore) lives in the Vitest setup file there.
- Mock `fetch` and use fake timers; stub `crypto.getRandomValues` when output must be fixed.
- Tests run in the Workers runtime. Call the Worker through `worker.fetch(request, env, ctx)` and `waitOnExecutionContext(ctx)`.
- Build a fresh env per test with overrides instead of mutating the shared `env`. Restore `globalThis.fetch` and any `vi.spyOn` in `afterEach`.
- When a migration changes the schema, update the test schema setup to match.
