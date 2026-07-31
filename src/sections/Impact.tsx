import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'

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
  return (
    <section id="impact" className="relative bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <Reveal>
          <p className="label-text mb-6">Selected Impact</p>
        </Reveal>
        <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="Work that moved products, people, and programs forward." />
        </h2>

        {/* ── Case 1 · AI Product Development — full-width feature ─────────────── */}
        <Reveal className="mt-20" y={36}>
          <article id="case-theta" className="group/card relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-soft to-blush/40 p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-14">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="label-text mb-4">01 · AI Product Development · Theta Health</p>
                <h3 className="font-serif text-2xl font-light leading-snug text-plum md:text-[2rem]">
                  Giving clinicians their time back with a 0-to-1 AI Scribe
                </h3>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-plum-muted">
                  Clinical documentation was consuming hours of physicians' days. I grounded the
                  product in 5+ physician interviews and 10+ competitive analyses, translated
                  real clinical workflows into feature scope and prompt design, and helped launch
                  a HIPAA-compliant AI Scribe MVP — then diagnosed the adoption barriers of an
                  open-source Healthcare MCP server, reshaping roadmap priorities and landing the
                  first clinic pilot.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag>Product discovery</Tag>
                  <Tag>LLM prompt design</Tag>
                  <Tag>HIPAA-compliant infra</Tag>
                  <Tag>Clinical workflow</Tag>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-8 md:col-span-5">
                <div className="overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                  <img
                    src="/images/case-scribe.jpg"
                    alt="Abstract editorial illustration — clinical documentation dissolving into data points"
                    className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] group-hover/card:saturate-100"
                    loading="lazy"
                  />
                </div>
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
        </Reveal>

        {/* ── Case 2 · Enterprise SaaS & Product Analytics — split / offset ────── */}
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5" y={36} delay={0.05}>
            <article id="case-peopleai" className="group/card flex h-full scroll-mt-24 flex-col justify-between overflow-hidden rounded-[2rem] border border-plum/10 bg-cream p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-12">
              <div>
                <div className="mb-8 overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                  <img
                    src="/images/case-analytics.jpg"
                    alt="Abstract editorial illustration — an analytics ribbon rising over soft bar charts"
                    className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] group-hover/card:saturate-100"
                    loading="lazy"
                  />
                </div>
                <p className="label-text mb-4">02 · Enterprise SaaS & Analytics · People.ai</p>
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
          </Reveal>

          {/* ── Case 3 · AI GTM & Ecosystem — offset card ──────────────────────── */}
          <Reveal className="md:col-span-6 md:col-start-7 md:mt-16" y={36} delay={0.15}>
            <article id="case-aivalley" className="group/card relative scroll-mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-lavender/60 to-cream-soft p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-12">
              <div className="mb-8 overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                <img
                  src="/images/case-ecosystem.jpg"
                  alt="Abstract editorial illustration — a constellation of connected ecosystem nodes"
                  className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] group-hover/card:saturate-100"
                  loading="lazy"
                />
              </div>
              <p className="label-text mb-4">03 · AI GTM & Ecosystem Programs · AI Valley</p>
              <h3 className="font-serif text-2xl font-light leading-snug text-plum">
                Running the programs where builders, labs, and investors meet
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-plum-muted">
                I coordinated a Bay Area developer program calendar — hackathons, Builder Sprints,
                Demo Days — from goals and run-of-show through retrospective, and ran developer
                relations for a global build challenge co-hosted with a leading open-weights model
                lab. I also wrote the outbound developer content and sourced speakers through CMU
                and Bay Area university networks.
              </p>
              <div className="mt-8">
                <Metrics
                  accent="text-rose"
                  items={[
                    { value: '200+', n: 200, suffix: '+', label: 'average attendees — founders, developers, investors' },
                    { value: '~100', n: 100, prefix: '~', label: 'projects shipped in one week-long global build challenge' },
                    { value: 'E2E', label: 'program ownership, from design to recap' },
                  ]}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Developer relations</Tag>
                <Tag>Hackathon programming</Tag>
                <Tag>Ecosystem partnerships</Tag>
              </div>
              <figure className="mt-8 max-w-[220px]">
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <img
                    src="/images/photo-conference.jpg"
                    alt="Olivia at an IEEE global AI conference"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] uppercase tracking-label text-plum-faint">
                  IEEE global AI conference
                </figcaption>
              </figure>
            </article>
          </Reveal>
        </div>

        {/* ── Case 4 · Strategic Industry Engagement — minimal editorial ────────── */}
        <Reveal className="mt-10" y={36}>
          <article id="case-yuto" className="grid scroll-mt-24 gap-8 border-t border-plum/10 py-12 md:grid-cols-12 md:py-16">
            <div className="md:col-span-4">
              <div className="mb-8 overflow-hidden rounded-[1.4rem]" data-cursor="VIEW">
                <img
                  src="/images/case-industry.jpg"
                  alt="Abstract editorial illustration — layered panels and orbiting workstreams"
                  className="aspect-[3/2] w-full object-cover saturate-[0.8] transition-all duration-700 hover:scale-[1.03] hover:saturate-100"
                  loading="lazy"
                />
              </div>
              <p className="label-text mb-4">04 · Strategic Industry Engagement · Yuto USA</p>
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
