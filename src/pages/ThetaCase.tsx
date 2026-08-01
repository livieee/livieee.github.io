import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CompareSlider } from '@/components/CompareSlider'
import { CountUp } from '@/components/CountUp'
import { Reveal } from '@/components/Reveal'

/** ── 页面数据 ─────────────────────────────────────────────────────────── */

const METRICS = [
  { value: 83, suffix: '%', label: 'less time on clinical documentation' },
  { value: 60, suffix: '%', label: 'lift in patient intake engagement' },
  { value: 40, suffix: '+', label: 'physicians at clinical roundtables' },
  { value: 30, suffix: '+', label: 'developers engaged for MCP adoption' },
]

const PROBLEM_STATS = [
  { big: '4–6h', small: 'of a PCP’s day — about 40% — goes to documentation' },
  { big: '63%', small: 'of physicians reported burnout in 2023' },
  { big: '16h+', small: 'per week on pre-charting, charting & admin' },
]

type Phase = {
  key: string
  tab: string
  title: string
  before: string
  after: string
  points: string[]
  note: string
}

const PHASES: Phase[] = [
  {
    key: 'pre',
    tab: 'Pre-Visit',
    title: 'Know the patient before they walk in',
    before: '/theta/compare-12-without.jpg',
    after: '/theta/compare-12-with.jpg',
    points: [
      'Context-rich patient overview assembled from EHR, wearables, intake and chat history',
      'Risk stratification alerts surface what needs attention first',
      'Trend analysis turns scattered readings into a story',
    ],
    note: 'pre-charting: 15 min → 2 min',
  },
  {
    key: 'in',
    tab: 'In-Visit',
    title: 'Stay with the patient, not the screen',
    before: '/theta/compare-13-without.jpg',
    after: '/theta/compare-13-with.jpg',
    points: [
      'Ambient AI Scribe transcribes the conversation in real time, any language',
      'Data dashboard surfaces vitals, lifestyle patterns and history on demand',
      'Personal notes blend into the record without breaking eye contact',
    ],
    note: 'the doctor looks at the patient, not the tabs',
  },
  {
    key: 'post',
    tab: 'Post-Visit',
    title: 'Notes ready to sign in minutes',
    before: '/theta/compare-14-without.jpg',
    after: '/theta/compare-14-with.jpg',
    points: [
      'AI-drafted SOAP notes with Magic Edit — instruct, refine, approve side-by-side',
      'Multi-modal context: attach labs and imaging to complete the picture',
      'One-click referral letters and patient instructions from the visit note',
    ],
    note: 'documentation: 30 min → 3 min',
  },
]

const FLOW = [
  { stage: 'Research', color: '#D193A8', chips: ['20+ user interviews', '10+ teardowns'] },
  { stage: 'Define', color: '#B98ACB', chips: ['roadmap', '46-page PRD'] },
  { stage: 'Design', color: '#8FAE8B', chips: ['Figma prototypes', 'prompt templates'] },
  { stage: 'Build', color: '#C79A4B', chips: ['STT + LLMs', 'HIPAA infra'] },
  { stage: 'Launch', color: '#D193A8', chips: ['GTM · roundtables', 'first clinic pilot'] },
]

const OWNED = [
  {
    num: '01',
    heading: 'Co-led the 0→1 MVP',
    color: '#D193A8',
    body: 'Roadmap, PRDs, Figma prototypes — coordinating design & engineering from zero to a working Scribe.',
    stat: '83% less documentation time',
  },
  {
    num: '02',
    heading: 'Designed the AI features',
    color: '#B98ACB',
    body: 'Note Customization · AI Edit · Doc Generation — co-designed prompt templates with engineers.',
    stat: '20+ interviews · 10+ teardowns',
  },
  {
    num: '03',
    heading: 'Built the intake engine',
    color: '#8FAE8B',
    body: 'HIPAA-compliant email workflow for intake, consent & data authorization — automated end to end.',
    stat: '+60% engagement',
  },
  {
    num: '04',
    heading: 'Drove GTM & adoption',
    color: '#C79A4B',
    body: 'Media, hackathons & influencer partnerships; MCP developer community; clinical roundtables.',
    stat: '40+ physicians · 30+ developers',
  },
]

