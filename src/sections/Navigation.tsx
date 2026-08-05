import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

/** 顺序跟着页面本身的顺序走，滚动高亮才不会跳 */
const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#impact' },
  { label: 'Journey', href: '#journey' },
  { label: 'Life', href: '#life' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 当前所在章节：命中视口上三分之一的最后一节
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive('#' + hit.target.id)
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
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
              aria-current={active === l.href ? 'true' : undefined}
              className={`group relative text-[13px] font-medium transition-colors ${
                active === l.href ? 'text-plum' : 'text-plum-muted hover:text-plum'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-orchid transition-all duration-300 group-hover:w-full ${
                  active === l.href ? 'w-full' : 'w-0'
                }`}
              />
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
