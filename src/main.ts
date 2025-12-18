import { Service } from './service/index.js'
import {TelegramBot} from "./bot/index.js";
import {createAgentGroup} from "./agents/agentGroup.js";
import { setDefaultResultOrder } from "node:dns";
import {SymbolStore} from "./store/symbol.js";
setDefaultResultOrder("ipv6first");
const telegramBot = new TelegramBot();
const agentGroup = createAgentGroup();
const symbolStore = new SymbolStore()
const service = new Service(telegramBot , agentGroup , symbolStore);
await service.start();
process.once('SIGINT', gracefulShutdown);
process.once('SIGTERM', gracefulShutdown);
function gracefulShutdown(signal: string) {
  service.stop(signal).then(() => process.exit(0));
}