import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { EEG_BANDS, eegPath } from '@/components/EEGTrace'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'
import { PhotoRail } from '@/components/PhotoRail'

/**
 * Recognition · IEEE Rising Stars 2026 —— 两个一等奖，一条人本主线。
 *
 * 一张紧凑的卡，左右两个视觉世界刻意用不同语言：
 *   左 Theta  —— 会场窗口：现场提问浮在照片上，下面四个方向可点，
 *                每条提问对应它变成的那个产品/GTM 判断（不动就自己轮播）
 *   右 TaaLA —— 实验窗口：Art / Explain 两种模式可切，画面与说明同步换，
 *                背后是与案例页同源的频带走线（Explain 模式下退让）
 * 不做 3D 翻转（Hero 已有），只用尺度、透明度与一条流向的连线。
 *
 * 事实来源：IEEE Rising Stars 官方页面 + Theta Health 赛后复盘。
 */

const SHOTS: GalleryItem[] = [
  { src: '/ieee/two-certs.jpg', alt: 'Two first-place certificates', cap: 'Two first-place certificates — Pitch Contest and Project Showcase' },
  { src: '/ieee/theta-podium.jpg', alt: 'Olivia presenting Theta Health AI at the lectern', cap: 'The AgeTech pitch, from the lectern' },
  { src: '/ieee/theta-room.jpg', alt: 'The audience during the pitch', cap: 'The room — 7–8 questions followed' },
  { src: '/ieee/theta-vicechair.jpg', alt: 'With Conference Vice Chair Scott Tamashiro', cap: 'With Conference Vice Chair Scott Tamashiro' },
  { src: '/ieee/theta-problem-slide.jpg', alt: 'The problem slide from the pitch', cap: 'The problem slide — why AgeTech, in numbers' },
  { src: '/ieee/pitch-stage.jpg', alt: 'Receiving the pitch contest certificate', cap: 'Pitch Contest · AgeTech — receiving the award' },
  { src: '/ieee/taala-art.jpg', alt: 'Four states of the EEG-driven generative art', cap: 'Calm, intense, excited — and the explain mode' },
  { src: '/ieee/poster.jpg', alt: 'The CMU research poster', cap: 'The CMU research poster — I designed it' },
  { src: '/ieee/poster-team.jpg', alt: 'The team at the CMU booth', cap: 'At the CMU booth, mid-showcase' },
  { src: '/ieee/certs-three.jpg', alt: 'Three team members with certificates', cap: 'Project Showcase — first place' },
  { src: '/ieee/showcase-stage.jpg', alt: 'Winners and organisers on stage', cap: 'On stage with the organisers' },
  { src: '/ieee/group-stage.jpg', alt: 'All 2026 winners on stage', cap: 'All the 2026 winners, lined up' },
]

/**
 * 现场那七八个提问集中在四个方向，每一条都变成了一个产品/GTM 判断。
 * 文案压缩自 Theta Health 的公开赛后复盘（与 /work/theta 的 SignalBoard 同源），
 * 只做删减不做推断。
 */
const SIGNALS = [
  {
    k: 'Trust',
    q: 'How do you keep health data out of the LLM?',
    a: 'Layered isolation, de-identified context. It stopped being an implementation detail and became a positioning line — Privacy-by-Architecture.',
    tint: '#D193A8',
  },
  {
    k: 'Reach',
    q: 'Build your own senior community, or join the ones that exist?',
    a: 'AARP as a priority channel — it carries reach and inherited trust. IEEE’s 2025 president added: also a commercial entry point.',
    tint: '#B98ACB',
  },
  {
    k: 'Standards',
    q: 'IEEE standards? FDA approval?',
    a: 'Theta organises and explains health data — it doesn’t diagnose. That scope keeps it outside device territory today, and we opened a conversation with the IEEE Standards Association.',
    tint: '#7A9CC6',
  },
  {
    k: 'Access',
    q: 'Other languages? Older adults without a smartphone?',
    a: 'Multilingual as a baseline, not a later feature — and lower-barrier access beyond one more app to learn.',
    tint: '#8FAE8B',
  },
]

/**
 * 装置的两种模式 —— 一种给人感受，一种给人理解。
 * 口径与 /work/therapy-as-living-art 的 MODES 一致。
 */
