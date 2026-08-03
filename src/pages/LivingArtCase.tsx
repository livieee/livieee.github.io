import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/Reveal'
import { Lightbox, type GalleryItem } from '@/components/Lightbox'
import { InstallationDemo } from '@/components/InstallationDemo'
import { ChapterDeck, type Chapter } from '@/components/ChapterDeck'
import { StateScrub } from '@/components/StateScrub'
import { PhotoRail } from '@/components/PhotoRail'

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

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 37.3) % 100,
  y: (i * 61.7) % 100,
  s: (i % 4) * 0.5 + 1,
  d: (i % 9) * 0.6,
}))

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
            className="flex gap-3 rounded-[1.1rem] border bg-white/[0.05] p-3.5 backdrop-blur-sm transition-all duration-500 lg:flex-col lg:gap-0"
            style={{
              borderColor: on ? `${s.c}80` : 'rgba(255,255,255,0.12)',
              boxShadow: on ? `0 12px 28px -18px ${s.c}` : 'none',
              opacity: on ? 1 : 0.5,
              transform: on ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <span
              className="font-serif text-[22px] font-light leading-none transition-colors duration-500 lg:mb-2"
              style={{ color: on ? s.c : 'rgba(255,255,255,0.3)' }}
            >
              0{i + 1}
            </span>
            <span className="min-w-0">
              <p className="text-[12.5px] font-medium leading-snug text-[#F0EBF6]">{s.k}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-white/40">{s.v}</p>
            </span>
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
      { src: '/ieee/st-blue.jpg', cap: 'calm · low arousal, blue-toned' },
      { src: '/ieee/st-warm.jpg', cap: 'excited · elevated β, warm amber' },
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
    img: '/ieee/st-violet.jpg',
    tilt: '-rotate-[0.6deg]',
  },
  {
    k: 'Showcase communication',
    v: 'Supported the exhibition narrative and the booth — what visitors read, saw and were walked through.',
    img: '/ieee/booth-crowd.jpg',
    tilt: 'rotate-[1.6deg]',
  },
]

const SHOTS: GalleryItem[] = [
  { src: '/ieee/outputs-grid.jpg', alt: 'A grid of real generated states from the installation', cap: 'Real outputs — every state produced a different image' },
  { src: '/ieee/booth-olivia.jpg', alt: 'Olivia at the CMU Silicon Valley booth beside the poster and the live installation', cap: 'At the CMU Silicon Valley booth' },
  { src: '/ieee/booth-crowd.jpg', alt: 'A crowd gathered around the installation at the showcase', cap: 'The booth, mid-showcase' },
  { src: '/ieee/poster-cert.jpg', alt: 'The research poster and the first-place certificate', cap: 'The poster and the first-place certificate' },
  { src: '/ieee/poster.jpg', alt: 'The CMU research poster', cap: 'The CMU research poster — I designed it' },
  { src: '/ieee/certs-three.jpg', alt: 'Three team members with first-place certificates', cap: 'Project Showcase — first place' },
  { src: '/ieee/poster-team.jpg', alt: 'The team at the CMU booth', cap: 'The team at the booth' },
  { src: '/ieee/comfyui.jpg', alt: 'The ComfyUI workflow and generated assets', cap: 'The ComfyUI workflow behind each frame' },
  { src: '/ieee/architecture.jpg', alt: 'The system architecture diagram', cap: 'Local node → cloud generation → dual interface' },
  { src: '/ieee/showcase-stage.jpg', alt: 'Winners and organisers on stage', cap: 'On stage with the organisers' },
  { src: '/ieee/poster-team2.jpg', alt: 'The team beside the CMU Silicon Valley banner', cap: 'Beside the CMU Silicon Valley banner' },
]

const TEAM = ['Jessie Xiong', 'Olivia Xiao', 'David Ma', 'Jean Wang', 'Isabella Cheng', 'Richa Pragat']

