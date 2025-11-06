import { ThemeToggle } from "@/components/theme-toggle"
import { PortfolioHeader } from "@/components/portfolio-header"
import { SectorSummary } from "@/components/sector-summary"
import { PortfolioTable } from "@/components/portfolio-table"
import { dummyPortfolioData } from "@/lib/dummy-data"
import { backend_url } from "./config"

export default async  function Home() {
  

    const res=await fetch(`${backend_url}/api/portfolio`,{
         method:"GET"
    })
    const marketData=await res.json()
     

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

        {/* Header */}
        {/* <PortfolioHeader
          totalInvestment={totalInvestment}
          totalPresentValue={totalPresentValue}
          totalGainLoss={totalGainLoss}
          totalGainLossPercent={totalGainLossPercent}
        /> */}

        {/* Sector Summaries */}
        {/* <div className="space-y-4">
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
        </div> */}

        {/* Portfolio Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Holdings</h2>
          <PortfolioTable marketData={marketData} />
        </div>
      </div>
    </main>
  )
}
