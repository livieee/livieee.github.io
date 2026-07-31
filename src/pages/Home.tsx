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
        <Journey />
        <HowIWork />
        <EcosystemBeyond />
        <Life />
        <Contact />
      </main>
    </div>
  )
}
