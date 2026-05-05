# Eterna AI MCP

Eterna AI exposes a managed MCP server for AI agents that trade through Eterna Exchange.

The current MCP model is OAuth-based and code-execution-first. Agents use MCP tools to discover the sandbox SDK, search examples, and run TypeScript in a managed sandbox with the injected `eterna.*` SDK.

## Endpoint

```json
{
  "mcpServers": {
    "eterna-trading": {
      "type": "streamable-http",
      "url": "https://mcp.eterna.exchange/mcp"
    }
  }
}
```

Authentication is handled through OAuth. The legacy `register_agent` API-key flow is stale and should not be used in new docs or examples.

## MCP Tools

| Tool | Purpose |
| --- | --- |
| `execute_code` | Run TypeScript/JavaScript in the Eterna sandbox with `eterna` and `console` in scope. |
| `search_sdk` | Search sandbox SDK documentation by method name, keyword, or detail level. |
| `search_examples` | Search curated and ingested code examples for common trading workflows. |

## How Agents Should Work

1. Use `search_sdk` to find the right `eterna.*` methods.
2. Use `search_examples` when adapting a known workflow.
3. Use `execute_code` to run one compact TypeScript block.
4. Return only the data needed for the next decision.

This keeps agent workflows efficient: one `execute_code` call can fetch market data, check account state, calculate sizing, and submit an order.

## Execute Code Example

```typescript
const [balance, positions, ticker] = await Promise.all([
  eterna.getBalance(),
  eterna.getPositions("BTCUSDT"),
  eterna.getTickers("BTCUSDT"),
]);

return {
  equity: balance.list[0].totalEquity,
  availableBalance: balance.list[0].totalAvailableBalance,
  openPositions: positions.list.filter((p) => parseFloat(p.size) > 0),
  btc: {
    price: ticker.list[0].lastPrice,
    change24h: ticker.list[0].price24hPcnt,
    fundingRate: ticker.list[0].fundingRate,
  },
};
```

`execute_code` runs code as an async function body. Use `await` for SDK calls and `return` to produce the final JSON-serializable result.

## Sandbox SDK

The sandbox exposes 29 verified `eterna.*` methods across:

- account
- market data
- trading
- deposit and funding
- withdrawal
- technical analysis

See [`sdk.md`](sdk.md) for the canonical user-facing SDK reference.

## Error Handling

`execute_code` returns structured success/error payloads. Common categories include:

| Category | Meaning |
| --- | --- |
| `SYNTAX_ERROR` | The submitted code is invalid. |
| `TIMEOUT` | The code exceeded the execution timeout. |
| `INVALID_METHOD` | The code called a method that is not in the sandbox SDK. |
| `INFRASTRUCTURE_ERROR` | Execution or credential infrastructure failed. Do not blindly retry with modified code. |
| `RUNTIME_ERROR` | The code failed at runtime or accessed response fields incorrectly. |

## Documentation Rules

Do not document the old `register_agent` flow for new integrations.

Do not describe the SDK as an installable package. It is an injected SDK available inside the managed Eterna code execution sandbox.
