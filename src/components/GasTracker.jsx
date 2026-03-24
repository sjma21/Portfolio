import { useEffect, useState } from 'react'

const ETH_RPC = 'https://cloudflare-eth.com'

async function fetchGas() {
  try {
    const r = await fetch(ETH_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 }),
    })
    const d = await r.json()
    if (!d.result) return null
    return Math.round(parseInt(d.result, 16) / 1e8) / 10
  } catch {
    return null
  }
}

const TIERS = [
  { label: 'Slow', mult: 0.85, barClass: 'from-emerald-600 to-emerald-400' },
  { label: 'Avg',  mult: 1.0,  barClass: 'from-teal-600 to-teal-400' },
  { label: 'Fast', mult: 1.3,  barClass: 'from-amber-600 to-amber-400' },
]

export function GasTracker() {
  const [gwei, setGwei] = useState(null)
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    fetchGas().then(g => { if (g) setGwei(g) })
    const id = setInterval(() => {
      fetchGas().then(g => {
        if (g) {
          setGwei(g)
          setBlink(true)
          setTimeout(() => setBlink(false), 600)
        }
      })
    }, 15000)
    return () => clearInterval(id)
  }, [])

  const max = gwei ? gwei * 1.3 * 1.25 : 30

  return (
    <div className="glass p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono tracking-widest uppercase text-white/40">
            ETH Gas
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              blink ? 'bg-amber-400' : 'bg-emerald-400'
            } animate-pulse`}
          />
        </div>
        <span className="text-[9px] font-mono text-white/25">mainnet · live</span>
      </div>

      <div className="space-y-2">
        {TIERS.map(({ label, mult, barClass }) => {
          const value = gwei ? Math.round(gwei * mult * 10) / 10 : null
          const pct = value ? Math.min((value / max) * 100, 100) : 0
          return (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-8 text-[10px] font-mono text-white/45">{label}</span>
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                {value ? (
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${barClass} transition-all duration-1000`}
                    style={{ width: `${pct}%` }}
                  />
                ) : (
                  <div className="h-full w-1/3 rounded-full bg-white/8 animate-pulse" />
                )}
              </div>
              <span className="w-[72px] text-right text-[10px] font-mono text-white/55">
                {value ? `${value} Gwei` : '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
