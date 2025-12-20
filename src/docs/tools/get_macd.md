# REST
## Stocks

### Moving Average Convergence/Divergence (MACD)

**MCPToolName:** `get_macd`

**Description:**

Retrieve the Moving Average Convergence/Divergence (MACD) for a specified ticker over a defined time range. MACD is a momentum indicator derived from two moving averages, helping to identify trend strength, direction, and potential trading signals.

Use Cases: Momentum analysis, signal generation (crossover events), spotting overbought/oversold conditions, and confirming trend directions.

## Parameters

| Parameter           | Type    | Required | Description                                                                                                                                                                               |
|---------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stockTicker`       | string  | Yes      | Specify a case-sensitive ticker symbol for which to get moving average convergence/divergence (MACD) data. For example, AAPL represents Apple Inc.                                        |
| `timestamp`         | string  | No       | Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.                                                                                                  |
| `timespan`          | string  | No       | The size of the aggregate time window.                                                                                                                                                    |
| `adjusted`          | boolean | No       | Whether or not the aggregates used to calculate the MACD are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits. |
| `short_window`      | integer | No       | The short window size used to calculate MACD data.                                                                                                                                        |
| `long_window`       | integer | No       | The long window size used to calculate MACD data.                                                                                                                                         |
| `signal_window`     | integer | No       | The window size used to calculate the MACD signal line.                                                                                                                                   |
| `series_type`       | string  | No       | The price in the aggregate which will be used to calculate the MACD. i.e. 'close' will result in using close prices to  calculate the MACD.                                               |
| `expand_underlying` | boolean | No       | Whether or not to include the aggregates used to calculate this indicator in the response.                                                                                                |
| `order`             | string  | No       | The order in which to return the results, ordered by timestamp.                                                                                                                           |
| `limit`             | integer | No       | Limit the number of results returned, default is 10 and max is 5000                                                                                                                       |
| `timestamp.gte`     | string  | No       | Range by timestamp.                                                                                                                                                                       |
| `timestamp.gt`      | string  | No       | Range by timestamp.                                                                                                                                                                       |
| `timestamp.lte`     | string  | No       | Range by timestamp.                                                                                                                                                                       |
| `timestamp.lt`      | string  | No       | Range by timestamp.                                                                                                                                                                       |

## Response Attributes

| Field                | Type          | Description                                                                                          |
|----------------------|---------------|------------------------------------------------------------------------------------------------------|
| `results`            | object        | The results of the MACD indicator calculation.                                                       |
| `results.underlying` | object        | The underlying aggregates used.                                                                      |
| `results.values`     | array[object] | Each entry in the values array represents MACD indicator data for a specific timestamp and includes: |

## Sample Tool Result

```json
{
  "underlying": {},
  "values": [
    {
      "timestamp": 1766120400000,
      "value": 5.976703219336542,
      "signal": 8.431312088355003,
      "histogram": -2.454608869018461
    }
  ]
}```