import { useEffect, useRef, useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * How I Create Value —— 两段：
 *   ① What I bring to the table：手绘桌子 + 桌面上摆着的工具
 *   ② The hand I'd bring：四张牌背朝上，点一下抽开
 *
 * 视觉留在站点原有的米色 + 衬线体里；道具与牌背全部 SVG 手绘，
 * 不引照片素材，也不复刻任何既有牌面美术。
 * 牌面引文都有出处，来自她自己页面上的说法或她做过的事。
 */

type Card = {
  rank: string
  suit: 'spark' | 'target' | 'hands' | 'clock' | 'flow' | 'globe'
  title: string
  quote: string
  skills: string[]
}

const HAND: Card[] = [
  {
    rank: '01',
    suit: 'spark',
    title: 'AI Product & Product Operations',
    quote: 'Turning user needs and messy cross-functional input into clear priorities and workflows that ship.',
    skills: ['Product discovery', 'Customer research', 'Product analytics', 'AI workflow design'],
  },
  {
    rank: '02',
    suit: 'target',
    title: 'GTM Strategy & Adoption',
    quote: 'Connecting what a product can do to the people who need it — launches, narratives, adoption.',
    skills: ['GTM strategy', 'Product launches', 'Metric definition', 'A/B testing & funnels'],
  },
  {
    rank: '03',
    suit: 'hands',
    title: 'Strategic Partnerships',
    quote: 'Turning promising conversations into collaborations both sides keep showing up for.',
    skills: ['Partner programs', 'Stakeholder management', 'Executive communication'],
  },
  {
    rank: '04',
    suit: 'clock',
    title: 'Ecosystem & Program Execution',
    quote: 'Bringing companies, researchers and communities into the same room — and giving it a shape.',
    skills: ['Developer relations', 'Program design', 'Speaker sourcing', 'Cross-functional execution'],
  },
  {
    rank: '05',
    suit: 'flow',
    title: 'Agentic Coding & Automation',
    quote: 'A daily pipeline that gathers, reads, retries and reports — before the workday starts.',
    skills: ['Agentic coding', 'Data pipelines', 'Vision-model OCR', 'CI & scheduling'],
  },
  {
    rank: '06',
    suit: 'globe',
    title: 'Cross-Cultural Fluency',
    quote: 'Bilingual 中文 / English — at home in both US and China AI ecosystems.',
    skills: ['Bilingual communication', 'US–China ecosystems', 'Community bridge-building'],
  },
]

function Suit({ name, className = '' }: { name: Card['suit']; className?: string }) {
  const p = {
    spark: (
      <>
        <path d="M11 2.6c.7 4 1.9 6.1 5.4 7.4-3.5 1.3-4.7 3.4-5.4 7.4-.7-4-1.9-6.1-5.4-7.4C9.1 8.7 10.3 6.6 11 2.6Z" />
        <path d="M17.6 14.4c.3 1.7.8 2.6 2.3 3.1-1.5.6-2 1.4-2.3 3.1-.3-1.7-.8-2.5-2.3-3.1 1.5-.5 2-1.4 2.3-3.1Z" />
      </>
    ),
    target: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <circle cx="11" cy="11" r="4.4" />
        <circle cx="11" cy="11" r="1" />
      </>
    ),
    hands: (
      <>
        <path d="M2.6 9.4 5.8 6.8l4.1 1.1L13 6.8l4.2 2.5" />
        <path d="M5.8 6.8v7.9c0 .9.8 1.6 1.8 1.5" />
        <path d="M17.2 9.4v6c0 .9-.8 1.6-1.7 1.5" />
        <path d="m8.1 13.1 2.6 2.4c.7.6 1.7.6 2.3-.1l3.6-3.9" />
      </>
    ),
    clock: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <path d="M11 6.2V11l3.4 2.1" />
      </>
    ),
    flow: (
      <>
        <circle cx="5" cy="11" r="2.4" />
        <circle cx="17" cy="5.5" r="2.4" />
        <circle cx="17" cy="16.5" r="2.4" />
        <path d="M7.2 10 14.8 6.4" />
        <path d="M7.2 12 14.8 15.6" />
      </>
    ),
    globe: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <ellipse cx="11" cy="11" rx="3.6" ry="8.2" />
        <path d="M3.2 11h15.6" />
      </>
    ),
  }[name]

  return (
    <svg
      viewBox="0 0 22 22"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {p}
    </svg>
  )
}

