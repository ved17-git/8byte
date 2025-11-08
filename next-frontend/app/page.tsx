"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PortfolioTable } from "@/components/portfolio-table"
import { PortfolioHeader } from "@/components/portfolio-header"
import { SectorSummary } from "@/components/sector-summary"
import { backend_url } from "./config"

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

export default function Home() {
  const [marketData, setMarketData] = useState<{ portfolioData: PortfolioItem[] } | null>(null)
  const [liveData, setLiveData] = useState<Record<number, { cmp: number; presentValue: number; gainLoss: number }>>({})

  useEffect(() => {
    async function fetchPortfolioData() {
      const res = await fetch(`${backend_url}/api/portfolio`, {
        method: "GET"
      })
      const data = await res.json()
      setMarketData(data)
    }

    async function fetchMarketData() {
      try {
        const res = await fetch(`${backend_url}/api/market`)
        const json = await res.json()

        if (json.success && json.data) {
          const updatedMap: Record<number, { cmp: number; presentValue: number; gainLoss: number }> = {}
          json.data.forEach((item: { symbol: number; cmp: number; presentValue: number; gainLoss: number }) => {
            updatedMap[item.symbol] = {
              cmp: item.cmp,
              presentValue: item.presentValue,
              gainLoss: item.gainLoss,
            }
          })
          setLiveData(updatedMap)
        }
      } catch (err) {
        console.error("fetch error:", err)
      }
    }

    fetchPortfolioData()
    fetchMarketData()
    const interval = setInterval(fetchMarketData, 15000)
    return () => clearInterval(interval)
  }, [])

  if (!marketData) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  }

  let totalInvestment = 0
  let totalPresentValue = 0
  let totalGainLoss = 0

  marketData.portfolioData.forEach((item) => {
    const live = liveData[item.symbol]
    const presentValue = live?.presentValue ?? item.presentValue ?? item.investment
    const gainLoss = live?.gainLoss ?? item.gainLoss ?? (presentValue - item.investment)

    totalInvestment += item.investment
    totalPresentValue += presentValue
    totalGainLoss += gainLoss
  })

  const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0

  const sectorSummaries: Record<string, {
    totalInvestment: number
    totalPresentValue: number
    gainLoss: number
    gainLossPercent: number
    count: number
  }> = {}

  marketData.portfolioData.forEach((item) => {
    if (!sectorSummaries[item.sector]) {
      sectorSummaries[item.sector] = {
        totalInvestment: 0,
        totalPresentValue: 0,
        gainLoss: 0,
        gainLossPercent: 0,
        count: 0,
      }
    }

    const live = liveData[item.symbol]
    const presentValue = live?.presentValue ?? item.presentValue ?? item.investment
    const gainLoss = live?.gainLoss ?? item.gainLoss ?? (presentValue - item.investment)

    sectorSummaries[item.sector].totalInvestment += item.investment
    sectorSummaries[item.sector].totalPresentValue += presentValue
    sectorSummaries[item.sector].gainLoss += gainLoss
    sectorSummaries[item.sector].count += 1
  })

  Object.keys(sectorSummaries).forEach((sector) => {
    const summary = sectorSummaries[sector]
    summary.gainLossPercent = summary.totalInvestment > 0 
      ? (summary.gainLoss / summary.totalInvestment) * 100 
      : 0
  })

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your stock investments and performance</p>
          </div>
          <ThemeToggle />
        </div>

        <PortfolioHeader
          totalInvestment={totalInvestment}
          totalPresentValue={totalPresentValue}
          totalGainLoss={totalGainLoss}
          totalGainLossPercent={totalGainLossPercent}
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Sector Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(sectorSummaries).map(([sector, summary]) => (
              <SectorSummary
                key={sector}
                sector={sector} 
                totalInvestment={summary.totalInvestment}
                totalPresentValue={summary.totalPresentValue}
                gainLoss={summary.gainLoss}
                gainLossPercent={summary.gainLossPercent}
                count={summary.count}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Holdings</h2>
          <PortfolioTable marketData={marketData} />
        </div>
      </div>
    </main>
  )
}