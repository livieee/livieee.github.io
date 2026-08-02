import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { AskDataUI } from '@/components/AskDataUI'
import { PartnerLogos } from '@/components/PartnerLogos'
import { OutcomeStrip } from '@/components/OutcomeStrip'
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
  const navRef = useRef<HTMLElement>(null)

  /* 当前项滚出视野时（窄屏常见），把它带回来 */
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const chip = nav.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
    if (!chip) return
    const cl = chip.offsetLeft
    const cr = cl + chip.offsetWidth
    if (cl < nav.scrollLeft + 8 || cr > nav.scrollLeft + nav.clientWidth - 8) {
      nav.scrollTo({ left: Math.max(0, cl - 16), behavior: 'smooth' })
    }
  }, [active])

  /* 按滚动位置直接判定当前章节 —— 大跨度跳转也不会漏 */
  useEffect(() => {
    let raf = 0
    const pick = () => {
      raf = 0
      const line = window.innerHeight * 0.34 // 视口上部三分之一处作为判定线
      let current = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick)
    }
    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Case sections"
      className="sticky top-[68px] z-40 -mx-6 mb-2 overflow-x-auto bg-cream/85 px-6 py-3 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-10 md:px-10"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0, black 18px, black calc(100% - 26px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 18px, black calc(100% - 26px), transparent 100%)',
      }}
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
    note: 'Pick a database, load its schema. From here the session knows what it is holding — nobody re-explains it downstream.',
  },
  {
    id: 'query',
    step: '02',
    tab: 'Ask',
    src: '/bosch/demo-2-query.mp4',
    note: 'Plain language becomes an editable query — returned with its two exits already attached.',
  },
  {
    id: 'analyze',
    step: '03',
    tab: 'Analyze',
    src: '/bosch/demo-3-analyze.mp4',
    note: 'The same result flows into Python analysis — readable code, output, charts — with no re-upload.',
  },
  {
    id: 'explore',
    step: '04',
    tab: 'Explore',
    src: '/bosch/demo-4-explore.mp4',
    note: 'And into conversational visualization, with every refinement logged and explained.',
  },
]

function PipelineDemo() {
  const [i, setI] = useState(0)
  const [pct, setPct] = useState(0)
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

  useEffect(() => setPct(0), [i])

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
              className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
                n === i
                  ? 'bg-[#4E6E96] text-white shadow-[0_10px_22px_-12px_rgba(78,110,150,0.8)]'
                  : 'border border-plum/15 bg-white/60 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
              }`}
            >
              <span className={n === i ? 'text-white/65' : 'text-plum-faint'}>{c.step}</span>
              {c.tab}
              {n === i && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2.5px] bg-white/70"
                  style={{ width: `${pct}%`, transition: 'width .25s linear' }}
                />
              )}
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
            onTimeUpdate={(e) => {
              const v = e.currentTarget
              if (v.duration) setPct((v.currentTime / v.duration) * 100)
            }}
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
    body: 'Data lives on-premise. Auth and network security make a direct connection a non-starter.',
    became: 'so the product had to be useful without ever holding the data',
  },
  {
    icon: 'round-trip' as GlyphName,
    title: 'The manual hop is real',
    body: 'Users run the query elsewhere and come back with a CSV. That round-trip was not going away.',
    became: 'so the session had to survive the user leaving',
  },
  {
    icon: 'split-panes' as GlyphName,
    title: 'Three separate frontends',
    body: 'Three services, built independently — and likely to stay that way.',
    became: 'so integration had to happen in the backend, not the UI shell',
  },
]

/* ── 03 · 用户 ───────────────────────────────────────────────── */
const SEGMENTS = [
  {
    who: 'Semiconductor analysts',
    quote: 'I know exactly what I want to ask. I lose twenty minutes getting the data into a shape I can ask it of.',
    need: 'The full suite, without switching tools.',
    icon: 'bar-chart' as GlyphName,
  },
  {
    who: 'Purchasing teams',
    quote: 'Which suppliers are affected by the new tariff policy?',
    need: 'Answers without writing SQL, or filing a ticket.',
    icon: 'invoice' as GlyphName,
  },
  {
    who: 'Plant engineers',
    quote: 'I can write the query myself. I want the statistical modelling on top of it.',
    need: 'Power tools that respect their expertise.',
    icon: 'wrench' as GlyphName,
  },
]

function SegmentPicker() {
  const [i, setI] = useState(0)
  const p = SEGMENTS[i]
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#EFF5FB] to-cream-soft p-6 md:p-9">
      <div className="flex flex-wrap gap-2">
        {SEGMENTS.map((seg, n) => (
          <button
            key={seg.who}
            type="button"
            onMouseEnter={() => setI(n)}
            onClick={() => setI(n)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
              n === i
                ? 'bg-[#4E6E96] text-white shadow-[0_10px_22px_-12px_rgba(78,110,150,0.8)]'
                : 'border border-plum/15 bg-white/70 text-plum-muted hover:border-[#7FA3CC] hover:text-[#4E6E96]'
            }`}
          >
            <Glyph name={seg.icon} className="h-4 w-4" w={1.7} />
            {seg.who}
          </button>
        ))}
      </div>

      <div key={p.who} className="mt-7 grid items-center gap-7 md:grid-cols-[auto_minmax(0,1fr)]" style={{ animation: 'annot-in .3s ease-out' }}>
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-plum/10 bg-white shadow-sm">
          <Glyph name={p.icon} className="h-10 w-10 text-[#4E6E96]" w={1.4} />
        </span>
        <div>
          <p className="font-serif text-[1.35rem] font-light italic leading-snug text-plum md:text-[1.6rem]">
            “{p.quote}”
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-plum-muted">{p.need}</p>
        </div>
      </div>
    </div>
  )
}

