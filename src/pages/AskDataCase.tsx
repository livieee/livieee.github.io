import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { AskDataUI } from '@/components/AskDataUI'

/**
 * Bosch × CMU 项目二：AskData —— Olivia = Product Lead。
 * 叙事：真实约束 → 产品决策（PRD 证据）→ 交付方式 → 价值。
 */

const SCOPE = ['Product Strategy', 'Workflow Design', 'PRDs', 'Sprint Planning', 'UX Specs']

/* ── 真实约束（来自 Epic #5） ─────────────────────────────────── */
const CONSTRAINTS = [
  {
    icon: '⛔',
    title: 'No direct database connection',
    body: 'Enterprise data lives on-premise (Cloudera, Oracle). The app can never touch it directly.',
  },
  {
    icon: '↪',
    title: 'The manual hop is real',
    body: 'Users copy generated SQL, run it in an external platform, and come back with a CSV.',
  },
  {
    icon: '⌸',
    title: 'Three separate frontends',
    body: 'SQL Agent, InterChat, and Analytics were built independently — and may stay separate.',
  },
]

/* ── 用户画像（来自 Epic #5 business model） ──────────────────── */
const SEGMENTS = [
  {
    who: 'Semiconductor analysts',
    need: 'The full suite — question to visualization in one continuous workflow.',
    icon: '📊',
  },
  {
    who: 'Purchasing teams',
    need: '"What suppliers are affected by recent tariff policies?" — similarity queries + AI insights, no SQL skills needed.',
    icon: '🧾',
  },
  {
    who: 'Plant engineers',
    need: 'SQL editing plus statistical modeling — power tools that respect their expertise.',
    icon: '⚙️',
  },
]

/* ── 产品决策 ────────────────────────────────────────────────── */
const DECISIONS = [
  {
    num: '01',
    title: 'The Analysis Session — a digital thread',
    body: 'If users must leave to fetch their data, the product remembers for them: the session carries SQL, schema, and history across the manual CSV hop, and validates the upload against the expected schema on return.',
    hand: 'context survives the round-trip ✦',
  },
  {
    num: '02',
    title: 'Data unlocks modes — not menus',
    body: 'No data, no chat. Load a database and SQL mode opens; upload a CSV and Analytics + InterChat open. The interface teaches the workflow by what it makes possible.',
    hand: 'the UI is the onboarding ✦',
  },
  {
    num: '03',
    title: 'Designed for the bad days',
    body: 'When the SQL agent goes offline: a health indicator flips, new generation locks, but existing SQL stays viewable, editable, and runnable. Users keep working; nothing is lost.',
    hand: 'graceful degradation, specced cell by cell ✦',
  },
  {
    num: '04',
    title: 'SQL Library — queries become knowledge',
    body: 'High-value question + SQL pairs get saved, tagged, and reinserted — the AI regenerates them against the current dataset. The next analysis starts further ahead.',
    hand: 'reuse, not retype ✦',
  },
]

/* ── SQL cell 解剖热点（来自 MVP PRD §5.1 + Issue #106） ──────── */
const ANATOMY = [
  {
    id: 'header',
    label: 'Header',
    note: 'Cell type + data chips for the database and tables in play. Clicking a chip opens a schema + sample preview — context is one tap away, never a page away.',
  },
  {
    id: 'prompt',
    label: 'Editable prompt',
    note: 'The natural-language question stays editable after the fact. Revise and rerun updates the cell — each run saves a new versioned CSV instead of overwriting the last.',
  },
  {
    id: 'sql',
    label: 'Generated SQL',
    note: 'Transparent, syntax-highlighted, and editable — with copy and undo/redo. AI you can inspect and correct beats AI you have to trust blindly.',
  },
  {
    id: 'results',
    label: 'Results + handoff',
    note: 'The data table comes with three exits: Download CSV, Send to Analytics, Send to InterChat. Every result is a doorway to the next step, plus an AI insight line.',
  },
  {
    id: 'footer',
    label: 'Status footer',
    note: '"✓ Executed in 0.42s · 4 rows" — and a specced failure state that offers a CSV-upload fallback instead of a dead end.',
  },
]

