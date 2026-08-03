import { useState } from 'react'
import { Link } from 'react-router'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * Recognition · IEEE Rising Stars 2026 —— 两个一等奖，一条人本主线。
 *
 * 一张紧凑的卡，左右两个视觉世界刻意用不同语言：
 *   左 Theta  —— 微微倾斜的 Pitch Board：舞台照最大，证书压角，hover 浮出问题气泡
 *   右 TaaLA —— 发光的实验窗口：Art Mode 画面 + 背后流动的脑波 + 钉住的 Explain Mode
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

const BUBBLES = ['privacy?', 'AARP?', 'multilingual?', 'standards?']

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

            {/* 舞台照最大 + 证书压角 + 问题气泡 */}
            <div className="relative mt-3">
              <button
                type="button"
                onClick={() => setZoom(1)}
                aria-label="View the pitch photo larger"
                className="block w-full cursor-zoom-in overflow-hidden rounded-[1rem] border border-plum/10"
              >
                <img
                  src="/ieee/theta-podium.jpg"
                  alt="Olivia presenting Theta Health AI at IEEE Rising Stars"
                  loading="lazy"
                  className="h-[148px] w-full -rotate-[0.6deg] scale-[1.04] object-cover object-[50%_24%] transition-transform duration-500 group-hover/th:-translate-y-[5px]"
                />
              </button>
              <img
                src="/ieee/theta-cert.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute -bottom-2 right-2 h-[58px] w-[82px] rotate-[5deg] rounded-[0.5rem] border-2 border-white object-cover shadow-[0_10px_22px_-10px_rgba(58,36,64,0.6)] transition-transform duration-500 group-hover/th:rotate-[2deg]"
              />
              {BUBBLES.map((q, i) => (
                <span
                  key={q}
                  aria-hidden
                  className="pointer-events-none absolute rounded-full bg-white/88 px-2 py-[3px] text-[10px] text-plum-muted shadow-sm backdrop-blur transition-all duration-500"
                  style={{
                    left: ['6%', '46%', '10%', '54%'][i],
                    top: ['8%', '4%', '58%', '44%'][i],
                    opacity: side === 'theta' ? 1 : 0,
                    transform: side === 'theta' ? 'translateY(0)' : 'translateY(6px)',
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  {q}
                </span>
              ))}
            </div>

            <p className="mt-4 flex items-center gap-1.5 font-hand text-[13px] text-plum-muted">
              <span aria-hidden>↳</span> 7–8 questions from the room
            </p>

            <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">
              From product vision to a live conversation about trust, access, standards and
              partnerships.
            </p>

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
              <svg
                viewBox="0 0 400 100"
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 h-full w-[200%] opacity-35 mix-blend-screen"
                preserveAspectRatio="none"
                style={{ animation: 'eeg-drift 16s linear infinite' }}
              >
                {[22, 50, 78].map((y, r) => (
                  <path
                    key={y}
                    d={`M0 ${y} ${Array.from({ length: 40 })
                      .map((_, i) => `L${i * 10} ${y + Math.sin(i * (0.7 + r * 0.4)) * (5 + r * 2)}`)
                      .join(' ')}`}
                    stroke={['#7FD3E8', '#C9A6F2', '#F2A0C4'][r]}
                    strokeOpacity="0.55"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
              </svg>

              <button
                type="button"
                onClick={() => setZoom(6)}
                aria-label="View the generative art larger"
                className="relative block w-full cursor-zoom-in"
              >
                <img
                  src="/ieee/mode-calm.jpg"
                  alt="The Art Mode silhouette — a calm, blue-toned aura"
                  loading="lazy"
                  className="h-[148px] w-full object-cover transition-transform duration-700 group-hover/ta:-translate-y-[5px]"
                />
              </button>

              <span className="pointer-events-none absolute right-2 top-2 z-20 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-medium text-[#C0913C] shadow-sm backdrop-blur">
                1st Place ✦
              </span>

              <img
                src="/ieee/mode-explain.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute bottom-2 left-2 z-20 h-[48px] w-[72px] -rotate-[4deg] rounded-[0.4rem] border-2 border-white/85 object-cover shadow-[0_10px_22px_-10px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover/ta:-rotate-[1deg]"
              />
              <img
                src="/ieee/poster.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute -bottom-3 -right-3 z-20 h-[52px] w-[72px] rotate-[8deg] rounded-[0.4rem] border-2 border-white/85 object-cover shadow-[0_10px_22px_-10px_rgba(0,0,0,0.7)]"
              />
            </div>

            <p className="mt-4 flex items-center gap-1.5 font-hand text-[13px] text-plum-muted">
              <span aria-hidden>↳</span> art mode ↔ explain mode
            </p>

            <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">
              Turning real-time brain signals into an experience people could see, feel and
              understand.
            </p>

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

        {/* 现场照：一条窄带 */}
        <div className="relative mt-6">
          <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setZoom(i)}
                aria-label={`View larger: ${s.alt}`}
                className="group/is h-[62px] w-[88px] shrink-0 cursor-zoom-in overflow-hidden rounded-[0.6rem] border border-plum/10 bg-white"
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/is:scale-[1.08]"
                />
              </button>
            ))}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#EDF0F8] to-transparent"
          />
        </div>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </section>
  )
}
