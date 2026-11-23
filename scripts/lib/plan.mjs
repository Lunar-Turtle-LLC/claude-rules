// Pure functions that decide what the sync writes into a target repo.
// They take the manifest and source file contents and return results; all file I/O lives in sync.mjs.

export const SOURCE_REPO = "Lunar-Turtle-LLC/claude-rules";
export const OWNED_FOLDERS = [".claude/rules", ".claude/skills"];

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;

export function findRepo(manifest, repoName) {
  const repo = manifest.repos.find((candidate) => candidate.name === repoName);
  if (!repo) return { ok: false, error: `${repoName} is not listed in sync.json` };
  return { ok: true, repo };
}

export function repoFolder(repoName) {
  return repoName.split("/")[1];
}

export function sourceRoots(repo) {
  return [
    "shared/rules",
    "shared/skills",
    ...repo.stacks.map((stack) => `stacks/${stack}/rules`),
    `repos/${repoFolder(repo.name)}/rules`,
    `repos/${repoFolder(repo.name)}/skills`,
  ];
}

export function selectSources(repo, sourcePaths) {
  const excluded = new Set(repo.exclude ?? []);
  return sourcePaths.filter((sourcePath) => !excluded.has(sourcePath));
}

export function destinationFor(sourcePath) {
  const parts = sourcePath.split("/");
  const [scope] = parts;
  if (scope === "shared" && parts[1] === "rules") return `.claude/rules/shared/${parts.slice(2).join("/")}`;
  if (scope === "shared" && parts[1] === "skills") return `.claude/skills/${parts.slice(2).join("/")}`;
  if (scope === "stacks" && parts[2] === "rules") return `.claude/rules/${parts[1]}/${parts.slice(3).join("/")}`;
  if (scope === "repos" && parts[2] === "rules") return `.claude/rules/${parts.slice(3).join("/")}`;
  if (scope === "repos" && parts[2] === "skills") return `.claude/skills/${parts.slice(3).join("/")}`;
  throw new Error(`No destination for ${sourcePath}`);
}

function pathsFrontmatter(paths) {
  const lines = paths.map((pattern) => `  - "${pattern}"`).join("\n");
  return `---\npaths:\n${lines}\n---\n`;
}

function syncedNotice(sourcePath) {
  return `<!-- Synced from ${SOURCE_REPO} (${sourcePath}). Edit it there; changes made here are overwritten. -->\n`;
}

export function renderMarkdown(sourcePath, content, pathOverride) {
  const frontmatter = content.match(FRONTMATTER)?.[0] ?? "";
  const body = content.slice(frontmatter.length).replace(/^\n+/, "");
  const header = pathOverride ? pathsFrontmatter(pathOverride) : frontmatter;
  const spacer = header ? "\n" : "";
  return `${header}${spacer}${syncedNotice(sourcePath)}\n${body}`;
}

export function renderFile(repo, sourcePath, content) {
  if (!sourcePath.endsWith(".md")) return content;
  return renderMarkdown(sourcePath, content, repo.paths?.[sourcePath]);
}

export function buildPlan(repo, sources) {
  return selectSources(repo, [...sources.keys()]).map((sourcePath) => ({
    destination: destinationFor(sourcePath),
    content: renderFile(repo, sourcePath, sources.get(sourcePath)),
  }));
}

export function buildMatrix(manifest) {
  return manifest.repos.map((repo) => ({ repo: repo.name, tokenSecret: repo.tokenSecret }));
}
