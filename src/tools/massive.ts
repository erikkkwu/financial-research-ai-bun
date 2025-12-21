import {restClient} from '@massive.com/client-js';
import {tool, ToolExecuteArgument} from "@openai/agents";
import {z} from "zod";
import {
    defaultApiGetOptionsEmaRequestSchema,
    defaultApiGetOptionsMacdRequestSchema,
    defaultApiGetOptionsRsiRequestSchema,
    defaultApiGetOptionsSmaRequestSchema,
    defaultApiGetStocksV1ShortInterestRequestSchema,
    defaultApiGetStocksV1ShortVolumeRequestSchema,
    OrderTypeEnum,
    ShortInterestSortFields, ShortVolumeSortFields,
} from "./interfaces/massive-zod.js";

import {json2csv} from 'json-2-csv'

type DefaultApiGetOptionsSmaRequestSchema = z.infer<typeof defaultApiGetOptionsSmaRequestSchema>;
const getClient = (pagination = true) => restClient(process.env.MASSIVE_API_KEY!,"https://api.massive.com", {
    pagination: pagination
});
export const getSMA = tool({
    name: 'get_sma',
    description: "Retrieve the Simple Moving Average (SMA) for a specified ticker. [IMPORTANT]: Use 'timestamp' for a single date (YYYY-MM-DD). For a date range, use 'timestampGte' and/or 'timestampLte'. NEVER mix 'timestamp' with range parameters (Gte, Gt, Lte, Lt) in the same request to avoid 400 errors. SMA helps in trend analysis and identifying support/resistance.",
    parameters: defaultApiGetOptionsSmaRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsSmaRequestSchema>) => {
        try {
            const response = await getClient().getOptionsSMA(input);
            response.results.underlying?.url && delete response.results.underlying?.url
            return response.results;
        } catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetOptionsEmaRequestSchema = z.infer<typeof defaultApiGetOptionsEmaRequestSchema>;
export const getEMA = tool({
    name: 'get_ema',
    description: "Retrieve the Exponential Moving Average (EMA) for a specified ticker. [IMPORTANT]: Use 'timestamp' for a single date. For a date range, use 'timestampGte' and/or 'timestampLte'. NEVER mix 'timestamp' with range parameters (Gte, Gt, Lte, Lt) to avoid 400 errors. EMA is more responsive to recent price changes than SMA.",
    parameters: defaultApiGetOptionsEmaRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsEmaRequestSchema>) => {
        try {
            const response = await getClient().getOptionsEMA(input);
            response.results.underlying?.url && delete response.results.underlying?.url
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetOptionsMacdRequestSchema = z.infer<typeof defaultApiGetOptionsMacdRequestSchema>;
export const getMACD = tool({
    name: 'get_macd',
    description: "Retrieve the Moving Average Convergence/Divergence (MACD) for a specified ticker. [IMPORTANT]: Use 'timestamp' for a single date. For a date range, use 'timestampGte' and/or 'timestampLte'. DO NOT mix 'timestamp' with range parameters (Gte, Gt, Lte, Lt) to avoid 400 errors. MACD is used for momentum and trend direction analysis.",
    parameters: defaultApiGetOptionsMacdRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsMacdRequestSchema>)=>{
        try {
            const response = await getClient().getOptionsMACD(input);
            response.results.underlying?.url && delete response.results.underlying?.url
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetOptionsRsiRequestSchema = z.infer<typeof defaultApiGetOptionsRsiRequestSchema>;
export const getRSI = tool({
    name: 'get_rsi',
    description: "Retrieve the Relative Strength Index (RSI) for a specified ticker. [IMPORTANT]: Use 'timestamp' for a single date. For a date range, use 'timestampGte' and/or 'timestampLte'. DO NOT mix 'timestamp' with range parameters (Gte, Gt, Lte, Lt) to avoid 400 errors. RSI measures price change speed to identify overbought or oversold conditions.",
    parameters: defaultApiGetOptionsRsiRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsRsiRequestSchema>)=>{
        try {
            const response = await getClient().getOptionsRSI(input);
            if(response.results.underlying?.url){
                delete response.results.underlying?.url
            }
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})
type DefaultApiGetStocksV1ShortInterestRequestSchema = z.infer<typeof defaultApiGetStocksV1ShortInterestRequestSchema>;
export const queryShortInterest = tool({
    name: 'query_short_interest',
    description: 'Retrieve bi-monthly aggregated short interest data reported to FINRA by broker-dealers for a specified stock ticker. Short interest represents the total number of shares sold short but not yet covered or closed out, serving as an indicator of market sentiment and potential price movements. High short interest can signal bearish sentiment or highlight opportunities such as potential short squeezes. This endpoint provides essential insights for investors monitoring market positioning and sentiment. Use Cases: Market sentiment analysis, short-squeeze prediction, risk management, trading strategy refinement.',
    parameters: defaultApiGetStocksV1ShortInterestRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetStocksV1ShortInterestRequestSchema>)=>{
        try {
            const sortBy = input.sortBy ?? ShortInterestSortFields.SettlementDate;
            const order = input.order ?? OrderTypeEnum.Desc;
            delete input.order
            delete input.sortBy
            const parameters = {
                ...input,
                sort: `${sortBy}.${order}`
            };
            const response = await getClient(false).getStocksV1ShortInterest(parameters);

            return json2csv(response.results);
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetStocksV1ShortVolumeRequestSchema = z.infer<typeof defaultApiGetStocksV1ShortVolumeRequestSchema>;
export const queryShortVolume = tool({
    name: 'query_short_volume',
    description: 'Retrieve daily aggregated short sale volume data reported to FINRA from off-exchange trading venues and alternative trading systems (ATS) for a specified stock ticker. Unlike short interest, which measures outstanding short positions at specific reporting intervals, short volume captures the daily trading activity of short sales. Monitoring short volume helps users detect immediate market sentiment shifts, analyze trading behavior, and identify trends in short-selling activity that may signal upcoming price movements. Use Cases: Intraday sentiment analysis, short-sale trend identification, liquidity analysis, trading strategy optimization.',
    parameters: defaultApiGetStocksV1ShortVolumeRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetStocksV1ShortVolumeRequestSchema>)=>{
        try {
            const sortBy = input.sortBy ?? ShortVolumeSortFields.Date;
            const order = input.order ?? OrderTypeEnum.Desc;
            delete input.order
            delete input.sortBy

            const requestParameters = {
                ...input,
                sort: `${sortBy}.${order}`
            };
            const response = await getClient(false).getStocksV1ShortVolume(requestParameters);

            return json2csv(response.results);
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})