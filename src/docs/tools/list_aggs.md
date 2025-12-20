# REST
## Stocks

### Custom Bars (OHLC)

**MCPToolName** `list_aggs`

**Description:**

Retrieve aggregated historical OHLC (Open, High, Low, Close) and volume data for a specified stock ticker over a custom date range and time interval in Eastern Time (ET). Aggregates are constructed exclusively from qualifying trades that meet specific conditions. If no eligible trades occur within a given timeframe, no aggregate bar is produced, resulting in an empty interval that indicates a lack of trading activity during that period. Users can tailor their data by adjusting the multiplier and timespan parameters (e.g., a 5-minute bar), covering pre-market, regular market, and after-hours sessions. This flexibility supports a broad range of analytical and visualization needs.

Use Cases: Data visualization, technical analysis, backtesting strategies, market research.

## Path Parameters

| Parameter      | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                  |
|----------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stocksTicker` | string  | Yes      | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc.                                                                                                                                                                                                                                                              |
| `multiplier`   | integer | Yes      | The size of the timespan multiplier.                                                                                                                                                                                                                                                                                                         |
| `timespan`     | string  | Yes      | The size of the time window.                                                                                                                                                                                                                                                                                                                 |
| `from`         | string  | Yes      | The start of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.                                                                                                                                                                                                                                 |
| `to`           | string  | Yes      | The end of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.                                                                                                                                                                                                                                   |
| `adjusted`     | boolean | No       | Whether or not the results are adjusted for splits.  By default, results are adjusted. Set this to false to get results that are NOT adjusted for splits.                                                                                                                                                                                    |
| `sort`         | N/A     | No       | Sort the results by timestamp. `asc` will return results in ascending order (oldest at the top), `desc` will return results in descending order (newest at the top).                                                                                                                                                                         |
| `limit`        | integer | No       | Limits the number of base aggregates queried to create the aggregate results. Max 50000 and Default 5000. Read more about how limit is used to calculate aggregate results in our article on <a href="https://massive.com/blog/aggs-api-updates/" target="_blank" alt="Aggregate Data API Improvements">Aggregate Data API Improvements</a>. |

## Sample Tool Result

```json
{
  "type": "text",
  "text": "v,vw,o,c,h,l,t,n\n15336722.0,163.019,159.98,163.59,164.73,158.958,1734670800000,92640\n5040203.0,166.7239,164.77,167.46,167.69,164.165,1734930000000,71109\n"
}
```