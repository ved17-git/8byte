import YahooFinance from 'yahoo-finance2';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 15, useClones: false });
export async function fetchQuote(symbol) {
    const cached = cache.get(symbol);
    if (cached)
        return cached;
    // Attempt fetching quoteSummary for PE and earnings and quote for price
    const [quote, summary] = await Promise.all([
        YahooFinance.quote(symbol).catch(() => null),
        YahooFinance.quoteSummary(symbol, { modules: ['price', 'summaryDetail', 'defaultKeyStatistics', 'assetProfile', 'earnings'] }).catch(() => null)
    ]);
    const cmp = quote?.regularMarketPrice ?? quote?.postMarketPrice ?? null;
    const currency = quote?.currency ?? summary?.price?.currency;
    const pe = summary?.summaryDetail?.trailingPE ?? summary?.defaultKeyStatistics?.trailingPE ?? null;
    const latestEarnings = summary?.earnings?.financialsChart?.yearly?.[summary?.earnings?.financialsChart?.yearly?.length - 1]?.date?.toString?.() ?? null;
    const sector = summary?.assetProfile?.sector ?? null;
    const info = { symbol, cmp: cmp ?? null, peRatio: typeof pe === 'number' ? pe : null, latestEarnings, currency: currency ?? null, sector };
    cache.set(symbol, info);
    return info;
}
export async function fetchQuotes(symbols) {
    return Promise.all(symbols.map(fetchQuote));
}
export function clearQuoteCache() {
    cache.flushAll();
}
