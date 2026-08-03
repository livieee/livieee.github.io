import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * Therapy as a Living Art —— IEEE Rising Stars 2026 Project Showcase 一等奖。
 *
 * 事实来源：CMU 研究海报（她设计）、团队负责人 Jessie Xiong 的公开项目帖、
 * 开源仓库 jessiex1998/IEEE_muse。
 * 她的贡献按帖子与她本人确认的口径写：研究海报 + 产品 UI，不夸大到系统开发。
 */

const REPO = 'https://github.com/jessiex1998/IEEE_muse'
const POST =
  'https://www.linkedin.com/posts/jessie-x_ieeerisingstar2026-ieee-ieeerisingstar2026-activity-7413748579472859138-BOzY'
const IEEE = 'https://ieee-risingstars.org/2026/project-showcase/'

function Chapter({
  n,
  label,
  title,
  intro,
  className = 'mt-24',
}: {
  n: string
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <Reveal className={className}>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-serif text-[15px] leading-none text-orchid">{n}</span>
        <span aria-hidden className="h-px w-6 shrink-0 bg-plum/20" />
        <p className="label-text">{label}</p>
      </div>
      <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">{intro}</p>}
    </Reveal>
  )
}

/* ── 两种模式：整页的核心交互 ─────────────────────────────────── */
const MODES = {
  art: {
    key: 'art' as const,
    label: 'Art Mode',
    line: 'Creates emotional resonance.',
    body: 'The silhouette becomes an aura. Calm reads as a dim, flowing stream; high arousal ignites into a vibrant, flame-like form. Nothing to read — you just recognise yourself in it.',
    shots: [
      { src: '/ieee/mode-calm.jpg', cap: 'calm · low arousal, blue-toned' },
      { src: '/ieee/mode-excited.jpg', cap: 'excited · elevated β, warm yellow' },
    ],
    accent: '#B98ACB',
  },
  explain: {
    key: 'explain' as const,
    label: 'Explain Mode',
    line: 'Creates transparency and trust.',
    body: 'The same moment, shown as the five EEG bands and a position in valence–arousal space — so a person can see which signals produced the image they were just looking at.',
    shots: [
      { src: '/ieee/mode-explain.jpg', cap: 'the five bands, live' },
      { src: '/ieee/mode-intense.jpg', cap: 'intense · high arousal, violet' },
    ],
    accent: '#7A9CC6',
  },
}

const PIPELINE = [
  { k: 'EEG capture', v: 'Muse 2 headband, AF7 / AF8, streamed over LSL.' },
  { k: 'Signal processing', v: 'δ θ α β γ band extraction, normalisation, sliding-window smoothing.' },
  { k: 'Emotion mapping', v: 'Arousal = β/α, valence = ln(αR) − ln(αL) → Russell’s circumplex.' },
  { k: 'Generative visual', v: 'Quadrant prompts drive ComfyUI + Stable Diffusion on a cloud GPU.' },
  { k: 'Interpretable feedback', v: 'Explain mode exposes the bands and coordinates behind the frame.' },
]

const SHAPED = [
  {
    k: 'Research poster',
    v: 'Turned a system spanning neuroscience, signal processing and generative AI into one readable visual narrative — the artefact the showcase was judged on.',
    img: '/ieee/poster.jpg',
    pos: '50% 30%',
  },
  {
    k: 'Product UI',
    v: 'Designed Art Mode and Explain Mode as two complementary experiences: one to feel, one to understand — sharing a layout so switching never loses the moment.',
    img: '/ieee/taala-art.jpg',
    pos: '28% 26%',
  },
]

const SHOTS: GalleryItem[] = [
  { src: '/ieee/taala-art.jpg', alt: 'Four states of the generative art', cap: 'Calm, intense, excited — and the explain mode' },
  { src: '/ieee/poster.jpg', alt: 'The CMU research poster', cap: 'The CMU research poster — I designed it' },
  { src: '/ieee/poster-team.jpg', alt: 'The team at the CMU booth', cap: 'At the CMU booth, mid-showcase' },
  { src: '/ieee/certs-three.jpg', alt: 'Three team members with first-place certificates', cap: 'Project Showcase — first place' },
  { src: '/ieee/showcase-stage.jpg', alt: 'Winners and organisers on stage', cap: 'On stage with the organisers' },
  { src: '/ieee/poster-team2.jpg', alt: 'The team beside the CMU Silicon Valley banner', cap: 'Beside the CMU Silicon Valley banner' },
]

const TEAM = ['Jessie Xiong', 'Olivia Xiao', 'David Ma', 'Jean Wang', 'Isabella Cheng', 'Richa Pragat']

