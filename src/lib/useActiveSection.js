import { useEffect, useMemo, useState } from 'react'

export function useActiveSection(ids) {
  const idList = useMemo(() => ids.filter(Boolean), [ids])
  const [activeId, setActiveId] = useState(idList[0] ?? null)

  useEffect(() => {
    const elements = idList
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      {
        root: null,
        threshold: [0.15, 0.3, 0.5],
        rootMargin: '-10% 0px -70% 0px',
      },
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [idList])

  return activeId
}

