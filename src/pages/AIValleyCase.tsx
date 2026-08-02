import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { Glyph, type GlyphName } from '@/components/Glyph'
import { OutcomeStrip } from '@/components/OutcomeStrip'

/**
 * AI Valley 活动运营案例页。
 * 所有数字都来自公开的 luma / Devpost 页面；角色只写 Olivia 自己确认过的，
 * 没确认的一律标 pending，不替她认领。
 */

/* ── 章节头：与两个 Bosch 案例页同一套 ─────────────────────────── */
function Chapter({
  n,
  label,
  title,
  intro,
  className = 'mt-24',
}: {
  n: string
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <Reveal className={className}>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-serif text-[15px] leading-none text-rose">{n}</span>
        <span aria-hidden className="h-px w-6 shrink-0 bg-plum/20" />
        <p className="label-text">{label}</p>
      </div>
      <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">{intro}</p>}
    </Reveal>
  )
}

/* ── 旗舰项目：GLM 5.1 挑战赛的五个阶段，可点开 ─────────────────── */
type Stage = {
  k: string
  g: GlyphName
  c: string
  head: string
  body: string
  proof: string
}

const STAGES: Stage[] = [
  {
    k: 'Partner',
    g: 'handshake',
    c: '#D193A8',
    head: 'Get a model lab to put its name on it',
    body: 'A community challenge only matters to developers if the lab behind the model is genuinely in it. I brought Z.ai in as the model and prize partner, and AI Valley as the community host — so builders were shipping on GLM 5.1 with the people who made it watching.',
    proof: 'Z.ai · AI Valley — co-presented',
  },
  {
    k: 'Prize',
    g: 'target',
    c: '#C79A4B',
    head: 'Design prizes that pull in different directions',
    body: 'One cash prize only rewards the single best team. I split the pool three ways so depth, breadth and storytelling each had somewhere to land — a $5,000 grand prize, a Builder Award for the top five, and a Showcase Award for the projects that explained themselves best.',
    proof: '$5,000 grand prize · Builder Award ×5 · Showcase Award ×3',
  },
  {
    k: 'Judge',
    g: 'ledger',
    c: '#7A9CC6',
    head: 'Write the bar down before anyone submits',
    body: 'Judging criteria written after submissions arrive are just taste. I published them up front — real use case, system depth, execution quality, and genuine use of GLM 5.1 — with a separate rubric for the Showcase Award: clear demo, strong storytelling, shareability.',
    proof: 'Two rubrics · community panel + Z.ai judge',
  },
  {
    k: 'Recruit',
    g: 'mic',
    c: '#B98ACB',
    head: 'Developer relations, not a launch post',
    body: 'A one-week async window means the funnel has to fill fast and stay warm. I ran the outbound and the channel — a Discord for questions and progress, so builders got answers during the build instead of guessing at the rules.',
    proof: '221 registered builders in one week',
  },
  {
    k: 'Showcase',
    g: 'laurel',
    c: '#8FAE8B',
    head: 'Make winning worth more than the cash',
    body: 'The prize that developers actually wanted was distribution. Winning projects were featured by Z.ai across its own channels and site — so a week of work turned into an audience, not just a payout.',
    proof: 'Featured on Z.ai channels · winners announced Apr 9',
  },
]

