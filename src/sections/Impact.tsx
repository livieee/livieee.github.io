import { useState } from 'react'
import { Link } from 'react-router'
import { GlowEdge } from '@/components/GlowEdge'
import { IEEEAwards } from '@/components/IEEEAwards'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { TiltCard } from '@/components/TiltCard'

type Metric = {
  value: string
  label: string
  /** count-up 数字（无则不动画） */
  n?: number
  prefix?: string
  suffix?: string
}

/**
 * 首页只完整展开旗舰那一个案例，其余压成紧凑行 —— 完整目录在 /work。
 * 文案取自原卡片与 /work 索引页，不另写一套，避免两处口径漂移。
 * n 只用作 key —— 不显示编号：这里的顺序和 /work 的编号对不上
 * （那边 05 是 Living Art、06 才是 Yuto），显示出来只会互相矛盾。
 */
const MORE = [
  {
    n: '02',
    eyebrow: 'Enterprise AI Product · Bosch × CMU',
    title: 'Three disconnected tools, one continuous pipeline',
    href: '/work/genai-analytics',
    cta: 'Case study',
  },
  {
    n: '03',
    eyebrow: 'Multi-agent System · Bosch × CMU',
    title: 'Schema Extraction Agents',
    href: '/work/bosch-schema',
    cta: 'Case study',
  },
  {
    n: '04',
    eyebrow: 'GTM & AI Ecosystem Partnerships',
    title: 'Creating spaces where people come to build',
    href: '/work/ai-valley',
    cta: 'Case study',
  },
  {
    n: '05',
    eyebrow: 'Applied AI at Work · Yuto USA',
    title: 'Shipping AI the executive team uses daily',
    href: '/work',
    cta: 'In the index',
  },
]

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
    <span className="rounded-full border border-plum/15 px-2.5 py-[3px] text-[10.5px] font-medium text-plum-muted">
      {children}
    </span>
  )
}

