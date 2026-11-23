---
paths:
  - "apps/dashboard/src/**/*.tsx"
  - "apps/dashboard/src/**/*.css"
---

# Tool pages and interfaces

The shared and web design rules cover the whole site. This adds what is particular to tool pages.

- A tool page is the title, a short gray description, the tool, then the FAQ.
- Tools that need the width, such as side-by-side or document editors, may widen past the readable column. Others don't.
- Tool controls sit on one flat `bg-surface` panel. Nested info panels use `bg-surface-alt` with no border. Inputs, textareas and output boxes keep their borders so they read as fields.
- Each tool keeps one copper `bg-primary` button for its main action.
- Put rarely used options behind a single "Options" `Accordion` or a select.
- An empty file input says what to do in one plain line ("Drop a PDF or choose a file").
