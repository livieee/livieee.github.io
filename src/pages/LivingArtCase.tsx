import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/Reveal'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'

/**
 * Therapy as a Living Art —— IEEE Rising Stars 2026 Project Showcase 一等奖。
 *
 * 全站唯一的深色章节只在 Hero（Living Canvas），第二屏起回到 ivory，
 * 结尾回到 warm ivory / blush，确保它仍属于这个网站。
 *
 * 事实来源：CMU 研究海报（她设计）、团队负责人 Jessie Xiong 的公开项目帖、
 * 项目提案 Essay、开源仓库 jessiex1998/IEEE_muse。
 * 她的贡献按帖子与她本人确认的口径写：视觉设计 / 研究海报 / 产品 UI。
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

/* ── Hero：Living Canvas ──────────────────────────────────────── */
const MOTES = [
  { x: 12, y: 24, s: 3, d: 0 },
  { x: 26, y: 66, s: 2, d: 1.4 },
  { x: 38, y: 18, s: 4, d: 2.6 },
  { x: 61, y: 72, s: 2.5, d: 0.8 },
  { x: 74, y: 30, s: 3, d: 3.2 },
  { x: 86, y: 58, s: 2, d: 1.9 },
  { x: 19, y: 46, s: 2, d: 4.1 },
  { x: 52, y: 40, s: 2.5, d: 2.2 },
  { x: 68, y: 14, s: 2, d: 5 },
  { x: 91, y: 20, s: 3, d: 3.7 },
]

