import { Reveal, WordReveal } from '@/components/Reveal'

const STRENGTHS = [
  'Understanding customer and stakeholder needs',
  'Translating complex technology into clear business value',
  'Aligning product, technical, and commercial stakeholders',
  'Developing trusted, long-term professional relationships',
  'Moving initiatives from ambiguity toward execution',
  'Using data and customer insight to improve products and programs',
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">About</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="Connecting product thinking with market opportunity." />
      </h2>

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5" delay={0.1}>
          <p className="text-base leading-relaxed text-plum-muted md:text-lg">
            I work where AI products, go-to-market strategy, strategic partnerships, and
            ecosystem development meet. My background spans computer science, data analytics,
            enterprise SaaS, and AI healthcare — which means I can sit with engineers in the
            morning and with customers, founders, or investors in the afternoon, and make
            both conversations sharper.
          </p>
          <p className="mt-5 text-base leading-relaxed text-plum-muted md:text-lg">
            What I enjoy most is the middle ground: taking a promising but ambiguous
            technology and turning it into something people understand, adopt, and build on.
          </p>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.15}>
            <p className="label-text mb-6">Where I'm most effective</p>
          </Reveal>
          <ul className="divide-y divide-plum/10">
            {STRENGTHS.map((s, i) => (
              <Reveal key={s} delay={0.1 + i * 0.06} y={14}>
                <li className="group flex items-baseline gap-4 py-4">
                  <span className="font-serif text-sm italic text-orchid">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] leading-relaxed text-plum transition-transform duration-300 group-hover:translate-x-1">
                    {s}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
