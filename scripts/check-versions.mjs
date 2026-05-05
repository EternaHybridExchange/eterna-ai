import { readFile } from "node:fs/promises";
import { join } from "node:path";

const packages = [
  "packages/cli/package.json",
  "packages/openclaw-plugin/package.json",
  "packages/openclaw-plugin/packages/skill/package.json",
];

const manifests = await Promise.all(
  packages.map(async (path) => {
    const manifest = JSON.parse(await readFile(join(process.cwd(), path), "utf8"));
    return { path, name: manifest.name, version: manifest.version };
  }),
);

const versions = new Set(manifests.map((manifest) => manifest.version));

if (versions.size !== 1) {
  console.error("Package version mismatch:");
  for (const manifest of manifests) {
    console.error(`- ${manifest.name} (${manifest.path}): ${manifest.version}`);
  }
  process.exit(1);
}

const [version] = versions;
console.log(`Package versions aligned at ${version}:`);
for (const manifest of manifests) {
  console.log(`- ${manifest.name}`);
}
