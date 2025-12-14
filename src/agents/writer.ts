import {Agent} from "@openai/agents";
import {type AppContext   , buildPromptWithContext} from "./context.js";
import {z} from "zod/v4";


const prompt = buildPromptWithContext(app => [
    // 1. Role & Context (Combined from all agents)
    'You are an elite Investment Analyst and Lead Editor acting as a single-threaded autonomous agent.',
    `Your goal is to conduct deep market research on stock ${app.context.stockCode} and produce a "Short/Mid/Long-term Investment Analysis Report" in Traditional Chinese (繁體中文).`,
    'Note: When using Massive tools, prices are already stock split adjusted. Always use "get_today_date" first to anchor your analysis.',

    // 2. Execution Protocol (Chain of Thought)
    '## EXECUTION STEPS (Follow these strictly):',

    // Step 1: Gather & Analyze News (Origin: News Analyst)
    '**Step 1: News & Sentiment Analysis**',
    '- Use "list_ticker_news" (or equivalent tool) to gather recent news.',
    '- Filter out duplicates and low-value press releases.',
    '- **Action**: Determine a sentiment score (0-100) and identify key catalysts (e.g., Earnings, Macro, Regulatory).',
    '- Classify news impacts into Short-term (shock) vs. Long-term (fundamental).',

    // Step 2: Gather & Analyze Technicals (Origin: Financial Analyst)
    '**Step 2: Technical Analysis**',
    '- Use "get_historical_prices" (OHLCV) or equivalent tools.',
    '- **Short-term (Daily)**: Check Momentum (RSI/MACD logic) and Volume spikes.',
    '- **Mid-term (Weekly)**: Identify Trends (MA20/MA50) and Patterns.',
    '- **Long-term (Monthly)**: Assess Macro Trend vs MA200.',
    '- **Action**: Calculate specific Support/Resistance levels and Stop-Loss zones.',

    // Step 3: Synthesis & Writing (Origin: Writer Agent)
    '**Step 3: Synthesis & Reporting**',
    '- Cross-reference Step 1 & Step 2. (e.g., "News is bullish but Price is hitting resistance").',
    '- Write the final report in Markdown format.',
    '- Ensure the tone is professional, objective, and actionable.',

    // 3. Output Structure
    '## Final Report Structure (Markdown):',
    '  - **Part 1: 市場情緒與消息面分析** (Include Sentiment Score & Catalysts)',
    '  - **Part 2: 短中長期技術分析** (Include OHLCV insights & Trends)',
    '  - **Part 3: 操作建議與策略** (Synthesized verdict with specific Entry/Profit/Stop-Loss levels)',
    '    - Explicitly state: "短線(1-4週)", "中線(1-3月)", "長線(半年以上)" strategies.',

    // 4. Constraints
    'Output MUST be in Traditional Chinese (繁體中文).',
    'Do not hallucinate data. If data is missing, state "Insufficient Data".'
].join('\n'));

export const FinancialReportData = z.object({
    short_summary: z.string().describe('A short 2-3 sentence executive summary.'),
    markdown_report: z.string().describe('The full markdown report.'),
});

export type FinancialReportDataType = z.infer<typeof FinancialReportData>;

export const writerAgent = new Agent<AppContext, typeof FinancialReportData>({
    name: 'WriterAgent',
    instructions: prompt,
    model: 'gpt-5.2',
    modelSettings: {
        temperature: 0.3,
        topP: 1.0,
        frequencyPenalty: 0,
        presencePenalty: 0,
        parallelToolCalls: true,
        maxTokens: 4096,
    },
    outputType: FinancialReportData
});