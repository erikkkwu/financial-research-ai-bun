import type {Bot} from "../bot/index.ts";
import type {IAgentGroup} from "../agents/agentGroup.ts";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import telegramifyMarkdown from 'telegramify-markdown';
const chatIDWhitelist = [899643208,6205020148]
export class Service {
    constructor(private bot: Bot, private agentGroup: IAgentGroup) {
    }

    async setup() {
        const ag = this.agentGroup
        this.bot.setup(function (telegraf) {
            telegraf.command(['start', 'help'], (ctx) => {
                console.log(ctx.message)
                return ctx.reply([
                    "Send `/analyse <TICKER> [horizon]` to generate a research report.",
                    "",
                    "Examples:",
                    "- `/analyse AAPL`",
                    "- `/analyse BRK.B`",
                ].join("\n"))
            })
            telegraf.command(["a" , "analyse"], async (ctx) => {
                if (!chatIDWhitelist.includes(ctx.chat?.id)) return ctx.reply("This bot is not available in this chat.")
                if (!ctx.text) return ctx.reply(
                    "Please send a code to analyze"
                )
                const [_, code ] = ctx.text?.split(" ");
                if (!code) return ctx.reply("Please send a code to analyze")

                try {
                    await ctx.reply(`Generating ${code} report...`)
                    const report = await ag.run(`Analyze **${code}** to produce the "Short/Mid/Long-term Investment Analysis Report". Synthesize market sentiment and technical indicators to provide actionable strategies in Traditional Chinese.`, {
                        stockCode: code
                    })

                    await ctx.reply(report.short_summary, { link_preview_options: {is_disabled: true}})

                    const recursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter(
                        {
                            chunkSize: 4000,
                            chunkOverlap: 0,
                            separators: [
                                "\n## ",
                                "\n### ",
                                "\n\n",
                                "\n",
                                " "
                            ],
                        }
                    );
                    const outputDocs = await recursiveCharacterTextSplitter.createDocuments([report.markdown_report.replace(/^[\s\t]*[-*_]{3,}[\s\t]*$/gm, '')]);

                    for (const doc of outputDocs) {
                        try {
                            const markdown = telegramifyMarkdown(doc.pageContent, 'escape');
                            console.log(markdown)
                            await ctx.reply(markdown, {
                                parse_mode: "MarkdownV2",
                                link_preview_options: {is_disabled: true}
                            });
                        }
                        catch (e) {
                            await ctx.reply(doc.pageContent, {
                                parse_mode: "Markdown",
                                link_preview_options: {is_disabled: true}
                            });
                        }
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                } catch (e) {
                    console.error(e)
                    if (e instanceof Error) {
                        return ctx.reply(`got some error: ${e.message}`)
                    }
                    return ctx.reply(`got some error: ${e}`)
                }
            })
        })
    }

    async start() {
        await this.setup();
        console.log("Starting background worker...");
        await this.bot.start();
    }

    async stop(signal: string) {
        console.log(`[${signal}]Stopping background worker...`);
        await this.bot.stop();
        console.log("background worker stopped");
    }
}