const CMU_PRESS = {
  label: 'CMU Integrated Innovation Institute',
  title: 'Summer Internship Recap 2025',
  quote:
    '“I didn’t just observe from the sidelines — I helped drive clarity in the workflows, organized and synthesized feedback from power-user interviews, and helped build the platform for how we interact with both patients and physicians.”',
  href: 'https://www.cmu.edu/iii/about/news/2025/summer-internships-2025.html',
}

const DEMO_FRAMES = [
  { src: '/theta/demo-frame-1.jpg', cap: 'The world’s first HIPAA-compliant health-data MCP' },
  { src: '/theta/demo-frame-2.jpg', cap: 'Same question, two answers — without vs. with MCP' },
  { src: '/theta/demo-frame-3.jpg', cap: 'Not just data — a what-to-do-next plan' },
  { src: '/theta/demo-frame-4.jpg', cap: 'Success criteria the user can track' },
]

type SubProject = {
  key: string
  title: string
  tagline: string
  accent: string
  img?: string
  link?: { label: string; href: string }
  bullets: string[]
}

const SUB_PROJECTS: SubProject[] = [
  {
    key: 'intake',
    title: 'Patient Intake & Consent',
    tagline: 'the quiet workflow that feeds everything',
    accent: '#D193A8',
    bullets: [
      'Designed a HIPAA-compliant intake, consent and data-authorization experience',
      'Trigger-based email workflow automates collection before every visit',
      'Structured questionnaires via forms, chat, or call — balancing compliance, clinical needs and ease of use',
      '60% engagement lift measured by email open and click-through rates',
    ],
  },
  {
    key: 'mcp',
    title: 'Healthcare MCP · Developer Adoption',
    tagline: 'open-source infrastructure needs users too',
    accent: '#B98ACB',
    link: { label: 'mirobody.ai ↗', href: 'https://mirobody.ai/' },
    bullets: [
      'World’s first HIPAA-compliant health-data MCP — #1 on the GAIA leaderboard',
      'Gathered feedback from 20+ developers through events and community outreach',
      'Diagnosed integration and adoption barriers; findings reshaped roadmap priorities',
      'Crafted developer messaging and an open-source adoption strategy — 30+ developers engaged',
    ],
  },
  {
    key: 'wellness',
    title: 'Theta Wellness',
    tagline: 'the patient side of the loop',
    accent: '#8FAE8B',
    img: '/theta/slide-9.jpg',
    bullets: [
      'Multimodal health input: wearables, food snaps, mood tags, medical reports',
      'Health information explained in plain language — designed for older adults',
      'Daily guidance and caregiver sharing keep families in the loop between visits',
      'Shaped positioning, market sizing, business model and the investor pitch',
    ],
  },
]

/** ── 证据信息图（从工作产物中提炼，非截图） ───────────────────────────── */

function InsightCard({ title, source, children }: { title: string; source: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-6">
      <p className="font-serif text-[1.05rem] font-medium leading-snug text-plum">{title}</p>
      <p className="mt-1 font-hand text-[14px] text-orchid">{source}</p>
      <div className="mt-4 flex flex-1 items-center justify-center">{children}</div>
    </div>
  )
}

/** PRD 核心：Mirobody 数据飞轮（五节点循环） */
function FlywheelGraphic() {
  const nodes = [
    { x: 130, y: 34, tx: 130, ty: 22, anchor: 'middle', label: 'Log daily', c: '#D193A8' },
    { x: 208, y: 92, tx: 216, ty: 88, anchor: 'start', label: 'See value', c: '#B98ACB' },
    { x: 178, y: 182, tx: 182, ty: 202, anchor: 'middle', label: 'Ask AI', c: '#8FAE8B' },
    { x: 82, y: 182, tx: 78, ty: 202, anchor: 'middle', label: 'See doctor', c: '#C79A4B' },
    { x: 52, y: 92, tx: 44, ty: 88, anchor: 'end', label: 'Richer data', c: '#B98ACB' },
  ] as const
  return (
    <svg viewBox="0 0 260 216" className="w-full max-w-[290px]" fill="none" aria-label="Mirobody data flywheel: log daily, see value, ask AI, see doctor, richer data — and around again">
      <circle cx="130" cy="112" r="80" stroke="#B98ACB" strokeOpacity="0.4" strokeWidth="1.4" strokeDasharray="2 6" />
      {/* 顺时针箭头 */}
      <path d="M204 78 l8 12 M204 78 l14 3" stroke="#B98ACB" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="7" fill="#FBF7F2" stroke={n.c} strokeWidth="1.4" strokeDasharray="2 3" />
          <circle cx={n.x} cy={n.y} r="2.6" fill={n.c} />
          <text x={n.tx} y={n.ty} textAnchor={n.anchor} fontSize="12" fill="#6B4E63" fontFamily="inherit">
            {n.label}
          </text>
        </g>
      ))}
      <text x="130" y="106" textAnchor="middle" fontSize="14" fill="#3A2440" className="font-hand" fontWeight="600">
        the Mirobody
      </text>
      <text x="130" y="124" textAnchor="middle" fontSize="14" fill="#3A2440" className="font-hand" fontWeight="600">
        flywheel ↻
      </text>
    </svg>
  )
}