/** 牌背：塔罗式结构（双层金边 + 饰带 + 太阳纹 + 新月小星），原创绘制 */
function CardBack() {
  const rays = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * Math.PI) / 6
    return {
      x1: 80 + Math.cos(a) * 14,
      y1: 112 + Math.sin(a) * 14,
      x2: 80 + Math.cos(a) * (i % 2 === 0 ? 24 : 19.5),
      y2: 112 + Math.sin(a) * (i % 2 === 0 ? 24 : 19.5),
    }
  })
  return (
    <svg viewBox="0 0 160 230" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cb-rose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9556B" />
          <stop offset="1" stopColor="#7C3B50" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="152" height="222" rx="12" fill="url(#cb-rose)" />
      <rect x="9" y="9" width="142" height="212" rx="9" fill="none" stroke="#E5C285" strokeWidth="2" />
      <rect x="14" y="14" width="132" height="202" rx="7" fill="none" stroke="#E5C285" strokeOpacity="0.5" strokeWidth="0.9" />

      {/* 四角卷纹 */}
      {[
        'M22 34c1-8 6-13 14-14',
        'M138 34c-1-8-6-13-14-14',
        'M22 196c1 8 6 13 14 14',
        'M138 196c-1 8-6 13-14 14',
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke="#E5C285" strokeOpacity="0.85" strokeWidth="1.3" strokeLinecap="round" />
      ))}

      {/* 上下饰带 */}
      <path d="M54 21h52l-4.5 6.5h-43z" fill="#E5C285" fillOpacity="0.9" />
      <path d="M54 209h52l-4.5-6.5h-43z" fill="#E5C285" fillOpacity="0.9" />

      {/* 中央太阳纹 */}
      <circle cx="80" cy="112" r="35" fill="none" stroke="#EED3A0" strokeWidth="1.5" />
      <circle cx="80" cy="112" r="28" fill="none" stroke="#EED3A0" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="80" cy="112" r="11.5" fill="#EED3A0" fillOpacity="0.95" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#EED3A0" strokeWidth="2.1" strokeLinecap="round" />
      ))}

      {/* 新月与小星 */}
      <path d="M47 146a11 11 0 1 0 9.5-17.5 9 9 0 0 1-9.5 17.5Z" fill="#EED3A0" fillOpacity="0.9" />
      <path d="M114 79l2.7 5.6 5.6 2.7-5.6 2.7-2.7 5.6-2.7-5.6-5.6-2.7 5.6-2.7Z" fill="#EED3A0" fillOpacity="0.92" />

      {/* 边缘菱形点缀 */}
      {[58, 80, 102].map((x) => (
        <path key={'t' + x} d={`M${x} 36l3 3-3 3-3-3Z`} fill="#E5C285" fillOpacity="0.55" />
      ))}
      {[58, 80, 102].map((x) => (
        <path key={'b' + x} d={`M${x} 188l3 3-3 3-3-3Z`} fill="#E5C285" fillOpacity="0.55" />
      ))}
    </svg>
  )
}

/* ── 桌上的工具：只列有据可查的 ──────────────────────────────── */
const LINES = [
  { k: 'Design & prototyping', v: 'Figma, Miro' },
  { k: 'AI & agentic coding', v: 'Claude, OpenAI, Playwright, GitHub Actions' },
  { k: 'Specs, data & reporting', v: 'Notion, Tableau' },
  { k: 'Programs & community', v: 'Luma, Devpost, Discord' },
]

/** 盘子上的摆法：外圈 7 个、内圈 4 个，坐标是百分比 */
const PLATE = [
  { n: 'Figma', l: '/logos/tools/figma.jpg', x: 50, y: 15 },
  { n: 'Claude', l: '/logos/tools/claude.jpg', x: 77, y: 27 },
  { n: 'Notion', l: '/logos/tools/notion.jpg', x: 86, y: 55 },
  { n: 'Luma', l: '/logos/tools/luma.jpg', x: 69, y: 81 },
  { n: 'Devpost', l: '/logos/tools/devpost.jpg', x: 38, y: 86 },
  { n: 'Miro', l: '/logos/tools/miro.jpg', x: 14, y: 62 },
  { n: 'GitHub Actions', l: '/logos/tools/github.jpg', x: 18, y: 30 },
  { n: 'OpenAI', l: '/logos/tools/openai.png', x: 41, y: 42 },
  { n: 'Playwright', l: '/logos/tools/playwright.svg', x: 63, y: 46 },
  { n: 'Tableau', l: '/logos/tools/tableau.jpg', x: 39, y: 66 },
  { n: 'Discord', l: '/logos/tools/discord.jpg', x: 62, y: 68 },
]

