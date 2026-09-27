import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const roots = ["docs/learning-world", "apps/learning-world", "packages/learning-core", "packages/game-core"];
const required = ["AGENTS.md", ".env.example", ".github/CODEOWNERS", ".github/ISSUE_TEMPLATE/learning-world.yml", ".github/PULL_REQUEST_TEMPLATE.md", "docs/learning-world/PRD.md", "docs/learning-world/architecture.md", "docs/learning-world/adr/0001-reuse-academy.md", "docs/learning-world/adr/0002-offline-first-foundation.md", "apps/learning-world/.env.example"];
for (const path of required) assert.ok(existsSync(resolve(root, path)), `Missing ${path}`);

let documents = 0;
let links = 0;
function check(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) check(path);
    else if (entry.name.endsWith(".md")) {
      documents++;
      const body = readFileSync(path, "utf8");
      for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
        const href = match[1];
        if (/^(?:https?:|mailto:|#)/.test(href)) continue;
        const target = resolve(dirname(path), decodeURIComponent(href.split("#")[0]));
        const local = relative(root, target);
        assert.ok(!local.startsWith("..") && !local.startsWith("/"), `Link escapes repository in ${path}`);
        assert.ok(existsSync(target), `Broken link ${href} in ${path}`);
        links++;
      }
    }
  }
}
for (const directory of roots) check(resolve(root, directory));
console.log(`Foundation checks passed: ${documents} documents, ${links} local links; required files present.`);
