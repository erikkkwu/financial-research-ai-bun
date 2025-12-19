# REST
## Stocks

### Short Volume

**Endpoint:** `GET /stocks/v1/short-volume`
**MCPToolName:** `list_short_volume`

**Description:**

Retrieve daily aggregated short sale volume data reported to FINRA from off-exchange trading venues and alternative trading systems (ATS) for a specified stock ticker. Unlike short interest, which measures outstanding short positions at specific reporting intervals, short volume captures the daily trading activity of short sales. Monitoring short volume helps users detect immediate market sentiment shifts, analyze trading behavior, and identify trends in short-selling activity that may signal upcoming price movements.

Use Cases: Intraday sentiment analysis, short-sale trend identification, liquidity analysis, trading strategy optimization.