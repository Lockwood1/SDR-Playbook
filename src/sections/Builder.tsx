import { Check, Copy } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Reveal, Section } from '../lib/shared'

type PersonaKey = 'vp' | 'ciso' | 'cost' | 'logistics'
type FormatKey = 'call' | 'voicemail' | 'followup'

interface Fields {
  name: string
  company: string
  trigger: string
  theme: string
  initiative: string
}

const PERSONAS: Record<PersonaKey, { label: string; pain: string; proof: string }> = {
  vp: {
    label: 'VP Eng / CTO',
    pain: 'a backlog of migrations and tech debt competing with everything else on the roadmap',
    proof: 'Mercedes-Benz used Devin to finish a migration scoped at eight months in eight days.',
  },
  ciso: {
    label: 'CISO / AppSec',
    pain: 'a flood of security alerts, most of them false positives, with fixes stuck waiting on engineering',
    proof: 'Devin Security Swarm confirms which vulnerabilities are real and writes the fix.',
  },
  cost: {
    label: 'Cost-focused exec',
    pain: 'engineering and vendor spend under scrutiny',
    proof: 'Citi cut its tech vendor spend by 30%.',
  },
  logistics: {
    label: 'Logistics / ops company',
    pain: 'legacy systems slowing modernization',
    proof: 'Odyssey Logistics saw a 37% net cost saving.',
  },
}

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: 'call', label: 'Cold call' },
  { key: 'voicemail', label: 'Voicemail' },
  { key: 'followup', label: 'Follow-up message' },
]

type Seg = { t: string; kind?: 'field' | 'persona' | 'missing' }
type Step = { label: string; segs: Seg[] }

const text = (t: string): Seg => ({ t })

