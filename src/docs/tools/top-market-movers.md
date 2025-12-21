# REST
## Stocks

### Top Market Movers

**MCPToolName** `get_snapshot_direction`

**Description:**

Retrieve snapshot data highlighting the top 20 gainers or losers in the U.S. stock market. Gainers are stocks with the largest percentage increase since the previous day’s close, and losers are those with the largest percentage decrease. To ensure meaningful insights, only tickers with a minimum trading volume of 10,000 are included. Snapshot data is cleared daily at 3:30 AM EST and begins repopulating as exchanges report new information, typically starting around 4:00 AM EST. By focusing on these market movers, users can quickly identify significant price shifts and monitor evolving market dynamics.

Use Cases: Market movers identification, trading strategies, market sentiment analysis, portfolio adjustments.

##  Parameters

| Parameter     | Type    | Required | Description                                                                              |
|---------------|---------|----------|------------------------------------------------------------------------------------------|
| `include_otc` | boolean | No       | Include OTC securities in the response. Default is false (don't include OTC securities). |
| `direction`   | string  | Yes      | The direction of the snapshot results to return.                                         |

## Sample Response

```json
{
  "status": "OK",
  "tickers": [
    {
      "day": {
        "c": 14.2284,
        "h": 15.09,
        "l": 14.2,
        "o": 14.33,
        "v": 133963,
        "vw": 14.5311
      },
      "lastQuote": {
        "P": 14.44,
        "S": 11,
        "p": 14.2,
        "s": 25,
        "t": 1605195929997325600
      },
      "lastTrade": {
        "c": [
          63
        ],
        "i": "79372124707124",
        "p": 14.2284,
        "s": 536,
        "t": 1605195848258266000,
        "x": 4
      },
      "min": {
        "av": 133963,
        "c": 14.2284,
        "h": 14.325,
        "l": 14.2,
        "n": 5,
        "o": 14.28,
        "t": 1684428600000,
        "v": 6108,
        "vw": 14.2426
      },
      "prevDay": {
        "c": 0.73,
        "h": 0.799,
        "l": 0.73,
        "o": 0.75,
        "v": 1568097,
        "vw": 0.7721
      },
      "ticker": "PDS",
      "todaysChange": 13.498,
      "todaysChangePerc": 1849.096,
      "updated": 1605195848258266000
    }
  ]
}
```