/** SQL cell 解剖图 —— hover/点击左侧区块，右侧显示 PRD 级说明 */
function SqlCellAnatomy() {
  const [active, setActive] = useState('header')
  const note = ANATOMY.find((a) => a.id === active)!
  const zone = (id: string) =>
    `cursor-pointer rounded-lg transition-all duration-200 ${
      active === id ? 'bg-[#EFF5FB] ring-2 ring-[#7FA3CC]' : 'hover:bg-[#EFF5FB]/60'
    }`

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* 左：可交互的 SQL cell 模型 */}
      <div className="rounded-2xl border border-plum/15 bg-white p-4 shadow-[0_24px_54px_-28px_rgba(78,110,150,0.4)]">
        <div className={`${zone('header')} flex flex-wrap items-center gap-2 p-2.5`} onMouseEnter={() => setActive('header')} onClick={() => setActive('header')}>
          <span className="rounded-md bg-[#4E6E96] px-2 py-0.5 text-[10px] font-semibold text-white">SQL</span>
          <span className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]">🗄 manufacturing</span>
          <span className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]">production_lines 👁</span>
          <span className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB] px-2.5 py-0.5 text-[10.5px] text-[#4E6E96]">+2 more</span>
          <span className="ml-auto text-[11px] text-plum-faint">🗑</span>
        </div>
        <div className={`${zone('prompt')} mt-1 p-2.5`} onMouseEnter={() => setActive('prompt')} onClick={() => setActive('prompt')}>
          <p className="text-[10px] uppercase tracking-[0.15em] text-plum-faint">Prompt</p>
          <p className="mt-1 rounded-lg border border-plum/10 bg-cream-soft/70 px-3 py-2 text-[12.5px] text-plum">
            Show me all suppliers with revenue over $1M
          </p>
        </div>
        <div className={`${zone('sql')} mt-1 p-2.5`} onMouseEnter={() => setActive('sql')} onClick={() => setActive('sql')}>
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.15em] text-plum-faint">Generated SQL</p>
            <span className="text-[10px] text-plum-faint">Copy · Undo · Redo · <span className="font-semibold text-[#4E6E96]">Run</span></span>
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
              <span>company</span><span>country</span><span className="text-right">revenue</span>
            </div>
            {[
              ['Alpine Mfg', 'Switzerland', '2,100,000'],
              ['Nordic Supplies', 'Sweden', '1,750,000'],
              ['Maple Leaf Corp', 'Canada', '1,450,000'],
            ].map((r) => (
              <div key={r[0]} className="grid grid-cols-3 border-t border-plum/5 px-3 py-1.5 text-plum-muted">
                <span>{r[0]}</span><span>{r[1]}</span><span className="text-right">{r[2]}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10.5px]">
            <span className="rounded-full bg-plum px-2.5 py-1 text-cream">Download CSV</span>
            <span className="rounded-full border border-[#7FA3CC]/50 px-2.5 py-1 text-[#4E6E96]">Send to Analytics</span>
            <span className="rounded-full border border-[#7FA3CC]/50 px-2.5 py-1 text-[#4E6E96]">Send to InterChat</span>
          </div>
          <p className="mt-2 text-[11px] italic text-plum-muted">✨ Alpine accounts for 33.7% of total revenue.</p>
        </div>
        <div className={`${zone('footer')} mt-1 p-2.5`} onMouseEnter={() => setActive('footer')} onClick={() => setActive('footer')}>
          <p className="text-[11px] text-[#5E8B5A]">✓ Executed in 0.42s · 4 rows</p>
        </div>
      </div>

      {/* 右：说明面板 */}
      <div className="md:sticky md:top-28">
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
        <p className="mt-3 text-center font-hand text-[15px] text-plum-muted md:text-left">
          every zone above is specced in my PRD — hover to read ✦
        </p>
      </div>
    </div>
  )
}

/* ── 交付方式（真实 GitHub 工作流） ───────────────────────────── */
const SHIP_CARDS = [
  {
    tag: 'Epic #5 · assigned to me',
    color: '#8FAE8B',
    title: 'Redesign the GenAI analytics interaction flow',
    body: 'Owned the product design phase: refined user workflow, UX mockups, MVP scope, alternative approaches.',
  },
  {
    tag: 'PRD',
    color: '#7A9CC6',
    title: 'AskData MVP requirements',
    body: 'Five-layer architecture, three modes, session persistence, offline states — every behavior written down before it was built.',
  },
  {
    tag: 'Issue #106 · opened by me',
    color: '#D193A8',
    title: 'SQL mode bug + UI enhancement',
    body: 'Found in QA, specced the fix cell-by-cell with expected behaviors, assigned to engineering in Sprint 10.',
  },
]

