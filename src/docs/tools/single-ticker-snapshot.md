# REST
## Stocks

### Single Ticker Snapshot

**MCPToolName** `get_snapshot_ticker`

**Description:**

Retrieve the most recent market data snapshot for a single ticker. This endpoint consolidates the latest trade, quote, and aggregated data (minute, day, and previous day) for the specified ticker. Snapshot data is cleared at 3:30 AM EST and begins updating as exchanges report new information, which can start as early as 4:00 AM EST. By focusing on a single ticker, users can closely monitor real-time developments and incorporate up-to-date information into trading strategies, alerts, or company-level reporting.

Use Cases: Focused monitoring, real-time analysis, price alerts, investor relations.