const MODES = [
  {
    k: 'Art mode',
    img: '/ieee/mode-calm.jpg',
    alt: 'Art Mode — the silhouette becomes a calm, blue-toned aura',
    zoom: 6,
    line: 'Creates emotional resonance.',
    body: 'The silhouette becomes an aura — calm reads as a dim, flowing stream; high arousal ignites. Nothing to read, you just recognise yourself in it.',
    tint: '#B98ACB',
  },
  {
    k: 'Explain mode',
    img: '/ieee/mode-explain.jpg',
    alt: 'Explain Mode — the same moment as five EEG bands and a point in valence–arousal space',
    zoom: 6,
    line: 'Creates transparency and trust.',
    body: 'The same moment as five EEG bands and a point in valence–arousal space — so a person can see which signals produced the image.',
    tint: '#7A9CC6',
  },
]

/** 中间的连线：随 hover 流向一侧 */
function Thread({ side }: { side: 'theta' | 'taala' | null }) {
  const anim =
    side === 'theta'
      ? 'thread-left 1.2s linear infinite'
      : side === 'taala'
        ? 'thread-right 1.2s linear infinite'
        : 'none'
  return (
    <svg viewBox="0 0 24 260" className="h-full w-6" fill="none" aria-hidden preserveAspectRatio="none">
      <path
        d="M12 0 V96 l-5 8 10 10 -8 10 7 9 -4 7 V260"
        stroke="#C9A1BE"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="6 8"
        style={{ animation: anim }}
      />
    </svg>
  )
}

