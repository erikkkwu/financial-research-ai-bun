# REST
## Stocks

### Custom Bars (OHLC)

**MCPToolName** `list_aggs`

**Description:**

Retrieve aggregated historical OHLC (Open, High, Low, Close) and volume data for a specified stock ticker over a custom date range and time interval in Eastern Time (ET). Aggregates are constructed exclusively from qualifying trades that meet specific conditions. If no eligible trades occur within a given timeframe, no aggregate bar is produced, resulting in an empty interval that indicates a lack of trading activity during that period. Users can tailor their data by adjusting the multiplier and timespan parameters (e.g., a 5-minute bar), covering pre-market, regular market, and after-hours sessions. This flexibility supports a broad range of analytical and visualization needs.

Use Cases: Data visualization, technical analysis, backtesting strategies, market research.