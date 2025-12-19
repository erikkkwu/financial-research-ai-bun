import {type Agent, MCPServerStdio, run , createMCPToolStaticFilter } from "@openai/agents";
import type {AppContext} from "./context.ts";
import {plannerAgent} from "./plannerAgent.js";
import {newsAnalystAgent} from "./newsAnalyst.js";
import {FinancialReportData, type FinancialReportDataType,  writerAgent } from "./writer.js";
import {financialAnalystAgent} from "./financialAnalyst.js";
import {MarkdownReport, masterAgent , type MarkdownReportType} from "./master.js";
import {getEMA, getMACD, getRSI, getSMA} from "../tools/massive.js";

export interface IAgentGroup {
    run(query: string , context: AppContext): Promise<FinancialReportDataType>;
    runMaster(query: string): Promise<MarkdownReportType>;
}

export class AgentGroup implements IAgentGroup {
    constructor(private plannerAgent: Agent<any,any> , private financialAnalystAgent: Agent<AppContext> , private newsAnalystAgent: Agent<AppContext>, private writerAgent: Agent<AppContext, typeof FinancialReportData> , private masterAgent: Agent<AppContext , typeof MarkdownReport> ) {
        this.setupAgentSettings()
    }

    async runMaster(query: string): Promise<MarkdownReportType> {
        await this.connectMCPServers();

        console.log('connected to MCP servers.')
        try {

            const result = await run(this.masterAgent, query);
            console.log('got report')
            const parsed = MarkdownReport.safeParse(result.finalOutput);

            if (!parsed.success) {
                throw new Error(`Failed to parse output: ${parsed.error.message}`);
            }

            return result.finalOutput
        }
        finally {
            await this.closeMCPServers();
        }
    }

    private get allAgents(){
        return [this.plannerAgent , this.financialAnalystAgent , this.newsAnalystAgent , this.writerAgent, this.masterAgent]
    }

    async run(query: string , context: AppContext): Promise<FinancialReportDataType> {
        console.log('connecting to MCP servers')
        await this.connectMCPServers();
        console.log('connected to MCP servers.')

        try {
            const result = await run(writerAgent, query , {
                context: context,
            });

            console.log('got report')
            const parsed = FinancialReportData.safeParse(result.finalOutput);

            if (!parsed.success) {
                throw new Error(`Failed to parse output: ${parsed.error.message}`);
            }

            return result.finalOutput
        }
        finally {
            await this.closeMCPServers();
        }
    }

    private async connectMCPServers(){
        for (const agent of this.allAgents) {
            for (const mcpServer of agent.mcpServers) {
                await mcpServer.connect();
            }
        }
    }

    private async closeMCPServers(){
        for (const agent of this.allAgents) {
            for (const mcpServer of agent.mcpServers) {
                await mcpServer.close();
            }
        }
    }

    private setupAgentSettings() {
        const massiveMCPServer = this.getMassiveMCPServer();
        this.writerAgent.mcpServers.push(massiveMCPServer);
        this.masterAgent.mcpServers.push(massiveMCPServer);
        this.writerAgent.tools.push(getSMA , getRSI, getEMA , getMACD)
        this.masterAgent.tools.push(getSMA , getRSI, getEMA , getMACD)
    }

    private getMassiveMCPServer(){
        return new MCPServerStdio({
            name: 'Massive',
            command: 'uvx',
            args: [
                '--from',
                'git+https://github.com/massive-com/mcp_massive@v0.7.0',
                'mcp_massive'
            ],
            toolFilter: createMCPToolStaticFilter({
                allowed: [
                    'get_aggs',
                    'get_previous_close_agg',
                    'get_snapshot_ticker',
                    'get_market_status',
                    'get_ticker_details',
                    'list_dividends',
                    'list_splits',
                    'list_ticker_news',
                    'list_tickers',
                    'list_aggs',
                    'get_grouped_daily_aggs',
                    'get_daily_open_close_agg',
                    'get_snapshot_all',
                    'list_ipos',
                    'list_short_interest',
                    'list_short_volume',
                    'get_ticker_types',
                    'get_snapshot_direction',
                    'list_universal_snapshots'
                ],
            }),
            env: {
                MASSIVE_API_KEY: process.env.MASSIVE_API_KEY!
            }
        });
    }
}

export const createAgentGroup = () : AgentGroup => {
    return new AgentGroup(plannerAgent, financialAnalystAgent, newsAnalystAgent, writerAgent , masterAgent);
}