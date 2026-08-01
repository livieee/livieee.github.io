import { useEffect } from 'react'
import { Link } from 'react-router'
import { CountUp } from '@/components/CountUp'
import { Reveal } from '@/components/Reveal'

const STEPS = [
  { step: 'Ask', c: '#7A9CC6', title: 'Ask in plain language', body: 'Analysts type the business question as they would say it — no SQL required to get started.' },
  { step: 'SQL', c: '#B98ACB', title: 'See the generated SQL', body: 'The workspace writes the query against the governed schema — visible, editable, and explainable.' },
  { step: 'Analyze', c: '#8FAE8B', title: 'Go deeper in Python', body: 'One click drops the result set into a Python cell for statistical follow-ups and outlier checks.' },
  { step: 'Visualize', c: '#C79A4B', title: 'Chart it in place', body: 'Results become shareable visualizations without leaving the flow or exporting to another tool.' },
  { step: 'Reuse', c: '#D193A8', title: 'Save it for the team', body: 'Validated questions land in a shared library — the next analyst starts from an answer, not a blank page.' },
]

export default function AskDataCase() {
  useEffect(() => {
    document.title = 'AskData — Case Study · Olivia Xiao'
    return () => {
      document.title = 'Olivia Xiao — AI Product, GTM & Partnerships'
    }
  }, [])

  return (
    <main className="min-h-screen bg-cream text-plum">
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#E8EFF7] via-cream to-cream" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
          <Reveal>
            <p className="label-text flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7A9CC6]" />
              Case Study · Enterprise AI Product · Bosch × CMU
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] font-light leading-[1.12] text-plum">
              AskData — making enterprise analytics easier to{' '}
              <span className="italic">
                <span className="bg-[linear-gradient(100deg,#7A9CC6_0%,#B98ACB_55%,#D193A8_100%)] bg-clip-text text-transparent">
                  ask, explore, and reuse
                </span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-plum-muted">
              An AI-native analytics workspace designed for Bosch data teams — unifying
              natural-language SQL, Python analysis, visualization, and reusable query knowledge
              into one end-to-end experience.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {['Product strategy', 'Workflow design', 'MVP definition', 'PRDs'].map((t) => (
                <span key={t} className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-10 w-fit rounded-[1.6rem] border border-plum/10 bg-white/70 px-8 py-6 backdrop-blur-sm">
              <p className="font-serif text-[2.6rem] font-light leading-none text-[#7A9CC6]">
                <CountUp value={80} suffix="%+" />
              </p>
              <p className="mt-2 text-[13px] text-plum-muted">of manual analytics workflows streamlined</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 工作流 */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">The workflow</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              Five steps, one surface
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 font-hand text-[17px] text-plum-muted">
              the whole analytics loop — <span className="text-orchid">without ever leaving the page ✦</span>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-[1.4rem] border border-plum/10 bg-cream p-5">
                  <span
                    className="w-fit rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${s.c}1e`, color: s.c }}
                  >
                    {s.step}
                  </span>
                  <p className="mt-3 text-[14px] font-semibold leading-snug text-plum">{s.title}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 技术底座 + 收尾 */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-[#E8EFF7] to-blush/30 p-8 md:grid-cols-[3fr_2fr] md:p-12">
            <div>
              <p className="label-text mb-3">Built on</p>
              <h2 className="font-serif text-[1.6rem] font-light leading-snug text-plum">
                The technical foundation came first
              </h2>
              <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
                AskData's natural-language layer stands on an earlier Bosch × CMU project: a
                multi-agent pipeline that extracts, structures, and validates enterprise schema
                knowledge — so the SQL the workspace writes is grounded, not guessed.
              </p>
              <Link
                to="/work/bosch-schema"
                className="group/cta mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7A9CC6]"
              >
                Multi-agent schema extraction
                <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="font-hand text-[18px] leading-snug text-plum-muted">
              deck, PRDs & prototypes on file — <span className="text-orchid">ask me for the full walkthrough ✦</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#impact"
              className="inline-flex items-center gap-2 rounded-full border border-plum/25 bg-white/60 px-6 py-3 text-sm font-medium text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid"
            >
              ← Back to all work
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
