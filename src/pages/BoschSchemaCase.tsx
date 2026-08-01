import { useEffect } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/Reveal'

const AGENTS = [
  { name: 'Profiler agent', c: '#7A9CC6', body: 'Scans tables, columns and sample rows to build a first sketch of what the data means.' },
  { name: 'Extractor agent', c: '#B98ACB', body: 'Turns the sketch into structured schema knowledge — entities, joins, business terms.' },
  { name: 'Validator agent', c: '#8FAE8B', body: 'Cross-checks extractions against real queries and flags conflicts for human review.' },
]

export default function BoschSchemaCase() {
  useEffect(() => {
    document.title = 'Multi-agent Schema Extraction — Case Study · Olivia Xiao'
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
              Case Study · Bosch × CMU · Technical Foundation
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] font-light leading-[1.12] text-plum">
              Teaching agents to{' '}
              <span className="italic">
                <span className="bg-[linear-gradient(100deg,#7A9CC6_0%,#B98ACB_55%,#8FAE8B_100%)] bg-clip-text text-transparent">
                  read enterprise schemas
                </span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-plum-muted">
              Before an AI can answer “which plant had the highest scrap rate?”, it has to know
              what a plant is, where scrap lives, and which joins are safe. This Bosch × CMU
              project built a multi-agent pipeline that extracts and validates that schema
              knowledge — the ground truth that <Link to="/work/askdata" className="underline decoration-dashed underline-offset-4 hover:text-plum">AskData</Link> later stood on.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {['Multi-agent architecture', 'Schema extraction', 'Validation design', 'Enterprise data'].map((t) => (
                <span key={t} className="rounded-full border border-plum/15 bg-white/70 px-4 py-1.5 text-[13px] text-plum-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 架构 */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="label-text mb-4">The architecture</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.15] text-plum">
              Three agents, one validated schema graph
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {AGENTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[1.4rem] border border-plum/10 bg-cream p-6">
                  <span className="w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ backgroundColor: `${a.c}1e`, color: a.c }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-[15px] font-semibold text-plum">{a.name}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-plum-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 font-hand text-[17px] text-plum-muted">
              validation before generation — <span className="text-orchid">grounded SQL beats confident SQL ✦</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 收尾 */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#E8EFF7] to-blush/30 p-8 text-center md:p-12">
            <p className="mx-auto max-w-2xl font-hand text-[20px] leading-snug text-plum md:text-[24px]">
              “the unglamorous layer is the one everything else stands on ✦”
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/work/askdata"
                className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7A9CC6]"
              >
                See what it powered — AskData →
              </Link>
              <Link
                to="/#impact"
                className="inline-flex items-center gap-2 rounded-full border border-plum/25 bg-white/60 px-6 py-3 text-sm font-medium text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid"
              >
                ← Back to all work
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
