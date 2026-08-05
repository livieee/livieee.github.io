import { Link } from 'react-router'
import { GlowEdge } from '@/components/GlowEdge'
import { IEEEAwards } from '@/components/IEEEAwards'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { TiltCard } from '@/components/TiltCard'
import { ProgramWall } from '@/components/ProgramWall'
import { DailyReportCard } from '@/components/DailyReportCard'

type Metric = {
  value: string
  label: string
  /** count-up 数字（无则不动画） */
  n?: number
  prefix?: string
  suffix?: string
}

function Metrics({ items, accent, className = '' }: { items: Metric[]; accent: string; className?: string }) {
  return (
    <dl className={`grid grid-cols-3 gap-5 ${className}`}>
      {items.map((m, i) => (
        <div key={m.label} className="group/metric">
          <dt className="sr-only">{m.label}</dt>
          <dd className={`font-serif text-[26px] font-light leading-none md:text-[30px] ${accent}`}>
            {m.n !== undefined ? (
              <CountUp prefix={m.prefix} value={m.n} suffix={m.suffix} delay={i * 0.12} />
            ) : (
              m.value
            )}
          </dd>
          {/* 马克笔下划线：数字滚动时同步描绘 */}
          <span
            className={`mt-1.5 block h-[2px] w-full origin-left rounded-full bg-current opacity-25 ${accent}`}
            style={{
              transform: 'scaleX(0)',
              animation: `metric-underline 0.6s ${0.35 + i * 0.12}s ease-out forwards`,
            }}
          />
          <dd className="mt-1.5 text-[11.5px] leading-snug text-plum-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-plum/15 px-2.5 py-[2px] text-[10px] font-medium text-plum-muted">
      {children}
    </span>
  )
}

/**
 * 四个案例的数据。原来 01/02 是通栏大卡、03/04 才并排，三种尺寸混在一起；
 * 统一成一排两个之后节奏一致、整段也短得多。
 * 文案、指标、标签全部沿用原卡片，一句没改。
 */
const CASES = [
  {
    id: 'case-theta',
    n: '01',
    eyebrow: 'AI Product Development · Theta Health',
    title: 'Giving clinicians their time back with a 0-to-1 AI Scribe',
    body:
      "Clinical documentation was eating physicians' days. From 5+ physician interviews to prompt design and workflow mapping, I helped ship a HIPAA-compliant AI Scribe MVP — and land its first clinic pilot.",
    tags: ['Product discovery', 'LLM prompt design', 'HIPAA-compliant infra', 'Clinical workflow'],
    metrics: [
      { value: '83%', n: 83, suffix: '%', label: 'reduction in manual documentation time' },
      { value: '0→1', label: 'MVP launched on compliant infrastructure' },
      { value: '1st', label: 'clinic pilot secured through demand validation' },
    ],
    accent: 'text-rose',
    bg: 'bg-gradient-to-br from-cream-soft to-blush/40',
    href: '/work/theta',
    cta: 'Read the full case study',
    badge: { text: 'flagship case ✦', bg: '#B98ACB', side: 'left-8', tilt: 'rotate-[-4deg]' },
    media: <img src="/covers/theta.jpg" alt="" aria-hidden loading="lazy" className="aspect-[21/9] w-full rounded-[1.1rem] border border-plum/10 object-cover" />,
  },
  {
    id: 'case-askdata',
    n: '02',
    eyebrow: 'Enterprise AI Product',
    title: 'Three disconnected tools, one continuous pipeline',
    body:
      'Enterprise teams lost the thread between query, analysis and charts. I designed the workspace that holds it — so the answer never has to be re-explained.',
    tags: ['Product Strategy', 'Workflow Design', 'MVP Definition', 'PRDs'],
    metrics: [
      { value: '80%+', n: 80, suffix: '%+', label: 'manual analytics workflows streamlined' },
      { value: '3→1', label: 'tools folded into one workspace' },
      { value: 'PRD', label: 'specs shipped to engineering' },
    ],
    accent: 'text-[#4E6E96]',
    bg: 'bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40',
    href: '/work/genai-analytics',
    cta: 'Explore the platform',
    badge: { text: 'built with Bosch ✦', bg: '#4E6E96', side: 'left-8', tilt: 'rotate-[-3deg]' },
    logos: (
      <div className="mb-3 flex items-center gap-3">
        <img src="/logos/bosch-wordmark.png" alt="Bosch" className="h-[18px] w-auto" />
        <span aria-hidden className="font-hand text-[15px] text-plum-faint">×</span>
        <img src="/logos/cmu-mark.png" alt="Carnegie Mellon University" className="h-[24px] w-auto" />
      </div>
    ),
    // 原来这里放可交互的 AskDataUI，但它在半宽卡里有 481px 高，
    // 把整行撑到 949 —— 演示留在案例页，首页用裁好的真实界面图
    media: <img src="/covers/askdata.jpg" alt="" aria-hidden loading="lazy" className="aspect-[21/9] w-full rounded-[1.1rem] border border-plum/10 object-cover" />,
  },
  {
    id: 'case-aivalley',
    n: '03',
    eyebrow: 'GTM & AI Ecosystem Partnerships',
    title: 'Creating spaces where people come to build',
    body:
      'From global builder challenges to Bay Area hackathons and founder conversations, I shape thoughtful programs that connect partner goals with builders and communities around ideas worth building.',
    tags: ['Ecosystem Partnerships', 'Developer Programs', 'Program Strategy'],
    metrics: [
      { value: '9', n: 9, label: 'selected programs' },
      { value: '221', n: 221, label: 'builders in a flagship challenge' },
      { value: 'E2E', label: 'flagship program ownership' },
    ],
    accent: 'text-rose',
    bg: 'bg-gradient-to-br from-lavender/60 to-cream-soft',
    href: '/work/ai-valley',
    cta: 'Explore programs',
    badge: { text: 'programs are products too', bg: '#CE7E9E', side: 'right-8', tilt: 'rotate-[3deg]' },
    media: <ProgramWall />,
  },
  {
    id: 'case-yuto',
    n: '04',
    eyebrow: 'Applied AI at Work · Yuto USA',
    title: 'Shipping AI the executive team uses daily',
    body:
      'At an advanced-materials company, I shipped a 0-to-1 forecasting product to production — built solo with agentic coding, fully traceable, with human override — now in daily use by the executive team.',
    tags: ['Agentic coding', 'Technical program management', 'Market & GTM research'],
    metrics: [
      { value: '7.5%', n: 7.5, suffix: '%', label: 'one-month forecast error, down from 9.2%' },
      { value: '100+', n: 100, suffix: '+', label: 'attendees at the showcase I delivered' },
      { value: '5+', n: 5, suffix: '+', label: 'concurrent workstreams run' },
    ],
    accent: 'text-orchid',
    bg: 'bg-cream border border-plum/10',
    href: '/work',
    cta: 'See it in the index',
    media: <DailyReportCard />,
  },
]

export function Impact() {
  return (
    <section id="impact" className="relative bg-white/50">
      {/* 顶部延续 Hero 的方格纸语言，向下淡出 */}
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.3]"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="label-text mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            Selected Impact
          </p>
        </Reveal>
        <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="Work that moved products, people, and programs forward." />
        </h2>
        <Reveal delay={0.12}>
          <p className="mt-4 font-hand text-[18px] text-plum-muted md:text-[19px]">
            five chapters, one throughline —{' '}
            <span className="text-orchid">make it adopted, not just shipped ✦</span>
          </p>
        </Reveal>

        {/* ── 四个案例，统一成一排两个 ──────────────────────────────
             原来 01 / 02 是通栏大卡、03 / 04 才并排，三种尺寸混在一起，
             整段读下来就显得很长。统一成 2×2 之后节奏一致，也更短。
             每张卡的形状相同：媒体 → 编号+类别 → 标题 → 一段 → 指标 → 标签 → CTA。 */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-7">
          {CASES.map((c, i) => (
            <Reveal key={c.id} y={30} delay={0.04 + i * 0.06}>
              <TiltCard className="h-full">
                {c.badge && (
                  <span
                    aria-hidden
                    className={`absolute -top-3 z-10 rounded-md px-2.5 py-0.5 font-hand text-[13.5px] font-semibold text-white shadow ${c.badge.side} ${c.badge.tilt}`}
                    style={{ backgroundColor: c.badge.bg }}
                  >
                    {c.badge.text}
                  </span>
                )}
                <article
                  id={c.id}
                  className={`group/card relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[1.6rem] p-6 transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_28px_60px_-28px_rgba(58,36,64,0.42)] md:p-7 ${c.bg}`}
                >
                  <GlowEdge />
                  <div className="mb-5">{c.media}</div>

                  <p className="mb-3 flex items-baseline gap-3">
                    <span aria-hidden className="font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] font-light leading-none text-rose/45">
                      {c.n}
                    </span>
                    <span className="label-text">{c.eyebrow}</span>
                  </p>

                  {c.logos}

                  <h3 className="font-serif text-[19px] font-light leading-snug text-plum md:text-[21px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-plum-muted">{c.body}</p>

                  <div className="mt-4">
                    <Metrics accent={c.accent} items={c.metrics} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  {/* mt-auto：CTA 钉在卡底，两张卡内容不等长时按钮也在同一条线上 */}
                  <Link
                    to={c.href}
                    className="group/cta mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-plum px-5 py-2.5 pt-2.5 text-[13px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5"
                    style={{ marginTop: 'auto', paddingTop: '0.625rem' }}
                  >
                    <span className="pt-0">{c.cta}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
                  </Link>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* 首页这一段是叙事；想扫读全部项目就去 /work */}
        <Reveal className="mt-10" y={20}>
          <Link
            to="/work"
            className="group/all inline-flex items-center gap-3 text-[13.5px] font-medium text-plum-muted transition-colors hover:text-plum"
          >
            <span
              aria-hidden
              className="block h-px w-8 bg-plum/25 transition-all duration-500 group-hover/all:w-12 group-hover/all:bg-rose"
            />
            See all six projects
            <span aria-hidden className="transition-transform duration-300 group-hover/all:translate-x-0.5">→</span>
          </Link>
        </Reveal>

        {/* ── Recognition · IEEE Rising Stars 2026 ───────────────────────── */}
        <Reveal className="mt-8" y={36}>
          <IEEEAwards />
        </Reveal>
      </div>
    </section>
  )
}
