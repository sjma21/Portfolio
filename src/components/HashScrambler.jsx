import { useEffect, useRef, useState } from 'react'

const HEX = '0123456789abcdef'
const HASH_LEN = 40

function randHex(len) {
  return Array.from({ length: len }, () => HEX[Math.floor(Math.random() * 16)]).join('')
}

const ETH_RPC = 'https://cloudflare-eth.com'

async function fetchLatestHash() {
  try {
    const r = await fetch(ETH_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getBlockByNumber', params: ['latest', false], id: 1 }),
    })
    const d = await r.json()
    const hash = d.result?.hash
    return hash ? hash.slice(2, 2 + HASH_LEN) : null
  } catch {
    return null
  }
}

export function HashScrambler({ className = '' }) {
  const [display, setDisplay] = useState(randHex(HASH_LEN))
  const timer = useRef(null)
  const isMounted = useRef(true)

  function scrambleTo(target, onDone) {
    let frame = 0
    const total = 22

    function tick() {
      if (!isMounted.current) return
      frame++
      const resolved = Math.floor((frame / total) * target.length)
      setDisplay(target.slice(0, resolved) + randHex(target.length - resolved))
      if (frame < total) {
        timer.current = setTimeout(tick, 38)
      } else {
        setDisplay(target)
        onDone?.()
      }
    }
    tick()
  }

  function scheduleCycle(hash) {
    if (!isMounted.current) return
    const target = hash ?? randHex(HASH_LEN)
    // pause, then scramble
    timer.current = setTimeout(() => {
      scrambleTo(target, () => {
        // show settled hash for a bit, then fetch new one and scramble again
        timer.current = setTimeout(async () => {
          const fresh = await fetchLatestHash()
          scheduleCycle(fresh ?? randHex(HASH_LEN))
        }, 4500)
      })
    }, 800)
  }

  useEffect(() => {
    isMounted.current = true
    fetchLatestHash().then(hash => {
      scheduleCycle(hash ?? randHex(HASH_LEN))
    })
    return () => {
      isMounted.current = false
      clearTimeout(timer.current)
    }
  }, [])

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono select-none ${className}`}>
      <span className="text-emerald-400/60 text-[10px] tracking-widest uppercase">hash</span>
      <span className="text-emerald-400/50">0x</span>
      <span className="text-white/22">{display}</span>
    </span>
  )
}
