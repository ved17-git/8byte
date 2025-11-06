## Dynamic Portfolio Dashboard (Next.js + Node.js)

A full-stack market monitoring dashboard built using a Next.js frontend and a Node.js (Express + TypeScript) backend.

### Prereqs
- Node.js 20+

### Quick start
1. Install deps
```
cd backend && npm install
cd ../frontend && npm install

```
2. Run backend
```
cd ../backend
npm run dev

```
3. Run frontend (in another terminal)
```
cd ../frontend
npm run dev

```

### Backend API.
- `GET /api/market`.
- `GET /api/portfolio`

### Challenges Faced
- Finding Reliable APIs: Limited availability of accurate live data APIs.

- Missing Metrics: Couldn’t access APIs for P/E ratio and latest earnings.

- Rate Limiting: NSE/BSE APIs often throttled requests.

Solution: Used p-limit to control concurrent requests.

- Deployment: Backend deployment not completed due to API restrictions.

- Error Handling: Implemented robust error management in both layers.


### Notes

- Data accuracy depends on NSE/BSE public endpoints; values may be delayed.

- For demo and educational purposes only — not for financial decision-making.

- Cache refresh interval: 15 seconds (matches frontend polling).



