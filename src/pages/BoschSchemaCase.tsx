import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'

/**
 * Bosch × CMU 项目一：InterChat 多智能体 schema 抽取。
 * Olivia = Solution Architect；页面核心是她设计的架构的步进式动画走查。
 */

/* ── 架构走查的步骤脚本（对应真实 16 步流程的精简版） ────────── */
const WALK_STEPS = [
  { id: 'upload', caption: 'A user drops a messy PDF into InterChat — tables, footnotes, inconsistent types.' },
  { id: 'parse', caption: 'The parsing layer (PyMuPDF + OCR) turns pages into raw text and tabular content.' },
  { id: 'generator', caption: 'The Schema Generator agent drafts column names, data types, and descriptions.' },
  { id: 'draft', caption: 'A schema draft exists — but drafts from a one-shot LLM can be vague or wrong.' },
  { id: 'validator', caption: 'The Validation agent scores every field: structure, name, description, type.' },
  { id: 'retry', caption: 'Low-confidence fields trigger a retry — LangGraph routes back to the Generator, max 3 rounds.' },
  { id: 'human', caption: 'Still ambiguous? A human-in-the-loop agent asks the user — only the questions that matter.' },
  { id: 'validated', caption: 'The best-scoring YAML wins. Nothing ships below the confidence threshold.' },
  { id: 'formatter', caption: 'The Formatter agent emits the final structured schema — name, type, description.' },
  { id: 'ui', caption: 'Trusted schema lands back in InterChat, ready to ground every downstream chart.' },
] as const

type NodeSpec = {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  accent?: 'blue' | 'rose' | 'sand'
}

const NODES: NodeSpec[] = [
  { id: 'upload', x: 8, y: 60, w: 118, h: 64, label: 'PDF upload', sub: 'InterChat UI' },
  { id: 'parse', x: 8, y: 168, w: 118, h: 64, label: 'Parsing layer', sub: 'PyMuPDF · OCR' },
  { id: 'generator', x: 178, y: 34, w: 150, h: 64, label: 'Schema Generator', sub: 'agent · LLM', accent: 'blue' },
  { id: 'draft', x: 178, y: 134, w: 150, h: 52, label: 'Schema draft', sub: 'candidate YAML' },
  { id: 'validator', x: 178, y: 222, w: 150, h: 64, label: 'Validation agent', sub: 'confidence scoring', accent: 'rose' },
  { id: 'retry', x: 380, y: 128, w: 132, h: 62, label: 'LangGraph', sub: 'retry ≤ 3 rounds', accent: 'blue' },
  { id: 'human', x: 178, y: 322, w: 150, h: 58, label: 'Human-in-the-loop', sub: 'only if ambiguous', accent: 'sand' },
  { id: 'validated', x: 380, y: 254, w: 132, h: 58, label: 'Best YAML', sub: 'threshold-gated' },
  { id: 'formatter', x: 380, y: 348, w: 132, h: 58, label: 'Formatter agent', sub: 'final schema' },
  { id: 'ui', x: 8, y: 348, w: 118, h: 58, label: 'Back to InterChat', sub: 'trusted schema ✓' },
]

const EDGES: Array<[string, string, boolean?]> = [
  ['upload', 'parse'],
  ['parse', 'generator'],
  ['generator', 'draft'],
  ['draft', 'validator'],
  ['validator', 'retry', true],
  ['retry', 'generator', true],
  ['validator', 'human'],
  ['validator', 'validated'],
  ['validated', 'formatter'],
  ['formatter', 'ui'],
]

function nodeCenter(n: NodeSpec) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 }
}