/** 竞品扫描核心：定位象限 + 我们找到的空白 */
function QuadrantGraphic() {
  const dots = [
    { x: 70, y: 158, label: 'scheduling' },
    { x: 92, y: 168 },
    { x: 118, y: 142, label: 'voice agents' },
    { x: 136, y: 152 },
    { x: 158, y: 112, label: 'doc review' },
    { x: 174, y: 124 },
    { x: 96, y: 108, label: 'wellness' },
  ]
  return (
    <svg viewBox="0 0 260 216" className="w-full max-w-[290px]" fill="none" aria-label="Competitive positioning: most products cluster as point solutions; Theta targets whole-patient context in clinical care">
      {/* 坐标轴 */}
      <path d="M40 188 H 236 M40 188 V 28" stroke="#3A2440" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      <text x="236" y="204" textAnchor="end" fontSize="10.5" fill="#8A6E84">admin → clinical care</text>
      <text x="28" y="30" textAnchor="start" fontSize="10.5" fill="#8A6E84" transform="rotate(-90 28 30)" />
      <text x="34" y="24" textAnchor="start" fontSize="10.5" fill="#8A6E84">whole-patient ↑</text>
      {/* 竞品散点 */}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="5" fill="#3A2440" fillOpacity="0.18" />
          {d.label && (
            <text x={d.x + 9} y={d.y + 4} fontSize="10" fill="#8A6E84">
              {d.label}
            </text>
          )}
        </g>
      ))}
      {/* Theta 的空白点 */}
      <path d="M150 92 Q 178 62 198 60" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" />
      <path d="M208 62 l6.5 4 -7.5 2 2 7 -5.5 -5 -5.5 5 2 -7 -7.5 -2 6.5 -4 v-7 Z" fill="#B98ACB" transform="translate(0,-6)" />
      <text x="208" y="88" textAnchor="middle" fontSize="12" fill="#3A2440" fontWeight="600">Theta</text>
      <text x="208" y="102" textAnchor="middle" fontSize="11" fill="#B98ACB" className="font-hand">the gap ✦</text>
      <text x="52" y="180" fontSize="10.5" fill="#8A6E84">14 products scanned</text>
    </svg>
  )
}

/** Pilot 研究核心：湾区诊所筛选漏斗 */
function PilotFunnelGraphic() {
  const dots = [
    [22, 36], [40, 26], [58, 40], [30, 58], [52, 62], [70, 28], [76, 52], [24, 80], [46, 84], [66, 76], [84, 68], [38, 100],
  ] as const
  const filters = ['independent practice', 'no big EHR', 'phone-first, low-tech', 'charting-heavy days']
  return (
    <svg viewBox="0 0 260 216" className="w-full max-w-[290px]" fill="none" aria-label="Pilot targeting funnel: Bay Area clinics filtered down to the first pilot">
      <text x="52" y="14" textAnchor="middle" fontSize="10.5" fill="#8A6E84">Bay Area clinics</text>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y + 18} r="4.5" fill="#3A2440" fillOpacity="0.16" />
      ))}
      {/* 筛选闸门 */}
      <rect x="104" y="34" width="112" height="112" rx="12" fill="white" stroke="#B98ACB" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="160" y="52" textAnchor="middle" fontSize="10.5" fill="#8A6E84">the filters</text>
      {filters.map((f, i) => (
        <text key={f} x="160" y={72 + i * 20} textAnchor="middle" fontSize="10.5" fill="#3A2440">
          {f}
        </text>
      ))}
      <path d="M88 90 H 102" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 4" strokeLinecap="round" />
      <path d="M218 90 Q 232 90 236 110" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 4" strokeLinecap="round" />
      {/* 结果 */}
      <circle cx="228" cy="140" r="16" fill="#B98ACB" fillOpacity="0.16" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 4" />
      <circle cx="228" cy="140" r="4" fill="#B98ACB" />
      <text x="228" y="176" textAnchor="middle" fontSize="11" fill="#3A2440" fontWeight="600">the first pilot</text>
      <text x="228" y="190" textAnchor="middle" fontSize="11" fill="#B98ACB" className="font-hand">✦</text>
      <text x="52" y="152" textAnchor="middle" fontSize="10" fill="#8A6E84">shortlisted &amp; visited</text>
    </svg>
  )
}

