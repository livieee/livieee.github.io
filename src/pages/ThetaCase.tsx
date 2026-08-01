import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CompareSlider } from '@/components/CompareSlider'
import { CountUp } from '@/components/CountUp'
import { Reveal } from '@/components/Reveal'

/** ── 页面数据 ─────────────────────────────────────────────────────────── */

const METRICS = [
  { value: 83, suffix: '%', label: 'less time on clinical documentation' },
  { value: 60, suffix: '%', label: 'lift in patient intake engagement' },
  { value: 40, suffix: '+', label: 'physicians at clinical roundtables' },
  { value: 30, suffix: '+', label: 'developers engaged for MCP adoption' },
]

const PROBLEM_STATS = [
  { big: '4–6h', small: 'of a PCP’s day — about 40% — goes to documentation' },
  { big: '63%', small: 'of physicians reported burnout in 2023' },
  { big: '16h+', small: 'per week on pre-charting, charting & admin' },
]

type Phase = {
  key: string
  tab: string
  title: string
  img: string
  points: string[]
  note: string
}

const PHASES: Phase[] = [
  {
    key: 'pre',
    tab: 'Pre-Visit',
    title: 'Know the patient before they walk in',
    img: '/theta/slide-6.jpg',
    points: [
      'Context-rich patient overview assembled from EHR, wearables, intake and chat history',
      'Risk stratification alerts surface what needs attention first',
      'Trend analysis turns scattered readings into a story',
    ],
    note: 'pre-charting: 15 min → 2 min',
  },
  {
    key: 'in',
    tab: 'In-Visit',
    title: 'Stay with the patient, not the screen',
    img: '/theta/slide-7.jpg',
    points: [
      'Ambient AI Scribe transcribes the conversation in real time, any language',
      'Data dashboard surfaces vitals, lifestyle patterns and history on demand',
      'Personal notes blend into the record without breaking eye contact',
    ],
    note: 'the doctor looks at the patient, not the tabs',
  },
  {
    key: 'post',
    tab: 'Post-Visit',
    title: 'Notes ready to sign in minutes',
    img: '/theta/slide-8.jpg',
    points: [
      'AI-drafted SOAP notes with Magic Edit — instruct, refine, approve side-by-side',
      'Multi-modal context: attach labs and imaging to complete the picture',
      'One-click referral letters and patient instructions from the visit note',
    ],
    note: 'documentation: 30 min → 3 min',
  },
]

const OWNED = [
  {
    num: '01',
    heading: 'Co-led the 0→1 MVP',
    color: '#D193A8',
    body: 'Defined the roadmap, authored PRDs, and built Figma prototypes — coordinating design and engineering to keep technical feasibility and business goals aligned, from zero to a working Scribe integrating speech-to-text and LLMs.',
    stat: '83% less documentation time',
  },
  {
    num: '02',
    heading: 'Designed the AI features',
    color: '#B98ACB',
    body: 'Note Customization, AI Edit, and Doc Generation — grounded in 20+ user interviews and 10+ competitor analyses, then co-designed prompt templates with engineers, iterating for LLM accuracy and reliability.',
    stat: '20+ interviews · 10+ teardowns',
  },
  {
    num: '03',
    heading: 'Built the intake engine',
    color: '#8FAE8B',
    body: 'Launched a HIPAA-compliant email workflow for patient intake, consent, and data authorization — automating collection before every visit and lifting engagement measured by open and click rates.',
    stat: '+60% engagement',
  },
  {
    num: '04',
    heading: 'Drove GTM & adoption',
    color: '#C79A4B',
    body: 'Defined GTM across media, hackathons, and influencer partnerships; engaged 30+ developers behind the healthcare MCP, and ran clinical roundtables with 40+ physicians — live demos and medical-association partnerships that fed insights back into the roadmap.',
    stat: '40+ physicians · 30+ developers',
  },
]

type SubProject = {
  key: string
  title: string
  tagline: string
  accent: string
  img?: string
  link?: { label: string; href: string }
  bullets: string[]
}

