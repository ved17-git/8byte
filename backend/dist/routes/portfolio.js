import { Router } from 'express';
import { fetchQuotes } from '../services/quotes.js';
export const router = Router();
router.post('/quotes', async (req, res) => {
    try {
        const holdings = Array.isArray(req.body?.holdings) ? req.body.holdings : [];
        if (!holdings.length)
            return res.status(400).json({ error: 'holdings array required' });
        const symbols = holdings.map(h => h.symbol);
        const quotes = await fetchQuotes(symbols);
        const bySymbol = new Map(quotes.map((q) => [q.symbol, q]));
        const enriched = holdings.map(h => {
            const q = bySymbol.get(h.symbol);
            const cmp = q?.cmp ?? null;
            const presentValue = cmp !== null ? cmp * h.quantity : null;
            return {
                ...h,
                cmp,
                peRatio: q?.peRatio ?? null,
                latestEarnings: q?.latestEarnings ?? null,
                currency: q?.currency ?? null,
                sector: h.sector ?? q?.sector ?? undefined,
                investment: h.purchasePrice * h.quantity,
                presentValue,
                gainLoss: presentValue !== null ? presentValue - (h.purchasePrice * h.quantity) : null
            };
        });
        const sectors = new Map();
        for (const item of enriched) {
            const key = item.sector || 'Others';
            if (!sectors.has(key)) {
                sectors.set(key, { sector: key, items: [], totalInvestment: 0, totalPresentValue: 0, gainLoss: 0 });
            }
            const group = sectors.get(key);
            group.items.push(item);
            group.totalInvestment += item.investment;
            group.totalPresentValue += item.presentValue ?? 0;
            group.gainLoss += (item.gainLoss ?? 0);
        }
        const portfolioTotal = Array.from(sectors.values()).reduce((acc, s) => {
            acc.investment += s.totalInvestment;
            acc.presentValue += s.totalPresentValue;
            acc.gainLoss += s.gainLoss;
            return acc;
        }, { investment: 0, presentValue: 0, gainLoss: 0 });
        return res.json({ items: enriched, sectors: Array.from(sectors.values()), total: portfolioTotal });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch quotes', details: err.message });
    }
});