function FlagshipStages() {
  const [open, setOpen] = useState(0)
  const s = STAGES[open]
  return (
    <div className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          How the challenge was built
        </p>
        <p className="font-hand text-[15px] text-plum-muted">tap a stage ✦</p>
      </div>

      {/* 阶段导航 */}
      <ol className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {STAGES.map((t, i) => (
          <li key={t.k} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-pressed={i === open}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-300 ${
                i === open
                  ? 'border-transparent text-white shadow-[0_8px_20px_-10px_rgba(58,36,64,0.5)]'
                  : 'border-plum/15 bg-white/70 text-plum-muted hover:border-plum/30 hover:text-plum'
              }`}
              style={i === open ? { backgroundColor: t.c } : undefined}
            >
              <Glyph name={t.g} className="h-4 w-4" w={1.6} />
              {t.k}
            </button>
            {i < STAGES.length - 1 && (
              <span aria-hidden className="hidden h-px w-4 bg-plum/15 sm:block" />
            )}
          </li>
        ))}
      </ol>

      {/* 展开的那一段 */}
      <div key={open} style={{ animation: 'annot-in .45s ease-out both' }} className="mt-6">
        <div className="flex gap-4">
          <span
            className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${s.c}1f`, color: s.c }}
          >
            <Glyph name={s.g} className="h-6 w-6" w={1.5} />
          </span>
          <div>
            <h3 className="font-serif text-xl font-light leading-snug text-plum">{s.head}</h3>
            <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-plum-muted">{s.body}</p>
            <p
              className="mt-4 inline-block rounded-full px-3 py-1 text-[12px] font-medium"
              style={{ backgroundColor: `${s.c}1a`, color: s.c }}
            >
              {s.proof}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── 九场活动 ───────────────────────────────────────────────────
 * role 只填 Olivia 明确说过的；没说的留 null，页面上显示为公开主办信息，
 * 不写成她的职责。
 */
type Program = {
  name: string
  where: string
  size: string
  n: number | null
  role: string | null
  partners: string
  caps: string[]
  href: string
  /** 她自己写的公开记录 */
  post?: string
  lead?: boolean
}

const CAPS = [
  'Program ownership',
  'Developer relations',
  'Community',
  'GTM',
  'Strategic partnerships',
] as const

const PROGRAMS: Program[] = [
  {
    name: 'Build with GLM 5.1 · Z.ai Builder Series',
    where: 'Global · one-week async build',
    size: '221 registered builders',
    n: 221,
    role: 'Owned end to end — partnership, prize design, judging rubric, DevRel',
    partners: 'Z.ai · AI Valley · Devpost',
    caps: ['Program ownership', 'Developer relations', 'GTM', 'Strategic partnerships'],
    href: 'https://luma.com/32jfoybh',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7445973511577440256',
    lead: true,
  },
  {
    name: '2026 GTC Fireside Talk — What’s next in AI?',
    where: 'Palo Alto',
    size: '413 attendees · 20+ speakers',
    n: 413,
    role: 'Co-host — partner search, panel guest invitations, guest background prep',
    partners: 'EPIC Connector · Peak Mojo · Manycore Tech · Z.ai',
    caps: ['Strategic partnerships', 'Community', 'Program ownership'],
    href: 'https://luma.com/GTCTALK',
  },
  {
    name: 'Build What You Love — Women in Tech Hackathon',
    where: 'San Francisco · hybrid',
    size: '422 attended',
    n: 422,
    role: 'Program manager — ran the program, issued volunteer certificates',
    partners: 'AI Valley · Bond AI · Replit · Vercel · Daytona · MiniMax · BEM',
    caps: ['Program ownership', 'Community'],
    href: 'https://luma.com/ic3l89gi',
    post: 'https://www.linkedin.com/posts/courtneythko_womenintech-buildwhatyoulove-aivalley-activity-7429241914459303938-4MG5',
  },
  {
    name: '2026 GTC AI Demo Day',
    where: 'San Francisco',
    size: '594 registered · 40+ VC firms',
    n: 594,
    role: 'Co-host',
    partners: 'EPIC Connector × Allscale · FounderGro',
    caps: ['GTM', 'Strategic partnerships'],
    href: 'https://luma.com/GTCDEMODAY',
  },
  {
    name: 'AI Valley × Molly Tea Pop-Up',
    where: 'Palo Alto',
    size: '100 builders hosted',
    n: 100,
    role: 'Lead organiser',
    partners: 'AI Valley · Molly Tea',
    caps: ['Community', 'GTM'],
    href: 'https://luma.com/puy9vbok',
  },
  {
    name: 'Humanity & AGI Summit 2026',
    where: 'Stanford Faculty Club',
    size: '448 attendees · Yuval Noah Harari keynote',
    n: 448,
    role: 'Helped organise — a side project taken on after the AI Valley program',
    partners: 'AIRA · GPT DAO · Cheetah Community · LOOMUS · EpicConnector',
    caps: ['Community'],
    href: 'https://luma.com/wkolq6uc',
  },
  {
    name: 'Total Agent Recall Hackathon',
    where: 'Sky9 Capital, San Francisco',
    size: '358 registered · 50 engineers, 8 hours',
    n: 358,
    role: 'Marketing and sponsor coordination — and on the day, running judging across Dify, GMI Cloud and HydraDB',
    partners: 'GMI Cloud · Photon · HydraDB · Dify',
    caps: ['GTM', 'Strategic partnerships', 'Community'],
    href: 'https://luma.com/snixr7yb',
    post: 'https://www.linkedin.com/feed/update/urn:li:activity:7443396471057485824',
  },
]

/* 参与过、但角色不由我替她认领的两场 —— 只留链接 */
const ALSO = [
  { name: 'MiniMax AI Founder Day @ GTC', href: 'https://luma.com/aic-sf-3-21?tk=C8DbIO' },
  { name: 'Global Builders Salon', href: 'https://luma.com/6re61lly' },
]

function ProgramMatrix() {
  const [cap, setCap] = useState<string | null>(null)
  const shown = cap ? PROGRAMS.filter((p) => p.caps.includes(cap)) : PROGRAMS

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCap(null)}
          className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
            cap === null
              ? 'border-transparent bg-plum text-cream'
              : 'border-plum/15 bg-white/70 text-plum-muted hover:text-plum'
          }`}
        >
          All nine
        </button>
        {CAPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCap(cap === c ? null : c)}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
              cap === c
                ? 'border-transparent bg-plum text-cream'
                : 'border-plum/15 bg-white/70 text-plum-muted hover:text-plum'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {shown.map((p, i) => (
          <li
            key={p.name}
            style={{ animation: `annot-in .4s ${i * 0.04}s ease-out both` }}
            className={`group/p flex flex-col gap-3 rounded-[1.4rem] border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white md:flex-row md:items-center md:gap-6 md:p-6 ${
              p.lead
                ? 'border-rose/35 bg-rose/[0.06] hover:border-rose/55'
                : 'border-plum/10 bg-white/60 hover:border-plum/25'
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-[17px] font-light leading-snug text-plum transition-colors hover:text-rose"
                >
                  {p.name}
                  <span aria-hidden className="ml-1 text-[13px] text-plum-faint">↗</span>
                </a>
                {p.lead && (
                  <span className="rounded-full bg-rose px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    led
                  </span>
                )}
              </div>
              <p className="mt-1 text-[12.5px] text-plum-faint">
                {p.where} · {p.partners}
              </p>
              {p.role && <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{p.role}</p>}
              {p.post && (
                <a
                  href={p.post}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0A66C2] transition-opacity hover:opacity-75"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
                  </svg>
                  Written up
                </a>
              )}
            </div>
            <div className="flex shrink-0 items-baseline gap-2 md:w-52 md:flex-col md:items-end md:gap-0.5">
              <span className="font-serif text-2xl font-light leading-none text-rose">
                {p.n?.toLocaleString()}
              </span>
              <span className="text-[11.5px] leading-snug text-plum-faint md:text-right">
                {p.size.replace(/^[\d,]+\s*/, '')}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {!cap && (
        <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[12.5px] text-plum-faint">
          <span>Also on the calendar:</span>
          {ALSO.map((a, i) => (
            <span key={a.name}>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="text-plum-muted underline decoration-plum/20 underline-offset-4 transition-colors hover:text-rose"
              >
                {a.name}
              </a>
              {i < ALSO.length - 1 && <span aria-hidden> ·</span>}
            </span>
          ))}
        </p>
      )}

      {shown.length === 0 && (
        <p className="mt-6 font-hand text-[15px] text-plum-muted">nothing tagged with that yet ✦</p>
      )}
    </div>
  )
}