const SUB_PROJECTS: SubProject[] = [
  {
    key: 'intake',
    title: 'Patient Intake & Consent',
    tagline: 'the quiet workflow that feeds everything',
    accent: '#D193A8',
    bullets: [
      'Designed a HIPAA-compliant intake, consent and data-authorization experience',
      'Trigger-based email workflow automates collection before every visit',
      'Structured questionnaires via forms, chat, or call — balancing compliance, clinical needs and ease of use',
      '60% engagement lift measured by email open and click-through rates',
    ],
  },
  {
    key: 'mcp',
    title: 'Healthcare MCP · Developer Adoption',
    tagline: 'open-source infrastructure needs users too',
    accent: '#B98ACB',
    link: { label: 'mirobody.ai ↗', href: 'https://mirobody.ai/' },
    bullets: [
      'Gathered feedback from 20+ developers through events and community outreach',
      'Diagnosed integration and adoption barriers; findings reshaped roadmap priorities',
      'Crafted developer messaging and an open-source adoption strategy',
      'Engaged 30+ developers total to drive initial adoption of the healthcare MCP server',
    ],
  },
  {
    key: 'wellness',
    title: 'Theta Wellness',
    tagline: 'the patient side of the loop',
    accent: '#8FAE8B',
    img: '/theta/slide-9.jpg',
    bullets: [
      'Multimodal health input: wearables, food snaps, mood tags, medical reports',
      'Health information explained in plain language — designed for older adults',
      'Daily guidance and caregiver sharing keep families in the loop between visits',
      'Shaped positioning, market sizing, business model and the investor pitch',
    ],
  },
]

/** ── 页面 ────────────────────────────────────────────────────────────── */

