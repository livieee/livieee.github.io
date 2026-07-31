import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#impact' },
  { label: 'Journey', href: '#journey' },
  { label: 'Life', href: '#life' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Main">
        <a href="#top" className="group/logo flex items-baseline gap-2 font-serif text-lg font-medium tracking-tight text-plum">
          <span aria-hidden className="text-sm text-orchid/70 transition-transform duration-300 group-hover/logo:-translate-y-0.5">⌐</span>
          <span>Hi, I'm Olivia</span>
          <span aria-hidden className="text-sm text-orchid/70 transition-transform duration-300 group-hover/logo:translate-x-0.5 group-hover/logo:translate-y-0.5">↘</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[13px] font-medium text-plum-muted transition-colors hover:text-plum"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-orchid transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-rose px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
          >
            Say Hello
          </a>
        </div>
        <a
          href="#contact"
          className="rounded-full bg-rose px-4 py-1.5 text-[13px] font-medium text-white md:hidden"
        >
          Say Hello
        </a>
      </nav>
    </motion.header>
  )
}
