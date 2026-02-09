"use client"

import { Server, Cpu, Clock, Shield } from "lucide-react"

interface NetworkInfo {
  totalMiners: number
  networkLambda: number
  difficulty: number
  blockTime: string
  backends: { name: string; status: "online" | "offline"; jobs: number }[]
}

export function NetworkStatus({ info }: { info: NetworkInfo }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Server className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Network Status</h3>
      </div>
      <div className="space-y-3">
        <StatusRow
          icon={<Cpu className="h-3.5 w-3.5 text-primary" />}
          label="Active Miners"
          value={info.totalMiners.toString()}
        />
        <StatusRow
          icon={<Shield className="h-3.5 w-3.5 text-accent" />}
          label={"Network \u039B"}
          value={info.networkLambda.toFixed(4)}
        />
        <StatusRow
          icon={<Clock className="h-3.5 w-3.5 text-chart-4" />}
          label="Avg Block Time"
          value={info.blockTime}
        />

        <div className="pt-2 border-t border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
            IBM Quantum Backends
          </p>
          <div className="space-y-1.5">
            {info.backends.map((backend) => (
              <div key={backend.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      backend.status === "online" ? "bg-accent" : "bg-destructive"
                    }`}
                  />
                  <span className="text-xs font-mono text-foreground">{backend.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {backend.jobs} jobs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-mono text-foreground">{value}</span>
    </div>
  )
}
