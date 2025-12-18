import {type Context, Telegraf} from "telegraf";

export interface Bot {
    start() : Promise<void>
    stop() : Promise<void>
    setup(setupFunc: (telegraf: Telegraf<Context>) => void) : void
    send(chatId: number, message: string): Promise<void>;
}

export class TelegramBot implements Bot {
    private readonly telegraf: Telegraf<Context>;
    constructor() {
        this.telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!, {
            handlerTimeout: 60 * 60 * 1000
        })
    }

    async start() {
        await this.telegraf.launch(()=> console.log('Bot started!'));
    }

    async send(chatId: number, message: string) {
        await this.telegraf.telegram.sendMessage(chatId, message, {
            parse_mode: "Markdown",
            link_preview_options: {is_disabled: true}
        })
    }

    stop(): Promise<void> {
         return new Promise((resolve, reject) => {
             try {
                 this.telegraf.stop()
                 resolve(void 0)
             }
             catch (e){
                 reject(e)
             }
         })
    }
    setup(setupFunc: (telegraf: Telegraf<Context>) => void){
        setupFunc(this.telegraf)
    }
}