export function LivingArtCase() {
  const [mode, setMode] = useState<'art' | 'explain'>('art')
  const [zoom, setZoom] = useState<number | null>(null)
  const m = MODES[mode]

  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case">
          <Link
            to="/#impact"
            className="group/back inline-flex items-center gap-1.5 text-[13px] font-medium text-plum-muted transition-colors hover:text-plum"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover/back:-translate-x-0.5">←</span>
            Back to work
          </Link>
          <Link to="/" className="font-serif text-[17px] text-plum">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <article className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-plum/10">
              <img src="/logos/ieee.png" alt="IEEE" className="h-[18px] w-[18px] object-contain" />
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-label text-[#C0913C]">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
              </svg>
              Project Showcase · 1st place · 2026
            </span>
          </div>
        </Reveal>

        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="Making inner states" />{' '}
          <span className="italic text-orchid">
            <WordReveal text="visible." delay={0.3} />
          </span>
        </h1>

        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            A digital mirror for the mind — real-time brain signals rendered as living art, plus a
            way to understand what shaped it.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Product UI', 'Experience design', 'Research communication'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-orchid/35 bg-lavender/25 px-3.5 py-1.5 text-[11.5px] font-medium text-plum"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-label text-plum-faint">
            Carnegie Mellon University · Integrated Innovation Institute · Silicon Valley
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: IEEE, label: 'IEEE Showcase' },
              { href: REPO, label: 'GitHub' },
              { href: POST, label: 'Project write-up' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-orchid/50"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10" y={28}>
          <button
            type="button"
            onClick={() => setZoom(0)}
            className="block w-full cursor-zoom-in overflow-hidden rounded-[1.6rem] border border-plum/10"
            aria-label="View the generative art larger"
          >
            <img
              src="/ieee/taala-art.jpg"
              alt="Four states of the EEG-driven generative art — calm blue, intense violet, excited warm yellow, and explain mode"
              className="aspect-[16/8] w-full object-cover"
            />
          </button>
        </Reveal>

        {/* ── 01 · 问题 ────────────────────────────────────────── */}
        <Chapter
          n="01"
          label="The invisible problem"
          title="Brain signals are rich in information — and almost impossible to feel."
          intro="Self-report scales are slow and easy to bias. Consumer EEG is fast and objective, but what it hands back is a waveform or the word “calm” — abstract enough that most people can’t connect it to anything they’re actually experiencing."
        />
        <Reveal className="mt-8" y={24}>
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-[1.3rem] border border-plum/10 bg-white/60 p-6">
              <p className="label-text mb-3">What the system sees</p>
              <svg viewBox="0 0 300 90" className="h-[86px] w-full" fill="none" aria-hidden>
                {[0, 1, 2, 3, 4].map((r) => (
                  <path
                    key={r}
                    d={`M0 ${12 + r * 17} ${Array.from({ length: 30 })
                      .map((_, i) => `L${i * 10} ${12 + r * 17 + Math.sin(i * (0.8 + r * 0.35)) * (3 + r)}`)
                      .join(' ')}`}
                    stroke="#8A6E84"
                    strokeOpacity="0.4"
                    strokeWidth="1.1"
                  />
                ))}
              </svg>
              <p className="mt-3 text-[12.5px] leading-snug text-plum-faint">
                δ · θ · α · β · γ — five bands, updating every few milliseconds
              </p>
            </div>

            <div className="flex items-center justify-center">
              <p className="font-hand text-[15px] text-plum-muted md:rotate-0">raw signal → felt experience</p>
            </div>

            <div className="rounded-[1.3rem] border border-orchid/20 bg-lavender/20 p-6">
              <p className="label-text mb-3">What a person can feel</p>
              <div className="overflow-hidden rounded-[0.9rem]">
                <img
                  src="/ieee/taala-art.jpg"
                  alt="A generated aura from the installation"
                  loading="lazy"
                  className="h-[86px] w-full object-cover object-[18%_22%]"
                />
              </div>
              <p className="mt-3 text-[12.5px] leading-snug text-plum-faint">
                the same moment, as something you recognise without being told
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── 02 · 两种模式 ────────────────────────────────────── */}
        <Chapter
          n="02"
          label="The core of the interface"
          title="One mode helps people feel. The other helps them understand."
          intro="The design bet: emotional resonance and interpretability shouldn’t compete for the same screen. So the system carries two modes that share a layout — you can switch without losing the moment."
        />
        <Reveal className="mt-8" y={24}>
          <div className="rounded-[1.6rem] border border-plum/10 bg-white/60 p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              {(['art', 'explain'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMode(k)}
                  aria-pressed={mode === k}
                  className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-300 ${
                    mode === k
                      ? 'text-cream shadow-[0_10px_24px_-12px_rgba(58,36,64,0.6)]'
                      : 'border border-plum/15 bg-white text-plum-muted hover:text-plum'
                  }`}
                  style={mode === k ? { backgroundColor: MODES[k].accent } : undefined}
                >
                  {MODES[k].label}
                </button>
              ))}
              <span className="ml-auto font-hand text-[15px] text-plum-muted">feel it ↔ understand it</span>
            </div>

            <div key={mode} style={{ animation: 'annot-in .45s ease-out both' }}>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {m.shots.map((sh) => (
                  <figure key={sh.src}>
                    <img
                      src={sh.src}
                      alt={sh.cap}
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-[1.1rem] border border-plum/10 object-cover"
                    />
                    <figcaption className="mt-2 font-hand text-[13px] text-plum-muted">{sh.cap}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-5 border-l-2 pl-3 text-[14px] font-medium text-plum" style={{ borderColor: m.accent }}>
                {m.line}
              </p>
              <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-plum-muted">{m.body}</p>
            </div>
          </div>
        </Reveal>

        {/* ── 03 · 怎么跑起来 ──────────────────────────────────── */}
        <Chapter
          n="03"
          label="How it works"
          title="Five steps from a headband to a moving image"
          intro="Built on consumer-grade hardware and open-source tooling, so the whole thing is reproducible rather than a one-off installation."
        />
        <Reveal className="mt-8" y={24}>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {PIPELINE.map((s, i) => (
              <li
                key={s.k}
                style={{ animation: `annot-in .5s ${0.08 * i}s ease-out both` }}
                className="rounded-[1.1rem] border border-plum/10 bg-white/60 p-4"
              >
                <span className="font-serif text-[15px] leading-none text-orchid">0{i + 1}</span>
                <p className="mt-2 text-[13px] font-medium leading-snug text-plum">{s.k}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-plum-faint">{s.v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-plum-faint">
            <span className="font-hand text-[14px] text-plum-muted">running on ✦</span>
            {['Muse 2', 'Python', 'LSL', 'MediaPipe', 'ComfyUI', 'Stable Diffusion', 'ControlNet', 'RunPod GPU'].map(
              (t) => (
                <span key={t} className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] leading-none">
                  {t}
                </span>
              ),
            )}
          </p>
        </Reveal>

        {/* ── 04 · 我做的部分 ──────────────────────────────────── */}
        <Chapter
          n="04"
          label="What I shaped"
          title="The two artefacts people actually met"
          intro="A seven-person team built the system. My part was the layer between it and everyone else — the interface people stood in front of, and the poster the judges read."
        />
        <Reveal className="mt-8" y={24}>
          <div className="grid gap-5 md:grid-cols-2">
            {SHAPED.map((c, i) => (
              <div
                key={c.k}
                style={{ animation: `annot-in .5s ${0.1 + i * 0.1}s ease-out both` }}
                className="overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white/60"
              >
                <button
                  type="button"
                  onClick={() => setZoom(i === 0 ? 1 : 0)}
                  aria-label={`View ${c.k} larger`}
                  className="group/s block w-full cursor-zoom-in overflow-hidden"
                >
                  <img
                    src={c.img}
                    alt={c.k}
                    loading="lazy"
                    className="h-[180px] w-full object-cover transition-transform duration-700 group-hover/s:scale-[1.04]"
                    style={{ objectPosition: c.pos }}
                  />
                </button>
                <div className="p-5">
                  <p className="font-serif text-[17px] font-light text-plum">{c.k}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-plum-faint">
            Team: {TEAM.join(' · ')} — advised by Prof. Catherine Fang, who nominated the project to
            represent CMU Silicon Valley.
          </p>
        </Reveal>

        {/* ── 存档 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-plum/20" />
            <p className="label-text">When the work met the room</p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setZoom(i)}
                aria-label={`View larger: ${s.alt}`}
                className="group/is w-[240px] shrink-0 cursor-zoom-in overflow-hidden rounded-[1.1rem] border border-plum/10 bg-white"
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/is:scale-[1.05]"
                />
              </button>
            ))}
          </div>
          <p className="mt-4 font-hand text-[16px] text-plum-muted">making the invisible visible ✦</p>
        </Reveal>

        {/* ── 收尾 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="border-t border-plum/10 pt-10">
            <p className="max-w-2xl font-serif text-xl font-light leading-snug text-plum md:text-2xl">
              Different technologies, <span className="italic text-orchid">the same instinct</span> —
              listen for the human need, then make the complexity understandable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/#impact"
                className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-orchid/50"
              >
                ← All work
              </Link>
              <Link
                to="/work/theta"
                className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                Theta Health →
              </Link>
            </div>
          </div>
        </Reveal>
      </article>

      {zoom !== null && (
        <Lightbox items={SHOTS} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} />
      )}
    </main>
  )
}
