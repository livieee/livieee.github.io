import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * From product to stage —— IEEE Rising Stars 2026 AgeTech Pitch。
 *
 * 奖只是结果，值钱的是「读懂房间」：现场七八个提问集中在四个方向，
 * 每条都能翻成一个产品/GTM 判断。
 *
 * 这一版让照片当主角、文字只留骨头：上半是四张现场照串成的一条线
 * （随滚动逐张点亮，最后一拍落金），下半是四个方向的短卡，一问一答。
 * 内容全部来自 Theta Health 的公开赛后复盘，未做加工推断。
 */

const SHOTS: GalleryItem[] = [
  {
    src: '/ieee/theta-problem-slide.jpg',
    alt: 'The problem slide — 10,000 people turning 65 a day, 800,000 clinician shortage by 2027',
    cap: 'The problem slide — why AgeTech, in numbers',
  },
  {
    src: '/ieee/theta-podium.jpg',
    alt: 'Olivia presenting Theta Health AI from the IEEE Rising Stars lectern',
    cap: 'The AgeTech pitch, from the lectern',
  },
  {
    src: '/ieee/theta-room.jpg',
    alt: 'The audience during the Theta Health pitch',
    cap: 'The room — 7–8 questions followed',
  },
  {
    src: '/ieee/pitch-stage.jpg',
    alt: 'Receiving the first-place certificate for the AgeTech Pitch Contest',
    cap: 'Pitch Contest · Age Tech — first place',
  },
  {
    src: '/ieee/theta-vicechair.jpg',
    alt: 'Olivia with IEEE Rising Stars Conference Vice Chair Scott Tamashiro',
    cap: 'With Conference Vice Chair Scott Tamashiro',
  },
  {
    src: '/ieee/theta-cert.jpg',
    alt: 'The first-place certificate for Theta Health AI, Pitch Contest: Age Tech',
    cap: 'Pitch Contest · Age Tech — first place',
  },
]

/** 四拍现场：每拍一张真照片 + 两三个字 */
const BEATS = [
  { k: 'Why AgeTech', z: 0, lift: 'md:translate-y-6' },
  { k: 'The pitch', z: 1, lift: '' },
  { k: 'The room', z: 2, lift: 'md:translate-y-8' },
  { k: '1st place', z: 3, lift: 'md:translate-y-2', gold: true },
]

/** 四个方向 —— 只留一问一答，长版复盘不放这里 */
const SIGNALS = [
  {
    k: 'Trust',
    q: 'How do you keep health data out of the LLM?',
    a: 'Layered isolation, de-identified context. It became a positioning line — Privacy-by-Architecture.',
    tint: '#D193A8',
  },
  {
    k: 'Reach',
    q: 'Build your own senior community, or join the ones that exist?',
    a: 'AARP: reach plus inherited trust — and, IEEE’s 2025 president added, a commercial entry point.',
    tint: '#B98ACB',
  },
  {
    k: 'Standards',
    q: 'IEEE standards? FDA approval?',
    a: 'It organises and explains, it doesn’t diagnose — outside device scope today. A conversation with the IEEE Standards Association followed.',
    tint: '#7A9CC6',
  },
  {
    k: 'Access',
    q: 'Other languages? Older adults without a smartphone?',
    a: 'Multilingual as a baseline, and lower-barrier access beyond one more app to learn.',
    tint: '#8FAE8B',
  },
]

/** 四张现场照随滚动逐张点亮 */
function useLit(count: number) {
  const ref = useRef<HTMLOListElement>(null)
  const [lit, setLit] = useState(-1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(count - 1)
      return
    }
    const items = [...el.querySelectorAll('li')]
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setLit((p) => Math.max(p, items.indexOf(e.target as HTMLLIElement)))
        }),
      { rootMargin: '-10% 0px -20% 0px', threshold: 0.25 },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [count])
  return { ref, lit }
}

