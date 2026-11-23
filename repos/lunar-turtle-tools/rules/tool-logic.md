# Where dashboard logic goes

The shared coding standards say to keep logic out of the UI and promote it on its second use. In the dashboard, that means:

- Parsing, conversion, validation, hashing, crypto and file-format work go in plain `.ts` modules in the tool's folder. They must not import React, touch the DOM, or show toasts. The component only wires state to those functions.
- Logic modules return data or a typed result (`{ ok: true, ... } | { ok: false, error }`). The component shows the failure to the user.
- Before writing a helper, search `src/tools/shared/`, `src/lib/`, `src/services/` and the other tool folders.
- When a second tool needs a tool's logic, move it in the same change. Don't import from another tool's folder.
  - Shared tool logic → `src/tools/shared/`.
  - Logic for a family of tools → a folder named for the job, used by every tool in the family.
  - Cross-cutting helpers not tied to tools (encoding, SEO, crypto primitives) → `src/lib/`.
  - Shared UI → `src/components/tools/` or `src/components/ui/`.
- Side effects (DOM, network, storage, downloads) stay in components and hooks.
- Several tools each have their own copy of a file download helper. When you touch one of them, move the helper to `src/tools/shared/` and switch the tools you touched to it.
- Add a dependency to the app's own `package.json`, not the workspace root.
