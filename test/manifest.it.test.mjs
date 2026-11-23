import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access, mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const run = promisify(execFile);
const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(await readFile(join(root, "sync.json"), "utf8"));

test("every path override and exclusion names a source that exists", async () => {
  for (const repo of manifest.repos) {
    for (const sourcePath of [...Object.keys(repo.paths ?? {}), ...(repo.exclude ?? [])]) {
      await assert.doesNotReject(access(join(root, sourcePath)), `${repo.name}: ${sourcePath}`);
    }
  }
});

test("syncing a repo replaces its rules and skills with the golden copy", async () => {
  const target = await mkdtemp(join(tmpdir(), "claude-rules-"));
  await mkdir(join(target, ".claude/rules"), { recursive: true });
  await writeFile(join(target, ".claude/rules/stale.md"), "# Stale\n");
  await writeFile(join(target, "CLAUDE.md"), "# Kept\n");

  await run("node", [join(root, "scripts/sync.mjs"), manifest.repos[0].name, target]);

  const rules = await readdir(join(target, ".claude/rules"), { recursive: true });
  assert.ok(rules.includes("shared/testing.md"));
  assert.ok(!rules.includes("stale.md"));
  assert.equal(await readFile(join(target, "CLAUDE.md"), "utf8"), "# Kept\n");
});

test("syncing a repo missing from the manifest fails without touching the checkout", async () => {
  const target = await mkdtemp(join(tmpdir(), "claude-rules-"));
  await mkdir(join(target, ".claude/rules"), { recursive: true });
  await writeFile(join(target, ".claude/rules/local.md"), "# Local\n");

  await assert.rejects(run("node", [join(root, "scripts/sync.mjs"), "Example-Org/missing", target]), /not listed/);
  assert.equal(await readFile(join(target, ".claude/rules/local.md"), "utf8"), "# Local\n");
});
