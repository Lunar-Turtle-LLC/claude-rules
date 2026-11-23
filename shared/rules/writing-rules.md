# Claude rules

The rules and skills in this repo's `.claude/` folder are a synced copy of the golden copy in `Lunar-Turtle-LLC/claude-rules`. Edits made here are overwritten by the next sync.

- To change a rule or skill, change it in `claude-rules`. The sync then opens a pull request in every repo that uses it.
- Write rules as timeless principles. Don't mention pull request or issue numbers, counts, dates, or how the code looks today, because those go stale.
- Shared rules never name a repo, file, class or feature. Use placeholders such as `<Thing>Service` or `<slug>`. A repo's own rules may name the stable entry points a convention depends on.
- Keep facts that change with the code, such as commands, layout and env vars, in the repo's `CLAUDE.md`, which is not synced.
