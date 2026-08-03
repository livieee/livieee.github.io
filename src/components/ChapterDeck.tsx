import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 章节册 —— 横向翻页而不是一路下滚。
 * 支持：左右按钮、页码点、← → 键、触屏横扫。
 * 每翻一页内容按方向滑入，页眉给出章节序号与标题。
 */

export type Chapter = {
  n: string
  label: string
  title: string
  /** 一句话，不要段落 */
  lede?: string
  body: React.ReactNode
}

export function ChapterDeck({ chapters, tone = 'light' }: { chapters: Chapter[]; tone?: 'light' | 'dark' }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const touchX = useRef<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d)
      setI((prev) => Math.min(chapters.length - 1, Math.max(0, prev + d)))
    },
    [chapters.length],
  )

  const jump = (n: number) => {
    setDir(n > i ? 1 : -1)
    setI(n)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 120 || r.top > window.innerHeight - 120) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const c = chapters[i]
  const dark = tone === 'dark'

  return (
    <div ref={wrapRef} className="relative">
      {/* 页眉：章节导航 */}
      <div className={`flex flex-wrap items-end justify-between gap-4 border-b pb-4 ${dark ? 'border-white/10' : 'border-plum/10'}`}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {chapters.map((ch, n) => (
            <button
              key={ch.n}
              type="button"
              onClick={() => jump(n)}
              aria-current={n === i ? 'step' : undefined}
              className="group/tab flex items-baseline gap-1.5 transition-opacity duration-300"
              style={{ opacity: n === i ? 1 : 0.4 }}
            >
              <span
                className="font-serif text-[13px] leading-none transition-colors duration-300"
                style={{ color: n === i ? (dark ? '#CBB8F5' : '#B98ACB') : dark ? 'rgba(230,224,240,0.75)' : '#8A6E84' }}
              >
                {ch.n}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.16em] ${dark ? 'text-white/70' : 'text-plum-muted'}`}>{ch.label}</span>
              <span
                aria-hidden
                className={`ml-0.5 block h-px transition-all duration-500 ${dark ? 'bg-[#CBB8F5]' : 'bg-orchid'}`}
                style={{ width: n === i ? 18 : 0 }}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={`mr-1 font-hand text-[14px] ${dark ? 'text-white/60' : 'text-plum-muted'}`}>turn the page ✦</span>
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              disabled={d === -1 ? i === 0 : i === chapters.length - 1}
              aria-label={d === 1 ? 'Next chapter' : 'Previous chapter'}
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-[14px] transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-25 ${dark ? 'border-white/20 bg-white/10 text-white/90 hover:border-[#CBB8F5]/60 hover:bg-white/20' : 'border-plum/15 bg-white text-plum hover:border-orchid/50'}`}
            >
              {d === 1 ? '→' : '←'}
            </button>
          ))}
        </div>
      </div>

      {/* 页面 */}
      <div
        className="overflow-hidden pt-8"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <div
          key={i}
          style={{
            animation: `${dir === 1 ? 'page-in-next' : 'page-in-prev'} .5s cubic-bezier(.25,.75,.25,1) both`,
          }}
        >
          <h2 className={`max-w-2xl font-serif text-2xl font-light leading-snug md:text-[2rem] ${dark ? 'text-[#F6F1EA]' : 'text-plum'}`}>
            {c.title}
          </h2>
          {c.lede && (
            <p className={`mt-3 max-w-2xl text-[14.5px] leading-relaxed ${dark ? 'text-[#CFC7DE]' : 'text-plum-muted'}`}>
              {c.lede}
            </p>
          )}
          <div className="mt-7">{c.body}</div>
        </div>
      </div>
    </div>
  )
}
