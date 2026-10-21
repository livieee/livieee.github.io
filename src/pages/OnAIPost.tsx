import { Link, useParams, Navigate } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { POSTS, type LocalPost } from '@/content/onAI'

/**
 * /on-ai/:slug —— 单篇。
 *
 * 正文一字未改写，所以这里只负责排版：一栏、65 字符左右的行宽、
 * 两节各自带小标。底部给前后篇，读完一篇不至于走进死胡同。
 */

const LOCAL = POSTS.filter((p): p is LocalPost => p.kind === 'local')

function Section({ label, paras }: { label: string; paras: string[] }) {
  return (
    <section className="mt-10">
      <p className="label-text mb-4">{label}</p>
      <div className="space-y-4">
        {paras.map((t) => (
          <p key={t.slice(0, 40)} className="text-[15.5px] leading-[1.75] text-plum-muted md:text-base">
            {t}
          </p>
        ))}
      </div>
    </section>
  )
}

export function OnAIPost() {
  const { slug } = useParams()
  const i = LOCAL.findIndex((p) => p.slug === slug)
  if (i === -1) return <Navigate to="/on-ai" replace />

  const post = LOCAL[i]
  // 列表是倒序排的（06 在前），所以"上一篇"在数组里是下一个
  const newer = LOCAL[i - 1]
  const older = LOCAL[i + 1]

  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Article">
          <Link
            to="/on-ai"
            className="group/back inline-flex items-center gap-1.5 text-[13px] font-medium text-plum-muted transition-colors hover:text-plum"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover/back:-translate-x-0.5">←</span>
            On AI
          </Link>
          <Link to="/" className="font-serif text-[15px] text-plum transition-colors hover:text-orchid">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <article className="mx-auto max-w-2xl px-6 pb-24 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <p className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span aria-hidden className="font-serif text-[20px] font-light leading-none text-rose/45">
              {post.n}
            </span>
            <span className="label-text">{post.topic}</span>
            <span aria-hidden className="h-px w-4 bg-plum/15" />
            <span className="text-[10.5px] uppercase tracking-[0.18em] text-plum-faint">{post.when}</span>
          </p>
        </Reveal>

        <h1 className="font-serif text-[clamp(1.7rem,4vw,2.5rem)] font-light leading-[1.15] text-plum">
          <WordReveal text={post.title} />
        </h1>

        <Reveal delay={0.14}>
          <Section label="What I took from it" paras={post.learning} />
          <Section label="Where I'd point it" paras={post.useCase} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-12 border-t border-plum/10 pt-6 text-[12.5px] leading-relaxed text-plum-faint">
            Written after a guest lecture at CMU, early 2025. My own takeaways only — what the
            speakers said stays in their room. Left as written.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <nav className="mt-10 flex flex-col gap-3 border-t border-plum/10 pt-8 sm:flex-row sm:items-stretch sm:justify-between">
            {newer ? (
              <Link
                to={`/on-ai/${newer.slug}`}
                className="group/nav flex-1 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="block text-[10.5px] uppercase tracking-[0.18em] text-plum-faint">← Newer</span>
                <span className="mt-1.5 block font-serif text-[15px] font-light leading-snug text-plum">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
            {older ? (
              <Link
                to={`/on-ai/${older.slug}`}
                className="group/nav flex-1 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="block text-[10.5px] uppercase tracking-[0.18em] text-plum-faint">Older →</span>
                <span className="mt-1.5 block font-serif text-[15px] font-light leading-snug text-plum">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
          </nav>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/on-ai"
              className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              ← All pieces
            </Link>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </Reveal>
      </article>
    </main>
  )
}
