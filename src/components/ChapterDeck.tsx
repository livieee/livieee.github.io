import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 章节册 —— 横向翻页而不是一路下滚。
 *
 * 翻页入口放在每页正文的末尾，不放在页眉右上角：读完一页，眼睛已经在
 * 页面底部，那里才是人真正会去点的位置。整条「下一章」是一个满宽的
 * 大目标，还预告了下一章讲什么 —— 有内容可预期，人才愿意点。
 * 顶部的章节条退回成「地图」：告诉你在哪、总共几章，可以随时跳。
 * ← → 键与触屏横扫照旧。
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
      // 翻页后把视线带回本页开头，否则从长页翻过去会停在半空
      requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - 96
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' })
      })
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
  const prev = i > 0 ? chapters[i - 1] : null
  const next = i < chapters.length - 1 ? chapters[i + 1] : null

  return (
    <div ref={wrapRef} className="relative">
      {/* 页眉：只当地图用 */}
      <div className={`border-b pb-4 ${dark ? 'border-white/10' : 'border-plum/10'}`}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {chapters.map((ch, n) => (
            <button
              key={ch.n}
              type="button"
              onClick={() => jump(n)}
              aria-current={n === i ? 'step' : undefined}
              className="group/tab flex items-baseline gap-1.5 transition-opacity duration-300 hover:opacity-100"
              style={{ opacity: n === i ? 1 : 0.4 }}
            >
              <span
                className="font-serif text-[13px] leading-none transition-colors duration-300"
                style={{ color: n === i ? (dark ? '#CBB8F5' : '#B98ACB') : dark ? 'rgba(230,224,240,0.75)' : '#8A6E84' }}
              >
                {ch.n}
              </span>
              <span className={`text-[11px] uppercase tracking-[0.16em] ${dark ? 'text-white/70' : 'text-plum-muted'}`}>
                {ch.label}
              </span>
              <span
                aria-hidden
                className={`ml-0.5 block h-px transition-all duration-500 ${dark ? 'bg-[#CBB8F5]' : 'bg-orchid'}`}
                style={{ width: n === i ? 18 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* 进度：读到哪儿了 */}
        <div className="mt-3.5 flex items-center gap-3">
          <span
            aria-hidden
            className={`h-[2px] flex-1 overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-plum/10'}`}
          >
            <span
              className={`block h-full rounded-full transition-all duration-500 ${dark ? 'bg-[#CBB8F5]' : 'bg-orchid'}`}
              style={{ width: `${((i + 1) / chapters.length) * 100}%` }}
            />
          </span>
          <span className={`font-serif text-[12px] tabular-nums ${dark ? 'text-white/45' : 'text-plum-faint'}`}>
            {c.n} / {chapters[chapters.length - 1].n}
          </span>
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
          <h2
            className={`max-w-2xl font-serif text-2xl font-light leading-snug md:text-[2rem] ${
              dark ? 'text-[#F6F1EA]' : 'text-plum'
            }`}
          >
            {c.title}
          </h2>
          {c.lede && (
            <p className={`mt-3 max-w-2xl text-[14.5px] leading-relaxed ${dark ? 'text-[#CFC7DE]' : 'text-plum-muted'}`}>
              {c.lede}
            </p>
          )}
          <div className="mt-7">{c.body}</div>

          {/* 翻页入口：读完正文，手就在这儿 */}
          <div className="mt-12 flex flex-col gap-3">
            {next && (
              <button
                type="button"
                onClick={() => go(1)}
                className={`group/next flex w-full items-center gap-4 rounded-[1.3rem] border px-5 py-5 text-left transition-all duration-300 md:px-7 md:py-6 ${
                  dark
                    ? 'border-white/10 bg-white/[0.05] backdrop-blur-md hover:border-[#CBB8F5]/50 hover:bg-white/10'
                    : 'border-plum/10 bg-white/60 hover:border-orchid/40 hover:bg-white'
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[10.5px] uppercase tracking-[0.18em] ${
                      dark ? 'text-white/40' : 'text-plum-faint'
                    }`}
                  >
                    Next · {next.n} {next.label}
                  </span>
                  <span
                    className={`mt-1.5 block font-serif text-[17px] font-light leading-snug md:text-[20px] ${
                      dark ? 'text-[#F6F1EA]' : 'text-plum'
                    }`}
                  >
                    {next.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[16px] transition-transform duration-300 group-hover/next:translate-x-1 ${
                    dark ? 'bg-[#CBB8F5]/20 text-[#CBB8F5]' : 'bg-orchid/15 text-orchid'
                  }`}
                >
                  →
                </span>
              </button>
            )}

            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className={`group/prev inline-flex items-center gap-2 text-[12.5px] transition-colors duration-300 ${
                    dark ? 'text-white/45 hover:text-white/85' : 'text-plum-faint hover:text-plum'
                  }`}
                >
                  <span aria-hidden className="transition-transform duration-300 group-hover/prev:-translate-x-0.5">
                    ←
                  </span>
                  Back to {prev.n} {prev.label}
                </button>
              ) : (
                <span />
              )}
              <span className={`font-hand text-[14px] ${dark ? 'text-white/35' : 'text-plum-faint'}`}>
                {next ? 'or use ← → ✦' : 'end of the story ✦'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
