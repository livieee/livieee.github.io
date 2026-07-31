import { Reveal, WordReveal } from '@/components/Reveal'

const QUALITIES = [
  {
    title: 'Attentive to the room',
    body: 'I notice stakeholder dynamics early — who needs what, where incentives diverge — and design alignment before it becomes a blocker.',
  },
  {
    title: 'Structured, but human',
    body: 'Empathy tells me what people need; structured thinking turns it into a plan. I rely on both, in that order.',
  },
  {
    title: 'Comfortable with the unfamiliar',
    body: 'New model, new market, new community — I learn fast by asking careful questions and shipping small, real things.',
  },
  {
    title: 'Trust over transactions',
    body: 'I follow through, communicate clearly, and optimize for outcomes where everyone would work together again.',
  },
]

const WORDS = ['curious', 'connector', 'follow-through', 'calm under ambiguity', 'bilingual — 中文 / English']

export function HowIWork() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">How I Work</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="Analytical in approach." />{' '}
        <span className="italic text-orchid">
          <WordReveal text="Human in execution." delay={0.3} />
        </span>
      </h2>

      <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {QUALITIES.map((q, i) => (
          <Reveal key={q.title} delay={i * 0.08} y={24}>
            <div className="group border-l-2 border-lavender-deep pl-6 transition-colors duration-500 hover:border-rose">
              <h3 className="font-serif text-lg font-normal text-plum md:text-xl">{q.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-plum-muted">{q.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16">
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
    </section>
  )
}
