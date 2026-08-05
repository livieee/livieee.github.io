import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { PartnerLogos } from '@/components/PartnerLogos'
import { Glyph, type GlyphName } from '@/components/Glyph'
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
const PAGE_OPTS = [1, 3, 5, 10]
const PER_PAGE = 0.02        // 对方：每页计费
const OURS_LO = 0.007        // 我方：每份抽取任务，与页数无关
const OURS_HI = 0.03
const SCALE = 0.2            // 条形满格对应 10 页的花费

/* ── 可试的置信度门：读者自己拨分数，看它怎么判 ──────────────── */
const GATE_PRESETS = [
  { k: 'A clean extraction', n: 95, d: 90, t: 100 },
  { k: 'Vague description', n: 92, d: 60, t: 90 },
  { k: 'Misread field name', n: 45, d: 95, t: 95 },
]

/* ── 未过门之后：把三条要点画成流程 ────────────────────────── */
function RetryFlow() {
  const [on, setOn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="rounded-2xl border border-plum/10 bg-cream-soft/40 p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-plum-faint">
        When it doesn’t clear
      </p>

      {/* 三次重试 */}
      <div className="mt-4 flex items-center gap-2">
        {[1, 2, 3].map((n, i) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C79A4B]/50 bg-white text-[11.5px] font-medium text-[#9A7B3E]"
              style={{ opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(.8)', transition: `all .4s ${i * 0.15}s` }}
            >
              {n}
            </span>
            {i < 2 && (
              <span
                className="h-px flex-1 origin-left bg-[#C79A4B]/35"
                style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: `transform .35s ${0.15 + i * 0.15}s` }}
              />
            )}
          </div>
        ))}
        <span className="shrink-0 text-[11.5px] text-plum-faint">attempts, max</span>
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">
        Each retry is told <em>which</em> field failed and why — targeted, not blind.
      </p>

      {/* 选择器分叉 */}
      <div className="mt-4 border-t border-plum/10 pt-4">
        <p className="text-[12.5px] leading-relaxed text-plum-muted">
          A selector then compares every attempt by score:
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { k: 'Best version ships', c: '#8FAE8B', d: 'highest score, not the latest' },
            { k: 'Human review', c: '#D193A8', d: 'if none clears the bar' },
          ].map((o, i) => (
            <div
              key={o.k}
              className="rounded-xl border bg-white/70 px-3.5 py-2.5"
              style={{
                borderColor: `${o.c}55`,
                opacity: on ? 1 : 0,
                transform: on ? 'translateY(0)' : 'translateY(6px)',
                transition: `all .4s ${0.55 + i * 0.12}s`,
              }}
            >
              <p className="flex items-center gap-2 text-[12.5px] font-medium text-plum">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: o.c }} />
                {o.k}
              </p>
              <p className="mt-0.5 pl-3.5 text-[11.5px] text-plum-muted">{o.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-2.5 text-[12px] text-plum-faint">Never a silent ship.</p>
      </div>
    </div>
  )
}

