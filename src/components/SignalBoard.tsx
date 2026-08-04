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
 * （奖章合影当封面，四拍现场退成小图带），下半是四个方向的短卡，一问一答。
 * 入场动画交给 CSS animation-timeline: view()，不再用 JS observer。
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


/**
 * 盖章只该发生一次 —— 它是个瞬时事件，不是随滚动来回擦洗的进度。
 * 所以这里单独用一次性的 observer，而不是 animation-timeline: view()
 * （那个会在往回滚时把章"抬起来"）。
 */
function useStampOnce() {
  const ref = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, on }
}

export function SignalBoard() {
  const [zoom, setZoom] = useState<number | null>(null)
  const stamp = useStampOnce()

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

        {/* ── 主图：和副主席的奖章合影 —— 这一段的封面 ─────────── */}
        <div className="mt-10 grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <figure className="beat-in md:col-span-7">
            <button
              type="button"
              onClick={() => setZoom(4)}
              aria-label="View larger: with Conference Vice Chair Scott Tamashiro"
              className="group/hero halftone relative block w-full cursor-zoom-in overflow-hidden rounded-[1.6rem] border border-plum/10 shadow-[0_40px_80px_-42px_rgba(58,36,64,0.7)]"
            >
              <img
                src="/ieee/theta-vicechair.jpg"
                alt="Olivia with IEEE Rising Stars Conference Vice Chair Scott Tamashiro, holding the first-place certificate and medal"
                className="aspect-[4/3] w-full object-cover object-[50%_46%] transition-transform duration-[1.2s] group-hover/hero:scale-[1.04]"
              />
              <span
                ref={stamp.ref}
                data-on={stamp.on}
                className="stamp pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#C0913C]/45 bg-white/90 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#8A6A22] shadow-[0_8px_20px_-10px_rgba(192,145,60,0.9)] backdrop-blur"
              >
                <span aria-hidden className="text-[#C0913C]">★</span>
                Pitch Contest · Age Tech · 1st place
              </span>
            </button>
            <figcaption className="mt-3 font-hand text-[15px] text-plum-muted">
              with Scott Tamashiro, Conference Vice Chair ✦
            </figcaption>
          </figure>

          <div className="md:col-span-5">
            <blockquote>
              <p className="font-serif text-[clamp(1.15rem,2.2vw,1.6rem)] font-light leading-snug text-plum">
                “Usually there aren’t many questions after a pitch. How active this discussion was
                reflects how interested the room is.”
              </p>
              <footer className="mt-3 text-[12.5px] text-plum-faint">
                Scott Tamashiro · IEEE Rising Stars Conference Vice Chair
              </footer>
            </blockquote>
            <p className="mt-6 border-l-2 border-[#C0913C]/50 pl-4 text-[13px] leading-relaxed text-plum-muted">
              Top 3 finalist → live pitch → 7–8 questions → first place. My part: the product story,
              the pitch on stage, and the Q&amp;A that followed.
            </p>
          </div>
        </div>

        {/* 四拍现场退成一条小图带 —— 主角只有一个。入场交给 CSS view() */}
        <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {BEATS.map((b) => (
            <li key={b.k} className="beat-in">
              <button
                type="button"
                onClick={() => setZoom(b.z)}
                aria-label={`View larger: ${SHOTS[b.z].alt}`}
                className="group/b block w-full cursor-zoom-in text-left"
              >
                <span className="halftone relative block overflow-hidden rounded-[0.9rem] border border-plum/10">
                  <img
                    src={SHOTS[b.z].src}
                    alt={SHOTS[b.z].alt}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover/b:scale-[1.06]"
                  />
                </span>
                <span className="mt-2 flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: b.gold ? '#C0913C' : '#7A9CC6' }}
                  />
                  <span
                    className="text-[12px] font-medium leading-none"
                    style={{ color: b.gold ? '#8A6A22' : '#3A2440' }}
                  >
                    {b.k}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>

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
