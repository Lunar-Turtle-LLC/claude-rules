# Claude rules

The golden copy of the Claude Code rules and skills for every Lunar Turtle repo. Edit rules here. A GitHub Action copies them into each repo's `.claude/` folder and opens a pull request there.

## Layout

| Path | Holds | Lands in each repo at |
|------|-------|-----------------------|
| `shared/rules/` | Rules for every repo: coding standards, testing and TDD, Apple Notes design, how to write rules | `.claude/rules/shared/` |
| `shared/skills/<skill>/` | Skills for every repo | `.claude/skills/<skill>/` |
| `stacks/<stack>/rules/` | Rules for one kind of codebase (`typescript`, `web`) | `.claude/rules/<stack>/` |
| `repos/<repo>/rules/` | Rules for one repo only | `.claude/rules/` |
| `repos/<repo>/skills/<skill>/` | Skills for one repo only | `.claude/skills/<skill>/` |
| `sync.json` | Which repos get synced, their stacks, per-repo `paths` scoping, and exclusions | |
| `scripts/` | The sync script and the matrix the workflow runs | |

A rule goes in the narrowest place that fits. If it would be true in every repo, it's shared. If it's true for every repo on one stack, it goes in that stack. Otherwise it belongs to the repo. Shared and stack rules never name a repo, file or feature; see `shared/rules/writing-rules.md`.

Each repo's `CLAUDE.md` stays in that repo and isn't synced, because it describes commands, layout and env vars that change with the code.

## Scoping a shared rule

Shared and stack rules have no `paths` frontmatter of their own, because each repo keeps its UI in a different place. `sync.json` gives a repo's `paths` for a source file, and the sync writes them as that file's frontmatter. A source file listed under `exclude` isn't synced to that repo (the API has no UI, so it skips the design rule).

## How the sync works

`.github/workflows/sync.yml` runs on every push to `main`, weekly, and on demand. For each repo in `sync.json` it checks the repo out, replaces `.claude/rules/` and `.claude/skills/` with the golden copy, and opens or updates a `claude-rules/sync` pull request. Merging that PR is how a repo picks up the change. Every synced file starts with a comment saying where to edit it, and the weekly run reverts hand edits.

Run it locally against a checkout:

```bash
node scripts/sync.mjs Lunar-Turtle-LLC/lunar-turtle-tools ../lunar-turtle-tools
```

Tests: `npm test`.

### Setup

The workflow needs a token that can push branches and open PRs in the target repos. A fine-grained token covers one owner, so there are two repository secrets on this repo:

| Secret | Fine-grained token for | Repos | Permissions |
|--------|------------------------|-------|-------------|
| `SYNC_TOKEN_LUNAR_TURTLE_LLC` | Resource owner `Lunar-Turtle-LLC` | lunar-turtle-tools, lunar-turtle-api, lunar-turtle-marketing-site, tossback-games | Contents: read and write, Pull requests: read and write |
| `SYNC_TOKEN_KHENDRICKS` | Resource owner `khendricks` | sleep-sounds | Contents: read and write, Pull requests: read and write |

Using a personal token rather than `GITHUB_TOKEN` also means the sync PRs run each repo's CI.

### Adding a repo

1. Add it to `sync.json` with its token secret, stacks and any `paths` or `exclude`.
2. Add `repos/<repo>/rules/` for anything only it needs.
3. Make sure the token for its owner covers it.

## Why a sync Action

Three ways to share one set of rules were considered:

- **Git submodule.** Each repo pins a commit of this repo, so updates still need a bump PR in each repo. Cloud sessions, Cloudflare Pages and Xcode Cloud would all need to fetch a private submodule, and a session that clones without submodules loses its rules without any error.
- **`@import` of a path outside the repo.** `CLAUDE.md` can import a file such as `~/claude-rules/...`, but only where this repo happens to be cloned next to it. Cloud sessions only have the repos they're configured with, so the rules would be missing there.
- **Sync Action (chosen).** Each repo holds real files, so the rules work in cloud sessions, locally, in CI and for other agents, with nothing extra to clone. Each change arrives as a reviewable PR. The cost is the two token secrets and one sync PR per repo to merge.
