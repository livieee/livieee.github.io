import { Reveal, WordReveal } from '@/components/Reveal'

const AREAS = [
  {
    n: '01',
    title: 'AI Product & Product Operations',
    body: 'Translating user needs, product data, and cross-functional input into clearer priorities, stronger workflows, and practical product improvements.',
    skills: ['Product discovery', 'Customer research', 'Product analytics', 'AI workflow design'],
    tint: 'from-blush/50 to-transparent',
  },
  {
    n: '02',
    title: 'GTM Strategy & Adoption',
    body: 'Connecting product capabilities with customer use cases, market narratives, launches, and adoption programs.',
    skills: ['GTM strategy', 'Product launches', 'Metric definition', 'A/B testing & funnels'],
    tint: 'from-lavender/60 to-transparent',
  },
  {
    n: '03',
    title: 'Strategic Partnerships',
    body: 'Building trusted relationships, identifying shared value, and helping promising conversations become structured collaborations.',
    skills: ['Partner programs', 'Stakeholder management', 'Executive communication'],
    tint: 'from-champagne/60 to-transparent',
  },
  {
    n: '04',
    title: 'Ecosystem & Program Execution',
    body: 'Bringing companies, technical teams, researchers, and communities together through thoughtfully designed programs and initiatives.',
    skills: ['Developer relations', 'Program design', 'Speaker sourcing', 'Cross-functional execution'],
    tint: 'from-lavender-deep/40 to-transparent',
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">Capabilities</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="Where I create value." />
      </h2>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {AREAS.map((a, i) => (
          <Reveal key={a.n} delay={i * 0.08} y={30}>
            <article
              data-hover
              className={`group relative h-full overflow-hidden rounded-[1.6rem] border border-plum/10 bg-gradient-to-br ${a.tint} p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft md:p-10`}
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-sm italic text-orchid">{a.n}</span>
                <span className="h-2 w-2 rounded-full bg-rose-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-normal text-plum md:text-2xl">{a.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-plum-muted">{a.body}</p>
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

      <Reveal delay={0.2} className="mt-10">
        <p className="text-[13px] leading-relaxed text-plum-faint">
          Technical toolkit — SQL · Python · LangGraph multi-agent systems · MCP · eval harness
          design · agentic coding (Claude Code, Cursor) · Tableau · AWS / GCP / Azure · Figma
        </p>
      </Reveal>
    </section>
  )
}
