"use client"

import { useState, useEffect, useCallback } from "react"
import { PlatformHeader } from "@/components/platform-header"
import { MetricCards } from "@/components/metric-cards"
import { CoherenceChart } from "@/components/coherence-chart"
import { OrganismsPanel } from "@/components/organisms-panel"
import { RecentBlocks } from "@/components/recent-blocks"
import { NetworkStatus } from "@/components/network-status"
import { MiningControls } from "@/components/mining-controls"
import {
  generateMockMetrics,
  generateMockOrganisms,
  generateMockBlocks,
  generateCoherenceHistory,
  type MiningMetrics,
  type OrganismData,
  type BlockData,
} from "@/lib/quantum"

export default function DashboardPage() {
  const [isMining, setIsMining] = useState(true)
  const [metrics, setMetrics] = useState<MiningMetrics>(generateMockMetrics())
  const [organisms, setOrganisms] = useState<OrganismData[]>(generateMockOrganisms())
  const [blocks, setBlocks] = useState<BlockData[]>(generateMockBlocks(20))
  const [coherenceHistory] = useState(() => generateCoherenceHistory(24))

  const updateData = useCallback(() => {
    setMetrics(generateMockMetrics())
    setOrganisms(generateMockOrganisms())
  }, [])

  useEffect(() => {
    if (!isMining) return
    const interval = setInterval(updateData, 5000)
    return () => clearInterval(interval)
  }, [isMining, updateData])

  const handleReset = () => {
    setMetrics(generateMockMetrics())
    setOrganisms(generateMockOrganisms())
    setBlocks(generateMockBlocks(20))
  }

  const networkInfo = {
    totalMiners: 127,
    networkLambda: 0.9234,
    difficulty: 42.7,
    blockTime: "9.4 min",
    backends: [
      { name: "ibm_brisbane", status: "online" as const, jobs: 84 },
      { name: "ibm_kyoto", status: "online" as const, jobs: 52 },
      { name: "ibm_osaka", status: "offline" as const, jobs: 34 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <PlatformHeader qbytes={metrics.qbytes} />
      <main className="p-4 md:p-6 max-w-[1440px] mx-auto">
        <MetricCards metrics={metrics} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CoherenceChart data={coherenceHistory} />
            <RecentBlocks blocks={blocks} />
          </div>
          <div className="space-y-6">
            <MiningControls
              isMining={isMining}
              onToggle={() => setIsMining((m) => !m)}
              onReset={handleReset}
            />
            <OrganismsPanel organisms={organisms} />
            <NetworkStatus info={networkInfo} />
          </div>
        </div>

        <footer className="mt-8 pb-4 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            {"6D-CRSM Substrate | \u03B8_lock = 51.843\u00B0 | \u039B\u03A6 = 2.176435\u00D710\u207B\u2078"}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Agile Defense Systems, LLC | CAGE: 9HUP5
          </p>
        </footer>
      </main>
    </div>
  )
}