/* 决策树与滑块联动：拖分数，树上点亮这次走过的路径 */
function ValidatorSpec() {
  const [n, setN] = useState(95)
  const [d, setD] = useState(90)
  const [t, setT] = useState(100)

  const total = n * 0.5 + d * 0.3 + t * 0.2
  const nameFails = n < 60
  const passed = !nameFails && total >= 85
  const reason = nameFails
    ? 'Name below the floor of 60 — rejected regardless of the total.'
    : total < 85
      ? 'Total below 85 — back to the generator with the failing field named.'
      : 'Clears both gates. Shipped as trusted schema.'

  const rows = [
    { key: 'name', v: n, set: setN, w: '50%', c: '#4E6E96' },
    { key: 'description', v: d, set: setD, w: '30%', c: '#B98ACB' },
    { key: 'type', v: t, set: setT, w: '20%', c: '#8FAE8B' },
  ]

  return (
    <div className="mt-6 grid items-stretch gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <figure className="flex flex-col">
        <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-plum/10 bg-white p-3">
          <div className="relative w-full">
          <img
            src="/bosch/ic/decision-tree.png"
            alt="Validator decision tree: column exists, name score below 60, confidence score at least 85 — routing to accepted YAML or fallback"
            className="w-full"
          />
          </div>
        </div>
        <figcaption className="mt-2.5 font-hand text-[14px] text-plum-muted">
          the gate, as I drew it ✦
        </figcaption>
      </figure>

      <div>
        <div className="rounded-2xl border border-plum/10 bg-white/80 p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#4E6E96]">Try the gate</p>
            <p className="font-hand text-[14px] text-plum-faint">drag a score ✦</p>
          </div>

          <div className="mt-4 space-y-3.5">
            {rows.map((r) => (
              <div key={r.key}>
                <div className="flex items-baseline justify-between text-[11.5px]">
                  <span className="text-plum">
                    {r.key}
                    <span className="ml-1.5 text-plum-faint">× {r.w}</span>
                  </span>
                  <span className="font-mono text-[12px] text-plum">{r.v}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={r.v}
                  onChange={(e) => r.set(Number(e.target.value))}
                  aria-label={`${r.key} score`}
                  className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-[#4E6E96]"
                  style={{ background: `linear-gradient(to right, ${r.c} ${r.v}%, #F0EBE4 ${r.v}%)` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-label text-plum-faint">Confidence score</span>
              <span className={`font-serif text-2xl font-light ${passed ? 'text-[#4E6E96]' : 'text-rose'}`}>
                {total.toFixed(1)}
              </span>
            </div>
            <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-cream-soft">
              <div
                className={`h-full rounded-full ${passed ? 'bg-[#4E6E96]' : 'bg-[#D193A8]'}`}
                style={{ width: `${total}%`, transition: 'width .3s, background-color .3s' }}
              />
              <span aria-hidden className="absolute inset-y-0 w-px bg-plum/45" style={{ left: '85%' }} />
            </div>
            <p className="mt-1 text-right text-[10.5px] text-plum-faint">threshold 85</p>
          </div>

          <div
            className={`mt-4 rounded-xl border px-4 py-3 transition-colors duration-300 ${
              passed ? 'border-[#8FAE8B]/45 bg-[#8FAE8B]/[0.09]' : 'border-[#D193A8]/45 bg-blush/30'
            }`}
          >
            <p className={`text-[12.5px] font-medium ${passed ? 'text-[#5E8B5A]' : 'text-rose'}`}>
              {passed ? 'Accepted YAML' : 'Fallback'}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-plum-muted">{reason}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {GATE_PRESETS.map((g) => (
              <button
                key={g.k}
                type="button"
                onClick={() => {
                  setN(g.n)
                  setD(g.d)
                  setT(g.t)
                }}
                className="rounded-full border border-plum/15 px-3 py-1 text-[11px] text-plum-muted transition-colors hover:border-[#7FA3CC] hover:text-[#4E6E96]"
              >
                {g.k}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 门之后：整行铺开，两栏因此等高 */}
      <div className="md:col-span-2">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <RetryFlow />
          <div className="flex flex-col gap-4">
            {[
              {
                g: 'approx' as GlyphName,
                c: '#B98ACB',
                k: 'Tolerant of wording',
                v: '“float” ≈ “continuous”. The gate rejects real errors, not harmless phrasing.',
              },
              {
                g: 'ledger' as GlyphName,
                c: '#7A9CC6',
                k: 'Everything logged',
                v: 'Every score, failure type and final decision — auditable, not just confident.',
              },
            ].map((c) => (
              <div key={c.k} className="flex flex-1 gap-3.5 rounded-2xl border border-plum/10 bg-white/70 p-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${c.c}1f`, color: c.c }}
                >
                  <Glyph name={c.g} className="h-5 w-5" w={1.6} />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-plum">{c.k}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-plum-muted">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CostCompare() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const [pages, setPages] = useState(3)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const theirs = pages * PER_PAGE
  const theirsW = (theirs / SCALE) * 100
  const oursW = (OURS_HI / SCALE) * 100
  const times = Math.round(theirs / OURS_LO)

  return (
    <div ref={ref} className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          Cost to process a document
        </p>
        {/* 页数切换 */}
        <div className="inline-flex rounded-full border border-plum/15 bg-cream-soft/60 p-1">
          {PAGE_OPTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPages(n)}
              className={`rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors ${
                n === pages ? 'bg-[#4E6E96] text-white' : 'text-plum-muted hover:text-plum'
              }`}
            >
              {n} {n === 1 ? 'page' : 'pages'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-7">
        {/* 对方：随页数增长 */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[12.5px] text-plum">
              Unstructured.io
              <span className="ml-2 text-[11px] uppercase tracking-label text-plum-faint">billed per page</span>
            </span>
            <span className="font-serif text-2xl font-light text-[#A8798A] md:text-[1.75rem]">
              ~${theirs.toFixed(2)}
            </span>
          </div>
          <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-cream-soft">
            <div
              className="h-full rounded-full bg-[#C9A2B0]"
              style={{ width: on ? `${theirsW}%` : '0%', transition: 'width .7s cubic-bezier(.4,0,.2,1)' }}
            />
          </div>
        </div>

        {/* 我方：与页数无关 */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[12.5px] text-plum">
              Ours
              <span className="ml-2 text-[11px] uppercase tracking-label text-plum-faint">
                billed per extraction task
              </span>
            </span>
            <span className="font-serif text-3xl font-light text-[#4E6E96] md:text-[2.1rem]">
              ${OURS_LO.toFixed(3)}–{OURS_HI.toFixed(2)}
            </span>
          </div>
          <div className="relative mt-2 h-3.5 overflow-hidden rounded-full bg-cream-soft">
            <div
              className="h-full rounded-full bg-[#4E6E96]"
              style={{ width: on ? `${oursW}%` : '0%', transition: 'width .7s cubic-bezier(.4,0,.2,1)' }}
            />
          </div>
          {/* 差额标注：落在未填充的那段上，那段就是省下的部分 */}
          <div
            className="relative mt-2 h-5"
            style={{ opacity: on ? 1 : 0, transition: 'opacity .5s .6s' }}
          >
            <div
              className="absolute flex items-center gap-2"
              style={{ left: `${oursW}%`, width: `${Math.max(0, theirsW - oursW)}%`, transition: 'left .7s, width .7s' }}
            >
              <span className="h-px flex-1 bg-[#4E6E96]/30" />
              <span className="whitespace-nowrap text-[11.5px] font-medium text-[#4E6E96]">
                up to {times}× less
              </span>
              <span className="h-px flex-1 bg-[#4E6E96]/30" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-plum-muted">
        Their line grows with the paper. Ours doesn’t move — the unit is the extraction, not the
        page. <span className="text-plum-faint">Modelled from published billing units.</span>
      </p>

      <div className="mt-5 grid gap-4 border-t border-plum/10 pt-5 sm:grid-cols-2">
        {[
          {
            k: 'Traceable',
            v: 'Every run carries a full token trace, so spend is a number we can point at — not a line on an invoice.',
          },
          {
            k: 'Tunable',
            v: 'Retry depth and score thresholds are dials, not fixed behaviour. Accuracy and cost can be traded on purpose.',
          },
        ].map((d) => (
          <div key={d.k}>
            <p className="text-[11px] uppercase tracking-label text-[#4E6E96]">{d.k}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-plum-muted">{d.v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 我的判断：每条都带被否掉的另一个选项 ──────────────────── */
const CALLS = [
  {
    n: '01',
    title: 'Score fields, not documents',
    instead: 'Accept or reject the whole file',
    body: 'One weak column shouldn’t sink a good document — and a good average shouldn’t hide one fatal column. Trust had to be granular to be useful.',
  },
  {
    n: '02',
    title: 'Give the name a floor, not just a weight',
    instead: 'A single weighted average',
    body: 'Name is what every downstream chart reads. So it carries half the score and a hard floor of 60 — below that the schema is rejected no matter how good the total looks.',
  },
  {
    n: '03',
    title: 'Retry with feedback, capped at three',
    instead: 'Retry until it passes',
    body: 'The generator is told which field failed and why, so attempts converge instead of wandering. The cap is a cost decision — I picked a bound over an open loop.',
  },
  {
    n: '04',
    title: 'Keep the best version, not the last',
    instead: 'Take the most recent attempt',
    body: 'Later is not always better. A selector compares every attempt by score and ships the strongest one — which is what makes retrying safe.',
  },
]

/* ── 静默失败：同一份输出，切换到真相 ──────────────────────── */
const TRUTH = { name: 'annual_revenue', description: 'Total sales in USD, per supplier', type: 'float' }
const GUESS = { name: 'Column3', description: 'Customer name', type: 'string' }

function SilentFailure() {
  const [showTruth, setShowTruth] = useState(false)
  const v = showTruth ? TRUTH : GUESS

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* YAML 卡：字段原地替换 */}
      <div
        className={`rounded-[1.4rem] border p-6 transition-colors duration-500 ${
          showTruth ? 'border-[#8FAE8B]/45 bg-[#8FAE8B]/[0.07]' : 'border-plum/10 bg-white/80'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
            extracted_schema.yaml
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-medium transition-colors duration-500 ${
              showTruth ? 'bg-[#8FAE8B]/18 text-[#5E8B5A]' : 'bg-cream-soft text-plum-faint'
            }`}
          >
            {showTruth ? 'matches the source' : 'no error raised'}
          </span>
        </div>

        <dl className="mt-4 space-y-2.5 font-mono text-[13px] leading-relaxed">
          {(['name', 'description', 'type'] as const).map((k) => {
            const wrong = !showTruth && GUESS[k] !== TRUTH[k]
            return (
              <div key={k} className="flex gap-3">
                <dt className="w-[92px] shrink-0 text-plum-faint">{k}</dt>
                <dd
                  key={String(showTruth)}
                  className={`transition-colors duration-300 ${wrong ? 'text-rose' : 'text-plum'}`}
                  style={{ animation: 'annot-in .3s ease-out' }}
                >
                  {v[k]}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>

      {/* 切换与说明 */}
      <div>
        <div className="inline-flex rounded-full border border-plum/15 bg-white/70 p-1">
          {[
            { k: false, l: 'What the model returned' },
            { k: true, l: 'What the source said' },
          ].map((o) => (
            <button
              key={String(o.k)}
              type="button"
              onClick={() => setShowTruth(o.k)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                showTruth === o.k ? 'bg-[#4E6E96] text-white' : 'text-plum-muted hover:text-plum'
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-plum-muted">
          {showTruth
            ? 'Three fields, all of them different — and nothing in the first version flagged it. That is what the validator had to catch.'
            : 'Well-formed YAML, every field filled, no exception thrown. A chart reads this and renders happily. Flip it and see what was actually in the document.'}
        </p>
      </div>
    </div>
  )
}

/* ── 统一的章节头：细线 + 标签 + 标题 + 可选导语 ──────────────── */
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
        <span className="font-serif text-[15px] leading-none text-[#7FA3CC]">{n}</span>
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

export function BoschSchemaCase() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 简洁页头 */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case">
          <Link
            to="/work"
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
            {['System Architecture', 'Multi-Agent Design', 'Confidence Scoring', 'Evaluation'].map((s) => (
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
              { n: 0, label: 'manual fixes needed — the loop corrected itself' },
            ]}
          />
        </Reveal>

        {/* ── 一 · 问题 ────────────────────────────────────────── */}
        <Chapter
          n="01"
          label="The problem"
          title="An LLM always returns something. That's the problem."
          intro="Ask a model to read a PDF and it will hand back a clean, confident schema every time — including when it is wrong. Downstream, a chart reads that field name and plots it. The failure is silent, and it looks like data."
          className="mt-20"
        />
        <Reveal className="mt-8" y={28}>
          <SilentFailure />
        </Reveal>

        {/* ── 二 · 系统怎么工作（走查 + 原稿 + 评分门） ──────────── */}
        <Chapter
          n="02"
          label="How it works"
          title="A generator that drafts — and a layer that decides what ships"
        />
        <Reveal className="mt-8" y={32}>
          <ArchWalkthrough />
        </Reveal>
        <Reveal className="mt-5">
          <OriginalDoc />
        </Reveal>
        <Reveal className="mt-5">
          <div className="flex flex-col gap-4 rounded-[1.4rem] border border-plum/10 bg-white/60 px-6 py-5 lg:flex-row lg:items-center lg:gap-8">
            <div className="shrink-0 lg:w-40">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                What it runs on
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-plum-muted">
                OCR for image-heavy pages · containerised
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:border-l lg:border-plum/10 lg:pl-8">
              {[
                { src: '/bosch/stack/openai.png', alt: 'OpenAI' },
                { src: '/bosch/stack/langchain.svg', alt: 'LangGraph' },
                { src: '/bosch/stack/fastapi.svg', alt: 'FastAPI' },
                { src: '/bosch/stack/python.svg', alt: 'Python' },
                { src: '/bosch/stack/tesseract.png', alt: 'Tesseract OCR' },
                { src: '/bosch/stack/docker.svg', alt: 'Docker' },
              ].map((t) => (
                <li key={t.alt} className="flex items-center gap-1.5">
                  <img src={t.src} alt="" aria-hidden loading="lazy" className="h-[18px] w-[18px] object-contain" />
                  <span className="text-[11.5px] text-plum-muted">{t.alt}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-6" y={28}>
          <div className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                The validator, as I specified it
              </p>
              <p className="font-hand text-[15px] text-plum-muted">from my own PRD ✦</p>
            </div>

            <ValidatorSpec />
          </div>
        </Reveal>

        {/* ── 三 · 我的判断 ────────────────────────────────────── */}
        <Chapter n="03" label="The calls I made" title="Four choices, and what I chose against" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CALLS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.06}>
              <div className="group/c h-full rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)]">
                <span className="font-serif text-lg text-[#7FA3CC]">{c.n}</span>
                <h3 className="mt-2 font-serif text-xl font-light leading-snug text-plum">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-plum-muted">{c.body}</p>
                <p className="mt-4 flex items-baseline gap-2 border-t border-plum/10 pt-3 text-[12.5px] text-plum-faint">
                  <span className="shrink-0 uppercase tracking-[0.14em]">instead of</span>
                  <span className="italic text-plum-muted line-through decoration-plum/25">{c.instead}</span>
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal className="md:col-span-2" delay={0.24}>
            <div className="flex flex-col gap-3 rounded-[1.6rem] border border-plum/10 bg-white/50 p-7 md:flex-row md:items-center md:gap-8">
              <p className="shrink-0 font-hand text-[16px] text-plum-muted md:w-44">
                and what it cost ✦
              </p>
              <p className="text-[14px] leading-relaxed text-plum-muted">
                A validator that scores every field and can retry three times is slower and burns
                more tokens than generating once. That was the trade: latency and spend in exchange
                for output you can put a number on. For a schema every downstream chart depends on,
                I’d make it again.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── 四 · 证据（评测 + 自查 + 成本对比） ────────────────── */}
        <Chapter
          n="04"
          label="The proof"
          title="Generator alone guessed. The trust layer knew."
          intro="Two evaluations across four public datasets — Iris, Mushroom, NPHA, Wine Quality. The validator, semantic tolerance and retry loop took average accuracy from 56.6% to 97.2%, at full coverage, with no human fixes."
        />
        <Reveal className="mt-8" y={28}>
          <div className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/60 p-8 md:p-12">
            <EvalBars />
          </div>
        </Reveal>

        <Reveal className="mt-6" y={24}>
          <div className="flex flex-col gap-3 rounded-[1.6rem] border border-[#C79A4B]/35 bg-champagne/25 p-7 md:flex-row md:gap-8">
            <p className="shrink-0 font-hand text-[16px] text-[#9A7B3E] md:w-44">
              what the first eval got wrong ✦
            </p>
            <p className="text-[14px] leading-relaxed text-plum-muted">
              Part of that 56.6% wasn’t the system failing — it was our rubric. We were scoring
              <span className="mx-1 font-mono text-[13px] text-plum">float</span>against
              <span className="mx-1 font-mono text-[13px] text-plum">continuous</span>as a defect.
              So I fixed the evaluation, not just the model: semantic tolerance, with the rules
              verified by hand. We also swapped word-count estimates for tiktoken, so the cost
              numbers measured what we were actually spending.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="max-w-2xl font-serif text-xl font-light leading-snug text-plum md:text-2xl">
            Cheaper to run — and able to show its work
          </h3>
          <div className="mt-6">
            <CostCompare />
          </div>
        </Reveal>

        {/* ── 五 · 交付时留下的路线 ────────────────────────────── */}
        <Chapter
          n="05"
          label="What comes next"
          title="A working system, and an argued case for what follows"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              k: 'Put a person in the loop earlier',
              v: 'Inline schema editing before the YAML is written, and remembering those edits for similar datasets.',
              c: '#8FAE8B',
              g: 'pen-edit' as GlyphName,
            },
            {
              k: 'Ask better questions',
              v: 'Context-aware fallback prompts — surface only the field genuinely in doubt, not a checklist.',
              c: '#B98ACB',
              g: 'question' as GlyphName,
            },
            {
              k: 'Take the latency back',
              v: 'Run independent agents in parallel; let teams load their own enterprise validation rules.',
              c: '#7A9CC6',
              g: 'parallel' as GlyphName,
            },
          ].map((r, i) => (
            <Reveal key={r.k} delay={i * 0.07}>
              <div className="group/rd h-full rounded-[1.4rem] border border-plum/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
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

        {/* ── 存档：现场照 + 公开记录 ───────────────────────────── */}
        <Reveal className="mt-20">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-plum/20" />
            <p className="label-text">For the record</p>
          </div>
          <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <figure className="flex flex-col overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white p-3">
              <img
                src="/bosch/ic/team.jpg"
                alt="Final presentation at Bosch Research in Sunnyvale — the team presenting, the campus, and the full group afterwards"
                loading="lazy"
                className="w-full rounded-[1rem]"
              />
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-1.5 pb-0.5">
                <span className="text-[12px] text-plum-faint">
                  Final presentation · Bosch Research, Sunnyvale
                </span>
                <span className="font-hand text-[15px] text-[#4E6E96]">the day we handed it over ✦</span>
              </figcaption>
            </figure>

            <a
              href="https://www.linkedin.com/posts/olivia-zerun-xiao_aiforproductmanagers-boschresearch-ai-activity-7345267527628849152-37t5"
              target="_blank"
              rel="noreferrer"
              className="group/li flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:shadow-[0_18px_40px_-20px_rgba(10,102,194,0.3)]"
            >
              <div className="flex items-center gap-3 px-5 pt-5">
                <img
                  src="/theta/olivia-cmu-avatar.jpg"
                  alt=""
                  aria-hidden
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium leading-tight text-plum">Olivia Xiao</p>
                  <p className="truncate text-[11.5px] leading-tight text-plum-faint">
                    Wrote this up when we shipped it
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="#0A66C2" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
                </svg>
              </div>

              <p className="mt-3.5 px-5 text-[13px] leading-relaxed text-plum-muted">
                The corner cases we chased — nested tables, image-heavy PDFs, type mismatches — and
                the four roles behind it.
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-plum/10 px-5 py-3.5">
                <span className="flex items-center gap-1.5 text-[11.5px] text-plum-faint">
                  <span aria-hidden className="flex -space-x-1">
                    {['#0A66C2', '#D193A8', '#8FAE8B'].map((c) => (
                      <span key={c} className="h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                  36 reactions · 1 comment
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0A66C2]">
                  Read post
                  <span aria-hidden className="transition-transform duration-300 group-hover/li:translate-x-0.5">↗</span>
                </span>
              </div>
            </a>
          </div>
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
