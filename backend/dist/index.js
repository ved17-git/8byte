import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import yahooFinance from "yahoo-finance2";
import xlsx from "xlsx";
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8000;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
// --- Helper: Read from Excel file ---
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    // Normalize data
    return data
        .filter((row) => row["NSE/BSE"])
        .map((row) => ({
        Particulars: row["Particulars"],
        "Purchase Price": parseFloat(row["Purchase Price"]),
        Qty: parseInt(row["Qty"]),
        "NSE/BSE": row["NSE/BSE"].trim(),
        Sector: row["Sector"] || "General",
    }));
}
// --- Helper: Fetch Yahoo Finance data ---
async function fetchYahooData(symbol) {
    try {
        const yahooSymbol = symbol.endsWith(".NS") || symbol.endsWith(".BO") ? symbol : `${symbol}.NS`;
        //@ts-ignore
        const quote = await yahooFinance.quote(yahooSymbol);
        return {
            cmp: quote?.regularMarketPrice ?? null,
            peRatio: quote?.trailingPE ?? null,
        };
    }
    catch (err) {
        console.error(`Yahoo fetch failed for ${symbol}:`, err.message);
        return { cmp: null, peRatio: null };
    }
}
// --- Helper: Fetch Google Finance (Unofficial Scrape) ---
async function fetchGoogleFinance(symbol) {
    try {
        const url = `https://www.google.com/finance/quote/${symbol}:NSE`;
        const res = await axios.get(url);
        const html = res.data;
        // Extract sample values using regex (Google Finance HTML)
        const peMatch = html.match(/P\/E ratio<\/div><div.*?>([\d.]+)/);
        const earningsMatch = html.match(/Earnings per share<\/div><div.*?>([\d.]+)/);
        const pe = peMatch ? parseFloat(peMatch[1]) : null;
        const earnings = earningsMatch ? earningsMatch[1] : null;
        return { pe, earnings };
    }
    catch {
        return { pe: null, earnings: null };
    }
}
// --- API Endpoint ---
app.get("/api/portfolio", async (req, res) => {
    try {
        const excelPath = path.join(__dirname, "../src/CDEC21CD.xlsx");
        if (!fs.existsSync(excelPath)) {
            console.error("Excel file not found at", excelPath);
            return res.status(500).json({ error: "Excel file missing" });
        }
        const portfolio = readExcelFile(excelPath);
        console.log("✅ Excel rows loaded:", portfolio.length);
        console.log("🪶 First row sample:", portfolio[0]);
        const results = await Promise.all(portfolio.map(async (row, index) => {
            const { cmp, peRatio } = await fetchYahooData(row["NSE/BSE"]);
            const { pe, earnings } = await fetchGoogleFinance(row["NSE/BSE"]);
            const purchasePrice = row["Purchase Price"];
            const qty = row.Qty;
            const investment = purchasePrice * qty;
            const presentValue = (cmp ?? 0) * qty;
            const gainLoss = presentValue - investment;
            const gainLossPercent = (gainLoss / investment) * 100;
            return {
                id: String(index + 1),
                name: row.Particulars,
                ticker: row["NSE/BSE"],
                purchasePrice,
                qty,
                investment,
                cmp: cmp ?? 0,
                presentValue,
                gainLoss,
                gainLossPercent,
                peRatio: peRatio ?? pe ?? null,
                latestEarnings: earnings ?? null, // optional
            };
        }));
        res.json(results);
    }
    catch (error) {
        console.error("Error fetching portfolio:", error);
        res.status(500).json({ error: "Failed to process portfolio" });
    }
});
;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
