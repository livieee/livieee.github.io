import { Reveal, WordReveal } from '@/components/Reveal'

const GROUPS = [
  { label: 'Frontier AI labs & model companies', note: 'open-weights and multimodal model labs, co-hosted programs' },
  { label: 'Startups & founders', note: 'hackathons, Builder Sprints, Demo Days' },
  { label: 'Universities & researchers', note: 'CMU and Bay Area networks, speaker sourcing' },
  { label: 'Engineers & developer communities', note: 'workshops, meetups, developer content' },
  { label: 'Investors & accelerators', note: 'ecosystem programs and founder events' },
  { label: 'Enterprise technology stakeholders', note: 'client tech days, cross-border collaboration' },
]

const BEYOND = [
  'Following emerging technology — and the human behavior around it',
  'Connecting people across professional and cultural backgrounds',
  'Building small, thoughtful communities',
  'Exploring the Bay Area, one trail and café at a time',
  'Design, culture, and experiences that bring people together',
]

export function EcosystemBeyond() {
  return (
    <section className="relative overflow-hidden bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        {/* Ecosystem exposure */}
        <Reveal>
          <p className="label-text mb-6">Ecosystem</p>
        </Reveal>
        <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="The rooms I spend time in." />
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.06} y={20}>
              <div className="group" data-hover>
                <div className="mb-3 h-px w-10 bg-orchid/60 transition-all duration-500 group-hover:w-16 group-hover:bg-rose" />
                <h3 className="text-[15px] font-semibold text-plum">{g.label}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-plum-muted">{g.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[12px] leading-relaxed text-plum-faint">
            Organizations engaged through professional experience, programs, events, and ecosystem
            initiatives — no endorsement or formal partnership implied.
          </p>
        </Reveal>

        {/* Beyond work */}
        <div className="mt-28 grid gap-12 border-t border-plum/10 pt-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label-text mb-6">Beyond Work</p>
            </Reveal>
            <h2 className="font-serif text-[clamp(1.7rem,3.5vw,2.6rem)] font-light leading-[1.2] text-plum">
              <WordReveal text="A person, not just a profile." />
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="space-y-5">
              {BEYOND.map((b, i) => (
                <Reveal key={b} delay={i * 0.06} y={14}>
                  <li className="flex items-baseline gap-4 text-[15px] leading-relaxed text-plum-muted">
                    <span className="font-serif italic text-rose">✳</span>
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
