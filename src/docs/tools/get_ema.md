# REST
## Stocks

### Get EMA

**MCPToolName:** `get_ema`

**Description:**

Retrieve the Exponential Moving Average (EMA) for a specified ticker over a defined time range. The EMA places greater weight on recent prices, enabling quicker trend detection and more responsive signals.

Use Cases: Trend identification, EMA crossover signals, dynamic support/resistance levels, and adjusting strategies based on recent market volatility.
## Parameters

| Parameter           | Type    | Required | Description                                                                                                                                                                                                     |
|---------------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stockTicker`       | string  | Yes      | Specify a case-sensitive ticker symbol for which to get exponential moving average (EMA) data. For example, AAPL represents Apple Inc.                                                                          |
| `timestamp`         | string  | No       | Query by timestamp. Either a date with the format YYYY-MM-DD or a millisecond timestamp.                                                                                                                        |
| `timespan`          | string  | No       | The size of the aggregate time window.                                                                                                                                                                          |
| `adjusted`          | boolean | No       | Whether or not the aggregates used to calculate the exponential moving average are adjusted for splits. By default, aggregates are adjusted. Set this to false to get results that are NOT adjusted for splits. |
| `window`            | integer | No       | The window size used to calculate the exponential moving average (EMA). i.e. a window size of 10 with daily aggregates would result in a 10 day moving average.                                                 |
| `series_type`       | string  | No       | The price in the aggregate which will be used to calculate the exponential moving average. i.e. 'close' will result in using close prices to  calculate the exponential moving average (EMA).                   |
| `expand_underlying` | boolean | No       | Whether or not to include the aggregates used to calculate this indicator in the response.                                                                                                                      |
| `order`             | string  | No       | The order in which to return the results, ordered by timestamp.                                                                                                                                                 |
| `limit`             | integer | No       | Limit the number of results returned, default is 10 and max is 5000                                                                                                                                             |
| `timestamp.gte`     | string  | No       | Range by timestamp.                                                                                                                                                                                             |
| `timestamp.gt`      | string  | No       | Range by timestamp.                                                                                                                                                                                             |
| `timestamp.lte`     | string  | No       | Range by timestamp.                                                                                                                                                                                             |
| `timestamp.lt`      | string  | No       | Range by timestamp.                                                                                                                                                                                             |

## Response Attributes

| Field                | Type          | Description                                                        |
|----------------------|---------------|--------------------------------------------------------------------|
| `results`            | object        | The results of the EMA indicator calculation.                      |
| `results.underlying` | object        | The underlying aggregates used.                                    |
| `results.values`     | array[object] | Timestamp or indicator value.                                      |

## Sample Tool Result

```json
{
  "underlying": {},
  "values": [
    {
      "timestamp": 1766120400000,
      "value": 257.8350527814556
    }
  ]
}
```