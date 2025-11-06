import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PortfolioHeaderProps {
  totalInvestment: number
  totalPresentValue: number
  totalGainLoss: number
  totalGainLossPercent: number
}

export function PortfolioHeader({
  totalInvestment,
  totalPresentValue,
  totalGainLoss,
  totalGainLossPercent,
}: PortfolioHeaderProps) {
  const isPositive = totalGainLoss >= 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ₹{totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ₹{totalPresentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            ₹{Math.abs(totalGainLoss).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Return %</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {totalGainLossPercent.toFixed(2)}%
            </div>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
