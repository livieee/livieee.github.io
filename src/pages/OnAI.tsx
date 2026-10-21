import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { BackLink } from '@/components/BackLink'
import { POSTS } from '@/content/onAI'

/**
 * /on-ai —— 索引页。
 *
 * 八篇：两篇在 Medium（给出口，不搬正文），六篇在站内（点进 /on-ai/:slug）。
 * 卡片只露标题和一句引子 —— 列表页的任务是让人挑一篇，不是让人在这里读完。
 */

export function OnAI() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="On AI">
          <BackLink />
          <Link to="/" className="font-serif text-[15px] text-plum transition-colors hover:text-orchid">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <p className="label-text mb-5 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            On AI
          </p>
        </Reveal>

        <h1 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="What I think is actually" />{' '}
          <span className="italic text-orchid">
            <WordReveal text="changing in AI." delay={0.26} />
          </span>
        </h1>

        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
            Interfaces, agents, infrastructure, cheap models — and what all of it does to the job.
            Dated on purpose: each piece is the call I made at the time, not a view edited since.
          </p>
        </Reveal>

        <ul className="mt-14 md:mt-20">
          {POSTS.map((p, i) => {
            const inner = (
              <>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span aria-hidden className="font-serif text-[20px] font-light leading-none text-rose/45">
                    {p.n}
                  </span>
                  <span className="label-text">
                    {p.kind === 'external' ? p.where : p.topic}
                  </span>
                  <span aria-hidden className="h-px w-4 bg-plum/15" />
                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-plum-faint">
                    {p.when}
                  </span>
                </span>

                <span className="mt-3 block font-serif text-[21px] font-light leading-snug text-plum transition-colors duration-300 group-hover/post:text-orchid md:text-[25px]">
                  {p.title}
                </span>

                <span className="mt-2.5 block max-w-2xl text-[14px] leading-relaxed text-plum-muted">
                  {p.kind === 'external' ? p.blurb : p.learning[0].slice(0, 170).trim() + '…'}
                </span>

                <span className="mt-4 flex items-center gap-2 text-[12.5px] font-medium">
                  <span
                    aria-hidden
                    className="block h-px w-5 bg-plum/25 transition-all duration-500 group-hover/post:w-9 group-hover/post:bg-rose"
                  />
                  <span className="text-plum-muted transition-colors group-hover/post:text-plum">
                    {p.kind === 'external' ? `Read on Medium · ${p.readingTime}` : 'Read it'}
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/post:translate-x-0.5"
                  >
                    {p.kind === 'external' ? '↗' : '→'}
                  </span>
                </span>
              </>
            )

            const cls =
              'group/post block border-t border-plum/10 py-8 transition-all duration-300 md:py-10'

            return (
              <li key={p.kind === 'external' ? p.href : p.slug}>
                <Reveal delay={0.04 + i * 0.04} y={20}>
                  {p.kind === 'external' ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={`/on-ai/${p.slug}`} className={cls}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-plum/10 pt-8">
            <Link
              to="/work"
              className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              ← All work
            </Link>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
