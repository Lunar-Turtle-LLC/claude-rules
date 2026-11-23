---
paths:
  - "apps/dashboard/src/app/tools/**"
  - "apps/dashboard/src/tools/**"
  - "apps/dashboard/src/content/**"
  - "apps/dashboard/public/samples/**"
---

# Adding or changing a dashboard tool

A tool is spread across a few registries, and tests check that they agree. When you add a tool with slug `<slug>`, touch all of these in the same change:

1. `src/tools/<slug>/` with a `"use client"` component named `<Name>Tool.tsx`, plus its logic modules. Its tests go in `tests/tools/<slug>/` (unit `.test.tsx`, integration `.it.test.tsx`).
2. `src/app/tools/<slug>/page.tsx`, following an existing page such as `regex-tester`:
   - `TOOL_SLUG`, `TOOL_TITLE` and `TOOL_DESCRIPTION` constants.
   - `export const metadata = buildToolMetadata({ slug, title, description })` from `@/lib/seo`.
   - Render `<AppShell><ToolPageFrame title description toolSlug={TOOL_SLUG}>`. Without `toolSlug` the page emits no JSON-LD or FAQ.
3. `src/content/tools.ts`: add a `ToolDefinition` to `TOOLS` if the tool should be listed, indexed and in the sitemap. To keep it unlisted and noindexed, leave it out and add the slug to the hidden list asserted in `tests/content/tools.test.tsx`.
4. `src/content/tool-faqs.ts`: add the slug to `TOOL_ROUTE_SLUGS` and at least one entry to `TOOL_SPECIFIC_FAQ`. The FAQ test fails otherwise.
5. Optional: sample inputs in `public/samples/<slug>/` and a matching entry in `src/content/samples.ts`. Samples must be small, synthetic, and free of real personal data.

When renaming or removing a tool, update the same places and add a redirect in `public/_redirects` if the URL was public.

## Tool behaviour

- All processing happens in the browser. Read files with `File`/`Blob` APIs, and offer results as a download or copy. Never upload tool input.
- Reuse `SingleFileUpload` or `MultiFileQueueUpload` for file input rather than building a new drop zone.
- Validate input and show a clear inline error for bad input. Don't throw into React or fail silently.
- Heavy work (ffmpeg, pdf.js, large files) must not freeze the page. Use the existing worker setup or show progress.
- Revoke object URLs you create once they're no longer needed.
- Prefer the libraries already in `package.json` (pdf-lib, pdfjs-dist, papaparse, js-yaml, fast-xml-parser, exifreader, file-type, diff) before adding a new one.
