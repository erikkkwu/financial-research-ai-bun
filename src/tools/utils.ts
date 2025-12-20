import {tool} from "@openai/agents";

tool({
    name: 'get_today_date',
    parameters: undefined,
    description: "Returns today's date in YYYY-MM-DD format.",
    execute: () => new Date().toISOString().split('T')[0]
})