export function IEEEAwards() {
  const [zoom, setZoom] = useState<number | null>(null)
  const [side, setSide] = useState<'theta' | 'taala' | null>(null)
  const [sig, setSig] = useState(0)
  const sigTaken = useRef(false)
  const [mode, setMode] = useState(0)
  const modeTaken = useRef(false)

  // 没人碰的时候四条信号自己轮播；一旦点过就交还控制权，
  // 悬停在这半张卡上也暂停 —— 不跟正在读的人抢。
  useEffect(() => {
    if (sigTaken.current || side === 'theta') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setSig((p) => (p + 1) % SIGNALS.length), 6500)
    return () => clearTimeout(t)
  }, [sig, side])

  // 右卡同一套节奏：两种模式自己交替，点过就停
  useEffect(() => {
    if (modeTaken.current || side === 'taala') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setMode((p) => (p + 1) % MODES.length), 5200)
    return () => clearTimeout(t)
  }, [mode, side])

  return (
    <section
      id="ieee-awards"
      aria-label="IEEE Rising Stars 2026 awards"
      className="relative mt-16 overflow-hidden rounded-[1.8rem] border border-plum/10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, #FBF2E9 0%, #FAE8EB 24%, #FBF6F2 50%, #F1EDFA 76%, #E9EEF7 100%)',
        }}
      />

      <div className="relative px-6 py-8 md:px-9 md:py-9">
        {/* 顶部 */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-plum/10">
              <img src="/logos/ieee.png" alt="IEEE" className="h-[17px] w-[17px] object-contain" />
            </span>
            <div>
              <p className="label-text">Recognition · IEEE Rising Stars 2026</p>
              <h3 className="mt-1.5 max-w-xl font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-light leading-snug text-plum">
                Two projects. Two first-place wins.{' '}
                <span className="italic text-orchid">One human-centered thread.</span>
              </h3>
            </div>
          </div>
          <p className="font-hand text-[15px] text-plum-muted">Las Vegas · January 2026 ✦</p>
        </div>

        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-plum-muted md:ml-[44px]">
          From making health information easier to act on to making inner states visible — two
          different ways of helping emerging technology feel more human.
        </p>

        {/* 双面展台 */}
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-3">
          {/* ── 左：Theta · Pitch Board ─────────────────────── */}
          <div
            onPointerEnter={(e) => e.pointerType !== 'touch' && setSide('theta')}
            onPointerLeave={() => setSide(null)}
            className="group/th relative flex flex-col rounded-[1.3rem] border border-rose/25 bg-white/70 p-4 transition-all duration-500"
            style={{
              transform: side === 'theta' ? 'scale(1.02)' : 'scale(1)',
              opacity: side === 'taala' ? 0.6 : 1,
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-rose">
              Age Tech Pitch · 1st place
            </p>
            <h4 className="mt-1 font-serif text-[17px] font-light leading-snug text-plum">
              Theta Health AI
            </h4>

            {/* 会场窗口：右边是不断流动的脑波，这边就是不断举起来的手 */}
            <div className="relative mt-3 overflow-hidden rounded-[1rem] border border-plum/10 bg-[#0E1526]">
              <button
                type="button"
                onClick={() => setZoom(1)}
                aria-label="View the pitch photo larger"
                className="halftone relative block w-full cursor-zoom-in"
              >
                <img
                  src="/ieee/theta-podium.jpg"
                  alt="Olivia presenting Theta Health AI at IEEE Rising Stars"
                  loading="lazy"
                  className="h-[172px] w-full object-cover object-[50%_24%] transition-transform duration-700 group-hover/th:scale-[1.04]"
                />
              </button>

              {/* 当前被选中的那个提问，浮在会场上方 —— 照片因此在"说话" */}
              <p
                key={sig}
                className="pointer-events-none absolute left-3 top-3 z-20 max-w-[56%] rounded-[0.85rem] rounded-tl-[0.25rem] bg-white/95 px-3 py-2 text-[11px] font-medium leading-snug text-plum shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                style={{ animation: 'q-pop .45s cubic-bezier(.2,.8,.25,1) both' }}
              >
                <span aria-hidden className="mr-1 text-plum-faint">“</span>
                {SIGNALS[sig].q}
              </p>

              <span className="pointer-events-none absolute right-2 top-2 z-20 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-medium text-[#C0913C] shadow-sm backdrop-blur">
                1st Place ✦
              </span>

              <img
                src="/ieee/theta-cert-tight.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute right-2.5 top-9 z-20 h-[62px] w-[88px] rotate-[4deg] rounded-[0.5rem] object-cover shadow-[0_12px_26px_-10px_rgba(0,0,0,0.9)] ring-1 ring-white/30 transition-transform duration-500 group-hover/th:rotate-[1deg]"
              />
            </div>

            {/* 四个方向：现场提问 → 产品判断。点一下换一条，不动就自己走 */}
            <p className="mt-4 flex items-center gap-1.5 font-hand text-[13px] text-plum-muted">
              <span aria-hidden>↳</span> 7–8 questions — four directions
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5" role="tablist" aria-label="What the room asked">
              {SIGNALS.map((s, i) => {
                const on = i === sig
                return (
                  <button
                    key={s.k}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      sigTaken.current = true
                      setSig(i)
                    }}
                    className="rounded-full border px-2.5 py-[3px] text-[10.5px] font-medium leading-none transition-all duration-300"
                    style={{
                      borderColor: on ? s.tint : 'rgba(58,36,64,0.12)',
                      background: on ? `${s.tint}1F` : 'rgba(255,255,255,0.7)',
                      color: on ? '#3A2440' : 'rgba(138,110,132,0.9)',
                    }}
                  >
                    {s.k}
                  </button>
                )
              })}
            </div>

            <div className="mt-2.5 min-h-[64px]">
              <p
                key={`a-${sig}`}
                className="border-l-2 pl-2.5 text-[12px] leading-relaxed text-plum-muted"
                style={{
                  borderColor: SIGNALS[sig].tint,
                  animation: 'q-pop .45s cubic-bezier(.2,.8,.25,1) both',
                }}
              >
                {SIGNALS[sig].a}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Product storytelling', 'Live pitch', 'Market signals'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] text-[10px] leading-none text-plum-faint"
                >
                  {t}
                </span>
              ))}
            </div>


            <div className="mt-auto flex items-center justify-between gap-2 pt-4">
              <Link
                to="/work/theta"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-2 text-[12px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum"
              >
                See the pitch story
                <span aria-hidden>→</span>
              </Link>
              <span
                className="font-hand text-[13px] text-plum-muted transition-opacity duration-300"
                style={{ opacity: side === 'theta' ? 1 : 0 }}
              >
                listen to the room ✦
              </span>
            </div>
          </div>

          {/* 中：连线 */}
          <div className="hidden items-stretch justify-center md:flex">
            <Thread side={side} />
          </div>

          {/* ── 右：TaaLA · 发光的实验窗口 ───────────────────── */}
          <div
            onPointerEnter={(e) => e.pointerType !== 'touch' && setSide('taala')}
            onPointerLeave={() => setSide(null)}
            className="group/ta relative flex flex-col rounded-[1.3rem] border border-orchid/25 bg-white/60 p-4 transition-all duration-500"
            style={{
              transform: side === 'taala' ? 'scale(1.02)' : 'scale(1)',
              opacity: side === 'theta' ? 0.6 : 1,
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-orchid">
              Project Showcase · 1st place
            </p>
            <h4 className="mt-1 font-serif text-[17px] font-light leading-snug text-plum">
              Therapy as a Living Art
            </h4>

            {/* 实验窗口 */}
            <div className="relative mt-3 overflow-hidden rounded-[1rem] border border-plum/10 bg-[#0E1526]">
              {/* 与案例页同一套频带走线：δ 慢而大 → γ 快而小。
                  画两份首尾相接，drift 走满一份就无缝回到起点。 */}
              <svg
                viewBox="0 0 800 100"
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 h-full w-[200%] mix-blend-screen"
                preserveAspectRatio="none"
                style={{
                  animation: 'eeg-drift 22s linear infinite',
                  opacity: mode === 1 ? 0.16 : side === 'taala' ? 0.5 : 0.3,
                  transition: 'opacity .5s',
                }}
              >
                {[0, 400].map((ox) => (
                  <g key={ox} transform={`translate(${ox} 0)`}>
                    {EEG_BANDS.map((b, r) => (
                      <path
                        key={b.name}
                        d={eegPath(11 + r * 19.5, b.freq, b.amp * 0.62, r * 1.3, 400)}
                        stroke={b.c}
                        strokeOpacity="0.75"
                        strokeWidth="1"
                        strokeLinecap="round"
                        fill="none"
                      />
                    ))}
                  </g>
                ))}
              </svg>

              <button
                type="button"
                onClick={() => setZoom(MODES[mode].zoom)}
                aria-label="View the generative art larger"
                className="halftone relative block w-full cursor-zoom-in"
              >
                <img
                  key={mode}
                  src={MODES[mode].img}
                  alt={MODES[mode].alt}
                  loading="lazy"
                  className="h-[172px] w-full object-cover transition-transform duration-700 group-hover/ta:scale-[1.04]"
                  style={{ animation: 'q-pop .5s cubic-bezier(.2,.8,.25,1) both' }}
                />
              </button>

              {/* 当前模式的一句话，浮在画面上 —— 与左卡的提问气泡同一位置语言 */}
              <p
                key={`m-${mode}`}
                className="pointer-events-none absolute bottom-3 left-3 z-20 max-w-[68%] rounded-[0.85rem] rounded-bl-[0.25rem] bg-white/95 px-3 py-2 text-[11px] font-medium leading-snug text-plum shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                style={{ animation: 'q-pop .45s cubic-bezier(.2,.8,.25,1) both' }}
              >
                {MODES[mode].line}
              </p>

              <span className="pointer-events-none absolute right-2 top-2 z-20 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-medium text-[#C0913C] shadow-sm backdrop-blur">
                1st Place ✦
              </span>

            </div>

            {/* 两种模式：一种给人感受，一种给人理解。不动就自己交替 */}
            <p className="mt-4 flex items-center gap-1.5 font-hand text-[13px] text-plum-muted">
              <span aria-hidden>↳</span> one to feel, one to understand
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5" role="tablist" aria-label="Interaction modes">
              {MODES.map((m, i) => {
                const on = i === mode
                return (
                  <button
                    key={m.k}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      modeTaken.current = true
                      setMode(i)
                    }}
                    className="rounded-full border px-2.5 py-[3px] text-[10.5px] font-medium leading-none transition-all duration-300"
                    style={{
                      borderColor: on ? m.tint : 'rgba(58,36,64,0.12)',
                      background: on ? `${m.tint}1F` : 'rgba(255,255,255,0.7)',
                      color: on ? '#3A2440' : 'rgba(138,110,132,0.9)',
                    }}
                  >
                    {m.k}
                  </button>
                )
              })}
            </div>

            <div className="mt-2.5 min-h-[64px]">
              <p
                key={`mb-${mode}`}
                className="border-l-2 pl-2.5 text-[12px] leading-relaxed text-plum-muted"
                style={{
                  borderColor: MODES[mode].tint,
                  animation: 'q-pop .45s cubic-bezier(.2,.8,.25,1) both',
                }}
              >
                {MODES[mode].body}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Product UI', 'Experience design', 'Research communication'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] text-[10px] leading-none text-plum-faint"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 pt-4">
              <Link
                to="/work/therapy-as-living-art"
                className="inline-flex items-center gap-1.5 rounded-full bg-orchid px-4 py-2 text-[12px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum"
              >
                Explore the showcase
                <span aria-hidden>→</span>
              </Link>
              <span
                className="font-hand text-[13px] text-plum-muted transition-opacity duration-300"
                style={{ opacity: side === 'taala' ? 1 : 0 }}
              >
                making the invisible visible ✦
              </span>
            </div>
          </div>
        </div>

        {/* 现场照：跟案例页一样自己走，没人会去拖一条横条 */}
        <div className="mt-6">
          <PhotoRail items={SHOTS} onZoom={setZoom} duration={78} size="sm" tone="light" bleed={false} />
        </div>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </section>
  )
}
