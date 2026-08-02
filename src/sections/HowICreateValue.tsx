import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Capabilities + How I Work 合并：先说创造价值的四个领域，
 * 再说做事的方式。前者是 what，后者是 how，同一段里递进。
 */

const AREAS = [
  {
    n: '01',
    title: 'AI Product & Product Operations',
    body: 'Turning user needs and messy cross-functional input into clear priorities and workflows that ship.',
    skills: ['Product discovery', 'Customer research', 'Product analytics', 'AI workflow design'],
    tint: 'from-blush/50 to-transparent',
  },
  {
    n: '02',
    title: 'GTM Strategy & Adoption',
    body: 'Connecting what a product can do to the people who need it — launches, narratives, adoption.',
    skills: ['GTM strategy', 'Product launches', 'Metric definition', 'A/B testing & funnels'],
    tint: 'from-lavender/60 to-transparent',
  },
  {
    n: '03',
    title: 'Strategic Partnerships',
    body: 'Turning promising conversations into collaborations both sides keep showing up for.',
    skills: ['Partner programs', 'Stakeholder management', 'Executive communication'],
    tint: 'from-champagne/60 to-transparent',
  },
  {
    n: '04',
    title: 'Ecosystem & Program Execution',
    body: 'Bringing companies, researchers and communities into the same room — and giving it a shape.',
    skills: ['Developer relations', 'Program design', 'Speaker sourcing', 'Cross-functional execution'],
    tint: 'from-lavender-deep/40 to-transparent',
  },
]

const QUALITIES = [
  {
    title: 'Attentive to the room',
    body: 'I notice where incentives diverge early, and design alignment before it becomes a blocker.',
  },
  {
    title: 'Structured, but human',
    body: 'Empathy tells me what people need; structure turns it into a plan. Both, in that order.',
  },
  {
    title: 'Comfortable with the unfamiliar',
    body: 'New model, new market, new community — I learn by asking carefully and shipping small.',
  },
  {
    title: 'Trust over transactions',
    body: 'I follow through and communicate clearly, so people would choose to work together again.',
  },
]

const WORDS = ['curious', 'connector', 'follow-through', 'calm under ambiguity', 'bilingual — 中文 / English']

export function HowICreateValue() {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">How I Create Value</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="Analytical in approach." />{' '}
        <span className="italic text-orchid">
          <WordReveal text="Human in execution." delay={0.3} />
        </span>
      </h2>

      {/* 四个领域 */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {AREAS.map((a, i) => (
          <Reveal key={a.n} delay={i * 0.08} y={30}>
            <article
              data-hover
              className={`group relative h-full overflow-hidden rounded-[1.6rem] border border-plum/10 bg-gradient-to-br ${a.tint} p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-9`}
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-sm italic text-orchid">{a.n}</span>
                <span className="h-2 w-2 rounded-full bg-rose-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-normal text-plum md:text-2xl">{a.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-plum-muted">{a.body}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {a.skills.map((s) => (
                  <span key={s} className="text-[12px] font-medium text-plum-faint">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* 做事的方式 */}
      <Reveal className="mt-20">
        <p className="font-hand text-[19px] text-plum-muted md:text-[21px]">
          and the way I go about it —{' '}
          <span className="text-orchid">people first, then the plan ✦</span>
        </p>
      </Reveal>

      <div className="mt-9 grid gap-x-12 gap-y-9 md:grid-cols-2">
        {QUALITIES.map((q, i) => (
          <Reveal key={q.title} delay={i * 0.08} y={24}>
            <div className="group border-l-2 border-lavender-deep pl-6 transition-colors duration-500 hover:border-rose">
              <h3 className="font-serif text-lg font-normal text-plum md:text-xl">{q.title}</h3>
              <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-plum-muted">{q.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-text mr-2">In a few words</span>
          {WORDS.map((w) => (
            <span
              key={w}
              className="rounded-full bg-gradient-to-r from-blush/60 to-lavender/60 px-4 py-1.5 text-[12px] font-medium text-plum"
            >
              {w}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mt-8">
        <p className="text-[13px] leading-relaxed text-plum-faint">
          Technical toolkit — SQL · Python · LangGraph multi-agent systems · MCP · eval harness
          design · agentic coding (Claude Code, Cursor) · Tableau · AWS / GCP / Azure · Figma
        </p>
      </Reveal>
    </section>
  )
}