export function ColdCallBuilder() {
  const [persona, setPersona] = useState<PersonaKey>('vp')
  const [format, setFormat] = useState<FormatKey>('call')
  const [copied, setCopied] = useState(false)
  const [fields, setFields] = useState<Fields>({
    name: 'Alex',
    company: 'Atlas Freight Systems',
    trigger: 'you joined as VP of Engineering in September',
    theme: 'a year of modernization',
    initiative: 'moving off legacy systems',
  })
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const p = PERSONAS[persona]

  const steps: Step[] = useMemo(() => {
    const f = (key: keyof Fields): Seg =>
      fields[key].trim() ? { t: fields[key].trim(), kind: 'field' } : { t: `{${key}}`, kind: 'missing' }
    const pv = (t: string): Seg => ({ t, kind: 'persona' })

    if (format === 'voicemail') {
      return [
        {
          label: 'Voicemail',
          segs: [
            text('Hi '),
            f('name'),
            text(', Carson from Cognition. I saw '),
            f('trigger'),
            text(' and had an idea about '),
            pv(p.pain),
            text('. '),
            pv(p.proof),
            text(" I'll send you a quick note."),
          ],
        },
      ]
    }
    if (format === 'followup') {
      return [
        {
          label: 'Follow-up',
          segs: [
            f('name'),
            text(', just tried you by phone. Saw '),
            f('trigger'),
            text('. Teams in that spot often have '),
            pv(p.pain),
            text('. '),
            pv(p.proof),
            text(' Worth 20 minutes to see if it fits your plans?'),
          ],
        },
      ]
    }
    return [
      {
        label: 'Opener',
        segs: [
          text('Hi '),
          f('name'),
          text(
            ", it's Carson from Cognition. I know I'm calling out of the blue. Can I take 30 seconds to tell you why, and you can tell me if it's worth continuing?",
          ),
        ],
      },
      {
        label: 'Their world',
        segs: [text('I saw '), f('trigger'), text(', and that '), f('company'), text(' is calling this '), f('theme'), text('.')],
      },
      {
        label: 'POV + proof',
        segs: [
          text('For most teams, that means '),
          pv(p.pain),
          text('. We built Devin, an AI engineer that takes that kind of work off your team\u2019s plate. '),
          pv(p.proof),
        ],
      },
      {
        label: 'One question',
        segs: [
          text('Out of curiosity, is '),
          f('initiative'),
          text(' the top priority right now, or is something trumping it?'),
        ],
      },
      {
        label: 'The ask',
        segs: [text('Would it be crazy to grab 20 minutes next week to see if there\u2019s a fit?')],
      },
    ]
  }, [fields, p, format])

  const copyScript = async () => {
    const body = steps
      .map((s, i) => `${steps.length > 1 ? `${i + 1}. ` : ''}${s.label.toUpperCase()}\n"${s.segs.map((x) => x.t).join('')}"`)
      .join('\n\n')
    try {
      await navigator.clipboard.writeText(body)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = body
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = e.key === 'ArrowRight' ? (idx + 1) % FORMATS.length : (idx - 1 + FORMATS.length) % FORMATS.length
    setFormat(FORMATS[next].key)
    tabsRef.current[next]?.focus()
  }

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((s) => ({ ...s, [key]: e.target.value }))

  const inputCls =
    'w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-[13px] text-slate-100 placeholder:text-slate-600 transition-colors focus:border-neon-cyan/60 focus:bg-neon-cyan/[0.04] focus:outline-none'
  const labelCls = 'mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400'

  return (
    <Section id="builder" eyebrow="04 / Interactive" title="Cold call builder">
      <Reveal>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Fill in the account intel — the script writes itself. Persona sets the pain and the proof; your research does
          the rest.
        </p>
      </Reveal>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Inputs */}
        <Reveal className="lg:sticky lg:top-24">
          <div className="glass p-6 sm:p-7">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-neon-violet">
              Account intel
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cc-name" className={labelCls}>
                  Prospect name
                </label>
                <input id="cc-name" className={inputCls} value={fields.name} onChange={set('name')} placeholder="Alex" />
              </div>
              <div>
                <label htmlFor="cc-company" className={labelCls}>
                  Company
                </label>
                <input
                  id="cc-company"
                  className={inputCls}
                  value={fields.company}
                  onChange={set('company')}
                  placeholder="Atlas Freight"
                />
              </div>
            </div>

            <div className="mt-5">
              <span id="cc-persona-label" className={labelCls}>
                Persona
              </span>
              <div role="radiogroup" aria-labelledby="cc-persona-label" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(Object.keys(PERSONAS) as PersonaKey[]).map((k) => (
                  <button
                    key={k}
                    role="radio"
                    aria-checked={persona === k}
                    onClick={() => setPersona(k)}
                    className={`rounded-lg border px-3 py-2.5 text-left font-mono text-xs transition-all ${
                      persona === k
                        ? 'border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)]'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-slate-200'
                    }`}
                  >
                    {PERSONAS[k].label}
                  </button>
                ))}
              </div>
              <div className="mt-3 space-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 font-mono text-[11px] leading-relaxed">
                <p className="text-slate-400">
                  <span className="mr-2 text-neon-magenta">PAIN ▸</span>
                  {p.pain}
                </p>
                <p className="text-slate-400">
                  <span className="mr-2 text-neon-violet">PROOF ▸</span>
                  {p.proof}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="cc-trigger" className={labelCls}>
                  Trigger
                </label>
                <input
                  id="cc-trigger"
                  className={inputCls}
                  value={fields.trigger}
                  onChange={set('trigger')}
                  placeholder="you joined as VP of Engineering in September"
                />
              </div>
              <div>
                <label htmlFor="cc-theme" className={labelCls}>
                  Their theme / language
                </label>
                <input
                  id="cc-theme"
                  className={inputCls}
                  value={fields.theme}
                  onChange={set('theme')}
                  placeholder="a year of modernization"
                />
              </div>
              <div>
                <label htmlFor="cc-initiative" className={labelCls}>
                  Their initiative
                </label>
                <input
                  id="cc-initiative"
                  className={inputCls}
                  value={fields.initiative}
                  onChange={set('initiative')}
                  placeholder="moving off legacy systems"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Output */}
        <Reveal delay={0.1}>
          <div className="terminal-card overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div role="tablist" aria-label="Script format" className="flex items-center gap-1 rounded-lg bg-white/[0.04] p-1">
                {FORMATS.map((f, i) => (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={format === f.key}
                    ref={(el) => {
                      tabsRef.current[i] = el
                    }}
                    onClick={() => setFormat(f.key)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-all sm:px-3 ${
                      format === f.key
                        ? 'bg-neon-violet/20 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.5)]'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <button
                onClick={copyScript}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-300 transition-all hover:border-neon-cyan/50 hover:text-neon-cyan"
                aria-live="polite"
              >
                {copied ? <Check size={13} className="text-neon-cyan" /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="px-5 py-6 font-mono text-[13px] leading-[1.9] text-slate-300 sm:px-7 sm:text-sm">
              <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-slate-500">
                <span className="text-neon-cyan">$</span> ./script --persona {p.label.toLowerCase().replace(/\s|\/+/g, '-')}
              </p>
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <li key={s.label}>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neon-cyan">
                      {steps.length > 1 && <span className="mr-2 text-slate-600">{String(i + 1).padStart(2, '0')}</span>}
                      {s.label}
                    </p>
                    <p className="border-l-2 border-white/10 pl-4">
                      {s.segs.map((seg, j) =>
                        seg.kind === 'field' ? (
                          <span key={j} className="text-neon-cyan">
                            {seg.t}
                          </span>
                        ) : seg.kind === 'persona' ? (
                          <span key={j} className="text-neon-violet">
                            {seg.t}
                          </span>
                        ) : seg.kind === 'missing' ? (
                          <span key={j} className="text-slate-600">
                            {seg.t}
                          </span>
                        ) : (
                          <span key={j}>{seg.t}</span>
                        ),
                      )}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-slate-600">
                <span className="text-neon-cyan">&gt;</span> ready<span className="terminal-cursor" aria-hidden />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
