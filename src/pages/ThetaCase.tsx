import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CompareSlider } from '@/components/CompareSlider'
import { CountUp } from '@/components/CountUp'
import { Reveal } from '@/components/Reveal'
import { TiltCard } from '@/components/TiltCard'

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
  { stage: 'Define', color: '#B98ACB', chips: ['roadmap', 'PRDs'] },
  { stage: 'Design', color: '#8FAE8B', chips: ['Figma prototypes', 'prompt templates'] },
  { stage: 'Build', color: '#C79A4B', chips: ['STT + LLMs', 'HIPAA infra'] },
  { stage: 'Launch', color: '#D193A8', chips: ['GTM · roundtables', 'first clinic pilot'] },
]

const OWNED = [
  {
    num: '01',
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
    heading: 'Designed the AI features',
    color: '#B98ACB',
    stat: '20+ interviews · 10+ teardowns',
    chips: [
      { icon: 'sparkle', label: 'AI Edit' },
      { icon: 'doc', label: 'Note Customization' },
      { icon: 'doc', label: 'Doc Generation' },
      { icon: 'chat', label: 'Prompt templates' },
    ],
  },
  {
    num: '03',
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
      'Owned GTM strategy: Twitter influencer outreach, offline MCP influencer events, and developer-community building',
      'Created demo content and the launch one-pager; gathered feedback from 20+ developers in the field',
      'Adoption barriers I diagnosed reshaped roadmap priorities — 30+ developers engaged overall',
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
@media (prefers-reduced-motion: reduce) {
  .theta-march, .theta-spin, .theta-pulse, .theta-kb { animation: none; }
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





/** Pilot 筛选漏斗：湾区诊所 → 实地验证的 ICP 筛选 → 首个 pilot */
function PilotFunnelGraphic() {
  const dots = [
    [24, 46], [46, 36], [68, 50], [34, 68], [58, 74], [80, 40], [90, 64], [28, 94], [52, 98], [76, 90], [96, 82], [42, 116],
  ] as const
  const filters = ['independent practice', 'has EHR & website', 'holistic · TCM care', 'strong patient reviews']
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="Pilot targeting funnel: Bay Area clinics run through field-validated ICP filters down to the first pilot">
      <text x="60" y="24" textAnchor="middle" fontSize="10.5" fill="#8A6E84">Bay Area clinics</text>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#3A2440" fillOpacity="0.16" />
      ))}
      <text x="60" y="140" textAnchor="middle" fontSize="10" fill="#8A6E84">shortlisted &amp; visited</text>
      {/* ç­éé¸é¨ï¼å®å°éªè¯ç ICPï¼ */}
      <rect x="118" y="34" width="152" height="120" rx="12" fill="white" stroke="#B98ACB" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="194" y="54" textAnchor="middle" fontSize="10.5" fill="#8A6E84">the filters, field-tested</text>
      {filters.map((f, i) => (
        <text key={f} x="194" y={76 + i * 20} textAnchor="middle" fontSize="10.5" fill="#3A2440">
          {f}
        </text>
      ))}
      <path d="M102 80 H 116" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 4" strokeLinecap="round" className="theta-march" />
      <path d="M262 158 Q 278 164 282 172" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 4" strokeLinecap="round" className="theta-march" />
      {/* ç»æ */}
      <circle cx="284" cy="182" r="15" fill="#B98ACB" fillOpacity="0.16" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 4" />
      <circle cx="284" cy="182" r="4" fill="#B98ACB" />
      <text x="234" y="200" textAnchor="middle" fontSize="11" fill="#3A2440" fontWeight="600">the first pilot</text>
      <text x="234" y="188" textAnchor="middle" fontSize="11" fill="#B98ACB" className="font-hand">✦</text>
    </svg>
  )
}

/** GTM 引擎（宽幅双轨）：MCP 开发者向 vs Theta Care B 端临床向 */
function GtmEngineGraphic() {
  const laneA = [
    { x: 14, w: 172, label: 'tech influencers · 15+ mapped' },
    { x: 194, w: 70, label: 'media' },
    { x: 272, w: 100, label: 'hackathons' },
  ]
  const laneB = [
    { x: 14, w: 164, label: 'cold outreach · call scripts' },
    { x: 186, w: 172, label: 'clinical roundtables · 40+ MDs' },
    { x: 366, w: 126, label: 'medical associations' },
  ]
  return (
    <svg viewBox="0 0 640 216" className="w-full max-w-[660px]" fill="none" aria-label="Two GTM motions: developer channels (tech influencers, media, hackathons) drove MCP adoption with 30+ developers; clinical B2B channels (cold outreach, roundtables, medical associations) landed the first clinic pilot">
      {/* 轨道 A：MCP 开发者向 */}
      <text x="14" y="30" fontSize="11" fontWeight="600" fill="#B98ACB">MCP · developer motion</text>
      {laneA.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="44" width={c.w} height="26" rx="13" fill="white" stroke="#B98ACB" strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx={c.x + 14} cy="57" r="3" fill="#B98ACB" />
          <text x={c.x + 25} y="61" fontSize="10" fill="#3A2440">{c.label}</text>
        </g>
      ))}
      <path d="M380 57 H 524" stroke="#B98ACB" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
      <circle cx="566" cy="57" r="26" fill="#B98ACB" fillOpacity="0.14" stroke="#B98ACB" strokeWidth="1.4" strokeDasharray="2 4" />
      <text x="566" y="54" textAnchor="middle" fontSize="11" fill="#3A2440" fontWeight="600">30+ devs</text>
      <text x="566" y="68" textAnchor="middle" fontSize="10.5" fill="#3A2440">engaged</text>

      {/* 分隔线 */}
      <path d="M14 104 H 626" stroke="#3A2440" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 7" />

      {/* 轨道 B：Theta Care B 端临床向 */}
      <text x="14" y="132" fontSize="11" fontWeight="600" fill="#C79A4B">Theta Care · clinical B2B motion</text>
      {laneB.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="146" width={c.w} height="26" rx="13" fill="white" stroke="#C79A4B" strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx={c.x + 14} cy="159" r="3" fill="#C79A4B" />
          <text x={c.x + 25} y="163" fontSize="10" fill="#3A2440">{c.label}</text>
        </g>
      ))}
      <path d="M500 159 H 524" stroke="#C79A4B" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
      <circle cx="566" cy="159" r="26" fill="#D193A8" fillOpacity="0.14" stroke="#D193A8" strokeWidth="1.4" strokeDasharray="2 4" />
      <text x="566" y="156" textAnchor="middle" fontSize="11" fill="#3A2440" fontWeight="600">1st clinic</text>
      <text x="566" y="170" textAnchor="middle" fontSize="10.5" fill="#3A2440">pilot ✦</text>

      <text x="320" y="204" textAnchor="middle" fontSize="12.5" fill="#B98ACB" className="font-hand" fontWeight="600">
        same playbook muscle, two very different audiences ✦
      </text>
    </svg>
  )
}

