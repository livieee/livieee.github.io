import { useState } from 'react'
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
  suit: 'spark' | 'target' | 'hands' | 'clock'
  title: string
  quote: string
  skills: string[]
  tilt: string
}

const HAND: Card[] = [
  {
    rank: 'A',
    suit: 'spark',
    title: 'I design the layer that decides what ships',
    quote: 'An LLM always returns something — the judgment is what you do about that.',
    skills: ['PRDs & specs', 'Eval design', 'Agent workflows', 'Human-in-the-loop'],
    tilt: '-rotate-[4deg]',
  },
  {
    rank: 'K',
    suit: 'target',
    title: 'I put distribution inside the rules',
    quote: 'Every entry shipped a public repo and a thread — so the work carried itself.',
    skills: ['Launch narrative', 'Developer relations', 'Funnel design', 'Adoption metrics'],
    tilt: 'rotate-[2deg]',
  },
  {
    rank: 'Q',
    suit: 'hands',
    title: 'A room fills because of who is standing in it',
    quote: 'Source the partner before the date is set. Everything else follows from that.',
    skills: ['Partner sourcing', 'Sponsor coordination', 'Executive comms', 'Co-hosting'],
    tilt: '-rotate-[2deg]',
  },
  {
    rank: 'J',
    suit: 'clock',
    title: '7:50 on the sheet, 7:50 in the room',
    quote: 'Goals, run-of-show, owners and timings written down — so the day is executed.',
    skills: ['Run-of-show', 'Cross-functional workstreams', 'Retrospectives', 'Community ops'],
    tilt: 'rotate-[4deg]',
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

/** 牌背：原创的对称纹样，不复刻任何既有牌面 */
function CardBack() {
  return (
    <svg viewBox="0 0 160 230" className="h-full w-full" aria-hidden>
      <rect x="6" y="6" width="148" height="218" rx="14" fill="#F3EDF4" />
      <rect
        x="13"
        y="13"
        width="134"
        height="204"
        rx="10"
        fill="none"
        stroke="#7A4A85"
        strokeOpacity="0.3"
        strokeWidth="1.2"
      />
      <rect
        x="18"
        y="18"
        width="124"
        height="194"
        rx="8"
        fill="none"
        stroke="#7A4A85"
        strokeOpacity="0.16"
        strokeWidth="0.8"
      />
      {/* 中心徽记 */}
      <g stroke="#7A4A85" strokeOpacity="0.42" fill="none" strokeLinecap="round">
        <circle cx="80" cy="115" r="27" strokeWidth="1.1" />
        <circle cx="80" cy="115" r="18" strokeWidth="0.8" strokeOpacity="0.3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6
          return (
            <line
              key={i}
              x1={80 + Math.cos(a) * 30}
              y1={115 + Math.sin(a) * 30}
              x2={80 + Math.cos(a) * 37}
              y2={115 + Math.sin(a) * 37}
              strokeWidth="1"
            />
          )
        })}
        <path
          d="M80 101c1.7 6.2 3.6 9 8.8 11-5.2 2-7.1 4.8-8.8 11-1.7-6.2-3.6-9-8.8-11 5.2-2 7.1-4.8 8.8-11Z"
          strokeWidth="1.1"
        />
      </g>
      {/* 四角小花饰 */}
      {[
        [30, 36],
        [130, 36],
        [30, 194],
        [130, 194],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 5}c.6 2.3 1.4 3.3 3.3 4.1-1.9.8-2.7 1.8-3.3 4.1-.6-2.3-1.4-3.3-3.3-4.1 1.9-.8 2.7-1.8 3.3-4.1Z`}
          fill="none"
          stroke="#7A4A85"
          strokeOpacity="0.3"
          strokeWidth="0.9"
        />
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

      {/* ── ① What I bring to the table ───────────────────────── */}
      <Reveal className="mt-14" y={28}>
        <div className="relative overflow-hidden rounded-[1.6rem] border border-plum/10 bg-white/55 px-6 pb-8 pt-7 md:px-9 md:pb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              What I bring to the table
            </p>
            <p className="font-hand text-[15px] text-plum-muted">
              what I actually open on a weekday ✦
            </p>
          </div>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Every “complex system” I’ve worked on turned out to be people trying to get something
            done. I start by understanding how they actually work, then build the structure —
            specs, programs, partnerships — that makes the work feel lighter rather than heavier.
          </p>

          <div className="mt-8 grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
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

      {/* ── ② 抽牌：扇面 + 法阵 + 升起翻面 ────────────────────── */}
      <Reveal className="mt-20">
        <p className="text-center font-hand text-[17px] text-plum-muted">
          {active === null ? 'so — pick a card ✦' : 'tap it again to put it back ✦'}
        </p>
      </Reveal>

      <Reveal className="mt-6" y={30}>
        <div
          className="relative mx-auto h-[520px] w-full max-w-4xl select-none"
          style={{ perspective: '1400px' }}
        >
          {/* 法阵 */}
          <svg
            viewBox="0 0 400 160"
            className="pointer-events-none absolute bottom-[8%] left-1/2 w-[78%] -translate-x-1/2"
            fill="none"
            aria-hidden
          >
            <ellipse cx="200" cy="80" rx="182" ry="58" stroke="#C79A4B" strokeOpacity="0.3" strokeWidth="1.1" />
            <ellipse cx="200" cy="80" rx="150" ry="46" stroke="#C79A4B" strokeOpacity="0.18" strokeWidth="0.9" />
            <ellipse cx="200" cy="80" rx="112" ry="34" stroke="#B98ACB" strokeOpacity="0.22" strokeWidth="0.9" />
            {Array.from({ length: 24 }).map((_, i) => {
              const a2 = (i / 24) * Math.PI * 2
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(a2) * 150}
                  y1={80 + Math.sin(a2) * 46}
                  x2={200 + Math.cos(a2) * 182}
                  y2={80 + Math.sin(a2) * 58}
                  stroke="#C79A4B"
                  strokeOpacity="0.22"
                  strokeWidth="0.8"
                />
              )
            })}
          </svg>

          {/* 飘落的碎光 */}
          {[12, 28, 46, 63, 81, 92].map((left, i) => (
            <span
              key={left}
              aria-hidden
              className="pointer-events-none absolute top-0 h-1 w-1 rounded-full bg-lavender-deep/45"
              style={{
                left: `${left}%`,
                animation: `petal-fall ${9 + i * 1.7}s ${i * 1.4}s linear infinite`,
              }}
            />
          ))}

          {HAND.map((c, i) => {
            const isUp = active === i
            const dimmed = active !== null && !isUp
            const angle = -21 + i * 14
            const lift = Math.abs(i - 1.5) * 14
            return (
              <button
                key={c.rank}
                type="button"
                onClick={() => setActive(isUp ? null : i)}
                aria-pressed={isUp}
                aria-label={isUp ? `${c.title} — tap to put back` : `Draw the ${c.rank} card`}
                className="group/card absolute left-1/2 top-[10%] h-[330px] w-[208px] outline-none"
                style={{
                  transformOrigin: '50% 130%',
                  transition: 'transform .8s cubic-bezier(.2,.75,.2,1), opacity .5s',
                  transform: isUp
                    ? 'translateX(-50%) translateY(24px) rotate(0deg) scale(1.16)'
                    : `translateX(-50%) rotate(${angle}deg) translateY(${lift}px)`,
                  opacity: dimmed ? 0.32 : 1,
                  zIndex: isUp ? 30 : 10 + i,
                  filter: isUp ? 'drop-shadow(0 22px 44px rgba(199,154,75,0.32))' : undefined,
                }}
              >
                <span
                  className="relative block h-full w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform .8s cubic-bezier(.2,.75,.2,1)',
                    transform: isUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* 牌背 */}
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_16px_36px_-18px_rgba(58,36,64,0.55)] transition-transform duration-500 group-hover/card:-translate-y-2"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardBack />
                  </span>

                  {/* 牌面 */}
                  <span
                    className="absolute inset-0 flex flex-col rounded-[1.1rem] border border-champagne-deep/40 bg-cream-soft px-5 py-5 shadow-[0_24px_52px_-20px_rgba(58,36,64,0.5)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex flex-col items-center gap-0.5 text-plum">
                        <span className="font-serif text-[20px] leading-none">{c.rank}</span>
                        <Suit name={c.suit} className="h-3.5 w-3.5" />
                      </span>
                      <span aria-hidden className="h-px w-10 bg-plum/15" />
                    </span>

                    <span className="mt-5 block font-serif text-[17px] font-light leading-snug text-plum">
                      {c.title}
                    </span>

                    <span className="mt-3 block font-hand text-[15px] leading-snug text-plum-muted">
                      “{c.quote}”
                    </span>

                    <span className="mt-auto block space-y-1 pt-4">
                      {c.skills.map((sk) => (
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
            )
          })}
        </div>
      </Reveal>

    </section>
  )
}
