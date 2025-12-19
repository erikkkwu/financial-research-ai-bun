import {restClient} from '@massive.com/client-js';
import {tool, ToolExecuteArgument} from "@openai/agents";
import {z} from "zod";
import {defaultApiGetOptionsEmaRequestSchema, defaultApiGetOptionsSmaRequestSchema , defaultApiGetOptionsMacdRequestSchema ,defaultApiGetOptionsRsiRequestSchema } from "./interfaces/massive-zod.js";

type DefaultApiGetOptionsSmaRequestSchema = z.infer<typeof defaultApiGetOptionsSmaRequestSchema>;
const getClient = () => restClient(process.env.MASSIVE_API_KEY!,"https://api.massive.com", {
    pagination: true
});
export const getSMA = tool({
    description: "Retrieve the Simple Moving Average (SMA) for a specified ticker over a defined time range. The SMA calculates the average price across a set number of periods, smoothing price fluctuations to reveal underlying trends and potential signals. Use Cases: Trend analysis, trading signal generation (e.g., SMA crossovers), identifying support/resistance, and refining entry/exit timing.",
    parameters: defaultApiGetOptionsSmaRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsSmaRequestSchema>) => {
        try {
            const response = await getClient().getOptionsSMA(input);
            return response.results;
        } catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetOptionsEmaRequestSchema = z.infer<typeof defaultApiGetOptionsEmaRequestSchema>;
export const getEMA = tool({
    description: "Retrieve the Exponential Moving Average (EMA) for a specified ticker over a defined time range. The EMA places greater weight on recent prices, enabling quicker trend detection and more responsive signals. Use Cases: Trend identification, EMA crossover signals, dynamic support/resistance levels, and adjusting strategies based on recent market volatility.",
    parameters: defaultApiGetOptionsEmaRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsEmaRequestSchema>) => {
        try {
            const response = await getClient().getOptionsEMA(input);
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }

    }
})

type DefaultApiGetOptionsMacdRequestSchema = z.infer<typeof defaultApiGetOptionsMacdRequestSchema>;
export const getMACD = tool({
    description: 'Retrieve the Moving Average Convergence/Divergence (MACD) for a specified ticker over a defined time range. MACD is a momentum indicator derived from two moving averages, helping to identify trend strength, direction, and potential trading signals. ***Use Cases:*** Momentum analysis, signal generation (crossover events), spotting overbought/oversold conditions, and confirming trend directions.',
    parameters: defaultApiGetOptionsMacdRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsMacdRequestSchema>)=>{
        try {
            const response = await getClient().getCryptoMACD(input);
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})

type DefaultApiGetOptionsRsiRequestSchema = z.infer<typeof defaultApiGetOptionsRsiRequestSchema>;
export const getRSI = tool({
    description: 'Retrieve the Relative Strength Index (RSI) for a specified ticker over a defined time range. The RSI measures the speed and magnitude of price changes, oscillating between 0 and 100 to help identify overbought or oversold conditions. ***Use Cases:*** Overbought/oversold detection, divergence analysis, trend confirmation, and refining market entry/exit strategies.',
    parameters: defaultApiGetOptionsRsiRequestSchema,
    execute: async (input: ToolExecuteArgument<DefaultApiGetOptionsRsiRequestSchema>)=>{
        try {
            const response = await getClient().getOptionsRSI(input);
            return response.results;
        }
        catch (e) {
            return e instanceof Error ? e.message : "Unknown error occurred";
        }
    }
})