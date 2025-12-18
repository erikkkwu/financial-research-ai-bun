import {tool} from '@openai/agents'
import {z} from "zod";
import yahooFinance from "yahoo-finance2";


export const getStockHistorical = tool({
    name: 'get_stock_historical',
    description: "Retrieves historical price data for a specific stock or financial asset from Yahoo Finance. Supports fetching Open, High, Low, Close, and Volume (OHLCV) data points. Use this tool when the user asks for historical performance, price trends, or chart data over a specific timeframe.",
    parameters: z.object({
        symbol: z.string().describe("The stock ticker symbol (e.g., 'AAPL' for Apple, '2330.TW' for TSMC, or 'BTC-USD' for Bitcoin)."),
        period: z.enum(["1d", "1w", "1m", "3m", "6m", "1y", "2y" , "3y"])
            .describe("The total time range to retrieve data for. Options: 1d (1 day), 1w (1 week), 1m (1 month), 3m (3 months), 6m (6 months), 1y (1 year)."),
        interval: z.enum(["1d", "1wk", "1mo"])
            .default("1d")
            .describe("The data granularity (K-line period). Use '1d' for daily, '1wk' for weekly, or '1mo' for monthly bars. Defaults to '1d'."),
    }),
    execute: async ({symbol, period, interval = "1d"}) => {
        try {
            console.log('get_stock_historical tool call with:',symbol, period, interval)
            const queryOptions = {
                period1: getStartDate(period),
                period2: new Date(),
                interval: interval as "1d" | "1wk" | "1mo",
            };

            const finance = new yahooFinance();
            return await finance.chart(symbol, queryOptions);
        } catch (e) {
            console.error('get_stock_historical', e)
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
});

export const getQuoteSummary = tool({
    name: 'get_quote_summary',
    description: "Retrieves key financial metrics and statistics for a specific stock or financial asset from Yahoo Finance. Use this tool when the user asks for key financial metrics, such as market cap, P/E ratio, and EPS.",
    parameters: z.object({
        symbol: z.string().describe("The stock ticker symbol (e.g., 'AAPL' for Apple, '2330.TW' for TSMC, or 'BTC-USD' for Bitcoin)."),
    }),
    execute: async ({symbol}) => {
        try {
            console.log('get_quote_summary tool call with:',symbol)
            const finance = new yahooFinance();
            return await finance.quoteSummary(symbol, {
                modules: 'all'
            });
        } catch (e) {
            console.error('get_quote_summary',e)
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

export const getFundamentalsTimeSeries = tool({
    name: 'get_fundamentals_time_series',
    description: "Retrieves historical fundamental financial data (Balance Sheet, Income Statement, Cash Flow) for a company. Use this to analyze financial health, revenue growth, debt levels, or profitability ratios over time.",
    parameters: z.object({
        symbol: z.string().describe("The stock ticker symbol (e.g., 'AAPL', '2330.TW')."),
        period: z.enum(["1y", "2y", "3y"])
            .describe("The look-back period for financial reports. Options: 1y, 2y, 5y, 10y."),
        type: z.enum(["quarterly", "annual"])
            .default("quarterly")
            .describe("The reporting frequency. 'quarterly' for every 3 months, 'annual' for yearly totals."),
    }),
    execute: async ({symbol , period,  type = "quarterly" }) => {
        try {
            console.log('get_fundamentals_time_series tool call with:',symbol, period, type)
            const queryOptions = {
                period1: getStartDate(period),
                period2: new Date(),
                type: type,
                module: 'all'
            };
            const finance = new yahooFinance();

            const data = await finance.fundamentalsTimeSeries(symbol, queryOptions);
            if (!data || data.length === 0) {
                return 'No financial data available for the specified period';
            }

            data.forEach(quarter => {
                return `Missing total assets data for ${quarter.date}`
            });
        } catch (e) {
            console.error('get_fundamentals_time_series',e)
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }

})

function getStartDate(period: string): Date {
    const now = new Date();
    switch (period.toLowerCase()) {
        case "1d":
            return new Date(now.setDate(now.getDate() - 1));
        case "1w":
            return new Date(now.setDate(now.getDate() - 7));
        case "1m":
            return new Date(now.setMonth(now.getMonth() - 1));
        case "3m":
            return new Date(now.setMonth(now.getMonth() - 3));
        case "6m":
            return new Date(now.setMonth(now.getMonth() - 6));
        case "1y":
            return new Date(now.setFullYear(now.getFullYear() - 1));
        case "2y":
            return new Date(now.setFullYear(now.getFullYear() - 2));
        case "3y":
            return new Date(now.setFullYear(now.getFullYear() - 3));
        default:
            return new Date(now.setMonth(now.getMonth() - 1)); // Default to 1 month
    }
}