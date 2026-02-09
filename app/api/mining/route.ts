import { NextResponse } from "next/server"
import {
  generateMockMetrics,
  generateMockOrganisms,
  generateMockBlocks,
  generateCoherenceHistory,
} from "@/lib/quantum"

export async function GET() {
  const metrics = generateMockMetrics()
  const organisms = generateMockOrganisms()
  const blocks = generateMockBlocks(20)
  const history = generateCoherenceHistory(24)

  return NextResponse.json({
    metrics,
    organisms,
    blocks,
    history,
    network: {
      totalMiners: 127,
      networkLambda: 0.9234,
      difficulty: 42.7,
      blockTime: "9.4 min",
      backends: [
        { name: "ibm_brisbane", status: "online", jobs: 84 },
        { name: "ibm_kyoto", status: "online", jobs: 52 },
        { name: "ibm_osaka", status: "offline", jobs: 34 },
      ],
    },
    timestamp: Date.now(),
  })
}