/* ── 价值指标（来自 AskData deck） ────────────────────────────── */
const VALUE = [
  { n: 5, suffix: '–10×', label: 'faster time-to-insight — 10+ minute workflows become a 1–3 minute pipeline' },
  { n: 80, suffix: '%+', label: 'of manual analytics workflows streamlined end-to-end' },
  { n: 7, prefix: '3–', suffix: ' hrs', label: 'of engineer support saved per business unit, every week' },
]

export function AskDataCase() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 简洁页头 */}
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
          <p className="label-text mb-5 text-[#4E6E96]">Bosch × CMU · Project 02 · Product Lead</p>
        </Reveal>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[1.05] text-plum">
          <WordReveal text="AskData" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            Turning three disconnected tools into one continuous pipeline — from question to insight.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Bosch's GenAI analytics lived in three separate services with a manual, disjointed
            workflow between them. As Product Lead I designed the unified workspace that connects
            natural-language SQL, Python analysis, and interactive visualization — grounded in
            enterprise schema knowledge, built around real infrastructure constraints.
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
        </Reveal>

        {/* ── 产品视觉 ─────────────────────────────────────────── */}
        <Reveal className="mt-14" y={32}>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-12">
            <AskDataUI />
          </div>
        </Reveal>

        {/* ── 起点：真实约束 ───────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">The starting point</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            The constraints weren't blockers. They were the brief.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CONSTRAINTS.map((c) => (
              <div key={c.title} className="rounded-[1.4rem] border border-plum/10 bg-white/70 p-6">
                <span aria-hidden className="text-xl">{c.icon}</span>
                <h3 className="mt-3 font-serif text-lg font-light text-plum">{c.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-hand text-[16px] text-plum-muted">
            most analytics products assume a live database. this one couldn't — that's what made the design interesting ✦
          </p>
        </Reveal>

        {/* ── 为谁而做 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">Who it's for</p>
          <div className="grid gap-5 md:grid-cols-3">
            {SEGMENTS.map((s) => (
              <div
                key={s.who}
                className="rounded-[1.4rem] bg-gradient-to-br from-[#EFF5FB] to-cream-soft p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="text-2xl">{s.icon}</span>
                <h3 className="mt-3 font-serif text-lg font-light text-plum">{s.who}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{s.need}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── 产品决策 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">The product decisions</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            Four calls that shaped the product
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {DECISIONS.map((d) => (
              <div
                key={d.num}
                className="group/d rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-lg text-[#7FA3CC]">{d.num}</span>
                  <span className="font-hand text-[14px] text-plum-faint opacity-0 transition-opacity duration-300 group-hover/d:opacity-100">
                    {d.hand}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-light text-plum">{d.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-plum-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── SQL cell 解剖 ────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">Inside the spec</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            Anatomy of a SQL cell
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-plum-muted">
            The core unit of the workspace. Everything below — down to the failure states — comes
            from the MVP PRD.
          </p>
          <div className="mt-8">
            <SqlCellAnatomy />
          </div>
        </Reveal>

        {/* ── 怎么交付 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">How it shipped</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            PRDs in, sprint issues out
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {SHIP_CARDS.map((card) => (
              <div
                key={card.tag}
                className="rounded-[1.4rem] border border-plum/10 bg-white p-6 shadow-[0_16px_36px_-22px_rgba(58,36,64,0.25)]"
              >
                <span
                  className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
                  style={{ backgroundColor: card.color }}
                >
                  {card.tag}
                </span>
                <h3 className="mt-3 font-serif text-[17px] font-light leading-snug text-plum">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-hand text-[15px] text-plum-muted">
            two PRDs, weekly sprints, QA passes filed as specs — the unglamorous loop that ships ✦
          </p>
        </Reveal>

        {/* ── 价值 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/60 p-10 md:p-14">
            <p className="label-text mb-8 text-center text-[#4E6E96]">What it's worth</p>
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

        {/* ── Roadmap ──────────────────────────────────────────── */}
        <Reveal className="mt-16">
          <p className="label-text mb-4">Next on the roadmap</p>
          <div className="flex flex-wrap gap-2.5">
            {['SQL Library', 'AI insight & suggestions', 'Result organizer', 'Version control', 'Advanced data profiling'].map((r) => (
              <span
                key={r}
                className="rounded-full border border-plum/15 bg-white/70 px-4 py-2 text-[13px] text-plum-muted"
              >
                {r}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ── 交叉链接：项目一 ──────────────────────────────────── */}
        <Reveal className="mt-16">
          <Link
            to="/work/bosch-schema"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                Project 01 · The schema layer it stands on ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">
                InterChat schema extraction
              </p>
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
