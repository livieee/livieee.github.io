import { Link, useParams, Navigate } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { POSTS, type LocalPost } from '@/content/onAI'

/**
 * /on-ai/:slug —— 单篇。
 *
 * 正文一字未改写，所以排版只能在「不碰文字」的前提下做。三件事：
 *
 * 1. 引号排版。她句子里引的是别人的话（讲者的原话短语），和她自己的
 *    声音混在同一段里，纯文本看不出区别。把引号本身做成装饰色、引文
 *    走斜体，借来的话就和她的话分开了。
 * 2. 两节给不同的质感。前一节是回看（白底、常规正文），后一节是推演
 *    （淡色底、左侧竖线）—— 它们性质不同，长得一样是浪费。
 * 3. 边栏拎一句。宽屏时正文右侧浮一句她自己写的狠话；窄屏不显示，
 *    免得变成重复两遍的噪音。
 */

const LOCAL = POSTS.filter((p): p is LocalPost => p.kind === 'local')

/** 把段落里成对的引号切出来，引文单独上样式 —— 借来的话和她自己的话分开 */
function Quoted({ text }: { text: string }) {
  // 原文两种引号都有（docx 存的是直引号，PDF 里是弯引号），两种都认
  const parts = text.split(/(\u201C[^\u201D]*\u201D|"[^"]*")/g)
  return (
    <>
      {parts.map((s, i) => {
        const quoted =
          (s.startsWith('\u201C') && s.endsWith('\u201D') && s.length > 2) ||
          (s.startsWith('"') && s.endsWith('"') && s.length > 2)
        if (!quoted) return <span key={i}>{s}</span>
        return (
          // <q> 自带 content 引号，必须关掉，否则和下面的装饰引号叠成双层
          <q key={i} className="italic text-plum before:content-none after:content-none">
            <span aria-hidden className="not-italic text-rose/70">
              {'\u201C'}
            </span>
            {s.slice(1, -1)}
            <span aria-hidden className="not-italic text-rose/70">
              {'\u201D'}
            </span>
          </q>
        )
      })}
    </>
  )
}

export function OnAIPost() {
  const { slug } = useParams()
  const i = LOCAL.findIndex((p) => p.slug === slug)
  if (i === -1) return <Navigate to="/on-ai" replace />

  const post = LOCAL[i]
  // 列表是倒序排的（06 在前），所以"更新的一篇"在数组里是前一个
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

      {/* 正文一栏居中；边栏那句用 absolute 浮在右边，不挤版心 */}
      <div className="relative mx-auto max-w-2xl px-6 pb-24 pt-32 md:px-10 md:pt-36">
        <article>
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

          {/* ── 一 · 回看 ───────────────────────────────── */}
          <Reveal delay={0.14}>
            <section className="relative mt-10">
              {/* 边栏拎的那一句 —— 逐字摘自正文，贴着开头几段浮在右侧。
                  窄屏隐藏：挤不下，而且同一句出现两遍在小屏上只是噪音 */}
              <aside
                aria-hidden
                className="pointer-events-none absolute left-full top-8 hidden w-[230px] pl-10 xl:block"
              >
                <span aria-hidden className="block font-serif text-[40px] leading-none text-rose/25">
                  {'\u201C'}
                </span>
                <p className="-mt-2 font-serif text-[17px] font-light italic leading-snug text-plum/70">
                  {post.lift}
                </p>
              </aside>
              <p className="label-text mb-4">What I took from it</p>
              <div className="space-y-5">
                {post.learning.map((t, k) => (
                  <p
                    key={t.slice(0, 40)}
                    className={
                      k === 0
                        ? 'text-[17px] leading-[1.7] text-plum md:text-[18px]'
                        : 'text-[15.5px] leading-[1.75] text-plum-muted md:text-base'
                    }
                  >
                    <Quoted text={t} />
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── 二 · 推演 ───────────────────────────────── */}
          <Reveal delay={0.2}>
            <section className="mt-12 border-l-2 border-orchid/35 bg-lavender/20 py-6 pl-6 pr-5 md:mt-14 md:pl-8">
              <p className="label-text mb-4">Where I'd point it</p>
              <div className="space-y-5">
                {post.useCase.map((t) => (
                  <p key={t.slice(0, 40)} className="text-[15.5px] leading-[1.75] text-plum-muted md:text-base">
                    <Quoted text={t} />
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-12 border-t border-plum/10 pt-6 text-[12.5px] leading-relaxed text-plum-faint">
              Written after a guest lecture at CMU, early 2025. My own takeaways only — what the
              speakers said stays in their room. Left as written.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <nav className="mt-10 flex flex-col gap-3 border-t border-plum/10 pt-8 sm:flex-row sm:items-stretch sm:justify-between">
              {newer ? (
                <Link
                  to={`/on-ai/${newer.slug}`}
                  className="flex-1 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
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
                  className="flex-1 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
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

          <Reveal delay={0.32}>
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

      </div>
    </main>
  )
}
