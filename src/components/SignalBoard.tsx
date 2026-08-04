import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * From product to stage —— IEEE Rising Stars 2026 AgeTech Pitch 的现场反馈板。
 *
 * 不做成 Awards Gallery：奖只是结果，值钱的是「读懂房间」——
 * 现场七八个提问集中在四个方向，每条都能翻成一个产品/GTM 判断。
 * 内容全部来自 Theta Health 的公开赛后复盘，未做加工推断。
 */

const TIMELINE = ['Top 3 finalist', 'Live pitch', '7–8 questions', '1st place']

type Signal = {
  k: string
  tint: string
  head: string
  question: string
  revealed: string
  direction: string
}

const SIGNALS: Signal[] = [
  {
    k: 'Trust',
    tint: '#D193A8',
    head: 'privacy and LLM safety',
    question:
      'Even after we said the product is HIPAA compliant, several people kept pressing: how do you guarantee health data never leaks into the LLM?',
    revealed:
      'Compliance on a slide isn’t the same as confidence. What the room wanted was an architecture they could reason about — usable, but not exposed.',
    direction:
      'The answer we gave — layered isolation, least-privilege access, the LLM working only on controlled, de-identified, structured context — became a positioning line rather than an implementation detail: Privacy-by-Architecture.',
  },
  {
    k: 'Reach',
    tint: '#B98ACB',
    head: 'communities and trusted channels',
    question:
      'IEEE’s 2025 president asked whether we would build our own senior community or join the ones that already exist.',
    revealed:
      'For an older audience, distribution is a trust problem before it is a marketing problem. You arrive through someone they already believe.',
    direction:
      'We shared what exists today — a Discord for early feedback and co-creation — and where we’re headed: AARP as a priority channel, since it carries both reach and inherited trust. His addition: AARP is not only a channel, it can be a commercial entry point.',
  },
  {
    k: 'Standards',
    tint: '#7A9CC6',
    head: 'IEEE standards, FHIR, FDA boundaries',
    question:
      'Are you aligning to IEEE standards? Do you need FDA approval? And what’s the hardest part of that path?',
    revealed:
      'The regulatory question is really a scope question. Being precise about what the product does not do is what keeps the path clear.',
    direction:
      'Theta organises, structures and explains health data — it does not diagnose, decide treatment, or replace clinical care, so it sits outside device/diagnostic scope today. Longer term we track IEEE work on data systems, AI and trustworthy computing, EHR/FHIR interoperability, and FDA’s direction on digital health. We opened a conversation with the IEEE Standards Association after the conference.',
  },
  {
    k: 'Access',
    tint: '#8FAE8B',
    head: 'multilingual and low-tech users',
    question:
      'Will it support health questions in other languages? And what about older adults who don’t use a smartphone at all?',
    revealed:
      'The people who need this most are often the furthest from the default interface. Accessibility isn’t a later feature — it decides who the product is even for.',
    direction:
      'Multilingual support sits in the roadmap as a baseline capability, and the longer-term direction is lower-barrier interaction — ambient or device-based access rather than one more app to learn.',
  },
]

const SHOTS: GalleryItem[] = [
  {
    src: '/ieee/theta-podium.jpg',
    alt: 'Olivia presenting Theta Health AI from the IEEE Rising Stars lectern',
    cap: 'The AgeTech pitch, from the lectern',
  },
  {
    src: '/ieee/theta-room.jpg',
    alt: 'The audience during the Theta Health pitch',
    cap: 'The room — 7–8 questions followed',
  },
  {
    src: '/ieee/theta-problem-slide.jpg',
    alt: 'The problem slide — 10,000 people turning 65 a day, 800,000 clinician shortage by 2027',
    cap: 'The problem slide — why AgeTech, in numbers',
  },
  {
    src: '/ieee/theta-vicechair.jpg',
    alt: 'Olivia with IEEE Rising Stars Conference Vice Chair Scott Tamashiro',
    cap: 'With Conference Vice Chair Scott Tamashiro',
  },
  {
    src: '/ieee/theta-cert.jpg',
    alt: 'The first-place certificate for Theta Health AI, Pitch Contest: Age Tech',
    cap: 'Pitch Contest · Age Tech — first place',
  },
]

