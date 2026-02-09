"use client"

import { Play, Pause, RotateCcw, Settings } from "lucide-react"

export function MiningControls({
  isMining,
  onToggle,
  onReset,
}: {
  isMining: boolean
  onToggle: () => void
  onReset: () => void
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Mining Controls</h3>
      </div>
      <div className="space-y-3">
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors ${
            isMining
              ? "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isMining ? (
            <>
              <Pause className="h-4 w-4" />
              Stop Mining
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start Mining
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-border py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Organism
        </button>

        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Backend</span>
            <span className="text-xs font-mono text-foreground">ibm_brisbane</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Shots</span>
            <span className="text-xs font-mono text-foreground">8,192</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Optimization</span>
            <span className="text-xs font-mono text-foreground">Level 3</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{"\u03B8 Lock"}</span>
            <span className="text-xs font-mono text-primary">{"51.843\u00B0"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
