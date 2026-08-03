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
  /** 牌名（顶部名牌） */
  name: string
  suit: 'spark' | 'target' | 'hands' | 'clock' | 'flow' | 'globe' | 'heart'
  title: string
  quote: string
  skills: string[]
}

const HAND: Card[] = [
  {
    name: 'THE CREATE',
    suit: 'spark',
    title: 'AI Product & Product Operations',
    quote: 'Turning user needs and messy cross-functional input into clear priorities and workflows that ship.',
    skills: ['Product discovery', 'Customer research', 'Product analytics', 'AI workflow design'],
  },
  {
    name: 'THE LIGHT',
    suit: 'target',
    title: 'GTM Strategy & Adoption',
    quote: 'Connecting what a product can do to the people who need it — launches, narratives, adoption.',
    skills: ['GTM strategy', 'Product launches', 'Metric definition', 'A/B testing & funnels'],
  },
  {
    name: 'THE MIRROR',
    suit: 'hands',
    title: 'Strategic Partnerships',
    quote: 'Turning promising conversations into collaborations both sides keep showing up for.',
    skills: ['Partner programs', 'Stakeholder management', 'Executive communication'],
  },
  {
    name: 'THE FLOWER',
    suit: 'clock',
    title: 'Ecosystem & Program Execution',
    quote: 'Bringing companies, researchers and communities into the same room — and giving it a shape.',
    skills: ['Developer relations', 'Program design', 'Speaker sourcing', 'Cross-functional execution'],
  },
  {
    name: 'THE SHIELD',
    suit: 'flow',
    title: 'Agentic Coding & Automation',
    quote: 'Traceable, retryable, human-overridable — systems that guard their own quality.',
    skills: ['Agentic coding', 'Data pipelines', 'Vision-model OCR', 'CI & scheduling'],
  },
  {
    name: 'THE DREAM',
    suit: 'globe',
    title: 'Cross-Cultural Fluency',
    quote: 'One dream, spoken in two languages — at home in both US and China AI ecosystems.',
    skills: ['Bilingual 中文 / English', 'US–China ecosystems', 'Community bridge-building'],
  },
  {
    name: 'HOPE',
    suit: 'heart',
    title: 'Warmth & Follow-Through',
    quote: 'I follow through and communicate clearly — so people would choose to work together again.',
    skills: ['Trust-building', 'Clear communication', 'Attentive to the room'],
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
    heart: (
      <path d="M11 18.4C6.2 14.9 3.2 11.9 3.2 8.6 3.2 6.2 5 4.4 7.3 4.4c1.5 0 2.9.8 3.7 2.1.8-1.3 2.2-2.1 3.7-2.1 2.3 0 4.1 1.8 4.1 4.2 0 3.3-3 6.3-7.8 9.8Z" />
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

/** 牌背：粉金 + 大翼星纹章（Sakura 牌背式版式，原创绘制） */
function CardBack() {
  return (
    <svg viewBox="0 0 160 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cb-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8CEDF" />
          <stop offset="1" stopColor="#F2B2CC" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="152" height="232" rx="12" fill="url(#cb-pink)" />
      <rect x="9" y="9" width="142" height="222" rx="9" fill="none" stroke="#C9A05C" strokeWidth="2" />
      <rect x="13.5" y="13.5" width="133" height="213" rx="7" fill="none" stroke="#C9A05C" strokeOpacity="0.5" strokeWidth="0.9" />

      {/* 大翼星纹章 */}
      <circle cx="80" cy="120" r="52" fill="none" stroke="#C9A05C" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="80" cy="120" r="44" fill="none" stroke="#C9A05C" strokeOpacity="0.32" strokeWidth="0.8" />
      {/* 左翼 */}
      <path
        d="M52 114c-18-15-39-13-48 4 12-2 20 1 28 7-8 1-15 4-21 11 11 2 21 1 31-4 4-3 8-8 10-18Z"
        fill="#FFF7F0"
        stroke="#C9A05C"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* 右翼 */}
      <path
        d="M108 114c18-15 39-13 48 4-12-2-20 1-28 7 8 1 15 4 21 11-11 2-21 1-31-4-4-3-8-8-10-18Z"
        fill="#FFF7F0"
        stroke="#C9A05C"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* 金色五角星 */}
      <path
        d="M80 98 L84.9 112.3 L100 112.6 L88 121.7 L92.3 136 L80 127.4 L67.7 136 L72 121.7 L60 112.6 L75.1 112.3 Z"
        fill="#F5CF57"
        stroke="#C0913C"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* 星下新月 */}
      <path d="M69 148a13 13 0 0 0 20 4 11 11 0 0 1-20-4Z" fill="#DBB06C" />

      {/* 上下小星点缀 */}
      {[
        [80, 34],
        [80, 206],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 6}l2.2 4.4 4.4 2.2-4.4 2.2-2.2 4.4-2.2-4.4-4.4-2.2 4.4-2.2Z`}
          fill="#C9A05C"
          fillOpacity="0.7"
        />
      ))}
      {/* 角落点缀 */}
      {[
        [24, 30],
        [136, 30],
        [24, 210],
        [136, 210],
      ].map(([x, y]) => (
        <circle key={`c${x}-${y}`} cx={x} cy={y} r="2.2" fill="#C9A05C" fillOpacity="0.55" />
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
  const [flash, setFlash] = useState(false)
  const putBack = () => {
    setActive(null)
    setFlash(true)
    window.setTimeout(() => setFlash(false), 950)
  }
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
          className="relative mx-auto h-[590px] w-full max-w-5xl select-none"
          style={{ perspective: '1600px' }}
        >
          {/* 地面法阵 */}
          <svg
            viewBox="0 0 800 300"
            className="pointer-events-none absolute bottom-[1%] left-1/2 w-[97%] -translate-x-1/2"
            fill="none"
            aria-hidden
            style={{
              transition: 'filter .6s, opacity .6s',
              opacity: active !== null ? 1 : 0.9,
              filter: active !== null ? 'drop-shadow(0 0 12px rgba(199,154,75,0.4))' : 'none',
            }}
          >
            <ellipse cx="400" cy="150" rx="380" ry="120" stroke="#C9A45C" strokeOpacity="0.6" strokeWidth="1.6" />
            <ellipse cx="400" cy="150" rx="366" ry="115" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="0.9" strokeDasharray="7 11" />
            <ellipse cx="400" cy="150" rx="322" ry="101" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="1" />
            <ellipse cx="400" cy="150" rx="236" ry="74" stroke="#C9A45C" strokeOpacity="0.4" strokeWidth="1" />
            <ellipse cx="400" cy="150" rx="150" ry="47" stroke="#C9A45C" strokeOpacity="0.3" strokeWidth="0.9" strokeDasharray="4 8" />
            <ellipse cx="400" cy="150" rx="60" ry="19" stroke="#C9A45C" strokeOpacity="0.4" strokeWidth="0.9" />
            <circle cx="400" cy="150" r="4.5" fill="#C9A45C" fillOpacity="0.6" />
            {/* 六芒星 */}
            <path d="M400 56 659.8 197 140.2 197Z" stroke="#C9A45C" strokeOpacity="0.42" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M400 244 659.8 103 140.2 103Z" stroke="#C9A45C" strokeOpacity="0.42" strokeWidth="1.1" strokeLinejoin="round" />
            {/* 小行星轨道 */}
            <circle cx="636" cy="106" r="26" stroke="#C9A45C" strokeOpacity="0.5" strokeWidth="0.9" />
            <circle cx="636" cy="106" r="14" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="0.7" />
            <circle cx="636" cy="106" r="4" fill="#C9A45C" fillOpacity="0.65" />
            {/* 方位 */}
            {[
              { t: '北', x: 400, y: 34 },
              { t: '南', x: 400, y: 274 },
              { t: '東', x: 758, y: 156 },
              { t: '西', x: 42, y: 156 },
            ].map((m) => (
              <g key={m.t}>
                <circle cx={m.x} cy={m.y - 6} r="15" stroke="#C9A45C" strokeOpacity="0.5" strokeWidth="0.9" />
                <text
                  x={m.x}
                  y={m.y}
                  textAnchor="middle"
                  fontSize="16"
                  fill="#D9B87A"
                  fillOpacity="0.9"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {m.t}
                </text>
              </g>
            ))}
          </svg>

          {/* 樱花瓣 */}
          {[
            { left: 5, size: 16, dur: 10.5, delay: 0 },
            { left: 13, size: 12, dur: 13, delay: 2.4 },
            { left: 22, size: 19, dur: 9.5, delay: 5 },
            { left: 31, size: 13, dur: 14.5, delay: 1.2 },
            { left: 40, size: 17, dur: 11, delay: 3.8 },
            { left: 49, size: 11, dur: 15.5, delay: 6.6 },
            { left: 58, size: 18, dur: 10, delay: 2 },
            { left: 67, size: 13, dur: 13.5, delay: 4.4 },
            { left: 76, size: 20, dur: 9, delay: 0.8 },
            { left: 85, size: 12, dur: 14, delay: 5.8 },
            { left: 92, size: 16, dur: 11.5, delay: 3 },
            { left: 97, size: 11, dur: 12.5, delay: 7.4 },
          ].map((pt, i) => (
            <svg
              key={'p' + i}
              viewBox="0 0 20 20"
              aria-hidden
              className="pointer-events-none absolute -top-3 z-20"
              style={{
                left: `${pt.left}%`,
                width: pt.size,
                height: pt.size,
                animation: `petal-drift ${pt.dur}s ${pt.delay}s linear infinite`,
              }}
            >
              <path
                d="M10 1.5C13.6 4.8 14.6 9.6 10 14.5 5.4 9.6 6.4 4.8 10 1.5Z"
                fill={i % 3 === 0 ? '#F6B5CD' : i % 3 === 1 ? '#F19CBC' : '#FBCBDD'}
                fillOpacity="0.92"
              />
            </svg>
          ))}

          {/* 牌圈后的暖金光 */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(233,199,120,0.2) 0%, rgba(233,199,120,0.08) 45%, rgba(255,255,255,0) 68%)',
              animation: 'glow-soft 5.5s ease-in-out infinite',
            }}
          />

          {/* 环形牌阵 */}
          <div
            className="absolute left-1/2 top-[42%]"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%) rotateX(13deg)',
            }}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: 'ring-spin 50s linear infinite',
                animationPlayState: active === null && dealt ? 'running' : 'paused',
              }}
            >
              {HAND.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Draw ${c.name} — ${c.title}`}
                  className="absolute left-1/2 top-1/2 h-[295px] w-[188px] outline-none"
                  style={{
                    transform: !dealt
                      ? `translate(-50%, -50%) rotate(${(i - 3) * 2.5}deg) scale(0.92)`
                      : `translate(-50%, -50%) rotateY(${(i * 360) / 7}deg) translateZ(292px)`,
                    transition: 'transform .95s cubic-bezier(.2,.75,.2,1), opacity .6s',
                    transitionDelay: dealt ? `${i * 0.1}s` : '0s',
                    opacity: active !== null ? 0.25 : 1,
                    pointerEvents: dealt && active === null ? 'auto' : 'none',
                  }}
                >
                  <span className="block h-full w-full overflow-hidden rounded-[1rem] shadow-[0_16px_36px_-16px_rgba(58,36,64,0.42)] transition-transform duration-300 hover:scale-[1.045]">
                    <CardBack />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 收牌时的粉色绽放 */}
          {flash && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[3%] left-1/2 h-[150px] w-[90%] -translate-x-1/2 rounded-[50%] border-2 border-rose/60"
                style={{ animation: 'seal-cast .95s ease-out both' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[43%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(209,147,168,0.4) 0%, rgba(246,181,205,0.2) 45%, rgba(255,255,255,0) 70%)',
                  animation: 'pink-bloom .95s ease-out both',
                }}
              />
            </>
          )}

          {/* 抽出的牌 */}
          {active !== null && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[3%] left-1/2 h-[150px] w-[90%] -translate-x-1/2 rounded-[50%] border border-[#E9C778]/60"
                style={{ animation: 'seal-cast 1.1s ease-out both' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[43%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(199,154,75,0.2) 0%, rgba(209,147,168,0.12) 45%, rgba(255,255,255,0) 70%)',
                  animation: 'halo-in .8s ease-out both, glow-soft 2.8s 1s ease-in-out infinite',
                }}
              />
              <button
                type="button"
                onClick={putBack}
                aria-label={`${HAND[active].title} — tap to put back`}
                className="absolute left-1/2 top-[43%] z-30 h-[386px] w-[244px] -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ perspective: '1300px' }}
              >
                <span
                  className="relative block h-full w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    animation: 'card-reveal .85s cubic-bezier(.2,.75,.2,1) both',
                  }}
                >
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_26px_54px_-22px_rgba(58,36,64,0.45)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardBack />
                  </span>

                  {/* 牌面：与牌背同一套粉金框 */}
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_26px_54px_-22px_rgba(58,36,64,0.45)]"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(135deg, #F8CEDF 0%, #F2B2CC 100%)',
                    }}
                  >
                    <span className="absolute inset-[6px] rounded-[0.85rem] border-2 border-[#C9A05C]" />
                    <span className="absolute inset-[11px] rounded-[0.7rem] border border-[#C9A05C]/50 bg-[#FFF9F2]" />

                    {/* 顶部名牌 */}
                    <span className="absolute inset-x-0 top-[13px] flex justify-center">
                      <span className="relative rounded-[3px] bg-[#DBB06C] px-4 py-[3px] shadow-sm">
                        <span
                          className="block text-[11px] font-semibold tracking-[0.28em] text-[#7C3B50]"
                          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                        >
                          {HAND[active].name}
                        </span>
                      </span>
                    </span>
                    {/* 底部落款 */}
                    <span className="absolute inset-x-0 bottom-[13px] flex justify-center">
                      <span className="rounded-[3px] bg-[#DBB06C]/85 px-3 py-[2px]">
                        <span
                          className="block text-[9px] font-semibold tracking-[0.3em] text-[#7C3B50]"
                          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                        >
                          OLIVIA
                        </span>
                      </span>
                    </span>

                    <span className="relative flex h-full w-full flex-col px-6 pb-11 pt-12 text-left">
                      <span className="flex items-center justify-center text-[#8A4258]">
                        <Suit name={HAND[active].suit} className="h-5 w-5" />
                      </span>

                      <span className="mt-3 block text-center font-serif text-[19px] font-light leading-snug text-plum">
                        {HAND[active].title}
                      </span>

                      {/* 金色分隔线 */}
                      <span aria-hidden className="mt-3 flex items-center gap-2">
                        <span className="h-px flex-1 bg-[#C9A05C]/45" />
                        <span className="text-[9px] text-[#C0913C]">◆</span>
                        <span className="h-px flex-1 bg-[#C9A05C]/45" />
                      </span>

                      <span className="mt-3 block text-center font-hand text-[15px] leading-snug text-plum-muted">
                        “{HAND[active].quote}”
                      </span>

                      <span className="mt-auto block space-y-1.5 pt-4">
                        {HAND[active].skills.map((sk) => (
                          <span key={sk} className="flex items-baseline gap-2 text-[12.5px] text-plum-muted">
                            <span aria-hidden className="text-[10px] text-[#C0913C]">
                              ✦
                            </span>
                            {sk}
                          </span>
                        ))}
                      </span>
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
