# REST
## Stocks

### News

**MCPToolName** `list_ticker_news`

**Description:**

Retrieve the most recent news articles related to a specified ticker, along with summaries, source details, and sentiment analysis. This endpoint consolidates relevant financial news in one place, extracting associated tickers, assigning sentiment, and providing direct links to the original sources. By incorporating publisher information, article metadata, and sentiment reasoning, users can quickly gauge market sentiment, stay informed on company developments, and integrate news insights into their trading or research workflows.

Use Cases: Market sentiment analysis, investment research, automated monitoring, and portfolio strategy refinement.

## Parameters

| Parameter           | Type    | Required | Description                                                                     |
|---------------------|---------|----------|---------------------------------------------------------------------------------|
| `ticker`            | string  | No       | Specify a case-sensitive ticker symbol. For example, AAPL represents Apple Inc. |
| `published_utc`     | N/A     | No       | Return results published on, before, or after this date.                        |
| `ticker.gte`        | string  | No       | Search by ticker.                                                               |
| `ticker.gt`         | string  | No       | Search by ticker.                                                               |
| `ticker.lte`        | string  | No       | Search by ticker.                                                               |
| `ticker.lt`         | string  | No       | Search by ticker.                                                               |
| `published_utc.gte` | N/A     | No       | Search by published_utc.                                                        |
| `published_utc.gt`  | N/A     | No       | Search by published_utc.                                                        |
| `published_utc.lte` | N/A     | No       | Search by published_utc.                                                        |
| `published_utc.lt`  | N/A     | No       | Search by published_utc.                                                        |
| `order`             | string  | No       | Order results based on the `sort` field.                                        |
| `limit`             | integer | No       | Limit the number of results returned, default is 10 and max is 1000.            |
| `sort`              | string  | No       | Sort field used for ordering.                                                   |

## Response Attributes

| Field           | Type          | Description                                                                                                                                                                            |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `amp_url`       | string        | The mobile friendly Accelerated Mobile Page (AMP) URL.                                                                                                                                 |
| `article_url`   | string        | A link to the news article.                                                                                                                                                            |
| `author`        | string        | The article's author.                                                                                                                                                                  |
| `description`   | string        | A description of the article.                                                                                                                                                          |
| `id`            | string        | Unique identifier for the article.                                                                                                                                                     |
| `image_url`     | string        | The article's image URL.                                                                                                                                                               |
| `insights`      | array[object] | The insights related to the article.                                                                                                                                                   |
| `keywords`      | array[string] | The keywords associated with the article (which will vary depending on the publishing source).                                                                                         |
| `published_utc` | string        | The UTC date and time when the article was published, formatted in RFC3339 standard (e.g. YYYY-MM-DDTHH:MM:SSZ).                                                                       |
| `publisher`     | object        | Details the source of the news article, including the publisher's name, logo, and homepage URLs. This information helps users identify and access the original source of news content. |
| `tickers`       | array[string] | The ticker symbols associated with the article.                                                                                                                                        |
| `title`         | string        | The title of the news article.                                                                                                                                                         |

## Sample Response

```json
{
  "type": "text",
  "text": "id,publisher_name,publisher_homepage_url,publisher_logo_url,publisher_favicon_url,title,author,published_utc,article_url,tickers,amp_url,image_url,description,keywords,insights\ne31ddd1ad4efc562dad60c2530aea9262b5e06730a24af297909747edbd7c56a,Investing.com,https://www.investing.com/,https://s3.massive.com/public/assets/news/logos/investing.png,https://s3.massive.com/public/assets/news/favicons/investing.ico,AI Chips Can’t Exist Without These 2 Underrated Tech Giants,Jeffrey Neal Johnson,2025-12-17T12:36:00Z,https://www.investing.com/analysis/ai-chips-cant-exist-without-these-2-underrated-tech-giants-200671971,\"['AMAT', 'LRCX', 'NVDA', 'AMD']\",https://m.investing.com/analysis/ai-chips-cant-exist-without-these-2-underrated-tech-giants-200671971?ampMode=1,https://i-invdn-com.investing.com/redesign/images/seo/investingcom_analysis_og.jpg,\"The article highlights Applied Materials and Lam Research as critical infrastructure providers for AI chip manufacturing, explaining their essential role in creating advanced semiconductor technologies despite geopolitical challenges.\",\"['AI', 'semiconductor', 'wafer fab equipment', 'chip manufacturing', 'technology infrastructure']\",\"[{'ticker': 'AMAT', 'sentiment': 'positive', 'sentiment_reasoning': 'Strong financial performance, consistent service revenue, significant shareholder returns ($6.3B in dividends/buybacks), and critical technological capabilities in advanced chip manufacturing'}, {'ticker': 'LRCX', 'sentiment': 'positive', 'sentiment_reasoning': 'Demonstrated resilience in geopolitical challenges, innovative etch technologies for memory chip production, consistent stock buybacks ($990M in Q3 2025), and stable service revenue'}, {'ticker': 'NVDA', 'sentiment': 'neutral', 'sentiment_reasoning': 'Mentioned as a current market leader in chip design, but the article emphasizes the importance of equipment manufacturers over chip designers'}, {'ticker': 'AMD', 'sentiment': 'neutral', 'sentiment_reasoning': \"\"Briefly mentioned as a potential chip design challenger, but not a focus of the article's analysis\"\"}]\"\n"
}```