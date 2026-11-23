// Writes the golden copy of the rules and skills for one repo into a checkout of it.
// Usage: node scripts/sync.mjs <owner/repo> <path to checkout>
// The checkout's .claude/rules and .claude/skills are replaced, so files removed here are removed there.

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { OWNED_FOLDERS, buildPlan, findRepo, sourceRoots } from "./lib/plan.mjs";

const rulesRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

async function listFiles(folder) {
  const entries = await readdir(folder, { withFileTypes: true, recursive: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  return entries.filter((entry) => entry.isFile()).map((entry) => join(entry.parentPath, entry.name));
}

async function readSources(repo) {
  const sources = new Map();
  for (const root of sourceRoots(repo)) {
    for (const file of await listFiles(join(rulesRoot, root))) {
      sources.set(relative(rulesRoot, file), await readFile(file, "utf8"));
    }
  }
  return sources;
}

async function main([repoName, targetDir]) {
  if (!repoName || !targetDir) throw new Error("Usage: node scripts/sync.mjs <owner/repo> <path to checkout>");

  const manifest = JSON.parse(await readFile(join(rulesRoot, "sync.json"), "utf8"));
  const found = findRepo(manifest, repoName);
  if (!found.ok) throw new Error(found.error);

  const plan = buildPlan(found.repo, await readSources(found.repo));
  for (const folder of OWNED_FOLDERS) await rm(join(targetDir, folder), { recursive: true, force: true });
  for (const { destination, content } of plan) {
    const target = join(targetDir, destination);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  console.log(`Wrote ${plan.length} files to ${targetDir}`);
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
