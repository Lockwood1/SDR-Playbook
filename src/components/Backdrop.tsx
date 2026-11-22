export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* drifting grid */}
      <div className="grid-overlay absolute inset-0" />

      {/* neon blobs */}
      <div
        className="blob animate-blob-a left-[-12%] top-[-8%] h-[38rem] w-[38rem]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.20), transparent 65%)' }}
      />
      <div
        className="blob animate-blob-b right-[-14%] top-[22%] h-[42rem] w-[42rem]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20), transparent 65%)' }}
      />
      <div
        className="blob animate-blob-c bottom-[-16%] left-[22%] h-[36rem] w-[36rem]"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.13), transparent 65%)' }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(5,6,10,0.85) 100%)' }}
      />
    </div>
  )
}