function LivingCanvas() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState({ x: 0.5, y: 0.5 })

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType === 'touch') return
        const r = e.currentTarget.getBoundingClientRect()
        setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
      }}
      className="relative overflow-hidden rounded-[1.8rem]"
      style={{ background: 'linear-gradient(150deg, #241832 0%, #1B2340 46%, #131A2E 100%)' }}
    >
      {/* 指针跟随的柔光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[560px] w-[560px] rounded-full transition-transform duration-500 ease-out"
        style={{
          left: `calc(${p.x * 100}% - 280px)`,
          top: `calc(${p.y * 100}% - 280px)`,
          background:
            'radial-gradient(circle, rgba(159,140,232,0.30) 0%, rgba(122,156,198,0.16) 42%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* 缓慢移动的脑波 */}
      {[
        { y: 26, c: '#7FD3E8', o: 0.5, dur: 22 },
        { y: 44, c: '#9F8CE8', o: 0.45, dur: 30 },
        { y: 62, c: '#F2A0C4', o: 0.4, dur: 26 },
        { y: 78, c: '#6FA8D6', o: 0.35, dur: 36 },
      ].map((w, r) => (
        <svg
          key={w.y}
          viewBox="0 0 400 100"
          aria-hidden
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-[200%]"
          style={{ animation: `canvas-wave ${w.dur}s linear infinite` }}
        >
          <path
            d={`M0 ${w.y} ${Array.from({ length: 101 })
              .map(
                (_, i) =>
                  `L${i * 4} ${
                    w.y +
                    Math.sin(i * (0.16 + r * 0.07)) * (3 + r * 1.6 + p.y * 3) +
                    Math.sin(i * 0.045 + r) * 3
                  }`,
              )
              .join(' ')}`}
            stroke={w.c}
            strokeOpacity={w.o}
            strokeWidth="0.7"
            fill="none"
          />
        </svg>
      ))}

      {/* 光点 */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-[#CBB8F5]"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: m.s,
            height: m.s,
            filter: 'blur(0.4px)',
            boxShadow: '0 0 8px 2px rgba(203,184,245,0.5)',
            animation: `mote-float ${7 + (i % 4)}s ${m.d}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="relative grid items-center gap-8 px-7 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-16">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#E8C77A]">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
            </svg>
            IEEE Project Showcase · 1st place · 2026
          </p>

          <h1 className="mt-5 font-serif text-[clamp(1.9rem,4.6vw,3.1rem)] font-light leading-[1.1] text-[#F6F1EA]">
            Making inner states visible
            <br />
            <span className="italic text-[#CBB8F5]">through living art</span>
          </h1>

          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#D6CFE4]">
            An EEG-driven generative experience that translated real-time emotional signals into
            evolving visual art — while helping people understand what shaped the result.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Product UI', 'Experience framing', 'Research communication', 'Cross-functional collaboration'].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[11.5px] font-medium text-[#E6E0F0] backdrop-blur-sm"
                >
                  {t}
                </span>
              ),
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
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
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-plum transition-transform duration-300 hover:-translate-y-0.5"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>

          <p className="mt-7 text-[12px] uppercase tracking-label text-[#A69CBC]">
            Carnegie Mellon University · Integrated Innovation Institute · Silicon Valley
          </p>
        </div>

        <div className="relative">
          <img
            src="/ieee/mode-calm.jpg"
            alt="The Art Mode silhouette — a calm, blue-toned aura generated from live EEG"
            className="w-full rounded-[1.2rem] border border-white/15 object-cover shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]"
          />
          <p className="absolute -top-7 right-2 rotate-[-3deg] font-hand text-[17px] text-[#E8C77A]">
            feel it ↔ understand it
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── 五步管线 ─────────────────────────────────────────────────── */
const PIPELINE = [
  { k: 'EEG capture', v: 'Muse 2 headband, AF7 / AF8, streamed over LSL.', c: '#7FD3E8' },
  { k: 'Signal processing', v: 'Bandpass → FFT → δ θ α β γ band power, smoothed.', c: '#8FAE8B' },
  { k: 'Emotion mapping', v: 'Arousal = β/α, valence = ln(αR) − ln(αL) → a quadrant.', c: '#C79A4B' },
  { k: 'Generative visual', v: 'Quadrant prompt + silhouette mask → ComfyUI on a cloud GPU.', c: '#B98ACB' },
  { k: 'Interpretable feedback', v: 'Explain mode exposes the bands behind the frame.', c: '#7A9CC6' },
]

function Pipeline() {
  const [lit, setLit] = useState<number>(-1)
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = [...el.querySelectorAll('li')]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = items.indexOf(e.target as HTMLLIElement)
            setLit((prev) => Math.max(prev, i))
          }
        })
      },
      { rootMargin: '-20% 0px -30% 0px', threshold: 0.2 },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return (
    <ol ref={ref} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {PIPELINE.map((s, i) => {
        const on = i <= lit
        return (
          <li
            key={s.k}
            className="rounded-[1.1rem] border bg-white/60 p-4 transition-all duration-500"
            style={{
              borderColor: on ? `${s.c}66` : 'rgba(58,36,64,0.1)',
              boxShadow: on ? `0 12px 28px -18px ${s.c}` : 'none',
              opacity: on ? 1 : 0.5,
              transform: on ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg font-serif text-[13px] leading-none transition-colors duration-500"
              style={{ backgroundColor: on ? `${s.c}22` : 'rgba(58,36,64,0.05)', color: on ? s.c : '#8A6E84' }}
            >
              0{i + 1}
            </span>
            <p className="mt-2.5 text-[13px] font-medium leading-snug text-plum">{s.k}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-plum-faint">{s.v}</p>
          </li>
        )
      })}
    </ol>
  )
}

/* ── 两种模式 ─────────────────────────────────────────────────── */
const MODES = {
  art: {
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
    label: 'Explain Mode',
    line: 'Creates transparency and trust.',
    body: 'The same moment as five EEG bands and a position in valence–arousal space — so a person can see which signals produced the image they were just looking at.',
    shots: [
      { src: '/ieee/mode-explain.jpg', cap: 'the five bands, live' },
      { src: '/ieee/mode-intense.jpg', cap: 'intense · high arousal, violet' },
    ],
    accent: '#7A9CC6',
  },
}

/* ── 四张工作稿 ───────────────────────────────────────────────── */
const SHAPED = [
  {
    k: 'Product UI',
    v: 'Designed Art Mode and Explain Mode as two complementary experiences — one to feel, one to understand.',
    img: '/ieee/mode-explain.jpg',
    tilt: '-rotate-[1.4deg]',
  },
  {
    k: 'Research poster',
    v: 'Translated a complex interdisciplinary system into one clear visual narrative — the artefact the showcase was judged on.',
    img: '/ieee/poster.jpg',
    tilt: 'rotate-[1.1deg]',
  },
  {
    k: 'Experience framing',
    v: 'Helped connect neuroscience, generative AI, emotional resonance and interpretability into a single coherent story.',
    img: '/ieee/mode-excited.jpg',
    tilt: '-rotate-[0.6deg]',
  },
  {
    k: 'Showcase communication',
    v: 'Supported the exhibition narrative and the booth — what visitors read, saw and were walked through.',
    img: '/ieee/poster-team.jpg',
    tilt: 'rotate-[1.6deg]',
  },
]

const SHOTS: GalleryItem[] = [
  { src: '/ieee/taala-art.jpg', alt: 'Four states of the generative art', cap: 'Calm, intense, excited — and the explain mode' },
  { src: '/ieee/poster.jpg', alt: 'The CMU research poster', cap: 'The CMU research poster — I designed it' },
  { src: '/ieee/poster-team.jpg', alt: 'The team at the CMU booth', cap: 'At the CMU booth, mid-showcase' },
  { src: '/ieee/certs-three.jpg', alt: 'Three team members with first-place certificates', cap: 'Project Showcase — first place' },
  { src: '/ieee/showcase-stage.jpg', alt: 'Winners and organisers on stage', cap: 'On stage with the organisers' },
  { src: '/ieee/poster-team2.jpg', alt: 'The team beside the CMU Silicon Valley banner', cap: 'Beside the CMU Silicon Valley banner' },
  { src: '/ieee/architecture.jpg', alt: 'The system architecture diagram', cap: 'Local node → cloud generation → dual interface' },
]

const TEAM = ['Jessie Xiong', 'Olivia Xiao', 'David Ma', 'Jean Wang', 'Isabella Cheng', 'Richa Pragat']

export function LivingArtCase() {
  const [mode, setMode] = useState<'art' | 'explain'>('art')
  const [arch, setArch] = useState(false)
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

      <article className="mx-auto max-w-5xl px-6 pb-28 pt-28 md:px-10 md:pt-32">
        {/* ── Hero · Living Canvas ─────────────────────────────── */}
        <LivingCanvas />

        {/* ── 01 · 问题 ────────────────────────────────────────── */}
        <Chapter
          n="01"
          label="The invisible problem"
          title="Brain signals are rich in information — but difficult to experience."
          intro="Self-report scales are slow and easy to bias. Consumer EEG is fast and objective, but what it hands back is a waveform or the word “calm” — abstract enough that most people can’t connect it to anything they’re actually feeling."
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

            <p className="text-center font-hand text-[15px] text-plum-muted">
              raw signal → meaningful experience
            </p>

            <div className="rounded-[1.3rem] border border-orchid/20 bg-lavender/20 p-6">
              <p className="label-text mb-3">What a person can feel and understand</p>
              <div className="overflow-hidden rounded-[0.9rem]">
                <img
                  src="/ieee/mode-excited.jpg"
                  alt="A generated aura from the installation"
                  loading="lazy"
                  className="h-[86px] w-full object-cover"
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
          intro="Consumer hardware and open-source tooling, assembled by a seven-person team in twenty days — reproducible rather than a one-off installation."
        />
        <Reveal className="mt-8" y={24}>
          <Pipeline />
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setArch((a) => !a)}
              aria-expanded={arch}
              className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 bg-white px-4 py-2 text-[12.5px] font-medium text-plum transition-colors hover:border-orchid/50"
            >
              {arch ? 'Hide the technical architecture' : 'View the technical architecture'}
              <span aria-hidden className={`transition-transform duration-300 ${arch ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {arch && (
              <div style={{ animation: 'annot-in .45s ease-out both' }}>
                <button
                  type="button"
                  onClick={() => setZoom(6)}
                  aria-label="View the architecture diagram larger"
                  className="mt-4 block w-full cursor-zoom-in overflow-hidden rounded-[1.2rem] border border-plum/10 bg-white"
                >
                  <img
                    src="/ieee/architecture.jpg"
                    alt="System architecture — local node (EEG acquisition, signal processing, emotion estimation, camera tracking) streaming to cloud generation, feeding a dual user interface"
                    className="w-full object-contain"
                  />
                </button>
                <p className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-plum-faint">
                  <span className="font-hand text-[14px] text-plum-muted">running on ✦</span>
                  {['Muse 2', 'Python', 'LSL', 'MediaPipe', 'ComfyUI', 'Stable Diffusion', 'ControlNet', 'RunPod GPU'].map(
                    (t) => (
                      <span key={t} className="rounded-full border border-plum/10 bg-white/70 px-2 py-[2px] leading-none">
                        {t}
                      </span>
                    ),
                  )}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* ── 04 · 我做的部分 ──────────────────────────────────── */}
        <Chapter
          n="04"
          label="What I shaped"
          title="Four working sheets, pinned to the wall"
          intro="A seven-person team built the system. My part was the layer between it and everyone else — what people stood in front of, and what the judges read."
        />
        <Reveal className="mt-8" y={24}>
          <div className="rounded-[1.6rem] border border-plum/10 paper-grid p-5 md:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {SHAPED.map((c, i) => (
                <figure
                  key={c.k}
                  style={{ animation: `annot-in .5s ${0.08 * i}s ease-out both` }}
                  className={`group/s relative ${c.tilt} rounded-[0.9rem] border border-plum/10 bg-white p-3 shadow-[0_14px_30px_-18px_rgba(90,63,86,0.5)] transition-transform duration-500 hover:rotate-0`}
                >
                  <span
                    aria-hidden
                    className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 rounded-[2px] bg-champagne/70 shadow-sm"
                  />
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-[104px] w-full rounded-[0.6rem] object-cover"
                  />
                  <figcaption className="px-1 pb-1 pt-3">
                    <p className="font-serif text-[16px] font-light text-plum">{c.k}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-plum-muted">{c.v}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-plum-faint">
            Team: {TEAM.join(' · ')} — advised by Prof. Catherine Fang, who nominated the project to
            represent CMU Silicon Valley.
          </p>
        </Reveal>

        {/* ── 05 · 领奖时刻 ────────────────────────────────────── */}
        <Reveal className="mt-24">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-plum/20" />
            <p className="label-text">Recognition</p>
          </div>
          <h2 className="font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
            When the work met the room <span className="text-[#C0913C]">✦</span>
          </h2>
        </Reveal>
        <Reveal className="mt-8" y={24}>
          <div className="rounded-[1.6rem] border border-champagne/50 bg-gradient-to-br from-champagne/20 via-cream-soft to-blush/20 p-5 md:p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {SHOTS.slice(1, 4).map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setZoom(i + 1)}
                  aria-label={`View larger: ${s.alt}`}
                  className={`group/r cursor-zoom-in rounded-[0.9rem] border border-plum/10 bg-white p-2.5 shadow-[0_14px_30px_-18px_rgba(90,63,86,0.5)] transition-transform duration-500 hover:rotate-0 ${
                    ['-rotate-[1.5deg]', 'rotate-[1deg]', '-rotate-[0.8deg]'][i]
                  }`}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[0.5rem] object-cover"
                  />
                  <span className="mt-2 block px-0.5 text-left font-hand text-[13px] leading-tight text-plum-muted">
                    {s.cap}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-plum/10 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-plum/10">
                  <img src="/logos/ieee.png" alt="IEEE" className="h-5 w-5 object-contain" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-plum">IEEE Rising Stars 2026</p>
                  <p className="text-[12px] text-plum-faint">Project Showcase · 1st Place</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setZoom(4)}
                className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-[12px] font-medium text-plum transition-colors hover:border-[#C0913C]/50"
              >
                See all photos <span aria-hidden>↗</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ── 收尾 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="border-t border-plum/10 pt-10">
            <h2 className="max-w-2xl font-serif text-[clamp(1.5rem,3.4vw,2.2rem)] font-light leading-snug text-plum">
              Different technologies, <span className="italic text-orchid">the same instinct.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
              Listen for the human need. Make complexity understandable. Build something people can
              trust, participate in, and remember.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#impact"
                className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-orchid/50"
              >
                ← Back to all work
              </Link>
              <Link
                to="/work/theta"
                className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
              >
                Explore Theta Health →
              </Link>
              <Link
                to="/#contact"
                className="rounded-full bg-plum px-5 py-2.5 text-[13px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
              >
                Say Hello
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