/** 手绘的盘子 + 叉子 —— 纯 SVG */
function PlateSketch({ className = '' }: { className?: string }) {
  const scallops = Array.from({ length: 28 }).map((_, i) => {
    const a = (i / 28) * Math.PI * 2
    const a2 = ((i + 1) / 28) * Math.PI * 2
    const r = 96
    return `M${100 + Math.cos(a) * r} ${100 + Math.sin(a) * r} A6 6 0 0 1 ${100 + Math.cos(a2) * r} ${100 + Math.sin(a2) * r}`
  })
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <circle cx="100" cy="100" r="94" fill="#FFFFFF" fillOpacity="0.85" />
      <circle cx="100" cy="100" r="94" stroke="#3A2440" strokeOpacity="0.13" strokeWidth="1.1" />
      <circle cx="100" cy="100" r="80" stroke="#3A2440" strokeOpacity="0.09" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="72" stroke="#3A2440" strokeOpacity="0.06" strokeWidth="0.8" />
      {scallops.map((d, i) => (
        <path key={i} d={d} stroke="#3A2440" strokeOpacity="0.1" strokeWidth="0.9" />
      ))}
    </svg>
  )
}

function ForkSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 150"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 6v34" />
      <path d="M20 6v34" />
      <path d="M28 6v34" />
      <path d="M8 40c0 8 4 12 12 12s12-4 12-12" />
      <path d="M20 52v92" />
    </svg>
  )
}