/* ── 04 · 流程图泳道聚光灯 ───────────────────────────────────── */
const LANES = [
  {
    id: 'user',
    name: 'User',
    top: 0.215,
    bottom: 0.33,
    note: 'Every entry point in one lane. Whatever the user picks here, the lanes below react — nothing asks them to choose twice.',
  },
  {
    id: 'session',
    name: 'Session / Data',
    top: 0.33,
    bottom: 0.425,
    note: 'Session context created or restored, then schema validated. That validation is what unlocks everything downstream.',
  },
  {
    id: 'sql',
    name: 'Query agent',
    top: 0.425,
    bottom: 0.55,
    note: 'Natural language becomes editable SQL. Plus the branch I insisted on — when execution fails, the product hands over instructions and an upload button instead of a dead end.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    top: 0.55,
    bottom: 0.655,
    note: 'Python analysis with its rationale, not just its output. The handoff onward is a button, never a re-upload.',
  },
  {
    id: 'viz',
    name: 'Visualization',
    top: 0.655,
    bottom: 0.765,
    note: 'Refine the chart directly, every step logged, a selected region becomes the next prompt. Exploration you can retrace.',
  },
  {
    id: 'results',
    name: 'Results Explorer',
    top: 0.765,
    bottom: 0.875,
    note: 'The quiet lane that ties it together — every cell from every mode, with its full history. Nothing a user produced disappears.',
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
    note: 'Single sign-on through the company identity provider. If the first screen ignores how enterprise IT works, nothing after it gets adopted.',
  },
  {
    id: 'locked',
    step: '02',
    tab: 'Locked',
    src: '/bosch/proto-2-locked.png',
    title: 'Nothing works until data does',
    note: 'Input disabled, two modes greyed out, two doors open. The "data unlocks modes" decision, made testable before it was specced.',
  },
  {
    id: 'connect',
    step: '03',
    tab: 'Connect',
    src: '/bosch/proto-3-connect.png',
    title: 'Pick a domain, not a connection string',
    note: 'Databases as business domains — contents, table count, freshness, access level. A purchasing analyst can choose without asking an engineer.',
  },
  {
    id: 'explorer',
    step: '04',
    tab: 'Results',
    src: '/bosch/proto-4-explorer.png',
    title: 'One place everything lands',
    note: 'Every output from every mode, tabbed and searchable, each keeping its own history. The last lane of my map, made real.',
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
            built and rebuilt until the flow felt right ✦
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
    body: 'If users must leave to fetch data, the product remembers for them — holding query, schema and history across the hop, then validating what comes back.',
    hand: 'context survives the round-trip ✦',
  },
  {
    num: '02',
    title: 'Data unlocks modes — not menus',
    body: 'No data, no chat. What you connect decides what opens. The interface teaches the workflow through what it makes possible.',
    hand: 'the UI is the onboarding ✦',
  },
  {
    num: '03',
    title: 'Designed for the bad days',
    body: 'Agent offline: generation locks, but existing queries stay viewable, editable and runnable. I specced it action by action, so a degraded product still moves work forward.',
    hand: 'graceful degradation, specced row by row ✦',
  },
  {
    num: '04',
    title: 'Queries become reusable knowledge',
    body: 'Saved question-and-query pairs get reinserted and regenerated against the current dataset. Teams stop re-deriving the same answer.',
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
    note: 'Titled by its own latest content, tagged by mode. Resume one and the whole workspace returns.',
  },
  {
    x: 0.145,
    y: 0.089,
    title: 'Agent health',
    note: 'When this flips to offline, generation locks but existing work stays runnable.',
  },
  {
    x: 0.409,
    y: 0.152,
    title: 'Results, then a doorway',
    note: 'Not the end of the cell — its job is to give the user something to hand onward.',
  },
  {
    x: 0.552,
    y: 0.574,
    title: 'Three exits, one row',
    note: 'This one row replaced the copy-run-download-reupload loop.',
  },
  {
    x: 0.43,
    y: 0.642,
    title: 'Executed in 0.12s · 5 rows',
    note: 'Boring here, essential when it fails — this is the line that becomes the upload fallback.',
  },
  {
    x: 0.352,
    y: 0.879,
    title: 'Modes, now unlocked',
    note: 'Greyed out until this query produced data. The chips above show what context is in play.',
  },
  {
    x: 0.931,
    y: 0.812,
    title: 'Auto-select (AI)',
    note: 'Speed by default, precision on request — with a nudge that manual selection is more accurate.',
  },
  {
    x: 0.36,
    y: 0.979,
    title: 'Quick refinements',
    note: 'Next questions drawn from the connected table, so the second one costs less than the first.',
  },
]

