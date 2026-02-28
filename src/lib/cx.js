export function cx(...inputs) {
  const out = []
  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') out.push(input)
    else if (Array.isArray(input)) out.push(cx(...input))
    else if (typeof input === 'object') {
      for (const [k, v] of Object.entries(input)) if (v) out.push(k)
    }
  }
  return out.filter(Boolean).join(' ')
}

