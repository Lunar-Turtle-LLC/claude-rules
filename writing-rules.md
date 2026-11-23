# Claude rules

Every repo mounts `Lunar-Turtle-LLC/lunar-turtle-claude-rules` as a git submodule at `.claude/rules/shared/`. Those shared rules hold in every repo. A repo's own rules sit beside that folder, directly in `.claude/rules/`.

- To change a shared rule, change it in `lunar-turtle-claude-rules`. Dependabot then opens a pull request in each repo to move its submodule to the new version. Never edit or add files in `.claude/rules/shared/` in place.
- A rule goes in `lunar-turtle-claude-rules` only if it holds in every repo that uses its file types or folders. Scope it with `paths` frontmatter by file type or folder name, never by one repo's paths.
- A rule only one repo needs (where a kind of file goes, its registries, its palettes, its migrations) goes in that repo's `.claude/rules/`, scoped with `paths` to the folders it covers. It adds to the shared rules and never repeats or contradicts them. If it turns out to hold everywhere, move it to `lunar-turtle-claude-rules`.
- Facts that every session in a repo needs (what it is, its commands, its layout, its privacy model) go in its `CLAUDE.md`.
- Write rules as timeless principles. Don't mention pull request or issue numbers, counts, dates, or how the code looks today, because those go stale.
- Shared rules never name a repo, file, class or feature. Use placeholders such as `<Thing>Service` or `<slug>`.
