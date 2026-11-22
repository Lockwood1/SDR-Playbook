import { CheckCircle2, MinusCircle, XCircle } from 'lucide-react'
import { Reveal, Section } from '../lib/shared'

const TIERS = [
  {
    icon: XCircle,
    tag: 'Weak',
    tagCls: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    iconCls: 'text-rose-400',
    example: 'Weather. Wi-Fi. Anything they\u2019ve heard a thousand times this week.',
    note: 'Filler that signals you did zero homework.',
  },
  {
    icon: MinusCircle,
    tag: 'Medium',
    tagCls: 'border-neon-violet/30 bg-neon-violet/10 text-neon-violet',
    iconCls: 'text-neon-violet',
    example: 'Basic location small talk — "You\u2019re based in Austin, right? How do you like it?"',
    note: 'Fine, but forgettable. Everyone leads with this.',
  },
  {
    icon: CheckCircle2,
    tag: 'Strong',
    tagCls: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
    iconCls: 'text-neon-cyan',
    example: '"Saw you led the move to the cloud at your last company — what was that like?"',
    note: 'Specific, about them, and impossible to fake without research.',
  },
]

export function Rapport() {
  return (
    <Section id="rapport" eyebrow="06 / Connection" title="Rapport, done right">
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.tag} delay={i * 0.12}>
            <div className={`glass glass-hover flex h-full flex-col p-6 ${i === 2 ? 'shadow-[0_0_44px_-14px_rgba(34,211,238,0.4)]' : ''}`}>
              <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${t.tagCls}`}>
                  <t.icon size={12} aria-hidden />
                  {t.tag}
                </span>
              </div>
              <p className={`font-display text-base font-semibold leading-snug ${i === 2 ? 'text-white' : 'text-slate-200'}`}>
                {t.example}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p className="mt-10 text-center font-mono text-sm tracking-wide text-slate-300">
          <span className="text-neon-cyan">Join early.</span>{' '}
          <span className="text-neon-violet">Make it about them.</span>{' '}
          <span className="text-neon-magenta">Build on it next time.</span>
        </p>
      </Reveal>
    </Section>
  )
}
