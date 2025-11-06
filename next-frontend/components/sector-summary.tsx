import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface SectorSummaryProps {
  sector: string
  totalInvestment: number
  totalPresentValue: number
  gainLoss: number
  gainLossPercent: number
  count: number
}

export function SectorSummary({
  sector,
  totalInvestment,
  totalPresentValue,
  gainLoss,
  gainLossPercent,
  count,
}: SectorSummaryProps) {
  const isPositive = gainLoss >= 0

  return (
    <Card className="bg-card border-border hover:border-accent transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-foreground">{sector}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {count} holdings
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Investment</p>
          <p className="text-lg font-semibold text-foreground">
            ₹{totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
          <p className="text-lg font-semibold text-foreground">
            ₹{totalPresentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Gain/Loss</p>
            <div className="flex items-center gap-1">
              <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? "+" : ""}
                {gainLoss.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </span>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">Return</p>
            <span className={`text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {gainLossPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
