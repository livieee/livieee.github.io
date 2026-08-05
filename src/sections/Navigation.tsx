import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

/**
 * 顺序跟着页面本身的顺序走，滚动高亮才不会跳。
 * Work 指向首页的 Selected Impact；想看全部项目，走那一段最底下的
 * More work → /work。导航项直接跳去另一页会把正在读首页的人踢出去。
 */
const LINKS: { label: string; href?: string; to?: string }[] = [
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

  /**
   * 当前所在章节：横跨视口上方那条判定线的最后一节。
   *
   * 用滚动监听而不是 IntersectionObserver：大幅跳转（点导航一次跨过好几节）
   * 时 IO 的回调不一定触发，实测从 Life 滚回作品区时高亮会停在 Life。
   * rAF 节流，每帧最多算一次，六个 getBoundingClientRect 的开销可以忽略。
   *
   * 也把 #impact 算进来 —— 它不再是导航项，但不算的话滚回作品区时
   * 导航上会留着一个不该亮的高亮。
   */
  useEffect(() => {
    const ids = ['top', 'impact', 'journey', 'life']
    let raf = 0

    const recompute = () => {
      raf = 0
      const line = window.innerHeight * 0.12
      let hit = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) hit = '#' + id
      }
      setActive(hit)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(recompute)
    }

    recompute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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
          {LINKS.map((l) => {
            const on = !!l.href && active === l.href
            const cls = `group relative text-[13px] font-medium transition-colors ${
              on ? 'text-plum' : 'text-plum-muted hover:text-plum'
            }`
            const underline = (
              <span
                className={`absolute -bottom-1 left-0 h-px bg-orchid transition-all duration-300 group-hover:w-full ${
                  on ? 'w-full' : 'w-0'
                }`}
              />
            )
            return l.to ? (
              <Link key={l.label} to={l.to} className={cls}>
                {l.label}
                {underline}
              </Link>
            ) : (
              <a key={l.label} href={l.href} aria-current={on ? 'true' : undefined} className={cls}>
                {l.label}
                {underline}
              </a>
            )
          })}
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
