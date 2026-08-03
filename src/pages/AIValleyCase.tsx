import { useState } from 'react'
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
  href: string
  /** luma 封面 */
  cover: string
  /** 关联的 LinkedIn 帖：点击卡片内展开 */
  post?: {
    label: string
    author?: string
    avatar?: string | null
    sub?: string
    text: string
    stats: string
    href: string
  }
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
    role: 'Owned it end to end — brought Z.ai in, wrote the builder guide and the judging bar, ran the Discord and the outbound.',
    partners: 'Z.ai · AI Valley · Devpost',
    caps: ['Program ownership', 'Developer relations', 'GTM', 'Strategic partnerships'],
    tier: 1,
    href: 'https://luma.com/32jfoybh',
    cover: '/events/luma/glm.jpg',
    post: {
      label: 'I wrote the launch post',
      text: 'Most people talk about AI. This is where you actually build with it.\n\nGLM 5.1 is here, and we’re kicking off a 1-week global builder sprint to see what people can really do with it. No pitches. No fluff. Just builders shipping real things.',
      stats: '7 reactions · 1 comment',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7445973511577440256',
    },
    lead: true,
  },
  {
    name: '2026 GTC Fireside Talk — What’s next in AI?',
    where: 'Palo Alto',
    size: '413 attendees · 20+ speakers',
    n: 413,
    badge: 'Co-host',
    role: 'Co-host. Found the partners, invited the panel, and researched every guest beforehand so the questions were specific.',
    partners: 'EPIC Connector · Peak Mojo · Manycore Tech · Z.ai',
    caps: ['Strategic partnerships', 'Community', 'Program ownership'],
    tier: 2,
    href: 'https://luma.com/GTCTALK',
    cover: '/events/luma/gtc-talk.jpg',
  },
  {
    name: 'Build What You Love — Women in Tech Hackathon',
    where: 'San Francisco · hybrid',
    size: '422 attended',
    n: 422,
    badge: 'Program Manager · Volunteer',
    role: 'Program manager — ran the program, and issued the volunteer certificates afterwards.',
    partners: 'AI Valley · Bond AI · Replit · Vercel · Daytona · MiniMax · BEM',
    caps: ['Program ownership', 'Community'],
    tier: 2,
    href: 'https://luma.com/ic3l89gi',
    cover: '/events/luma/women.jpg',
    post: {
      label: 'The organiser’s write-up',
      author: 'Courtney Ko',
      avatar: null,
      sub: 'AI Valley · organiser of Build What You Love',
      text: '150+ women in one room in San Francisco, building on Valentine’s Day. Spaces where women in STEM felt supported, confident, and ambitious — women who showed up not to impress anyone, but to build what they love.\n\nVolunteers: Olivia Xiao, Kathy Men, Amy Wang, Uche Oh, Andrew Flores.',
      stats: '215 reactions · 59 comments',
      href: 'https://www.linkedin.com/posts/courtneythko_womenintech-buildwhatyoulove-aivalley-activity-7429241914459303938-4MG5',
    },
  },
  {
    name: '2026 GTC AI Demo Day',
    where: 'San Francisco',
    size: '594 registered · 40+ VC firms',
    n: 594,
    badge: 'Co-host',
    role: 'Co-host of the founder showcase — main-stage pitches in front of 40+ funds.',
    partners: 'EPIC Connector × Allscale · FounderGro',
    caps: ['GTM', 'Strategic partnerships'],
    tier: 3,
    href: 'https://luma.com/GTCDEMODAY',
    cover: '/events/luma/gtc-demoday.jpg',
  },
  {
    name: 'AI Valley × Molly Tea Pop-Up',
    where: 'Palo Alto',
    size: '100 builders hosted',
    n: 100,
    badge: 'Program Lead',
    role: 'Lead organiser. A pop-up with no agenda — 100 cups of tea as the reason for builders in Palo Alto to be in one room.',
    partners: 'AI Valley · Molly Tea',
    caps: ['Community', 'GTM'],
    tier: 2,
    href: 'https://luma.com/puy9vbok',
    cover: '/events/luma/molly-tea.jpg',
  },
  {
    name: 'Humanity & AGI Summit 2026',
    where: 'Stanford Faculty Club',
    size: '448 attendees · Yuval Noah Harari keynote',
    n: 448,
    badge: 'Independent Support',
    role: 'Came back to help organise after the AI Valley program ended — my own side project, on a bill opened by Yuval Noah Harari.',
    partners: 'AIRA · GPT DAO · Cheetah Community · LOOMUS · EpicConnector',
    caps: ['Community'],
    tier: 3,
    href: 'https://luma.com/wkolq6uc',
    cover: '/events/luma/agi-summit.jpg',
  },
  {
    name: 'MiniMax AI Founder Day @ GTC',
    where: 'San Francisco',
    size: '839 attendees · 9 speakers',
    n: 839,
    badge: 'Day-of Support',
    role: 'Day-of coordination — keeping a nine-speaker agenda and an 839-person room running on time.',
    partners: 'The AI Collective · AI Valley · MiniMax',
    caps: ['Community'],
    tier: 3,
    href: 'https://luma.com/aic-sf-3-21?tk=C8DbIO',
    cover: '/events/luma/minimax.jpg',
  },
  {
    name: 'Global Builders Salon — private mixer',
    where: 'San Francisco',
    size: '100 seats, approval only',
    n: 100,
    badge: 'Program Coordination',
    role: 'Program coordination for an approval-only mixer — first-generation builders, and an immigration lawyer on hand.',
    partners: 'AI Valley · HAC.ai · Boundless Immigration',
    caps: ['Community', 'Strategic partnerships'],
    tier: 3,
    href: 'https://luma.com/6re61lly',
    cover: '/events/luma/builders-salon.jpg',
  },
  {
    name: 'Total Agent Recall Hackathon',
    where: 'Sky9 Capital, San Francisco',
    size: '358 registered · 50 engineers, 8 hours',
    n: 358,
    badge: 'Marketing & Partner Ops',
    role: 'Ran marketing and sponsor coordination — including the perk creative that turned a sponsor into a sign-up incentive — then kept judging aligned across Dify, GMI Cloud and HydraDB on the day.',
    partners: 'GMI Cloud · Photon · HydraDB · Dify',
    caps: ['GTM', 'Strategic partnerships', 'Community'],
    tier: 3,
    href: 'https://luma.com/snixr7yb',
    cover: '/events/luma/agent-recall.jpg',
    post: {
      label: 'I wrote the recruiting post',
      text: 'A build day for ~50 engineers working on agent systems. Come in with an idea, leave with a working agent.\n\nNVIDIA GPUs, 170+ models, Dify for orchestration, HydraDB for memory. Judges from Microsoft, Amazon and YC. Mac Mini for the grand prize.\n\nFirst 20 AI Valley members through the door get a branded mug. Small room: fills fast.',
      stats: '19 reactions · 4 comments',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7443396471057485824',
    },
  },
]



