---
name: ship-it
description: Commit the current changes, push to a branch, and open a pull request with the standard bullet-point template. Use when the user says "ship it" or asks to commit, push, and open a PR.
disable-model-invocation: true
---

# Ship It

Commit, push, and open a PR for the current changes.

## Steps

1. Run `git status` and `git diff` to review what will ship. If there is nothing to commit, say so and stop.
2. Run the test and lint commands from `CLAUDE.md`. If they fail, stop and report; never ship red. Skip only commands that are still `TODO`, and say so.
3. If on `main`, create a branch first. Never push directly to `main`. Name it `<type>/<short-kebab-summary>` (e.g. `feat/add-ci-lint`).
4. Stage files by name (no `git add -A`; never stage secrets). Commit with a concise imperative message, one logical change per commit.
5. Push with `git push -u origin <branch>`.
6. Check for an existing PR for the branch. If one exists, stop after the push and report its link.
7. Open the PR with the GitHub MCP `create_pull_request` tool, targeting `main`, using the template below. If the repo has its own PR template, prefer its headings.
8. Reply with the PR link.

## Rules

- PR title: short, imperative, under 70 characters.
- Every section is bullets, one point per bullet; no paragraphs.
- Link issues with `Closes #N` (or `Refs #N` if the PR only partly addresses it).
- Testing lists what was actually run and the result. Never claim tests passed that were not run.
- Keep it concise; omit **Related** if there are no issues.
- End commit messages and the PR body with any attribution lines the environment specifies.

## PR Template

```markdown
## Summary

- <What this PR does and why, in one or two bullets>

## Changes

- <Notable change>
- <Notable change>

## Testing

- <Command run and result, or "Not run: reason">

## Related

- Closes #<issue>
```