export default function ThetaCase() {
  const [phase, setPhase] = useState(0)
  const [openSub, setOpenSub] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Theta Health — Case Study · Olivia Xiao'
    return () => {
      document.title = 'Olivia Xiao — AI Product, GTM & Partnerships'
    }
  }, [])

  const active = PHASES[phase]

  return (
    <main className="min-h-screen bg-cream text-plum">
      {/* ── 顶栏 ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case study">
          <Link to="/" className="group/logo flex items-baseline gap-2 font-serif text-lg font-medium tracking-tight text-plum">
            <span aria-hidden className="text-sm text-orchid/70 transition-transform duration-300 group-hover/logo:-translate-x-0.5">←</span>
            <span>Olivia Xiao</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/#impact" className="text-[13px] font-medium text-plum-muted transition-colors hover:text-plum">
              All work
            </Link>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-blush/50 via-cream to-cream" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
          <Reveal>
            <p className="label-text flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
              Case Study · Theta Health · 2025
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.12] text-plum">
              Making healthcare AI fit the way people{' '}
              <span className="italic">
                <span className="bg-[linear-gradient(100deg,#D193A8_0%,#B98ACB_50%,#9DB8E8_100%)] bg-clip-text text-transparent">
                  actually live and work
                </span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-plum-muted">
              At Theta Health I co-led the 0→1 development of an AI Scribe MVP — integrating
              speech-to-text and LLMs — and shaped the intake workflow, developer ecosystem, and
              patient app around it. One product philosophy held everything together: AI should
              adapt to clinical reality, not the other way around.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                Product Intern · AI Health Product
              </span>
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                Roadmap · PRDs · Figma prototypes
              </span>
              <span className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                STT + LLM prompt design
              </span>
              <a
                href="https://thetahealth.ai/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
              >
                thetahealth.ai ↗
              </a>
              <a
                href="https://mirobody.ai/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
              >
                mirobody.ai ↗
              </a>
            </div>
          </Reveal>

          {/* 指标条 */}
          <Reveal delay={0.3}>
            <div className="mt-14 grid grid-cols-2 gap-6 rounded-[2rem] border border-plum/10 bg-white/70 p-8 backdrop-blur-sm md:grid-cols-4 md:p-10">
              {METRICS.map((m, i) => (
                <div key={m.label}>
                  <p className="font-serif text-[2.2rem] font-light leading-none text-plum md:text-[2.6rem]">
                    <CountUp value={m.value} suffix={m.suffix} delay={i * 0.12} />
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-plum-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">The problem</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Doctors became data clerks. Patients became strangers between visits.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROBLEM_STATS.map((s, i) => (
            <Reveal key={s.big} delay={i * 0.08}>
              <div className="rounded-[1.6rem] bg-gradient-to-br from-cream-soft to-blush/40 p-7">
                <p className="font-serif text-[2rem] font-light text-plum">{s.big}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-plum-muted">{s.small}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Existing AI scribes transcribe the visit but miss the person — patient recall is
            unreliable, EHR data stops at the last visit, and nothing connects what happens in
            between. That gap became our product thesis.
          </p>
        </Reveal>
      </section>

      {/* ── 三阶段产品 Tabs ── */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">What we shipped</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              One assistant across the whole visit
            </h2>
          </Reveal>

          {/* Tab 切换 */}
          <div className="mt-8 flex flex-wrap gap-2">
            {PHASES.map((p, i) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPhase(i)}
                aria-pressed={phase === i}
                className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                  phase === i
                    ? 'bg-plum text-cream shadow-[0_10px_24px_-10px_rgba(58,36,64,0.5)]'
                    : 'border border-plum/15 bg-white/70 text-plum-muted hover:border-orchid/50 hover:text-plum'
                }`}
              >
                {p.tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[7fr_5fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)]"
              >
                <img src={active.img} alt={`Theta Care — ${active.tab} product interface`} className="w-full" loading="lazy" />
              </motion.div>
            </AnimatePresence>
            <div>
              <h3 className="font-serif text-[1.5rem] font-light leading-snug text-plum md:text-[1.7rem]">{active.title}</h3>
              <ul className="mt-5 space-y-3">
                {active.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-[14.5px] leading-relaxed text-plum-muted">
                    <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-orchid" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-hand text-[17px] text-orchid">✦ {active.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After 拖动对比 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">Drag to compare</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            The same visit, with and without Theta
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Three moments from the clinical day — drag the handle to see what changes.{' '}
            <span className="font-hand text-[16px] text-orchid">give it a pull ⇄</span>
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { n: 12, cap: 'Pre-visit — chasing records vs. one pre-chart summary' },
            { n: 13, cap: 'In-visit — fragmented tabs vs. co-pilot with context' },
            { n: 14, cap: 'Post-visit — pajama-time notes vs. sign-in-minutes' },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08}>
              <div>
                <CompareSlider
                  before={`/theta/compare-${c.n}-without.jpg`}
                  after={`/theta/compare-${c.n}-with.jpg`}
                  alt={c.cap}
                />
                <p className="mt-3 text-center text-[13px] text-plum-muted">{c.cap}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 我负责的部分 ── */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">My role</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              What I owned, end to end
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-hand text-[17px] text-plum-muted">
              from the PRD to the pilot — <span className="text-orchid">the parts with my fingerprints on them ✦</span>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {OWNED.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[1.6rem] border border-plum/10 bg-cream p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-hand text-[20px] font-semibold" style={{ color: s.color }}>
                      {s.num}
                    </p>
                    <p className="rounded-full px-3 py-1 font-hand text-[14px]" style={{ color: s.color, backgroundColor: `${s.color}18` }}>
                      {s.stat}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-[1.3rem] font-medium text-plum">{s.heading}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-plum-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 子项目 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label-text mb-4">Beyond the Scribe</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
            Three more bets on the same thesis
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {SUB_PROJECTS.map((sp, i) => {
            const open = openSub === sp.key
            return (
              <Reveal key={sp.key} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-[1.6rem] border transition-colors duration-300 ${
                    open ? 'border-orchid/40 bg-white' : 'border-plum/10 bg-white/70 hover:border-orchid/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSub(open ? null : sp.key)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                  >
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif text-[1.2rem] font-medium text-plum md:text-[1.35rem]">{sp.title}</span>
                      <span className="font-hand text-[15px]" style={{ color: sp.accent }}>
                        {sp.tagline}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-[18px] text-plum-faint transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`grid gap-8 border-t border-dashed border-plum/15 px-7 py-6 ${sp.img ? 'lg:grid-cols-[3fr_2fr]' : ''}`}>
                          <ul className="space-y-3">
                            {sp.bullets.map((b) => (
                              <li key={b} className="flex gap-2.5 text-[14.5px] leading-relaxed text-plum-muted">
                                <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: sp.accent }} />
                                <span>{b}</span>
                              </li>
                            ))}
                            {sp.link && (
                              <li className="pt-1">
                                <a
                                  href={sp.link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-orchid/40 bg-lavender/30 px-4 py-1.5 text-[13px] font-medium text-plum transition-all hover:-translate-y-0.5 hover:border-orchid"
                                >
                                  {sp.link.label}
                                </a>
                              </li>
                            )}
                          </ul>
                          {sp.img && (
                            <img
                              src={sp.img}
                              alt={`${sp.title} product interface`}
                              loading="lazy"
                              className="w-full self-start rounded-xl border border-plum/10 shadow-[0_18px_40px_-20px_rgba(90,63,86,0.4)]"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── 收尾 ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4 md:px-10">
        <Reveal>
          <div className="rounded-[2rem] bg-gradient-to-br from-lavender/50 to-blush/40 p-10 text-center md:p-14">
            <p className="mx-auto max-w-2xl font-hand text-[22px] leading-snug text-plum md:text-[26px]">
              “Adoption is a human problem before it is a technical one.”
            </p>
            <p className="mt-4 text-[14px] text-plum-muted">
              — the lesson every track of this work kept teaching me
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#impact"
                className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
              >
                ← Back to all work
              </Link>
              <a
                href="mailto:olivia.zxiao@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-plum/25 bg-white/60 px-6 py-3 text-sm font-medium text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid"
              >
                Talk about this project
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
