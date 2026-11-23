# Claude rules

Every file in `.claude/rules/` comes from `Lunar-Turtle-LLC/lunar-turtle-claude-rules`, mounted as a git submodule. A repo has no rules of its own.

- To change a rule, change it in `lunar-turtle-claude-rules`. Dependabot then opens a pull request in each repo to move its submodule to the new version. Never edit files in `.claude/rules/` in place, and never add a file there.
- A rule goes in `lunar-turtle-claude-rules` only if it holds in every repo that uses its file types or folders. Scope it with `paths` frontmatter by file type or folder name, never by one repo's paths.
- What only one repo needs (its commands, layout, registries, env vars, where a kind of file goes) belongs in that repo's `CLAUDE.md`. A nested `CLAUDE.md` in a subfolder holds notes that only apply there, except in folders a build packages as-is, such as an Xcode synced folder.
- Write rules as timeless principles. Don't mention pull request or issue numbers, counts, dates, or how the code looks today, because those go stale.
- Rules never name a repo, file, class or feature. Use placeholders such as `<Thing>Service` or `<slug>`.
