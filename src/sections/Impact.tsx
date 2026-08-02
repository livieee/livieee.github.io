import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { TiltCard } from '@/components/TiltCard'
import { AskDataUI } from '@/components/AskDataUI'
import { ProgramWall } from '@/components/ProgramWall'

type Metric = {
  value: string
  label: string
  /** count-up 数字（无则不动画） */
  n?: number
  prefix?: string
  suffix?: string
}

function Metrics({ items, accent }: { items: Metric[]; accent: string }) {
  return (
    <dl className="grid grid-cols-3 gap-6">
      {items.map((m, i) => (
        <div key={m.label} className="group/metric">
          <dt className="sr-only">{m.label}</dt>
          <dd className={`font-serif text-3xl font-light md:text-4xl ${accent}`}>
            {m.n !== undefined ? (
              <CountUp prefix={m.prefix} value={m.n} suffix={m.suffix} delay={i * 0.12} />
            ) : (
              m.value
            )}
          </dd>
          {/* 马克笔下划线：数字滚动时同步描绘 */}
          <span
            className={`mt-1 block h-[3px] w-full origin-left rounded-full bg-current opacity-25 ${accent}`}
            style={{
              transform: 'scaleX(0)',
              animation: `metric-underline 0.6s ${0.35 + i * 0.12}s ease-out forwards`,
            }}
          />
          <dd className="mt-2 text-[12px] leading-snug text-plum-muted">{m.label}</dd>
        </div>
      ))}
    </dl>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-plum/15 px-3 py-1 text-[11px] font-medium text-plum-muted">
      {children}
    </span>
  )
}

