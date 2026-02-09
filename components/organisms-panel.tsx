"use client"

import type { OrganismData } from "@/lib/quantum"
import { Dna, Zap, Timer, TrendingUp } from "lucide-react"

const statusColors: Record<string, string> = {
  active: "bg-accent text-accent-foreground",
  evolving: "bg-chart-3/20 text-chart-3",
  dormant: "bg-muted text-muted-foreground",
  converging: "bg-primary/20 text-primary",
}

export function OrganismsPanel({ organisms }: { organisms: OrganismData[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Mining Organisms</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {organisms.length} active
        </span>
      </div>
      <div className="space-y-3">
        {organisms.map((org) => (
          <OrganismRow key={org.id} organism={org} />
        ))}
      </div>
    </div>
  )
}

function OrganismRow({ organism }: { organism: OrganismData }) {
  const lambdaPercent = (organism.currentLambda / organism.targetLambda) * 100

  return (
    <div className="rounded-md border border-border bg-secondary/30 p-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-medium text-foreground">
              {organism.name}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                statusColors[organism.status]
              }`}
            >
              {organism.status.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{organism.strategy}</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          gen:{organism.generation}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">{"\u039B"}</div>
            <div className="text-xs font-mono text-foreground">
              {organism.currentLambda.toFixed(3)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Timer className="h-3 w-3 text-accent" />
          <div>
            <div className="text-xs text-muted-foreground">{"\u03A6"}</div>
            <div className="text-xs font-mono text-foreground">
              {organism.phi.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3 w-3 text-chart-4" />
          <div>
            <div className="text-xs text-muted-foreground">QBYTE/hr</div>
            <div className="text-xs font-mono text-foreground">
              {organism.qbytesPerHour.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
          <span>Coherence Progress</span>
          <span>{lambdaPercent.toFixed(0)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary">
          <div
            className="h-1.5 rounded-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min(lambdaPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
