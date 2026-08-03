import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BorderGlow } from '@/components/BorderGlow'
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
    k: 'The brief',
    g: 'handshake',
    c: '#D193A8',
    head: 'Z.ai wasn’t asking for a hackathon',
    body: 'GLM 5.1 was about to launch. What a new model needs at that moment isn’t a leaderboard — it’s proof that real developers can do real work on it, and use cases the lab can point at. I took the brief as a launch problem and designed the program backwards from it.',
    proof: 'Warm up the launch · surface real use cases',
  },
  {
    k: 'The bar',
    g: 'target',
    c: '#C79A4B',
    head: 'Write down what “good” means, before anyone builds',
    body: 'Use cases only help a launch if they survive scrutiny. So the builder guide said it plainly: a working product, not a mockup. Multi-step reasoning or tool use, not one API call. A named user and problem. An architecture diagram. A README another developer could actually follow.',
    proof: 'Builder Guide — 5 explicit criteria',
  },
  {
    k: 'The funnel',
    g: 'mic',
    c: '#B98ACB',
    head: 'Take a week-long async window seriously',
    body: 'No venue, no stage — the whole program lived in a funnel. API access form, GLM Pro for every participant, a Discord gate to unlock the build channel, and answers during the build instead of after it. 221 developers came through in one week.',
    proof: '221 registered builders · 30 Mar – 6 Apr',
  },
  {
    k: 'Distribution',
    g: 'parallel',
    c: '#7A9CC6',
    head: 'Put the distribution inside the rules',
    body: 'Every submission had to ship a public repo, an X thread with the tag, and a 2–3 minute demo of the thing actually running. That wasn’t admin — it meant each of the 221 builders produced launch material for GLM 5.1 whether or not they won.',
    proof: 'Public repo + X thread + demo, required',
  },
  {
    k: 'The payoff',
    g: 'laurel',
    c: '#8FAE8B',
    head: 'Three projects Z.ai put its own name behind',
    body: 'The prize builders actually wanted was distribution, so that was the prize: the top three were reposted by Z.ai and published on its site. Three agentic products the lab could point to as evidence, from a community that didn’t exist around GLM 5.1 a week earlier.',
    proof: 'Top 3 featured on Z.ai’s own channels',
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

/* ── 最终被 Z.ai 官方转发的三个项目 ─────────────────────────── */
const FEATURED = [
  {
    name: 'OSAP',
    text: '@Maaztwts built OSAP to stop the constant tab-switching between Slack, GitHub, and Notion.\n\nIt uses GLM-5.1 as a reasoning layer to handle multi-step tasks across different apps, with persistent memory (HydraDB) to keep track of your specific workflow habits.',
    href: 'https://x.com/Zai_org/status/2042996323037917227',
  },
  {
    name: 'Builddy',
    text: '@Neelkamalshah built Builddy to go from a text prompt to a deployed web app in one go using GLM-5.1.\n\nThe system coordinates 6 different agents to handle everything from system design to final deployment, all running on GLM-5.1’s coding logic.',
    href: 'https://x.com/Zai_org/status/2043000894174994519',
  },
  {
    name: 'CodeTribunal',
    text: '@AmineYagoube created CodeTribunal to help teams audit freelance code more effectively.\n\nIt sets up an “AI Courtroom” where GLM-5.1 agents debate as prosecutor and defense to uncover hidden logical risks that standard linters might miss.',
    href: 'https://x.com/Zai_org/status/2043001835099951474',
  },
]


function FeaturedProjects() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          What Z.ai ended up featuring
        </p>
        <p className="font-hand text-[15px] text-plum-muted">the point of the whole thing ✦</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {FEATURED.map((f, i) => (
          <a
            key={f.name}
            href={f.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Z.ai's post about ${f.name} on X`}
            style={{ animation: `annot-in .45s ${i * 0.08}s ease-out both` }}
            className="group/f flex flex-col rounded-2xl border border-[#cfd9de] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b98a5] hover:shadow-[0_16px_36px_-20px_rgba(15,20,25,0.35)]"
          >
            {/* 帖子头 */}
            <div className="flex items-center gap-2.5">
              <img
                src="/events/x/zai-avatar.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="h-10 w-10 shrink-0 rounded-full"
              />
              <div className="min-w-0 flex-1 leading-tight">
                <span className="flex items-center gap-1">
                  <span className="truncate text-[14px] font-bold text-[#0f1419]">Z.ai</span>
                  <svg viewBox="0 0 22 22" className="h-[15px] w-[15px] shrink-0" fill="#1d9bf0" aria-hidden>
                    <path d="M20.4 11c0-1.1-.6-2.1-1.5-2.6.3-1 .1-2.2-.7-3-.8-.8-2-1-3-.7C14.7 3.8 13.7 3.2 12.6 3.2h-.1c-1.1 0-2.1.6-2.6 1.5-1-.3-2.2-.1-3 .7-.8.8-1 2-.7 3-.9.5-1.5 1.5-1.5 2.6s.6 2.1 1.5 2.6c-.3 1-.1 2.2.7 3 .8.8 2 1 3 .7.5.9 1.5 1.5 2.6 1.5h.1c1.1 0 2.1-.6 2.6-1.5 1 .3 2.2.1 3-.7.8-.8 1-2 .7-3 .9-.5 1.5-1.5 1.5-2.6zm-9.9 4.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4z" />
                  </svg>
                </span>
                <span className="block truncate text-[13px] text-[#536471]">@Zai_org</span>
              </div>
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0 text-[#0f1419]" fill="currentColor" aria-hidden>
                <path d="M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.9L0 1.6h7.6l5.2 6.9zm-1.3 19.6h2L6.5 3.7H4.3z" />
              </svg>
            </div>

            {/* 正文 */}
            <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.4] text-[#0f1419]">
              {f.text}
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#eff3f4] pt-3 text-[12.5px] text-[#536471]">
              <span>11 Apr 2026</span>
              <span className="font-medium text-[#1d9bf0] transition-opacity group-hover/f:opacity-75">
                Read on X
                <span aria-hidden className="ml-1 inline-block transition-transform duration-300 group-hover/f:translate-x-0.5">↗</span>
              </span>
            </div>
          </a>
        ))}
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
  /** 贡献级别徽章：写实，不夸大 */
  badge: string
  /** 主导深度：1 全权 · 2 主理 · 3 协同 */
  tier: 1 | 2 | 3
  /** 视觉权重：flagship 在 01 章展开，不进矩阵 */
  weight: 'flagship' | 'medium' | 'small' | 'wall'
  /** 卡内附 run of show */
  ros?: boolean
  /** 卡内附现场照/物料照（1–2 张） */
  snaps?: Array<{ src: string; alt: string; cap: string }>
  /** 活动墙一句话 */
  oneliner?: string
  /** AI Valley 之外的独立项目 */
  independent?: boolean
  href: string
  /** luma 封面 */
  cover: string
  /** 关联的 LinkedIn 帖（可多条）：点击卡片内展开 */
  posts?: Array<{
    label: string
    author?: string
    avatar?: string | null
    sub?: string
    text: string
    stats: string
    href: string
  }>
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
    badge: 'Program Lead · E2E',
    weight: 'flagship',
    role: 'Owned it end to end — brought Z.ai in, wrote the builder guide and the judging bar, ran the Discord and the outbound.',
    partners: 'Z.ai · AI Valley · Devpost',
    caps: ['GTM', 'Developer programs', 'Strategic partnerships'],
    tier: 1,
    href: 'https://luma.com/32jfoybh',
    cover: '/events/luma/glm.jpg',
    posts: [
      {
        label: 'I wrote the launch post',
        text: 'Most people talk about AI. This is where you actually build with it.\n\nGLM 5.1 is here, and we’re kicking off a 1-week global builder sprint to see what people can really do with it. No pitches. No fluff. Just builders shipping real things.',
        stats: '7 reactions · 1 comment',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7445973511577440256',
      },
    ],
    lead: true,
  },
  {
    name: '2026 GTC Fireside Talk — What’s next in AI?',
    where: 'Palo Alto',
    size: '413 attendees · 20+ speakers',
    n: 413,
    badge: 'Co-host · Program Host',
    weight: 'medium',
    ros: true,
    role: 'Co-host & program host — sourced partners, invited the speakers, wrote the moderator briefs and panel questions, hosted the night.',
    posts: [
      {
        label: 'The announcement — my copy',
        text: 'GTC Week is always an exciting time for the AI community!\n\nAI Valley, in collaboration with MiniMax, is partnering with EPIC Connector to host a fireside talk in Palo Alto next Monday — an evening on what’s shaping the next wave of AI:\n\n• Spatial Computing\n• Memory systems\n• Agentic AI\n• The open infrastructure layer powering it all',
        stats: 'AI Valley page · the week before',
        href: 'https://www.linkedin.com/posts/ai-gtc2026-agenticai-share-7438704386882768896-SqG6/',
      },
      {
        label: 'My last call, day of',
        author: 'Olivia (Zerun) Xiao',
        avatar: null,
        sub: 'Co-host · program host',
        text: 'Last call to join an exciting GTC Week fireside talk tonight!\n\nSpecial thanks to Prasen Shelar (Axari) and Xuan Zhao, PhD (Flourish Science) for joining the panel as guests invited by AI Valley.\n\nPrasen will bring perspectives on AI infra and how agents move from demos to real enterprise deployment, while Xuan will share a human-centered lens on AI, mental health, and the evolving relationship between humans and AI!',
        stats: 'reposted on my profile · day of the event',
        href: 'https://www.linkedin.com/posts/olivia-zerun-xiao_ai-gtc2026-agenticai-activity-7439418261013921792-otX6',
      },
      {
        label: 'A panelist I invited, afterwards',
        author: 'Prasen Shelar',
        avatar: null,
        sub: 'Axari · Panel 3 speaker',
        text: 'Spent Monday evening on a panel debating where AI is actually going, not the hype version.\n\nThe question I kept coming back to: most AI demos work perfectly in controlled environments. The real world is messy, noisy, and deeply contextual. That gap is where the interesting problems live.',
        stats: '#agenticai · posted after the night',
        href: 'https://www.linkedin.com/posts/prasen-s_agenticai-cybersecurity-axari-activity-7440470031613980672-4PQr',
      },
    ],
    partners: 'EPIC Connector · Peak Mojo · Manycore Tech · Z.ai',
    caps: ['Strategic partnerships', 'Program management', 'Community'],
    tier: 2,
    href: 'https://luma.com/GTCTALK',
    cover: '/events/luma/gtc-talk.jpg',
  },
  {
    name: '2026 GTC AI Demo Day',
    where: 'San Francisco',
    size: '594 registered · 40+ VC firms',
    n: 594,
    badge: 'Co-host · Program Host',
    weight: 'medium',
    role: 'Co-host & program host — guest and speaker outreach, stage flow and demo hand-offs in front of 40+ funds.',
    partners: 'EPIC Connector × Allscale · FounderGro',
    caps: ['GTM', 'Program management', 'Community'],
    tier: 2,
    href: 'https://luma.com/GTCDEMODAY',
    cover: '/events/luma/gtc-demoday.jpg',
  },
  {
    name: 'Total Agent Recall Hackathon',
    where: 'Sky9 Capital, San Francisco',
    size: '358 registered · 50 engineers, 8 hours',
    n: 358,
    badge: 'Community Partner',
    weight: 'medium',
    snaps: [
      {
        src: '/events/agent-recall-floor.jpg',
        alt: 'Overhead view of the Total Agent Recall floor mid-demo — builders gathered around the presentation desks',
        cap: 'the floor, mid-demos ✦',
      },
      {
        src: '/events/gmi-perk.jpg',
        alt: 'Sponsor perk creative — GMI-branded tumbler, first 20 sign-ups get a free mug',
        cap: 'the sponsor perk I made ✦',
      },
    ],
    role: 'Community partner — helped organise the day on site: the marketing beforehand, and judging kept aligned across Dify, GMI Cloud and HydraDB.',
    partners: 'GMI Cloud · Photon · HydraDB · Dify',
    caps: ['Community', 'Strategic partnerships', 'GTM'],
    tier: 3,
    href: 'https://luma.com/snixr7yb',
    cover: '/events/luma/agent-recall.jpg',
    posts: [
      {
        label: 'The host’s recap',
        author: 'GMI Cloud',
        avatar: '/logos/partners/gmicloud.jpg',
        sub: 'Host of Total Agent Recall',
        text: '8 hours. 100 brilliant builders. 1 complete agent stack.\n\nWe are amazed by the projects coming out of yesterday’s Total Agent Recall Hackathon! The brightest technical founders and engineers gathered to ship working AI agents using GMI, and they delivered beyond our expectations.\n\nA massive thank you to our sponsor NVIDIA, as well as our co-hosts and partners for making this possible: Dify, HydraDB, Photon, our venue sponsor Sky9 Capital, and community partner AI Valley.',
        stats: 'the morning after',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7444284495148634112',
      },
      {
        label: 'I wrote the recruiting post',
        text: 'A build day for ~50 engineers working on agent systems. Come in with an idea, leave with a working agent.\n\nNVIDIA GPUs, 170+ models, Dify for orchestration, HydraDB for memory. Judges from Microsoft, Amazon and YC. Mac Mini for the grand prize.\n\nFirst 20 AI Valley members through the door get a branded mug. Small room: fills fast.',
        stats: '19 reactions · 4 comments',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7443396471057485824',
      },
    ],
  },
  {
    name: 'Build What You Love — Women in Tech Hackathon',
    where: 'San Francisco · hybrid',
    size: '422 attended',
    n: 422,
    badge: 'Day-of Coordination · Volunteer',
    weight: 'medium',
    snaps: [
      {
        src: '/events/photostrip-tight.jpg',
        alt: 'Printed photo-booth strips from Build What You Love',
        cap: 'photo-booth strips people took home ✦',
      },
    ],
    role: 'Ran the day-of coordination across the whole day, and made the volunteer certificates afterwards.',
    partners: 'AI Valley · Bond AI · Replit · Vercel · Daytona · MiniMax · BEM',
    caps: ['Program ops', 'Community'],
    tier: 2,
    href: 'https://luma.com/ic3l89gi',
    cover: '/events/luma/women.jpg',
    posts: [
      {
        label: 'The organiser’s write-up',
        author: 'Courtney Ko',
        avatar: '/avatars/courtney.jpg',
        sub: 'AI Valley · organiser of Build What You Love',
        text: '150+ women in one room in San Francisco, building on Valentine’s Day. Spaces where women in STEM felt supported, confident, and ambitious — women who showed up not to impress anyone, but to build what they love.\n\nVolunteers: Olivia Xiao, Kathy Men, Amy Wang, Uche Oh, Andrew Flores.',
        stats: '215 reactions · 59 comments',
        href: 'https://www.linkedin.com/posts/courtneythko_womenintech-buildwhatyoulove-aivalley-activity-7429241914459303938-4MG5',
      },
    ],
  },
  {
    name: 'Global Builders Salon — private mixer',
    where: 'San Francisco',
    size: '100 seats, approval only',
    n: 100,
    badge: 'Program Coordination',
    weight: 'wall',
    oneliner: 'Approval-only mixer — first-generation builders, an immigration lawyer on hand.',
    role: null,
    partners: 'AI Valley · HAC.ai · Boundless Immigration',
    caps: ['Community', 'Strategic partnerships'],
    tier: 3,
    href: 'https://luma.com/6re61lly',
    cover: '/events/luma/builders-salon.jpg',
  },
  {
    name: 'AI Valley × Molly Tea Pop-Up',
    where: 'Palo Alto',
    size: '100 builders hosted',
    n: 100,
    badge: 'Program Lead · Community Activation',
    weight: 'small',
    role: 'A pop-up with no agenda — 100 cups of tea as the reason for Palo Alto’s builders to be in one room.',
    partners: 'AI Valley · Molly Tea',
    caps: ['Community', 'GTM'],
    tier: 2,
    href: 'https://luma.com/puy9vbok',
    cover: '/events/luma/molly-tea.jpg',
  },
  {
    name: 'MiniMax AI Founder Day @ GTC',
    where: 'San Francisco',
    size: 'GTC week · with The AI Collective',
    n: null,
    badge: 'On-site Coordination',
    weight: 'small',
    role: 'On-site coordination on the day — nine speakers, one schedule.',
    partners: 'The AI Collective · AI Valley · MiniMax',
    caps: ['Community', 'Program ops'],
    tier: 3,
    href: 'https://luma.com/aic-sf-3-21?tk=C8DbIO',
    cover: '/events/luma/minimax.jpg',
  },
  {
    name: 'Humanity & AGI Summit 2026',
    where: 'Stanford Faculty Club',
    size: '448 attendees · Yuval Noah Harari keynote',
    n: 448,
    badge: 'Volunteer Support',
    weight: 'wall',
    independent: true,
    oneliner: 'Volunteer help with promotion and partner outreach, after the AI Valley program wrapped — a bill opened by Yuval Noah Harari.',
    role: null,
    partners: 'AIRA · GPT DAO · Cheetah Community · LOOMUS · EpicConnector',
    caps: ['Community', 'Strategic partnerships'],
    tier: 3,
    href: 'https://luma.com/wkolq6uc',
    cover: '/events/luma/agi-summit.jpg',
  },
]



function MaybeGlow({ on, children }: { on: boolean; children: React.ReactNode }) {
  if (!on) return <>{children}</>
  return (
    <BorderGlow className="h-full" backgroundColor="#FDF7F3" borderRadius={22}>
      {children}
    </BorderGlow>
  )
}

function ProgramCard({ p, i }: { p: Program; i: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [showRos, setShowRos] = useState(false)
  const lead = p.weight === 'flagship'
  return (
    <li
      style={{ animation: `annot-in .4s ${i * 0.05}s ease-out both` }}
      className={
        lead
          ? 'group/p transition-transform duration-300 hover:-translate-y-1'
          : 'group/p flex flex-col overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-plum/25 hover:bg-white hover:shadow-[0_20px_44px_-24px_rgba(58,36,64,0.4)]'
      }
    >
      <MaybeGlow on={lead}>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="relative block shrink-0 overflow-hidden"
        aria-label={`${p.name} — open the event page`}
      >
        <img
          src={p.cover}
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover/p:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-plum shadow-sm backdrop-blur">
          Luma <span aria-hidden>↗</span>
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[17px] font-light leading-snug text-plum">{p.name}</h3>
          {p.n && (
            <span className="shrink-0 text-right">
              <span className="block font-serif text-xl font-light leading-none text-rose">
                {p.n.toLocaleString()}
              </span>
              <span className="mt-1 block text-[10.5px] leading-tight text-plum-faint">
                {p.size.replace(/^[\d,]+\s*/, '')}
              </span>
            </span>
          )}
        </div>
        <p className="mt-1.5 flex items-baseline gap-1.5 text-[12px] leading-snug text-plum-faint">
          <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] shrink-0 translate-y-[1px]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M6 10.5C3.8 8.2 2.4 6.4 2.4 4.8a3.6 3.6 0 1 1 7.2 0c0 1.6-1.4 3.4-3.6 5.7Z" />
            <circle cx="6" cy="4.8" r="1.3" />
          </svg>
          {p.where}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-plum-faint">
          <span className="font-hand text-[13px] text-plum-muted">with</span> {p.partners}
        </p>
        <span
          className={`mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-[3px] text-[10.5px] font-medium tracking-wide ${
            p.independent
              ? 'bg-[#8FAE8B]/15 text-[#5F7D5B]'
              : p.tier === 1
                ? 'bg-rose/15 text-rose'
                : p.tier === 2
                  ? 'bg-orchid/15 text-orchid'
                  : 'bg-plum/[0.07] text-plum-muted'
          }`}
        >
          {p.independent ? `${p.badge} · beyond AI Valley` : p.badge}
        </span>
        {(p.role || p.oneliner) && (
          <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{p.role ?? p.oneliner}</p>
        )}
        <span className="mt-2.5 flex flex-wrap gap-1.5">
          {p.caps.map((c) => (
            <span key={c} className="rounded-full border border-plum/10 bg-white/60 px-2 py-[2px] text-[10px] leading-none text-plum-faint">
              {c}
            </span>
          ))}
        </span>

        {/* 现场照/物料：贴底，让不同高度的卡留白都聚在同一处 */}
        {p.snaps && (
          <div className={`mt-auto grid gap-3 pt-3.5 ${p.snaps.length > 1 ? 'grid-cols-2' : ''}`}>
            {p.snaps.map((sn) => (
              <figure key={sn.src}>
                <Zoomable
                  src={sn.src}
                  alt={sn.alt}
                  cap={sn.cap}
                  className="h-28 w-full rounded-[0.9rem] border border-plum/10 object-cover"
                />
                <figcaption className="mt-1.5 font-hand text-[13px] leading-tight text-plum-muted">{sn.cap}</figcaption>
              </figure>
            ))}
          </div>
        )}

        {(p.posts || p.ros) && (
          <div className={`flex flex-wrap gap-x-5 gap-y-2 pt-3.5 ${p.snaps ? '' : 'mt-auto'}`}>
            {p.posts?.map((po, idx) =>
              po.text === '' ? (
                <a
                  key={po.label}
                  href={po.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0A66C2] transition-opacity hover:opacity-75"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
                  </svg>
                  {po.label}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
              <button
                key={po.label}
                type="button"
                onClick={() => setOpenIdx((o) => (o === idx ? null : idx))}
                aria-expanded={openIdx === idx}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0A66C2] transition-opacity hover:opacity-75"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
                </svg>
                {po.label}
                <span aria-hidden className={`inline-block transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}>▾</span>
              </button>
              ),
            )}
            {p.ros && (
              <button
                type="button"
                onClick={() => setShowRos((o) => !o)}
                aria-expanded={showRos}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rose transition-opacity hover:opacity-75"
              >
                run of show
                <span aria-hidden className={`inline-block transition-transform duration-300 ${showRos ? 'rotate-180' : ''}`}>▾</span>
              </button>
            )}
          </div>
        )}
        {openIdx !== null && p.posts?.[openIdx] && (
          <div className="mt-3">
            <LinkedInPost
              text={p.posts[openIdx].text}
              stats={p.posts[openIdx].stats}
              href={p.posts[openIdx].href}
              author={p.posts[openIdx].author}
              avatar={p.posts[openIdx].avatar}
              sub={p.posts[openIdx].sub}
            />
          </div>
        )}
        {showRos && p.ros && (
          <div className="mt-3">
            <RunOfShow />
          </div>
        )}
      </div>
      </MaybeGlow>
    </li>
  )
}

/* ── 旗舰右卡：Devpost 挑战主页 ─────────────────────────────── */
function DevpostCard() {
  return (
    <li className="group/p transition-transform duration-300 hover:-translate-y-1">
      <MaybeGlow on>
      <a
        href="https://build-with-glm-5-1-challenge.devpost.com/"
        target="_blank"
        rel="noreferrer"
        className="relative block shrink-0 overflow-hidden"
        aria-label="Build with GLM 5.1 Challenge — open on Devpost"
      >
        <img
          src="/events/glm-devpost-poster.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[2/1] w-full object-cover object-[50%_42%] transition-transform duration-700 group-hover/p:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-plum shadow-sm backdrop-blur">
          Devpost <span aria-hidden>↗</span>
        </span>
      </a>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[17px] font-light leading-snug text-plum">
            Build with GLM 5.1 Challenge — the submission home
          </h3>
          <span className="shrink-0 text-right">
            <span className="block font-serif text-xl font-light leading-none text-rose">$5,000</span>
            <span className="mt-1 block text-[10.5px] leading-tight text-plum-faint">in cash prizes</span>
          </span>
        </div>
        <p className="mt-1.5 flex items-baseline gap-1.5 text-[12px] leading-snug text-plum-faint">
          <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] shrink-0 translate-y-[1px]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M6 10.5C3.8 8.2 2.4 6.4 2.4 4.8a3.6 3.6 0 1 1 7.2 0c0 1.6-1.4 3.4-3.6 5.7Z" />
            <circle cx="6" cy="4.8" r="1.3" />
          </svg>
          Online · Mar 30 – April 6, 2026
        </p>
        <p className="mt-1 text-[12px] leading-snug text-plum-faint">
          <span className="font-hand text-[13px] text-plum-muted">with</span> Devpost · public project gallery
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-plum-muted">
          Where the 221 submissions landed — judged against the bar I wrote, with the three winners
          republished by Z.ai.
        </p>
      </div>
      </MaybeGlow>
    </li>
  )
}

function ProgramMatrix() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {PROGRAMS.filter((p) => p.weight !== 'flagship').map((p, i) => (
        <ProgramCard key={p.name} p={p} i={i} />
      ))}
    </ul>
  )
}

function LinkedInPost({
  text,
  stats,
  href,
  note,
  author = 'AI Valley',
  avatar = '/logos/aivalley.png',
  sub = '1,028 followers',
  i = 0,
}: {
  text: string
  stats: string
  href: string
  note?: string
  author?: string
  avatar?: string | null
  sub?: string
  i?: number
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ animation: `annot-in .45s ${i * 0.08}s ease-out both` }}
      className="group/li flex flex-col rounded-2xl border border-[#d0d5dc] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2]/50 hover:shadow-[0_16px_36px_-20px_rgba(10,102,194,0.35)]"
    >
      <div className="flex items-center gap-2.5">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full bg-white object-contain ring-1 ring-black/5"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A66C2]/10 font-serif text-[17px] text-[#0A66C2]"
          >
            {author[0]}
          </span>
        )}
        <div className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[14px] font-semibold text-[#000000e6]">{author}</span>
          <span className="block truncate text-[12px] text-[#00000099]">{sub}</span>
        </div>
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="#0A66C2" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
        </svg>
      </div>

      <p className="mt-3 whitespace-pre-line text-[13.5px] leading-[1.45] text-[#000000e6]">{text}</p>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-black/8 pt-3 text-[12px] text-[#00000099]">
        <span>{stats}</span>
        {note ? (
          <span className="font-medium text-[#0A66C2]">{note}</span>
        ) : (
          <span className="font-medium text-[#0A66C2] transition-opacity group-hover/li:opacity-75">
            Read on LinkedIn
            <span aria-hidden className="ml-1 inline-block transition-transform duration-300 group-hover/li:translate-x-0.5">↗</span>
          </span>
        )}
      </div>
    </a>
  )
}

/* ── 炉边谈的当天流程：来自我参与准备的 Speaker & Moderator Guide ──── */
const PANELS: Array<{ t: string; k: string; v: string; n: number; q: number; qs?: string[] }> = [
  {
    t: '6:10',
    k: 'Opening keynotes',
    v: 'Manycore Tech · Z.ai',
    n: 2,
    q: 0,
  },
  {
    t: '6:30',
    k: 'The distribution challenge',
    v: 'Scaling AI products in the agent era',
    n: 4,
    q: 6,
  },
  {
    t: '7:10',
    k: 'Building in the age of AI',
    v: 'YC founders on PMF, pivots and what actually works',
    n: 4,
    q: 7,
  },
  {
    t: '7:50',
    k: 'Beyond the horizon',
    v: 'Physical AI · memory · spatial computing · agents in production',
    n: 4,
    q: 8,
    qs: [
      'Is open-source AI infrastructure like OpenClaw the winning strategy for 2026–2027 — and as agents get easier to build, where does the boundary lie between what AI can automate and what should remain fundamentally human?',
      'As AI moves from stateless tools to agents that remember us over time, how do you see persistent memory evolving — in the technology itself, and in how humans and AI interact?',
    ],
  },
]

function RunOfShow() {
  return (
    <div className="rounded-[1.2rem] border border-plum/10 bg-white/70 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          And then the night has to run
        </p>
        <p className="font-hand text-[14px] text-plum-muted">from the guest brief ✦</p>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-plum-muted">
        Three hours, three panels — each shipped with its own prepared questions, so the
        conversation went somewhere specific.
      </p>

      <ol className="mt-4 space-y-1.5">
        {PANELS.map((p) => (
          <li key={p.k} className="flex items-baseline gap-3">
            <span className="w-9 shrink-0 font-serif text-[13.5px] leading-none text-rose">{p.t}</span>
            <span className="min-w-0 flex-1 text-[12.5px] font-medium leading-snug text-plum">{p.k}</span>
            {p.q > 0 && (
              <span className="shrink-0 rounded-full bg-rose/10 px-2 py-[3px] text-[10.5px] leading-none text-rose">
                {p.q} questions prepped
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 space-y-2 border-t border-plum/8 pt-3">
        <p className="font-hand text-[13px] text-plum-muted">two I proposed for Panel 3 ✦</p>
        {PANELS.find((p) => p.qs)?.qs?.map((q) => (
          <p key={q.slice(0, 24)} className="border-l-2 border-rose/30 pl-2.5 text-[12px] italic leading-relaxed text-plum-muted">
            “{q}”
          </p>
        ))}
      </div>
    </div>
  )
}

/* ── 点开放大：全页图片通用灯箱 ─────────────────────────────── */
type GalleryItem = { src: string; alt: string; cap?: string }

/** 放大查看：从缩略图 zoom 进全屏，再左右滑动浏览同组图片 */
function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const touchX = useRef<number | null>(null)
  const go = useCallback(
    (d: 1 | -1) => onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex],
  )
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  const cur = items[index]
  const many = items.length > 1

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <figure
        key={cur.src}
        className="flex max-h-full flex-col items-center"
        style={{ animation: 'lightbox-in .34s cubic-bezier(.2,.8,.25,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cur.src}
          alt={cur.alt}
          className="max-h-[80vh] max-w-[92vw] rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
        />
        {cur.cap && (
          <figcaption className="mt-4 max-w-[70ch] text-center text-[13px] text-white/75">{cur.cap}</figcaption>
        )}
      </figure>

      {many && (
        <>
          {[
            { d: -1 as const, cls: 'left-3 md:left-8', g: '←', label: 'Previous' },
            { d: 1 as const, cls: 'right-3 md:right-8', g: '→', label: 'Next' },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={(e) => { e.stopPropagation(); go(b.d) }}
              className={`absolute ${b.cls} top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-white/30`}
            >
              {b.g}
            </button>
          ))}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-[15px] text-white/70">
            {index + 1} / {items.length} · swipe or ← →
          </span>
        </>
      )}

      <button
        type="button"
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        ×
      </button>
    </div>,
    document.body,
  )
}

/** 单张图的放大入口（卡内物料照用） */
function Zoomable({ src, alt, cap, className = '' }: { src: string; alt: string; cap?: string; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-[inherit]"
        aria-label={`View larger: ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" className={`${className} transition-transform duration-500 group-hover/zoom:scale-[1.04]`} />
      </button>
      {open && (
        <Lightbox items={[{ src, alt, cap }]} index={0} onClose={() => setOpen(false)} onIndex={() => {}} />
      )}
    </>
  )
}

const PARTNER_GROUPS: Array<{ k: string; v: Array<{ n: string; l?: string }> }> = [
  {
    k: 'Model labs & platforms',
    v: [
      { n: 'Z.ai', l: '/logos/partners/zai.jpg' },
      { n: 'MiniMax', l: '/logos/partners/minimax.jpg' },
      { n: 'Dify', l: '/logos/partners/dify.jpg' },
      { n: 'GMI Cloud', l: '/logos/partners/gmicloud.jpg' },
      { n: 'HydraDB', l: '/logos/partners/hydradb.jpg' },
      { n: 'Replit', l: '/logos/partners/replit.jpg' },
      { n: 'Vercel', l: '/logos/partners/vercel.jpg' },
      { n: 'Neo4j', l: '/logos/partners/neo4j.jpg' },
      { n: 'Convex', l: '/logos/partners/convex.jpg' },
      { n: 'Photon' },
    ],
  },
  {
    k: 'Communities & convenors',
    v: [
      { n: 'AI Valley', l: '/logos/aivalley.png' },
      { n: 'The AI Collective', l: '/logos/partners/aicollective.jpg' },
      { n: 'EPIC Connector', l: '/logos/partners/epicconnector.jpg' },
      { n: 'Bond AI' },
      { n: 'AIRA' },
      { n: 'FounderGro' },
    ],
  },
  {
    k: 'Capital, venue & services',
    v: [
      { n: 'Peak Mojo', l: '/logos/partners/peakmojo.jpg' },
      { n: 'Molly Tea', l: '/logos/partners/mollytea.jpg' },
      { n: 'Manycore Tech' },
      { n: 'Allscale' },
      { n: 'HAC.ai' },
      { n: 'Boundless Immigration' },
    ],
  },
]

/** 没有可信 logo 的用同色系字母标，避免贴错公司 */
const MONO_TINTS = ['#D193A8', '#B98ACB', '#7A9CC6', '#8FAE8B', '#C79A4B']

function PartnerMark({ n, l, i }: { n: string; l?: string; i: number }) {
  if (l) {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-plum/10">
        <img src={l} alt="" aria-hidden loading="lazy" className="h-full w-full object-contain" />
      </span>
    )
  }
  const c = MONO_TINTS[i % MONO_TINTS.length]
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-serif text-[13px] leading-none"
      style={{ backgroundColor: `${c}22`, color: c }}
    >
      {n[0]}
    </span>
  )
}

function PartnerWall() {
  return (
    <div className="rounded-[1.6rem] border border-plum/10 bg-white/60 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          Who was on the other side of these programs
        </p>
        <p className="font-hand text-[15px] text-plum-muted">every one of them, a conversation ✦</p>
      </div>
      <div className="mt-6 grid gap-7 md:grid-cols-3">
        {PARTNER_GROUPS.map((g) => (
          <div key={g.k}>
            <p className="text-[12px] font-medium text-plum">{g.k}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.v.map((o, i) => (
                <li
                  key={o.n}
                  className="flex items-center gap-2 rounded-full border border-plum/12 bg-white/70 py-1 pl-1 pr-3 text-[11.5px] text-plum-muted"
                >
                  <PartnerMark n={o.n} l={o.l} i={i} />
                  {o.n}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 现场照：确认后再填，空数组时整段不渲染 ────────────────────── */
const PHOTOS: Array<{ src: string; alt: string; cap: string }> = [
  {
    src: '/events/women-hackathon.jpg',
    alt: 'The full cohort of Build What You Love — Women in Tech Hackathon, on stage after demos',
    cap: 'Build What You Love — the whole room, after demos',
  },
  {
    src: '/events/gtc-fireside-group.jpg',
    alt: 'The full room of the 2026 GTC Fireside Talk posing together after the panels, 16 March 2026',
    cap: '2026 GTC Fireside Talk — the room, after the last panel',
  },
  {
    src: '/events/av-hackathon.jpg',
    alt: 'Builders mid-build at an AI Valley hackathon',
    cap: 'AI Valley Hackathon — the room mid-build',
  },
  {
    src: '/events/gtc-demoday-group.jpg',
    alt: 'Group selfie with the crowd at 2026 GTC AI Demo Day',
    cap: 'GTC AI Demo Day — the room, after the showcase',
  },
  {
    src: '/events/agi-summit-room.jpg',
    alt: 'The audience at the Humanity & AGI Summit 2026, Stanford Faculty Club — Olivia on staff in the room',
    cap: 'Humanity & AGI Summit — Stanford Faculty Club, on staff',
  },
  {
    src: '/events/gtc-fireside.jpg',
    alt: 'Panel 3 of the 2026 GTC Fireside Talk in progress — four speakers on stage',
    cap: 'GTC Fireside Talk — Panel 3 running',
  },
  {
    src: '/events/agent-recall-judging.jpg',
    alt: 'A builder heads-down on his laptop at Total Agent Recall, teams working in the background',
    cap: 'Total Agent Recall — heads-down, mid-build',
  },
  {
    src: '/events/minimax-day.jpg',
    alt: 'Builders and founders talking over lunch between sessions',
    cap: 'builders over lunch, between sessions',
  },
]

function EventPhotos() {
  const railRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    let raf = 0
    const step = () => {
      if (!pausedRef.current && open === null) {
        el.scrollLeft += 0.55
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [open])

  if (PHOTOS.length === 0) return null
  const reel = [...PHOTOS, ...PHOTOS]
  const slide = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })

  return (
    <div className="group/reel relative">
      <div
        ref={railRef}
        onPointerEnter={() => { pausedRef.current = true }}
        onPointerLeave={() => { pausedRef.current = false }}
        onTouchStart={() => { pausedRef.current = true }}
        onTouchEnd={() => { window.setTimeout(() => { pausedRef.current = false }, 2400) }}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reel.map((ph, i) => (
          <figure key={ph.src + i} className="w-[300px] shrink-0 sm:w-[360px]">
            <button
              type="button"
              onClick={() => setOpen(i % PHOTOS.length)}
              aria-label={`View larger: ${ph.alt}`}
              className="group/zoom block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem]"
            >
              <img
                src={ph.src}
                alt={ph.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[1.1rem] border border-plum/10 bg-white object-cover transition-transform duration-500 group-hover/zoom:scale-[1.05]"
              />
            </button>
            <figcaption className="mt-2 px-1 text-[12px] text-plum-faint">{ph.cap}</figcaption>
          </figure>
        ))}
      </div>
      {[
        { dir: -1 as const, cls: 'left-2', glyph: '←' },
        { dir: 1 as const, cls: 'right-2', glyph: '→' },
      ].map((b) => (
        <button
          key={b.cls}
          type="button"
          aria-label={b.dir === 1 ? 'Next photos' : 'Previous photos'}
          onClick={() => slide(b.dir)}
          onPointerEnter={() => { pausedRef.current = true }}
          onPointerLeave={() => { pausedRef.current = false }}
          className={`absolute ${b.cls} top-[38%] flex h-10 w-10 items-center justify-center rounded-full border border-plum/10 bg-white/90 text-[15px] text-plum shadow-[0_8px_20px_-8px_rgba(58,36,64,0.45)] backdrop-blur transition-all duration-300 hover:bg-white md:opacity-0 md:group-hover/reel:opacity-100`}
        >
          {b.glyph}
        </button>
      ))}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent" />
      {open !== null && (
        <Lightbox items={PHOTOS} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
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
            Community programs for AI builders — and the partnerships and go-to-market that
            decide whether anyone shows up.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            A program has users, a funnel and a retention problem — same as any product. So I ran
            them that way: partner sourced before the date, the bar written down before anyone
            shows up, the loop closed after.
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
            AI Valley &amp; independent programs · Bay Area &amp; global · 2025–2026
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.32}>
          <OutcomeStrip
            variant="pastel"
            items={[
              {
                n: 3200,
                suffix: '+',
                label: 'builders, founders and investors registered across these programs',
              },
              { n: 221, label: 'developers in the GLM 5.1 launch challenge I designed and ran' },
              { n: 3, label: 'of their projects reposted by Z.ai and published on its site' },
            ]}
          />
        </Reveal>

        {/* ── 一 · 旗舰 ─────────────────────────────────────────── */}
        <Chapter
          n="01"
          label="The one I owned end to end"
          title="Build with GLM 5.1 — a model launch, run as a builder programme"
          intro="GLM 5.1 was about to launch, and Z.ai needed real use cases to point at. I designed and ran the whole programme backwards from that — the submission bar, the funnel, and the rule that turned every entry into launch material."
          className="mt-20"
        />
        <Reveal className="mt-8" y={24}>
          <ul className="grid gap-5 sm:grid-cols-2">
            <ProgramCard p={PROGRAMS.find((x) => x.weight === 'flagship')!} i={0} />
            <DevpostCard />
          </ul>
        </Reveal>
        <Reveal className="mt-6" y={28}>
          <FlagshipStages />
        </Reveal>
        <Reveal className="mt-8" y={24}>
          <FeaturedProjects />
        </Reveal>

        {/* ── 二 · 全部九场 ─────────────────────────────────────── */}
        <Chapter
          n="02"
          label="The full slate"
          title="Eight more rooms, and what each one was for"
          intro="Different rooms, different jobs — some I owned, some I ran, some I supported. Every number is the public count on that event’s own page."
        />
        <Reveal className="mt-8" y={24}>
          <ProgramMatrix />
        </Reveal>

        {/* ── 三 · 合作方 ──────────────────────────────────────── */}
        <Chapter
          n="03"
          label="Who it was with"
          title="Every program is somebody saying yes first"
          intro="Model labs, communities, funds, venues — sourced, pitched and kept warm. This is the part of program work that never shows up in a photo."
        />
        <Reveal className="mt-8" y={24}>
          <PartnerWall />
        </Reveal>

        {/* ── 四 · 打法 ─────────────────────────────────────────── */}
        <Chapter
          n="04"
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
        <Reveal className="mt-6">
          <p className="text-center font-hand text-[17px] text-plum-muted">
            align thoughtfully · welcome warmly · follow through ✦
          </p>
        </Reveal>

        {/* ── 存档 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-plum/20" />
            <p className="label-text">For the record</p>
          </div>
          <EventPhotos />
        </Reveal>

      </article>
    </main>
  )
}
