import { CircleHelp, ClipboardCheck, Flag, Handshake, Sparkles, Users } from 'lucide-react'
import { Reveal, Section } from '../lib/shared'

const CARDS = [
  {
    icon: ClipboardCheck,
    title: 'The separation is in the preparation',
    body: '~20 minutes of research per enterprise account, same template every time.',
  },
  {
    icon: Users,
    title: 'Intel from the inside',
    body: 'Talk to people at the account first; learn their initiatives and their language.',
  },
  {
    icon: Sparkles,
    title: 'Top 1% outreach',
    body: 'Their words, a real point of view, nothing generic.',
  },
  {
    icon: CircleHelp,
    title: 'The why behind the why',
    body: 'Ask "What trumps that?" before connecting anything to Devin.',
  },
  {
    icon: Flag,
    title: 'Know the destination',
    body: 'Ideal next step + two backups, stated upfront.',
  },
  {
    icon: Handshake,
    title: 'Earn trust in person',
    body: 'Face-to-face beats ten Zoom calls.',
  },
]

export function Philosophy() {
  return (
    <Section id="philosophy" eyebrow="02 / Mindset" title="The philosophy">
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.1}>
            <div className="glass glass-hover group h-full p-6">
              <div className="mb-4 inline-flex rounded-lg border border-neon-violet/25 bg-neon-violet/10 p-2.5 text-neon-violet transition-all duration-300 group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan group-hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
                <c.icon size={20} aria-hidden />
              </div>
              <h3 className="font-display text-base font-semibold leading-snug text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
