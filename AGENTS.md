# AGENTS.md

## Product Truth

Eterna AI is the exchange built for AI agents.

Current public model:

- Authentication is OAuth-based in supported MCP clients.
- MCP tools are `execute_code`, `search_sdk`, and `search_examples`.
- `execute_code` runs TypeScript/JavaScript in a managed sandbox.
- The sandbox injects the `eterna.*` SDK.
- The SDK is not currently an installable dependency for user projects.
- The old `register_agent` API-key flow is stale.
- The old 12 direct-tool MCP interface is stale.
- Do not publish latency claims until benchmarks are ready.

## Repository Layout

| Path | Purpose |
| --- | --- |
| `packages/cli` | Eterna CLI source. |
| `packages/openclaw-plugin` | OpenClaw plugin and skills. |
| `docs/mcp.md` | Canonical MCP docs. |
| `docs/sdk.md` | Canonical sandbox SDK docs. |
| `docs/claude.md` | Claude integration guide. |
| `docs/package-map.md` | Published package map. |
| `docs/release.md` | Manual npm release process. |

## Commands

Run from the repo root:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run claims:check
npm run version:check
npm run pack:check
npm run verify
```

## Documentation Rules

- Use `Eterna AI` for the product and `Eterna Exchange` for the venue.
- Use `sandbox SDK`, `injected SDK`, or `eterna.*` when describing the SDK.
- Do not imply users can install an SDK package unless that package exists.
- Do not describe the old `register_agent` flow as current.
- Do not describe MCP as exposing the old 12 direct tools.
- Keep broker/venue implementation details out of marketing docs.
- Fee comparisons must include footnotes or source links.
- Safety claims must distinguish prompt-level behavior from platform-enforced controls.

## Trading Safety

Changes that affect trading, withdrawals, authentication, or agent instructions require extra scrutiny.

Agent-facing instructions should always require explicit user confirmation before:

- placing orders
- closing positions
- cancelling orders
- submitting withdrawals

## Verification

Before handing off changes, run the narrowest relevant checks. For broad repo changes, run:

```bash
npm run verify
```

## Releases

Package publishing is centralized in `.github/workflows/release.yml`.

The release workflow is manual and publishes:

- `@eterna-hybrid-exchange/cli`
- `@eterna-hybrid-exchange/openclaw-plugin`
- `@eterna-hybrid-exchange/eterna-trading-skill`

Before release changes, read `docs/release.md` and run:

```bash
npm run version:check
npm run verify
```
