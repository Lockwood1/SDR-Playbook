import { MotionConfig } from 'framer-motion'
import { Backdrop } from './components/Backdrop'
import { Nav } from './components/Nav'
import { ColdCallBuilder } from './sections/Builder'
import { Closing } from './sections/Closing'
import { Hero } from './sections/Hero'
import { Objections } from './sections/Objections'
import { Philosophy } from './sections/Philosophy'
import { Rapport } from './sections/Rapport'
import { Stats } from './sections/Stats'
import { Timeline } from './sections/Timeline'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#why"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neon-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#05060a]"
      >
        Skip to content
      </a>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Philosophy />
        <Timeline />
        <ColdCallBuilder />
        <Objections />
        <Rapport />
        <Closing />
      </main>
    </MotionConfig>
  )
}
