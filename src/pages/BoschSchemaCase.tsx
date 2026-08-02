import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { PartnerLogos } from '@/components/PartnerLogos'
import { OutcomeStrip } from '@/components/OutcomeStrip'

/**
 * Bosch × CMU 项目一：多智能体 schema 抽取（对外名 Schema Extraction Agents）。
 * Olivia = Solution Architect；页面核心是她设计的架构的步进式动画走查。
 */

/* ── 架构走查的步骤脚本（对应真实 16 步流程的精简版） ────────── */
const WALK_STEPS = [
  { id: 'upload', caption: 'A user drops a messy PDF into the analytics tool — tables, footnotes, inconsistent types.' },
  { id: 'parse', caption: 'The parsing layer (PyMuPDF + OCR) turns pages into raw text and tabular content.' },
  { id: 'generator', caption: 'The Schema Generator agent drafts column names, data types, and descriptions.' },
  { id: 'draft', caption: 'A schema draft exists — but drafts from a one-shot LLM can be vague or wrong.' },
  { id: 'validator', caption: 'The Validation agent scores every field: structure, name, description, type.' },
  { id: 'retry', caption: 'Low-confidence fields trigger a retry — LangGraph routes back to the Generator, max 3 rounds.' },
  { id: 'human', caption: 'Still ambiguous? A human-in-the-loop agent asks the user — only the questions that matter.' },
  { id: 'validated', caption: 'The best-scoring YAML wins. Nothing ships below the confidence threshold.' },
  { id: 'formatter', caption: 'The Formatter agent emits the final structured schema — name, type, description.' },
  { id: 'ui', caption: 'Trusted schema lands back in the tool, ready to ground every downstream chart.' },
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
  { id: 'upload', x: 8, y: 60, w: 118, h: 64, label: 'PDF upload', sub: 'analytics tool UI' },
  { id: 'parse', x: 8, y: 168, w: 118, h: 64, label: 'Parsing layer', sub: 'PyMuPDF · OCR' },
  { id: 'generator', x: 178, y: 34, w: 150, h: 64, label: 'Schema Generator', sub: 'agent · LLM', accent: 'blue' },
  { id: 'draft', x: 178, y: 134, w: 150, h: 52, label: 'Schema draft', sub: 'candidate YAML' },
  { id: 'validator', x: 178, y: 222, w: 150, h: 64, label: 'Validation agent', sub: 'confidence scoring', accent: 'rose' },
  { id: 'retry', x: 380, y: 128, w: 132, h: 62, label: 'LangGraph', sub: 'retry ≤ 3 rounds', accent: 'blue' },
  { id: 'human', x: 178, y: 322, w: 150, h: 58, label: 'Human-in-the-loop', sub: 'only if ambiguous', accent: 'sand' },
  { id: 'validated', x: 380, y: 254, w: 132, h: 58, label: 'Best YAML', sub: 'threshold-gated' },
  { id: 'formatter', x: 380, y: 348, w: 132, h: 58, label: 'Formatter agent', sub: 'final schema' },
  { id: 'ui', x: 8, y: 348, w: 118, h: 58, label: 'Back to the tool', sub: 'trusted schema ✓' },
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
          aria-label="Schema extraction architecture: PDF parsing feeds a schema generator agent, a validation agent scores every field, LangGraph routes retries, a human-in-the-loop agent resolves ambiguity, and a formatter emits trusted schema back to the analytics tool"
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
/* ── 对比竞品 ────────────────────────────────────────────────── */
/* ── 原始手绘架构：默认收起，需要时展开 ────────────────────── */
function OriginalDoc() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-[12.5px] font-medium text-[#4E6E96] transition-colors hover:text-plum"
      >
        <span aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>▸</span>
        {open ? 'Hide the original design doc' : 'See the original design doc I drew'}
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? 1200 : 0, opacity: open ? 1 : 0 }}
      >
        <figure className="mt-4 rotate-[-0.5deg] overflow-hidden rounded-[1.2rem] border border-plum/10 bg-white p-3 shadow-[0_24px_54px_-30px_rgba(78,110,150,0.5)] transition-transform duration-500 hover:rotate-0 md:p-4">
          <img
            src="/bosch/interchat-architecture.jpg"
            alt="The original 16-step architecture I drew, from PDF upload through the multi-agent orchestrator to trusted YAML"
            loading="lazy"
            className="w-full rounded-lg"
          />
          <figcaption className="mt-3 px-1 font-hand text-[15px] text-plum-muted">
            all 16 steps, before it became the walkthrough above ✦
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

