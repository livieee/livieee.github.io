import { Cursor } from '@/components/Cursor'
import { Marquee } from '@/components/Marquee'
import { Navigation } from '@/sections/Navigation'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Impact } from '@/sections/Impact'
import { Capabilities } from '@/sections/Capabilities'
import { Journey } from '@/sections/Journey'
import { HowIWork } from '@/sections/HowIWork'
import { EcosystemBeyond } from '@/sections/EcosystemBeyond'
import { Life } from '@/sections/Life'
import { Contact } from '@/sections/Contact'
import { Reveal } from '@/components/Reveal'

/** Journey → Life 之间的一句手写过渡语（轻微滚动进入） */
function LifeTransition() {
  return (
    <div className="relative flex justify-center px-6 pb-2 pt-4 md:pb-4">
      <Reveal y={20}>
        <p className="text-center font-hand text-[22px] leading-snug text-plum-muted md:text-[26px]">
          and beyond the work
          <span aria-hidden className="ml-2 text-orchid">— a little more human ↓</span>
        </p>
      </Reveal>
    </div>
  )
}

export default function Home() {
  return (
    <div className="relative">
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Impact />
        <Capabilities />
        <HowIWork />
        <EcosystemBeyond />
        <Journey />
        <LifeTransition />
        <Life />
        <Contact />
      </main>
    </div>
  )
}
