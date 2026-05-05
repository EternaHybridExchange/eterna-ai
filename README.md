# Eterna AI

**The exchange built for AI agents. One integration. $10B+ liquidity. The lowest fees. No KYC.**

Eterna AI gives AI agents a direct path to trade crypto perpetuals through Eterna Exchange using agent-native interfaces: a command-line client, an MCP server, and integrations for AI trading workflows.

## Why Eterna AI

### Lowest Taker Fees For AI Trading

There is a saying: "you get what you pay for." In trading, it is the opposite: you get what you do not pay for. With Eterna, your AI trading agents can be more profitable than ever before thanks to the lowest trading fees on the market.

| Rank | Platform | Taker fee |
| ---: | --- | ---: |
| 1 | **Eterna** | **0.035%** |
| 2 | Hyperliquid | 0.045%[^hyperliquid] |
| 3 | Binance Futures | 0.050%[^binance] |
| 4 | OKX Perpetuals | 0.050%[^okx] |
| 5 | dYdX | 0.050%[^dydx] |
| 6 | Kraken Futures | 0.050%[^kraken] |
| 7 | MEXC Futures API | 0.050%[^mexc] |
| 8 | Bybit direct | 0.055%[^bybit] |
| 9 | Bitget Futures | 0.060%[^bitget] |
| 10 | KuCoin Futures | 0.060%[^kucoin] |
| 11 | GMX | 0.060%[^gmx] |

Comparison uses standard/base taker fees for perpetual futures or comparable perpetual trading, using the rate that applies to typical users most of the time where a venue has tiers, regional variation, or promotions.

[^hyperliquid]: Hyperliquid Docs, fees: https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees
[^binance]: Binance Futures regular-user USDT-M futures fee references commonly list 0.050% taker. See Finder's Binance futures fee explainer: https://www.finder.com/cryptocurrency/trading/binance-futures-fees
[^okx]: OKX help, futures fee calculation: https://www.okx.com/en-ar/help/how-to-calculate-the-contract-transaction-fee
[^dydx]: dYdX help, trading fees: https://help.dydx.trade/en/articles/166995-trading-fees-on-dydx
[^kraken]: Kraken fee schedule, Futures tier table: https://www.kraken.com/features/fee-schedule
[^mexc]: MEXC announcement for API Futures trading fees: https://www.mexc.co/en-GB/announcements/article/introducing-api-futures-trading-on-mar-31-2026-17827791534551
[^bybit]: Bybit trading fee structure: https://www.bybit.com/en/help-center/article/Trading-Fee-Structure
[^bitget]: Bitget futures fee structure and calculation: https://www.bitgetapp.com/support/articles/4552966047513
[^kucoin]: KuCoin Futures fee structure: https://www.kucoin.com/announcement/en-kucoin-futures-fee-structure?lang=en_US
[^gmx]: GMX docs, open/close fees: https://docs.gmx.io/docs/trading/fees/

### Built For Agent Execution

| What agents get | Eterna AI |
| --- | --- |
| Taker fee | **0.035%** |
| Liquidity | **$10B+** |
| KYC | **No KYC** |
| Interfaces | **CLI, MCP, Claude.ai, OpenClaw** |
| Code execution | **Sandboxed TypeScript with an injected `eterna.*` SDK** |

Agents should not need to manage exchange infrastructure, build trading account plumbing, or stitch together fragile broker workflows before they can place their first trade.

## What Is Here

This repository is being consolidated into the canonical home for Eterna AI.

| Path | Status | Description |
| --- | --- | --- |
| [`packages/cli`](packages/cli) | Available | Eterna CLI for authentication, account status, strategy execution, balances, positions, and SDK reference browsing. |
| [`packages/openclaw-plugin`](packages/openclaw-plugin) | Available | OpenClaw plugin and trading skills. |
| [`docs/mcp.md`](docs/mcp.md) | Available | Canonical MCP integration docs. |
| [`docs/sdk.md`](docs/sdk.md) | Available | Canonical sandbox SDK docs. |
| [`docs/claude.md`](docs/claude.md) | Available | Claude integration and agent behavior guide. |
| [`docs/package-map.md`](docs/package-map.md) | Available | Published package map. |
| [`docs/release.md`](docs/release.md) | Available | Manual monorepo npm release process. |

## Quick Start

Run the CLI without installing it globally:

```bash
npx @eterna-hybrid-exchange/cli --help
```

Authenticate:

```bash
npx @eterna-hybrid-exchange/cli login
```

Check status:

```bash
npx @eterna-hybrid-exchange/cli status
```

Execute a strategy file:

```bash
npx @eterna-hybrid-exchange/cli execute strategy.ts
```

## AI Integrations

Eterna AI is built for agent workflows first.

- **CLI** for terminal-based agents and local automation.
- **MCP server** for Claude.ai and MCP-compatible clients.
- **OpenClaw plugin** for OpenClaw trading workflows.

Eterna AI exposes an SDK inside the managed code execution sandbox. It is not currently an installable SDK package for running Eterna programs on your own server.

More integrations are planned.

## Public Claims

Eterna AI documentation should stay specific, sourced, and current. Fee comparisons use public fee schedule links, and claims about SDK availability, MCP tools, authentication, integrations, liquidity, KYC, latency, and safety controls should only describe what is available today.

## License

MIT
