import {webSearchTool as wst} from '@openai/agents'
export const webSearchTool = wst({
    searchContextSize: 'medium',
})
