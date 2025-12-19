# REST
## Stocks

### Previous Day Bar (OHLC)

**Endpoint:** `GET /v2/aggs/ticker/{stocksTicker}/prev`
**MCPToolName** `get_previous_close_agg`

**Description:**

Retrieve the previous trading day's open, high, low, and close (OHLC) data for a specified stock ticker. This endpoint provides key pricing metrics, including volume, to help users assess recent performance and inform trading strategies.

Use Cases: Baseline comparison, technical analysis, market research, and daily reporting.

## Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `stocksTicker` | string | Yes | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc. |

## Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `adjusted` | boolean | No | Whether or not the results are adjusted for splits.  By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.  |

## Sample Response

```json
{
  "adjusted": true,
  "queryCount": 1,
  "request_id": "6a7e466379af0a71039d60cc78e72282",
  "results": [
    {
      "T": "AAPL",
      "c": 115.97,
      "h": 117.59,
      "l": 114.13,
      "o": 115.55,
      "t": 1605042000000,
      "v": 131704427,
      "vw": 116.3058
    }
  ],
  "resultsCount": 1,
  "status": "OK",
  "ticker": "AAPL"
}
```