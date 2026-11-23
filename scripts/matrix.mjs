// Prints the sync workflow's job matrix (one entry per repo in sync.json) as JSON.

import { readFile } from "node:fs/promises";
import { buildMatrix } from "./lib/plan.mjs";

const manifest = JSON.parse(await readFile(new URL("../sync.json", import.meta.url), "utf8"));
console.log(JSON.stringify(buildMatrix(manifest)));
