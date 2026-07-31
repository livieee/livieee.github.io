import { Reveal, WordReveal } from '@/components/Reveal'

type Stop = {
  period: string
  title: string
  place: string
  note: string
  logos?: { src: string; name: string }[]
  marks?: string[]
  tint: string
  photo?: { src: string; alt: string; caption: string }
}

const STOPS: Stop[] = [
  {
    period: '2014 – 2019',
    title: 'Computer Science foundations',
    place: 'University of British Columbia · Vancouver',
    note: 'B.Sc. in Computer Science, Dean’s Honour List — the technical base everything else builds on.',
    logos: [{ src: '/logos/ubc.png', name: 'University of British Columbia' }],
    tint: 'from-blush to-lavender',
    photo: {
      src: '/images/photo-graduation.jpg',
      alt: 'Olivia (left) with classmates at her UBC graduation',
      caption: 'Graduation day at UBC, Vancouver',
    },
  },
  {
    period: '2019 – 2020',
    title: 'Data & analytics lens',
    place: 'Western University · London, Canada',
    note: 'Master of Data Analytics — learning to let evidence, not instinct, settle the argument.',
    marks: ['WU'],
    tint: 'from-lavender to-champagne',
  },
  {
    period: '2021 – 2023',
    title: 'Enterprise SaaS in production',
    place: 'People.ai · Toronto',
    note: 'Technical Product Analyst at a YC-incubated startup — churn, adoption, ROI for 50+ enterprise clients.',
    logos: [{ src: '/logos/peopleai.png', name: 'People.ai' }],
    tint: 'from-rose-soft to-lavender-deep',
  },
  {
    period: '2023 – 2024',
    title: 'Product ownership',
    place: 'Xpertbay · Remote',
    note: 'Product Manager for a two-sided talent marketplace — activation, matching, and NPS moved through user testing.',
    marks: ['X'],
    tint: 'from-champagne to-blush',
  },
  {
    period: '2024 – 2025',
    title: 'Converging on AI',
    place: 'Carnegie Mellon University · Mountain View',
    note: 'Master of Software Management (Product Management), GPA 4.0. Bosch GenAI collaborations, IEEE Rising Stars 1st Place ×2, CMU Product Hackathon 2nd Prize ×2.',
    logos: [
      { src: '/logos/cmu.png', name: 'Carnegie Mellon University' },
      { src: '/logos/bosch.png', name: 'Bosch (collaboration)' },
      { src: '/logos/ieee.png', name: 'IEEE' },
    ],
    tint: 'from-orchid-soft to-blush',
    photo: {
      src: '/images/photo-cmu-graduation.jpg',
      alt: 'Olivia at her Carnegie Mellon University graduation, holding a bouquet',
      caption: 'Graduation day at CMU, Silicon Valley campus',
    },
  },
  {
    period: '2025 – now',
    title: 'AI products & ecosystems',
    place: 'Theta Health · AI Valley · Yuto USA · Bay Area',
    note: '0-to-1 AI products, developer ecosystem programs, and technical program management — where the path was always heading.',
    marks: ['TH', 'AV', 'YU'],
    tint: 'from-lavender to-rose-soft',
  },
]

export function Journey() {
  return (
    <section id="journey" className="relative bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <Reveal>
          <p className="label-text mb-6">Journey</p>
        </Reveal>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] text-plum">
                <WordReveal text="A multidisciplinary path to AI." />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-plum-muted">
                  Every stop added a language — engineering, data, customers, programs. The
                  through-line: turning complex technology into something people actually use.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative md:col-span-7 md:col-start-6">
            <div className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-orchid via-rose-soft to-champagne-deep md:left-[9px]" aria-hidden />
            <ol className="space-y-12">
              {STOPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05} y={24}>
                  <li className="group relative pl-10 md:pl-12">
                    <span
                      className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-orchid bg-cream transition-all duration-300 group-hover:scale-125 group-hover:bg-orchid md:h-[19px] md:w-[19px]"
                      aria-hidden
                    />
                    <div className="flex items-start gap-5">
                      <div className="flex shrink-0 gap-2 pt-1">
                        {s.logos?.map((l) => (
                          <span
                            key={l.name}
                            title={l.name}
                            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-plum/10 bg-white shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5"
                          >
                            <img src={l.src} alt={l.name} className="h-9 w-9 object-contain" loading="lazy" />
                          </span>
                        ))}
                        {s.marks?.map((m) => (
                          <span
                            key={m}
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.tint} font-serif text-[13px] font-medium text-plum shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5`}
                            aria-hidden
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <div className="min-w-0">
                        <p className="label-text !text-orchid">{s.period}</p>
                        <h3 className="mt-2 font-serif text-xl font-normal text-plum md:text-2xl">{s.title}</h3>
                        <p className="mt-1 text-[13px] font-medium text-plum-muted">{s.place}</p>
                        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-plum-muted">{s.note}</p>
                        {s.photo && (
                          <figure className="mt-5 max-w-[240px]">
                            <div className="overflow-hidden rounded-2xl shadow-soft">
                              <img
                                src={s.photo.src}
                                alt={s.photo.alt}
                                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                                loading="lazy"
                              />
                            </div>
                            <figcaption className="mt-2 text-[11px] uppercase tracking-label text-plum-faint">
                              {s.photo.caption}
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
