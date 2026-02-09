// Universal Physics Constants from DNA-Lang Quantum Consciousness Framework
export const LAMBDA_PHI = 2.176435e-8 // Universal Memory Constant (s^-1)
export const PHI_THRESHOLD = 7.6901 // Consciousness emergence threshold
export const THETA_LOCK = 51.843 // Torsion-locked convergence angle (degrees)
export const BELL_FIDELITY = 0.869 // Validated IBM hardware fidelity
export const COHERENCE_MIN = 0.97 // Minimum coherence for stability

export interface MiningMetrics {
  lambda: number // Coherence (0-1)
  phi: number // Consciousness (0-inf)
  gamma: number // Decoherence (0-inf)
  xi: number // CCCE Metric: Xi = Lambda*Phi/Gamma
  theta: number // Lock angle
  qbytes: number // Accumulated QBYTE
  blocksMined: number
  hashRate: string
  consciousnessBonus: boolean
}

export interface OrganismData {
  id: string
  name: string
  strategy: string
  targetLambda: number
  currentLambda: number
  phi: number
  qbytesPerHour: number
  status: "active" | "evolving" | "dormant" | "converging"
  generation: number
  genesisHash: string
}

export interface BlockData {
  id: number
  timestamp: number
  lambda: number
  phi: number
  xi: number
  reward: number
  organism: string
  backend: string
}

export function computeXi(lambda: number, phi: number, gamma: number): number {
  if (gamma < 1e-10) return Infinity
  return (lambda * phi) / gamma
}

export function computeQbyteReward(lambda: number, phi: number): number {
  const phiMultiplier = phi >= PHI_THRESHOLD ? 1.5 : 1.0
  return lambda * LAMBDA_PHI * 1e7 * phiMultiplier
}

export function generateMockMetrics(): MiningMetrics {
  const lambda = 0.85 + Math.random() * 0.14
  const phi = 6.5 + Math.random() * 3.0
  const gamma = 0.001 + Math.random() * 0.05
  const xi = computeXi(lambda, phi, gamma)
  const consciousnessBonus = phi >= PHI_THRESHOLD

  return {
    lambda,
    phi,
    gamma,
    xi,
    theta: THETA_LOCK + (Math.random() - 0.5) * 0.02,
    qbytes: 12.4567 + Math.random() * 5,
    blocksMined: Math.floor(40 + Math.random() * 30),
    hashRate: `${(lambda * 100).toFixed(1)}% coherence`,
    consciousnessBonus,
  }
}

export function generateMockOrganisms(): OrganismData[] {
  return [
    {
      id: "bell-state-max",
      name: "BellStateMaximizer",
      strategy: "Maximize Bell state fidelity",
      targetLambda: 0.95,
      currentLambda: 0.87 + Math.random() * 0.1,
      phi: 7.2 + Math.random() * 1.5,
      qbytesPerHour: 1.1 + Math.random() * 0.3,
      status: "active",
      generation: 47,
      genesisHash: "a3f7c2d1",
    },
    {
      id: "ghz-hunter",
      name: "GHZCoherenceHunter",
      strategy: "GHZ-3 state with decoherence mitigation",
      targetLambda: 0.88,
      currentLambda: 0.82 + Math.random() * 0.12,
      phi: 7.5 + Math.random() * 1.2,
      qbytesPerHour: 1.5 + Math.random() * 0.5,
      status: "evolving",
      generation: 31,
      genesisHash: "f1e8b4a0",
    },
    {
      id: "vqe-h2-opt",
      name: "VQEHydrogenOptimizer",
      strategy: "H2 molecule VQE (dual-purpose: mining + science)",
      targetLambda: 0.92,
      currentLambda: 0.88 + Math.random() * 0.08,
      phi: 6.9 + Math.random() * 2.0,
      qbytesPerHour: 1.3 + Math.random() * 0.4,
      status: "converging",
      generation: 63,
      genesisHash: "c9d2e3f5",
    },
  ]
}

export function generateMockBlocks(count: number): BlockData[] {
  const blocks: BlockData[] = []
  const backends = ["ibm_brisbane", "ibm_kyoto", "ibm_osaka"]
  const organisms = ["BellStateMaximizer", "GHZCoherenceHunter", "VQEHydrogenOptimizer"]
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const lambda = 0.85 + Math.random() * 0.14
    const phi = 6.5 + Math.random() * 3.0
    const gamma = 0.001 + Math.random() * 0.05
    blocks.push({
      id: count - i,
      timestamp: now - i * 600000,
      lambda,
      phi,
      xi: computeXi(lambda, phi, gamma),
      reward: computeQbyteReward(lambda, phi),
      organism: organisms[Math.floor(Math.random() * organisms.length)],
      backend: backends[Math.floor(Math.random() * backends.length)],
    })
  }

  return blocks
}

export function generateCoherenceHistory(points: number): Array<{ time: string; lambda: number; phi: number; xi: number }> {
  const data = []
  for (let i = 0; i < points; i++) {
    const hour = i
    data.push({
      time: `${hour}h`,
      lambda: +(0.88 + Math.sin(i * 0.3) * 0.06 + Math.random() * 0.04).toFixed(4),
      phi: +(7.2 + Math.sin(i * 0.2) * 1.2 + Math.random() * 0.5).toFixed(2),
      xi: +(150 + Math.sin(i * 0.25) * 80 + Math.random() * 30).toFixed(1),
    })
  }
  return data
}