/* ── 现场照：确认后再填，空数组时整段不渲染 ────────────────────── */
const PHOTOS: Array<{ src: string; alt: string; cap: string }> = [
  {
    src: '/events/women-hackathon.jpg',
    alt: 'The full cohort of Build What You Love — Women in Tech Hackathon, on stage after demos',
    cap: 'Build What You Love · Women in Tech Hackathon — San Francisco, 14 February 2026',
  },
]

function EventPhotos() {
  if (PHOTOS.length === 0) return null
  return (
    <div className={`grid gap-4 ${PHOTOS.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {PHOTOS.map((ph) => (
        <figure key={ph.src} className="overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white p-3">
          <img src={ph.src} alt={ph.alt} loading="lazy" className="w-full rounded-[1rem]" />
          <figcaption className="mt-2.5 px-1 text-[12px] text-plum-faint">{ph.cap}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/* ── 我在每场活动里反复做的五件事 ──────────────────────────────── */
const PLAYBOOK: Array<{ k: string; v: string; g: GlyphName; c: string }> = [
  {
    k: 'Find the partner first',
    v: 'A room fills because of who is standing in it. Sourcing the model lab, the venue, the capital — before the date is set.',
    g: 'handshake',
    c: '#D193A8',
  },
  {
    k: 'Curate the guests, then prep them',
    v: 'Inviting a panel is the easy half. I research each guest beforehand so the questions are specific and no one repeats the same intro.',
    g: 'question',
    c: '#B98ACB',
  },
  {
    k: 'Run the show on paper',
    v: 'Goals, run-of-show, owners and timings written down — so the day is executed, not improvised.',
    g: 'calendar',
    c: '#7A9CC6',
  },
  {
    k: 'Look after the volunteers',
    v: 'Programs run on people who are not paid. Clear roles during, and a certificate after — the reason they come back.',
    g: 'community',
    c: '#8FAE8B',
  },
  {
    k: 'Close the loop',
    v: 'Recap, results and the projects that shipped, pushed back out — so the next program starts warm instead of cold.',
    g: 'retry',
    c: '#C79A4B',
  },
]

export function AIValleyCase() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case">
          <Link
            to="/#impact"
            className="group/back inline-flex items-center gap-1.5 text-[13px] font-medium text-plum-muted transition-colors hover:text-plum"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover/back:-translate-x-0.5">←</span>
            Back to work
          </Link>
          <Link to="/" className="font-serif text-[17px] text-plum">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <article className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <img src="/logos/aivalley.png" alt="AI Valley" className="h-7 w-auto" />
            <span className="border-l border-plum/15 pl-4 text-[11px] uppercase tracking-label text-plum-faint">
              Programs &amp; Developer Relations
            </span>
          </div>
        </Reveal>
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="Programs are products too" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            Nine Bay Area and global programs — a week-long build challenge, hackathons, fireside
            talks, demo days — partnered, designed and run.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            An ecosystem program has users, a funnel and a retention problem, same as any product.
            I ran them that way: source the partner, design what winning means, write the bar down
            before anyone shows up, and close the loop afterwards so the next one starts warm.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CAPS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-rose/35 bg-rose/[0.07] px-3.5 py-1.5 text-[11.5px] font-medium text-plum"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-label text-plum-faint">
            AI Valley · Bay Area &amp; global · 2025–2026
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.32}>
          <OutcomeStrip
            items={[
              {
                n: 3200,
                suffix: '+',
                label: 'builders, founders and investors registered across these programs',
              },
              { n: 221, label: 'developers in one week-long global build challenge' },
              { n: 9, label: 'programs — hackathons, talks, demo days, salons' },
            ]}
          />
        </Reveal>

        {/* ── 一 · 旗舰 ─────────────────────────────────────────── */}
        <Chapter
          n="01"
          label="The one I owned end to end"
          title="Build with GLM 5.1 — a global challenge, run like a launch"
          intro="Z.ai wanted developers building real things on GLM 5.1. I ran it as a product: a model lab as partner, a prize structure that rewarded three different kinds of good, a published rubric, and a Discord where builders got answers mid-build."
          className="mt-20"
        />
        <Reveal className="mt-8" y={28}>
          <FlagshipStages />
        </Reveal>
        <Reveal className="mt-5">
          <div className="flex flex-col gap-3 rounded-[1.4rem] border border-plum/10 bg-white/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-plum-muted">
              The challenge ran 30 March – 6 April 2026. Winners announced 9 April.
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href="https://build-with-glm-5-1-challenge.devpost.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                Devpost <span aria-hidden>↗</span>
              </a>
              <a
                href="https://luma.com/32jfoybh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                Event page <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── 二 · 全部九场 ─────────────────────────────────────── */}
        <Chapter
          n="02"
          label="The full slate"
          title="Nine programs, and what each one was for"
          intro="Filter by what the program was really doing. Every number below is the public registration or attendance count on its own event page."
        />
        <Reveal className="mt-8" y={24}>
          <ProgramMatrix />
        </Reveal>

        {/* ── 三 · 打法 ─────────────────────────────────────────── */}
        <Chapter
          n="03"
          label="How I run one"
          title="The five things that happen every time"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PLAYBOOK.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.06}>
              <div className="h-full rounded-[1.4rem] border border-plum/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${r.c}1f`, color: r.c }}
                >
                  <Glyph name={r.g} className="h-6 w-6" w={1.5} />
                </span>
                <h3 className="mt-4 font-serif text-[17px] font-light leading-snug text-plum">{r.k}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{r.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── 存档 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-plum/20" />
            <p className="label-text">For the record</p>
          </div>
          <EventPhotos />
        </Reveal>

        {/* ── 交叉链接 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <Link
            to="/work/genai-analytics"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rose/45 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(209,147,168,0.4)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                What I build when I'm not running the room ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">
                GenAI Analytics Suite — AI-native analytics workspace
              </p>
              <p className="mt-1 text-[13px] text-plum-muted">
                Natural-language SQL · Python analysis · Visualization · Reusable knowledge
              </p>
            </div>
            <span
              aria-hidden
              className="shrink-0 font-serif text-2xl text-rose transition-transform duration-300 group-hover/x:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </article>
    </main>
  )
}
