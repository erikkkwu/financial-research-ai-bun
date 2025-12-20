# REST
## Stocks

### Single Ticker Snapshot

**MCPToolName** `get_snapshot_ticker`

**Description:**

Retrieve the most recent market data snapshot for a single ticker. This endpoint consolidates the latest trade, quote, and aggregated data (minute, day, and previous day) for the specified ticker. Snapshot data is cleared at 3:30 AM EST and begins updating as exchanges report new information, which can start as early as 4:00 AM EST. By focusing on a single ticker, users can closely monitor real-time developments and incorporate up-to-date information into trading strategies, alerts, or company-level reporting.

Use Cases: Focused monitoring, real-time analysis, price alerts, investor relations.

## Parameters

| Parameter      | Type   | Required | Description                                                                     |
|----------------|--------|----------|---------------------------------------------------------------------------------|
| `stocksTicker` | string | Yes      | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc. |

## Sample Tool Result

```json
{
  "type": "text",
  "text": "ticker_ticker,ticker_todaysChangePerc,ticker_todaysChange,ticker_updated,ticker_day_o,ticker_day_h,ticker_day_l,ticker_day_c,ticker_day_v,ticker_day_vw,ticker_min_av,ticker_min_t,ticker_min_n,ticker_min_o,ticker_min_h,ticker_min_l,ticker_min_c,ticker_min_v,ticker_min_vw,ticker_prevDay_o,ticker_prevDay_h,ticker_prevDay_l,ticker_prevDay_c,ticker_prevDay_v,ticker_prevDay_vw,status,request_id\nAMAT,1.5147928994082742,3.839999999999975,1766191980000000000,255.705,261.32,253.58,256.41,25748645.0,256.497,25748459.0,1766191920000,1,257.34,257.34,257.34,257.34,100,257.34,259.09,260.82,252.225,253.5,8741172.0,254.7939,OK,30ca6e39eea9ea50290e9deab13ab96c\n"
}```