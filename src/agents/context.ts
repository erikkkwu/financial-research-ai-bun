import {RunContext} from "@openai/agents";


export type AppContext = {
    stockCode: string;
};

export function buildPromptWithContext(contextBuilder: (appContext: RunContext<AppContext>) => string) {
    return async function (runContext: RunContext<AppContext>) {
        return contextBuilder(runContext);
    }
}
