import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { AskDataUI } from '@/components/AskDataUI'
import { Glyph, type GlyphName } from '@/components/Glyph'

/**
 * Bosch × CMU：GenAI Analytics Suite —— Olivia = Product Lead。
 * 叙事编号推进；真实工件（截图/流程图/roadmap）全部做成可交互画布，
 * 而不是被框起来的插图。NDA：内部代号与身份信息已脱敏。
 */

const SCOPE = ['Product Strategy', 'Workflow Design', 'PRDs', 'Sprint Planning', 'UX Specs']

const SECTIONS = [
  { id: 'problem', num: '01', label: 'The problem' },
  { id: 'constraints', num: '02', label: 'Constraints' },
  { id: 'users', num: '03', label: 'Who it’s for' },
  { id: 'map', num: '04', label: 'The map' },
  { id: 'decisions', num: '05', label: 'Decisions' },
  { id: 'spec', num: '06', label: 'The spec' },
  { id: 'shipped', num: '07', label: 'Shipping it' },
  { id: 'worth', num: '08', label: 'What it’s worth' },
]

/* ── 章节导航（吸顶） ────────────────────────────────────────── */
function SectionNav() {
  const [active, setActive] = useState('problem')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Case sections"
      className="sticky top-[68px] z-40 -mx-6 mb-2 overflow-x-auto bg-cream/85 px-6 py-3 backdrop-blur-md md:-mx-10 md:px-10"
    >
      <ul className="flex gap-1.5 whitespace-nowrap">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`inline-flex items-baseline gap-1.5 rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                active === s.id
                  ? 'bg-[#4E6E96] text-white'
                  : 'text-plum-muted hover:bg-[#EFF5FB] hover:text-[#4E6E96]'
              }`}
            >
              <span className={active === s.id ? 'text-white/70' : 'text-plum-faint'}>{s.num}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ── 01 · 断裂 vs 连续：可切换的对照图 ───────────────────────── */
