# Claude rules

The core rules in `.claude/rules/core/` come from `Lunar-Turtle-LLC/claude-rules`, pulled in as a git submodule. Every other file in `.claude/rules/` belongs to this repo.

- To change a core rule, change it in `claude-rules`. Dependabot then opens a pull request in each repo to move its submodule to the new version. Never edit the submodule's files in place.
- A rule goes in `claude-rules` only if it holds in every repo that uses its file types. A rule for one repo stays in that repo's `.claude/rules/`.
- Write rules as timeless principles. Don't mention pull request or issue numbers, counts, dates, or how the code looks today, because those go stale.
- Core rules never name a repo, file, class or feature. Use placeholders such as `<Thing>Service` or `<slug>`. A repo's own rules may name the stable entry points a convention depends on.
- Keep facts that change with the code, such as commands, layout and env vars, in the repo's `CLAUDE.md`.
