# REST
## Stocks

### Relative Strength Index (RSI)

**MCPToolName:** `get_rsi`

**Description:**

Retrieve the Relative Strength Index (RSI) for a specified ticker over a defined time range. The RSI measures the speed and magnitude of price changes, oscillating between 0 and 100 to help identify overbought or oversold conditions.

Use Cases: Overbought/oversold detection, divergence analysis, trend confirmation, and refining market entry/exit strategies.

## Parameters

| Parameter           | Type    | Required | Description                                                                                                                                                                                                  |
|---------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stockTicker`       | string  | Yes      | Specify a case-sensitive ticker symbol for which to get relative strength index (RSI) data. For example, AAPL represents Apple Inc.                                                                          |
| `timestamp`         | string  | No       | Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.                                                                                                                     |
| `timespan`          | string  | No       | The size of the aggregate time window.                                                                                                                                                                       |
| `adjusted`          | boolean | No       | Whether or not the aggregates used to calculate the relative strength index are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits. |
| `window`            | integer | No       | The window size used to calculate the relative strength index (RSI).                                                                                                                                         |
| `series_type`       | string  | No       | The price in the aggregate which will be used to calculate the relative strength index. i.e. 'close' will result in using close prices to  calculate the relative strength index (RSI).                      |
| `expand_underlying` | boolean | No       | Whether or not to include the aggregates used to calculate this indicator in the response.                                                                                                                   |
| `order`             | string  | No       | The order in which to return the results, ordered by timestamp.                                                                                                                                              |
| `limit`             | integer | No       | Limit the number of results returned, default is 10 and max is 5000                                                                                                                                          |
| `timestamp.gte`     | string  | No       | Range by timestamp.                                                                                                                                                                                          |
| `timestamp.gt`      | string  | No       | Range by timestamp.                                                                                                                                                                                          |
| `timestamp.lte`     | string  | No       | Range by timestamp.                                                                                                                                                                                          |
| `timestamp.lt`      | string  | No       | Range by timestamp.                                                                                                                                                                                          |

## Response Attributes

| Field                | Type          | Description                                                        |
|----------------------|---------------|--------------------------------------------------------------------|
| `request_id`         | string        | A request id assigned by the server.                               |
| `results`            | object        | The results of the RSI indicator calculation.                      |
| `results.underlying` | object        | The underlying aggregates used.                                    |
| `results.values`     | array[object] | Timestamp or indicator value.                                      |
| `status`             | string        | The status of this request's response.                             |

## Sample Tool Result

```json
{
  "underlying": {},
  "values": [
    {
      "timestamp": 1766120400000,
      "value": 53.65332358052747
    }
  ]
}
```