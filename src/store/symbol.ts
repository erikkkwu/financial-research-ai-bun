import {createCache} from 'cache-manager'
import {FinnhubAPI} from '@stoqey/finnhub';

interface SymbolResponse {
    currency: string
    description: string
    displaySymbol: string
    figi: string
    mic: string
    symbol: string
    type: string
}
export class SymbolStore {
    private cache: ReturnType<typeof createCache>;
    private apiClient: FinnhubAPI;
    constructor() {
        this.cache = createCache()
        this.apiClient = new FinnhubAPI(process.env.FINNHUB_API_KEY);
    }

    async isSymbolExists(symbol: string) {
        return (await this.getOrFetchSymbols()).includes(symbol)
    }

    private async getOrFetchSymbols() {
        const symbols = await this.cache.get<string[]>('allSymbols');
        if (symbols) {
            return symbols;
        }

        const symbolsResp = await this.apiClient.api.get<SymbolResponse[]>('/stock/symbol?exchange=US');
        await this.cache.set('allSymbols', symbolsResp.data.map(s => s.symbol), 60 * 60 * 1000);
        return symbolsResp.data.map(s => s.symbol);
    }
}