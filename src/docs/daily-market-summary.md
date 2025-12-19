# REST
## Stocks

### Daily Market Summary (OHLC)

**Endpoint:** `GET /v2/aggs/grouped/locale/us/market/stocks/{date}`
**MCPToolName** `get_grouped_daily_aggs`

**Description:**

Retrieve daily OHLC (open, high, low, close), volume, and volume-weighted average price (VWAP) data for all U.S. stocks on a specified trading date. This endpoint returns comprehensive market coverage in a single request, enabling wide-scale analysis, bulk data processing, and research into broad market performance.

Use Cases: Market overview, bulk data processing, historical research, and portfolio comparison.

## Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | string | Yes | The beginning date for the aggregate window. |

## Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `adjusted` | boolean | No | Whether or not the results are adjusted for splits.  By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.  |
| `include_otc` | boolean | No | Include OTC securities in the response. Default is false (don't include OTC securities).  |

## Sample Response

```json
{
  "adjusted": true,
  "queryCount": 3,
  "request_id": {
    "description": "A request id assigned by the server.",
    "type": "string"
  },
  "results": [
    {
      "T": "KIMpL",
      "c": 25.9102,
      "h": 26.25,
      "l": 25.91,
      "n": 74,
      "o": 26.07,
      "t": 1602705600000,
      "v": 4369,
      "vw": 26.0407
    },
    {
      "T": "TANH",
      "c": 23.4,
      "h": 24.763,
      "l": 22.65,
      "n": 1096,
      "o": 24.5,
      "t": 1602705600000,
      "v": 25933.6,
      "vw": 23.493
    },
    {
      "T": "VSAT",
      "c": 34.24,
      "h": 35.47,
      "l": 34.21,
      "n": 4966,
      "o": 34.9,
      "t": 1602705600000,
      "v": 312583,
      "vw": 34.4736
    }
  ],
  "resultsCount": 3,
  "status": "OK"
}
```