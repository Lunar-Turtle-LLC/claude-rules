# Claude rules

The golden copy of the core Claude Code rules shared by every Lunar Turtle repo. Each repo pulls this repo in as a git submodule and links `rules/` into its own `.claude/rules/`. Dependabot keeps the submodule current.

## Rules

| File | Applies to | Covers |
|------|------------|--------|
| `rules/coding-standards.md` | Everything | Principles, functions and modules, reusable logic, errors, cleanliness |
| `rules/testing.md` | Everything | TDD, unit and integration tests, tests that don't go stale, hygiene |
| `rules/logging.md` | Everything | When to log, what a line says, what never to log |
| `rules/writing-rules.md` | Everything | Where rules live and how to write them so they stay true |
| `rules/typescript.md` | `*.ts`, `*.tsx` | Strict types, typed results, logic modules |
| `rules/swift.md` | `*.swift`, Xcode projects | Style guides, tooling, Swift conventions |
| `rules/rails-style-api.md` | Route table, controllers, services, repositories, models | Rails-style layering, static classes, route table conventions |
| `rules/design.md` | `*.tsx`, `*.css`, `*.swift` | The Apple Notes design principles for every app and site |
| `rules/web-design.md` | `*.tsx`, `*.css` | How those principles look on a Tailwind site with the charcoal and copper tokens |

Each file is scoped by file type or folder in its `paths` frontmatter, so a repo only loads what fits it. The API never loads the design rules, and Tossback never loads the TypeScript or web rules.

Rules that only one repo needs, such as the API's architecture or Tossback's palettes, stay in that repo's `.claude/rules/`.

## How a repo uses it

```
.claude/
  claude-rules/      git submodule of this repo
  rules/
    core -> ../claude-rules/rules    symlink, loaded by Claude Code
    <repo's own rules>.md
.github/dependabot.yml               gitsubmodule updates
```

To add it to a new repo:

```bash
git submodule add https://github.com/Lunar-Turtle-LLC/claude-rules.git .claude/claude-rules
ln -s ../claude-rules/rules .claude/rules/core
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

Clone repos with `git clone --recurse-submodules`, or run `git submodule update --init` in an existing clone. Without it, `.claude/rules/core` points at an empty folder and the core rules don't load.

## Changing a rule

Edit it here and merge to `main`. Dependabot opens a submodule bump PR in each repo within a day, and merging that PR is how a repo picks the change up.
