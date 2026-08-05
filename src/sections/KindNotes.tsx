import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 *
 * 编辑式排版，不用容器：靠字号、留白与错位撑住，不靠贴图。
 * 六条不是平权并排的六个方块 —— 用 size 分三档：
 *   lead 一条领起（最有分量的那条）→ mid 两两成对 → aside 一句话的暖场收尾。
 *
 * 分两组：CMU 的老师、共事过的同事。分组本身就是信息 ——
 * 一个人在课堂上和在项目里被怎么评价，是两件事。
 *
 * ⚠️ 只放真实收到过的原话。NOTES 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 */

type Size = 'lead' | 'mid' | 'aside'

type Note = {
  text: string
  from: string
  affil: string
  /** 与她的关系 / 来源，没有就不显示 */
  meta?: string
  size: Size
}

type Group = { label: string; notes: Note[] }

const GROUPS: Group[] = [
  {
    label: 'From my professors at CMU',
    notes: [
      {
        text: 'Olivia demonstrated exceptional mentorship and leadership as a PM Course Advisor. The team she guided earned the highest score in the class, and their Product Plan/PRD was among the best I have seen in years of teaching the course.',
        from: 'Prof. Adrian Ott',
        affil: 'Carnegie Mellon University',
        size: 'lead',
      },
      {
        text: 'Olivia’s work stood out as one of the best submissions we received—beautifully articulated, deeply insightful, and a brilliant synthesis of complex concepts. Her ability to communicate with clarity, nuance, and depth was truly commendable.',
        from: 'Sahaana Das',
        affil: 'Applied AI Course Team, CMU Integrated Innovation Institute',
        size: 'mid',
      },
      {
        text: 'Across several courses, Olivia’s contributions demonstrated a strong commitment to academic excellence and professional growth. Watching her development has been deeply rewarding.',
        from: 'Prof. Catherine Fang',
        affil: 'Carnegie Mellon University',
        size: 'mid',
      },
      {
        text: 'It was always a delight to answer your curious questions in all the classes we had together.',
        from: 'Prof. Stuart Evans',
        affil: 'Carnegie Mellon University',
        size: 'aside',
      },
    ],
  },
  {
    label: 'From the team I worked with',
    notes: [
      {
        text: 'I enjoyed working with Olivia for over a year at People.ai, and throughout this time, she has consistently proven to be an invaluable asset to our team. […] Olivia has a knack for effectively conveying complex ideas and concepts in a clear and concise manner, whether it be in written reports, presentations, or interpersonal interactions.',
        from: 'Tetiana Krytsyna',
        affil: 'Technical Success Engineer / Manual QA Engineer',
        meta: 'Senior to Olivia, worked alongside her · February 2024',
        size: 'mid',
      },
      {
        text: 'I had a pleasure to work with Olivia for over a year. She is a highly motivated, detail-oriented engineer with great technical skillset and work ethics. Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
        from: 'Vadym Rudenko',
        affil: 'Sr. Technical Success Engineer at People.ai',
        meta: 'Worked with Olivia on the same team · November 2023',
        size: 'mid',
      },
    ],
  },
]

const TYPE: Record<Size, { size: string; lh: number; width: string }> = {
  lead: { size: 'clamp(1.45rem,3.1vw,2.2rem)', lh: 1.3, width: 'max-w-[30ch]' },
  mid: { size: 'clamp(1.05rem,1.9vw,1.3rem)', lh: 1.5, width: 'max-w-[42ch]' },
  aside: { size: 'clamp(1.15rem,2.2vw,1.55rem)', lh: 1.4, width: 'max-w-[34ch]' },
}

function Quote({ note, n }: { note: Note; n?: string }) {
  const t = TYPE[note.size]
  const aside = note.size === 'aside'

  return (
    <figure className="relative">
      {n && (
        <div className="mb-5 flex items-center gap-4">
          <span className="font-serif text-[13px] tabular-nums text-orchid">{n}</span>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-plum/15 to-transparent" />
        </div>
      )}

      <blockquote className="relative">
        {note.size === 'lead' && (
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-9 select-none font-serif leading-none text-orchid/10 md:-left-9 md:-top-12"
            style={{ fontSize: 'clamp(6rem,12vw,10rem)' }}
          >
            “
          </span>
        )}
        <p
          className={`relative font-serif font-light text-plum ${t.width} ${aside ? 'italic' : ''}`}
          style={{ fontSize: t.size, lineHeight: t.lh, letterSpacing: '-0.012em' }}
        >
          {aside ? `“${note.text}”` : note.text}
        </p>
      </blockquote>

      <figcaption className={aside ? 'mt-4' : 'mt-6'}>
        <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-plum">
          {note.from}
        </span>
        <span className="mt-2 block text-[12.5px] leading-snug text-plum-muted">{note.affil}</span>
        {note.meta && (
          <span className="mt-1.5 block text-[11.5px] leading-snug text-plum-faint">{note.meta}</span>
        )}
      </figcaption>
    </figure>
  )
}

export function KindNotes() {
  if (GROUPS.every((g) => g.notes.length === 0)) return null

  return (
    <section id="notes" className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6 flex items-center gap-3">
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

      {GROUPS.map((group, gi) => {
        const lead = group.notes.find((x) => x.size === 'lead')
        const mids = group.notes.filter((x) => x.size === 'mid')
        const asides = group.notes.filter((x) => x.size === 'aside')

        return (
          <div key={group.label} className={gi === 0 ? 'mt-16 md:mt-24' : 'mt-24 md:mt-36'}>
            <Reveal>
              <p className="mb-10 text-[11px] uppercase tracking-[0.22em] text-plum-faint md:mb-14">
                {group.label}
              </p>
            </Reveal>

            {lead && (
              <Reveal y={26}>
                <Quote note={lead} n={`0${gi + 1}`} />
              </Reveal>
            )}

            {mids.length > 0 && (
              <div
                className={`grid gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-16 ${
                  lead ? 'mt-16 md:mt-20' : ''
                }`}
              >
                {mids.map((note, i) => (
                  <Reveal key={note.from} delay={0.06 + i * 0.08} y={22}>
                    <Quote note={note} />
                  </Reveal>
                ))}
              </div>
            )}

            {asides.map((note) => (
              <Reveal key={note.from} delay={0.14} y={20}>
                <div className="mt-16 border-t border-plum/10 pt-10 md:mt-20 md:pl-[14%]">
                  <Quote note={note} />
                </div>
              </Reveal>
            ))}
          </div>
        )
      })}
    </section>
  )
}
