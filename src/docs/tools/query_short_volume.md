# REST
## Stocks

### Short Volume

**MCPToolName:** `query_short_volume`

**Description:**

Retrieve daily aggregated short sale volume data reported to FINRA from off-exchange trading venues and alternative trading systems (ATS) for a specified stock ticker. Unlike short interest, which measures outstanding short positions at specific reporting intervals, short volume captures the daily trading activity of short sales. Monitoring short volume helps users detect immediate market sentiment shifts, analyze trading behavior, and identify trends in short-selling activity that may signal upcoming price movements.

Use Cases: Intraday sentiment analysis, short-sale trend identification, liquidity analysis, trading strategy optimization.

## Query Parameters

| Parameter                   | Type    | Required | Description                                                                                                                                                                                                                |
|-----------------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ticker`                    | string  | No       | The primary ticker symbol for the stock.                                                                                                                                                                                   |
| `ticker.any_of`             | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list.                                                                                                                       |
| `ticker.gt`                 | string  | No       | Filter greater than the value.                                                                                                                                                                                             |
| `ticker.gte`                | string  | No       | Filter greater than or equal to the value.                                                                                                                                                                                 |
| `ticker.lt`                 | string  | No       | Filter less than the value.                                                                                                                                                                                                |
| `ticker.lte`                | string  | No       | Filter less than or equal to the value.                                                                                                                                                                                    |
| `date`                      | string  | No       | The date of trade activity reported in the format YYYY-MM-DD                                                                                                                                                               |
| `date.any_of`               | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list.                                                                                                                       |
| `date.gt`                   | string  | No       | Filter greater than the value.                                                                                                                                                                                             |
| `date.gte`                  | string  | No       | Filter greater than or equal to the value.                                                                                                                                                                                 |
| `date.lt`                   | string  | No       | Filter less than the value.                                                                                                                                                                                                |
| `date.lte`                  | string  | No       | Filter less than or equal to the value.                                                                                                                                                                                    |
| `short_volume_ratio`        | number  | No       | The percentage of total volume that was sold short. Calculated as (short_volume / total_volume) * 100. Value must be a floating point number.                                                                              |
| `short_volume_ratio.any_of` | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list. Value must be a floating point number.                                                                                |
| `short_volume_ratio.gt`     | number  | No       | Filter greater than the value. Value must be a floating point number.                                                                                                                                                      |
| `short_volume_ratio.gte`    | number  | No       | Filter greater than or equal to the value. Value must be a floating point number.                                                                                                                                          |
| `short_volume_ratio.lt`     | number  | No       | Filter less than the value. Value must be a floating point number.                                                                                                                                                         |
| `short_volume_ratio.lte`    | number  | No       | Filter less than or equal to the value. Value must be a floating point number.                                                                                                                                             |
| `total_volume`              | integer | No       | Total reported volume across all venues for the ticker on the given date. Value must be an integer.                                                                                                                        |
| `total_volume.any_of`       | string  | No       | Filter equal to any of the values. Multiple values can be specified by using a comma separated list. Value must be an integer.                                                                                             |
| `total_volume.gt`           | integer | No       | Filter greater than the value. Value must be an integer.                                                                                                                                                                   |
| `total_volume.gte`          | integer | No       | Filter greater than or equal to the value. Value must be an integer.                                                                                                                                                       |
| `total_volume.lt`           | integer | No       | Filter less than the value. Value must be an integer.                                                                                                                                                                      |
| `total_volume.lte`          | integer | No       | Filter less than or equal to the value. Value must be an integer.                                                                                                                                                          |
| `limit`                     | integer | No       | Limit the maximum number of results returned. Defaults to '10' if not specified. The maximum allowed limit is '50000'.                                                                                                     |
| `sort`                      | string  | No       | A comma separated list of sort columns. For each column, append '.asc' or '.desc' to specify the sort direction. The sort column defaults to 'ticker' if not specified. The sort order defaults to 'asc' if not specified. |

## Response Attributes

| Field                                 | Type    | Description                                                                                            |
|---------------------------------------|---------|--------------------------------------------------------------------------------------------------------|
| `adf_short_volume`                    | integer | Short volume reported via the Alternative Display Facility (ADF), excluding exempt volume.             |
| `adf_short_volume_exempt`             | integer | Short volume reported via ADF that was marked as exempt.                                               |
| `date`                                | string  | The date of trade activity reported in the format YYYY-MM-DD                                           |
| `exempt_volume`                       | integer | Portion of short volume that was marked as exempt from regulation SHO.                                 |
| `nasdaq_carteret_short_volume`        | integer | Short volume reported from Nasdaq's Carteret facility, excluding exempt volume.                        |
| `nasdaq_carteret_short_volume_exempt` | integer | Short volume from Nasdaq Carteret that was marked as exempt.                                           |
| `nasdaq_chicago_short_volume`         | integer | Short volume reported from Nasdaq's Chicago facility, excluding exempt volume.                         |
| `nasdaq_chicago_short_volume_exempt`  | integer | Short volume from Nasdaq Chicago that was marked as exempt.                                            |
| `non_exempt_volume`                   | integer | Portion of short volume that was not exempt from regulation SHO (i.e., short_volume - exempt_volume).  |
| `nyse_short_volume`                   | integer | Short volume reported from NYSE facilities, excluding exempt volume.                                   |
| `nyse_short_volume_exempt`            | integer | Short volume from NYSE facilities that was marked as exempt.                                           |
| `short_volume`                        | integer | Total number of shares sold short across all venues for the ticker on the given date.                  |
| `short_volume_ratio`                  | number  | The percentage of total volume that was sold short. Calculated as (short_volume / total_volume) * 100. |
| `ticker`                              | string  | The primary ticker symbol for the stock.                                                               |
| `total_volume`                        | integer | Total reported volume across all venues for the ticker on the given date.                              |

## Sample Response

```csv
ticker,date,total_volume,short_volume,exempt_volume,non_exempt_volume,short_volume_ratio,nyse_short_volume,nyse_short_volume_exempt,nasdaq_carteret_short_volume,nasdaq_carteret_short_volume_exempt,nasdaq_chicago_short_volume,nasdaq_chicago_short_volume_exempt,adf_short_volume,adf_short_volume_exempt
AMAT,2025-12-19,2560786,774121,1514,772607,30.23,21645,0,746976,1514,5500,0,0,0
AMAT,2025-12-18,2431505,858182,6297,851885,35.29,24216,0,826228,6297,7738,0,0,0
AMAT,2025-12-17,2536434,1330497,9370,1321127,52.46,38887,0,1285280,9370,6330,0,0,0
AMAT,2025-12-16,1735287,673757,1911,671846,38.83,31024,521,638570,1390,4163,0,0,0
AMAT,2025-12-15,1850219,833326,292,833034,45.04,29084,0,796922,292,7320,0,0,0
AMAT,2025-12-12,2314996,1180423,2631,1177792,50.99,32819,113,1141188,2518,6416,0,0,0
AMAT,2025-12-11,2831226,1261715,298,1261417,44.56,40563,0,1210666,298,10486,0,0,0
AMAT,2025-12-10,2075059,941277,1805,939472,45.36,18717,0,908227,1805,14333,0,0,0
AMAT,2025-12-09,1408507,611763,824,610939,43.43,19251,0,588797,824,3715,0,0,0
AMAT,2025-12-08,2026815,890716,4835,885881,43.95,29326,0,857866,4835,3524,0,0,0
AMAT,2025-12-05,2443311,806722,2165,804557,33.02,35008,0,766448,2165,5266,0,0,0
AMAT,2025-12-04,2113754,1059584,864,1058720,50.13,31092,0,1011140,864,17352,0,0,0
AMAT,2025-12-03,2699693,1587532,5691,1581841,58.8,32102,0,1523426,5691,32004,0,0,0
AMAT,2025-12-02,3327721,2305899,9860,2296039,69.29,54050,0,2227523,9860,24326,0,0,0
AMAT,2025-12-01,2482357,1621349,1266,1620083,65.31,37948,500,1576170,766,7231,0,0,0
AMAT,2025-11-28,1019492,499145,1265,497880,48.96,16651,0,479760,1265,2734,0,0,0
AMAT,2025-11-26,3025403,1899015,635,1898380,62.77,52744,0,1828456,635,17815,0,0,0
AMAT,2025-11-25,3071038,1928616,911,1927705,62.8,67220,0,1843011,911,18385,0,0,0
AMAT,2025-11-24,2203275,1390954,1705,1389249,63.13,39034,0,1344356,1705,7564,0,0,0
AMAT,2025-11-21,2896138,1990075,3145,1986930,68.71,87100,0,1871947,3145,31028,0,0,0
```