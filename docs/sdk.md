# Eterna Sandbox SDK

The Eterna SDK is injected into the managed code execution sandbox as the global `eterna.*` object.

It is not currently an installable npm package for running Eterna programs on your own server. Agents access it by calling MCP `execute_code` or by using the Eterna CLI to execute TypeScript in the sandbox.

## Usage

```typescript
const balance = await eterna.getBalance();
return balance;
```

Rules:

- Use `await` for all SDK calls.
- Use `return` to produce the final result.
- Most exchange/account response values are strings; use `parseFloat()` before arithmetic.
- Technical-analysis methods return numbers directly.
- Keep returned objects compact.

## Account

| Method | Purpose |
| --- | --- |
| `eterna.getBalance()` | Account equity, available balance, margin, and coin balances. |
| `eterna.getPositions(symbol?)` | Open positions, optionally filtered by symbol. |
| `eterna.getOrders(symbol?)` | Active orders, optionally filtered by symbol. |
| `eterna.getAccountInfo()` | Current account metadata. |
| `eterna.getAllCoinsBalance(accountType)` | Balances by account type such as `FUND`, `UNIFIED`, or `SPOT`. |

## Market Data

| Method | Purpose |
| --- | --- |
| `eterna.getTickers(symbol?)` | Current prices, 24h stats, volume, and funding rate. |
| `eterna.getOrderbook(symbol, limit?)` | L2 orderbook snapshot. |
| `eterna.getInstruments(symbol?)` | Contract specs, tick size, quantity step, minimum order quantity, and leverage limits. |

## Trading

| Method | Purpose |
| --- | --- |
| `eterna.placeOrder(params)` | Place a market or limit order with optional TP/SL. |
| `eterna.closePosition(symbol)` | Close an entire position at market. |
| `eterna.cancelOrder(symbol, orderId)` | Cancel a single open order. |
| `eterna.cancelAllOrders(symbol?)` | Cancel all open orders, optionally filtered by symbol. |
| `eterna.setTradingStop(params)` | Set or update take-profit, stop-loss, or trailing stop. |
| `eterna.setLeverage({ symbol, leverage })` | Set leverage for a symbol. |

Example:

```typescript
await eterna.setLeverage({ symbol: "BTCUSDT", leverage: 2 });

const order = await eterna.placeOrder({
  symbol: "BTCUSDT",
  side: "Buy",
  orderType: "Market",
  qty: "0.001",
  stopLoss: "90000",
  takeProfit: "98000",
});

return order;
```

## Deposit And Funding

| Method | Purpose |
| --- | --- |
| `eterna.getAllowedDepositCoins(coin?, chain?)` | List supported deposit coins and chains. |
| `eterna.getCoinInfo(coin)` | Coin and chain metadata. |
| `eterna.getDepositAddress(coin, chainType)` | Get a deposit address for a coin and chain. |
| `eterna.getDepositRecords(coin?)` | Get deposit records, optionally filtered by coin. |
| `eterna.transferToTrading(coin, amount)` | Transfer funds from Funding to Trading wallet. |
| `eterna.swapToUsdt(coin, amount?)` | Convert a coin balance to USDT. |

## Withdrawal

| Method | Purpose |
| --- | --- |
| `eterna.getWithdrawableAmount(coin)` | Check available withdrawal balance for a coin. |
| `eterna.submitWithdrawal(coin, amount, address, chain)` | Submit a withdrawal request. |
| `eterna.getWithdrawalStatus(withdrawalRequestId?)` | Check one withdrawal or list recent withdrawal requests. |

## Technical Analysis

| Method | Purpose |
| --- | --- |
| `eterna.getRsi(symbol, interval, period?)` | Relative Strength Index. |
| `eterna.getMacd(symbol, interval, fastPeriod?, slowPeriod?, signalPeriod?)` | MACD line, signal line, and histogram. |
| `eterna.getEma(symbol, interval, period?)` | Exponential moving average. |
| `eterna.getSma(symbol, interval, period?)` | Simple moving average. |
| `eterna.getBollingerBands(symbol, interval, period?, stddev?)` | Upper, middle, and lower Bollinger Bands. |
| `eterna.getVwap(symbol, interval)` | Volume-weighted average price. |

Valid intervals:

```text
1m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w
```

## Discoverability

Agents should use MCP `search_sdk` before writing code:

```json
{
  "query": "place order stop loss take profit",
  "detail_level": "summary"
}
```

For known workflows, agents should use `search_examples`:

```json
{
  "query": "check balance place market order with stop loss",
  "limit": 3
}
```
