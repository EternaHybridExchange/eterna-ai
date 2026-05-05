import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();

const scannedRoots = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "docs",
  "packages/openclaw-plugin/README.md",
  "packages/openclaw-plugin/skills",
  "packages/openclaw-plugin/openclaw.plugin.json",
  "packages/openclaw-plugin/.claude-plugin/plugin.json",
  "packages/cli/README.md",
];

const allowedPaths = [
  /^docs\/consolidation\//,
  /^docs\/mcp\.md$/,
  /^AGENTS\.md$/,
  /^CONTRIBUTING\.md$/,
  /^\.github\/PULL_REQUEST_TEMPLATE\.md$/,
];

const forbidden = [
  {
    name: "stale register_agent flow",
    pattern: /\bregister_agent\b/,
  },
  {
    name: "stale direct-tool count",
    pattern: /\b12\s+(direct\s+)?tools?\b/i,
  },
  {
    name: "wrong sandbox SDK namespace",
    pattern: /\bbybit\.\*/i,
  },
  {
    name: "legacy MCP API key prefix",
    pattern: /\beterna_mcp_[A-Za-z0-9_]*(your_key_here|[a-z0-9]{4,})/i,
  },
  {
    name: "unsupported latency claim",
    pattern: /(<\s*200\s*ms|~\s*180\s*ms|~\s*80\s*ms)/i,
  },
];

const textExtensions = new Set([
  ".md",
  ".mdx",
  ".json",
  ".ts",
  ".js",
  ".mjs",
  ".yml",
  ".yaml",
]);

function extname(path) {
  const index = path.lastIndexOf(".");
  return index === -1 ? "" : path.slice(index);
}

function isAllowed(path) {
  return allowedPaths.some((pattern) => pattern.test(path));
}

async function exists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(path) {
  const absolute = join(root, path);
  if (await exists(absolute)) return [path];

  let entries;
  try {
    entries = await readdir(absolute, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const child = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(child)));
    } else if (textExtensions.has(extname(entry.name))) {
      files.push(child);
    }
  }
  return files;
}

const files = (
  await Promise.all(scannedRoots.map((path) => collectFiles(path)))
).flat();

const failures = [];

for (const file of files) {
  const normalized = relative(root, join(root, file));
  if (isAllowed(normalized)) continue;

  const text = await readFile(join(root, file), "utf8");
  for (const rule of forbidden) {
    const match = text.match(rule.pattern);
    if (match) {
      failures.push({
        file: normalized,
        rule: rule.name,
        match: match[0],
      });
    }
  }
}

if (failures.length) {
  console.error("Stale public claim check failed:");
  for (const failure of failures) {
    console.error(
      `- ${failure.file}: ${failure.rule} (${JSON.stringify(failure.match)})`,
    );
  }
  process.exit(1);
}

console.log(`Stale public claim check passed (${files.length} files scanned).`);
