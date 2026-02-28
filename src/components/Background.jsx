import { Suspense, lazy } from 'react'

const ThreeNodeNetwork = lazy(() => import('./ThreeNodeNetwork.jsx'))

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[color:var(--bg)]" />

      {/* cursor-follow glow */}
      <div className="absolute inset-0 opacity-[0.22] dark:opacity-[0.32] cursor-glow" />

      {/* spotlight */}
      <div className="absolute -top-24 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/25 via-violet-500/20 to-cyan-400/20 blur-3xl" />

      {/* floating blobs */}
      <div className="absolute left-[-120px] top-[20%] h-[360px] w-[360px] animate-floaty rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute right-[-140px] top-[55%] h-[420px] w-[420px] animate-floaty rounded-full bg-cyan-400/10 blur-3xl [animation-delay:-3s]" />

      {/* 3D node network */}
      <div className="absolute inset-0 opacity-[0.28] dark:opacity-[0.45]">
        <Suspense fallback={null}>
          <ThreeNodeNetwork />
        </Suspense>
      </div>

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.22] dark:opacity-[0.35] grid-fade" />

      {/* noise overlay */}
      <div className="absolute inset-0 opacity-[0.18] dark:opacity-[0.28] noise" />
    </div>
  )
}