/** 架构步进走查 —— 自动逐步点亮，也可点任意节点查看说明 */
function ArchWalkthrough() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return
    if (paused) return
    const t = setInterval(() => setStep((s) => (s + 1) % WALK_STEPS.length), 2400)
    return () => clearInterval(t)
  }, [paused])

  const activeId = WALK_STEPS[step].id
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="label-text text-[#4E6E96]">The architecture, step by step</p>
        <p className="font-hand text-[15px] text-plum-muted">
          i designed this system — tap any node to explore ✦
        </p>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
        <svg
          viewBox="0 0 524 420"
          className="w-full"
          role="img"
          aria-label="InterChat schema extraction architecture: PDF parsing feeds a schema generator agent, a validation agent scores every field, LangGraph routes retries, a human-in-the-loop agent resolves ambiguity, and a formatter emits trusted schema back to InterChat"
        >
          <defs>
            <marker id="wk-arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#7FA3CC" />
            </marker>
          </defs>

          {/* 分区背景 */}
          <rect x="2" y="8" width="140" height="404" rx="16" fill="#FFFFFF" opacity="0.35" />
          <rect x="166" y="8" width="358" height="404" rx="16" fill="#FFFFFF" opacity="0.5" />
          <text x="72" y="30" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#9A87A0">APPLICATION</text>
          <text x="345" y="30" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#9A87A0">AGENT ORCHESTRATION · LANGGRAPH</text>

          {/* 连线 */}
          {EDGES.map(([a, b, curved], i) => {
            const A = nodeCenter(byId[a])
            const B = nodeCenter(byId[b])
            const active = a === activeId || b === activeId
            const d = curved
              ? `M${A.cx} ${A.cy} C ${A.cx + 60} ${A.cy - 20}, ${B.cx + 60} ${B.cy + 20}, ${B.cx + byId[b].w / 2} ${B.cy}`
              : `M${A.cx} ${A.cy} L${B.cx} ${B.cy}`
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={active ? '#4E6E96' : '#B9CDE4'}
                strokeWidth={active ? 2.2 : 1.4}
                strokeDasharray={curved ? '5 4' : undefined}
                markerEnd="url(#wk-arr)"
                opacity={active ? 1 : 0.55}
                style={{ transition: 'stroke 0.4s, opacity 0.4s' }}
              />
            )
          })}

          {/* 节点 */}
          {NODES.map((n) => {
            const active = n.id === activeId
            const fill = n.accent === 'blue' ? '#DCE7F2' : n.accent === 'rose' ? '#F6E7EC' : n.accent === 'sand' ? '#F6EFE8' : '#FFFFFF'
            const stroke = n.accent === 'rose' ? '#D193A8' : n.accent === 'sand' ? '#C79A4B' : '#7FA3CC'
            return (
              <g
                key={n.id}
                onClick={() => {
                  setPaused(true)
                  setStep(WALK_STEPS.findIndex((s) => s.id === n.id))
                }}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="13"
                  fill={fill}
                  stroke={active ? '#3A2440' : stroke}
                  strokeWidth={active ? 2.2 : 1.3}
                  style={{ transition: 'stroke 0.4s' }}
                />
                {active && (
                  <rect x={n.x - 4} y={n.y - 4} width={n.w + 8} height={n.h + 8} rx="16" fill="none" stroke="#4E6E96" strokeWidth="1.2" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.6s" repeatCount="indefinite" />
                  </rect>
                )}
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 - (n.sub ? 4 : -4)} textAnchor="middle" fontSize="12.5" fill="#3A2440" fontFamily="Georgia, serif">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 13} textAnchor="middle" fontSize="9.5" fill="#9A87A0">
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* 步骤说明 */}
        <div className="rounded-2xl border border-plum/10 bg-white/85 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
              Step {step + 1} / {WALK_STEPS.length}
            </p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="rounded-full border border-plum/15 px-3 py-1 text-[11px] text-plum-muted transition-colors hover:border-[#7FA3CC] hover:text-plum"
            >
              {paused ? '▶ play' : '❚❚ pause'}
            </button>
          </div>
          <p className="mt-3 min-h-[88px] text-[14px] leading-relaxed text-plum">
            {WALK_STEPS[step].caption}
          </p>
          <div className="mt-4 flex gap-1.5">
            {WALK_STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Step ${i + 1}`}
                onClick={() => {
                  setPaused(true)
                  setStep(i)
                }}
                className={`h-1.5 flex-1 rounded-full transition-colors ${i === step ? 'bg-[#4E6E96]' : 'bg-plum/15 hover:bg-plum/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── 信任层三支柱 ────────────────────────────────────────────── */
const TRUST = [
  {
    icon: '◎',
    title: 'Confidence scoring drives the system',
    body: 'Every field gets a score. Scores decide what ships, what retries, and what asks a human — YAML never fails silently.',
  },
  {
    icon: '↻',
    title: 'Retry with control, not hope',
    body: 'LangGraph routes low-confidence fields back to the Generator — partial retries, max 3 rounds, best-YAML selection at the end.',
  },
  {
    icon: '⌗',
    title: 'Every score is logged',
    body: "Full token trace and score logs make the pipeline explainable — trust you can audit, not trust you're asked for.",
  },
]

/* ── 对比竞品 ────────────────────────────────────────────────── */
const COMPARE = [
  { dim: 'Trust layer', them: 'None / manual fix', us: 'Validator + scoring + retry' },
  { dim: 'Output control', them: 'One-shot, template-based', us: 'Threshold-gated, best-YAML' },
  { dim: 'Modularity', them: 'Limited or monolithic', us: 'Fully modular agents' },
  { dim: 'Cost · 3-page PDF', them: '~$0.06', us: '$0.007–0.03' },
]

export function BoschSchemaCase() {
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
          <p className="label-text mb-5 text-[#4E6E96]">Bosch × CMU · Project 01 · Solution Architect</p>
        </Reveal>
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="InterChat schema extraction" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            A multi-agent system that reads messy enterprise PDFs — and only ships schema it can prove it trusts.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            InterChat, Bosch's conversational data-visualization tool, is only as good as the schema
            underneath it. Extracting that schema from real documents was manual and error-prone. We
            built an agentic pipeline with a trust layer at its core — my part was designing the
            system architecture.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['System Architecture', 'Multi-Agent Design', 'LangGraph', 'FastAPI + Docker', 'Evaluation'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB]/70 px-3.5 py-1.5 text-[11.5px] font-medium text-[#4E6E96]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-label text-plum-faint">
            Team of four — Chi · Lan · Olivia · Jerome · 2024–2025
          </p>
        </Reveal>

        {/* ── 交互式架构走查 ──────────────────────────────────── */}
        <Reveal className="mt-14" y={32}>
          <ArchWalkthrough />
        </Reveal>

        {/* ── 信任层 ───────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">The trust layer</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            The one feature competitors didn't have
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="group/t rounded-[1.4rem] border border-plum/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)]"
              >
                <span className="font-serif text-2xl text-[#4E6E96]">{t.icon}</span>
                <h3 className="mt-3 font-serif text-lg font-light text-plum">{t.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{t.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── 评测结果 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">The proof</p>
          <div className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/60 p-8 md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
                  Generator alone guessed.
                  <br />
                  The trust layer knew.
                </h2>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-plum-muted">
                  Same pipeline, two evaluations across four public datasets (Iris, Mushroom, NPHA,
                  Wine Quality). Adding the validator, semantic tolerance, and retry logic took
                  average accuracy from 56.6% to 97.2% — with full coverage and no human fixes
                  required.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-label text-plum-muted">Generator only</span>
                    <span className="font-serif text-3xl font-light text-plum-muted">56.6%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-plum/25" style={{ width: '56.6%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-label text-[#4E6E96]">+ Validator & retry</span>
                    <span className="font-serif text-5xl font-light text-[#4E6E96]">
                      <CountUp value={97.2} suffix="%" />
                    </span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-[#4E6E96]" style={{ width: '97.2%' }} />
                  </div>
                </div>
                <p className="font-hand text-[15px] text-plum-muted">
                  coverage: 100% on both evals — nothing skipped ✦
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 竞品对比 ─────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">Against the market</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            Cheaper than Unstructured.io — and it can prove its answers
          </h2>
          <div className="mt-8 overflow-x-auto">
            <div className="min-w-[560px] overflow-hidden rounded-[1.4rem] border border-plum/10">
              <div className="grid grid-cols-[1.1fr_1.2fr_1.4fr] bg-white/80 px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.15em] text-plum-faint">
                <span />
                <span>Rossum · Docugami · Unstructured.io</span>
                <span className="text-[#4E6E96]">Our system</span>
              </div>
              {COMPARE.map((row, i) => (
                <div
                  key={row.dim}
                  className={`grid grid-cols-[1.1fr_1.2fr_1.4fr] items-center px-6 py-4 text-[13.5px] ${i % 2 ? 'bg-white/50' : 'bg-white/75'}`}
                >
                  <span className="font-medium text-plum">{row.dim}</span>
                  <span className="text-plum-muted">{row.them}</span>
                  <span className="font-medium text-[#4E6E96]">✓ {row.us}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 font-hand text-[15px] text-plum-muted">
            per-YAML-task pricing vs per-page billing — cost you can tune, not a black box ✦
          </p>
        </Reveal>

        {/* ── 它后来长成了什么 ──────────────────────────────────── */}
        <Reveal className="mt-20">
          <Link
            to="/work/askdata"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                Project 02 · What the schema layer made possible ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">
                AskData — AI-native analytics workspace
              </p>
              <p className="mt-1 text-[13px] text-plum-muted">
                Natural-language SQL · Python analysis · Visualization · Reusable knowledge
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
