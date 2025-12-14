import { Service } from './service/index.js'
import {TelegramBot} from "./bot/index.js";
import {createAgentGroup} from "./agents/agentGroup.js";
import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv6first");
const telegramBot = new TelegramBot();
const agentGroup = createAgentGroup();
const service = new Service(telegramBot , agentGroup);
await service.start();
process.once('SIGINT', gracefulShutdown);
process.once('SIGTERM', gracefulShutdown);
function gracefulShutdown(signal: string) {
  service.stop(signal).then(() => process.exit(0));
}