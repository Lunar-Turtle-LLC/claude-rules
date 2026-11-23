export function buildRepo(overrides = {}) {
  return { name: "Example-Org/example-app", tokenSecret: "SYNC_TOKEN_EXAMPLE", stacks: [], paths: {}, ...overrides };
}

export function buildManifest(repos = [buildRepo()]) {
  return { repos };
}
