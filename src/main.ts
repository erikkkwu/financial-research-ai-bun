import { Service } from './service'
import {TelegramBot} from "./bot";
import {createAgentGroup} from "./agents/agentGroup.ts";

const telegramBot = new TelegramBot();
const agentGroup = createAgentGroup();
const service = new Service(telegramBot , agentGroup);
await service.start();
process.once('SIGINT', gracefulShutdown);
process.once('SIGTERM', gracefulShutdown);
function gracefulShutdown(signal: string) {
  service.stop(signal).then(() => process.exit(0));
}