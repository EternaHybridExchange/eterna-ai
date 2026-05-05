# Contributing

This repository is the canonical home for Eterna AI public code, docs, and agent integrations.

## Repo Structure

| Path | Purpose |
| --- | --- |
| `packages/cli` | CLI source, tests, build config. |
| `packages/openclaw-plugin` | OpenClaw plugin package and skills. |
| `packages/openclaw-plugin/packages/skill` | Skill-only OpenClaw package. |
| `docs` | Canonical product, MCP, SDK, and integration docs. |

## Setup

```bash
npm install
```

## Checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run claims:check
npm run version:check
npm run pack:check
```

Run everything:

```bash
npm run verify
```

## Documentation Standards

Public docs must stay aligned with the current product model:

- OAuth-based MCP authentication in supported clients.
- MCP tools: `execute_code`, `search_sdk`, `search_examples`.
- Injected sandbox SDK exposed as `eterna.*`.
- No installable SDK package claim unless one exists.
- No current `register_agent` flow.
- No old 12 direct-tool MCP interface.

When adding marketing claims, include source links, footnotes, or clear owner-confirmed wording in the same change.

High-risk claims include:

- fees
- liquidity
- KYC
- latency
- safety controls
- supported venues/pairs
- withdrawals
- platform-enforced risk limits

## Package Notes

The CLI has real tests and TypeScript checks.

The OpenClaw plugin is mostly manifest and skill content. Validate it with:

```bash
npm run pack:check
```

See:

- `docs/package-map.md`
- `docs/release.md`

Package publishing is centralized in the manual `.github/workflows/release.yml` workflow. Do not add package-local release workflows.

## Security And Trading Safety

Agent instructions must require explicit user confirmation before any real trading or withdrawal action.

Do not bury destructive or financial actions behind vague wording. Show the user exact size, margin, leverage, stop loss, take profit, destination address, and amount where applicable.
