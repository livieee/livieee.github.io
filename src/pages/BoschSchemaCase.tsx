import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Bosch 多智能体 schema 抽取 —— AskData 的早期技术基础，独立项目页。
 * 首页 Impact 卡片角落的小架构图直达此页。
 */
export function BoschSchemaCase() {
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
          <p className="label-text mb-5 text-[#4E6E96]">Earlier Technical Foundation · Bosch × CMU</p>
        </Reveal>
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="Multi-agent schema extraction" />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 font-serif text-xl font-light leading-snug text-plum-muted md:text-2xl">
            Architecture + validation
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            An earlier technical foundation in the Bosch × CMU industry collaboration: a multi-agent
            pipeline that extracts database schema knowledge — and validates it — so that downstream
            analytics can be grounded in trusted structure rather than guesswork. The work later
            informed AskData, the AI-native analytics workspace built on top of it.
          </p>
          <p className="mt-3 text-[12px] uppercase tracking-label text-plum-faint">
            CMU × Bosch industry collaboration · 2024–2025
          </p>
        </Reveal>

        {/* ── 架构图 ───────────────────────────────────────────── */}
        <Reveal className="mt-14" y={32}>
          <div className="rounded-[2rem] bg-gradient-to-br from-[#D9E5F2] via-cream-soft to-blush/40 p-8 md:p-14">
            <p className="label-text mb-8 text-center text-[#4E6E96]">Architecture + validation</p>
            <svg viewBox="0 0 720 300" className="mx-auto w-full max-w-2xl" role="img" aria-label="Multi-agent schema extraction pipeline: extraction agents feed a consolidation layer, which passes through validation into trusted schema context">
              <defs>
                <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L8 4 L0 8 Z" fill="#7FA3CC" />
                </marker>
              </defs>

              {/* extraction agents */}
              {[46, 126, 206].map((y, i) => (
                <g key={i}>
                  <rect x="20" y={y} width="150" height="52" rx="14" fill="white" stroke="#7FA3CC" strokeWidth="1.4" />
                  <text x="95" y={y + 24} textAnchor="middle" fontSize="13" fill="#3A2440" fontFamily="Georgia, serif">
                    Extraction agent
                  </text>
                  <text x="95" y={y + 40} textAnchor="middle" fontSize="10" fill="#9A87A0">
                    schema candidates
                  </text>
                </g>
              ))}

              {/* arrows agents → consolidation */}
              {[72, 152, 232].map((y, i) => (
                <path key={i} d={`M170 ${y} C 230 ${y}, 250 152, 300 152`} fill="none" stroke="#B9CDE4" strokeWidth="1.6" />
              ))}

              {/* consolidation */}
              <circle cx="345" cy="152" r="46" fill="#DCE7F2" stroke="#4E6E96" strokeWidth="1.6" />
              <text x="345" y="148" textAnchor="middle" fontSize="13" fill="#3A2440" fontFamily="Georgia, serif">Merge &amp;</text>
              <text x="345" y="164" textAnchor="middle" fontSize="13" fill="#3A2440" fontFamily="Georgia, serif">rank</text>

              {/* arrow to validation */}
              <path d="M391 152 H450" fill="none" stroke="#7FA3CC" strokeWidth="1.8" markerEnd="url(#arr)" />

              {/* validation */}
              <rect x="452" y="116" width="130" height="72" rx="16" fill="#F6EFE8" stroke="#D193A8" strokeWidth="1.6" />
              <text x="517" y="146" textAnchor="middle" fontSize="13" fill="#3A2440" fontFamily="Georgia, serif">Validation</text>
              <text x="517" y="164" textAnchor="middle" fontSize="10" fill="#9A87A0">checks before trust</text>

              {/* arrow to trusted context */}
              <path d="M582 152 H634" fill="none" stroke="#7FA3CC" strokeWidth="1.8" markerEnd="url(#arr)" />

              {/* trusted schema context */}
              <rect x="636" y="104" width="66" height="96" rx="12" fill="white" stroke="#4E6E96" strokeWidth="1.6" />
              <text x="669" y="140" textAnchor="middle" fontSize="11" fill="#4E6E96">trusted</text>
              <text x="669" y="156" textAnchor="middle" fontSize="11" fill="#4E6E96">schema</text>
              <text x="669" y="172" textAnchor="middle" fontSize="11" fill="#4E6E96">context</text>
              <text x="669" y="192" textAnchor="middle" fontSize="12" fill="#4E6E96">✓</text>
            </svg>
            <p className="mt-8 text-center font-hand text-[16px] text-plum-muted">
              agents propose — validation decides what the analytics layer may trust ✦
            </p>
          </div>
        </Reveal>

        {/* ── 它后来长成了什么 ──────────────────────────────────── */}
        <Reveal className="mt-16">
          <Link
            to="/work/askdata"
            className="group/x flex items-center justify-between gap-6 rounded-[1.6rem] border border-plum/10 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7FA3CC]/50 hover:bg-white hover:shadow-[0_18px_40px_-18px_rgba(78,110,150,0.35)] md:p-8"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-plum-faint">
                What it became ↗
              </p>
              <p className="mt-2 font-serif text-xl font-light text-plum md:text-2xl">
                AskData — AI-native analytics workspace
              </p>
              <p className="mt-1 text-[13px] text-plum-muted">
                Natural-language SQL · Python analysis · Visualization · Reusable knowledge
              </p>
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
