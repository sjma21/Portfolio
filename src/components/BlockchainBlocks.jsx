import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ETH_RPC = 'https://cloudflare-eth.com'
const MAX_BLOCKS = 4

async function rpc(method, params = []) {
  const r = await fetch(ETH_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 }),
  })
  const d = await r.json()
  return d.result
}

function parseBlock(raw) {
  if (!raw) return null
  return {
    number: parseInt(raw.number, 16),
    hash: raw.hash || '0x' + '0'.repeat(64),
    txCount: Array.isArray(raw.transactions) ? raw.transactions.length : 0,
    timestamp: parseInt(raw.timestamp, 16) * 1000,
    baseFee: raw.baseFeePerGas ? (parseInt(raw.baseFeePerGas, 16) / 1e9).toFixed(2) : null,
    gasUsed: parseInt(raw.gasUsed, 16),
    gasLimit: parseInt(raw.gasLimit, 16),
  }
}

function DataPacket() {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400"
      style={{ boxShadow: '0 0 6px rgba(16,185,129,0.9)', left: '0%' }}
      animate={{ left: ['0%', '100%'] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
    />
  )
}

function Connector() {
  return (
    <div className="relative flex items-center flex-none" style={{ width: 40 }}>
      {/* static line */}
      <div className="h-px w-full bg-emerald-500/20" />
      {/* travelling light beam */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center overflow-hidden">
        <motion.div
          className="absolute h-full w-8 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
        />
      </div>
      <DataPacket />
    </div>
  )
}

function GasBar({ used, limit }) {
  const pct = limit > 0 ? Math.round((used / limit) * 100) : 0
  const color = pct > 90 ? 'from-red-500 to-orange-400' : pct > 70 ? 'from-amber-500 to-yellow-400' : 'from-emerald-500 to-teal-400'
  return (
    <div>
      <div className="flex justify-between text-[8px] text-white/25 mb-0.5">
        <span>Gas</span>
        <span className="font-mono">{pct}%</span>
      </div>
      <div className="h-0.5 w-full rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function BlockCard({ block, isLatest }) {
  const [age, setAge] = useState(0)

  useEffect(() => {
    function tick() { setAge(Math.floor((Date.now() - block.timestamp) / 1000)) }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [block.timestamp])

  const ageStr = age < 60 ? `${age}s` : age < 3600 ? `${Math.floor(age / 60)}m` : `${Math.floor(age / 3600)}h`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: -24 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      className={`relative flex-none w-40 rounded-xl border p-3 ${
        isLatest
          ? 'border-emerald-400/50 bg-emerald-500/10'
          : 'border-white/8 bg-white/[0.03]'
      }`}
      style={isLatest ? { boxShadow: '0 0 32px rgba(16,185,129,0.22), inset 0 0 20px rgba(16,185,129,0.04)' } : {}}
    >
      {isLatest && (
        <div
          className="absolute -top-2.5 left-2 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-ink-950 px-2 py-px text-[9px] font-semibold text-emerald-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LATEST
        </div>
      )}

      <div className="font-mono text-[8px] tracking-[0.18em] text-white/20 uppercase">ETH</div>
      <div className="mt-0.5 font-mono text-sm font-bold text-emerald-400 tabular-nums">
        #{block.number.toLocaleString()}
      </div>
      <div className="mt-1 truncate font-mono text-[8px] text-white/20">
        {block.hash.slice(0, 8)}…{block.hash.slice(-5)}
      </div>

      <div className="mt-2.5">
        <GasBar used={block.gasUsed} limit={block.gasLimit} />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-2 text-[9px]">
        <div>
          <div className="text-white/25">Txns</div>
          <div className="font-mono font-semibold text-amber-400/90">{block.txCount}</div>
        </div>
        {block.baseFee ? (
          <div>
            <div className="text-white/25">Base fee</div>
            <div className="font-mono font-semibold text-cyan-400/80">{block.baseFee}G</div>
          </div>
        ) : (
          <div>
            <div className="text-white/25">Age</div>
            <div className="font-mono font-semibold text-white/40">{ageStr}</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SkeletonBlock() {
  return (
    <div className="relative flex-none w-40 rounded-xl border border-white/8 bg-white/[0.02] p-3 overflow-hidden">
      <div className="h-2 w-8 rounded bg-white/8 animate-pulse" />
      <div className="mt-1 h-4 w-24 rounded bg-white/8 animate-pulse" />
      <div className="mt-1.5 h-2 w-32 rounded bg-white/8 animate-pulse" />
      <div className="mt-3 h-1 w-full rounded bg-white/8 animate-pulse" />
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="h-6 rounded bg-white/8 animate-pulse" />
        <div className="h-6 rounded bg-white/8 animate-pulse" />
      </div>
      {/* shimmer sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function BlockchainBlocks() {
  const [blocks, setBlocks] = useState([])
  const [status, setStatus] = useState('connecting')
  const seen = useRef(new Set())

  async function poll() {
    try {
      const raw = await rpc('eth_getBlockByNumber', ['latest', false])
      const block = parseBlock(raw)
      if (!block || seen.current.has(block.number)) return
      seen.current.add(block.number)
      setStatus('live')
      setBlocks(prev => [block, ...prev].slice(0, MAX_BLOCKS))
    } catch {
      if (status !== 'live') setStatus('error')
    }
  }

  useEffect(() => {
    poll()
    const id = setInterval(poll, 8000)
    return () => clearInterval(id)
  }, [])

  const displayBlocks = [...blocks].reverse()

  return (
    <div>
      {/* Status bar */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <div
          className={`h-2 w-2 rounded-full flex-none ${
            status === 'live'
              ? 'bg-emerald-400'
              : status === 'connecting'
              ? 'bg-amber-400 animate-pulse'
              : 'bg-red-400'
          }`}
          style={status === 'live' ? { boxShadow: '0 0 7px rgba(16,185,129,0.85)' } : {}}
        />
        <span className="font-mono text-[10px] tracking-widest text-white/35 uppercase">
          {status === 'live'
            ? 'Ethereum · Mainnet · Live'
            : status === 'connecting'
            ? 'Syncing to Ethereum Mainnet…'
            : 'Network unavailable'}
        </span>
        {status === 'live' && blocks[0] && (
          <span className="ml-auto font-mono text-[9px] text-emerald-400/50 hidden sm:inline">
            Block #{blocks[0].number.toLocaleString()}
          </span>
        )}
      </div>

      {/* Block chain */}
      <div className="flex items-center overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {status === 'connecting' && (
          <>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div className="flex-none w-10 h-px bg-white/8 mx-0" />
                )}
                <SkeletonBlock />
              </div>
            ))}
          </>
        )}

        {displayBlocks.length > 0 && (
          <AnimatePresence mode="popLayout" initial={false}>
            {displayBlocks.map((b, i) => (
              <div key={b.number} className="flex items-center">
                {i > 0 && <Connector />}
                <BlockCard block={b} isLatest={i === displayBlocks.length - 1} />
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
