import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Reveal, Section } from '../lib/shared'

const OBJECTIONS = [
  {
    front: '"We already use Copilot / Claude Code."',
    back: 'Makes sense, most teams do. Those help engineers code faster; Devin takes whole tasks off their plate and can run alongside those tools. Worth 20 minutes to compare?',
  },
  {
    front: '"Not a priority right now."',
    back: 'Totally fair. When does your team plan for next year? Can I check back then?',
  },
  {
    front: '"Send me some info."',
    back: 'Happy to. So I send the right thing — is the bigger headache migrations, testing or security?',
  },
  {
    front: '"Is it secure?"',
    back: 'Great question, and one our engineers can go deep on. Every change goes through your team\u2019s review. Worth getting that on the calendar.',
  },
  {
    front: '"Will it replace my engineers?"',
    back: 'It takes the tedious work off their plate so they can focus on what matters. Customers use it to do more with the team they have.',
  },
]

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      className={`flip block h-56 w-full text-left sm:h-60 ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`Objection: ${front} Activate to ${flipped ? 'show objection' : 'show response'}`}
    >
      <div className="flip-inner">
        <div className="flip-face glass glass-hover flex flex-col justify-between p-6">
          <div>
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neon-magenta">
              Objection
            </p>
            <p className="font-display text-lg font-semibold leading-snug text-white">{front}</p>
          </div>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <RotateCcw size={11} aria-hidden /> Flip for response
          </p>
        </div>
        <div className="flip-face flip-back glass flex flex-col justify-between p-6 shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]">
          <div>
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neon-cyan">
              Response
            </p>
            <p className="text-sm leading-relaxed text-slate-200">{back}</p>
          </div>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <RotateCcw size={11} aria-hidden /> Flip back
          </p>
        </div>
      </div>
    </button>
  )
}

export function Objections() {
  return (
    <Section id="objections" eyebrow="05 / Rebuttals" title="Objection handling">
      <Reveal>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Never argue. Acknowledge, reframe, and leave a door open.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OBJECTIONS.map((o, i) => (
          <Reveal key={o.front} delay={(i % 3) * 0.1} className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}>
            <FlipCard front={o.front} back={o.back} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
