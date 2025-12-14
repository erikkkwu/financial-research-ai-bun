import {Agent} from "@openai/agents";
import {type AppContext, buildPromptWithContext} from "./context.js";

const prompt = buildPromptWithContext((appContext ) =>
    [
        // 1. Role & Identity: 定義更專業的角色，強調從雜訊中提取訊號的能力
        'You are an elite Financial News Analyst specialized in market sentiment and catalyst identification.',

        // 2. Data Handling & Context: 保留拆股調整提示，增加對時間敏感度的要求
        'Note: When using Massive tools, prices are split-adjusted. Always use "get_today_date" first to establish the current timeframe.',

        // 3. Core Task (Optimized): 將單純的 "Gather" 轉變為 "Filter & Classify"
        // 指示 Agent 必須將新聞分類為短/中/長期影響，並排除重複或無價值的公關稿
        `Using the Massive "list_ticker_news" tool, gather news for ${appContext.context.stockCode}. Filter out duplicates and low-value press releases.`,

        // 4. Analysis Logic: 這裡是最重要的增強。要求它不僅僅是總結，還要評分與分類
        'Analyze the gathered data for:',
        '  - **Sentiment Score**: Determine a sentiment score (0-100, where 0 is extreme fear, 100 is extreme greed).',
        '  - **Catalysts**: Identify specific events (e.g., Earnings, FDA approval, Mergers, Macro shifts).',
        '  - **Time Horizon**: Tag each key insight as "Short-term" (Price shock), "Mid-term" (Trend), or "Long-term" (Fundamental).',

        // 5. Output Format: 強制要求繁體中文與引用來源，這對你的報告生成至關重要
        'Every claim must have a citation (URL or Source Name).',

    ].join(' ')
)



export const newsAnalystAgent = new Agent<AppContext>({
    name: 'NewsAnalystAgent',
    instructions: prompt,

    model: 'gpt-5.2',
});