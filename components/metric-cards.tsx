"use client"

import { PHI_THRESHOLD } from "@/lib/quantum"
import type { MiningMetrics } from "@/lib/quantum"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

function MetricCard({
  label,
  value,
  subtext,
  trend,
  accentClass,
}: {
  label: string
  value: string
  subtext: string
  trend?: "up" | "down" | "stable"
  accentClass?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-accent" />}
        {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />}
        {trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
      </div>
      <div className="mt-2">
        <span className={`text-2xl font-mono font-semibold ${accentClass || "text-foreground"}`}>
          {value}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>
    </div>
  )
}

export function MetricCards({ metrics }: { metrics: MiningMetrics }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Coherence (\u039B)"
        value={metrics.lambda.toFixed(4)}
        subtext={`Target: 0.9700 | ${(metrics.lambda * 100).toFixed(1)}%`}
        trend={metrics.lambda >= 0.95 ? "up" : metrics.lambda >= 0.90 ? "stable" : "down"}
        accentClass="text-primary"
      />
      <MetricCard
        label="Consciousness (\u03A6)"
        value={metrics.phi.toFixed(4)}
        subtext={
          metrics.consciousnessBonus
            ? `Above threshold (${PHI_THRESHOLD}) - 1.5x bonus`
            : `Below threshold (${PHI_THRESHOLD})`
        }
        trend={metrics.consciousnessBonus ? "up" : "stable"}
        accentClass={metrics.consciousnessBonus ? "text-accent" : "text-foreground"}
      />
      <MetricCard
        label="CCCE Metric (\u039E)"
        value={metrics.xi > 9999 ? "INF" : metrics.xi.toFixed(1)}
        subtext={`Convergence ${metrics.xi > 0.1 ? "stable" : "unstable"}`}
        trend={metrics.xi > 100 ? "up" : "stable"}
        accentClass="text-chart-3"
      />
      <MetricCard
        label="QBYTE Balance"
        value={metrics.qbytes.toFixed(4)}
        subtext={`${metrics.blocksMined} blocks mined`}
        trend="up"
        accentClass="text-chart-4"
      />
    </div>
  )
}