function BeforeAfterFlow() {
  const [after, setAfter] = useState(false)
  const tools = ['Query agent', 'Visualization', 'Analytics']

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-plum/15 bg-white/70 p-1">
          {[
            { k: false, l: 'How it worked' },
            { k: true, l: 'How I redesigned it' },
          ].map((o) => (
            <button
              key={String(o.k)}
              type="button"
              onClick={() => setAfter(o.k)}
              className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors ${
                after === o.k ? 'bg-[#4E6E96] text-white' : 'text-plum-muted hover:text-plum'
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
        <p className="font-hand text-[16px] text-plum-muted">
          {after ? 'one thread, carried by the product ✦' : 'the analyst carries the context — by hand ✦'}
        </p>
      </div>

      <svg
        viewBox="0 0 640 210"
        className="w-full"
        role="img"
        aria-label={
          after
            ? 'After: one continuous pipeline where the product carries schema and history between stages'
            : 'Before: three disconnected tools with the analyst manually carrying data between them'
        }
      >
        <defs>
          <marker id="ba-arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#7FA3CC" />
          </marker>
        </defs>

        {/* 分析师 */}
        <g style={{ transition: 'opacity .5s', opacity: after ? 0.3 : 1 }}>
          <circle cx="52" cy="105" r="24" fill="#FFFFFF" stroke="#9A87A0" strokeWidth="1.4" />
          <g stroke="#8A7A90" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="52" cy="98" r="5.4" />
            <path d="M42.4 116c1.4-5.2 5.2-8 9.7-8s8.2 2.8 9.6 8" />
          </g>
          <text x="52" y="150" textAnchor="middle" fontSize="10" fill="#9A87A0">analyst</text>
        </g>

        {/* 三个工具 */}
        {tools.map((t, i) => {
          const x = after ? 118 + i * 172 : 150 + i * 158
          const y = after ? 84 : i === 1 ? 32 : i === 0 ? 106 : 150
          return (
            <g key={t} style={{ transition: 'transform .6s cubic-bezier(.4,0,.2,1)' }} transform={`translate(${x},${y})`}>
              <rect
                width="150"
                height="44"
                rx="12"
                fill={after ? '#DCE7F2' : '#FFFFFF'}
                stroke={after ? '#4E6E96' : '#C9B8CE'}
                strokeWidth="1.4"
                strokeDasharray={after ? undefined : '4 3'}
                style={{ transition: 'fill .5s, stroke .5s' }}
              />
              <text x="75" y="27" textAnchor="middle" fontSize="12.5" fill="#3A2440" fontFamily="Georgia, serif">
                {t}
              </text>
            </g>
          )
        })}

        {/* before：手动搬运 */}
        <g style={{ transition: 'opacity .45s', opacity: after ? 0 : 1 }}>
          {['M78 97 C 110 68, 118 56, 146 54', 'M78 107 C 110 113, 118 126, 146 128', 'M78 117 C 108 158, 120 170, 146 172'].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#C9B8CE" strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#ba-arr)" />
          ))}
          <text x="330" y="98" textAnchor="middle" fontSize="10.5" fill="#B08A9A">
            copy SQL ↷ run it elsewhere ↷ download a CSV ↷ re-upload ↷ re-explain the columns
          </text>
          <text x="330" y="200" textAnchor="middle" fontSize="11" fill="#9A87A0">
            context drops at every hop · 10+ minutes
          </text>
        </g>

        {/* after：一条连续管线 */}
        <g style={{ transition: 'opacity .45s .15s', opacity: after ? 1 : 0 }}>
          <path d="M270 106 H286" stroke="#7FA3CC" strokeWidth="2" markerEnd="url(#ba-arr)" fill="none" />
          <path d="M442 106 H458" stroke="#7FA3CC" strokeWidth="2" markerEnd="url(#ba-arr)" fill="none" />
          <rect x="108" y="62" width="518" height="90" rx="18" fill="none" stroke="#4E6E96" strokeWidth="1.3" strokeDasharray="6 5" opacity="0.5" />
          <text x="367" y="52" textAnchor="middle" fontSize="10.5" letterSpacing="1.2" fill="#4E6E96">
            ONE ANALYSIS SESSION — SCHEMA + HISTORY CARRIED THROUGH
          </text>
          <text x="367" y="176" textAnchor="middle" fontSize="11" fill="#4E6E96">
            same question, same session · 1–3 minutes
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ── 01b · 真实产品演示：三段管线视频 ───────────────────────── */
const CLIPS = [
  {
    id: 'connect',
    step: '01',
    tab: 'Connect',
    src: '/bosch/demo-1-connect.mp4',
    note: 'Pick a database, browse its tables, load the schema. From here on the session knows what data it is holding — nobody has to re-explain it downstream.',
  },
  {
    id: 'query',
    step: '02',
    tab: 'Ask',
    src: '/bosch/demo-2-query.mp4',
    note: 'A question in plain language becomes an editable query, runs, and returns a table — with two exits already attached: send it to analytics, or send it to visualization.',
  },
  {
    id: 'analyze',
    step: '03',
    tab: 'Analyze',
    src: '/bosch/demo-3-analyze.mp4',
    note: 'The same result flows into Python analysis — generated code you can read, execution output, and charts — without a single re-upload or re-explained column.',
  },
  {
    id: 'explore',
    step: '04',
    tab: 'Explore',
    src: '/bosch/demo-4-explore.mp4',
    note: 'And into conversational visualization: refine the chart in plain language, with an interaction timeline logging every step and an explain panel saying what the chart is actually showing.',
  },
]

function PipelineDemo() {
  const [i, setI] = useState(0)
  const clip = CLIPS[i]
  const videoRef = useRef<HTMLVideoElement>(null)

  /* 只在进入视口时播放，离开就暂停 */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [i])

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="label-text text-[#4E6E96]">The thread, actually holding</p>
        <p className="font-hand text-[15px] text-plum-muted">
          recorded in the real product — names and identity masked ✦
        </p>
      </div>

      {/* 管线步骤条 */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {CLIPS.map((c, n) => (
          <div key={c.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI(n)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
                n === i
                  ? 'bg-[#4E6E96] text-white shadow-[0_10px_22px_-12px_rgba(78,110,150,0.8)]'
                  : 'border border-plum/15 bg-white/60 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
              }`}
            >
              <span className={n === i ? 'text-white/65' : 'text-plum-faint'}>{c.step}</span>
              {c.tab}
            </button>
            {n < CLIPS.length - 1 && (
              <span aria-hidden className="text-[#7FA3CC]">→</span>
            )}
          </div>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        {/* 浏览器框内的视频 */}
        <div className="overflow-hidden rounded-xl border border-plum/15 bg-white shadow-[0_28px_60px_-28px_rgba(78,110,150,0.55)]">
          <div className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/70 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8B4B4]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8D5A8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#B5CBB7]" />
            <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[10.5px] text-plum-faint">
              genai analytics suite · internal deployment
            </span>
          </div>
          <video
            key={clip.id}
            ref={videoRef}
            src={clip.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${clip.tab} — recorded demo`}
            className="block w-full bg-white"
          />
        </div>

        {/* 说明 */}
        <div className="lg:sticky lg:top-32">
          <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              Step {clip.step} · {clip.tab}
            </p>
            <p className="mt-3 min-h-[132px] text-[14px] leading-relaxed text-plum">{clip.note}</p>
          </div>
          <p className="mt-3 font-hand text-[15px] text-plum-muted">
            four stages, one session — nothing gets carried by hand ✦
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── 02 · 约束 ───────────────────────────────────────────────── */
const CONSTRAINTS = [
  {
    icon: 'db-locked' as GlyphName,
    title: 'No direct database connection',
    body: 'Enterprise data lives on-premise. The app can never touch it directly — authentication and network security make it a non-starter.',
    became: 'so the product had to be useful without ever holding the data',
  },
  {
    icon: 'round-trip' as GlyphName,
    title: 'The manual hop is real',
    body: 'Users copy the generated SQL, run it in an external platform, and come back with a CSV. That round-trip was not going away.',
    became: 'so the session had to survive the user leaving',
  },
  {
    icon: 'split-panes' as GlyphName,
    title: 'Three separate frontends',
    body: 'Query, analytics and visualization were built independently — and may stay that way.',
    became: 'so integration had to happen in the backend, not the UI shell',
  },
]

/* ── 03 · 用户 ───────────────────────────────────────────────── */
const SEGMENTS = [
  {
    who: 'Semiconductor analysts',
    quote: 'I know exactly what I want to ask. I lose twenty minutes getting the data into a shape I can ask it of.',
    need: 'The full suite — question to visualization without switching tools.',
    icon: 'bar-chart' as GlyphName,
  },
  {
    who: 'Purchasing teams',
    quote: 'Which suppliers are affected by the new tariff policy?',
    need: 'Similarity queries and AI insights — answers without writing SQL, without filing a ticket.',
    icon: 'invoice' as GlyphName,
  },
  {
    who: 'Plant engineers',
    quote: 'I can write the query myself. I want the statistical modelling on top of it.',
    need: 'Query editing plus analysis — power tools that respect their expertise.',
    icon: 'wrench' as GlyphName,
  },
]

/* ── 04 · 流程图泳道聚光灯 ───────────────────────────────────── */
const LANES = [
  {
    id: 'user',
    name: 'User',
    top: 0.215,
    bottom: 0.33,
    note: 'Every entry point in one lane: start fresh or resume, upload a CSV or connect a database. Whatever the user picks, the lanes below react — nothing asks them to choose twice.',
  },
  {
    id: 'session',
    name: 'Session / Data',
    top: 0.33,
    bottom: 0.425,
    note: 'The lane that makes the rest possible. Session context is retrieved or created, then datasets and schema are validated — and that validation is what unlocks the modes downstream.',
  },
  {
    id: 'sql',
    name: 'Query agent',
    top: 0.425,
    bottom: 0.55,
    note: 'Suggested prompts → natural language → editable SQL → run. And the branch I insisted on: when execution fails, the product says exactly how to run it externally and hands over an upload button — instead of a dead end.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    top: 0.55,
    bottom: 0.655,
    note: 'Python analysis with its rationale, not just its output. Results export, or push straight into visualization — the handoff is a button, never a re-upload.',
  },
  {
    id: 'viz',
    name: 'Visualization',
    top: 0.655,
    bottom: 0.765,
    note: 'Direct manipulation of the chart, every refinement logged in a history bar, and a selected region that becomes the next prompt. Exploration you can retrace.',
  },
  {
    id: 'results',
    name: 'Results Explorer',
    top: 0.765,
    bottom: 0.875,
    note: 'The quiet lane that ties it together: every cell from every mode lands here with its full regeneration history. Nothing a user produced disappears.',
  },
]

function LaneExplorer() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % LANES.length), 4200)
    return () => clearInterval(t)
  }, [auto])
  const lane = LANES[i]

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white shadow-[0_22px_50px_-28px_rgba(78,110,150,0.45)]">
        <img src="/bosch/askdata-workflow.png" alt="The workflow diagram I mapped, across six swimlanes" className="w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 bg-cream/78 transition-all duration-500"
          style={{ height: `${lane.top * 100}%` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-cream/78 transition-all duration-500"
          style={{ height: `${(1 - lane.bottom) * 100}%` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[1.5%] rounded-lg border-2 border-[#4E6E96] transition-all duration-500"
          style={{ top: `${lane.top * 100}%`, height: `${(lane.bottom - lane.top) * 100}%` }}
        />
      </div>

      <div className="lg:sticky lg:top-32">
        <div className="flex flex-wrap gap-1.5">
          {LANES.map((l, n) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setAuto(false)
                setI(n)
              }}
              className={`rounded-full px-3 py-1.5 text-[11.5px] transition-colors ${
                n === i
                  ? 'bg-[#4E6E96] text-white'
                  : 'border border-plum/15 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-plum/10 bg-white/80 p-6 backdrop-blur-sm">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
            Lane {i + 1} / {LANES.length} · {lane.name}
          </p>
          <p className="mt-3 min-h-[140px] text-[14px] leading-relaxed text-plum">{lane.note}</p>
        </div>
        <p className="mt-3 font-hand text-[15px] text-plum-muted">
          {auto ? 'walking the lanes — click any to stop and read ✦' : 'my own map, lane by lane ✦'}
        </p>
      </div>
    </div>
  )
}

/* ── 04b · 我做的可交互原型 ─────────────────────────────────── */
const PROTO = [
  {
    id: 'sso',
    step: '01',
    tab: 'Sign in',
    src: '/bosch/proto-1-sso.png',
    title: 'Start where the enterprise starts',
    note: 'Not a login screen for show. Single sign-on through the company identity provider, with the credential story stated plainly. If the first screen ignores how enterprise IT works, nothing after it gets adopted.',
  },
  {
    id: 'locked',
    step: '02',
    tab: 'Locked',
    src: '/bosch/proto-2-locked.png',
    title: 'Nothing works until data does',
    note: 'The input is disabled. Analytics and visualization are greyed out. Only two doors are open — connect a database, or upload a file. This is the "data unlocks modes" decision, made testable before it was written into the spec.',
  },
  {
    id: 'connect',
    step: '03',
    tab: 'Connect',
    src: '/bosch/proto-3-connect.png',
    title: 'Pick a domain, not a connection string',
    note: 'Databases are presented as business domains with what they contain, how many tables, when they were refreshed, and their access level — so a purchasing analyst can choose correctly without asking an engineer.',
  },
  {
    id: 'explorer',
    step: '04',
    tab: 'Results',
    src: '/bosch/proto-4-explorer.png',
    title: 'One place everything lands',
    note: 'The Results Explorer: every output from every mode, tabbed and searchable, with each query keeping its own regeneration history. This is the last lane of my workflow map, made real.',
  },
]

function ProtoWalkthrough() {
  const [i, setI] = useState(0)
  const p = PROTO[i]

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="label-text text-[#4E6E96]">The prototype I built</p>
        <p className="font-hand text-[15px] text-plum-muted">
          product names and identity masked — NDA ✦
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {PROTO.map((c, n) => (
          <div key={c.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI(n)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
                n === i
                  ? 'bg-[#4E6E96] text-white shadow-[0_10px_22px_-12px_rgba(78,110,150,0.8)]'
                  : 'border border-plum/15 bg-white/60 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
              }`}
            >
              <span className={n === i ? 'text-white/65' : 'text-plum-faint'}>{c.step}</span>
              {c.tab}
            </button>
            {n < PROTO.length - 1 && <span aria-hidden className="text-[#7FA3CC]">→</span>}
          </div>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-xl border border-plum/15 bg-white shadow-[0_28px_60px_-28px_rgba(78,110,150,0.55)]">
          <div className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/70 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8B4B4]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8D5A8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#B5CBB7]" />
            <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[10.5px] text-plum-faint">
              clickable prototype · built by me
            </span>
          </div>
          <img src={p.src} alt={p.title} className="block w-full" loading={i === 0 ? 'eager' : 'lazy'} />
        </div>

        <div className="lg:sticky lg:top-32">
          <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              Step {p.step} · {p.tab}
            </p>
            <h3 className="mt-2 font-serif text-lg font-light leading-snug text-plum">{p.title}</h3>
            <p className="mt-3 min-h-[132px] text-[14px] leading-relaxed text-plum-muted">{p.note}</p>
          </div>
          <p className="mt-3 font-hand text-[15px] text-plum-muted">
            841 versions before I called it settled ✦
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── 05 · 决策 ───────────────────────────────────────────────── */
const DECISIONS = [
  {
    num: '01',
    title: 'The Analysis Session — a digital thread',
    body: 'If users must leave to fetch their data, the product remembers for them. The session holds the query, the schema and the history across the manual hop, then validates the returning CSV against the schema it expected.',
    hand: 'context survives the round-trip ✦',
  },
  {
    num: '02',
    title: 'Data unlocks modes — not menus',
    body: 'No data, no chat. Connect a database and query mode opens; upload a CSV and analytics and visualization open. The interface teaches the workflow through what it makes possible.',
    hand: 'the UI is the onboarding ✦',
  },
  {
    num: '03',
    title: 'Designed for the bad days',
    body: 'When the query agent goes offline: the health indicator flips, new generation locks, but existing queries stay viewable, editable and runnable. I specced the offline state action by action, so a degraded product still moves work forward.',
    hand: 'graceful degradation, specced row by row ✦',
  },
  {
    num: '04',
    title: 'Queries become reusable knowledge',
    body: 'High-value question and query pairs get saved, tagged and reinserted — and the AI regenerates them against whatever dataset is loaded now. Teams stop re-deriving the same answer.',
    hand: 'reuse, not retype ✦',
  },
]

/* ── 06 · 查询 cell 解剖 ─────────────────────────────────────── */
const ANATOMY = [
  {
    id: 'header',
    label: 'Header',
    note: 'Cell type plus data chips for the database and tables in play. Clicking a chip opens schema and sample rows — context is one tap away, never a page away.',
  },
  {
    id: 'prompt',
    label: 'Editable prompt',
    note: 'The natural-language question stays editable after the fact. Revise and rerun updates the same cell — and each run writes a new timestamped file instead of overwriting the last one.',
  },
  {
    id: 'sql',
    label: 'Generated query',
    note: 'Transparent, syntax-highlighted, editable, with copy and undo/redo. AI you can inspect and correct beats AI you are asked to trust.',
  },
  {
    id: 'results',
    label: 'Results + handoff',
    note: 'The table comes with three exits — download, send to analytics, send to visualization — plus a one-line AI insight. Every result is a doorway, not a destination.',
  },
  {
    id: 'footer',
    label: 'Status footer',
    note: 'Executed in 0.42s · 4 rows. And a failure state that offers an upload fallback with instructions, because in this environment failure is a normal path.',
  },
]

function SqlCellAnatomy() {
  const [active, setActive] = useState('header')
  const note = ANATOMY.find((a) => a.id === active)!
  const zone = (id: string) =>
    `cursor-pointer rounded-lg transition-all duration-200 ${
      active === id ? 'bg-[#EFF5FB] ring-2 ring-[#7FA3CC]' : 'hover:bg-[#EFF5FB]/60'
    }`

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-plum/15 bg-white p-4 shadow-[0_24px_54px_-28px_rgba(78,110,150,0.4)]">
        <div
          className={`${zone('header')} flex flex-wrap items-center gap-2 p-2.5`}
          onMouseEnter={() => setActive('header')}
          onClick={() => setActive('header')}
        >
          <span className="rounded-md bg-[#4E6E96] px-2 py-0.5 text-[10px] font-semibold text-white">QUERY</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]"><Glyph name="database" className="h-3 w-3" w={1.8} />manufacturing</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]">production_lines<Glyph name="eye" className="h-3 w-3" w={1.8} /></span>
          <span className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]">+2 more</span>
          <Glyph name="trash" className="ml-auto h-3.5 w-3.5 text-plum-faint" w={1.7} />
        </div>
        <div className={`${zone('prompt')} mt-1 p-2.5`} onMouseEnter={() => setActive('prompt')} onClick={() => setActive('prompt')}>
          <p className="text-[10px] uppercase tracking-[0.15em] text-plum-faint">Prompt</p>
          <p className="mt-1 rounded-lg border border-plum/10 bg-cream-soft/70 px-3 py-2 text-[12.5px] text-plum">
            Show me all suppliers with revenue over $1M
          </p>
        </div>
        <div className={`${zone('sql')} mt-1 p-2.5`} onMouseEnter={() => setActive('sql')} onClick={() => setActive('sql')}>
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.15em] text-plum-faint">Generated query</p>
            <span className="text-[10px] text-plum-faint">
              Copy · Undo · Redo · <span className="font-semibold text-[#4E6E96]">Run</span>
            </span>
          </div>
          <pre className="mt-1 overflow-x-auto rounded-lg bg-[#2E2438] px-3 py-2 font-mono text-[11px] leading-relaxed text-[#E8DFF0]">
{`SELECT supplier_id, company_name, annual_revenue
FROM suppliers WHERE annual_revenue > 1000000
ORDER BY annual_revenue DESC;`}
          </pre>
        </div>
        <div className={`${zone('results')} mt-1 p-2.5`} onMouseEnter={() => setActive('results')} onClick={() => setActive('results')}>
          <div className="overflow-hidden rounded-lg border border-plum/10 text-[11px]">
            <div className="grid grid-cols-3 bg-cream-soft/80 px-3 py-1.5 font-medium text-plum">
              <span>company</span>
              <span>country</span>
              <span className="text-right">revenue</span>
            </div>
            {[
              ['Alpine Mfg', 'Switzerland', '2,100,000'],
              ['Nordic Supplies', 'Sweden', '1,750,000'],
              ['Maple Leaf Corp', 'Canada', '1,450,000'],
            ].map((r) => (
              <div key={r[0]} className="grid grid-cols-3 border-t border-plum/5 px-3 py-1.5 text-plum-muted">
                <span>{r[0]}</span>
                <span>{r[1]}</span>
                <span className="text-right">{r[2]}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10.5px]">
            <span className="rounded-full bg-plum px-2.5 py-1 text-cream">Download CSV</span>
            <span className="rounded-full border border-[#7FA3CC]/50 px-2.5 py-1 text-[#4E6E96]">Send to Analytics</span>
            <span className="rounded-full border border-[#7FA3CC]/50 px-2.5 py-1 text-[#4E6E96]">Send to Visualization</span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] italic text-plum-muted"><Glyph name="spark" className="h-3.5 w-3.5 shrink-0 not-italic text-[#B98ACB]" w={1.6} />Alpine accounts for 33.7% of total revenue.</p>
        </div>
        <div className={`${zone('footer')} mt-1 p-2.5`} onMouseEnter={() => setActive('footer')} onClick={() => setActive('footer')}>
          <p className="text-[11px] text-[#5E8B5A]">✓ Executed in 0.42s · 4 rows</p>
        </div>
      </div>

      <div className="md:sticky md:top-32">
        <div className="rounded-2xl border border-plum/10 bg-white/80 p-6 backdrop-blur-sm">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
            {ANATOMY.findIndex((a) => a.id === active) + 1} / {ANATOMY.length} · {note.label}
          </p>
          <p className="mt-3 min-h-[120px] text-[14px] leading-relaxed text-plum">{note.note}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ANATOMY.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setActive(a.id)}
                className={`rounded-full px-3 py-1 text-[11px] transition-colors ${
                  a.id === active ? 'bg-[#4E6E96] text-white' : 'border border-plum/15 text-plum-muted hover:border-[#7FA3CC]'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 font-hand text-[15px] text-plum-muted">
          every zone here is written down in my PRD — hover to read ✦
        </p>
      </div>
    </div>
  )
}

/* ── 06b · 真实产品截图 + 标注热点 ───────────────────────────── */
const PINS = [
  {
    x: 0.098,
    y: 0.31,
    title: 'Session history',
    note: 'Every session titled by its own latest content and tagged with the mode it lives in. Resume one and the whole workspace returns — cells, mode state, linked datasets.',
  },
  {
    x: 0.145,
    y: 0.089,
    title: 'Agent health',
    note: 'The status line I specced: LLM configured, agent online, last checked. When it flips to offline, generation locks but existing work stays runnable — the failure design from section 05, sitting in the header.',
  },
  {
    x: 0.409,
    y: 0.152,
    title: 'Results, then a doorway',
    note: 'The table is not the end of the cell. Its job is to give the user something to hand onward, which is why the next three buttons exist.',
  },
  {
    x: 0.552,
    y: 0.574,
    title: 'Three exits, one row',
    note: 'Download, send to analytics, send to visualization. This single row is what replaced the copy-run-download-reupload loop — the handoff is a button, not a round-trip.',
  },
  {
    x: 0.43,
    y: 0.642,
    title: 'Executed in 0.12s · 5 rows',
    note: 'Time and row count, always. Boring on the happy path, essential on the bad one — it is the same line that turns into the failure state with an upload fallback.',
  },
  {
    x: 0.352,
    y: 0.879,
    title: 'Modes, now unlocked',
    note: 'Analytics and visualization were greyed out until this query produced data. The interface teaches the workflow by what it makes possible — and the table chips above show exactly what context is in play.',
  },
  {
    x: 0.931,
    y: 0.812,
    title: 'Auto-select (AI)',
    note: 'Skip table selection and let the backend infer, with a nudge that manual selection is more accurate. Speed by default, precision on request.',
  },
  {
    x: 0.36,
    y: 0.979,
    title: 'Quick refinements',
    note: 'Suggested next questions generated from the connected table, so the second question costs less effort than the first. Exploration, prompted.',
  },
]

function AnnotatedShot() {
  const [open, setOpen] = useState(0)

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-plum/15 bg-white shadow-[0_28px_60px_-28px_rgba(78,110,150,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8B4B4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8D5A8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#B5CBB7]" />
          <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[10.5px] text-plum-faint">
            the shipped product · internal deployment
          </span>
        </div>
        <div className="relative">
          <img
            src="/bosch/shipped-screen.png"
            alt="The shipped workspace mid-flight: query results, the three handoff buttons, execution status, unlocked modes and table chips"
            className="w-full"
          />
          {PINS.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onMouseEnter={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-label={p.title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold shadow-md transition-all duration-300 ${
                  open === i
                    ? 'scale-125 bg-[#4E6E96] text-white'
                    : 'bg-white text-[#4E6E96] ring-2 ring-[#4E6E96]/60 hover:scale-110'
                }`}
              >
                {i + 1}
              </span>
              {open !== i && (
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-[#4E6E96]/25"
                  style={{ animationDuration: '2.4s' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PINS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onMouseEnter={() => setOpen(i)}
            onClick={() => setOpen(i)}
            className={`rounded-xl border p-4 text-left transition-all duration-300 ${
              open === i
                ? 'border-[#7FA3CC] bg-white shadow-[0_14px_30px_-16px_rgba(78,110,150,0.4)]'
                : 'border-plum/10 bg-white/55 hover:border-[#7FA3CC]/50'
            }`}
          >
            <p className="flex items-center gap-2 font-serif text-[15px] text-plum">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  open === i ? 'bg-[#4E6E96] text-white' : 'bg-[#EFF5FB] text-[#4E6E96]'
                }`}
              >
                {i + 1}
              </span>
              {p.title}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">{p.note}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 06c · 架构分层聚光灯 ───────────────────────────────────── */
const LAYERS = [
  {
    id: 'frontend',
    name: 'What users touch',
    top: 0.0,
    bottom: 0.215,
    note: 'One frontend, four surfaces — query, analytics, visualization, schema. Users never learn that three services live underneath.',
  },
  {
    id: 'orchestration',
    name: 'The orchestration layer',
    top: 0.38,
    bottom: 0.59,
    note: 'Where the integration actually happens. One layer owns orchestration, session state, business logic — so the frontends stay separate while the experience does not.',
  },
  {
    id: 'services',
    name: 'The four services',
    top: 0.60,
    bottom: 0.845,
    note: 'The metadata engine, the query agent, the executor and the visualization service. Each replaceable on its own — which is what let us ship in slices.',
  },
  {
    id: 'data',
    name: 'Data & models',
    top: 0.845,
    bottom: 1.0,
    note: 'Metadata storage, cache, the LLM service, and the customer database that stays behind the wall — the constraint that shaped everything above it.',
  },
]

function ArchLayers() {
  const [i, setI] = useState(0)
  const layer = LAYERS[i]
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white p-3 shadow-[0_22px_50px_-28px_rgba(78,110,150,0.45)]">
        <div className="relative">
          <img src="/bosch/askdata-architecture.png" alt="System architecture across four layers" className="w-full" loading="eager" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 bg-white/80 transition-all duration-500"
            style={{ height: `${layer.top * 100}%` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-white/80 transition-all duration-500"
            style={{ height: `${(1 - layer.bottom) * 100}%` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-0.5%] rounded-lg border-2 border-[#4E6E96] transition-all duration-500"
            style={{ top: `${layer.top * 100}%`, height: `${(layer.bottom - layer.top) * 100}%` }}
          />
        </div>
      </div>
      <div className="lg:sticky lg:top-32">
        <div className="flex flex-wrap gap-1.5">
          {LAYERS.map((l, n) => (
            <button
              key={l.id}
              type="button"
              onMouseEnter={() => setI(n)}
              onClick={() => setI(n)}
              className={`rounded-full px-3 py-1.5 text-[11.5px] transition-colors ${
                n === i
                  ? 'bg-[#4E6E96] text-white'
                  : 'border border-plum/15 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-plum/10 bg-white/80 p-6 backdrop-blur-sm">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">{layer.name}</p>
          <p className="mt-3 min-h-[96px] text-[14px] leading-relaxed text-plum">{layer.note}</p>
        </div>
        <p className="mt-3 font-hand text-[15px] text-plum-muted">
          separate services, one product surface ✦
        </p>
        {/* 真实技术栈 */}
        <div className="mt-5 rounded-2xl border border-plum/10 bg-white/60 px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
            What it runs on
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { src: '/bosch/stack/react.png', alt: 'React', h: 'h-5' },
              { src: '/bosch/stack/fastapi.png', alt: 'FastAPI', h: 'h-4' },
              { src: '/bosch/stack/django.png', alt: 'Django', h: 'h-4' },
              { src: '/bosch/stack/openai.png', alt: 'OpenAI', h: 'h-5' },
            ].map((t) => (
              <img key={t.alt} src={t.src} alt={t.alt} title={t.alt} loading="lazy" className={`${t.h} w-auto opacity-80`} />
            ))}
            <span className="text-[12px] text-plum-faint">PostgreSQL · Redis · Azure</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── 07 · Sprint 时间轴 ──────────────────────────────────────── */
const SPRINTS = [
  {
    n: '04',
    window: 'Sept 30 – Oct 7',
    goal: 'Foundation: conversational core + basic UI',
    did: ['Chat interface against a mock LLM', 'Layout for chat / database / schema panels', 'Message schema for session storage'],
    out: 'A user can talk to the product and open the schema editor.',
  },
  {
    n: '05',
    window: 'Oct 8 – Oct 14',
    goal: 'Context: database & session management',
    did: ['Database connection modal', 'Connected-database chips in the header', 'Schema editor: column names & descriptions'],
    out: 'A user can connect a database, edit metadata, and have it persist in the chat.',
  },
  {
    n: '06',
    window: 'Oct 15 – Oct 21',
    goal: 'Midterm delivery: query generation MVP',
    did: ['Natural language → query', 'Execution error management', 'Result preview + editable query block', 'Session persistence'],
    out: 'End to end: chat → database → prompt → query → result.',
  },
  {
    n: '07+',
    window: 'Oct 22 onward',
    goal: 'Depth: analytics, insights, and the visualization redesign',
    did: [
      'Python code insights in analytics mode',
      'Visualization cell redesign — canvas, interaction timeline, explain area',
      'Every task cut into P0 / P1 with a named owner',
    ],
    out: 'Specs precise enough that engineers could build without asking what I meant.',
  },
]

function SprintTimeline() {
  const [i, setI] = useState(2)
  const [showArtifact, setShowArtifact] = useState(false)
  const s = SPRINTS[i]
  return (
    <div className="rounded-[2rem] border border-plum/10 bg-white/70 p-6 md:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          The weekly cadence · planning docs I wrote
        </p>
        <p className="font-hand text-[14px] text-plum-faint">internal details masked — NDA ✦</p>
      </div>

      <div className="relative mt-7">
        <div aria-hidden className="absolute left-0 right-0 top-[13px] h-px bg-plum/15" />
        <div className="relative flex justify-between">
          {SPRINTS.map((sp, n) => (
            <button key={sp.n} type="button" onClick={() => setI(n)} className="group/sp flex flex-col items-center gap-2">
              <span
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[10.5px] font-semibold transition-all duration-300 ${
                  n === i
                    ? 'scale-110 border-[#4E6E96] bg-[#4E6E96] text-white'
                    : 'border-plum/20 bg-cream text-plum-muted group-hover/sp:border-[#7FA3CC]'
                }`}
              >
                {sp.n}
              </span>
              <span className={`text-[10.5px] transition-colors ${n === i ? 'text-plum' : 'text-plum-faint'}`}>
                {sp.window}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#4E6E96]">Sprint {s.n} goal</p>
          <h3 className="mt-2 font-serif text-xl font-light leading-snug text-plum">{s.goal}</h3>
          <p className="mt-4 rounded-xl bg-[#EFF5FB]/70 px-4 py-3 text-[13px] leading-relaxed text-plum-muted">
            <span className="font-medium text-[#4E6E96]">Expected outcome · </span>
            {s.out}
          </p>
        </div>
        <ul className="space-y-2.5">
          {s.did.map((d) => (
            <li key={d} className="flex gap-2.5 text-[13.5px] leading-relaxed text-plum-muted">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7FA3CC]" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* 原始 roadmap 工件：默认收起 */}
      <button
        type="button"
        onClick={() => setShowArtifact((v) => !v)}
        className="mt-7 inline-flex items-center gap-2 text-[12.5px] font-medium text-[#4E6E96] transition-colors hover:text-plum"
      >
        <span aria-hidden className={`transition-transform duration-300 ${showArtifact ? 'rotate-90' : ''}`}>▸</span>
        {showArtifact ? 'Hide the roadmap I drew' : 'See the roadmap I drew'}
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: showArtifact ? 900 : 0, opacity: showArtifact ? 1 : 0 }}
      >
        <figure className="mt-4 rotate-[-0.5deg] overflow-hidden rounded-xl border border-plum/10 shadow-[0_20px_44px_-26px_rgba(78,110,150,0.45)]">
          <img
            src="/bosch/askdata-roadmap.png"
            alt="The semester roadmap: sprints with objectives, activities and expected outcomes"
            loading="lazy"
            className="w-full"
          />
        </figure>
        <p className="mt-3 font-hand text-[15px] text-plum-muted">
          the original planning artifact — product name masked ✦
        </p>
      </div>
    </div>
  )
}

/* ── 07b · 交付工件 ──────────────────────────────────────────── */
const SHIP_CARDS = [
  {
    tag: 'Epic · assigned to me',
    color: '#8FAE8B',
    title: 'Redesign the interaction flow',
    body: 'Handed the open-ended brief and the product design phase end to end — refined user workflow, UX mockups, MVP scope, and the alternatives we chose against. Closed as completed.',
  },
  {
    tag: 'PRD',
    color: '#7A9CC6',
    title: 'MVP product requirements',
    body: 'Five layers, three modes, session persistence, offline behaviour — I wrote it before it was built, so the team argued about the doc instead of the build. A second PRD followed for the query library.',
  },
  {
    tag: 'Issue · opened by me',
    color: '#D193A8',
    title: 'Bug + UI enhancement, specced',
    body: 'Found in QA. Instead of filing "this is broken", I wrote the expected behaviour cell by cell, assigned an owner, and scheduled it into the sprint.',
  },
]

/* ── 08 · 价值 ───────────────────────────────────────────────── */
const VALUE = [
  { n: 5, suffix: '–10×', label: 'faster time-to-insight — a 10+ minute scramble becomes a 1–3 minute pipeline' },
  { n: 80, suffix: '%+', label: 'of manual analytics workflows streamlined end to end' },
  { n: 7, prefix: '3–', suffix: ' hrs', label: 'of engineer support handed back to each business unit, every week' },
]

export function AskDataCase() {
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
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <img src="/logos/bosch-wordmark.png" alt="Bosch" className="h-5 w-auto" />
            <span aria-hidden className="font-hand text-[16px] text-plum-faint">×</span>
            <img src="/logos/cmu-wordmark.png" alt="Carnegie Mellon University" className="h-8 w-auto rounded-md" />
            <span className="label-text text-[#4E6E96]">Enterprise AI Product · Product Lead</span>
          </div>
        </Reveal>
        <h1 className="font-serif text-[clamp(2.2rem,5.6vw,3.9rem)] font-light leading-[1.05] text-plum">
          <WordReveal text="GenAI Analytics Suite" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            Three disconnected tools, one continuous pipeline — from a question to an insight
            without losing the thread.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            An enterprise GenAI analytics platform for internal teams across manufacturing,
            purchasing and engineering. I owned it as the only product person on the team: I mapped
            the workflow, prototyped it before writing a line of spec, wrote the requirements, ran
            the weekly sprints, and made the calls that turned a fragmented toolchain into one
            product.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SCOPE.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB]/70 px-3.5 py-1.5 text-[11.5px] font-medium text-[#4E6E96]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-label text-plum-faint">
            Industry collaboration · internal names and details masked
          </p>
        </Reveal>

        <Reveal className="mt-12" y={32}>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-12">
            <AskDataUI />
          </div>
        </Reveal>

        <SectionNav />

        {/* ── 01 问题 ──────────────────────────────────────────── */}
        <section id="problem" className="mt-14 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">01 · The problem</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              The tools all worked. The workflow between them didn't.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              Query generation, analytics and visualization had each been built well — and
              independently. Between them sat a person doing clipboard work: copying a query out,
              running it somewhere else, downloading a file, re-uploading it, re-explaining the
              columns. Every hop dropped the context the next tool needed.
            </p>
          </Reveal>
          <Reveal className="mt-8" y={28}>
            <BeforeAfterFlow />
          </Reveal>

          <Reveal className="mt-14">
            <p className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              And here is the right-hand side, running.
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              The same question travelling through all four stages without a single manual handoff.
              Step through it.
            </p>
          </Reveal>
          <Reveal className="mt-7" y={28}>
            <PipelineDemo />
          </Reveal>
        </section>

        {/* ── 02 约束 ──────────────────────────────────────────── */}
        <section id="constraints" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">02 · Constraints</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              The constraints weren't blockers. They were the brief.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CONSTRAINTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-[1.4rem] border border-plum/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white">
                  <Glyph name={c.icon} className="h-7 w-7 text-[#4E6E96]" />
                  <h3 className="mt-3 font-serif text-lg font-light text-plum">{c.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{c.body}</p>
                  <p className="mt-4 border-t border-plum/10 pt-3 font-hand text-[15px] text-[#4E6E96]">
                    {c.became} ✦
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 03 用户 ──────────────────────────────────────────── */}
        <section id="users" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">03 · Who it's for</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Three very different people, one shared complaint
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.who} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[1.4rem] bg-gradient-to-br from-[#EFF5FB] to-cream-soft p-6 transition-transform duration-300 hover:-translate-y-1">
                  <Glyph name={s.icon} className="h-8 w-8 text-[#4E6E96]" />
                  <p className="mt-4 font-serif text-[15px] italic leading-snug text-plum">“{s.quote}”</p>
                  <h3 className="mt-4 border-t border-plum/10 pt-3 font-serif text-lg font-light text-plum">{s.who}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-plum-muted">{s.need}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 04 流程地图 ──────────────────────────────────────── */}
        <section id="map" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">04 · The map</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Six lanes, one thread
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              Before writing a single requirement I mapped every route a user could take — including
              the ones where things go wrong. This is that map, walked lane by lane.
            </p>
          </Reveal>
          <Reveal className="mt-8" y={28}>
            <LaneExplorer />
          </Reveal>

          <Reveal className="mt-16">
            <p className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Then I built it, before I specced it
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              A map tells you the routes exist. It doesn't tell you whether they feel right. So the
              next thing I made wasn't a document — it was a clickable prototype of the whole
              workspace, which is where the decisions in the next section actually got settled.
            </p>
          </Reveal>
          <Reveal className="mt-7" y={28}>
            <ProtoWalkthrough />
          </Reveal>
        </section>

        {/* ── 05 决策 ──────────────────────────────────────────── */}
        <section id="decisions" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">05 · Decisions</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Four calls that shaped the product
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {DECISIONS.map((d, i) => (
              <Reveal key={d.num} delay={i * 0.06}>
                <div className="group/d h-full rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-serif text-lg text-[#7FA3CC]">{d.num}</span>
                    <span className="text-right font-hand text-[14px] text-plum-faint opacity-0 transition-opacity duration-300 group-hover/d:opacity-100">
                      {d.hand}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-light text-plum">{d.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-plum-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="rounded-[1.6rem] border border-[#D193A8]/30 bg-blush/25 p-7 md:p-9">
              <span className="font-hand text-[17px] text-rose">the call I keep coming back to ✦</span>
              <p className="mt-3 max-w-3xl font-serif text-xl font-light leading-snug text-plum md:text-[1.55rem]">
                The obvious move was to hide the manual step. I designed for it instead.
              </p>
              <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-plum-muted">
                Every instinct said a modern analytics product should never tell a user "go run this
                somewhere else." But the constraint was permanent, and pretending otherwise would
                have made a normal event feel like the product's fault. So the failure path got the
                same design care as the happy one: a clear instruction, a single upload button,
                schema validation on the way back in, and the session waiting exactly where it was
                left. The unglamorous branch is what made this usable inside a real enterprise.
              </p>

              {/* 兑现的失败态 */}
              <figure className="mt-7 overflow-hidden rounded-xl border border-plum/10 bg-white shadow-[0_18px_40px_-22px_rgba(90,63,86,0.35)]">
                <img
                  src="/bosch/fallback-state.png"
                  alt="The shipped failure state: Query Execution Failed — run SQL externally or locally, then upload your CSV below, with Run externally and Upload CSV buttons and the full error kept available"
                  loading="lazy"
                  className="w-full"
                />
              </figure>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[12px] text-plum-faint">
                  The failure state, as shipped — instruction, both exits, and the real error kept one click away
                </span>
                <span className="font-hand text-[15px] text-rose">a dead end turned into a doorway ✦</span>
              </figcaption>
            </div>
          </Reveal>
        </section>

        {/* ── 06 规格 ──────────────────────────────────────────── */}
        <section id="spec" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">06 · The spec</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Anatomy of a query cell
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              The core unit of the workspace. Every zone below — down to the failure states — was
              specced before it was built.
            </p>
          </Reveal>
          <Reveal className="mt-8" y={28}>
            <SqlCellAnatomy />
          </Reveal>

          <Reveal className="mt-16">
            <p className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Spec, meet shipped screen
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              Eight places where a written decision became a visible one. Tap a marker.
            </p>
          </Reveal>
          <Reveal className="mt-7" y={28}>
            <AnnotatedShot />
          </Reveal>

          <Reveal className="mt-16">
            <p className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              What it takes to make that feel like one product
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              The frontends stayed separate, as the constraint required. The integration moved
              underneath them.
            </p>
          </Reveal>
          <Reveal className="mt-7" y={28}>
            <ArchLayers />
          </Reveal>
        </section>

        {/* ── 07 交付 ──────────────────────────────────────────── */}
        <section id="shipped" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">07 · Shipping it</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              A roadmap is only real if it survives contact with a sprint
            </h2>
          </Reveal>
          <Reveal className="mt-8" y={28}>
            <SprintTimeline />
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {SHIP_CARDS.map((card, i) => (
              <Reveal key={card.tag} delay={i * 0.07}>
                <div className="h-full rounded-[1.4rem] border border-plum/10 bg-white p-6 shadow-[0_16px_36px_-22px_rgba(58,36,64,0.25)]">
                  <span
                    className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-[17px] font-light leading-snug text-plum">{card.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 08 价值 + 反思 ───────────────────────────────────── */}
        <section id="worth" className="mt-20 scroll-mt-32">
          <Reveal>
            <div className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/60 p-10 md:p-14">
              <p className="label-text mb-8 text-center text-[#4E6E96]">08 · What it's worth</p>
              <div className="grid gap-10 text-center md:grid-cols-3">
                {VALUE.map((v) => (
                  <div key={v.label}>
                    <p className="font-serif text-5xl font-light text-[#4E6E96] md:text-6xl">
                      {v.prefix}
                      <CountUp value={v.n} suffix={v.suffix} />
                    </p>
                    <p className="mx-auto mt-3 max-w-[240px] text-[12.5px] leading-snug text-plum-muted">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="max-w-3xl">
              <p className="label-text mb-3">What I'd carry forward</p>
              <p className="font-serif text-xl font-light leading-snug text-plum md:text-[1.5rem]">
                Integration is a product problem before it is an engineering one.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-plum-muted">
                Nothing here needed a new model or a new service. What changed was where the context
                lived: once the product held the session instead of the person, three tools started
                behaving like one. The most valuable thing I designed wasn't a screen — it was the
                thread running underneath them, and the discipline to spec the ugly branches as
                carefully as the demo path.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] uppercase tracking-label text-plum-faint">Next up ·</span>
              {['Query library', 'AI insights & suggestions', 'Result organizer', 'Version control', 'Advanced data profiling'].map((r) => (
                <span key={r} className="rounded-full border border-plum/15 bg-white/70 px-4 py-2 text-[12.5px] text-plum-muted">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── 交叉链接 ─────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <Link
            to="/work/bosch-schema"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                The schema layer it stands on ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">Schema Extraction Agents</p>
              <p className="mt-1 text-[13px] text-plum-muted">
                Multi-agent pipeline · trust layer · 56.6% → 97.2% accuracy
              </p>
            </div>
            <span
              aria-hidden
              className="shrink-0 font-serif text-2xl text-[#7FA3CC] transition-transform duration-300 group-hover/x:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </article>
    </main>
  )
}
