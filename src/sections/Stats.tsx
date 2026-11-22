import { CountUp, Reveal, Section } from '../lib/shared'

const STATS = [
  { prefix: '$', to: 1, suffix: 'B+', label: 'annualized revenue run rate (Sept 2026)' },
  { prefix: '~', to: 2, suffix: 'x', label: 'run-rate growth in four months' },
  { prefix: '$', to: 48, suffix: 'B', label: 'valuation (Sept 2026)' },
]

export function Stats() {
  return (
    <Section id="why" eyebrow="01 / Context" title="Why Cognition, why now">
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12}>
            <div className="glass glass-hover h-full p-6 sm:p-7">
              <p className="font-mono text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <CountUp prefix={s.prefix} to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p className="mt-10 max-w-2xl font-display text-lg leading-relaxed text-slate-200 sm:text-xl">
          The hardest job is landing the new logo. Once Devin is in, expansion follows.{' '}
          <span className="gradient-text font-semibold">That's the job I want.</span>
        </p>
      </Reveal>
    </Section>
  )
}
