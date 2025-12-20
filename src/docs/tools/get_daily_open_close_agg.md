# REST
## Stocks

### Daily Ticker Summary (OHLC)

**MCPToolName** `get_daily_open_close_agg`

**Description:**

Retrieve the opening and closing prices for a specific stock ticker on a given date, along with any pre-market and after-hours trade prices. This endpoint provides essential daily pricing details, enabling users to evaluate performance, conduct historical analysis, and gain insights into trading activity outside regular market sessions.

Use Cases: Daily performance analysis, historical data collection, after-hours insights, portfolio tracking.

## Parameters

| Parameter      | Type    | Required | Description                                                                                                                                               |
|----------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `date`         | string  | Yes      | The date of the requested open/close in the format YYYY-MM-DD.                                                                                            |
| `stocksTicker` | string  | Yes      | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.                                                                           |
| `adjusted`     | boolean | No       | Whether or not the results are adjusted for splits.  By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits. |

## Response Attributes

| Field        | Type    | Description                                                                               |
|--------------|---------|-------------------------------------------------------------------------------------------|
| `afterHours` | number  | The close price of the ticker symbol in after hours trading.                              |
| `close`      | number  | The close price for the symbol in the given time period.                                  |
| `from`       | string  | The requested date.                                                                       |
| `high`       | number  | The highest price for the symbol in the given time period.                                |
| `low`        | number  | The lowest price for the symbol in the given time period.                                 |
| `open`       | number  | The open price for the symbol in the given time period.                                   |
| `otc`        | boolean | Whether or not this aggregate is for an OTC ticker. This field will be left off if false. |
| `preMarket`  | integer | The open price of the ticker symbol in pre-market trading.                                |
| `status`     | string  | The status of this request's response.                                                    |
| `symbol`     | string  | The exchange symbol that this item is traded under.                                       |
| `volume`     | number  | The trading volume of the symbol in the given time period.                                |

## Sample Tool Result

```json
{
  "type": "text",
  "text": "status,from,symbol,open,high,low,close,volume,afterHours,preMarket\nOK,2025-12-19,AMAT,255.705,261.32,253.58,256.41,25748645.0,257.34,253.4161\n"
}
```