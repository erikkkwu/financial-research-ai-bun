# REST
## Stocks

### Short Interest

****MCPToolName:** `query_short_interest`

**Description:**

Retrieve bi-monthly aggregated short interest data reported to FINRA by broker-dealers for a specified stock ticker. Short interest represents the total number of shares sold short but not yet covered or closed out, serving as an indicator of market sentiment and potential price movements. High short interest can signal bearish sentiment or highlight opportunities such as potential short squeezes. This endpoint provides essential insights for investors monitoring market positioning and sentiment.

Use Cases: Market sentiment analysis, short-squeeze prediction, risk management, trading strategy refinement.

## Query Parameters

| Parameter                 | Type    | Required | Description                                                                                                                                                                                                                |
|---------------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ticker`                  | string  | No       | The primary ticker symbol for the stock.                                                                                                                                                                                   |
| `ticker.any_of`           | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list.                                                                                                                       |
| `ticker.gt`               | string  | No       | Filter greater than the value.                                                                                                                                                                                             |
| `ticker.gte`              | string  | No       | Filter greater than or equal to the value.                                                                                                                                                                                 |
| `ticker.lt`               | string  | No       | Filter less than the value.                                                                                                                                                                                                |
| `ticker.lte`              | string  | No       | Filter less than or equal to the value.                                                                                                                                                                                    |
| `days_to_cover`           | number  | No       | Calculated as short_interest divided by avg_daily_volume, representing the estimated number of days it would take to cover all short positions based on average trading volume. Value must be a floating point number.     |
| `days_to_cover.any_of`    | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list. Value must be a floating point number.                                                                                |
| `days_to_cover.gt`        | number  | No       | Filter greater than the value. Value must be a floating point number.                                                                                                                                                      |
| `days_to_cover.gte`       | number  | No       | Filter greater than or equal to the value. Value must be a floating point number.                                                                                                                                          |
| `days_to_cover.lt`        | number  | No       | Filter less than the value. Value must be a floating point number.                                                                                                                                                         |
| `days_to_cover.lte`       | number  | No       | Filter less than or equal to the value. Value must be a floating point number.                                                                                                                                             |
| `settlement_date`         | string  | No       | The date (formatted as YYYY-MM-DD) on which the short interest data is considered settled, typically based on exchange reporting schedules.                                                                                |
| `settlement_date.any_of`  | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list.                                                                                                                       |
| `settlement_date.gt`      | string  | No       | Filter greater than the value.                                                                                                                                                                                             |
| `settlement_date.gte`     | string  | No       | Filter greater than or equal to the value.                                                                                                                                                                                 |
| `settlement_date.lt`      | string  | No       | Filter less than the value.                                                                                                                                                                                                |
| `settlement_date.lte`     | string  | No       | Filter less than or equal to the value.                                                                                                                                                                                    |
| `avg_daily_volume`        | integer | No       | The average daily trading volume for the stock over a specified period, typically used to contextualize short interest. Value must be an integer.                                                                          |
| `avg_daily_volume.any_of` | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list. Value must be an integer.                                                                                             |
| `avg_daily_volume.gt`     | integer | No       | Filter greater than the value. Value must be an integer.                                                                                                                                                                   |
| `avg_daily_volume.gte`    | integer | No       | Filter greater than or equal to the value. Value must be an integer.                                                                                                                                                       |
| `avg_daily_volume.lt`     | integer | No       | Filter less than the value. Value must be an integer.                                                                                                                                                                      |
| `avg_daily_volume.lte`    | integer | No       | Filter less than or equal to the value. Value must be an integer.                                                                                                                                                          |
| `limit`                   | integer | No       | Limit the maximum number of results returned. Defaults to '10' if not specified. The maximum allowed limit is '50000'.                                                                                                     |
| `sort`                    | string  | No       | A comma separated list of sort columns. For each column, append '.asc' or '.desc' to specify the sort direction. The sort column defaults to 'ticker' if not specified. The sort order defaults to 'asc' if not specified. |

## Response Attributes

| Field              | Type     | Description                                                                                                                                                                     |
|--------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `avg_daily_volume` | integer  | The average daily trading volume for the stock over a specified period, typically used to contextualize short interest.                                                         |
| `days_to_cover`    | number   | Calculated as short_interest divided by avg_daily_volume, representing the estimated number of days it would take to cover all short positions based on average trading volume. |
| `settlement_date`  | string   | The date (formatted as YYYY-MM-DD) on which the short interest data is considered settled, typically based on exchange reporting schedules.                                     |
| `short_interest`   | integer  | The total number of shares that have been sold short but have not yet been covered or closed out.                                                                               |
| `ticker`           | string   | The primary ticker symbol for the stock.                                                                                                                                        |

## Sample Tool Result

```csv
settlement_date,ticker,short_interest,avg_daily_volume,days_to_cover
2025-11-28,AMAT,18983233,8381761,2.26
2025-11-14,AMAT,14815531,8399531,1.76
2025-10-31,AMAT,17115618,6465766,2.65
2025-10-15,AMAT,18525672,9270478,2
2025-09-30,AMAT,19677583,10768048,1.83
2025-09-15,AMAT,19925504,6645596,3
2025-08-29,AMAT,22434407,7407575,3.03
2025-08-15,AMAT,16338333,8734892,1.87
2025-07-31,AMAT,15328085,6080616,2.52
2025-07-15,AMAT,15212681,6215669,2.45
```