function AnnotatedShot() {
  const [open, setOpen] = useState(0)
  const a = PINS[open]
  const left = a.x > 0.55           // 右半边的点，注释浮到左侧
  const top = a.y > 0.62            // 下半部分的点，注释浮到上方

  return (
    <div className="overflow-hidden rounded-xl border border-plum/15 bg-white shadow-[0_28px_60px_-28px_rgba(78,110,150,0.5)]">
      <div className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8B4B4]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8D5A8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#B5CBB7]" />
        <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[10.5px] text-plum-faint">
          the shipped product · tap a marker
        </span>
      </div>

      <div className="relative">
        <img
          src="/bosch/shipped-screen.png"
          alt="The shipped workspace mid-flight: query results, the three handoff buttons, execution status, unlocked modes and table chips"
          className="w-full"
        />

        {PINS.map((pin, i) => (
          <button
            key={pin.title}
            type="button"
            onMouseEnter={() => setOpen(i)}
            onClick={() => setOpen(i)}
            aria-label={pin.title}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
          >
            <span
              className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold shadow-md transition-all duration-300 md:h-6 md:w-6 md:text-[11px] ${
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

        {/* 轻注释：跟着选中的点浮在旁边 */}
        <div
          key={a.title}
          className="pointer-events-none absolute z-20 hidden w-[248px] md:block"
          style={{
            left: `${a.x * 100}%`,
            top: `${a.y * 100}%`,
            transform: `translate(${left ? 'calc(-100% - 18px)' : '18px'}, ${top ? 'calc(-100% + 10px)' : '-10px'})`,
            animation: 'annot-in .28s ease-out',
          }}
        >
          <div className="rounded-xl border border-[#7FA3CC]/45 bg-white/95 p-3.5 shadow-[0_16px_34px_-14px_rgba(78,110,150,0.45)] backdrop-blur-sm">
            <p className="font-serif text-[13.5px] leading-snug text-plum">{a.title}</p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-plum-muted">{a.note}</p>
          </div>
        </div>
      </div>

      {/* 移动端：注释落在图下方 */}
      <div className="border-t border-plum/10 bg-cream-soft/40 p-4 md:hidden">
        <p className="font-serif text-[14px] text-plum">
          {open + 1} · {a.title}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-plum-muted">{a.note}</p>
      </div>
    </div>
  )
}

/* ── 05b · 架构：真实架构图 + 整条层带聚光灯 ─────────────────── */
const LAYERS = [
  { id: 'frontend', top: 0.0, bottom: 0.21, name: 'What users touch',
    note: 'One frontend, four surfaces. Users never learn that three services live underneath.' },
  { id: 'edge', top: 0.21, bottom: 0.375, name: 'The edge',
    note: 'One address in front of services that were never designed to sit together.' },
  { id: 'orchestration', top: 0.375, bottom: 0.595, name: 'The orchestration layer',
    note: 'Where the integration lives — session, routing and rules, held here instead of by the user.' },
  { id: 'services', top: 0.595, bottom: 0.835, name: 'The four services',
    note: 'Each replaceable on its own — which is what let us ship in slices.' },
  { id: 'data', top: 0.835, bottom: 1.0, name: 'Data & models',
    note: 'Including the customer database that stays behind the wall — the constraint that shaped everything above it.' },
]

function ArchLayers() {
  const [i, setI] = useState(2)
  const a = LAYERS[i]

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="rounded-[1.4rem] border border-plum/10 bg-white p-3 shadow-[0_20px_46px_-26px_rgba(78,110,150,0.4)] md:p-5">
        <div className="relative">
          <img
            src="/bosch/askdata-architecture.png"
            alt="System architecture: one frontend over a reverse proxy, an orchestration layer, four services, and the data and model layer"
            className="w-full"
            loading="eager"
          />
          {/* 聚光灯：只压暗选中层带以外，选中的一整条保持原样 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 bg-cream/[0.72] transition-all duration-300"
            style={{ height: `${a.top * 100}%` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-cream/[0.72] transition-all duration-300"
            style={{ height: `${(1 - a.bottom) * 100}%` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-0.4%] rounded-lg border-2 border-[#3A2440]/70 transition-all duration-300"
            style={{ top: `${a.top * 100}%`, height: `${(a.bottom - a.top) * 100}%` }}
          />
          {/* 整条可点 */}
          {LAYERS.map((l, n) => (
            <button
              key={l.id}
              type="button"
              onMouseEnter={() => setI(n)}
              onClick={() => setI(n)}
              aria-label={l.name}
              className="absolute inset-x-0"
              style={{ top: `${l.top * 100}%`, height: `${(l.bottom - l.top) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-32">
        <div className="flex flex-wrap gap-1.5">
          {LAYERS.map((l, n) => (
            <button
              key={l.id}
              type="button"
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
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">{a.name}</p>
          <p className="mt-3 min-h-[76px] text-[14px] leading-relaxed text-plum">{a.note}</p>
        </div>

        <div className="mt-4 rounded-2xl border border-plum/10 bg-white/60 px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">What it runs on</p>
          <ul className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3">
            {[
              { src: '/bosch/stack/react.svg', alt: 'React' },
              { src: '/bosch/stack/typescript.svg', alt: 'TypeScript' },
              { src: '/bosch/stack/nginx.svg', alt: 'Nginx' },
              { src: '/bosch/stack/fastapi.svg', alt: 'FastAPI' },
              { src: '/bosch/stack/django.svg', alt: 'Django' },
              { src: '/bosch/stack/postgresql.svg', alt: 'PostgreSQL' },
              { src: '/bosch/stack/redis.svg', alt: 'Redis' },
              { src: '/bosch/stack/openai.png', alt: 'Azure OpenAI' },
            ].map((t) => (
              <li key={t.alt} className="flex items-center gap-1.5">
                <img src={t.src} alt="" aria-hidden loading="lazy" className="h-[18px] w-[18px] object-contain" />
                <span className="text-[11.5px] text-plum-muted">{t.alt}</span>
              </li>
            ))}
          </ul>
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
    body: 'An open-ended brief, handed to me end to end: workflow, mockups, MVP scope, alternatives. Closed as completed.',
  },
  {
    tag: 'PRD',
    color: '#7A9CC6',
    title: 'MVP product requirements',
    body: 'Five layers, three modes, offline behaviour — written before it was built, so the team argued about the doc instead of the build.',
  },
  {
    tag: 'Issue · opened by me',
    color: '#D193A8',
    title: 'Bug + UI enhancement, specced',
    body: 'Found in QA. Not "this is broken" — the expected behaviour, cell by cell, with an owner and a sprint.',
  },
]

/* ── 08 · 价值 ───────────────────────────────────────────────── */
const VALUE = [
  { n: 5, suffix: '–10×', short: 'faster time-to-insight', label: 'faster time-to-insight — a 10+ minute scramble becomes a 1–3 minute pipeline' },
  { n: 80, suffix: '%+', short: 'of manual analytics workflows streamlined', label: 'of manual analytics workflows streamlined end to end' },
  { n: 7, prefix: '3–', suffix: ' hrs', short: 'of engineer support returned per business unit, weekly', label: 'of engineer support handed back to each business unit, every week' },
]

/* ── 08 · 时间坍缩：与 01 段前后对照呼应 ─────────────────────── */
const STEPS_BEFORE = ['ask', 'write SQL', 'copy out', 'run elsewhere', 'download', 're-upload', 're-explain', 'chart']
const STEPS_AFTER = ['ask', 'run', 'analyze', 'chart']

function TimeCollapse() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setOn(true),
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/50 p-7 md:p-11">
      {[
        { k: 'before', label: 'Before', time: '10+ min', steps: STEPS_BEFORE, w: '100%', tone: 'bg-plum/20', text: 'text-plum-muted' },
        { k: 'after', label: 'After', time: '1–3 min', steps: STEPS_AFTER, w: '26%', tone: 'bg-[#4E6E96]', text: 'text-[#4E6E96]' },
      ].map((row, i) => (
        <div key={row.k} className={i ? 'mt-8' : ''}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[11px] uppercase tracking-label text-plum-faint">{row.label}</span>
            <span className={`font-serif text-2xl font-light md:text-3xl ${row.text}`}>{row.time}</span>
          </div>
          <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-white">
            <div
              className={`h-full rounded-full ${row.tone}`}
              style={{
                width: on ? row.w : '0%',
                transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${i * 0.25}s`,
              }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {row.steps.map((st) => (
              <span
                key={st}
                className={`rounded-full px-2.5 py-1 text-[11px] ${
                  row.k === 'after' ? 'bg-[#DCE7F2] text-[#4E6E96]' : 'bg-white text-plum-muted'
                }`}
              >
                {st}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-9 grid gap-6 border-t border-plum/10 pt-7 sm:grid-cols-2">
        <p className="text-[13.5px] leading-relaxed text-plum-muted">
          Eight steps became four — and the four that remain never leave the workspace.
        </p>
        <p className="text-[13.5px] leading-relaxed text-plum-muted">
          Across business units that adds up to{' '}
          <span className="font-medium text-[#4E6E96]">3–7 engineer-hours returned every week</span>.
        </p>
      </div>
    </div>
  )
}

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
          <div className="mb-6">
            <PartnerLogos note="Enterprise AI Product · Product Lead" />
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
            An enterprise analytics platform for internal manufacturing, purchasing and engineering
            teams. I was the only product person on it — I mapped the workflow, prototyped it,
            wrote the specs, and ran the sprints.
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

        {/* 影响力前置：一眼可见 */}
        <Reveal className="mt-10" delay={0.32}>
          <OutcomeStrip items={VALUE.map((v) => ({ n: v.n, prefix: v.prefix, suffix: v.suffix, label: v.short }))} />
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
              Query, analytics and visualization were each built well — and independently. Between
              them sat a person doing clipboard work, and every hop dropped the context the next
              tool needed.
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
              One question, four stages, no manual handoff.
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
          <Reveal className="mt-8" y={28}>
            <SegmentPicker />
          </Reveal>
        </section>

        {/* ── 04 流程地图 ──────────────────────────────────────── */}
        <section id="map" className="mt-20 scroll-mt-32">
          <Reveal>
            <p className="label-text mb-3">04 · The map</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              Six lanes, one thread
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
              Every route a user can take, including the ones where things go wrong.
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
              A map says the routes exist; it doesn't say whether they feel right. So the next thing
              I made wasn't a document — it was a clickable prototype, where the decisions below
              actually got settled.
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

          {/* 第五个决策：集成下沉到后端 */}
          <Reveal className="mt-12">
            <p className="font-serif text-xl font-light leading-snug text-plum md:text-[1.55rem]">
              And the structural one: integrate underneath, not in the shell
            </p>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
              The frontends stayed apart. One layer below them took over session and orchestration —
              so the experience came together anyway.
            </p>
          </Reveal>
          <Reveal className="mt-6" y={28}>
            <ArchLayers />
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-[1.6rem] border border-[#D193A8]/30 bg-blush/25 p-7 md:p-9">
              <span className="font-hand text-[17px] text-rose">the call I keep coming back to ✦</span>
              <p className="mt-3 max-w-3xl font-serif text-xl font-light leading-snug text-plum md:text-[1.55rem]">
                The obvious move was to hide the manual step. I designed for it instead.
              </p>
              <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-plum-muted">
                Pretending the constraint didn't exist would have made a normal event feel like the
                product's fault. So the failure path got the same care as the happy one — an
                instruction, one upload button, validation on the way back, and the session waiting
                where it was left.
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
              The core unit of the workspace, specced before it was built.
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
              Eight written decisions, now visible. Tap a marker.
            </p>
          </Reveal>
          <Reveal className="mt-7" y={28}>
            <AnnotatedShot />
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
            <p className="label-text mb-3">08 · What it's worth</p>
            <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
              The same question, before and after
            </h2>
          </Reveal>
          <Reveal className="mt-8" y={28}>
            <TimeCollapse />
          </Reveal>

          <Reveal className="mt-10">
            <div className="max-w-3xl">
              <p className="label-text mb-3">What I'd carry forward</p>
              <p className="font-serif text-xl font-light leading-snug text-plum md:text-[1.5rem]">
                Integration is a product problem before it is an engineering one.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-plum-muted">
                Nothing here needed a new model. What changed was where the context lived — once the
                product held the session instead of the person, three tools started behaving like
                one. The most valuable thing I designed wasn't a screen.
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
