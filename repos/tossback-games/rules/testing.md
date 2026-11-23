# Testing in Tossback

The shared testing rule covers TDD and test hygiene. This one covers Tossback's names and places.

- Name unit test files `<Thing>Tests.swift` and integration test files `<Thing>TestsIT.swift` (for example `DictionaryServiceTestsIT.swift`), in the same folder as the matching unit tests. Name the test struct after its file.
- An integration test uses real parts together, such as the word files that ship in the app, or several services at once.
- Run the full suite before finishing.