export function SignalBoard() {
  const [zoom, setZoom] = useState<number | null>(null)
  const { ref, lit } = useLit(BEATS.length)

  return (
    <section id="pitch-story" className="relative scroll-mt-16 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(233,238,247,0) 0%, rgba(233,238,247,0.5) 30%, rgba(250,231,234,0.4) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="label-text mb-4 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#7A9CC6]" />
            From product to stage · IEEE Rising Stars 2026
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            The room asked seven or eight questions.{' '}
            <span className="italic text-orchid">Every one was a signal.</span>
          </h2>
        </Reveal>

        {/* ── 四拍现场：照片当主角，字只留标签 ─────────────────── */}
        <ol ref={ref} className="relative mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {BEATS.map((b, i) => {
            const on = i <= lit
            return (
              <li key={b.k} className={`relative ${b.lift}`}>
                <button
                  type="button"
                  onClick={() => setZoom(b.z)}
                  aria-label={`View larger: ${SHOTS[b.z].alt}`}
                  className="group/b block w-full cursor-zoom-in text-left"
                >
                  <span
                    className="halftone relative block overflow-hidden rounded-[1.1rem] border border-plum/10 transition-all duration-700"
                    style={{
                      opacity: on ? 1 : 0.4,
                      transform: on ? 'translateY(0)' : 'translateY(16px)',
                      boxShadow: on
                        ? b.gold
                          ? '0 22px 44px -24px rgba(192,145,60,0.85)'
                          : '0 18px 38px -24px rgba(58,36,64,0.5)'
                        : 'none',
                    }}
                  >
                    <img
                      src={SHOTS[b.z].src}
                      alt={SHOTS[b.z].alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover/b:scale-[1.05]"
                    />
                  </span>
                  <span className="mt-2.5 flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
                      style={{
                        backgroundColor: on ? (b.gold ? '#C0913C' : '#7A9CC6') : 'rgba(58,36,64,0.18)',
                      }}
                    />
                    <span
                      className="text-[12.5px] font-medium leading-none transition-colors duration-500"
                      style={{ color: on ? (b.gold ? '#8A6A22' : '#3A2440') : '#8A6E84' }}
                    >
                      {b.k}
                    </span>
                    {b.gold && on && (
                      <span
                        aria-hidden
                        className="text-[12px] text-[#C0913C]"
                        style={{ animation: 'annot-in .6s .3s both' }}
                      >
                        ★
                      </span>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {/* ── 旁证：一句话 + 合影 ──────────────────────────────── */}
        <Reveal delay={0.08}>
          <blockquote className="mt-12 flex flex-col gap-4 rounded-[1.4rem] border border-plum/10 bg-white/70 p-5 sm:flex-row sm:items-center sm:gap-5 md:p-6">
            <button
              type="button"
              onClick={() => setZoom(4)}
              aria-label="View larger: with Conference Vice Chair Scott Tamashiro"
              className="group/v halftone relative block shrink-0 cursor-zoom-in self-start overflow-hidden rounded-[1rem] border border-plum/10 sm:self-auto"
            >
              <img
                src="/ieee/theta-vicechair-tight.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="h-[96px] w-[96px] object-cover transition-transform duration-500 group-hover/v:scale-[1.07]"
              />
            </button>
            <div className="min-w-0">
              <p className="font-serif text-[clamp(1rem,1.7vw,1.25rem)] font-light leading-snug text-plum">
                “Usually there aren’t many questions after a pitch. How active this discussion was
                reflects how interested the room is.”
              </p>
              <footer className="mt-2 text-[12px] text-plum-faint">
                Scott Tamashiro · IEEE Rising Stars Conference Vice Chair
              </footer>
            </div>
          </blockquote>
        </Reveal>

        {/* ── 四个方向：一问一答，各两行 ───────────────────────── */}
        <Reveal delay={0.06}>
          <p className="mt-14 font-serif text-[19px] font-light text-plum">They clustered into four.</p>
        </Reveal>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SIGNALS.map((s, i) => (
            <Reveal key={s.k} delay={0.06 + i * 0.07}>
              <article
                className="h-full rounded-[1.2rem] border bg-white/70 p-5 transition-transform duration-500 hover:-translate-y-1"
                style={{ borderColor: `${s.tint}3D` }}
              >
                <span
                  className="inline-block rounded-full px-2.5 py-[3px] text-[11px] font-medium leading-none"
                  style={{ backgroundColor: `${s.tint}22`, color: s.tint }}
                >
                  {s.k}
                </span>
                <p className="mt-3 text-[13.5px] italic leading-snug text-plum">“{s.q}”</p>
                <p
                  className="mt-3 border-l-2 pl-3 text-[12.5px] leading-relaxed text-plum-muted"
                  style={{ borderColor: s.tint }}
                >
                  {s.a}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-hand text-[16px] text-plum-muted">
            my part ✦ product story · on-stage pitch · live Q&amp;A
          </p>
        </Reveal>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </section>
  )
}
