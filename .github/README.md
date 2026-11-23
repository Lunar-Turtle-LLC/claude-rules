---
paths:
  - ".claude/rules/**"
---

# Lunar Turtle Claude rules

The golden copy of the Claude Code rules for every Lunar Turtle repo. Each repo mounts this repo as a git submodule at `.claude/rules`, so these files are the only rules Claude loads there. Dependabot keeps the submodule current.

This README lives in `.github/` so GitHub still shows it, and its `paths` frontmatter keeps Claude from loading it except when the rules themselves are being worked on.

## Rules

| File | Applies to | Covers |
|------|------------|--------|
| `coding-standards.md` | Everything | Principles, functions and modules, reusable logic, errors, cleanliness |
| `testing.md` | Everything | TDD, where tests live, unit and integration tests, tests that don't go stale, hygiene |
| `logging.md` | Everything | When to log, what a line says, what never to log |
| `writing-rules.md` | Everything | Where rules and repo notes live, and how to write rules so they stay true |
| `typescript.md` | `*.ts`, `*.tsx` | Strict types, typed results, logic modules |
| `swift.md` | `*.swift`, Xcode projects | Style guides, tooling, Swift conventions |
| `rails-style-api.md` | Route table, controllers, services, repositories, models | Rails-style layering, static classes, route table conventions |
| `design.md` | `*.tsx`, `*.css`, `*.swift` | The Apple Notes design principles for every app and site |
| `web-design.md` | `*.tsx`, `*.css` | The shared, quiet layout of the Lunar Turtle sites: shell, pages, lists, type and controls |

Each file is scoped by file type or folder in its `paths` frontmatter, so a repo only loads what fits it. The API never loads the design rules, and Tossback never loads the TypeScript or web rules.

Facts and conventions that belong to one repo, such as the API's D1 migrations or Tossback's palettes, go in that repo's `CLAUDE.md` files, not here.

## How a repo uses it

```
.claude/
  rules/            git submodule of this repo
  settings.json     SessionStart hook that runs git submodule update --init
.github/dependabot.yml   gitsubmodule updates
CLAUDE.md                the repo's own notes
```

To add it to a new repo:

```bash
git submodule add -b main https://github.com/Lunar-Turtle-LLC/lunar-turtle-claude-rules.git .claude/rules
```

Then add a `gitsubmodule` entry to `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: gitsubmodule
    directory: /
    schedule:
      interval: daily
```

and copy `.claude/settings.json` from any existing repo, so a session on a fresh clone fetches the submodule. Clone with `git clone --recurse-submodules` to have the rules from the first session.

## Changing a rule

Edit it here and merge to `main`. Dependabot opens a submodule bump PR in each repo within a day, and merging that PR is how a repo picks the change up.