export function HowICreateValue() {
  const [active, setActive] = useState<number | null>(null)
  const [dealt, setDealt] = useState(false)
  const fanRef = useRef<HTMLDivElement>(null)

  // 进入视口时才「发牌」：四张从法阵中心散开
  useEffect(() => {
    const el = fanRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDealt(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">How I Create Value</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="Analytical in approach." />{' '}
        <span className="italic text-orchid">
          <WordReveal text="Human in execution." delay={0.3} />
        </span>
      </h2>

      <Reveal className="mt-8">
        <p className="max-w-2xl text-[15px] leading-relaxed text-plum-muted">
          Every “complex system” I’ve worked on turned out to be people trying to get something
          done. I start by understanding how they actually work, then build the structure — specs,
          programs, partnerships — that makes the work feel lighter rather than heavier.
        </p>
      </Reveal>

      {/* ── ① 四个领域：环形牌阵，点击抽出 ─────────────────────── */}
      <Reveal className="mt-16">
        <p className="text-center font-hand text-[17px] text-plum-muted">
          {active === null ? 'so — pick a card ✦' : 'tap it again to put it back ✦'}
        </p>
      </Reveal>

      <Reveal className="mt-4" y={30}>
        <div
          ref={fanRef}
          className="relative mx-auto h-[540px] w-full max-w-4xl select-none"
          style={{ perspective: '1500px' }}
        >
          {/* 法阵：星形 + 符点环 + 太阳与新月（静止；抽牌时点亮） */}
          <svg
            viewBox="0 0 400 160"
            className="pointer-events-none absolute bottom-[5%] left-1/2 w-[80%] -translate-x-1/2"
            fill="none"
            aria-hidden
            style={{
              transition: 'filter .6s, opacity .6s',
              opacity: active !== null ? 1 : 0.88,
              filter: active !== null ? 'drop-shadow(0 0 14px rgba(199,154,75,0.5))' : 'none',
            }}
          >
            <ellipse cx="200" cy="80" rx="182" ry="58" stroke="#C79A4B" strokeOpacity="0.5" strokeWidth="1.3" />
            <ellipse cx="200" cy="80" rx="174" ry="54" stroke="#C79A4B" strokeOpacity="0.3" strokeWidth="0.9" />
            {/* 符点环 */}
            {Array.from({ length: 16 }).map((_, i) => {
              const a2 = (i / 16) * Math.PI * 2
              return (
                <circle
                  key={'d' + i}
                  cx={200 + Math.cos(a2) * 163}
                  cy={80 + Math.sin(a2) * 50}
                  r="2.3"
                  fill="#C79A4B"
                  fillOpacity="0.45"
                />
              )
            })}
            {/* 内环 + 五角星 */}
            <ellipse cx="200" cy="80" rx="120" ry="36" stroke="#C79A4B" strokeOpacity="0.4" strokeWidth="1" />
            <path
              d="M200 44 270.5 109.1 85.9 68.9 314.1 68.9 129.5 109.1Z"
              stroke="#D193A8"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* 中央太阳 */}
            <ellipse cx="200" cy="80" rx="15" ry="11" stroke="#C79A4B" strokeOpacity="0.7" strokeWidth="1.2" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a3 = (i / 12) * Math.PI * 2
              return (
                <line
                  key={'r' + i}
                  x1={200 + Math.cos(a3) * 18}
                  y1={80 + Math.sin(a3) * 13}
                  x2={200 + Math.cos(a3) * 26}
                  y2={80 + Math.sin(a3) * 19}
                  stroke="#C79A4B"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              )
            })}
            {/* 新月与小星 */}
            <path d="M118 88a9 9 0 1 0 7.6-14 7.3 7.3 0 0 1-7.6 14Z" fill="#C79A4B" fillOpacity="0.5" />
            <path d="M282 68l2 4.1 4.1 2-4.1 2-2 4.1-2-4.1-4.1-2 4.1-2Z" fill="#D193A8" fillOpacity="0.6" />
          </svg>

          {/* 法阵中心的呼吸光 */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[4%] left-1/2 h-[140px] w-[300px] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(199,154,75,0.2) 0%, rgba(185,138,203,0.1) 50%, rgba(255,255,255,0) 72%)',
              animation: 'seal-breathe 6.5s ease-in-out infinite',
            }}
          />

          {/* 樱花瓣飘落 */}
          {[
            { left: 8, size: 15, dur: 11, delay: 0 },
            { left: 22, size: 11, dur: 13.5, delay: 2.2 },
            { left: 38, size: 17, dur: 10, delay: 4.8 },
            { left: 55, size: 12, dur: 14.5, delay: 1.1 },
            { left: 70, size: 16, dur: 11.8, delay: 3.6 },
            { left: 84, size: 12, dur: 13, delay: 5.4 },
            { left: 93, size: 14, dur: 10.6, delay: 2.9 },
            { left: 47, size: 10, dur: 15.5, delay: 7.1 },
          ].map((pt, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              aria-hidden
              className="pointer-events-none absolute -top-2"
              style={{
                left: `${pt.left}%`,
                width: pt.size,
                height: pt.size,
                animation: `petal-drift ${pt.dur}s ${pt.delay}s linear infinite`,
              }}
            >
              <path
                d="M10 1.5C13.6 4.8 14.6 9.6 10 14.5 5.4 9.6 6.4 4.8 10 1.5Z"
                fill={i % 2 === 0 ? '#EDC3D3' : '#E4AFC6'}
                fillOpacity="0.8"
              />
            </svg>
          ))}

          {/* 环形牌阵：缓慢公转，选中时暂停 */}
          <div
            className="absolute left-1/2 top-[44%]"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%) rotateX(9deg)',
            }}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: 'ring-spin 44s linear infinite',
                animationPlayState: active === null && dealt ? 'running' : 'paused',
              }}
            >
              {HAND.map((c, i) => (
                <button
                  key={c.rank}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Draw card ${c.rank} — ${c.title}`}
                  className="absolute left-1/2 top-1/2 h-[286px] w-[182px] outline-none"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${i * 60}deg) translateZ(${dealt ? 258 : 0}px)`,
                    transition: 'transform .9s cubic-bezier(.2,.75,.2,1), opacity .6s',
                    transitionDelay: dealt ? `${i * 0.1}s` : '0s',
                    opacity: !dealt ? 0 : active !== null ? 0.22 : 1,
                    pointerEvents: active === null ? 'auto' : 'none',
                  }}
                >
                  <span className="block h-full w-full overflow-hidden rounded-[1rem] shadow-[0_16px_36px_-18px_rgba(58,36,64,0.5)] transition-transform duration-300 hover:scale-[1.045]">
                    <CardBack />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 抽出的牌：升到中央翻开 */}
          {active !== null && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[5%] left-1/2 h-[120px] w-[78%] -translate-x-1/2 rounded-[50%] border border-champagne-deep/50"
                style={{ animation: 'seal-cast 1.1s ease-out both' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[44%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(199,154,75,0.22) 0%, rgba(185,138,203,0.12) 45%, rgba(255,255,255,0) 70%)',
                  animation: 'halo-in .8s ease-out both',
                }}
              />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={`${HAND[active].title} — tap to put back`}
                className="absolute left-1/2 top-[44%] z-30 h-[340px] w-[214px] -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ perspective: '1200px' }}
              >
                <span
                  className="relative block h-full w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    animation: 'card-reveal .85s cubic-bezier(.2,.75,.2,1) both',
                  }}
                >
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_24px_52px_-20px_rgba(58,36,64,0.55)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardBack />
                  </span>

                  <span
                    className="absolute inset-0 flex flex-col rounded-[1.1rem] border border-champagne-deep/40 bg-cream-soft px-5 py-5 text-left shadow-[0_24px_52px_-20px_rgba(58,36,64,0.5)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex flex-col items-center gap-0.5 text-plum">
                        <span className="font-serif text-[20px] leading-none">{HAND[active].rank}</span>
                        <Suit name={HAND[active].suit} className="h-3.5 w-3.5" />
                      </span>
                      <span aria-hidden className="h-px w-10 bg-plum/15" />
                    </span>

                    <span className="mt-5 block font-serif text-[17px] font-light leading-snug text-plum">
                      {HAND[active].title}
                    </span>

                    <span className="mt-3 block font-hand text-[15px] leading-snug text-plum-muted">
                      “{HAND[active].quote}”
                    </span>

                    <span className="mt-auto block space-y-1 pt-4">
                      {HAND[active].skills.map((sk) => (
                        <span key={sk} className="flex items-baseline gap-1.5 text-[12px] text-plum-muted">
                          <span aria-hidden className="text-lavender-deep">
                            ·
                          </span>
                          {sk}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            </>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-24">
        <p className="text-center font-hand text-[16px] text-plum-muted">
          … and these are what I reach for to do it ↓
        </p>
      </Reveal>

      {/* ── ② What I bring to the table ───────────────────────── */}
      <Reveal className="mt-6" y={28}>
        <div className="relative overflow-hidden rounded-[1.6rem] border border-plum/10 bg-white/55 px-6 pb-8 pt-7 md:px-9 md:pb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              What I bring to the table
            </p>
            <p className="font-hand text-[15px] text-plum-muted">
              what I actually open on a weekday ✦
            </p>
          </div>

          <div className="mt-6 grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
            {/* 左：分类清单 */}
            <ul className="space-y-3">
              {LINES.map((r) => (
                <li key={r.k}>
                  <span className="block font-hand text-[15px] text-plum-muted">{r.k}</span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-plum">{r.v}</span>
                </li>
              ))}
            </ul>

            {/* 右：盘子 + logo 摆成一圈 */}
            <div className="relative mx-auto w-full max-w-[380px]">
              <div className="relative aspect-square">
                <PlateSketch className="absolute inset-0 h-full w-full drop-shadow-[0_18px_38px_rgba(58,36,64,0.16)]" />
                {PLATE.map((t, i) => (
                  <span
                    key={t.n}
                    title={t.n}
                    style={{
                      left: `${t.x}%`,
                      top: `${t.y}%`,
                      animation: `annot-in .55s ${0.08 * i}s ease-out both`,
                    }}
                    className="group/tool absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[10px] bg-white shadow-[0_6px_14px_-6px_rgba(58,36,64,0.5)] ring-1 ring-plum/10 transition-transform duration-300 hover:-translate-y-[calc(50%+4px)] hover:scale-110"
                  >
                    <img
                      src={t.l}
                      alt={t.n}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                ))}
              </div>
              <ForkSketch className="absolute -left-6 bottom-2 h-[62%] w-auto text-plum/25" />
            </div>
          </div>
        </div>
      </Reveal>

    </section>
  )
}