export function SignalBoard() {
  const [open, setOpen] = useState('Trust')
  const [zoom, setZoom] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(233,238,247,0) 0%, rgba(233,238,247,0.5) 30%, rgba(250,231,234,0.4) 100%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="label-text mb-4 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#7A9CC6]" />
            From product to stage · IEEE Rising Stars 2026
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Listening to the room — and finding the{' '}
            <span className="italic text-orchid">signals behind the questions.</span>
          </h2>
        </Reveal>

        {/* 时间线：最后一枚落章 */}
        <Reveal delay={0.12}>
          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
            {TIMELINE.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                    i === TIMELINE.length - 1
                      ? 'border border-[#C0913C]/45 bg-champagne/35 text-[#8A6A22]'
                      : 'border border-plum/10 bg-white/70 text-plum-muted'
                  }`}
                  style={
                    i === TIMELINE.length - 1
                      ? { animation: 'annot-in .55s .5s cubic-bezier(.2,.8,.25,1) both' }
                      : undefined
                  }
                >
                  {i === TIMELINE.length - 1 && <span aria-hidden>★ </span>}
                  {t}
                </span>
                {i < TIMELINE.length - 1 && (
                  <span aria-hidden className="text-[12px] text-plum-faint">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── 信号板：四个方向常驻在左，选中的一条在右边展开成三拍 ──
             不用手风琴：四条折起来时，「七八个问题收敛成四个方向」这句话
             在画面上是看不见的；摊开在左边才立得住。 */}
        <div className="mt-10 grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-serif text-[19px] font-light text-plum">What did the room care about?</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-plum-muted">
              Seven or eight questions, and they clustered into four. Each one is a market signal if
              you read past the question itself.
            </p>

            <ul className="mt-5 space-y-1.5" role="tablist" aria-label="Signals from the room">
              {SIGNALS.map((sig, i) => {
                const on = open === sig.k
                return (
                  <li key={sig.k} style={{ animation: `annot-in .5s ${0.07 * i}s ease-out both` }}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setOpen(sig.k)}
                      className="group/s flex w-full items-start gap-3 rounded-[0.9rem] border px-3.5 py-3 text-left transition-all duration-300"
                      style={{
                        borderColor: on ? `${sig.tint}66` : 'rgba(58,36,64,0.1)',
                        background: on ? `${sig.tint}14` : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {/* 左侧一道色条：选中时长满，未选只留一点 */}
                      <span
                        aria-hidden
                        className="mt-[3px] block w-[3px] shrink-0 rounded-full transition-all duration-300"
                        style={{ height: on ? 34 : 12, backgroundColor: sig.tint }}
                      />
                      <span className="min-w-0">
                        <span
                          className="block text-[12px] font-medium leading-none transition-colors duration-300"
                          style={{ color: on ? sig.tint : '#8A6E84' }}
                        >
                          {sig.k}
                        </span>
                        <span className="mt-1.5 block text-[12.5px] leading-snug text-plum-muted">
                          {sig.head}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

          </div>

          {/* 右：选中那条读成三拍 —— 问题 → 它暴露了什么 → 它变成了什么 */}
          <div className="md:col-span-8">
            {SIGNALS.filter((sig) => sig.k === open).map((sig) => (
              <div
                key={sig.k}
                className="relative rounded-[1.4rem] border bg-white/75 p-5 md:p-7"
                style={{ borderColor: `${sig.tint}40`, animation: 'annot-in .45s cubic-bezier(.2,.8,.25,1) both' }}
              >
                <ol className="relative space-y-6">
                  {/* 贯穿三拍的竖线 */}
                  <span
                    aria-hidden
                    className="absolute bottom-4 left-[9px] top-4 w-px"
                    style={{ background: `linear-gradient(180deg, ${sig.tint}00, ${sig.tint}99, ${sig.tint}00)` }}
                  />

                  {[
                    { n: '01', t: 'The question', body: sig.question, italic: true },
                    { n: '02', t: 'What it revealed', body: sig.revealed },
                    { n: '03', t: 'Where it took us', body: sig.direction, out: true },
                  ].map((beat, i) => (
                    <li key={beat.n} className="relative flex gap-4" style={{ animation: `annot-in .45s ${0.08 * i}s ease-out both` }}>
                      <span
                        aria-hidden
                        className="relative z-10 mt-[3px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full text-[9px] font-medium"
                        style={{
                          backgroundColor: beat.out ? sig.tint : '#FBF7F2',
                          color: beat.out ? '#fff' : sig.tint,
                          boxShadow: `0 0 0 1px ${sig.tint}66`,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-plum-faint">{beat.t}</p>
                        <p
                          className={`mt-1.5 text-[13.5px] leading-relaxed ${
                            beat.italic ? 'italic text-plum' : beat.out ? 'text-plum' : 'text-plum-muted'
                          }`}
                        >
                          {beat.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 font-hand text-[16px] text-plum-muted">the questions were the signal ✦</p>

        {/* ── 现场：照片 + 我的角色 + 一句旁证 ───────────────────── */}
        <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => setZoom(0)}
              className="group/p halftone relative block w-full cursor-zoom-in overflow-hidden rounded-[1.4rem] border border-plum/10"
              aria-label="View the pitch photo larger"
            >
              <img
                src="/ieee/theta-podium.jpg"
                alt="Olivia presenting Theta Health AI at IEEE Rising Stars"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-[50%_24%] transition-transform duration-700 group-hover/p:scale-[1.04]"
              />
            </button>
            <div className="mt-3 flex gap-3">
              {/* 副主席那张已经单独出现在下面的引语里，缩略图换成证书，别重复 */}
              {[1, 2, 4].map((idx) => SHOTS[idx]).map((sh, i) => (
                <button
                  key={sh.src}
                  type="button"
                  onClick={() => setZoom([1, 2, 4][i])}
                  aria-label={`View larger: ${sh.alt}`}
                  className="group/t halftone relative h-[64px] flex-1 cursor-zoom-in overflow-hidden rounded-[0.8rem] border border-plum/10 bg-white"
                >
                  <img
                    src={sh.src}
                    alt={sh.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/t:scale-[1.08]"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center md:col-span-7">
            <div className="-rotate-1 self-start rounded-md border border-dashed border-rose/50 bg-white/85 px-4 py-3">
              <p className="font-hand text-[15px] text-plum">my part ✦</p>
              <p className="mt-1 text-[12.5px] leading-snug text-plum-muted">
                product story · on-stage pitch · live Q&amp;A
              </p>
            </div>

            <blockquote className="mt-6 flex items-start gap-4">
              <button
                type="button"
                onClick={() => setZoom(3)}
                aria-label="View larger: with Conference Vice Chair Scott Tamashiro"
                className="group/v halftone relative block shrink-0 cursor-zoom-in overflow-hidden rounded-[0.9rem] border border-plum/10"
              >
                <img
                  src="/ieee/theta-vicechair-tight.jpg"
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-[104px] w-[104px] object-cover transition-transform duration-500 group-hover/v:scale-[1.07]"
                />
              </button>
              <div className="min-w-0 border-l-2 border-[#7A9CC6]/50 pl-4">
                <p className="text-[14px] leading-relaxed text-plum">
                  “Usually there aren’t many questions after a pitch. How active this discussion was
                  reflects how interested the room is in Theta Health’s direction.”
                </p>
                <footer className="mt-2 text-[11.5px] text-plum-faint">
                  Scott Tamashiro · IEEE Rising Stars Conference Vice Chair
                </footer>
              </div>
            </blockquote>
          </div>
        </div>
      </div>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </section>
  )
}