export function Impact() {
  /** Theta 主视觉上跟随光标的 Tap to view 胶囊 */
  const [viewCur, setViewCur] = useState<{ x: number; y: number } | null>(null)
  /** AskData 演示区跟随光标的 Tap to explore 胶囊 */
  const [askCur, setAskCur] = useState<{ x: number; y: number } | null>(null)
  /** Multi-agent 长条入口跟随光标的 View project 胶囊 */
  const [archCur, setArchCur] = useState<{ x: number; y: number } | null>(null)
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
      <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
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
        <Reveal className="mt-20" y={36}>
          <TiltCard max={2.5} className="h-full">
            <span
              aria-hidden
              className="absolute -top-3 left-8 z-10 rotate-[-4deg] rounded-md bg-orchid px-2.5 py-0.5 font-hand text-[15px] font-semibold text-white shadow"
            >
              flagship case ✦
            </span>
          <article id="case-theta" className="group/card relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-soft to-blush/40 p-8 transition-transform duration-500 md:p-14">
            <div className="grid gap-10 md:grid-cols-[48fr_52fr]">
              <div className="flex flex-col justify-center">
                <p className="label-text mb-4">01 · AI Product Development · Theta Health</p>
                <h3 className="font-serif text-2xl font-light leading-snug text-plum md:text-[2rem]">
                  Giving clinicians their time back with a 0-to-1 AI Scribe
                </h3>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-plum-muted">
                  Clinical documentation was eating physicians' days. From 5+ physician
                  interviews to prompt design and workflow mapping, I helped ship a
                  HIPAA-compliant AI Scribe MVP — and land its first clinic pilot.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
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
                    className="relative w-[86%] rounded-xl border border-plum/15 shadow-[0_26px_60px_-24px_rgba(90,63,86,0.55)] transition-transform duration-500 group-hover/visual:-translate-y-1"
                  />
                  <img
                    src="/theta/ui-soap.jpg"
                    alt="AI-generated SOAP note, ready to sign in minutes"
                    loading="lazy"
                    className="absolute bottom-0 right-0 w-[40%] rotate-2 rounded-xl border border-plum/15 shadow-[0_22px_48px_-18px_rgba(90,63,86,0.6)] transition-transform duration-500 group-hover/visual:-translate-y-1.5 group-hover/visual:rotate-[3deg]"
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
                <Metrics
                  accent="text-rose"
                  items={[
                    { value: '83%', n: 83, suffix: '%', label: 'reduction in manual documentation time' },
                    { value: '0→1', label: 'MVP launched on compliant infrastructure' },
                    { value: '1st', label: 'clinic pilot secured through demand validation' },
                  ]}
                />
              </div>
            </div>
          </article>
          </TiltCard>
        </Reveal>

        {/* ── Case 2 · Enterprise AI Product — AskData / Bosch × CMU ─────────── */}
        <Reveal className="mt-10" y={36}>
          <TiltCard max={2} className="h-full">
            <span
              aria-hidden
              className="absolute -top-3 left-8 z-10 rotate-[-3deg] rounded-md bg-[#4E6E96] px-2.5 py-0.5 font-hand text-[14px] font-semibold text-white shadow"
            >
              built with Bosch ✦
            </span>
            <article id="case-askdata" className="group/card relative scroll-mt-24 rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-8 transition-transform duration-500 md:p-14">
              <div className="grid items-center gap-12 md:grid-cols-12">
                {/* 视觉：AskData UI（移动端先展示），整块可点击直达详情页 */}
                <div className="order-1 md:col-span-8">
                  <Link
                    to="/work/genai-analytics"
                    aria-label="Explore the platform"
                    className="group/demo relative block cursor-none rounded-2xl transition-transform duration-300 hover:scale-[1.01]"
                    onPointerMove={(e) => {
                      if (e.pointerType === 'touch') return
                      const r = e.currentTarget.getBoundingClientRect()
                      setAskCur({ x: e.clientX - r.left, y: e.clientY - r.top })
                    }}
                    onPointerLeave={() => setAskCur(null)}
                  >
                    <AskDataUI />
                    {/* 跟随光标的 Tap to explore 胶囊 */}
                    {askCur && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full bg-[#4E6E96] px-4 py-1.5 font-hand text-[16px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(78,110,150,0.6)]"
                        style={{
                          left: askCur.x,
                          top: askCur.y,
                          transform: 'translate(12px, -130%) rotate(3deg)',
                        }}
                      >
                        Tap to explore ↗
                      </span>
                    )}
                  </Link>

                  {/* 姊妹项目：窗口下方的轻量长条入口 */}
                  <div className="mt-6 flex justify-center md:justify-start">
                    <Link
                      to="/work/bosch-schema"
                      className="group/arch relative inline-flex max-w-full cursor-none items-center gap-5 rounded-full border border-plum/10 bg-white/80 py-3.5 pl-6 pr-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7FA3CC]/60 hover:bg-white hover:shadow-[0_16px_34px_-14px_rgba(78,110,150,0.45)]"
                      onPointerMove={(e) => {
                        if (e.pointerType === 'touch') return
                        const r = e.currentTarget.getBoundingClientRect()
                        setArchCur({ x: e.clientX - r.left, y: e.clientY - r.top })
                      }}
                      onPointerLeave={() => setArchCur(null)}
                    >
                      {/* 迷你管线图 */}
                      <svg viewBox="0 0 116 34" className="hidden w-32 shrink-0 sm:block" aria-hidden>
                        {[1, 12, 23].map((y, i) => (
                          <rect key={i} x="1" y={y} width="20" height="8" rx="3" fill="#EFF5FB" stroke="#7FA3CC" strokeWidth="1" />
                        ))}
                        {[5, 16, 27].map((y, i) => (
                          <path key={i} d={`M21 ${y} C 34 ${y}, 36 16, 46 16`} fill="none" stroke="#B9CDE4" strokeWidth="1.1" />
                        ))}
                        <circle cx="56" cy="16" r="9" fill="#DCE7F2" stroke="#4E6E96" strokeWidth="1.1" />
                        <path d="M65 16 H76" fill="none" stroke="#B9CDE4" strokeWidth="1.1" />
                        <path d="m76 16 4.5-2.7v5.4Z" fill="#B9CDE4" />
                        <rect x="82" y="8" width="33" height="16" rx="5" fill="#F6EFE8" stroke="#D193A8" strokeWidth="1" />
                        <text x="98" y="19" textAnchor="middle" fontSize="7.5" fill="#8A6E7E">✓</text>
                      </svg>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                          Also under this collaboration
                        </span>
                        <span className="mt-0.5 block truncate font-serif text-[17px] leading-snug text-plum">
                          Schema Extraction Agents
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-plum-muted">
                          Solution Architect · 56.6% → 97.2% accuracy
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 font-serif text-xl text-[#7FA3CC] transition-transform duration-300 group-hover/arch:translate-x-1"
                      >
                        ↗
                      </span>
                      {/* 跟随光标的 View project 胶囊 */}
                      {archCur && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full bg-[#4E6E96] px-4 py-1.5 font-hand text-[16px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(78,110,150,0.6)]"
                          style={{
                            left: archCur.x,
                            top: archCur.y,
                            transform: 'translate(12px, -130%) rotate(3deg)',
                          }}
                        >
                          View project ↗
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* 文案 */}
                <div className="order-2 md:col-span-4">
                  <p className="label-text mb-3">02 · Enterprise AI Product</p>
                  {/* 合作双方 logo */}
                  <div className="mb-5 flex items-center gap-3">
                    <img src="/logos/bosch-wordmark.png" alt="Bosch" className="h-[22px] w-auto" />
                    <span aria-hidden className="font-hand text-[17px] text-plum-faint">×</span>
                    <img src="/logos/cmu-mark.png" alt="Carnegie Mellon University" className="h-[30px] w-auto" />
                  </div>
                  <h3 className="font-serif text-2xl font-light leading-snug text-plum md:text-[1.9rem]">
                    Three disconnected tools, one continuous pipeline
                  </h3>
                  <p className="mt-5 text-[15px] leading-relaxed text-plum-muted">
                    Enterprise teams lost the thread between query, analysis and charts. I designed
                    the workspace that holds it — so the answer never has to be re-explained.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Tag>Product Strategy</Tag>
                    <Tag>Workflow Design</Tag>
                    <Tag>MVP Definition</Tag>
                    <Tag>PRDs</Tag>
                  </div>
                  <div className="mt-8">
                    <dd className="font-serif text-4xl font-light text-[#4E6E96] md:text-5xl">
                      <CountUp value={80} suffix="%+" />
                    </dd>
                    <span
                      className="mt-1 block h-[3px] w-24 origin-left rounded-full bg-[#7FA3CC] opacity-40"
                      style={{ transform: 'scaleX(0)', animation: 'metric-underline 0.6s 0.35s ease-out forwards' }}
                    />
                    <dd className="mt-2 text-[12px] leading-snug text-plum-muted">
                      manual analytics workflows streamlined
                    </dd>
                  </div>
                  <Link
                    to="/work/genai-analytics"
                    className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4E6E96]"
                  >
                    Explore the platform
                    <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
                  </Link>
                </div>

              </div>
            </article>
          </TiltCard>
        </Reveal>

        {/* ── Case 3 + 4 · 生态项目 与 企业分析，一行两张 ─────────────────────── */}
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* ── Case 3 · GTM & AI Ecosystem Partnerships ──────────────────────── */}
          <Reveal y={36} delay={0.05}>
            <TiltCard className="h-full">
              <span
                aria-hidden
                className="absolute -top-3 right-8 z-10 rotate-[3deg] rounded-md bg-rose px-2.5 py-0.5 font-hand text-[14px] font-semibold text-white shadow"
              >
                programs are products too
              </span>
              <article
                id="case-aivalley"
                className="group/card relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender/60 to-cream-soft p-8 transition-all duration-500 hover:-translate-y-[5px] hover:shadow-[0_28px_60px_-28px_rgba(58,36,64,0.42)] md:p-12"
              >
                <div className="mb-8">
                  <ProgramWall />
                </div>
                <p className="label-text mb-4">03 · GTM &amp; AI Ecosystem Partnerships</p>
                <h3 className="font-serif text-2xl font-light leading-snug text-plum">
                  Creating spaces where
                  <br />
                  people come to build
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-plum-muted">
                  From global builder challenges to Bay Area hackathons and founder conversations, I
                  shape thoughtful programs that connect partner goals with builders and communities
                  around ideas worth building.
                </p>
                <div className="mt-7">
                  <Metrics
                    accent="text-rose"
                    items={[
                      { value: '9', n: 9, label: 'selected programs' },
                      { value: '221', n: 221, label: 'builders in a flagship global challenge' },
                      { value: 'E2E', label: 'flagship program ownership' },
                    ]}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag>Ecosystem Partnerships</Tag>
                  <Tag>Developer Programs</Tag>
                  <Tag>Program Strategy</Tag>
                </div>
                <Link
                  to="/work/ai-valley"
                  className="group/cta mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-[13px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose"
                >
                  Explore programs
                  <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
                </Link>
              </article>
            </TiltCard>
          </Reveal>

          {/* ── Case 4 · Enterprise SaaS & Product Analytics — 下沉小卡 ────────── */}
          <Reveal y={36} delay={0.15}>
            <TiltCard className="h-full">
              <span
                aria-hidden
                className="absolute -top-3 left-8 z-10 rotate-[-3deg] rounded-md border border-dashed border-orchid/60 bg-white/95 px-2.5 py-0.5 font-hand text-[14px] text-plum shadow"
              >
                the enterprise chapter
              </span>
            <article id="case-peopleai" className="group/card flex h-full scroll-mt-24 flex-col justify-between overflow-hidden rounded-[2rem] border border-plum/10 bg-cream p-8 transition-transform duration-500 md:p-12">
              <div>
                <div className="mb-8 overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                  <img
                    src="/images/case-analytics.jpg"
                    alt="Abstract editorial illustration — an analytics ribbon rising over soft bar charts"
                    className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] group-hover/card:saturate-100"
                    loading="lazy"
                  />
                </div>
                <p className="label-text mb-4">04 · Enterprise SaaS & Analytics · People.ai</p>
                <h3 className="font-serif text-2xl font-light leading-snug text-plum">
                  Turning product data into retention and renewal decisions
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-plum-muted">
                  At a YC-incubated sales-analytics company, I diagnosed data-quality defects
                  hurting reliability and partnered with Engineering on targeted fixes. I also
                  analyzed usage patterns to influence roadmap priorities and built a Tableau
                  dashboard covering 50+ enterprise clients — validating ROI that supported
                  renewals.
                </p>
              </div>
              <div className="mt-8">
                <Metrics
                  accent="text-orchid"
                  items={[
                    { value: '−6%', n: 6, prefix: '−', suffix: '%', label: 'customer churn, with a company award for customer-first ownership' },
                    { value: '+13%', n: 13, prefix: '+', suffix: '%', label: 'feature adoption across enterprise accounts' },
                    { value: '50+', n: 50, suffix: '+', label: 'enterprise clients covered by ROI dashboard' },
                  ]}
                />
              </div>
            </article>
            </TiltCard>
          </Reveal>

        </div>

        {/* ── Case 4 · Strategic Industry Engagement — minimal editorial ────────── */}
        <Reveal className="mt-10" y={36}>
          <article id="case-yuto" className="relative grid scroll-mt-24 gap-8 border-t border-plum/10 py-12 md:grid-cols-12 md:py-16">
            <span
              aria-hidden
              className="absolute -top-3 right-4 rotate-[2deg] rounded-md border border-dashed border-lavender-deep/60 bg-white/95 px-2.5 py-0.5 font-hand text-[14px] text-plum shadow"
            >
              now shipping ✈
            </span>
            <div className="md:col-span-4">
              <div className="mb-8 overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                <img
                  src="/images/case-industry.jpg"
                  alt="Abstract editorial illustration — layered panels and orbiting workstreams"
                  className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] hover:saturate-100"
                  loading="lazy"
                />
              </div>
              <p className="label-text mb-4">05 · Strategic Industry Engagement · Yuto USA</p>
              <h3 className="font-serif text-2xl font-light leading-snug text-plum">
                Shipping AI the executive team uses daily — and the programs around it
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-[15px] leading-relaxed text-plum-muted">
                At an advanced-materials company, I shipped a 0-to-1 forecasting product to
                production — built solo with agentic coding, with full traceability and
                human-in-the-loop override — now in daily use by the executive team. Alongside it,
                I drive technical program management across 5+ concurrent workstreams for top-tier
                consumer technology accounts, and delivered the company showcase at a global
                technology client's tech day.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Agentic coding</Tag>
                <Tag>Technical program management</Tag>
                <Tag>Market & GTM research</Tag>
              </div>
            </div>
            <div className="md:col-span-3">
              <dl className="space-y-6">
                {[
                  { value: '9.2→7.5%', label: 'one-month forecast error, at 90% directional accuracy' },
                  { value: '100+', label: 'attendees at client tech-day showcase' },
                  { value: '5+', label: 'concurrent workstreams coordinated' },
                ].map((m) => (
                  <div key={m.label} className="border-l-2 border-lavender-deep pl-4">
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-serif text-2xl font-light text-orchid md:text-[1.7rem]">{m.value}</dd>
                    <dd className="mt-1 text-[12px] leading-snug text-plum-muted">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
