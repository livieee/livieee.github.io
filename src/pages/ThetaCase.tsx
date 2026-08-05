import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CompareSlider } from '@/components/CompareSlider'
import { CountUp } from '@/components/CountUp'
import { Reveal } from '@/components/Reveal'
import { SignalBoard } from '@/components/SignalBoard'
import { TiltCard } from '@/components/TiltCard'
import { BackLink } from '@/components/BackLink'

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
  { stage: 'Research', color: '#D193A8', chips: ['20+ user interviews', '10+ competitor analyses'] },
  { stage: 'Define', color: '#B98ACB', chips: ['roadmap', 'PRDs'] },
  { stage: 'Design', color: '#8FAE8B', chips: ['Figma prototypes', 'prompt templates'] },
  { stage: 'Build', color: '#C79A4B', chips: ['STT + LLMs', 'HIPAA infra'] },
  { stage: 'Launch', color: '#D193A8', chips: ['GTM · roundtables', 'first clinic pilot'] },
]

const OWNED = [
  {
    num: '01',
    line: 'Theta Care',
    heading: 'Co-led the 0→1 MVP',
    color: '#D193A8',
    stat: '83% less documentation time',
    chips: [
      { icon: 'map', label: 'Roadmap' },
      { icon: 'doc', label: 'PRDs' },
      { icon: 'figma', label: 'Figma' },
      { icon: 'gear', label: 'Eng & design collab' },
    ],
  },
  {
    num: '02',
    line: 'Theta Care',
    heading: 'Designed the AI features',
    color: '#B98ACB',
    stat: '20+ interviews · 10+ competitor analyses',
    chips: [
      { icon: 'sparkle', label: 'AI Edit' },
      { icon: 'doc', label: 'Note Customization' },
      { icon: 'doc', label: 'Doc Generation' },
      { icon: 'chat', label: 'Prompt templates' },
    ],
  },
  {
    num: '03',
    line: 'Theta Care',
    heading: 'Built the intake engine',
    color: '#8FAE8B',
    stat: '+60% engagement',
    chips: [
      { icon: 'shield', label: 'HIPAA' },
      { icon: 'mail', label: 'Trigger-based email workflow' },
      { icon: 'doc', label: 'Consent & authorization' },
    ],
  },
  {
    num: '04',
    line: 'all three',
    logos: ['/theta/logo-care.png', '/logos/theta.png', '/theta/logo-mirobody.png'],
    heading: 'Drove GTM & adoption',
    color: '#C79A4B',
    stat: '40+ physicians · 30+ developers',
    chips: [
      { icon: 'megaphone', label: 'Media & influencers' },
      { icon: 'trophy', label: 'Hackathons' },
      { icon: 'plug', label: 'Healthcare MCP' },
      { icon: 'users', label: 'Clinical roundtables' },
    ],
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


/** ── 页面级动画（虚线行进 / 慢转 / 星标脉冲 / Ken Burns） ─────────────── */
const CASE_CSS = `
@keyframes theta-dash-march { to { stroke-dashoffset: -22; } }
@keyframes theta-spin { to { transform: rotate(360deg); } }
@keyframes theta-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.22); } }
@keyframes theta-kenburns { from { transform: scale(1); } to { transform: scale(1.06); } }
.theta-march { animation: theta-dash-march 1.4s linear infinite; }
.theta-spin { transform-box: fill-box; transform-origin: center; animation: theta-spin 36s linear infinite; }
.theta-pulse { transform-box: fill-box; transform-origin: center; animation: theta-pulse 2.4s ease-in-out infinite; }
.theta-kb { animation: theta-kenburns 3.4s ease-out forwards; }
@keyframes theta-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.theta-float { transform-box: fill-box; animation: theta-float 3s ease-in-out infinite; }
@keyframes theta-marquee { to { transform: translateX(-50%); } }
.theta-marquee { animation: theta-marquee 38s linear infinite; }
.theta-marquee:hover { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .theta-march, .theta-spin, .theta-pulse, .theta-kb, .theta-marquee, .theta-float { animation: none; }
}
`

/** ── 技术图标（stroke 线性 + Figma 彩标） ─────────────────────────────── */
function TechIcon({ name }: { name: string }) {
  const cls = 'h-[13px] w-[13px] shrink-0'
  if (name === 'figma')
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M12 2H8.5a3.5 3.5 0 0 0 0 7H12V2Z" fill="#F24E1E" />
        <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2Z" fill="#FF7262" />
        <path d="M12 9H8.5a3.5 3.5 0 0 0 0 7H12V9Z" fill="#A259FF" />
        <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
        <path d="M8.5 23a3.5 3.5 0 0 0 3.5-3.5V16H8.5a3.5 3.5 0 0 0 0 7Z" fill="#0ACF83" />
      </svg>
    )
  const paths: Record<string, React.ReactNode> = {
    doc: (
      <>
        <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
        <path d="M14 2.5v4h4M8.5 12h7M8.5 16h7" />
      </>
    ),
    map: (
      <>
        <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5Z" />
        <path d="M9 4v13.5M15 6.5V20" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
      </>
    ),
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" />,
    chat: (
      <>
        <path d="M4 5.5h16v10.5H9L4 20V5.5Z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2.5 20 6v6c0 5-3.5 8.2-8 9.5-4.5-1.3-8-4.5-8-9.5V6l8-3.5Z" />
        <path d="m8.5 12 2.4 2.4L15.5 9.8" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7.5 8 5.8 8-5.8" />
      </>
    ),
    megaphone: (
      <>
        <path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l9 5V4.5l-9 5H4.5A1.5 1.5 0 0 0 3 10.5Z" />
        <path d="M19.5 9.5a4 4 0 0 1 0 5" />
      </>
    ),
    plug: (
      <>
        <path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0V7Z" />
        <path d="M12 16v5" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0M15.5 5.9a3 3 0 1 1 0 5.2M17 14.6a5.5 5.5 0 0 1 3.5 5.4" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
      </>
    ),
    watch: (
      <>
        <circle cx="12" cy="12" r="6" />
        <path d="M12 9v3l2 1.5M9.5 3h5M9.5 21h5" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-2.5h6L17 8h3v11H4V8Z" />
        <circle cx="12" cy="13" r="3.2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V4M4 20h16" />
        <path d="M8 15l3.5-4 3 2.5L19 8" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9Z" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v6a4 4 0 0 1-8 0V4Z" />
        <path d="M8 5H4.5a3.5 3.5 0 0 0 3.6 3.5M16 5h3.5a3.5 3.5 0 0 1-3.6 3.5M12 14v4M8.5 20.5h7M12 18a3.5 2.5 0 0 0-3.5 2.5h7A3.5 2.5 0 0 0 12 18Z" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  )
}

function TechChip({ icon, label, color }: { icon: string; label: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white/85 px-2.5 py-1 text-[11.5px] font-medium text-plum-muted shadow-sm">
      <span style={color ? { color } : undefined} className={color ? '' : 'text-orchid'}>
        <TechIcon name={icon} />
      </span>
      {label}
    </span>
  )
}

/** 站点链接按钮：图标圆徽 + 悬停滑动箭头（替代裸网址） */
function SiteLink({ href, label, color = '#B98ACB', small = false }: { href: string; label: string; color?: string; small?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`group/sl inline-flex items-center rounded-full border bg-white shadow-[0_8px_20px_-10px_rgba(58,36,64,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(58,36,64,0.4)] ${
        small ? 'gap-1.5 px-2.5 py-1' : 'gap-2 px-3.5 py-1.5'
      }`}
      style={{ borderColor: `${color}55` }}
    >
      <span
        className={`flex items-center justify-center rounded-full ${small ? 'h-5 w-5' : 'h-6 w-6'}`}
        style={{ backgroundColor: `${color}1c`, color }}
      >
        <TechIcon name="globe" />
      </span>
      <span className={`font-medium text-plum ${small ? 'text-[11px]' : 'text-[12.5px]'}`}>{label}</span>
      <span
        aria-hidden
        className="text-[13px] transition-transform duration-300 group-hover/sl:translate-x-0.5 group-hover/sl:-translate-y-0.5"
        style={{ color }}
      >
        ↗
      </span>
    </a>
  )
}

/** 开发者 pulse-check 卡：点击在百分比与票数间切换 */
function PulseCheckCard() {
  const [mode, setMode] = useState<'pct' | 'votes'>('pct')
  const toggle = () => setMode((m) => (m === 'pct' ? 'votes' : 'pct'))
  const reactions = [
    { e: 'love', label: 'love it', n: 2, pct: 14, c: '#8FAE8B' },
    { e: 'curious', label: 'curious', n: 10, pct: 72, c: '#B98ACB' },
    { e: 'pass', label: 'pass', n: 2, pct: 14, c: '#8A6E84' },
  ]
  const concerns = [
    { label: 'data privacy & security', n: 8, pct: 57, c: '#D193A8' },
    { label: 'does it solve my problem?', n: 7, pct: 50, c: '#B98ACB' },
    { label: 'accuracy of insights', n: 6, pct: 43, c: '#C79A4B' },
    { label: 'setup & integration', n: 5, pct: 36, c: '#8FAE8B' },
  ]
  return (
    <div className="flex flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-serif text-[1.05rem] font-medium leading-snug text-plum">The developer pulse-check</p>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={mode === 'votes'}
          className="rounded-full border border-orchid/40 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-orchid transition-all hover:bg-lavender/40"
        >
          {mode === 'pct' ? '% → #' : '# → %'}
        </button>
      </div>
      <p className="mt-1 font-hand text-[14px] text-orchid">first reactions from my dev survey — tap the bars ✦</p>
      {/* 反应堆叠条（可点） */}
      <button type="button" onClick={toggle} className="mt-5 flex h-[16px] w-full cursor-pointer overflow-hidden rounded-full outline-none focus-visible:ring-2 focus-visible:ring-orchid/50" aria-label="Toggle between percentages and vote counts">
        {reactions.map((r) => (
          <span key={r.e} className="flex items-center justify-center text-[9px] font-bold text-white" style={{ width: `${r.pct}%`, backgroundColor: r.c, opacity: r.e === 'pass' ? 0.45 : 0.85 }}>
            {mode === 'votes' ? r.n : `${r.pct}%`}
          </span>
        ))}
      </button>
      <div className="mt-2.5 flex justify-between text-[11px] text-plum-muted">
        {reactions.map((r) => (
          <span key={r.e} className="flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: r.c, opacity: r.e === 'pass' ? 0.5 : 0.9 }} />
            {r.label}
            {mode === 'votes' ? ` · ${r.n}` : ''}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-plum-faint">what they worry about</p>
        <span className="rounded-full bg-[#B98ACB]/14 px-2.5 py-0.5 font-hand text-[13px] text-[#8A5F9E]">avg 6.6 / 10</span>
      </div>
      <div className="mt-2.5 space-y-2.5">
        {concerns.map((b) => (
          <button key={b.label} type="button" onClick={toggle} className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-orchid/40">
            <div className="flex items-baseline justify-between text-[11.5px]">
              <span className="text-plum">{b.label}</span>
              <span className="font-hand text-[13px] transition-all" style={{ color: b.c }}>
                {mode === 'pct' ? `${b.pct}%` : `${b.n} votes`}
              </span>
            </div>
            <div className="mt-1 h-[7px] w-full overflow-hidden rounded-full bg-plum/10">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${b.pct}%`, backgroundColor: `${b.c}99` }} />
            </div>
          </button>
        ))}
      </div>
      <p className="mt-5 font-hand text-[14px] text-plum-muted">
        these barriers went straight into the roadmap ✦
      </p>
    </div>
  )
}

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







/** MCP 开发者动线（channel 式，依 Twitter GTM 调研三支柱） */
function McpMotionGraphic() {
  const channels = [
    { y: 36, label: 'tech influencers · 1M+ reach', c: '#B98ACB' },
    { y: 68, label: 'media & newsletters', c: '#D193A8' },
    { y: 100, label: 'hackathons · offline events', c: '#C79A4B' },
    { y: 132, label: 'dev-community educators', c: '#8FAE8B' },
  ]
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="MCP developer motion: MCP and LLM newsletters with over a million readers, API and dev-community educators, and hands-on ML teachers converge into 30+ developers engaged">
      {channels.map((c) => (
        <g key={c.label}>
          <rect x="14" y={c.y - 13} width="188" height="26" rx="13" fill="white" stroke={c.c} strokeOpacity="0.55" strokeWidth="1.2" />
          <circle cx="28" cy={c.y} r="3" fill={c.c} />
          <text x="38" y={c.y + 3.5} fontSize="9.5" fill="#3A2440">{c.label}</text>
          <path d={`M204 ${c.y} Q 238 ${c.y} 252 ${84 + (c.y - 84) * 0.2}`} stroke={c.c} strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
        </g>
      ))}
      <circle cx="278" cy="84" r="26" fill="#B98ACB" fillOpacity="0.16" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 4" />
      <text x="278" y="81" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#3A2440">30+ devs</text>
      <text x="278" y="95" textAnchor="middle" fontSize="10" fill="#3A2440">engaged</text>
      <text x="160" y="176" textAnchor="middle" fontSize="12.5" fill="#B98ACB" className="font-hand" fontWeight="600">
        show devs how to plug in — trust follows ✦
      </text>
      <text x="160" y="198" textAnchor="middle" fontSize="10" fill="#8A6E84">GAIA #1 · demo · one-pager as the toolkit</text>
    </svg>
  )
}

/** 临床 B2B 动线（大字版）：湾区散点 → 筛选 → 首个 pilot；渠道横排 */
function PilotB2BGraphic() {
  const dots = [
    [26, 46], [50, 36], [72, 50], [34, 70], [58, 74], [82, 62], [32, 96], [58, 100],
  ] as const
  const filters = ['independent', 'digital-ready', 'holistic care', 'patient-loved']
  const channels = [
    { x: 12, w: 96, label: 'cold outreach', c: '#C79A4B' },
    { x: 112, w: 110, label: 'roundtables · 40+', c: '#D193A8' },
    { x: 226, w: 82, label: 'associations', c: '#B98ACB' },
  ]
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="Clinical B2B motion: Bay Area clinics filtered to independent, digital-ready, holistic-care, patient-loved practices; worked via cold outreach, roundtables with 40+ physicians, and medical associations into the first signed pilot">
      <text x="56" y="20" textAnchor="middle" fontSize="11" fill="#8A6E84">Bay Area clinics</text>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#3A2440" fillOpacity="0.17" />
      ))}
      <text x="56" y="120" textAnchor="middle" fontSize="10.5" fill="#8A6E84">visited, one by one</text>
      <rect x="112" y="28" width="112" height="98" rx="12" fill="white" stroke="#C79A4B" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="168" y="47" textAnchor="middle" fontSize="10.5" fill="#8A6E84">the filters</text>
      {filters.map((f, i) => (
        <text key={f} x="168" y={66 + i * 18} textAnchor="middle" fontSize="11" fill="#3A2440">
          {f}
        </text>
      ))}
      <path d="M96 72 H 108" stroke="#C79A4B" strokeOpacity="0.6" strokeWidth="1.4" strokeDasharray="2 4" strokeLinecap="round" className="theta-march" />
      <path d="M228 74 H 252" stroke="#D193A8" strokeOpacity="0.6" strokeWidth="1.4" strokeDasharray="2 4" strokeLinecap="round" className="theta-march" />
      <circle cx="279" cy="74" r="17" fill="#D193A8" fillOpacity="0.18" stroke="#D193A8" strokeWidth="1.4" strokeDasharray="2 4" />
      <circle cx="279" cy="74" r="4.5" fill="#D193A8" />
      <text x="279" y="108" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#3A2440">1st pilot ✦</text>
      <text x="160" y="146" textAnchor="middle" fontSize="10.5" fill="#8A6E84">worked through</text>
      {channels.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="154" width={c.w} height="26" rx="13" fill="white" stroke={c.c} strokeOpacity="0.55" strokeWidth="1.2" />
          <text x={c.x + c.w / 2} y="170" textAnchor="middle" fontSize="9.5" fill="#3A2440">{c.label}</text>
        </g>
      ))}
      <text x="160" y="208" textAnchor="middle" fontSize="13" fill="#C79A4B" className="font-hand" fontWeight="600">
        3–4 interested → 1 signed ✦
      </text>
    </svg>
  )
}


/** 目标用户（deck 版）：被文书淹没的医生 + 被数据淹没的患者，Theta 连成闭环 */
function WhoWantedItGraphic() {
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="Who we built for: primary-care physicians buried in charting, and data-rich patients buried in trackers — Theta closes the loop between them">
      {/* 左：医生（被文书环绕） */}
      <g stroke="#D193A8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="84" cy="58" r="12" />
        <path d="M60 100 c0 -15 11 -24 24 -24 s24 9 24 24" />
        <path d="M72 84 c-6 8 -6 16 2 18 M96 84 c6 8 6 16 -2 18" strokeWidth="1.4" />
        <circle cx="84" cy="106" r="3.5" strokeWidth="1.4" />
      </g>
      <g stroke="#C79A4B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="theta-float">
        <path d="M34 40 h16 v20 h-16 Z M38 46 h8 M38 52 h8" />
      </g>
      <g stroke="#B98ACB" strokeWidth="1.4" strokeLinecap="round" className="theta-float" style={{ animationDelay: '1s' }}>
        <circle cx="130" cy="46" r="8" />
        <path d="M130 41 v5 l3.5 2.5" />
      </g>
      <text x="84" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3A2440">primary-care MDs</text>
      <text x="84" y="154" textAnchor="middle" fontSize="9" fill="#C87A8A">4–6h a day buried in charts</text>
      {/* 右：数据型患者（被设备环绕） */}
      <g stroke="#8FAE8B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="238" cy="58" r="12" />
        <path d="M214 100 c0 -15 11 -24 24 -24 s24 9 24 24" />
      </g>
      <g stroke="#8FAE8B" strokeWidth="1.4" strokeLinecap="round" className="theta-float" style={{ animationDelay: '0.5s' }}>
        <circle cx="188" cy="44" r="7" />
        <path d="M188 40 v4 l3 2 M185 34 h6 M185 54 h6" strokeWidth="1.2" />
      </g>
      <g stroke="#B98ACB" strokeWidth="1.4" strokeLinecap="round" className="theta-float" style={{ animationDelay: '1.5s' }}>
        <circle cx="288" cy="44" r="6.5" />
        <circle cx="288" cy="44" r="3" strokeWidth="1.2" />
      </g>
      <g stroke="#D193A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="theta-float" style={{ animationDelay: '2.2s' }}>
        <path d="M282 96 c-4 -5 2 -11 6 -7 c4 -4 10 2 6 7 l-6 6 Z" />
      </g>
      <text x="238" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3A2440">data-rich patients</text>
      <text x="238" y="154" textAnchor="middle" fontSize="9" fill="#C87A8A">wearables & goals, unconnected</text>
      {/* Theta 闭环 */}
      <path d="M92 162 Q 126 186 152 188 M230 162 Q 196 186 168 188" stroke="#B98ACB" strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
      <circle cx="160" cy="188" r="9" fill="#B98ACB" fillOpacity="0.18" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 3" />
      <circle cx="160" cy="188" r="3" fill="#B98ACB" />
      <text x="160" y="212" textAnchor="middle" fontSize="12.5" fill="#B98ACB" className="font-hand" fontWeight="600">
        Theta closes the loop ✦
      </text>
    </svg>
  )
}

/** 竞品扫描核心：四类点状方案的痛点 + Theta 的空白（箭头避让文字） */
function QuadrantGraphic() {
  const dots = [
    { x: 88, y: 64, label: 'wellness', pain: 'never reaches the clinic' },
    { x: 176, y: 96, label: 'doc review', pain: 'after the fact' },
    { x: 128, y: 128, label: 'voice agents', pain: 'hears, no memory' },
    { x: 84, y: 160, label: 'scheduling', pain: 'admin, not care' },
  ]
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="Competitive positioning with pain points: wellness never reaches the clinic, doc review comes after the fact, voice agents hear but keep no memory, scheduling is admin not care — Theta fills the whole-patient gap">
      <path d="M56 178 H 296 M56 178 V 30" stroke="#3A2440" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      <text x="296" y="194" textAnchor="end" fontSize="10.5" fill="#8A6E84">admin → clinical care</text>
      <text x="52" y="20" textAnchor="start" fontSize="10.5" fill="#8A6E84">whole-patient ↑</text>
      {dots.map((d) => (
        <g key={d.label}>
          <circle cx={d.x} cy={d.y} r="5" fill="#3A2440" fillOpacity="0.2" />
          <text x={d.x + 10} y={d.y + 1} fontSize="10" fill="#3A2440">{d.label}</text>
          <text x={d.x + 10} y={d.y + 12} fontSize="8.5" fill="#C87A8A">{d.pain}</text>
        </g>
      ))}
      {/* 箭头走顶部空区，避开所有标签 */}
      <path d="M134 52 Q 196 26 246 42" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
      <path d="M262 34 l4.5 11.5 L278 50 l-11.5 4.5 L262 66 l-4.5 -11.5 L246 50 l11.5 -4.5 Z" fill="#B98ACB" className="theta-pulse" />
      <text x="262" y="78" textAnchor="middle" fontSize="12.5" fill="#3A2440" fontWeight="600">Theta</text>
      <text x="262" y="93" textAnchor="middle" fontSize="11" fill="#B98ACB" className="font-hand">the gap ✦</text>
      <text x="160" y="210" textAnchor="middle" fontSize="12" fill="#C87A8A" className="font-hand" fontWeight="600">
        every tool solves a slice — the whole patient falls through ✦
      </text>
    </svg>
  )
}



/** 圆桌照片胶片流：连续左右滚动，无按钮，hover 暂停 */
function RoundtableCarousel() {
  const photos = [
    { src: '/theta/rt-2414.jpg', cap: 'pitching a collaborative future' },
    { src: '/theta/rt-2433.jpg', cap: 'walking MDs through patient context' },
    { src: '/theta/rt-2445.jpg', cap: 'demoing how patients collect their data' },
    { src: '/theta/rt-2452.jpg', cap: 'asking the room what to build next' },
  ]
  const strip = [...photos, ...photos]
  return (
    <div
      className="mt-6 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
      }}
    >
      <div className="theta-marquee flex w-max">
        {strip.map((ph, i) => (
          <figure
            key={i}
            aria-hidden={i >= photos.length}
            className="mr-6 w-[300px] shrink-0 rounded-[12px] border border-plum/10 bg-white p-2 pb-3.5 shadow-[0_20px_44px_-24px_rgba(90,63,86,0.45)] md:w-[400px]"
          >
            <img
              src={ph.src}
              alt={i < photos.length ? `Clinical roundtable — ${ph.cap}` : ''}
              loading="lazy"
              draggable={false}
              className="aspect-[4/3] w-full rounded-[8px] object-cover"
            />
            <figcaption className="mt-2.5 text-center font-hand text-[14px] text-plum-muted">{ph.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
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
              i === idx ? 'theta-kb opacity-100' : 'opacity-0'
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

  useEffect(() => {
    document.title = 'Theta Health — Case Study · Olivia Xiao'
    return () => {
      document.title = 'Olivia Xiao — AI Product, GTM & Partnerships'
    }
  }, [])

  const active = PHASES[phase]

  return (
    <main className="min-h-screen bg-cream text-plum">
      <style>{CASE_CSS}</style>
      {/* ── 顶栏 ── */}
      {/* 阅读进度：CSS scroll() 驱动，无 JS、跑在合成线程上 */}
      <div
        aria-hidden
        className="read-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      >
        <i className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-orchid via-rose to-champagne" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case study">
          <BackLink />
          <div className="flex items-center gap-5">
            <Link to="/" className="font-serif text-[15px] text-plum transition-colors hover:text-orchid">
              ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
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
              At Theta Health I worked across all three product lines — the B2B clinical
              assistant, the consumer wellness app, and the open-source health-data MCP —
              co-leading the 0→1 AI Scribe MVP and owning GTM motions on every front. One
              philosophy held it together: AI should adapt to clinical reality, not the other
              way around.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                Product Strategy & Operations Intern
              </span>
              <TechChip icon="figma" label="Figma" />
              <TechChip icon="doc" label="PRDs" />
              <TechChip icon="mic" label="Speech-to-Text" color="#D193A8" />
              <TechChip icon="sparkle" label="LLM prompts" color="#B98ACB" />
              <TechChip icon="shield" label="HIPAA" color="#8FAE8B" />
            </div>
          </Reveal>

          {/* 三条产品线导航（链接前置） */}
          <Reveal delay={0.28}>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  href: '#care',
                  logo: '/theta/logo-care.png',
                  ext: { label: 'thetahealth.ai/care', url: 'https://www.thetahealth.ai/care' },
                  name: 'Theta Care',
                  aud: 'for clinics · B2B',
                  c: '#D193A8',
                  desc: 'AI scribe & pre-charting for primary care',
                },
                {
                  href: '#wellness',
                  logo: '/logos/theta.png',
                  ext: { label: 'thetahealth.ai', url: 'https://thetahealth.ai/' },
                  name: 'Theta Wellness',
                  aud: 'for patients · consumer',
                  c: '#8FAE8B',
                  desc: 'a lifelong health memory, in your pocket',
                },
                {
                  href: '#mcp',
                  logo: '/theta/logo-mirobody.png',
                  ext: { label: 'mirobody.ai', url: 'https://mirobody.ai/' },
                  name: 'Mirobody',
                  aud: 'for developers · open source',
                  c: '#B98ACB',
                  desc: 'the first HIPAA-compliant health-data MCP',
                },
              ].map((pl) => (
                <div
                  key={pl.name}
                  className="group/pl overflow-hidden rounded-2xl border border-plum/10 bg-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-orchid/40 hover:bg-white hover:shadow-[0_20px_44px_-22px_rgba(90,63,86,0.35)]"
                >
                  <span aria-hidden className="block h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${pl.c}, ${pl.c}44)` }} />
                  <a href={pl.href} className="block px-5 pb-2 pt-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-plum/10 bg-white shadow-sm">
                        <img src={pl.logo} alt="" aria-hidden className="h-6 w-6 object-contain" />
                      </span>
                      <div>
                        <p className="font-serif text-[1.1rem] font-semibold leading-tight text-plum">{pl.name}</p>
                        <p className="font-hand text-[13px] leading-tight" style={{ color: pl.c }}>{pl.aud}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[12.5px] leading-snug text-plum-muted">{pl.desc}</p>
                  </a>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 pb-4">
                    <a
                      href={pl.href}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] font-semibold text-plum transition-colors group-hover/pl:text-orchid"
                    >
                      see the work
                      <span aria-hidden className="transition-transform duration-300 group-hover/pl:translate-y-0.5">↓</span>
                    </a>
                    {pl.ext && (
                      <a
                        href={pl.ext.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/v inline-flex items-center gap-1 whitespace-nowrap text-[12px] font-semibold underline-offset-4 transition-all hover:underline"
                        style={{ color: pl.c }}
                      >
                        visit site
                        <span aria-hidden className="transition-transform duration-300 group-hover/v:translate-x-0.5 group-hover/v:-translate-y-0.5">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 指标条 */}
          <Reveal delay={0.34}>
            <div className="mt-10 grid grid-cols-2 gap-6 rounded-[2rem] border border-plum/10 bg-white/70 p-8 backdrop-blur-sm md:grid-cols-4 md:p-10">
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

      {/* ══ 产品线 1 · Theta Care (B2B) ══ */}
      <section id="care" className="scroll-mt-20 bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose" />
              Product line 01 · B2B
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              Theta Care — for clinics
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="font-hand text-[17px] text-plum-muted">the B2B line I drove end to end ✦</p>
              <SiteLink href="https://www.thetahealth.ai/care" label="thetahealth.ai/care" color="#D193A8" />
            </div>
          </Reveal>

          {/* B2B 痛点引语（最上） */}
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl font-serif text-[1.3rem] font-light italic leading-snug text-plum md:text-[1.5rem]">
              “Doctors became data clerks. Patients became strangers between visits.”
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PROBLEM_STATS.map((s, i) => (
              <Reveal key={s.big} delay={i * 0.08}>
                <div className="rounded-[1.6rem] bg-gradient-to-br from-cream-soft to-blush/40 p-7">
                  <p className="font-serif text-[2rem] font-light text-plum">{s.big}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-plum-muted">{s.small}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 研究先行：访谈画像 */}
          <Reveal delay={0.16}>
            <div className="mt-8 rounded-[1.6rem] border border-plum/10 bg-cream p-6 md:p-7">
              <p className="font-serif text-[1.05rem] font-medium leading-snug text-plum">The people behind the research</p>
              <p className="mt-1 font-hand text-[14px] text-orchid">personas from my interviews — scripts, notes & recordings on file</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  { icon: 'users', c: '#D193A8', role: 'The spine neurosurgeon', line: '30-min paper intake, repetitive HPI — wants intake-to-note, in any language' },
                  { icon: 'users', c: '#B98ACB', role: 'The veteran family physician & the psychiatrist', line: '40 years in practice — the adoption bar an AI scribe must clear' },
                  { icon: 'users', c: '#8FAE8B', role: 'The home-health sales director', line: 'would pay for notes that pass PDGM billing — and handed us our channel map' },
                  { icon: 'users', c: '#C79A4B', role: 'The ex-One Medical VP of Data', line: 'EHR integration and clean data decide whether a scribe lives or dies' },
                ].map((per) => (
                  <div key={per.role} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${per.c}1c`, color: per.c }}>
                      <TechIcon name={per.icon} />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-plum">{per.role}</p>
                      <p className="mt-0.5 text-[12px] leading-snug text-plum-muted">{per.line}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-orchid/10 px-4 py-4">
                <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-orchid">Every conversation pointed to the same three must-haves</p>
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D193A8]/20 text-[11px] font-bold text-[#B06A80]">1</span>
                    <p className="text-[13px] leading-snug text-plum">
                      <span className="font-semibold">Notes that pass insurance billing</span>
                      <span className="text-plum-muted"> — the home-health director said she'd pay for this</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B98ACB]/20 text-[11px] font-bold text-[#8A5F9E]">2</span>
                    <p className="text-[13px] leading-snug text-plum">
                      <span className="font-semibold">Intake in the patient's own language</span>
                      <span className="text-plum-muted"> — the neurosurgeon's #1 blocker</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAE8B]/20 text-[11px] font-bold text-[#5F7D5B]">3</span>
                    <p className="text-[13px] leading-snug text-plum">
                      <span className="font-semibold">Works inside the EHR they already use</span>
                      <span className="text-plum-muted"> — the data leader's make-or-break</span>
                    </p>
                  </div>
                </div>
                <p className="mt-3 font-hand text-[15px] text-orchid">these three became the bar for the MVP ✦</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal delay={0.1}>
              <InsightCard title="The gap the research found" source="from my 14-product competitive scan">
                <QuadrantGraphic />
              </InsightCard>
            </Reveal>
            <Reveal delay={0.16}>
              <InsightCard title="Who we built for" source="from the Theta Care pitch deck">
                <WhoWantedItGraphic />
              </InsightCard>
            </Reveal>
          </div>

          {/* /care 页的产品能力（瓷片化） */}
          <Reveal delay={0.1}>
            <p className="label-text mb-4 mt-12">The features</p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: 'doc', c: '#D193A8', label: 'AI intake & pre-charting', sub: 'know the patient before they walk in' },
                { icon: 'sparkle', c: '#B98ACB', label: 'in-visit AI assistant', sub: 'the right data, right on time' },
                { icon: 'mic', c: '#8FAE8B', label: 'AI medical scribe', sub: 'notes ready to sign in minutes' },
              ].map((f, i) => (
                <div key={f.label} className="rounded-2xl border border-plum/10 bg-white/80 p-5 text-center">
                  <span className="theta-float mx-auto flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${f.c}1c`, color: f.c, animationDelay: `${i * 0.6}s` }}>
                    <TechIcon name={f.icon} />
                  </span>
                  <p className="mt-3 text-[13.5px] font-semibold text-plum">{f.label}</p>
                  <p className="mt-1 text-[11.5px] text-plum-muted">{f.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[13px] text-plum-muted">
              <span className="mr-2 rounded-full border border-plum/15 bg-white/70 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-plum-faint">Pricing</span>
              free pilot, then $99/mo · <span className="font-hand text-[15px] text-orchid">10x easier documentation ✦</span>
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="label-text mb-3 mt-14">The walkthrough</p>
            <h3 className="font-serif text-[1.4rem] font-light leading-snug text-plum md:text-[1.6rem]">
              Three phases, one assistant
            </h3>
            <p className="mt-2 font-hand text-[18px] text-plum-muted">
              pick a phase, then <span className="text-orchid">drag the handle — without vs. with Theta ⇄</span>
            </p>
          </Reveal>

          {/* 三阶段 Tabs + 对比滑块 */}
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

          {/* Care 还包含 intake 引擎 */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border border-plum/10 bg-white/70 px-6 py-4">
              <span className="font-hand text-[16px] font-semibold text-plum">also inside Care —</span>
              <TechChip icon="mail" label="trigger-based intake & consent emails" color="#8FAE8B" />
              <TechChip icon="shield" label="HIPAA end to end" color="#8FAE8B" />
              <span className="rounded-full bg-[#8FAE8B]/15 px-3 py-1 font-hand text-[14px] text-[#5F7D5B]">+60% engagement ✦</span>
            </div>
          </Reveal>

          {/* GTM 与真实产品面 */}
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
            <Reveal>
              <InsightCard title="The clinical B2B motion" source="from pilot outreach & the growth playbook">
                <PilotB2BGraphic />
              </InsightCard>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-plum/10 bg-white shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]">
                <div aria-hidden className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/60 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#DECDA6]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8FAE8B]/70" />
                </div>
                <img src="/theta/ui-soap.jpg" alt="Theta Care output — an AI-drafted SOAP note ready to sign" loading="lazy" className="max-h-[380px] w-full object-cover object-top" />
                <p className="px-5 py-3 font-hand text-[14px] text-plum-muted">the output that matters — a SOAP note ready to sign ✦</p>
              </div>
            </Reveal>
          </div>

          {/* 圆桌现场胶片流 */}
          <Reveal delay={0.1}>
            <p className="mt-12 text-center font-hand text-[18px] text-plum-muted">
              field notes, literally — <span className="text-orchid">scenes from the clinical roundtables ✦</span>
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <RoundtableCarousel />
          </Reveal>
        </div>
      </section>

      {/* ══ 产品线 2 · Theta Wellness (Consumer) ══ */}
      <section id="wellness" className="scroll-mt-20 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#8FAE8B]" />
              Product line 02 · Consumer
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              Theta Wellness — for patients & families
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="font-hand text-[17px] text-plum-muted">the consumer companion ✦</p>
              <SiteLink href="https://thetahealth.ai/" label="thetahealth.ai" color="#8FAE8B" />
            </div>
          </Reveal>
          <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[5fr_6fr]">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-6">
                <p className="font-serif text-[1.05rem] font-medium leading-snug text-plum">A lifelong health memory, in your pocket</p>
                <p className="mt-1 font-hand text-[14px] text-orchid">the consumer product, shipping today ✦</p>
                {/* 三支柱 icon 块 */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: 'mic', c: '#D193A8', label: 'effortless input' },
                    { icon: 'sparkle', c: '#B98ACB', label: 'plain-language insights' },
                    { icon: 'users', c: '#8FAE8B', label: 'caregiver sharing' },
                  ].map((pl, i) => (
                    <div key={pl.label} className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                      <span className="theta-float mx-auto flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: `${pl.c}1c`, color: pl.c, animationDelay: `${i * 0.6}s` }}>
                        <TechIcon name={pl.icon} />
                      </span>
                      <p className="mt-2 text-[11px] font-medium leading-tight text-plum">{pl.label}</p>
                    </div>
                  ))}
                </div>
                {/* 输入模态 icon chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <TechChip icon="mic" label="voice notes" color="#D193A8" />
                  <TechChip icon="chat" label="symptom check-ins" color="#B98ACB" />
                  <TechChip icon="camera" label="photos & docs" color="#C79A4B" />
                  <TechChip icon="watch" label="wearables · 300+ devices" color="#8FAE8B" />
                  <TechChip icon="doc" label="EHR records" color="#B98ACB" />
                </div>
                {/* 产品事实（可视化） */}
                <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-plum-faint">The market</p>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <svg viewBox="0 0 90 26" className="mx-auto h-6 w-[84px]" aria-hidden>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <g key={i} transform={`translate(${i * 18}, 0)`} fill={i === 0 ? '#8FAE8B' : '#3A2440'} fillOpacity={i === 0 ? 1 : 0.15}>
                          <circle cx="7" cy="6" r="4.5" />
                          <path d="M0 24 c0 -7 3.5 -11 7 -11 s7 4 7 11 Z" />
                        </g>
                      ))}
                    </svg>
                    <p className="mt-1.5 font-serif text-[1.15rem] font-semibold leading-none text-plum">1 in 5</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">Americans 65+ by 2030</p>
                  </div>
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <svg viewBox="0 0 36 36" className="mx-auto h-9 w-9" aria-hidden>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#3A2440" strokeOpacity="0.12" strokeWidth="5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#D193A8" strokeWidth="5" strokeLinecap="round" strokeDasharray="81.8 88" transform="rotate(-90 18 18)" />
                    </svg>
                    <p className="mt-1 font-serif text-[1.15rem] font-semibold leading-none text-plum">93%</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">of 65+ manage chronic conditions</p>
                  </div>
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#C79A4B]/15 text-[#C79A4B]">
                      <TechIcon name="users" />
                    </span>
                    <p className="mt-1 font-serif text-[1.15rem] font-semibold leading-none text-plum">63M</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">family caregivers in the loop</p>
                  </div>
                </div>
                <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-plum-faint">By the numbers</p>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#8FAE8B]/15 text-[#8FAE8B]">
                      <TechIcon name="chart" />
                    </span>
                    <p className="mt-1.5 font-serif text-[1.15rem] font-semibold leading-none text-plum">~2,000</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">standardized health indicators</p>
                  </div>
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#D193A8]/15 text-[#D193A8]">
                      <TechIcon name="watch" />
                    </span>
                    <p className="mt-1.5 font-serif text-[1.15rem] font-semibold leading-none text-plum">300+</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">devices & apps synced</p>
                  </div>
                  <div className="rounded-xl border border-plum/10 bg-white/80 p-3 text-center">
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#B98ACB]/15 text-[#B98ACB]">
                      <TechIcon name="shield" />
                    </span>
                    <p className="mt-1.5 font-serif text-[1.15rem] font-semibold leading-none text-plum">HIPAA</p>
                    <p className="mt-1 text-[10px] leading-tight text-plum-muted">compliant since day one</p>
                  </div>
                </div>
                <p className="mt-auto pt-5 font-hand text-[15px] text-plum-muted">
                  I wrote the PRD, shaped the positioning, and built the investor pitch ✦
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid h-full grid-cols-[5fr_7fr] gap-5">
                <TiltCard className="h-full" max={4}>
                  <div className="group/wimg flex h-full items-center justify-center overflow-hidden rounded-[1.6rem] border border-plum/10 bg-white p-3 shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]">
                    <img
                      src="/theta/wellness-app-1.png"
                      alt="Theta Wellness app — Conditions screen with custom trackers synced from Apple Health"
                      loading="lazy"
                      className="max-h-[460px] w-auto rounded-xl transition-transform duration-700 group-hover/wimg:scale-[1.05]"
                    />
                  </div>
                </TiltCard>
                <TiltCard className="h-full" max={4}>
                  <div className="group/wimg2 h-full overflow-hidden rounded-[1.6rem] border border-plum/10 shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]">
                    <img
                      src="/theta/wellness-app-podcast.png"
                      alt="Theta Wellness — evidence-based personal health podcast, citing JAMA research"
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/wimg2:scale-[1.05]"
                    />
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          </div>

          {/* Web 端 dashboard 实景 */}
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]">
              <div aria-hidden className="flex items-center gap-1.5 border-b border-plum/10 bg-cream-soft/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#DECDA6]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#8FAE8B]/70" />
              </div>
              <img
                src="/theta/site-theta-product.png"
                alt="Theta Wellness web dashboard — raw health data mapped to standardized indicators with confidence scores"
                loading="lazy"
                className="w-full"
              />
              <p className="px-5 py-3.5 font-hand text-[15px] text-plum-muted">
                the web dashboard — raw data mapped to ~2,000 standardized indicators, live today ✦
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 产品线 3 · Theta MCP (Developer) ══ */}
      <section id="mcp" className="scroll-mt-20 bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
              Product line 03 · Developer
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              Mirobody — for developers
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="font-hand text-[17px] text-plum-muted">
                world's first HIPAA-compliant health-data MCP — <span className="text-orchid">my part: the GTM ✦</span>
              </p>
              <SiteLink href="https://mirobody.ai/" label="mirobody.ai" color="#B98ACB" />
            </div>
          </Reveal>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
            <Reveal>
              <div className="rounded-2xl border border-plum/10 bg-white p-4 shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)] sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 px-1">
                  <span className="font-hand text-[17px] font-semibold text-plum">Theta Health MCP · product demo</span>
                  <span className="ml-auto rounded-full bg-[#C79A4B]/15 px-3 py-1 font-hand text-[14px] text-[#9A7433]">
                    GAIA Leaderboard #1
                  </span>
                </div>
                <DemoFrameLoop />
                <p className="mt-3 px-1 text-[12px] leading-snug text-plum-faint">
                  Product built by the Theta engineering team — my part was its GTM: Twitter &amp;
                  offline influencer outreach, developer-community building, demo content, and the
                  launch one-pager. 30+ developers engaged.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-8">
                <InsightCard title="The MCP developer motion" source="from my Twitter AI & tech influencer research">
                  <McpMotionGraphic />
                </InsightCard>
                {/* 开发者初印象调研（可交互） */}
                <PulseCheckCard />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 我负责的部分（跨产品线） ── */}
      <section className="py-16 md:py-20">
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

          <Reveal delay={0.16}>
            <div className="relative mt-12">
              <div aria-hidden className="absolute left-[7%] right-[7%] top-[9px] hidden border-t border-dashed border-plum/25 md:block" />
              <div className="grid gap-8 md:grid-cols-5 md:gap-4">
                {FLOW.map((f, i) => (
                  <motion.div
                    key={f.stage}
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.12 }}
                    className="relative flex items-start gap-3 md:flex-col md:items-center md:text-center"
                  >
                    <span className="relative z-10 mt-1 flex h-[19px] w-[19px] shrink-0 items-center justify-center md:mt-0" aria-hidden>
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
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {OWNED.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-7 md:p-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="flex items-baseline gap-2.5 font-hand text-[20px] font-semibold" style={{ color: s.color }}>
                        {s.num}
                        <span className="inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-wide text-plum-muted">
                          {'logos' in s ? (
                            (s as unknown as { logos: string[] }).logos.map((lg) => (
                              <span key={lg} className="flex h-6 w-6 items-center justify-center rounded-lg border border-plum/10 bg-white shadow-sm">
                                <img src={lg} alt="" aria-hidden className="h-4 w-4 object-contain" />
                              </span>
                            ))
                          ) : (
                            <>
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-plum/10 bg-white shadow-sm">
                                <img src="/theta/logo-care.png" alt="" aria-hidden className="h-4 w-4 object-contain" />
                              </span>
                              {s.line}
                            </>
                          )}
                        </span>
                      </p>
                      <p className="rounded-full px-3 py-1 font-hand text-[14px]" style={{ color: s.color, backgroundColor: `${s.color}18` }}>
                        {s.stat}
                      </p>
                    </div>
                    <h3 className="mt-2 font-serif text-[1.3rem] font-medium text-plum">{s.heading}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <TechChip key={c.label} icon={c.icon} label={c.label} color={c.icon === 'figma' ? undefined : s.color} />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SignalBoard />

      {/* ── 报道 ── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <Reveal>
          <p className="label-text mb-4">In the wild</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            The internship, in writing
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 font-hand text-[17px] text-plum-muted">
            CMU's recap of my summer — <span className="text-orchid">and my own reflection ✦</span>
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
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
              <div aria-hidden className="mx-auto mt-4 h-px w-16 bg-plum/25" />
              <div className="mt-4 flex items-center gap-4">
                <img
                  src="/theta/olivia-cmu-avatar.jpg"
                  alt="Olivia Xiao at the Theta Health booth"
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover shadow-[0_6px_16px_-6px_rgba(58,36,64,0.4)]"
                />
                <div>
                  <p className="font-serif text-[1.02rem] font-bold leading-tight text-[#A6192E]">Olivia Xiao</p>
                  <p className="font-serif text-[13px] font-semibold text-[#1a1a1a]">MSSM ’25</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#3d3d3d]">
                    Product Strategy &amp; Operations Intern, Theta Health
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#3d3d3d]">
                “Supported the launch of an AI healthcare platform, collaborating with engineers,
                designers and physicians to develop compliant clinical workflows and drive early
                adoption.”
              </p>
              <p className="mt-3 font-serif text-[13px] italic leading-relaxed text-[#3d3d3d]">
                {CMU_PRESS.quote}
              </p>
            </a>
          </Reveal>
          {/* LinkedIn 官方 embed */}
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_18px_40px_-24px_rgba(90,63,86,0.35)]">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7348943917221826562"
                height="520"
                title="LinkedIn — internship reflection at Theta Health"
                className="block w-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 收尾：团队合照 + takeaway ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
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
                — the lesson every product line kept teaching me
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  to="/work"
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
