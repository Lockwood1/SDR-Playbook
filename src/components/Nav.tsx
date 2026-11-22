import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'why', label: 'Why now' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'process', label: 'Process' },
  { id: 'builder', label: 'Call builder' },
  { id: 'objections', label: 'Objections' },
  { id: 'rapport', label: 'Rapport' },
]

export function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const { id } of LINKS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05060a]/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-[13px] tracking-tight text-slate-300 transition-colors hover:text-white">
          <span className="text-neon-cyan">carson</span>
          <span className="text-slate-500">@</span>
          <span className="text-neon-violet">sdr-playbook</span>
          <span className="terminal-cursor ml-1.5 !h-[0.85em]" aria-hidden />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                active === l.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 shadow-[0_0_18px_-4px_rgba(34,211,238,0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <button
          className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-[#05060a]/95 backdrop-blur-xl md:hidden"
            aria-label="Sections"
          >
            <div className="flex flex-col px-5 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 font-mono text-sm ${
                    active === l.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-300'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
