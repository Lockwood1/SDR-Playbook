import { ArrowUp } from 'lucide-react'
import { Reveal } from '../lib/shared'

export function Closing() {
  return (
    <section id="closing" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-neon-cyan sm:text-xs">
          07 / The close
        </p>
        <h2 className="gradient-text max-w-4xl font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
          Research deeply. Find the priority behind the priority. Hand the AE a meeting that matters.
        </h2>
        <p className="mt-6 font-mono text-xs tracking-[0.2em] text-slate-500">BUILT WITH DEVIN</p>
      </Reveal>

      <footer className="mt-20 border-t border-white/[0.08] pb-10 pt-8 sm:mt-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
            Personal project by Carson Lockwood for an interview with Cognition. Not affiliated with or endorsed by
            Cognition. Customer results cited from Cognition's public customers page.
          </p>
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] text-slate-400 transition-all hover:border-neon-cyan/50 hover:text-neon-cyan sm:self-auto"
          >
            <ArrowUp size={13} aria-hidden />
            Back to top
          </a>
        </div>
      </footer>
    </section>
  )
}
