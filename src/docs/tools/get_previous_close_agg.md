# REST
## Stocks

### Previous Day Bar (OHLC)

**MCPToolName** `get_previous_close_agg`

**Description:**

Retrieve the previous trading day's open, high, low, and close (OHLC) data for a specified stock ticker. This endpoint provides key pricing metrics, including volume, to help users assess recent performance and inform trading strategies.

Use Cases: Baseline comparison, technical analysis, market research, and daily reporting.

## Parameters

| Parameter      | Type    | Required | Description                                                                                                                                               |
|----------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stocksTicker` | string  | Yes      | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.                                                                           |
| `adjusted`     | boolean | No       | Whether or not the results are adjusted for splits.  By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits. |

## Sample Tool Result

```json
{
  "type": "text",
  "text": "T,v,vw,o,c,h,l,t,n\nAMAT,25748643.0,256.497,255.705,256.41,261.32,253.58,1766178000000,106174\n"
}
```