function ProgramCard({ p, i }: { p: Program; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <li
      style={{ animation: `annot-in .4s ${i * 0.05}s ease-out both` }}
      className={`group/p flex flex-col overflow-hidden rounded-[1.4rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgba(58,36,64,0.4)] ${
        p.lead
          ? 'border-rose/40 bg-rose/[0.05] hover:border-rose/60 sm:col-span-2'
          : 'border-plum/10 bg-white/60 hover:border-plum/25 hover:bg-white'
      }`}
    >
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden"
        aria-label={`${p.name} — open the event page`}
      >
        <img
          src={p.cover}
          alt=""
          aria-hidden
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 group-hover/p:scale-[1.03] ${
            p.lead ? 'aspect-[3/1]' : 'aspect-[2/1]'
          }`}
        />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-plum shadow-sm backdrop-blur">
          Luma <span aria-hidden>↗</span>
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[17px] font-light leading-snug text-plum">{p.name}</h3>
          <span className="shrink-0 text-right">
            <span className="block font-serif text-xl font-light leading-none text-rose">
              {p.n?.toLocaleString()}
            </span>
            <span className="mt-1 block text-[10.5px] leading-tight text-plum-faint">
              {p.size.replace(/^[\d,]+\s*/, '')}
            </span>
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-snug text-plum-faint">
          {p.where} · {p.partners}
        </p>
        <span
          className={`mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-[3px] text-[10.5px] font-medium tracking-wide ${
            p.tier === 1
              ? 'bg-rose/15 text-rose'
              : p.tier === 2
                ? 'bg-orchid/15 text-orchid'
                : 'bg-plum/[0.07] text-plum-muted'
          }`}
        >
          {p.badge}
        </span>
        {p.role && <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{p.role}</p>}
        {p.post && (
          <div className="mt-auto pt-3.5">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0A66C2] transition-opacity hover:opacity-75"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
              </svg>
              {p.post.label}
              <span aria-hidden className={`inline-block transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {open && (
              <div className="mt-3">
                <LinkedInPost
                  text={p.post.text}
                  stats={p.post.stats}
                  href={p.post.href}
                  author={p.post.author}
                  avatar={p.post.avatar}
                  sub={p.post.sub}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

function ProgramMatrix() {
  const [cap, setCap] = useState<string | null>(null)
  const shown = cap ? PROGRAMS.filter((p) => p.caps.includes(cap)) : PROGRAMS

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCap(null)}
          className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
            cap === null
              ? 'border-transparent bg-plum text-cream'
              : 'border-plum/15 bg-white/70 text-plum-muted hover:text-plum'
          }`}
        >
          All nine
        </button>
        {CAPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCap(cap === c ? null : c)}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
              cap === c
                ? 'border-transparent bg-plum text-cream'
                : 'border-plum/15 bg-white/70 text-plum-muted hover:text-plum'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {shown.map((p, i) => (
          <ProgramCard key={p.name} p={p} i={i} />
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="mt-6 font-hand text-[15px] text-plum-muted">nothing tagged with that yet ✦</p>
      )}
    </div>
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
const PANELS = [
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
  },
]

function RunOfShow() {
  return (
    <div className="rounded-[1.6rem] border border-plum/10 bg-white/70 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          And then the night has to run
        </p>
        <p className="font-hand text-[15px] text-plum-muted">from the guest brief ✦</p>
      </div>

      <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-plum-muted">
        Three hours, three panels, fourteen speakers. Inviting them is the easy half — every panel
        also shipped with its own set of prepared questions, so no one repeated the same intro and
        the conversation went somewhere specific.
      </p>

      <figure className="mt-5">
        <div className="overflow-hidden rounded-[1.1rem] border border-plum/10">
          <img
            src="/events/gtc-fireside.jpg"
            alt="Panel 3 of the 2026 GTC Fireside Talk in progress — four speakers on stage, the screen behind them reading Beyond the Horizon: Next Frontier of AI"
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2 px-1">
          <span className="text-[12px] text-plum-faint">
            Panel 3 running — Palo Alto, 16 March 2026
          </span>
          <span className="font-hand text-[14px] text-plum-muted">7:50 on the sheet ✦</span>
        </figcaption>
      </figure>

      <ol className="mt-6 space-y-2">
        {PANELS.map((p, i) => (
          <li
            key={p.k}
            style={{ animation: `annot-in .45s ${i * 0.07}s ease-out both` }}
            className="flex flex-col gap-2 rounded-[1.1rem] border border-plum/10 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
          >
            <span className="shrink-0 font-serif text-[15px] leading-none text-rose sm:w-14">
              {p.t}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-medium leading-snug text-plum">{p.k}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-plum-faint">{p.v}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-plum/[0.06] px-2.5 py-1 text-[11px] text-plum-muted">
                {p.n} speakers
              </span>
              {p.q > 0 && (
                <span className="rounded-full bg-rose/10 px-2.5 py-1 text-[11px] text-rose">
                  {p.q} questions prepped
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-4 border-t border-plum/10 pt-3.5 text-[12px] text-plum-faint">
        2026 GTC Fireside Talk · Palo Alto · 5:30–8:30 PM · 413 attendees
      </p>
    </div>
  )
}

/* ── 合作方名录：strategic partnership 的直接证据 ──────────────── */
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
    cap: 'Build What You Love · Women in Tech Hackathon — San Francisco, 14 February 2026',
  },
  {
    src: '/events/photostrip.jpg',
    alt: 'Two printed photo-booth strips from Build What You Love, branded with the AI Valley, bem and MiniMax logos',
    cap: 'Photo-booth strips — sponsor branding people actually took home',
  },
  {
    src: '/events/gmi-perk.jpg',
    alt: 'Sponsor perk graphic — a GMI-branded tumbler held up in the GMI Cloud office, captioned “First 20 AI Valley sign-ups get a FREE GMI MUG!”',
    cap: 'Sponsor perk creative I made for GMI Cloud — Total Agent Recall Hackathon',
  },
]

function EventPhotos() {
  if (PHOTOS.length === 0) return null
  return (
    <div className={`grid items-stretch gap-4 ${PHOTOS.length > 1 ? 'sm:grid-cols-3' : ''}`}>
      {PHOTOS.map((ph) => (
        <figure key={ph.src} className="flex flex-col overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white p-3">
          <img src={ph.src} alt={ph.alt} loading="lazy" className="aspect-[4/3] w-full rounded-[1rem] object-cover" />
          <figcaption className="mt-2.5 px-1 text-[12px] text-plum-faint">{ph.cap}</figcaption>
        </figure>
      ))}
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
            A program has users, a funnel and a retention problem, same as any product — so I ran
            them that way. Source the partner before the date. Design what winning means. Write the
            bar down before anyone shows up. Close the loop afterwards, so the next one starts warm
            instead of cold.
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
        <Reveal className="mt-8" y={28}>
          <FlagshipStages />
        </Reveal>
        <Reveal className="mt-8" y={24}>
          <FeaturedProjects />
        </Reveal>
        <Reveal className="mt-5">
          <div className="flex flex-wrap gap-2">
            <a
              href="https://build-with-glm-5-1-challenge.devpost.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              Devpost <span aria-hidden>↗</span>
            </a>
            <a
              href="https://luma.com/32jfoybh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              Event page <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>

        {/* ── 二 · 全部九场 ─────────────────────────────────────── */}
        <Chapter
          n="02"
          label="The full slate"
          title="Nine programs, and what each one was for"
          intro="Different rooms, different jobs — some I owned, some I ran, some I kept aligned from the side. Filter by what the work actually was; every number is the public count on that event’s own page."
        />
        <Reveal className="mt-8" y={24}>
          <ProgramMatrix />
        </Reveal>

        {/* ── 三 · 工作痕迹 ─────────────────────────────────────── */}
        <Chapter
          n="03"
          label="The paper trail"
          title="What running one actually looks like"
          intro="The recruiting posts live on their program cards above — this is the other half of the paper trail: the minute-by-minute speaker guide that keeps a twenty-speaker night on rails."
        />
        <Reveal className="mt-8" y={24}>
          <RunOfShow />
        </Reveal>

        {/* ── 四 · 合作方 ──────────────────────────────────────── */}
        <Chapter
          n="04"
          label="Who it was with"
          title="Every program is somebody saying yes first"
          intro="Model labs, communities, funds, venues — sourced, pitched and kept warm. This is the part of program work that never shows up in a photo."
        />
        <Reveal className="mt-8" y={24}>
          <PartnerWall />
        </Reveal>

        {/* ── 五 · 打法 ─────────────────────────────────────────── */}
        <Chapter
          n="05"
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

        {/* ── 收尾 ─────────────────────────────────────────────── */}
        <Reveal className="mt-24">
          <div className="rounded-[1.8rem] border border-plum/10 bg-white/60 px-7 py-10 text-center md:px-12 md:py-14">
            <h2 className="mx-auto max-w-2xl font-serif text-[clamp(1.5rem,3.4vw,2.2rem)] font-light leading-snug text-plum">
              The work I enjoy most happens between a promising idea{' '}
              <span className="italic text-orchid">and the people who can help it grow.</span>
            </h2>
            <div className="mx-auto mt-9 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
              {[
                { k: 'For AI companies', v: 'A clearer path to the right builders' },
                { k: 'For partners', v: 'A thoughtful reason to collaborate' },
                { k: 'For communities', v: 'Spaces where participation feels meaningful' },
              ].map((c) => (
                <div key={c.k}>
                  <p className="text-[11px] uppercase tracking-label text-plum-faint">{c.k}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-plum">{c.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#contact"
                className="rounded-full bg-plum px-6 py-3 text-[13.5px] font-medium text-cream transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a conversation →
              </Link>
              <Link
                to="/#impact"
                className="rounded-full border border-plum/15 bg-white px-6 py-3 text-[13.5px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                Back to selected work
              </Link>
            </div>
          </div>
        </Reveal>

      </article>
    </main>
  )
}