/* ── 评测对比条：进入视口时生长 ─────────────────────────────── */
function EvalBars() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-6">
      {[
        { label: 'Generator only', value: '56.6%', w: '56.6%', tone: 'bg-plum/25', text: 'text-plum-muted', size: 'text-3xl', delay: 0 },
      ].map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] uppercase tracking-label text-plum-muted">{r.label}</span>
            <span className={`font-serif ${r.size} font-light ${r.text}`}>{r.value}</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
            <div
              className={`h-full rounded-full ${r.tone}`}
              style={{ width: on ? r.w : '0%', transition: 'width 1s cubic-bezier(.4,0,.2,1)' }}
            />
          </div>
        </div>
      ))}

      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] uppercase tracking-label text-[#4E6E96]">+ Validator &amp; retry</span>
          <span className="font-serif text-5xl font-light text-[#4E6E96]">
            <CountUp value={97.2} suffix="%" />
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[#4E6E96]"
            style={{ width: on ? '97.2%' : '0%', transition: 'width 1.1s cubic-bezier(.4,0,.2,1) .22s' }}
          />
        </div>
      </div>

      <p className="font-hand text-[15px] text-plum-muted">
        coverage: 100% on both evals — nothing skipped ✦
      </p>
    </div>
  )
}

/* ── 成本对比：进入视口时生长 ───────────────────────────────── */
function CostCompare() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
        Cost to process a 3-page PDF
      </p>

      <div className="mt-6 space-y-6">
        {[
          { label: 'Unstructured.io · billed per page', price: '~$0.06', w: '100%', tone: 'bg-plum/22', text: 'text-plum-muted', size: 'text-2xl md:text-3xl', d: '0s' },
          { label: 'Ours · billed per YAML task', price: '$0.007–0.03', w: '38%', tone: 'bg-[#4E6E96]', text: 'text-[#4E6E96]', size: 'text-3xl md:text-4xl', d: '.22s' },
        ].map((r) => (
          <div key={r.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[12px] uppercase tracking-label text-plum-muted">{r.label}</span>
              <span className={`font-serif font-light ${r.size} ${r.text}`}>{r.price}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-cream-soft">
              <div
                className={`h-full rounded-full ${r.tone}`}
                style={{ width: on ? r.w : '0%', transition: `width 1s cubic-bezier(.4,0,.2,1) ${r.d}` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-4 border-t border-plum/10 pt-5 sm:grid-cols-2">
        <p className="text-[13px] leading-relaxed text-plum-muted">
          Priced per task, not per page — so cost scales with work done, not paper.
        </p>
        <p className="text-[13px] leading-relaxed text-plum-muted">
          Agents stay modular and independently replaceable, where the alternatives ship monolithic.
        </p>
      </div>
    </div>
  )
}

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
          <div className="mb-6">
            <PartnerLogos note="Architecture &amp; Validation" />
          </div>
        </Reveal>
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="Schema Extraction Agents" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            A multi-agent system that reads messy enterprise PDFs — and only ships schema it can prove it trusts.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Pulling schema out of real documents was manual and error-prone. I designed the system
            architecture and the validator — the layer that scores every field and decides what
            ships, what retries, and what goes to a human.
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
            Bosch Research · team of four · 2024–2025
          </p>
        </Reveal>

        {/* 成果前置：一眼可见 */}
        <Reveal className="mt-10" delay={0.32}>
          <OutcomeStrip
            items={[
              { n: 97.2, suffix: '%', label: 'average accuracy, up from 56.6% without the validator' },
              { n: 100, suffix: '%', label: 'field coverage — nothing silently skipped' },
              { n: 2, suffix: '–8×', label: 'cheaper per document than the industry benchmark' },
            ]}
          />
        </Reveal>

        {/* ── 交互式架构走查 ──────────────────────────────────── */}
        <Reveal className="mt-14" y={32}>
          <ArchWalkthrough />
        </Reveal>

        {/* ── 原稿：折叠在走查之下 ─────────────────────────────── */}
        <Reveal className="mt-5">
          <OriginalDoc />
        </Reveal>

        {/* ── 真实评分模型（来自我写的 Validator PRD） ──────────── */}
        <Reveal className="mt-12" y={28}>
          <div className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                The validator, as I specified it
              </p>
              <p className="font-hand text-[15px] text-plum-muted">from my own PRD ✦</p>
            </div>

            <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <figure className="overflow-hidden rounded-xl border border-plum/10 bg-white p-2">
                <img
                  src="/bosch/ic/decision-tree.png"
                  alt="Validator decision tree: does the column exist, is the name score below 60, is the confidence score at least 85 — routing to accepted YAML or fallback"
                  className="w-full"
                  loading="lazy"
                />
              </figure>

              <div>
                {/* 评分公式 */}
                <div className="rounded-xl bg-[#EFF5FB]/70 px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#4E6E96]">Confidence score</p>
                  <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-plum">
                    name × 50% + description × 30% + type × 20%
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-plum-muted">
                    Name carries half the weight — every downstream chart reads it.
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5 text-[13.5px] leading-relaxed text-plum-muted">
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C79A4B]" />
                    <span>Fails? The generator is told <em>which</em> field and why — three attempts, max.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7FA3CC]" />
                    <span>A selector keeps the highest-scoring version, not the latest.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D193A8]" />
                    <span>Nothing clears the bar? Human review — never a silent ship.</span>
                  </li>
                </ul>

                <p className="mt-5 border-t border-plum/10 pt-3.5 text-[12.5px] leading-relaxed text-plum-muted">
                  Semantically tolerant by design — “float” ≈ “continuous”. Every score and decision
                  logged, so the pipeline is auditable, not just confident.
                </p>
              </div>
            </div>
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
              <EvalBars />
            </div>
          </div>
        </Reveal>

        {/* ── 竞品对比：只留未讲过的差异 ───────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-3">Against the market</p>
          <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            Cheaper than Unstructured.io — and it can prove its answers
          </h2>
          <div className="mt-8">
            <CostCompare />
          </div>
        </Reveal>

        {/* ── 技术栈 + 公开记录 ────────────────────────────────── */}
        <Reveal className="mt-16">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-[1.4rem] border border-plum/10 bg-white/60 px-6 py-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                What it runs on
              </p>
              <ul className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-3">
                {[
                  { src: '/bosch/stack/openai.png', alt: 'OpenAI' },
                  { src: '/bosch/stack/langchain.svg', alt: 'LangGraph' },
                  { src: '/bosch/stack/fastapi.svg', alt: 'FastAPI' },
                  { src: '/bosch/stack/docker.svg', alt: 'Docker' },
                  { src: '/bosch/stack/python.svg', alt: 'Python' },
                ].map((t) => (
                  <li key={t.alt} className="flex items-center gap-1.5">
                    <img src={t.src} alt="" aria-hidden loading="lazy" className="h-[18px] w-[18px] object-contain" />
                    <span className="text-[11.5px] text-plum-muted">{t.alt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-plum/10 pt-3.5 text-[12.5px] leading-relaxed text-plum-muted">
                Tesseract OCR for image-heavy pages · containerised for deployment
              </p>
            </div>

            <a
              href="https://www.linkedin.com/posts/olivia-zerun-xiao_aiforproductmanagers-boschresearch-ai-activity-7345267527628849152-37t5"
              target="_blank"
              rel="noreferrer"
              className="group/li flex flex-col justify-between rounded-[1.4rem] border border-plum/10 bg-white/60 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                  Written up at the time
                </p>
                <p className="mt-2 font-serif text-[17px] font-light leading-snug text-plum">
                  My post on what the team built, and who did what
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">
                  Corner cases we chased — nested tables, image-heavy PDFs, type mismatches — and the
                  four roles behind it.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#4E6E96]">
                Read on LinkedIn
                <span aria-hidden className="transition-transform duration-300 group-hover/li:translate-x-0.5">↗</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* ── 现场 ─────────────────────────────────────────────── */}
        <Reveal className="mt-16" y={28}>
          <figure className="overflow-hidden rounded-[1.6rem] border border-plum/10 bg-white p-3 shadow-[0_26px_58px_-30px_rgba(58,36,64,0.45)] md:p-4">
            <img
              src="/bosch/ic/team.jpg"
              alt="Final presentation at Bosch Research in Sunnyvale — the team presenting, the campus, and the full group afterwards"
              loading="lazy"
              className="w-full rounded-[1.1rem]"
            />
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 px-1.5 pb-1">
              <span className="text-[12px] text-plum-faint">
                Final presentation · Bosch Research, Sunnyvale
              </span>
              <span className="font-hand text-[15px] text-[#4E6E96]">
                the day we handed it over ✦
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ── 它后来长成了什么 ──────────────────────────────────── */}
        <Reveal className="mt-20">
          <Link
            to="/work/genai-analytics"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                What the schema layer made possible ↗
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
