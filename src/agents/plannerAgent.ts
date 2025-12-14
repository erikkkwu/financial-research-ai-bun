import {Agent  } from "@openai/agents";
import {z} from "zod/v4";
import {AgentType} from "./constants.ts";

export const plannerPrompt = [
    'You are a research planning coordinator.',
    'Coordinate market research by delegating to specialized agents:',
    '- FinancialAnalystAgent: For stock data analysis',
    '- NewsAnalystAgent: For news gathering and analysis',
    '- WriterAgent: For compiling final report',
    'Always send your plan first, then handoff to appropriate agent.',
    'Always handoff to a single agent at a time.',
    'Use TERMINATE when research is complete.',
].join(' ')

export const leadAgentSchema = z.object({
    client: z.string().describe("The client to research"),
    completed: z.boolean().describe("Whether the research is complete"),
    output: z.string().nullish().optional().describe('Final research result'),
    tasks: z.array(
        z.object({
            name: z.enum(AgentType).describe("next subagent name"),
            input: z.string().describe("Specific search query or instruction for the subagent"
            ),
        })
    ),
});

export type LeadAgentSchemaType = z.infer<typeof leadAgentSchema>;
// export const ReportCitationSchema = z.object({
//     claim: z.string(),
//     url: z.string().url(),
//     source: z.string(),
//     asOf: z.string()
// });
//
// export const ReportJsonSchema = z.object({
//     companyName: z.string(),
//     dataAsOf: z.string(),
//     executiveSummary: z.string(),
//     trend: z.object({
//         short: z.string(),
//         mid: z.string(),
//         long: z.string()
//     }),
//     technicalAnalysis: z.object({
//         timeframe: z.string(),
//         keyLevels: z.array(z.string()),
//         indicators: z.array(z.string())
//     }),
//     newsAndSentiment: z.object({
//         summary: z.string(),
//         items: z.array(
//             z.object({
//                 title: z.string().optional().nullish(),
//                 url: z.string().url(),
//                 source: z.string().optional().nullish(),
//                 publishedAt: z.string().optional().nullish()
//             })
//         )
//     }),
//     catalystsAndRisks: z.object({
//         bull: z.array(z.string()),
//         base: z.array(z.string()),
//         bear: z.array(z.string())
//     }),
//     actionIdeas: z.object({
//         stance: z.enum(["Bullish", "Neutral", "Bearish"]),
//         horizon: z.string(),
//         invalidationConditions: z.array(z.string()),
//         riskManagement: z.array(z.string())
//     }),
//     assumptions: z.array(z.string()),
//     confidence: z.object({
//         overall: z.number().min(0).max(1)
//     }),
//     partial: z.boolean(),
//     missingData: z.array(z.string()),
//     citations: z.array(ReportCitationSchema),
//     disclaimer: z.string()
// });

export const plannerAgent = new Agent({
    name: 'FinancialPlannerAgent',
    instructions: plannerPrompt,
    model: 'gpt-5-mini',
    outputType: leadAgentSchema
});