import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Phone } from 'lucide-react'
import { EASE, useTypewriter } from '../lib/shared'

const TERMINAL_LINE = 'research → point of view → "what trumps that?" → meeting'

export function Hero() {
  const reduced = useReducedMotion()
  const typed = useTypewriter(TERMINAL_LINE)

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/5 px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-neon-cyan sm:text-xs sm:tracking-[0.25em]">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]" aria-hidden />
            Carson × Cognition — SDR Playbook
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl">
            <span className="gradient-text">Opening doors</span>
            <br />
            <span className="text-white">for Devin.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            An outbound playbook for Cognition's SDR team — built by Carson, with Devin.
          </p>

          <div className="terminal-card mt-8 max-w-xl rounded-xl px-4 py-3.5 font-mono text-[13px] text-slate-300 sm:text-sm">
            <span className="mr-2 text-neon-cyan" aria-hidden>
              &gt;
            </span>
            <span>{typed}</span>
            <span className="terminal-cursor" aria-hidden />
            <span className="sr-only">{TERMINAL_LINE}</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#why"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet px-6 py-3 font-display text-sm font-semibold text-[#05060a] shadow-[0_0_30px_-6px_rgba(34,211,238,0.55)] transition-all hover:shadow-[0_0_44px_-4px_rgba(139,92,246,0.7)]"
            >
              See the playbook
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#builder"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 font-display text-sm font-semibold text-slate-100 backdrop-blur transition-all hover:border-neon-magenta/50 hover:bg-neon-magenta/10 hover:shadow-[0_0_32px_-8px_rgba(236,72,153,0.5)]"
            >
              <Phone size={15} className="text-neon-magenta" aria-hidden />
              Build a cold call
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#why"
        aria-label="Scroll to next section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-slate-500 transition-colors hover:text-neon-cyan sm:block"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
