---
name: create-issue
description: Create a GitHub issue in this repo using the What / Why / Acceptance Criteria template. Use when the user asks to file, add, or track an issue, bug, task, or follow-up.
---

# Create Issue

Create a GitHub issue using the template below.

## Steps

1. Check for duplicates first: search open issues for similar titles.
2. Draft the issue from the user's request using the template. Ask only if the What, Why, or a testable acceptance criterion can't be inferred.
3. Create it with the GitHub MCP `issue_write` tool (`method: create`), or `gh issue create` if the CLI is available.
4. Reply with the issue number and link.

## Rules

- Title: short, imperative, specific (e.g. "Add swift-format lint to CI").
- Acceptance criteria are a checklist of observable, verifiable outcomes, not implementation steps. Each should be testable, in line with the testing rules.
- Reference related issues by number (`Depends on #1`).
- Only apply labels that already exist in the repo.
- What and Why are short bullet lists, not paragraphs.
- Keep it concise; omit empty sections other than the three below.

## Template

```markdown
## What

- <The change or problem, one point per bullet>
- <Another point if needed>

## Why

- <The motivation: the problem it solves or the value it adds>
- <Another reason if needed>

## Acceptance Criteria

- [ ] <Observable, testable outcome>
- [ ] <Observable, testable outcome>
```
