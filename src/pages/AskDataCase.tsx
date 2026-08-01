import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { AskDataUI } from '@/components/AskDataUI'

const SCOPE = ['Product Strategy', 'Workflow Design', 'MVP Definition', 'PRDs']

const WORKFLOW = [
  {
    num: '01',
    title: 'Ask',
    body: 'Analysts start from a plain-language question — not a blank query editor.',
  },
  {
    num: '02',
    title: 'SQL',
    body: 'The question compiles into readable, inspectable SQL that teams can trust and adjust.',
  },
  {
    num: '03',
    title: 'Analyze',
    body: 'Python analysis sits alongside the query, so deeper cuts stay inside the same flow.',
  },
  {
    num: '04',
    title: 'Visualize',
    body: 'Results render as charts that can be explored, not just read.',
  },
  {
    num: '05',
    title: 'Reuse',
    body: 'Trusted queries become reusable knowledge, so the next question starts further ahead.',
  },
]

/**
 * AskData 独立详情页 —— Enterprise AI Product · Bosch × CMU。
 * 首页 Impact 卡片 “Explore AskData →” 直达，不经过任何 overview。
 */
export function AskDataCase() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 简洁页头 */}
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
          <p className="label-text mb-5 text-[#4E6E96]">Enterprise AI Product · Bosch × CMU</p>
        </Reveal>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[1.05] text-plum">
          <WordReveal text="AskData" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-2xl font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            Making enterprise analytics easier to ask, explore, and reuse.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            Designed an AI-native analytics workspace that unified natural-language SQL, Python
            analysis, visualization, and reusable query knowledge into one end-to-end experience —
            streamlining 80%+ of manual analytics workflows. Built within the Bosch × CMU industry
            collaboration, 2024–2025.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SCOPE.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#7FA3CC]/40 bg-[#EFF5FB]/70 px-3.5 py-1.5 text-[11.5px] font-medium text-[#4E6E96]"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* ── 产品视觉 ─────────────────────────────────────────── */}
        <Reveal className="mt-14" y={32}>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-6 md:p-12">
            <AskDataUI />
          </div>
        </Reveal>

        {/* ── 工作流 ───────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <p className="label-text mb-8">The workflow, end to end</p>
          <ol className="space-y-0">
            {WORKFLOW.map((w, i) => (
              <li
                key={w.num}
                className="group/step flex gap-6 border-t border-plum/10 py-6 transition-colors duration-300 last:border-b hover:bg-white/50 md:gap-10"
              >
                <span className="font-serif text-lg text-[#7FA3CC] transition-transform duration-300 group-hover/step:-translate-y-0.5 md:text-xl">
                  {w.num}
                </span>
                <div>
                  <h2 className="font-serif text-xl font-light text-plum md:text-2xl">{w.title}</h2>
                  <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-plum-muted">{w.body}</p>
                </div>
                {i === 0 && (
                  <span aria-hidden className="ml-auto hidden self-center font-hand text-[15px] text-plum-faint md:block">
                    one continuous flow ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── 结果 ─────────────────────────────────────────────── */}
        <Reveal className="mt-20">
          <div className="rounded-[2rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/60 p-10 text-center md:p-14">
            <p className="font-serif text-6xl font-light text-[#4E6E96] md:text-7xl">
              <CountUp value={80} suffix="%+" />
            </p>
            <p className="mt-3 text-[13px] uppercase tracking-label text-plum-muted">
              manual analytics workflows streamlined
            </p>
          </div>
        </Reveal>

        {/* ── 交叉链接：早期技术基础 ────────────────────────────── */}
        <Reveal className="mt-16">
          <Link
            to="/work/bosch-schema"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                Earlier technical foundation ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">
                Multi-agent schema extraction
              </p>
              <p className="mt-1 text-[13px] text-plum-muted">Architecture + validation</p>
            </div>
            <span
              aria-hidden
              className="shrink-0 font-serif text-2xl text-[#7FA3CC] transition-transform duration-300 group-hover/x:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </article>
    </main>
  )
}
