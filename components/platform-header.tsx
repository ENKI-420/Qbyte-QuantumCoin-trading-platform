"use client"

import { Activity, Atom, CircuitBoard, Wallet } from "lucide-react"

export function PlatformHeader({ qbytes }: { qbytes: number }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
            <Atom className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              {"QBYTE QuantumCoin"}
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              {"DNA::}{::LANG v7.0.0-\u039B\u03A6"}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink icon={<CircuitBoard className="h-4 w-4" />} label="Dashboard" active />
          <NavLink icon={<Activity className="h-4 w-4" />} label="Mining" />
          <NavLink icon={<Wallet className="h-4 w-4" />} label="Trading" />
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-mono text-foreground">
              {qbytes.toFixed(4)} QBYTE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
            <span className="text-xs text-muted-foreground">Network</span>
            <span className="text-xs font-mono text-accent">Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex items-center gap-1.5 text-sm transition-colors ${
        active
          ? "text-primary font-medium"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
