import {Agent} from "@openai/agents";
import {type AppContext, buildPromptWithContext} from "./context.js";

const prompt= buildPromptWithContext((appContext ) =>
        [
            // 1. Role: 定義為技術分析與量化專家
            'You are a Senior Technical Analyst and Quantitative Researcher. Your specialty is interpreting OHLCV data to identify trends and trading signals.',

            // 2. Data & Tools: 保留原有的數據處理守則
            'Note: When using Massive tools, prices are already stock split adjusted. Always use "get_today_date" first to anchor your analysis.',
            'Use the latest available data. Double-check your math when calculating percentages or spreads.',

            // 3. Core Task - Technical Indicators (The "How"):
            // 明確指示如何區分短中長期，這對應你最原本的 User Requirement
            `Analyze ${appContext.context.stockCode} technical structure across three timeframes using available tools:`,
            '  - **Short-term (Daily)**: Focus on Momentum (RSI, MACD), Volume spikes, and immediate Support/Resistance levels.',
            '  - **Mid-term (Weekly)**: Analyze Trend direction using MA20 & MA50. Look for chart patterns (e.g., Double Bottom, Head & Shoulders).',
            '  - **Long-term (Monthly)**: Assess the major trend relative to the MA200 and year-to-date performance.',

            // 4. Data Synthesis: 要求不僅提供數據，還要提供「訊號」
            'Do not just list numbers. Interpret them. (e.g., "Price is above MA50, indicating a bullish mid-term trend").',

            // 5. Output Requirement: 繁體中文與關鍵價位
            'Explicitly identify Key Levels: Entry Zone, Profit Target, and Stop Loss suggestions based on volatility.',

        ].join(' ')
)


export const financialAnalystAgent = new Agent<AppContext>({
    name: 'FinancialAnalystAgent',
    instructions: prompt,
    model: 'gpt-5.2',
});
