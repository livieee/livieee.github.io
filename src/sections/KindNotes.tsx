import { useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 *
 * 形式是信封：封面就露出最有力的一句加署名、关系、日期（信息不藏起来），
 * 点开掀起封口、展成整封信。"Kept" 说的本来就是"我留着的信"。
 * 没做成需要点开才看得见内容的容器 —— 推荐语是这一整站里唯一
 * 不是她自己说的东西，价值就在于一眼被读到。
 *
 * ⚠️ 只放真实收到过的原话。NOTES 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 *
 * 来源：她 LinkedIn 个人页 Recommendations · Received，原文照录未润色。
 * （Tetiana 那条在 LinkedIn 上被 "…more" 折叠，这里收录的是可见的完整段落。）
 */

type Note = {
  from: string
  role: string
  /** 与她的工作关系，沿用 LinkedIn 上的原始表述 */
  rel: string
  date: string
  /** 封面上露出的那一句，取自正文 */
  lead: string
  /** 完整原文，按原始分段 */
  body: string[]
  where: string
}

const NOTES: Note[] = [
  {
    from: 'Tetiana Krytsyna',
    role: 'Technical Success Engineer / Manual QA Engineer',
    rel: 'Senior to Olivia, worked alongside her',
    date: 'February 2024',
    lead: 'She has consistently proven to be an invaluable asset to our team.',
    body: [
      'I enjoyed working with Olivia for over a year at People.ai, and throughout this time, she has consistently proven to be an invaluable asset to our team. She demonstrates a strong work ethic, attention to detail, and a commitment to delivering high-quality results.',
      'Olivia has a knack for effectively conveying complex ideas and concepts in a clear and concise manner, whether it be in written reports, presentations, or interpersonal interactions. Her collaborative nature fosters a positive working environment.',
    ],
    where: 'LinkedIn recommendation',
  },
  {
    from: 'Vadym Rudenko',
    role: 'Sr. Technical Success Engineer at People.ai',
    rel: 'Worked with Olivia on the same team',
    date: 'November 2023',
    lead: 'Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
    body: [
      'I had a pleasure to work with Olivia for over a year. She is a highly motivated, detail-oriented engineer with great technical skillset and work ethics. Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
    ],
    where: 'LinkedIn recommendation',
  },
]

/** 信封封口：闭合时是朝下的三角，掀开时绕顶边翻上去 */
function Flap({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 block h-[58px] origin-top"
      style={{
        transform: `rotateX(${open ? -168 : 0}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform .75s cubic-bezier(.2,.8,.25,1)',
      }}
    >
      <svg viewBox="0 0 400 58" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 0 H400 L200 58 Z" fill="#F5EDE3" />
        <path d="M0 0 L200 58 L400 0" fill="none" stroke="rgba(58,36,64,0.14)" strokeWidth="1" />
      </svg>
      {/* 封蜡 */}
      <span
        className="absolute left-1/2 top-[42px] h-4 w-4 -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #E0A2B8, #C0708C 70%)',
          boxShadow: '0 2px 5px -2px rgba(58,36,64,0.6)',
        }}
      />
    </span>
  )
}

function Letter({ note, i }: { note: Note; i: number }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="relative h-full" style={{ perspective: '1000px' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`group/env paper-grid relative flex h-full w-full flex-col overflow-hidden rounded-[1.2rem] border border-plum/10 bg-cream-soft px-6 pb-6 pt-[74px] text-left shadow-[0_20px_46px_-28px_rgba(58,36,64,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_58px_-28px_rgba(58,36,64,0.6)] md:hover:rotate-0 ${
          i % 2 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.6deg]'
        }`}
      >
        <Flap open={open} />

        {/* 邮票角 */}
        <span
          aria-hidden
          className="absolute right-5 top-[70px] z-10 flex h-9 w-9 rotate-[9deg] items-center justify-center rounded-[3px] border border-dashed border-plum/25 font-hand text-[12px] leading-none text-plum-faint"
        >
          in
        </span>

        <p className="relative z-10 max-w-[46ch] font-serif text-[clamp(1.05rem,1.7vw,1.35rem)] font-light leading-snug text-plum">
          “{note.lead}”
        </p>

        {/* 整封信：grid-rows 0fr → 1fr，高度可动画且不必写死 max-height */}
        <div
          className="relative z-10 grid transition-all duration-700 ease-out"
          style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <div className="mt-4 space-y-3 border-t border-plum/10 pt-4">
              {note.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-[13.5px] leading-relaxed text-plum-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        <footer className="relative z-10 mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-plum/10 pt-4">
          <div className="min-w-0">
            <p className="font-hand text-[18px] leading-none text-plum">{note.from}</p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-plum-muted">{note.role}</p>
            <p className="mt-1 text-[11px] leading-snug text-plum-faint">
              {note.rel} · {note.date}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] font-medium text-plum-muted transition-colors group-hover/env:text-plum">
            {open ? 'fold it back' : 'read the letter'}
            <span
              aria-hidden
              className="transition-transform duration-500"
              style={{ transform: open ? 'rotate(180deg)' : 'none' }}
            >
              ↓
            </span>
          </span>
        </footer>

        <span className="sr-only">{note.where}</span>
      </button>
    </article>
  )
}

export function KindNotes() {
  if (NOTES.length === 0) return null

  return (
    <section id="notes" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <p className="label-text mb-5 flex items-center gap-3">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
          Kind Notes I've Kept
        </p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="The part I can't write myself —" />{' '}
        <span className="italic text-orchid">
          <WordReveal text="in their words." delay={0.28} />
        </span>
      </h2>

      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
        {NOTES.map((n, i) => (
          <Reveal key={n.from} delay={0.06 + i * 0.08} y={24}>
            <Letter note={n} i={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24}>
        <p className="mt-7 font-hand text-[16px] text-plum-muted">
          both from my People.ai team ✦
        </p>
      </Reveal>
    </section>
  )
}