/** 竞品扫描核心：定位象限 + 我们找到的空白 */
function QuadrantGraphic() {
  const dots = [
    { x: 96, y: 158, label: 'scheduling' },
    { x: 118, y: 168 },
    { x: 148, y: 140, label: 'voice agents' },
    { x: 166, y: 152 },
    { x: 186, y: 112, label: 'doc review' },
    { x: 204, y: 124 },
    { x: 122, y: 104, label: 'wellness' },
  ]
  return (
    <svg viewBox="0 0 320 216" className="w-full max-w-[300px]" fill="none" aria-label="Competitive positioning: most products cluster as point solutions; Theta targets whole-patient context in clinical care">
      {/* 坐标轴 */}
      <path d="M56 184 H 296 M56 184 V 30" stroke="#3A2440" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      <text x="296" y="202" textAnchor="end" fontSize="11" fill="#8A6E84">admin → clinical care</text>
      <text x="52" y="20" textAnchor="start" fontSize="11" fill="#8A6E84">whole-patient ↑</text>
      {/* 竞品散点 */}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="5" fill="#3A2440" fillOpacity="0.18" />
          {d.label && (
            <text x={d.x + 9} y={d.y + 4} fontSize="10.5" fill="#8A6E84">
              {d.label}
            </text>
          )}
        </g>
      ))}
      {/* Theta 的空白点 */}
      <path d="M196 96 Q 226 62 248 56" stroke="#B98ACB" strokeOpacity="0.6" strokeWidth="1.3" strokeDasharray="2 5" strokeLinecap="round" className="theta-march" />
      <path d="M262 56 l6.5 4 -7.5 2 2 7 -5.5 -5 -5.5 5 2 -7 -7.5 -2 6.5 -4 v-7 Z" fill="#B98ACB" transform="translate(0,-8)" className="theta-pulse" />
      <text x="262" y="82" textAnchor="middle" fontSize="12.5" fill="#3A2440" fontWeight="600">Theta</text>
      <text x="262" y="98" textAnchor="middle" fontSize="11.5" fill="#B98ACB" className="font-hand">the gap ✦</text>
      <text x="56" y="202" fontSize="10.5" fill="#8A6E84">14 products scanned</text>
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
      <style>{CASE_CSS}</style>
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
                Product Strategy & Operations Intern
              </span>
              <TechChip icon="figma" label="Figma" />
              <TechChip icon="doc" label="PRDs" />
              <TechChip icon="mic" label="Speech-to-Text" color="#D193A8" />
              <TechChip icon="sparkle" label="LLM prompts" color="#B98ACB" />
              <TechChip icon="shield" label="HIPAA" color="#8FAE8B" />
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
                  <motion.div
                    key={f.stage}
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.12 }}
                    className="relative flex items-start gap-3 md:flex-col md:items-center md:text-center">
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
                      <p className="font-hand text-[20px] font-semibold" style={{ color: s.color }}>
                        {s.num}
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

      {/* ── 证据墙 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">Field notes</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Four insights from the work
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 font-hand text-[17px] text-plum-muted">
            each one traces back to a real document — <span className="text-orchid">ask me about any of them ✦</span>
          </p>
        </Reveal>

        {/* 提炼信息图：象限 + 漏斗一行，宽幅 GTM 引擎独占一行 */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <InsightCard title="The gap the research found" source="from my 14-product competitive scan">
              <QuadrantGraphic />
            </InsightCard>
          </Reveal>
          <Reveal delay={0.08}>
            <InsightCard title="How we targeted the pilot" source="from Bay Area pilot-user research">
              <PilotFunnelGraphic />
            </InsightCard>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-2">
            <InsightCard title="The GTM engine — two products, two motions" source="from my influencer research & the growth playbook">
              <GtmEngineGraphic />
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
              <p className="mt-3 px-1 text-[12px] leading-snug text-plum-faint">
                Product built by the Theta engineering team — my part was its GTM: Twitter &amp;
                offline influencer outreach, developer-community building, demo content, and the
                launch one-pager. 30+ developers engaged.
              </p>
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
                <div aria-hidden className="mx-auto mt-4 h-px w-16 bg-plum/25" />
                {/* 文章中的官方 profile 卡（按 CMU 页面原样重建） */}
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
