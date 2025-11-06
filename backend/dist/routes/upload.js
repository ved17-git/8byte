import { Router } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
const tmpDir = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(tmpDir))
    fs.mkdirSync(tmpDir, { recursive: true });
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, tmpDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });
export const router = Router();
router.post('/excel', upload.single('file'), (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: 'No file uploaded' });
        const wb = xlsx.readFile(req.file.path);
        const firstSheet = wb.SheetNames[0];
        const sheet = wb.Sheets[firstSheet];
        const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
        const holdings = rows.map((r) => {
            const symbol = String(r.symbol || r.Symbol || r.Ticker || r.Particulars || '').trim();
            const particulars = String(r.Particulars || r.Name || symbol).trim();
            const purchasePrice = Number(r.PurchasePrice || r['Purchase Price'] || r.Buy || 0);
            const quantity = Number(r.Qty || r.Quantity || 0);
            const sector = r.Sector ? String(r.Sector).trim() : undefined;
            const exchange = (r.Exchange || r['NSE/BSE'] || '').toString().toUpperCase();
            return {
                symbol,
                particulars,
                purchasePrice,
                quantity,
                sector,
                exchange: exchange === 'NSE' || exchange === 'BSE' ? exchange : undefined
            };
        }).filter((h) => h.symbol && h.quantity > 0);
        const payload = { holdings };
        // Best-effort cleanup
        fs.unlink(req.file.path, () => { });
        return res.json(payload);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to parse Excel', details: err.message });
    }
});
