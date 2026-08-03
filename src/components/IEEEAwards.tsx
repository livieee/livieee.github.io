import { useState } from 'react'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * IEEE Rising Stars 2026 —— 两个一等奖的荣誉条。
 *
 * 刻意不做成第五张同等大小的经历卡：这是「奖项」不是「工作」，
 * 所以用一条横贯的绶带式版块 + 一排可点开的现场照，视觉上明显区别于
 * 上面的 01–05 案例卡。
 */

const AWARDS = [
  {
    tag: 'Project Showcase',
    place: '1st place',
    title: 'Therapy as a Living Art',
    sub: 'Real-time emotion visualization through EEG-driven generative art',
    role: 'I designed the CMU research poster and the product UI.',
    detail:
      'A Muse 2 headset streams EEG into Russell’s valence–arousal space; those coordinates drive a Stable Diffusion generator, so people watch their own state turn into moving art. An explain mode shows which bands drove the visual.',
    team: 'Carnegie Mellon University · Integrated Innovation Institute',
    href: 'https://ieee-risingstars.org/2026/project-showcase/',
    hrefLabel: 'Project Showcase',
    accent: '#D193A8',
  },
  {
    tag: 'Pitch Contest · AgeTech',
    place: '1st place',
    title: 'Theta Health AI',
    sub: 'Pitched to a panel of judges, conference attendees and sponsors',
    role: 'Pitched the AgeTech track entry for the product I worked on.',
    detail:
      'The brief: technology that improves the lives of older adults. Judged on innovation, market impact, business model and feasibility — the same product whose 0-to-1 AI Scribe work is in chapter 01.',
    team: 'Theta Health · AgeTech track',
    href: 'https://ieee-risingstars.org/2026/rising-stars-pitch-contest/',
    hrefLabel: 'Pitch Contest',
    accent: '#B98ACB',
  },
]

const SHOTS: GalleryItem[] = [
  {
    src: '/ieee/two-certs.jpg',
    alt: 'Two IEEE Rising Stars 2026 first-place certificates — Theta Health AI and Therapy as a Living Art',
    cap: 'Two first-place certificates — Pitch Contest and Project Showcase',
  },
  {
    src: '/ieee/pitch-stage.jpg',
    alt: 'Receiving the IEEE Rising Stars pitch contest certificate on stage',
    cap: 'Pitch Contest · AgeTech — receiving the award on stage',
  },
  {
    src: '/ieee/poster.jpg',
    alt: 'The CMU research poster for Therapy as a Living Art, designed by Olivia',
    cap: 'The CMU research poster — I designed it',
  },
  {
    src: '/ieee/poster-team.jpg',
    alt: 'The project team standing at the Carnegie Mellon poster booth',
    cap: 'At the CMU booth, mid-showcase',
  },
  {
    src: '/ieee/certs-three.jpg',
    alt: 'Three project team members holding first-place certificates',
    cap: 'Project Showcase — first place',
  },
  {
    src: '/ieee/showcase-stage.jpg',
    alt: 'Winners and IEEE Rising Stars organisers together on stage',
    cap: 'On stage with the organisers and the other winners',
  },
  {
    src: '/ieee/group-stage.jpg',
    alt: 'All Rising Stars 2026 award winners lined up on stage',
    cap: 'All the 2026 winners, lined up',
  },
  {
    src: '/ieee/poster-team2.jpg',
    alt: 'The team beside the Carnegie Mellon Silicon Valley banner',
    cap: 'Beside the CMU Silicon Valley banner',
  },
]

export function IEEEAwards() {
  const [zoom, setZoom] = useState<number | null>(null)

  return (
    <aside
      id="ieee-awards"
      aria-label="IEEE Rising Stars 2026 awards"
      className="relative mt-20 overflow-hidden rounded-[2rem] border border-champagne/60 bg-gradient-to-br from-champagne/25 via-cream-soft to-blush/20 px-7 py-10 md:px-12 md:py-12"
    >
      {/* 绶带角标 */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-champagne/40 blur-3xl"
      />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-plum/10">
            <img src="/logos/ieee.png" alt="IEEE" className="h-6 w-6 object-contain" />
          </span>
          <div>
            <p className="label-text">Recognition</p>
            <h3 className="mt-1.5 font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] font-light leading-tight text-plum">
              Two first-place wins at{' '}
              <span className="italic text-orchid">IEEE Rising Stars 2026</span>
            </h3>
          </div>
        </div>
        <p className="font-hand text-[16px] text-plum-muted">Las Vegas · January 2026 ✦</p>
      </div>

      {/* 两个奖项 */}
      <div className="relative mt-8 grid gap-5 md:grid-cols-2">
        {AWARDS.map((a, i) => (
          <div
            key={a.title}
            style={{ animation: `annot-in .5s ${0.1 + i * 0.1}s ease-out both` }}
            className="flex flex-col rounded-[1.3rem] border border-plum/10 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-[3px] text-[10.5px] font-medium tracking-wide"
                style={{ backgroundColor: `${a.accent}22`, color: a.accent }}
              >
                {a.tag}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C0913C]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
                </svg>
                {a.place}
              </span>
            </div>

            <h4 className="mt-3 font-serif text-[19px] font-light leading-snug text-plum">{a.title}</h4>
            <p className="mt-1 text-[12.5px] leading-snug text-plum-faint">{a.sub}</p>

            <p className="mt-3.5 border-l-2 pl-3 text-[13px] font-medium leading-relaxed text-plum" style={{ borderColor: a.accent }}>
              {a.role}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-plum-muted">{a.detail}</p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
              <span className="text-[11.5px] text-plum-faint">{a.team}</span>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3 py-1.5 text-[11.5px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                {a.hrefLabel} <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 现场照：横向一排，点开放大可左右浏览 */}
      <div className="relative mt-7">
        <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setZoom(i)}
              aria-label={`View larger: ${s.alt}`}
              className="group/is w-[190px] shrink-0 cursor-zoom-in overflow-hidden rounded-[0.9rem] border border-plum/10 bg-white"
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/is:scale-[1.06]"
              />
            </button>
          ))}
        </div>
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream-soft to-transparent" />
      </div>

      <p className="relative mt-4 font-hand text-[15px] text-plum-muted">
        the poster, the UI, and the pitch ✦
      </p>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </aside>
  )
}