export function Impact() {
  /** Theta 主视觉上跟随光标的 Tap to view 胶囊 */
  const [viewCur, setViewCur] = useState<{ x: number; y: number } | null>(null)
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

        {/* ── Case 1 · AI Product Development — full-width feature ─────────────── */}
        <Reveal className="mt-14" y={36}>
          <TiltCard max={2.5} className="h-full">
            <span
              aria-hidden
              className="absolute -top-3 left-8 z-10 rotate-[-4deg] rounded-md bg-orchid px-2.5 py-0.5 font-hand text-[15px] font-semibold text-white shadow"
            >
              flagship case ✦
            </span>
          <article id="case-theta" className="group/card relative scroll-mt-24 overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-cream-soft to-blush/40 p-7 transition-transform duration-500 md:p-10">
            <GlowEdge />
            <div className="grid gap-8 md:grid-cols-[48fr_52fr]">
              <div className="flex flex-col justify-center">
                <p className="mb-3 flex items-baseline gap-3">
                  <span aria-hidden className="font-serif text-[clamp(2rem,3.4vw,2.9rem)] font-light leading-none text-rose/45">
                    01
                  </span>
                  <span className="label-text">AI Product Development · Theta Health</span>
                </p>
                <h3 className="font-serif text-2xl font-light leading-snug text-plum md:text-[2rem]">
                  Giving clinicians their time back with a 0-to-1 AI Scribe
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-plum-muted">
                  Clinical documentation was eating physicians' days. From 5+ physician
                  interviews to prompt design and workflow mapping, I helped ship a
                  HIPAA-compliant AI Scribe MVP — and land its first clinic pilot.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag>Product discovery</Tag>
                  <Tag>LLM prompt design</Tag>
                  <Tag>HIPAA-compliant infra</Tag>
                  <Tag>Clinical workflow</Tag>
                </div>
                <Link
                  to="/work/theta"
                  className="group/cta mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
                >
                  Read the full case study
                  <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-7">
                {/* 产品主视觉：医生工作台 + SOAP note 叠放（淡插画作背景） */}
                <Link
                  to="/work/theta"
                  className="group/visual relative block cursor-none pb-12 pr-6"
                  aria-label="Theta Care product interface — open the case study"
                  onPointerMove={(e) => {
                    if (e.pointerType === 'touch') return
                    const r = e.currentTarget.getBoundingClientRect()
                    setViewCur({ x: e.clientX - r.left, y: e.clientY - r.top })
                  }}
                  onPointerLeave={() => setViewCur(null)}
                >
                  <img
                    src="/images/case-scribe.jpg"
                    alt=""
                    aria-hidden
                    className="absolute -inset-1 h-full w-full rounded-[1.6rem] object-cover opacity-45 blur-[1.5px] saturate-[0.65]"
                    loading="lazy"
                  />
                  <img
                    src="/theta/ui-dashboard.jpg"
                    alt="Theta Care pre-chart summary — the physician workspace"
                    loading="lazy"
                    className="relative w-[74%] rounded-xl border border-plum/15 shadow-[0_26px_60px_-24px_rgba(90,63,86,0.55)] transition-transform duration-500 group-hover/visual:-translate-y-1"
                  />
                  <img
                    src="/theta/ui-soap.jpg"
                    alt="AI-generated SOAP note, ready to sign in minutes"
                    loading="lazy"
                    className="absolute bottom-0 right-0 w-[36%] rotate-2 rounded-xl border border-plum/15 shadow-[0_22px_48px_-18px_rgba(90,63,86,0.6)] transition-transform duration-500 group-hover/visual:-translate-y-1.5 group-hover/visual:rotate-[3deg]"
                  />
                  {/* 跟随光标的 Tap to view 胶囊 */}
                  {viewCur && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full bg-orchid px-4 py-1.5 font-hand text-[16px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(122,74,133,0.6)]"
                      style={{
                        left: viewCur.x,
                        top: viewCur.y,
                        transform: 'translate(12px, -130%) rotate(3deg)',
                      }}
                    >
                      Tap to view ↗
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* 指标挪到卡底通栏：原本挤在右栏里，把右栏顶得比左栏高一大截，
                左下角因此空出一片。通栏之后两栏等高，标签也能一行放下 */}
            <Metrics
              className="mt-7 border-t border-plum/10 pt-6"
              accent="text-rose"
              items={[
                { value: '83%', n: 83, suffix: '%', label: 'reduction in manual documentation time' },
                { value: '0→1', label: 'MVP launched on compliant infrastructure' },
                { value: '1st', label: 'clinic pilot secured through demand validation' },
              ]}
            />
          </article>
          </TiltCard>
        </Reveal>

        {/* ── 其余四个项目：压成紧凑行 ──────────────────────────────
             首页留一张旗舰卡完整展开就够了；全部六个项目的完整目录在 /work。
             这几行只回答"还有什么、点哪儿看"，不再重复铺媒体与指标。 */}
        <div className="mt-10 border-t border-plum/10">
          {MORE.map((m, i) => (
            <Reveal key={m.n} delay={0.04 + i * 0.06} y={16}>
              <Link
                to={m.href}
                className="group/row flex flex-col gap-2 border-b border-plum/10 py-5 transition-colors hover:bg-white/50 md:flex-row md:items-baseline md:gap-6 md:py-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="label-text block">{m.eyebrow}</span>
                  <span className="mt-1.5 block font-serif text-[17px] font-light leading-snug text-plum md:text-[19px]">
                    {m.title}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-[12.5px] font-medium text-plum-muted transition-colors group-hover/row:text-plum">
                  <span
                    aria-hidden
                    className="block h-px w-5 bg-plum/25 transition-all duration-500 group-hover/row:w-9 group-hover/row:bg-rose"
                  />
                  {m.cta}
                </span>
              </Link>
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
