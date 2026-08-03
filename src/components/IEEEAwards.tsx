import { useState } from 'react'
import { Link } from 'react-router'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * Recognition · IEEE Rising Stars 2026 —— 两个一等奖，一条人本主线。
 *
 * 版式沿用原 05 那块的编辑式语言：细线分隔 + 12 栏横排，不做成大卡片，
 * 也不做成「简历里加了两个奖」。左栏是主线，右栏两个项目并置，
 * 中间一条手绘波形（左半平稳=产品，右半起伏=脑波）把它们连起来。
 *
 * 事实来源：IEEE Rising Stars 官方页面 + Theta Health 赛后复盘。
 */

const SHOTS: GalleryItem[] = [
  {
    src: '/ieee/two-certs.jpg',
    alt: 'Two IEEE Rising Stars 2026 first-place certificates — Theta Health AI and Therapy as a Living Art',
    cap: 'Two first-place certificates — Pitch Contest and Project Showcase',
  },
  {
    src: '/ieee/theta-podium.jpg',
    alt: 'Olivia presenting Theta Health AI from the IEEE Rising Stars lectern',
    cap: 'The AgeTech pitch, from the lectern',
  },
  {
    src: '/ieee/theta-room.jpg',
    alt: 'The audience during the Theta Health pitch, slides on screen',
    cap: 'The room during the pitch — 7–8 questions followed',
  },
  {
    src: '/ieee/theta-vicechair.jpg',
    alt: 'Olivia with IEEE Rising Stars Conference Vice Chair Scott Tamashiro, holding the first-place certificate',
    cap: 'With Conference Vice Chair Scott Tamashiro',
  },
  {
    src: '/ieee/theta-problem-slide.jpg',
    alt: 'The problem slide from the pitch — 10,000 people turning 65 a day, 800,000 clinician shortage by 2027',
    cap: 'The problem slide — why AgeTech, in numbers',
  },
  {
    src: '/ieee/pitch-stage.jpg',
    alt: 'Receiving the IEEE Rising Stars pitch contest certificate on stage',
    cap: 'Pitch Contest · AgeTech — receiving the award',
  },
  {
    src: '/ieee/taala-art.jpg',
    alt: 'Four states of the EEG-driven generative art from Therapy as a Living Art',
    cap: 'Calm, intense, excited — and the explain mode that shows why',
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
]

const WINS = [
  {
    key: 'theta' as const,
    tag: 'AgeTech Pitch',
    title: 'Theta Health AI',
    meta: 'Top 3 finalist → live pitch → first place',
    img: '/ieee/theta-podium.jpg',
    pos: '50% 26%',
    line: 'I pitched it on stage — then took 7–8 questions from a room that included IEEE’s president and the conference vice chair.',
    tags: ['Product storytelling', 'Live pitch', 'Market signals'],
    note: 'listen to the room ✦',
    accent: '#D193A8',
    zoom: 1,
    to: '/work/theta',
    cta: 'See the pitch story',
    href: 'https://ieee-risingstars.org/2026/rising-stars-pitch-contest/',
  },
  {
    key: 'taala' as const,
    tag: 'Project Showcase',
    title: 'Therapy as a Living Art',
    meta: 'Carnegie Mellon · Integrated Innovation Institute',
    img: '/ieee/taala-art.jpg',
    pos: '50% 50%',
    line: 'EEG turned into moving art in real time, with an explain mode showing which signals shaped it. I designed the poster and the product UI.',
    tags: ['Product UI', 'Experience design', 'Research communication'],
    note: 'making the invisible visible ✦',
    accent: '#B98ACB',
    zoom: 6,
    to: '/work/therapy-as-living-art',
    cta: 'See the showcase',
    href: 'https://ieee-risingstars.org/2026/project-showcase/',
  },
]

/** 连接两个项目的手绘线：左半平稳（产品），右半起伏（脑波） */
function ThreadWave({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 24" className={className} fill="none" aria-hidden preserveAspectRatio="none">
      <path d="M0 12 H96 l8-6 7 12 8-10 7 9 6-5 h10" stroke="#D193A8" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M152 12 c11-16 21 16 32 0 c11-16 21 16 32 0 c11-16 21 16 32 0 c11-13 19 11 30 0 H320"
        stroke="#B98ACB"
        strokeOpacity="0.45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IEEEAwards() {
  const [zoom, setZoom] = useState<number | null>(null)
  const [side, setSide] = useState<'theta' | 'taala' | null>(null)

  return (
    <section
      id="ieee-awards"
      aria-label="IEEE Rising Stars 2026 awards"
      className="relative grid scroll-mt-24 gap-8 border-t border-plum/10 py-12 md:grid-cols-12 md:py-16"
    >
      {/* 左栏：主线 */}
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-plum/10">
            <img src="/logos/ieee.png" alt="IEEE" className="h-[18px] w-[18px] object-contain" />
          </span>
          <p className="label-text">Recognition · Rising Stars 2026</p>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-light leading-snug text-plum">
          Two projects. Two first-place wins.{' '}
          <span className="italic text-orchid">One human-centered thread.</span>
        </h3>

        <p className="mt-4 text-[14px] leading-relaxed text-plum-muted">
          From making health information easier to act on, to making inner states visible — two
          ways of helping emerging technology feel more human.
        </p>

        <ThreadWave className="mt-6 hidden h-5 w-full md:block" />

        <p className="mt-4 font-hand text-[15px] text-plum-muted">Las Vegas · January 2026 ✦</p>
      </div>

      {/* 右栏：两个奖并置 */}
      <div className="grid gap-5 sm:grid-cols-2 md:col-span-8">
        {WINS.map((w) => (
          <button
            key={w.key}
            type="button"
            onClick={() => setZoom(w.zoom)}
            onPointerEnter={(e) => e.pointerType !== 'touch' && setSide(w.key)}
            onPointerLeave={() => setSide(null)}
            className="group/w flex flex-col text-left transition-opacity duration-500"
            style={{ opacity: side && side !== w.key ? 0.55 : 1 }}
          >
            <span className="relative block overflow-hidden rounded-[1.1rem] border border-plum/10">
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="h-[150px] w-full object-cover transition-transform duration-700 group-hover/w:scale-[1.04]"
                style={{ objectPosition: w.pos }}
              />
              <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/92 px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.12em] text-[#C0913C] shadow-sm backdrop-blur">
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
                </svg>
                1st place
              </span>
            </span>

            <span className="mt-3 flex items-baseline gap-2">
              <span
                className="rounded-full px-2 py-[2px] text-[10px] font-medium leading-none"
                style={{ backgroundColor: `${w.accent}22`, color: w.accent }}
              >
                {w.tag}
              </span>
            </span>

            <span className="mt-2 block font-serif text-[17px] font-light leading-snug text-plum">
              {w.title}
            </span>
            <span className="mt-0.5 block text-[11.5px] leading-snug text-plum-faint">{w.meta}</span>

            <span className="mt-2.5 block text-[12.5px] leading-relaxed text-plum-muted">{w.line}</span>

            <span className="mt-3 flex flex-wrap gap-1.5">
              {w.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-plum/10 bg-white/60 px-2 py-[2px] text-[10px] leading-none text-plum-faint"
                >
                  {t}
                </span>
              ))}
            </span>

            <span className="mt-auto flex items-center gap-3 pt-3.5">
              <Link
                to={w.to}
                onClick={(e) => e.stopPropagation()}
                className="text-[11.5px] font-medium transition-opacity hover:opacity-70"
                style={{ color: w.accent }}
              >
                {w.cta} →
              </Link>
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11.5px] text-plum-faint transition-opacity hover:opacity-70"
              >
                IEEE ↗
              </a>
              <span className="flex-1" />
              <span
                className="font-hand text-[13px] text-plum-muted transition-opacity duration-300"
                style={{ opacity: side === w.key ? 1 : 0 }}
              >
                {w.note}
              </span>
            </span>
          </button>
        ))}

        {/* 现场照：一条窄带 */}
        <div className="relative sm:col-span-2">
          <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setZoom(i)}
                aria-label={`View larger: ${s.alt}`}
                className="group/is h-[74px] w-[104px] shrink-0 cursor-zoom-in overflow-hidden rounded-[0.7rem] border border-plum/10 bg-white"
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/is:scale-[1.08]"
                />
              </button>
            ))}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream to-transparent"
          />
        </div>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </section>
  )
}
