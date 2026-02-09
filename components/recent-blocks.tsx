"use client"

import type { BlockData } from "@/lib/quantum"
import { PHI_THRESHOLD } from "@/lib/quantum"
import { Blocks, Sparkles } from "lucide-react"

export function RecentBlocks({ blocks }: { blocks: BlockData[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Blocks className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Recent Blocks</h3>
        </div>
        <span className="text-xs text-muted-foreground">{blocks.length} blocks</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Block</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">{"\u039B"}</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">{"\u03A6"}</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">{"\u039E"}</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Reward</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium hidden sm:table-cell">
                Organism
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium hidden md:table-cell">
                Backend
              </th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium hidden lg:table-cell">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.slice(0, 10).map((block) => (
              <tr
                key={block.id}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-2 px-2 font-mono text-foreground">#{block.id}</td>
                <td className="py-2 px-2 font-mono text-primary">
                  {block.lambda.toFixed(4)}
                </td>
                <td className="py-2 px-2 font-mono">
                  <span className={block.phi >= PHI_THRESHOLD ? "text-accent" : "text-foreground"}>
                    {block.phi.toFixed(2)}
                  </span>
                  {block.phi >= PHI_THRESHOLD && (
                    <Sparkles className="inline ml-1 h-3 w-3 text-accent" />
                  )}
                </td>
                <td className="py-2 px-2 font-mono text-chart-3">
                  {block.xi > 9999 ? "INF" : block.xi.toFixed(1)}
                </td>
                <td className="py-2 px-2 font-mono text-chart-4">
                  {block.reward.toFixed(4)}
                </td>
                <td className="py-2 px-2 text-muted-foreground hidden sm:table-cell">
                  {block.organism}
                </td>
                <td className="py-2 px-2 font-mono text-muted-foreground hidden md:table-cell">
                  {block.backend}
                </td>
                <td className="py-2 px-2 text-muted-foreground hidden lg:table-cell">
                  {formatTimeAgo(block.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}