/** Growth playbook 核心：五渠道汇成一个 pilot */
function ChannelsGraphic() {
  const channels = [
    { y: 38, label: 'media', c: '#D193A8' },
    { y: 72, label: 'hackathons', c: '#B98ACB' },
    { y: 106, label: 'influencers', c: '#8FAE8B' },
    { y: 140, label: 'roundtables · 40+ MDs', c: '#C79A4B' },
    { y: 174, label: 'medical associations', c: '#D193A8' },
  ]
  return (
    <svg viewBox="0 0 260 216" className="w-full max-w-[290px]" fill="none" aria-label="Five growth channels converging into the first clinic pilot">
      {channels.map((ch) => (
        <g key={ch.label}>
          <rect x="10" y={ch.y - 13} width="118" height="26" rx="13" fill="white" stroke={ch.c} strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx="24" cy={ch.y} r="3" fill={ch.c} />
          <text x="34" y={ch.y + 4} fontSize="10.5" fill="#3A2440">
            {ch.label}
          </text>
          <path d={`M130 ${ch.y} Q 168 ${ch.y} 192 ${106 + (ch.y - 106) * 0.12}`} stroke={ch.c} strokeOpacity="0.45" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="212" cy="106" r="26" fill="#B98ACB" fillOpacity="0.14" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 4" />
      <text x="212" y="102" textAnchor="middle" fontSize="11.5" fill="#3A2440" fontWeight="600">1st clinic</text>
      <text x="212" y="116" textAnchor="middle" fontSize="11.5" fill="#3A2440" fontWeight="600">pilot</text>
    </svg>
  )
}

/** MCP demo：关键帧轮播动画（自动交叉淡入，可点圆点切换） */
function DemoFrameLoop() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % DEMO_FRAMES.length), 3400)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0B0E14]">
        {DEMO_FRAMES.map((f, i) => (
          <img
            key={f.src}
            src={f.src}
            alt={f.cap}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 px-1">
        <p className="min-h-[20px] font-hand text-[15px] leading-snug text-plum-muted">{DEMO_FRAMES[idx].cap}</p>
        <div className="flex shrink-0 gap-1.5">
          {DEMO_FRAMES.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Show frame ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === idx ? 'w-5 bg-orchid' : 'bg-plum/20 hover:bg-plum/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** ── 页面 ────────────────────────────────────────────────────────────── */

export default function ThetaCase() {
  const [phase, setPhase] = useState(0)
  const [openSub, setOpenSub] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Theta Health — Case Study · Olivia Xiao'
    return () => {
      document.title = 'Olivia Xiao — AI Product, GTM & Partnerships'
    }
  }, [])

  const active = PHASES[phase]

  return (
    <main className="min-h-screen bg-cream text-plum">
      {/* ── 顶栏 ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case study">
          <Link to="/" className="group/logo flex items-baseline gap-2 font-serif text-lg font-medium tracking-tight text-plum">
            <span aria-hidden className="text-sm text-orchid/70 transition-transform duration-300 group-hover/logo:-translate-x-0.5">←</span>
            <span>Olivia Xiao</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/#impact" className="text-[13px] font-medium text-plum-muted transition-colors hover:text-plum">
              All work
            </Link>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-blush/50 via-cream to-cream" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
          <Reveal>
            <p className="label-text flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
              Case Study · Theta Health · 2025
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.12] text-plum">
              Making healthcare AI fit the way people{' '}
              <span className="italic">
                <span className="bg-[linear-gradient(100deg,#D193A8_0%,#B98ACB_50%,#9DB8E8_100%)] bg-clip-text text-transparent">
                  actually live and work
                </span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-plum-muted">
              At Theta Health I co-led the 0→1 development of an AI Scribe MVP — integrating
              speech-to-text and LLMs — and shaped the intake workflow, developer ecosystem, and
              patient app around it. One product philosophy held everything together: AI should
              adapt to clinical reality, not the other way around.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                Product Intern · AI Health Product
              </span>
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                Roadmap · PRDs · Figma prototypes
              </span>
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                STT + LLM prompt design
              </span>
              <a
                href="https://thetahealth.ai/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
              >
                thetahealth.ai ↗
              </a>
              <a
                href="https://mirobody.ai/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
              >
                mirobody.ai ↗
              </a>
            </div>
          </Reveal>

          {/* 指标条 */}
          <Reveal delay={0.3}>
            <div className="mt-14 grid grid-cols-2 gap-6 rounded-[2rem] border border-plum/10 bg-white/70 p-8 backdrop-blur-sm md:grid-cols-4 md:p-10">
              {METRICS.map((m, i) => (
                <div key={m.label}>
                  <p className="font-serif text-[2.2rem] font-light leading-none text-plum md:text-[2.6rem]">
                    <CountUp value={m.value} suffix={m.suffix} delay={i * 0.12} />
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-plum-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">The problem</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Doctors became data clerks. Patients became strangers between visits.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROBLEM_STATS.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.08}>
              <div className="rounded-[1.6rem] bg-gradient-to-br from-cream-soft to-blush/40 p-7">
                <p className="font-serif text-[2rem] font-light text-plum">{s.big}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-plum-muted">{s.small}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Existing AI scribes transcribe the visit but miss the person — patient recall is
            unreliable, EHR data stops at the last visit, and nothing connects what happens in
            between. That gap became our product thesis.
          </p>
        </Reveal>
      </section>

      {/* ── 产品：三阶段 Tabs + 拖动对比（合并区块） ── */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">The product</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              One assistant across the whole visit
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-hand text-[17px] text-plum-muted">
              pick a phase, then <span className="text-orchid">drag the handle — without vs. with Theta ⇄</span>
            </p>
          </Reveal>

          {/* Tab 切换 */}
          <div className="mt-8 flex flex-wrap gap-2">
            {PHASES.map((p, i) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPhase(i)}
                aria-pressed={phase === i}
                className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                  phase === i
                    ? 'bg-plum text-cream shadow-[0_10px_24px_-10px_rgba(58,36,64,0.5)]'
                    : 'border border-plum/15 bg-white/70 text-plum-muted hover:border-orchid/50 hover:text-plum'
                }`}
              >
                {p.tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[5fr_6fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-serif text-[1.5rem] font-light leading-snug text-plum md:text-[1.7rem]">{active.title}</h3>
                <ul className="mt-5 space-y-3">
                  {active.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[14.5px] leading-relaxed text-plum-muted">
                      <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-orchid" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-hand text-[17px] text-orchid">✦ {active.note}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mx-auto w-full max-w-[440px]">
              <CompareSlider
                key={active.key}
                before={active.before}
                after={active.after}
                alt={`${active.tab} — without vs. with Theta`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 我负责的部分 ── */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">My role</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              What I owned, end to end
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-hand text-[17px] text-plum-muted">
              from the PRD to the pilot — <span className="text-orchid">the parts with my fingerprints on them ✦</span>
            </p>
          </Reveal>

          {/* 工作流程图：五阶段管线 */}
          <Reveal delay={0.16}>
            <div className="relative mt-12">
              <div aria-hidden className="absolute left-[7%] right-[7%] top-[9px] hidden border-t border-dashed border-plum/25 md:block" />
              <div className="grid gap-8 md:grid-cols-5 md:gap-4">
                {FLOW.map((f, i) => (
                  <div key={f.stage} className="relative flex items-start gap-3 md:flex-col md:items-center md:text-center">
                    <span
                      className="relative z-10 mt-1 flex h-[19px] w-[19px] shrink-0 items-center justify-center md:mt-0"
                      aria-hidden
                    >
                      <span className="absolute inset-0 rounded-full border border-dashed bg-cream" style={{ borderColor: f.color }} />
                      <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: f.color }} />
                    </span>
                    <div className="md:mt-3">
                      <p className="font-hand text-[19px] font-semibold leading-none" style={{ color: f.color }}>
                        {f.stage}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5 md:justify-center">
                        {f.chips.map((c) => (
                          <span key={c} className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11.5px] text-plum-muted shadow-sm">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    {i < FLOW.length - 1 && (
                      <span aria-hidden className="absolute -bottom-6 left-[9px] text-[13px] text-plum-faint md:hidden">
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {OWNED.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-hand text-[20px] font-semibold" style={{ color: s.color }}>
                      {s.num}
                    </p>
                    <p className="rounded-full px-3 py-1 font-hand text-[14px]" style={{ color: s.color, backgroundColor: `${s.color}18` }}>
                      {s.stat}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-[1.3rem] font-medium text-plum">{s.heading}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-plum-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 证据墙 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">Proof of work</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Evidence over adjectives
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 font-hand text-[17px] text-plum-muted">
            distilled from the real documents — <span className="text-orchid">the thinking, not the paperwork ✦</span>
          </p>
        </Reveal>

        {/* 提炼信息图 */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Reveal>
            <InsightCard title="The product loop I spec’d" source="from the 46-page Theta Wellness PRD">
              <FlywheelGraphic />
            </InsightCard>
          </Reveal>
          <Reveal delay={0.06}>
            <InsightCard title="The gap the research found" source="from a 14-product competitive scan">
              <QuadrantGraphic />
            </InsightCard>
          </Reveal>
          <Reveal delay={0.12}>
            <InsightCard title="How we targeted the pilot" source="from Bay Area pilot-user research">
              <PilotFunnelGraphic />
            </InsightCard>
          </Reveal>
          <Reveal delay={0.18}>
            <InsightCard title="The channels that landed it" source="from the growth & GTM playbook">
              <ChannelsGraphic />
            </InsightCard>
          </Reveal>
        </div>

        {/* MCP demo 关键帧动画 + 报道引语卡 */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)] sm:p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2 px-1">
                <span className="font-hand text-[17px] font-semibold text-plum">Theta Health MCP · product demo</span>
                <span className="ml-auto rounded-full bg-[#C79A4B]/15 px-3 py-1 font-hand text-[14px] text-[#9A7433]">
                  🏆 GAIA Leaderboard #1
                </span>
              </div>
              <DemoFrameLoop />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {/* CMU 报道：报纸剪报风格 */}
            <Reveal>
              <a
                href={CMU_PRESS.href}
                target="_blank"
                rel="noreferrer"
                className="group/press block -rotate-1 bg-[#FDFBF6] p-6 shadow-[0_20px_44px_-22px_rgba(58,36,64,0.4)] transition-all duration-500 hover:rotate-0 hover:-translate-y-1"
                style={{ borderTop: '3px double rgba(58,36,64,0.5)', borderBottom: '3px double rgba(58,36,64,0.5)' }}
              >
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#A6192E]">
                  Carnegie Mellon University
                </p>
                <p className="mt-0.5 text-center text-[10px] uppercase tracking-[0.18em] text-plum-faint">
                  Integrated Innovation Institute · 2025
                </p>
                <p className="mt-4 text-center font-serif text-[1.15rem] font-semibold leading-snug text-[#1a1a1a]">
                  Internships &amp; iii: Student Summer Internship Recap
                  <span aria-hidden className="ml-2 inline-block text-[#A6192E] transition-transform duration-300 group-hover/press:translate-x-0.5 group-hover/press:-translate-y-0.5">
                    ↗
                  </span>
                </p>
                <div aria-hidden className="mx-auto mt-3 h-px w-16 bg-plum/25" />
                <p className="mt-3 font-serif text-[13.5px] italic leading-relaxed text-[#3d3d3d]">
                  {CMU_PRESS.quote}
                </p>
                <p className="mt-3 text-right font-hand text-[14px] text-plum-muted">— Olivia Xiao, MSSM ’25, on Theta Health</p>
              </a>
            </Reveal>
            {/* LinkedIn 官方 embed：真实帖子 */}
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_18px_40px_-24px_rgba(90,63,86,0.35)]">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7348943917221826562"
                  height="420"
                  title="LinkedIn — internship reflection at Theta Health"
                  className="block w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 上线中的产品 ── */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">Shipped & live</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              You can click these today
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-hand text-[17px] text-plum-muted">
              not mockups — <span className="text-orchid">production, in the wild ✦</span>
            </p>
          </Reveal>
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_1.5fr_1fr]">
            <Reveal>
              <a
                href="https://thetahealth.ai/"
                target="_blank"
                rel="noreferrer"
                className="group/live flex h-full flex-col overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_18px_40px_-24px_rgba(90,63,86,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-orchid/40"
              >
                <img src="/theta/site-theta.png" alt="Theta — Before doctors, beyond records." className="w-full transition-transform duration-500 group-hover/live:scale-[1.02]" loading="lazy" />
                <p className="mt-auto px-5 py-3.5 text-[13px] font-medium text-plum-muted">
                  thetahealth.ai <span aria-hidden className="text-orchid">↗</span> — the clinician product
                </p>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]">
                <div aria-hidden className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/60 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#DECDA6]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8FAE8B]/70" />
                </div>
                <img src="/theta/site-theta-product.png" alt="Theta Health live dashboard — standardized health indicators with mapping confidence" className="w-full" loading="lazy" />
                <p className="px-5 py-3.5 font-hand text-[15px] text-plum-muted">
                  the live dashboard — raw data mapped to ~2,000 standardized indicators ✦
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="https://mirobody.ai/"
                target="_blank"
                rel="noreferrer"
                className="group/live flex h-full flex-col overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_18px_40px_-24px_rgba(90,63,86,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-orchid/40"
              >
                <img src="/theta/site-mirobody.png" alt="Mirobody — Mirror Your Body in Data" className="w-full transition-transform duration-500 group-hover/live:scale-[1.02]" loading="lazy" />
                <p className="mt-auto px-5 py-3.5 text-[13px] font-medium text-plum-muted">
                  mirobody.ai <span aria-hidden className="text-orchid">↗</span> — the health-data registry
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 子项目 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">Beyond the Scribe</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Three more bets on the same thesis
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {SUB_PROJECTS.map((sp, i) => {
            const open = openSub === sp.key
            return (
              <Reveal key={sp.key} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-[1.6rem] border transition-colors duration-300 ${
                    open ? 'border-orchid/40 bg-white' : 'border-plum/10 bg-white/70 hover:border-orchid/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSub(open ? null : sp.key)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                  >
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif text-[1.2rem] font-medium text-plum md:text-[1.35rem]">{sp.title}</span>
                      <span className="font-hand text-[15px]" style={{ color: sp.accent }}>
                        {sp.tagline}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-[18px] text-plum-faint transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`grid gap-8 border-t border-dashed border-plum/15 px-7 py-6 ${sp.img ? 'lg:grid-cols-[3fr_2fr]' : ''}`}>
                          <ul className="space-y-3">
                            {sp.bullets.map((b) => (
                              <li key={b} className="flex gap-2.5 text-[14.5px] leading-relaxed text-plum-muted">
                                <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: sp.accent }} />
                                <span>{b}</span>
                              </li>
                            ))}
                            {sp.link && (
                              <li className="pt-1">
                                <a
                                  href={sp.link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
                                >
                                  {sp.link.label}
                                </a>
                              </li>
                            )}
                          </ul>
                          {sp.img && (
                            <img
                              src={sp.img}
                              alt={`${sp.title} product interface`}
                              loading="lazy"
                              className="w-full self-start rounded-xl border border-plum/10 shadow-[0_18px_40px_-20px_rgba(90,63,86,0.4)]"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── 收尾：团队合照 + takeaway ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4 md:px-10">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-lavender/50 to-blush/40 p-8 md:p-12 lg:grid-cols-[2fr_3fr] lg:gap-12">
            <figure className="mx-auto w-full max-w-[380px] -rotate-2 rounded-[12px] border border-plum/10 bg-white p-2.5 pb-5 shadow-[0_28px_60px_-26px_rgba(90,63,86,0.5)] transition-transform duration-500 hover:rotate-0">
              <img
                src="/theta/team-aias.jpg"
                alt="Olivia with the Theta Health team at the AIAS conference booth in San Francisco"
                loading="lazy"
                className="w-full rounded-[8px]"
              />
              <figcaption className="mt-3 text-center font-hand text-[16px] text-plum-muted">
                the Theta crew, AIAS · San Francisco ✦
              </figcaption>
            </figure>
            <div className="text-center lg:text-left">
              <p className="font-hand text-[22px] leading-snug text-plum md:text-[26px]">
                “Adoption is a human problem before it is a technical one.”
              </p>
              <p className="mt-4 text-[14px] text-plum-muted">
                — the lesson every track of this work kept teaching me
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  to="/#impact"
                  className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
                >
                  ← Back to all work
                </Link>
                <a
                  href="mailto:olivia.zxiao@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-plum/25 bg-white/60 px-6 py-3 text-sm font-medium text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid"
                >
                  Talk about this project
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
