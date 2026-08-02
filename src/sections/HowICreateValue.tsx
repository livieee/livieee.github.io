import { useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * How I Create Value —— 借了 scrapbook 的三段叙事（桌子 → 手牌 → 桌上的工具），
 * 但视觉留在站点原有的米色 + 衬线体里：道具全部 SVG 手绘，不引照片素材。
 *
 * 牌面只写有据可查的东西：每张牌的引文都来自她自己页面上的说法或她做过的事。
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

/** 牌面花色 —— 手绘线条，不用扑克的黑桃 */
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

/* ── 桌上的工具：只列有据可查的 ──────────────────────────────── */
const TOOLBOX = [
  {
    k: 'Design & prototyping',
    v: [
      { n: 'Figma', l: '/logos/tools/figma.jpg' },
      { n: 'Miro', l: '/logos/tools/miro.jpg' },
    ],
  },
  {
    k: 'AI & agentic coding',
    v: [
      { n: 'Claude', l: '/logos/tools/claude.jpg' },
      { n: 'OpenAI', l: '/logos/tools/openai.png' },
      { n: 'Playwright', l: '/logos/tools/playwright.svg' },
      { n: 'GitHub Actions', l: '/logos/tools/github.jpg' },
    ],
  },
  {
    k: 'Specs, data & reporting',
    v: [
      { n: 'Notion', l: '/logos/tools/notion.jpg' },
      { n: 'Tableau', l: '/logos/tools/tableau.jpg' },
    ],
  },
  {
    k: 'Programs & community',
    v: [
      { n: 'Luma', l: '/logos/tools/luma.jpg' },
      { n: 'Devpost', l: '/logos/tools/devpost.jpg' },
      { n: 'Discord', l: '/logos/tools/discord.jpg' },
    ],
  },
]

/** 手绘的桌子 —— 纯 SVG，和站上其它手绘图标同一路数 */
function TableSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 44h164l-16 12H34z" />
      <path d="M40 56v50" />
      <path d="M160 56v50" />
      <path d="M52 56v38" />
      <path d="M148 56v38" />
      <path
        d="M96 24c1.2 4 2.6 6 6 7.4-3.4 1.4-4.8 3.4-6 7.4-1.2-4-2.6-6-6-7.4 3.4-1.4 4.8-3.4 6-7.4Z"
        strokeWidth={1.6}
      />
    </svg>
  )
}

export function HowICreateValue() {
  const [open, setOpen] = useState<number | null>(null)

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

      {/* ── 开场：一张桌子 ─────────────────────────────────────── */}
      <div className="mt-14 grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal y={28}>
          <div className="relative">
            <TableSketch className="w-[74%] text-plum/30" />
            <span
              aria-hidden
              className="absolute right-0 top-[14%] w-[52%] rotate-[3deg] rounded-md border border-dashed border-rose/50 bg-white/95 px-3 py-2 font-hand text-[15px] leading-snug text-plum shadow-sm"
            >
              so — what do I bring to it?
            </span>
          </div>
        </Reveal>

        <Reveal y={28} delay={0.1}>
          <p className="max-w-xl text-[15px] leading-relaxed text-plum-muted">
            Every “complex system” I’ve worked on turned out to be people trying to get something
            done. I start by understanding how they actually work, then build the structure —
            specs, programs, partnerships — that makes the work feel lighter rather than heavier.
          </p>
        </Reveal>
      </div>

      {/* ── 手牌 ──────────────────────────────────────────────── */}
      <Reveal className="mt-20">
        <p className="text-center font-hand text-[17px] text-plum-muted">
          so — here’s the hand I’d bring ↓
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HAND.map((c, i) => {
          const isOpen = open === i
          return (
            <Reveal key={c.rank} delay={i * 0.07}>
              <li
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(i)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
                className={`group/card relative flex h-full min-h-[310px] cursor-default flex-col rounded-[1.1rem] border border-plum/15 bg-cream-soft px-5 py-5 shadow-[0_14px_32px_-18px_rgba(58,36,64,0.45)] outline-none transition-all duration-500 ${c.tilt} hover:-translate-y-2 hover:rotate-0 hover:border-lavender-deep/50 hover:shadow-[0_26px_52px_-22px_rgba(58,36,64,0.5)] focus-visible:-translate-y-2 focus-visible:rotate-0`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex flex-col items-center gap-0.5 text-plum">
                    <span className="font-serif text-[20px] leading-none">{c.rank}</span>
                    <Suit name={c.suit} className="h-3.5 w-3.5" />
                  </span>
                  <span aria-hidden className="h-px w-10 bg-plum/15" />
                </span>

                <h3 className="mt-5 font-serif text-[17px] font-light leading-snug text-plum">
                  {c.title}
                </h3>

                <p className="mt-3 font-hand text-[15px] leading-snug text-plum-muted">
                  “{c.quote}”
                </p>

                {/* hover 才展开的技能点 */}
                <ul
                  className={`mt-auto space-y-1 overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-32 pt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {c.skills.map((s) => (
                    <li key={s} className="flex items-baseline gap-1.5 text-[12px] text-plum-muted">
                      <span aria-hidden className="text-lavender-deep">
                        ·
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className={`mt-4 flex items-center justify-end text-plum/30 transition-opacity duration-500 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <Suit name={c.suit} className="h-3.5 w-3.5 rotate-180" />
                </span>
              </li>
            </Reveal>
          )
        })}
      </ul>

      {/* ── 桌上的工具 ────────────────────────────────────────── */}
      <Reveal className="mt-20">
        <div className="rounded-[1.6rem] border border-plum/10 bg-white/60 p-7 md:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              And the tools on the table
            </p>
            <p className="font-hand text-[15px] text-plum-muted">
              what I actually open on a weekday ✦
            </p>
          </div>

          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLBOX.map((g) => (
              <div key={g.k}>
                <p className="text-[12px] font-medium text-plum">{g.k}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.v.map((t) => (
                    <li
                      key={t.n}
                      className="flex items-center gap-1.5 rounded-full border border-plum/12 bg-white/70 py-1 pl-1 pr-2.5 text-[11.5px] text-plum-muted"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-plum/10">
                        <img
                          src={t.l}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      {t.n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
