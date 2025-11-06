"use client"

import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { backend_url } from "@/app/config"

interface PortfolioItem {
  name: string
  purcasePrice: number
  quantity: number
  investment: number
  portfolio: number
  symbol: number
  sector: string
  cmp?: number
  presentValue?: number
  gainLoss?: number
}

interface PortfolioTableProps {
  marketData: {
    portfolioData: PortfolioItem[]
  }
}

export function PortfolioTable({ marketData }: PortfolioTableProps) {
  const [liveData, setLiveData] = useState<Record<number, { cmp: number; presentValue: number; gainLoss: number }>>({})
  const [lastUpdated, setLastUpdated] = useState<string>("—")

  const totalInvestment = marketData.portfolioData.reduce((sum, item) => sum + item.investment, 0)
  const uniqueSectors = [...new Set(marketData.portfolioData.map((item) => item.sector))]

  useEffect(() => {
    async function fetchMarketData() {
      try {
        const res = await fetch(`${backend_url}/api/market`)
        const json = await res.json()

        if (json.success && json.data) {
          const updatedMap: Record<number, { cmp: number; presentValue: number; gainLoss: number }> = {}
          json.data.forEach((item:{symbol:number, cmp:number, presentValue:number, gainLoss:number }) => {
            updatedMap[item.symbol] = {
              cmp: item.cmp,
              presentValue: item.presentValue,
              gainLoss: item.gainLoss,
            }
          })
          setLiveData(updatedMap)
          const now = new Date()
          setLastUpdated(now.toLocaleTimeString("en-IN", { hour12: true }))
        }
      } catch (err) {
        console.error("fetch error:", err)
      }
    }

    fetchMarketData() // initial fetch
    const interval = setInterval(fetchMarketData, 15000)  //every 15sec
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-0">
        {/* ✅ Display last updated time */}
        <div className="flex justify-end pr-4 pt-3 text-xs text-muted-foreground italic">
          Last updated: {lastUpdated}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-foreground font-semibold">Particulars</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Purchase Price</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Qty</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Investment</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Portfolio %</TableHead>
              <TableHead className="text-center text-foreground font-semibold">Exchange</TableHead>
              <TableHead className="text-right text-foreground font-semibold">CMP</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Present Value</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Gain/Loss</TableHead>
              <TableHead className="text-right text-foreground font-semibold">P/E Ratio</TableHead>
              <TableHead className="text-right text-foreground font-semibold">Latest Earnings</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {uniqueSectors.map((sector) => {
              const sectorHoldings = marketData.portfolioData.filter((item) => item.sector === sector)

              return (
                <React.Fragment key={sector}>
                  <TableRow className="bg-muted/50 border-border hover:bg-muted/50">
                    <TableCell colSpan={11} className="font-bold text-foreground py-3 capitalize">
                      {sector}
                    </TableCell>
                  </TableRow>

                  {sectorHoldings.map((holding) => {
                    const live = liveData[holding.symbol]
                    const cmp = live?.cmp ?? holding.cmp ?? holding.purcasePrice
                    const presentValue = live?.presentValue ?? holding.presentValue ?? holding.investment
                    const gainLoss = live?.gainLoss ?? holding.gainLoss ?? presentValue - holding.investment
                    const peRatio = 25.4
                    const latestEarnings = 34.5
                    const exchange = "BSE"
                    const portfolioPercent = (holding.investment / totalInvestment) * 100
                    const isPositive = gainLoss >= 0

                    return (
                      <TableRow key={holding.symbol} className="border-border hover:bg-muted/30 transition-colors">
                        <TableCell className="text-foreground font-medium">{holding.name}</TableCell>
                        <TableCell className="text-right text-foreground">
                          ₹{holding.purcasePrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-foreground">{holding.quantity}</TableCell>
                        <TableCell className="text-right text-foreground font-medium">
                          ₹{holding.investment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {portfolioPercent.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center rounded border px-2 py-1 text-xs font-medium bg-accent/20 text-foreground border-accent/50">
                            {exchange}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-foreground">₹{cmp.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-foreground font-medium">
                          ₹{presentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span
                              className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}
                            >
                              {isPositive ? "+" : ""}₹
                              {Math.abs(gainLoss).toLocaleString("en-IN", {
                                maximumFractionDigits: 0,
                              })}
                            </span>
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-foreground">{peRatio.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-foreground">
                          ₹{latestEarnings.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
