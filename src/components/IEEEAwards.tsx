import { useState } from 'react'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * IEEE Rising Stars 2026 —— 两个一等奖，一条人本主线。
 *
 * 刻意不做成第五张同等大小的经历卡，也不做成「简历里加了两个奖」：
 * 左右两个视觉世界（Theta 温暖偏产品 / TaaLA 梦幻偏技术艺术），
 * 中间一条手绘波形把它们连起来。hover 一侧，另一侧退让。
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
  {
    src: '/ieee/poster-team2.jpg',
    alt: 'The team beside the Carnegie Mellon Silicon Valley banner',
    cap: 'Beside the CMU Silicon Valley banner',
  },
]

/** 连接两侧的手绘波形 —— 左侧平稳（产品），右侧起伏（脑波） */
function ThreadWave({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" className={className} fill="none" aria-hidden preserveAspectRatio="none">
      <path
        d="M0 30 H120 l10-8 8 16 10-14 9 12 8-6 h14"
        stroke="#D193A8"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M179 30 c14-22 26 22 40 0 c14-22 26 22 40 0 c14-22 26 22 40 0 c14-18 24 14 38 0 H400"
        stroke="#B98ACB"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IEEEAwards() {
  const [zoom, setZoom] = useState<number | null>(null)
  const [side, setSide] = useState<'theta' | 'taala' | null>(null)

  return (
    <aside
      id="ieee-awards"
      aria-label="IEEE Rising Stars 2026 awards"
      className="relative mt-20 overflow-hidden rounded-[2rem] border border-plum/10"
    >
      {/* 左右两个世界的底色，中间自然融合 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, #FBF1E8 0%, #FAE7EA 26%, #FBF6F1 50%, #F1ECFA 74%, #E9EEF7 100%)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-lavender/45 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-blush/50 blur-3xl"
      />

      <div className="relative px-7 py-10 md:px-12 md:py-12">
        {/* 顶部 */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-plum/10">
              <img src="/logos/ieee.png" alt="IEEE" className="h-6 w-6 object-contain" />
            </span>
            <div>
              <p className="label-text">Recognition · IEEE Rising Stars 2026</p>
              <h3 className="mt-1.5 max-w-2xl font-serif text-[clamp(1.35rem,2.6vw,1.9rem)] font-light leading-tight text-plum">
                Two projects. Two first-place wins.{' '}
                <span className="italic text-orchid">One human-centered thread.</span>
              </h3>
            </div>
          </div>
          <p className="font-hand text-[16px] text-plum-muted">Las Vegas · January 2026 ✦</p>
        </div>

        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-plum-muted md:ml-[60px]">
          From making health information easier to act on, to making inner states visible — two
          different ways of helping emerging technology feel more human.
        </p>

        {/* 双面展台 */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
          {/* 左：Theta —— 温暖、现场、产品 */}
          <button
            type="button"
            onClick={() => setZoom(1)}
            onPointerEnter={(e) => e.pointerType !== 'touch' && setSide('theta')}
            onPointerLeave={() => setSide(null)}
            className="group/th relative flex flex-col overflow-hidden rounded-[1.4rem] border border-rose/25 bg-white/70 p-5 text-left transition-all duration-500 md:p-6"
            style={{
              transform: side === 'theta' ? 'scale(1.02)' : 'scale(1)',
              opacity: side === 'taala' ? 0.62 : 1,
            }}
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-rose/15 px-2.5 py-[3px] text-[10.5px] font-medium tracking-wide text-rose">
                AgeTech Pitch
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C0913C]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
                </svg>
                1st place
              </span>
            </span>

            <span className="mt-3 block font-serif text-[19px] font-light leading-snug text-plum">
              Theta Health AI
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-plum-faint">
              Top 3 finalist → live pitch → first place
            </span>

            {/* 舞台照 + 证书压角 */}
            <span className="relative mt-4 block">
              <img
                src="/ieee/theta-podium.jpg"
                alt="Olivia presenting Theta Health AI at IEEE Rising Stars"
                loading="lazy"
                className="h-[188px] w-full rounded-[1rem] border border-plum/10 object-cover object-[50%_28%] transition-transform duration-500 group-hover/th:-translate-y-[5px]"
              />
              <img
                src="/ieee/theta-cert.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute -bottom-3 right-3 h-[74px] w-[104px] rotate-[5deg] rounded-[0.6rem] border-2 border-white object-cover shadow-[0_12px_26px_-12px_rgba(58,36,64,0.6)] transition-transform duration-500 group-hover/th:rotate-[2deg]"
              />
            </span>

            <span className="mt-6 block text-[13px] leading-relaxed text-plum-muted">
              I pitched it on stage — then took 7–8 questions from a room that included IEEE’s
              president and the conference vice chair.
            </span>

            <span className="mt-3 flex flex-wrap gap-1.5">
              {['Product storytelling', 'Live pitch', 'Market signals'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] text-[10px] leading-none text-plum-faint"
                >
                  {t}
                </span>
              ))}
            </span>

            <span className="mt-auto flex items-center justify-between gap-2 pt-4">
              <span className="text-[12px] font-medium text-rose">See the pitch story →</span>
              <span
                className="font-hand text-[14px] text-plum-muted transition-opacity duration-300"
                style={{ opacity: side === 'theta' ? 1 : 0 }}
              >
                listen to the room ✦
              </span>
            </span>
          </button>

          {/* 中：连接两侧的波形 + 印章 */}
          <div className="flex items-center justify-center md:w-[64px] md:flex-col">
            <ThreadWave className="h-8 w-full md:h-full md:w-8 md:-rotate-90" />
          </div>

          {/* 右：TaaLA —— 梦幻、实验、技术艺术 */}
          <button
            type="button"
            onClick={() => setZoom(6)}
            onPointerEnter={(e) => e.pointerType !== 'touch' && setSide('taala')}
            onPointerLeave={() => setSide(null)}
            className="group/ta relative flex flex-col overflow-hidden rounded-[1.4rem] border border-orchid/25 bg-white/60 p-5 text-left transition-all duration-500 md:p-6"
            style={{
              transform: side === 'taala' ? 'scale(1.02)' : 'scale(1)',
              opacity: side === 'theta' ? 0.62 : 1,
            }}
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orchid/15 px-2.5 py-[3px] text-[10.5px] font-medium tracking-wide text-orchid">
                Project Showcase
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C0913C]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
                </svg>
                1st place
              </span>
            </span>

            <span className="mt-3 block font-serif text-[19px] font-light leading-snug text-plum">
              Therapy as a Living Art
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-plum-faint">
              Carnegie Mellon · Integrated Innovation Institute
            </span>

            {/* 海报一角 + 展台照，scrapbook 感 */}
            <span className="relative mt-4 block">
              <img
                src="/ieee/taala-art.jpg"
                alt="Four states of the EEG-driven generative art — calm blue, high-arousal purple, excited warm yellow, and the explain mode"
                loading="lazy"
                className="h-[188px] w-full rounded-[1rem] border border-plum/10 object-cover object-[30%_30%] transition-transform duration-500 group-hover/ta:-translate-y-[5px]"
              />
              <img
                src="/ieee/poster.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute -bottom-3 left-3 h-[74px] w-[104px] -rotate-[5deg] rounded-[0.6rem] border-2 border-white object-cover shadow-[0_12px_26px_-12px_rgba(58,36,64,0.6)] transition-transform duration-500 group-hover/ta:-rotate-[2deg]"
              />
            </span>

            <span className="mt-6 block text-[13px] leading-relaxed text-plum-muted">
              EEG turned into moving art in real time — and an explain mode that shows people which
              signals shaped what they’re seeing. I designed the poster and the product UI.
            </span>

            <span className="mt-3 flex flex-wrap gap-1.5">
              {['Product UI', 'Experience design', 'Research communication'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] text-[10px] leading-none text-plum-faint"
                >
                  {t}
                </span>
              ))}
            </span>

            <span className="mt-auto flex items-center justify-between gap-2 pt-4">
              <span className="text-[12px] font-medium text-orchid">See the showcase →</span>
              <span
                className="font-hand text-[14px] text-plum-muted transition-opacity duration-300"
                style={{ opacity: side === 'taala' ? 1 : 0 }}
              >
                making the invisible visible ✦
              </span>
            </span>
          </button>
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
                className="group/is w-[170px] shrink-0 cursor-zoom-in overflow-hidden rounded-[0.9rem] border border-plum/10 bg-white"
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
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#EDF0F8] to-transparent"
          />
        </div>

        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-hand text-[15px] text-plum-muted">the poster, the UI, and the pitch ✦</p>
          <span className="flex flex-wrap gap-2">
            <a
              href="https://ieee-risingstars.org/2026/rising-stars-pitch-contest/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3 py-1.5 text-[11.5px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              Pitch Contest <span aria-hidden>↗</span>
            </a>
            <a
              href="https://ieee-risingstars.org/2026/project-showcase/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3 py-1.5 text-[11.5px] font-medium text-plum transition-colors hover:border-orchid/50"
            >
              Project Showcase <span aria-hidden>↗</span>
            </a>
          </span>
        </div>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </aside>
  )
}
