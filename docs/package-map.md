# Package Map

This repository publishes three npm packages.

## Packages

| Package | Path | Purpose | Node engine | Publish status |
| --- | --- | --- | --- | --- |
| `@eterna-hybrid-exchange/cli` | `packages/cli` | CLI for auth, status, sandbox execution, balances, positions, and SDK lookup. | `>=20` | Published from monorepo release workflow. |
| `@eterna-hybrid-exchange/openclaw-plugin` | `packages/openclaw-plugin` | OpenClaw plugin manifest and Eterna trading skills. | `>=22` | Published from monorepo release workflow. |
| `@eterna-hybrid-exchange/eterna-trading-skill` | `packages/openclaw-plugin/packages/skill` | Skill-only OpenClaw package built from the plugin skills directory. | `>=22` | Published from monorepo release workflow. |

## Version Policy

All packages currently share the same version.

Check alignment:

```bash
npm run version:check
```

## Build And Pack

CLI:

```bash
npm run build -w @eterna-hybrid-exchange/cli
```

OpenClaw packages:

```bash
npm run pack:check
```

The skill package copies root plugin skills into `packages/openclaw-plugin/packages/skill/skills` during `prepack` and `prepublishOnly`.
