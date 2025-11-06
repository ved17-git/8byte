import portfolio from "../portfolio.json" with  {type: "json"}


const financialSector=portfolio.portfolio['Financial Sector'].stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"financial"
}))

const consumerSector=portfolio.portfolio.Consumer.stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"consumer"
}))

const powerSector=portfolio.portfolio.Power.stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"power"
}))
 
const pipeSector=portfolio.portfolio['Pipe Sector'].stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"pipe"
}))

const techSector=portfolio.portfolio['Tech Sector'].stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"tech"
}))

const otherSector=portfolio.portfolio.Others.stocks.map((temp)=>({
  name:temp.particulars,
  purcasePrice:temp.purchase_price,
  quantity:temp.qty,
  investment:temp.purchase_price*temp.qty,
  portfolio:temp.portfolio_percent,
  symbol:temp.nse_bse,
  sector:"other"
}))


export const portfolioData=[...financialSector, ...techSector, ...consumerSector, ...powerSector, ...pipeSector, ...otherSector]