export function LivingArtCase() {
  const [mode, setMode] = useState<'art' | 'explain'>('art')
  const [arch, setArch] = useState(false)
  const [zoom, setZoom] = useState<number | null>(null)
  const m = MODES[mode]

  const CHAPTERS: Chapter[] = [
    {
      n: '01',
      label: 'The problem',
      title: 'Brain signals are rich in information — and almost impossible to feel.',
      lede: 'A waveform, or the word “calm”. Neither is something you can recognise as yourself.',
      body: (
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="glass-panel p-6">
            <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-white/40">What the system sees</p>
            <svg viewBox="0 0 300 96" className="h-[92px] w-full" fill="none" aria-hidden>
              {[0, 1, 2, 3, 4].map((r) => (
                <path
                  key={r}
                  d={`M0 ${12 + r * 18} ${Array.from({ length: 60 })
                    .map((_, k) => `L${k * 5} ${12 + r * 18 + Math.sin(k * (0.32 + r * 0.14)) * (3 + r)}`)
                    .join(' ')}`}
                  stroke="#8FA6D8"
                  strokeOpacity="0.55"
                  strokeWidth="1.1"
                  strokeDasharray="600"
                  style={{ animation: `route-draw 2.4s ${r * 0.14}s ease-out both` }}
                />
              ))}
            </svg>
            <p className="mt-3 text-[12.5px] leading-snug text-white/40">δ · θ · α · β · γ</p>
          </div>

          <p className="text-center font-hand text-[15px] text-[#CBB8F5]">
            raw signal → meaningful experience
          </p>

          <button
            type="button"
            onClick={() => setZoom(0)}
            className="cursor-zoom-in overflow-hidden rounded-[1.3rem] border border-[#CBB8F5]/25 bg-[#CBB8F5]/[0.07] p-6 text-left backdrop-blur-sm"
          >
            <span className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-white/40">What a person can feel</span>
            <span className="block overflow-hidden rounded-[0.9rem]">
              <img
                src="/ieee/st-cyan.jpg"
                alt="A generated aura from the installation"
                loading="lazy"
                className="h-[92px] w-full object-cover"
              />
            </span>
            <span className="mt-3 block text-[12.5px] leading-snug text-white/40">
              the same moment, recognisable without being told
            </span>
          </button>
        </div>
      ),
    },
    {
      n: '02',
      label: 'Two modes',
      title: 'One mode helps people feel. The other helps them understand.',
      lede: 'Emotional resonance and interpretability shouldn’t compete for the same screen — so they share a layout instead.',
      body: (
        <div>
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
                    : 'border border-white/20 bg-white/10 text-white/70 hover:text-white'
                }`}
                style={mode === k ? { backgroundColor: MODES[k].accent } : undefined}
              >
                {MODES[k].label}
              </button>
            ))}
            <span className="ml-auto font-hand text-[15px] text-white/60">feel it ↔ understand it</span>
          </div>

          <div key={mode} style={{ animation: 'annot-in .45s ease-out both' }}>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {m.shots.map((sh) => (
                <figure key={sh.src}>
                  <img
                    src={sh.src}
                    alt={sh.cap}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-[1.1rem] border border-white/10 object-cover"
                  />
                  <figcaption className="mt-2 font-hand text-[13px] text-white/50">{sh.cap}</figcaption>
                </figure>
              ))}
            </div>
            <p
              className="mt-5 border-l-2 pl-3 text-[14px] font-medium text-[#F0EBF6]"
              style={{ borderColor: m.accent }}
            >
              {m.line}
            </p>
          </div>
        </div>
      ),
    },
    {
      n: '03',
      label: 'The states',
      title: 'No two people ever produced the same image.',
      lede: 'Six real outputs from the showcase — the same system, six different inner states.',
      body: (
        <div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {[
              { src: '/ieee/st-warm.jpg', k: 'tense', c: '#E8A05A' },
              { src: '/ieee/st-green.jpg', k: 'excited', c: '#9BC46A' },
              { src: '/ieee/st-blue.jpg', k: 'alert', c: '#6FA8D6' },
              { src: '/ieee/st-yellow.jpg', k: 'restless', c: '#D9C24A' },
              { src: '/ieee/st-violet.jpg', k: 'tired', c: '#A99BD4' },
              { src: '/ieee/st-cyan.jpg', k: 'calm', c: '#68B6C4' },
            ].map((st, k) => (
              <button
                key={st.src}
                type="button"
                onClick={() => setZoom(0)}
                aria-label={`View the generated states larger — ${st.k}`}
                className="group/st relative block cursor-zoom-in overflow-hidden rounded-[0.9rem] border border-white/10 bg-black"
                style={{ animation: `annot-in .5s ${0.06 * k}s ease-out both` }}
              >
                <img
                  src={st.src}
                  alt={`A generated state — ${st.k}`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover/st:scale-[1.05]"
                />
                <span
                  className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-[3px] text-[10px] font-medium tracking-wide backdrop-blur-sm"
                  style={{ color: st.c }}
                >
                  {st.k}
                </span>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: '04',
      label: 'How it works',
      title: 'Five steps from a headband to a moving image.',
      lede: 'Consumer hardware, open-source tooling, seven people, twenty days.',
      body: (
        <div>
          <Pipeline />
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setArch((a) => !a)}
              aria-expanded={arch}
              className="glass-pill"
            >
              {arch ? 'Hide the architecture' : 'View the technical architecture'}
              <span aria-hidden className={`transition-transform duration-300 ${arch ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>
            {arch && (
              <div style={{ animation: 'annot-in .45s ease-out both' }} className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { src: '/ieee/architecture.jpg', z: 8, cap: 'local node → cloud → dual interface' },
                  { src: '/ieee/comfyui.jpg', z: 7, cap: 'the ComfyUI workflow behind each frame' },
                ].map((a) => (
                  <figure key={a.src}>
                    <button
                      type="button"
                      onClick={() => setZoom(a.z)}
                      aria-label={`View larger: ${a.cap}`}
                      className="block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] border border-white/10 bg-black/40"
                    >
                      <img src={a.src} alt={a.cap} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                    </button>
                    <figcaption className="mt-2 font-hand text-[13px] text-white/50">{a.cap}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            <p className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-white/40">
              <span className="font-hand text-[14px] text-white/60">running on ✦</span>
              {['Muse 2', 'Python', 'LSL', 'MediaPipe', 'ComfyUI', 'Stable Diffusion', 'ControlNet', 'RunPod GPU'].map(
                (t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/10 px-2 py-[2px] leading-none">
                    {t}
                  </span>
                ),
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      n: '05',
      label: 'What I shaped',
      title: 'Four working sheets, pinned to the wall.',
      lede: 'A seven-person team built the system. My part was the layer between it and everyone else.',
      body: (
        <div>
          <div className="paper-grid rounded-[1.6rem] border border-white/10 bg-[#171C30] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_70px_-34px_rgba(0,0,0,0.8)] md:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {SHAPED.map((cc, k) => (
                <figure
                  key={cc.k}
                  style={{ animation: `annot-in .5s ${0.08 * k}s ease-out both` }}
                  className={`group/s relative ${cc.tilt} rounded-[0.9rem] border border-black/5 bg-[#E9E3D9] p-3 shadow-[0_18px_34px_-20px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0`}
                >
                  <span
                    aria-hidden
                    className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 rounded-[2px] bg-[#CBB8F5]/45 shadow-sm"
                  />
                  <img
                    src={cc.img}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-[104px] w-full rounded-[0.6rem] object-cover"
                  />
                  <figcaption className="px-1 pb-1 pt-3">
                    <p className="font-serif text-[16px] font-light text-[#2E2438]">{cc.k}</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5C4F63]">{cc.v}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-white/40">
            Team: {TEAM.join(' · ')} — advised by Prof. Catherine Fang, who nominated the project to
            represent CMU Silicon Valley.
          </p>
        </div>
      ),
    },
    {
      n: '06',
      label: 'Recognition',
      title: 'When the work met the room ✦',
      lede: 'IEEE Rising Stars 2026 · Project Showcase · 1st place.',
      body: (
        <div>
          <div className="rounded-[1.6rem] border border-[#E8C77A]/25 bg-[#171C30] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_70px_-34px_rgba(0,0,0,0.8)] md:p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {SHOTS.slice(1, 4).map((sh, k) => (
                <button
                  key={sh.src}
                  type="button"
                  onClick={() => setZoom(k + 1)}
                  aria-label={`View larger: ${sh.alt}`}
                  className={`group/r cursor-zoom-in rounded-[0.9rem] border border-black/5 bg-[#E9E3D9] p-2.5 shadow-[0_18px_34px_-20px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 ${
                    ['-rotate-[1.5deg]', 'rotate-[1deg]', '-rotate-[0.8deg]'][k]
                  }`}
                >
                  <img
                    src={sh.src}
                    alt={sh.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[0.5rem] object-cover"
                  />
                  <span className="mt-2 block px-0.5 text-left font-hand text-[13px] leading-tight text-[#5C4F63]">
                    {sh.cap}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 ring-1 ring-white/20">
                <img src="/logos/ieee.png" alt="IEEE" className="h-5 w-5 object-contain" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-[#F0EBF6]">IEEE Rising Stars 2026</p>
                <p className="text-[12px] text-white/45">Project Showcase · 1st Place</p>
              </div>
            </div>
          </div>

          {/* 照片带自己在走，不需要一个「看全部」按钮把人推到别处 */}
          <p className="mb-3 mt-8 text-[11px] uppercase tracking-[0.18em] text-white/40">
            From the two days — tap any frame to open it
          </p>
          <PhotoRail items={SHOTS} onZoom={setZoom} startAt={4} />
        </div>
      ),
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: '#0D1020' }}>
      {/* 滚动擦洗：六个真实状态随滚动进度交替 */}
      <StateScrub />

      {/* 星尘 */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px 700px at 18% 8%, rgba(120,88,190,0.22), transparent 62%), radial-gradient(900px 600px at 82% 26%, rgba(58,110,168,0.18), transparent 60%), radial-gradient(1000px 700px at 50% 92%, rgba(190,96,150,0.14), transparent 62%)',
            animation: 'nebula-breathe 22s ease-in-out infinite',
          }}
        />
        {STARS.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              opacity: 0.5,
              animation: `star-drift ${4 + (i % 5)}s ${st.d}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D1020]/75 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case">
          <Link
            to="/#impact"
            className="group/back inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover/back:-translate-x-0.5">←</span>
            <span className="hidden sm:inline">Back to work</span>
            <span className="sm:hidden">Work</span>
          </Link>
          <div className="flex items-center gap-3 md:gap-5">
            <Link to="/" className="font-serif text-[15px] text-white/90 md:text-[17px]">
              ⌐ Hi, I'm Olivia <span aria-hidden className="text-[#CBB8F5]">↘</span>
            </Link>
            <Link
              to="/#contact"
              className="whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-[#CBB8F5]/60 hover:bg-white/20 md:px-4 md:text-[12.5px]"
            >
              Say Hello
            </Link>
          </div>
        </nav>
      </header>

      <article className="relative z-10 mx-auto max-w-5xl px-6 pb-28 pt-28 md:px-10 md:pt-32">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 ring-1 ring-white/20">
              <img src="/logos/ieee.png" alt="IEEE" className="h-[17px] w-[17px] object-contain" />
            </span>
            <span className="accent-badge text-[#E8C77A]">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M10 1.6l2.2 4.8 5.2.6-3.9 3.5 1.1 5.1L10 13l-4.6 2.6 1.1-5.1L2.6 7l5.2-.6z" />
              </svg>
              IEEE Project Showcase · 1st place · 2026
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] font-light leading-[1.02] tracking-[-0.015em] text-[#F6F1EA]">
            Making inner states
            <br />
            <span className="italic text-[#CBB8F5]">visible</span>{' '}
            <span className="text-white/40">through living art</span>
          </h1>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-[#C9C1DA]">
            A digital mirror for the mind. An EEG-driven generative experience that turned real-time
            emotional signals into evolving visual art — and an explain mode that showed people what
            shaped the result.
          </p>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Product UI', 'Experience framing', 'Research communication', 'Cross-functional collaboration'].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11.5px] font-medium text-[#E6E0F0] backdrop-blur-md"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.48}>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: IEEE, label: 'IEEE Showcase', logo: '/logos/ieee.png', alt: 'IEEE' },
              { href: REPO, label: 'GitHub', logo: '/logos/tools/github.jpg', alt: 'GitHub' },
              { href: POST, label: 'Project write-up', logo: '/logos/tools/linkedin.png', alt: 'LinkedIn' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group/l inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-medium text-white/85 backdrop-blur-md transition-all duration-300 hover:border-[#CBB8F5]/60 hover:bg-white/20 hover:text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/25">
                  <img src={l.logo} alt={l.alt} className="h-4 w-4 object-contain" />
                </span>
                {l.label}
                <span aria-hidden className="text-white/45 transition-transform duration-300 group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="flex h-10 items-center justify-center rounded-md bg-white/90 px-2.5 ring-1 ring-white/20">
              <img
                src="/logos/cmu-mark.png"
                alt="Carnegie Mellon University"
                className="h-[26px] w-auto object-contain"
              />
            </span>
            <span aria-hidden className="h-6 w-px bg-white/15" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              Integrated Innovation Institute
              <span className="text-white/25"> · </span>
              Silicon Valley
            </p>
          </div>
        </Reveal>

        {/* 装置界面的可运行复刻 */}
        <Reveal className="mt-9" y={28}>
          <InstallationDemo />
        </Reveal>

        {/* ── 章节册：横向翻页 ─────────────────────────────────── */}
        <Reveal className="mt-20" y={26}>
          <ChapterDeck chapters={CHAPTERS} tone="dark" />
        </Reveal>

        {/* ── 收尾 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="border-t border-white/10 pt-10">
            <h2 className="max-w-2xl font-serif text-[clamp(1.6rem,3.6vw,2.4rem)] font-light leading-snug text-[#F6F1EA]">
              Different technologies, <span className="italic text-[#CBB8F5]">the same instinct.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#C9C1DA]">
              Listen for the human need. Make complexity understandable. Build something people can
              trust, participate in, and remember.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#impact"
                className="glass-pill px-5 py-2.5 text-[13px]"
              >
                ← Back to all work
              </Link>
              <Link
                to="/work/theta"
                className="glass-pill-solid px-5 py-2.5 text-[13px]"
              >
                Explore Theta Health →
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
