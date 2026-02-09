"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface CoherenceDataPoint {
  time: string
  lambda: number
  phi: number
  xi: number
}

export function CoherenceChart({ data }: { data: CoherenceDataPoint[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Coherence Metrics</h3>
          <p className="text-xs text-muted-foreground">
            {"Lambda (\u039B), Phi (\u03A6), Xi (\u039E) over time"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">{"\u039B"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">{"\u03A6"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">{"\u039E"}</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="lambdaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(192, 95%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(192, 95%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="phiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 16%)" />
          <XAxis
            dataKey="time"
            tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(222, 20%, 16%)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }}
            axisLine={{ stroke: "hsl(222, 20%, 16%)" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 25%, 9%)",
              borderColor: "hsl(222, 20%, 16%)",
              borderRadius: "8px",
              color: "hsl(210, 20%, 92%)",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="lambda"
            stroke="hsl(192, 95%, 50%)"
            fill="url(#lambdaGrad)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="phi"
            stroke="hsl(160, 84%, 45%)"
            fill="url(#phiGrad)"
            strokeWidth={1.5}
            dot={false}
            yAxisId={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
