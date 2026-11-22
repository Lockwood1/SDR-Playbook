import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Reveal, Section } from '../lib/shared'

const STEPS = [
  {
    title: 'Film study',
    body: 'Decision makers (CTO/CIO, VP Eng, CISO, platform leads, anyone new), earnings-call language, open eng roles, tech stack, announced migrations, existing Windsurf/Devin Desktop users (warm bottom-up leads).',
  },
  {
    title: 'Source intel from the inside',
    body: '15-minute chats with engineers or managers at the account.',
  },
  {
    title: 'Build a point of view',
    body: 'One or two sentences in their language.',
  },
  {
    title: 'Top 1% outreach',
    body: 'Multichannel: Slack/LinkedIn, phone, in person.',
  },
  {
    title: 'Script the first three plays',
    body: 'POV question → shorter summary of their answer → "What trumps that?"',
  },
  {
    title: 'Set the destination',
    body: 'Ideal next step (AE meeting) + two backups, stated upfront.',
  },
  {
    title: 'Clean handoff',
    body: 'AE brief with everything learned; exec-to-exec connections when they help.',
  },
]

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <Section id="process" eyebrow="03 / Workflow" title="How I work an account">
      <div ref={ref} className="relative mt-12 pl-10 sm:pl-14">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10 sm:left-[19px]" aria-hidden />
        <motion.div
          className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-magenta shadow-[0_0_14px_rgba(139,92,246,0.6)] sm:left-[19px]"
          style={reduced ? {} : { scaleY: progress }}
          aria-hidden
        />
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={0.05}>
              <li className="relative">
                <span
                  className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/40 bg-[#0a0d18] font-mono text-xs font-semibold text-neon-cyan shadow-[0_0_16px_-2px_rgba(34,211,238,0.45)] sm:-left-14 sm:h-10 sm:w-10"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="glass glass-hover p-5 sm:p-6">
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
