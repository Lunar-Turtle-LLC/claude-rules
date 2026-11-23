import { test } from "node:test";
import assert from "node:assert/strict";
import { SOURCE_REPO, buildMatrix, buildPlan, destinationFor, findRepo, renderFile, sourceRoots } from "../scripts/lib/plan.mjs";
import { buildManifest, buildRepo } from "./support/factories.mjs";

test("finds a repo listed in the manifest", () => {
  const repo = buildRepo();
  assert.deepEqual(findRepo(buildManifest([repo]), repo.name), { ok: true, repo });
});

test("reports a repo missing from the manifest", () => {
  const result = findRepo(buildManifest(), "Example-Org/missing");
  assert.equal(result.ok, false);
  assert.match(result.error, /Example-Org\/missing/);
});

test("reads shared, stack and repo sources for a repo", () => {
  const roots = sourceRoots(buildRepo({ stacks: ["typescript"] }));
  assert.deepEqual(roots, [
    "shared/rules",
    "shared/skills",
    "stacks/typescript/rules",
    "repos/example-app/rules",
    "repos/example-app/skills",
  ]);
});

test("places each kind of source where Claude Code loads it", () => {
  assert.equal(destinationFor("shared/rules/testing.md"), ".claude/rules/shared/testing.md");
  assert.equal(destinationFor("shared/skills/create-issue/SKILL.md"), ".claude/skills/create-issue/SKILL.md");
  assert.equal(destinationFor("stacks/web/rules/design.md"), ".claude/rules/web/design.md");
  assert.equal(destinationFor("repos/example-app/rules/layout.md"), ".claude/rules/layout.md");
  assert.equal(destinationFor("repos/example-app/skills/ship-it/SKILL.md"), ".claude/skills/ship-it/SKILL.md");
});

test("rejects a source outside the known folders", () => {
  assert.throws(() => destinationFor("notes/todo.md"), /notes\/todo.md/);
});

test("marks a synced rule with where to edit it", () => {
  const content = renderFile(buildRepo(), "shared/rules/testing.md", "# Testing\n");
  assert.equal(content, `<!-- Synced from ${SOURCE_REPO} (shared/rules/testing.md). Edit it there; changes made here are overwritten. -->\n\n# Testing\n`);
});

test("keeps a rule's own frontmatter first", () => {
  const content = renderFile(buildRepo(), "repos/example-app/rules/tests.md", '---\npaths:\n  - "test/**"\n---\n\n# Tests\n');
  assert.ok(content.startsWith('---\npaths:\n  - "test/**"\n---\n\n<!-- Synced'));
  assert.ok(content.endsWith("# Tests\n"));
});

test("scopes a shared rule to the paths the repo gives it", () => {
  const repo = buildRepo({ paths: { "shared/rules/design.md": ["src/**/*.tsx", "src/**/*.css"] } });
  const content = renderFile(repo, "shared/rules/design.md", "# Design\n");
  assert.ok(content.startsWith('---\npaths:\n  - "src/**/*.tsx"\n  - "src/**/*.css"\n---\n\n<!-- Synced'));
});

test("replaces a source's frontmatter when the repo overrides its paths", () => {
  const repo = buildRepo({ paths: { "shared/rules/design.md": ["app/**"] } });
  const content = renderFile(repo, "shared/rules/design.md", '---\npaths:\n  - "src/**"\n---\n# Design\n');
  assert.doesNotMatch(content, /src\/\*\*/);
  assert.match(content, /app\/\*\*/);
});

test("copies files that aren't markdown unchanged", () => {
  assert.equal(renderFile(buildRepo(), "shared/skills/tool/run.sh", "echo hi\n"), "echo hi\n");
});

test("leaves out sources the repo excludes", () => {
  const repo = buildRepo({ exclude: ["shared/rules/design.md"] });
  const sources = new Map([
    ["shared/rules/design.md", "# Design\n"],
    ["shared/rules/testing.md", "# Testing\n"],
  ]);
  assert.deepEqual(
    buildPlan(repo, sources).map((file) => file.destination),
    [".claude/rules/shared/testing.md"],
  );
});

test("builds one sync job per repo with its token secret", () => {
  const manifest = buildManifest([buildRepo(), buildRepo({ name: "Someone/other", tokenSecret: "SYNC_TOKEN_SOMEONE" })]);
  assert.deepEqual(buildMatrix(manifest), [
    { repo: "Example-Org/example-app", tokenSecret: "SYNC_TOKEN_EXAMPLE" },
    { repo: "Someone/other", tokenSecret: "SYNC_TOKEN_SOMEONE" },
  ]);
});
