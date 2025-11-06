export interface Portfolio {
  id: string
  symbol: string
  sector: string
  purchasePrice: number
  quantity: number
  investment: number
  exchange: string
  cmp: number
  presentValue: number
  gainLoss: number
  peRatio: number
  latestEarnings: number
}

export const dummyPortfolioData: Portfolio[] = [
  // Technology
  {
    id: "1",
    symbol: "TCS",
    sector: "Technology",
    purchasePrice: 3200,
    quantity: 10,
    investment: 32000,
    exchange: "NSE",
    cmp: 3850,
    presentValue: 38500,
    gainLoss: 6500,
    peRatio: 28.5,
    latestEarnings: 135.2,
  },
  {
    id: "2",
    symbol: "INFY",
    sector: "Technology",
    purchasePrice: 1500,
    quantity: 20,
    investment: 30000,
    exchange: "NSE",
    cmp: 1650,
    presentValue: 33000,
    gainLoss: 3000,
    peRatio: 32.1,
    latestEarnings: 51.4,
  },
  {
    id: "3",
    symbol: "WIPRO",
    sector: "Technology",
    purchasePrice: 450,
    quantity: 30,
    investment: 13500,
    exchange: "BSE",
    cmp: 420,
    presentValue: 12600,
    gainLoss: -900,
    peRatio: 18.2,
    latestEarnings: 23.1,
  },

  // Finance
  {
    id: "4",
    symbol: "HDFC",
    sector: "Finance",
    purchasePrice: 2400,
    quantity: 15,
    investment: 36000,
    exchange: "NSE",
    cmp: 2650,
    presentValue: 39750,
    gainLoss: 3750,
    peRatio: 22.3,
    latestEarnings: 118.9,
  },
  {
    id: "5",
    symbol: "ICICIBANK",
    sector: "Finance",
    purchasePrice: 850,
    quantity: 25,
    investment: 21250,
    exchange: "NSE",
    cmp: 920,
    presentValue: 23000,
    gainLoss: 1750,
    peRatio: 19.5,
    latestEarnings: 47.2,
  },
  {
    id: "6",
    symbol: "AXISBANK",
    sector: "Finance",
    purchasePrice: 950,
    quantity: 20,
    investment: 19000,
    exchange: "NSE",
    cmp: 1020,
    presentValue: 20400,
    gainLoss: 1400,
    peRatio: 21.1,
    latestEarnings: 48.3,
  },

  // Pharma
  {
    id: "7",
    symbol: "SUNPHARMA",
    sector: "Pharma",
    purchasePrice: 780,
    quantity: 25,
    investment: 19500,
    exchange: "NSE",
    cmp: 850,
    presentValue: 21250,
    gainLoss: 1750,
    peRatio: 25.2,
    latestEarnings: 33.7,
  },
  {
    id: "8",
    symbol: "CIPLA",
    sector: "Pharma",
    purchasePrice: 1200,
    quantity: 15,
    investment: 18000,
    exchange: "NSE",
    cmp: 1080,
    presentValue: 16200,
    gainLoss: -1800,
    peRatio: 23.8,
    latestEarnings: 45.3,
  },

  // Automotive
  {
    id: "9",
    symbol: "MARUTI",
    sector: "Automotive",
    purchasePrice: 9200,
    quantity: 5,
    investment: 46000,
    exchange: "NSE",
    cmp: 10200,
    presentValue: 51000,
    gainLoss: 5000,
    peRatio: 16.4,
    latestEarnings: 622.8,
  },
  {
    id: "10",
    symbol: "HEROMOTOCORP",
    sector: "Automotive",
    purchasePrice: 2800,
    quantity: 10,
    investment: 28000,
    exchange: "NSE",
    cmp: 3100,
    presentValue: 31000,
    gainLoss: 3000,
    peRatio: 14.2,
    latestEarnings: 218.4,
  },
]
