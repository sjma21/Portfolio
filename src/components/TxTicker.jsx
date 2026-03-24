import { useEffect, useState } from 'react'

const ETH_RPC = 'https://cloudflare-eth.com'
const HEX = '0123456789abcdef'

function randHash() {
  return '0x' + Array.from({ length: 64 }, () => HEX[Math.floor(Math.random() * 16)]).join('')
}

const SEEDS = Array.from({ length: 28 }, randHash)

async function fetchHashes() {
  try {
    const r = await fetch(ETH_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', true],
        id: 1,
      }),
    })
    const d = await r.json()
    const txs = d.result?.transactions ?? []
    const hashes = txs.slice(0, 32).map(tx => (typeof tx === 'string' ? tx : tx.hash))
    return hashes.length >= 8 ? hashes : null
  } catch {
    return null
  }
}

function fmt(hash) {
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`
}

export function TxTicker() {
  const [hashes, setHashes] = useState(SEEDS)

  useEffect(() => {
    fetchHashes().then(h => { if (h) setHashes(h) })
    const id = setInterval(() => {
      fetchHashes().then(h => { if (h) setHashes(h) })
    }, 20000)
    return () => clearInterval(id)
  }, [])

  // Double the list for seamless infinite scroll
  const items = [...hashes, ...hashes]

  return (
    <div className="relative overflow-hidden py-2 border-y border-emerald-500/8">
      {/* fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-ink-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ink-950 to-transparent z-10" />

      <div
        className="flex gap-6 animate-tx-ticker"
        style={{ width: 'max-content' }}
      >
        {items.map((h, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-[9px] font-mono whitespace-nowrap"
          >
            <span className="text-emerald-500/40">TX</span>
            <span className="text-white/22">{fmt(h)}</span>
            <span className="text-white/12 text-[8px]">▸</span>
          </span>
        ))}
      </div>
    </div>
  )
}
