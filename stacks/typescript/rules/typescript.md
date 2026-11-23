# TypeScript

- Strict typing. Avoid `any`; if it's truly needed, justify it in a short inline comment.
- Model states and failures with discriminated unions rather than optional fields and booleans.
- Expected failures are typed results (`{ ok: true, ... } | { ok: false, ... }`), not thrown errors. Handle each failure case with an exhaustive `switch`.
- Export types alongside the functions that use them, from the same module.
- Logic modules are plain `.ts` files. They don't import UI frameworks, touch the DOM, or read request objects.
