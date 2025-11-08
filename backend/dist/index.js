import express from 'express';
import cors from 'cors';
import portfolio from '../portfolio.json' with { type: "json" };
import { BSE } from 'nse-bse-api';
import { portfolioData } from '../src/portfolio.js';
import pLimit from "p-limit";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;
const bse = new BSE();
// const nse = new NSE("./index.ts")
async function getStockData(symbol) {
    const result = await bse.quote(symbol);
    return result;
}
async function getAllStockData(symbols) {
    const limit = pLimit(1);
    const tasks = symbols.map(symbol => limit(async () => {
        try {
            const data = await getStockData(symbol);
            console.log(`fetched ${symbol}`);
            return data;
        }
        catch (err) {
            console.log(`failed ${symbol}:`, err.message);
            return null;
        }
    }));
    const results = await Promise.all(tasks);
    return results.filter(Boolean);
}
const symbols = portfolioData.map(item => item.symbol.toString());
const data = await getAllStockData(symbols);
console.log(data);
app.get('/', (req, res) => {
    res.json({
        message: 'testing /'
    });
});
app.get('/api/market', async (req, res) => {
    try {
        const symbols = portfolioData.map(item => item.symbol.toString());
        console.log(`Fetching market data for ${symbols.length} symbols...`);
        const data = await getAllStockData(symbols);
        const enrichedData = data.map((entry, i) => {
            const portfolioItem = portfolioData.find(p => p.symbol.toString() === entry?.symbol) || portfolioData[i];
            if (!portfolioItem || !entry?.LTP)
                return null;
            const cmp = entry.LTP;
            const quantity = portfolioItem.quantity;
            const investment = portfolioItem.investment;
            const presentValue = cmp * quantity;
            const gainLoss = presentValue - investment;
            return {
                symbol: portfolioItem.symbol,
                cmp,
                presentValue,
                gainLoss
            };
        }).filter(Boolean);
        res.json({
            success: true,
            count: enrichedData.length,
            data: enrichedData,
        });
    }
    catch (err) {
        console.error('api error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch market data',
            error: err.message,
        });
    }
});
app.get('/api/portfolio', async (req, res) => {
    res.json({
        portfolioData
    });
});
app.get('/data', (req, res) => {
    res.json({
        portfolio
    });
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
export default app;
//SAVFI
//511577
//  const res=await bse.deliveryReport(new Date())
// console.log(res);
