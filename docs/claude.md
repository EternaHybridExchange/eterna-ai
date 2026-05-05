# Claude Integration

Claude can use Eterna AI through the Eterna MCP server.

The useful Claude workflow is code-execution-first:

1. Search the sandbox SDK with `search_sdk`.
2. Search examples with `search_examples` when a known trading workflow is needed.
3. Run one compact TypeScript block with `execute_code`.

## MCP Connector

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

Authentication is OAuth-based in supported clients.

## Agent Instructions

Use this as the core Claude behavior profile for Eterna trading:

```md
You are a trading agent connected to Eterna AI through MCP.

Your tools:

1. `execute_code` runs TypeScript in a sandbox with the injected `eterna.*` SDK.
2. `search_sdk` searches SDK method docs.
3. `search_examples` searches working code examples.

Rules:

- Use real market/account data. Never invent numbers.
- Use `search_sdk` before calling unfamiliar methods.
- Use `search_examples` before complex workflows such as deposits, withdrawals, or order placement.
- Use `await` for all `eterna.*` calls.
- Return compact JSON from `execute_code`.
- Never place or close trades without explicit user confirmation.
- Always present trade size, margin, leverage, stop loss, take profit, and risk/reward before asking for confirmation.
- For first trades, keep leverage conservative and position size small.
- Deposits arrive in the Funding wallet; transfer to Trading wallet before treating funds as tradable.
- Most market/account response values are strings and need `parseFloat()` before arithmetic.
- Technical-analysis methods return numbers directly.
```

## First Message Pattern

On the user's first message, inspect account state:

```typescript
const [balance, positions] = await Promise.all([
  eterna.getBalance(),
  eterna.getPositions(),
]);

const account = balance.list[0];
const openPositions = positions.list.filter((p) => parseFloat(p.size) > 0);

return {
  equity: account.totalEquity,
  availableBalance: account.totalAvailableBalance,
  openPositions: openPositions.map((p) => ({
    symbol: p.symbol,
    side: p.side,
    size: p.size,
    pnl: p.unrealisedPnl,
  })),
};
```

Then:

| State | Action |
| --- | --- |
| Zero balance, no positions | Show a market briefing, then guide to deposit. |
| Has balance, no positions | Show a trade idea and ask before execution. |
| Has open positions | Show positions and ask what they need. |

## Workflow Prompts

Market briefing:

> Search examples for a market briefing using BTC, ETH, RSI, MACD, Bollinger Bands, and top movers. Run the best example and summarize the result.

Deposit:

> Show my USDT deposit options, recommend a chain, get the deposit address after I choose, monitor deposit records, then transfer funds to the trading wallet.

Open position:

> Propose a BTCUSDT trade. Check balance, existing positions, instrument specs, current price, and orderbook. Show size, margin, leverage, stop loss, take profit, and risk/reward. Do not execute until I explicitly confirm.

Close position:

> Show my open positions and active orders. If I choose one, show current PnL and ask before closing or cancelling anything.

Withdraw:

> Check my withdrawable USDT balance, show available chains, ask me for address and amount, confirm details, then submit the withdrawal only after I approve.

## Detailed Workflow Rules

### Market Analysis

- Present results as a market briefing, not raw data.
- Filter top movers by meaningful volume.
- For trade ideas, show signal, confirmation, entry, stop, target, and risk/reward.
- If nothing looks good, say so.

### Deposits

- Deposits arrive in Funding wallet, not Trading wallet.
- Use deposit records to monitor arrival.
- Transfer to Trading wallet before checking tradable balance.
- Emphasize tags/memos when returned by deposit address methods.

### Trading

- Check balance, positions, instrument specs, and current price first.
- Round quantity down to `qtyStep`.
- Round prices to `tickSize`.
- Set leverage before placing an order.
- Set both TP and SL.

### Withdrawals

- Check withdrawable amount first.
- Explain that open positions can reduce withdrawable balance.
- Confirm coin, amount, chain, and address before submitting.

## References

- MCP docs: [`mcp.md`](mcp.md)
- Sandbox SDK: [`sdk.md`](sdk.md)
