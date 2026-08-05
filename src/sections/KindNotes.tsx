import { useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 *
 * 信封用四块 clip-path 三角拼出真实轮廓（参考 Uiverse / SmookyDev 的做法），
 * 封口是其中的上三角：闭合时顶点落在中心，打开时顶点收到顶边，三角退化成
 * 一条线，看起来就是掀开了。信纸从信封口里被抽上来。
 *
 * 相对原参考改了两处：
 *   ① 原版只绑 hover，触屏完全打不开 —— 这里用 button + 点击切换，
 *      hover 只做"封口抬一点"的预告。
 *   ② 原版信纸露出的窗口只有几十像素，放不下真实引语 ——
 *      这里让信纸从信封上方长出来（grid-rows 0fr→1fr + translateY 100%→0），
 *      整封信完全可读，信封留在下面当"抽出来的那个口袋"。
 * 闭合时封面也印着署名，像真信封上的落款 —— 不知道是谁写的就没人想拆。
 *
 * ⚠️ 只放真实收到过的原话。GROUPS 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 */

type Note = {
  text: string
  from: string
  affil: string
  /** 与她的关系 / 时间，没有就不显示 */
  meta?: string
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
      },
      {
        text: 'Olivia’s work stood out as one of the best submissions we received—beautifully articulated, deeply insightful, and a brilliant synthesis of complex concepts. Her ability to communicate with clarity, nuance, and depth was truly commendable.',
        from: 'Sahaana Das',
        affil: 'Applied AI Course Team, CMU Integrated Innovation Institute',
      },
      {
        text: 'Across several courses, Olivia’s contributions demonstrated a strong commitment to academic excellence and professional growth. Watching her development has been deeply rewarding.',
        from: 'Prof. Catherine Fang',
        affil: 'Carnegie Mellon University',
      },
      {
        text: 'It was always a delight to answer your curious questions in all the classes we had together.',
        from: 'Prof. Stuart Evans',
        affil: 'Carnegie Mellon University',
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
      },
      {
        text: 'I had a pleasure to work with Olivia for over a year. She is a highly motivated, detail-oriented engineer with great technical skillset and work ethics. Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
        from: 'Vadym Rudenko',
        affil: 'Sr. Technical Success Engineer at People.ai',
        meta: 'Worked with Olivia on the same team · November 2023',
      },
    ],
  },
]

/** 慢而有重量的收尾 */
const EASE = 'cubic-bezier(.16,1,.3,1)'

/** 信封的四块：上（封口）/ 左 / 右 / 下，颜色差一点点就有折纸的体积 */
const PANELS = [
  { key: 'lft', clip: 'polygon(50% 50%, 0 0, 0 100%)', bg: '#EADFCE' },
  { key: 'rgt', clip: 'polygon(50% 50%, 100% 0, 100% 100%)', bg: '#EADFCE' },
  { key: 'btm', clip: 'polygon(50% 50%, 100% 100%, 0 100%)', bg: '#F4ECE0' },
]

function Envelope({ note }: { note: Note }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  // 封口：闭合时顶点在中心；打开时顶点收到顶边，三角退化成一条线
  const flapClip = open
    ? 'polygon(50% 0%, 100% 0, 0 0)'
    : hover
      ? 'polygon(50% 34%, 100% 0, 0 0)'
      : 'polygon(50% 50%, 100% 0, 0 0)'

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      onPointerEnter={(e) => e.pointerType !== 'touch' && setHover(true)}
      onPointerLeave={() => setHover(false)}
      aria-expanded={open}
      className="group/env block w-full text-left"
    >
      {/* 信纸：从信封上方长出来 */}
      <div
        className="grid"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', transition: `grid-template-rows .85s ${EASE}` }}
      >
        <div className="overflow-hidden">
          <div
            className="mx-3 rounded-t-[0.6rem] border border-b-0 border-plum/10 px-6 pb-8 pt-6"
            style={{
              background: 'linear-gradient(180deg, #FEFCF8 0%, #FBF6EE 100%)',
              boxShadow: open ? '0 -14px 30px -20px rgba(90,63,86,0.45)' : 'none',
              transform: `translateY(${open ? 0 : 100}%)`,
              transition: `transform .85s ${EASE}, box-shadow .8s ${EASE}`,
            }}
          >
            <span
              aria-hidden
              className="mb-2 block font-serif leading-none text-orchid/25"
              style={{ fontSize: '2.4rem' }}
            >
              “
            </span>
            <p className="font-serif text-[15px] font-light leading-[1.55] text-plum md:text-[15.5px]">
              {note.text}
            </p>
          </div>
        </div>
      </div>

      {/* 信封本体 */}
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-[0.7rem] transition-all duration-700"
        style={{
          background: '#F4ECE0',
          boxShadow: open
            ? '0 26px 50px -30px rgba(90,63,86,0.5)'
            : hover
              ? '0 22px 42px -26px rgba(90,63,86,0.45)'
              : '0 14px 32px -24px rgba(90,63,86,0.4)',
          transform: `translateY(${!open && hover ? -3 : 0}px)`,
          transitionTimingFunction: EASE,
        }}
      >
        {/* 落款：z 必须高于下面三块面板，否则会被盖住（闭合时就不知道是谁写的了）。
            封口只占上三角，和这里不重叠，所以 z-40 安全。 */}
        <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-4 text-center">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-plum">{note.from}</p>
          <p className="mt-1.5 text-[11px] leading-snug text-plum-muted">{note.affil}</p>
          {note.meta && <p className="mt-1 text-[10px] leading-snug text-plum-faint">{note.meta}</p>}
        </div>

        {/* 左 / 右 / 下三块，盖住信纸底部，做成"口袋" */}
        {PANELS.map((p) => (
          <span
            key={p.key}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: p.bg, clipPath: p.clip }}
          />
        ))}
        {/* 折缝：让三块之间看得出边 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              'linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(58,36,64,0.10) 50%, transparent calc(50% + 0.5px)), linear-gradient(to top left, transparent calc(50% - 0.5px), rgba(58,36,64,0.10) 50%, transparent calc(50% + 0.5px))',
          }}
        />

        {/* 封口 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            background: 'linear-gradient(180deg, #F0E6D7 0%, #E4D6C1 100%)',
            clipPath: flapClip,
            transition: `clip-path .85s ${EASE}`,
          }}
        />

        {/* 封蜡：打开时缩掉并转半圈 */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 z-50 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center font-serif text-[12px] italic text-[#F7E7EC]"
          style={{
            background: 'radial-gradient(circle at 34% 28%, #C98AA0 0%, #A9607B 48%, #83415A 100%)',
            clipPath:
              'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
            boxShadow: 'inset 0 -2px 4px rgba(66,20,34,0.5), inset 0 2px 3px rgba(255,255,255,0.35)',
            opacity: open ? 0 : 1,
            transform: `translate(-50%,-50%) scale(${open ? 0 : 1}) rotate(${open ? 180 : 0}deg)`,
            transition: `transform .85s ${EASE}, opacity .5s ease`,
          }}
        >
          O
        </span>

        {/* 提示：只在闭合且 hover 时出现，不跟落款抢 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-3 z-50 text-center text-[10px] uppercase tracking-[0.18em] text-plum-faint transition-opacity duration-500"
          style={{ opacity: hover && !open ? 1 : 0 }}
        >
          open
        </span>
      </div>
    </button>
  )
}

export function KindNotes() {
  if (GROUPS.every((g) => g.notes.length === 0)) return null

  return (
    <section id="notes" className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
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
      <Reveal delay={0.16}>
        <p className="mt-5 font-hand text-[16px] text-plum-muted">open one ✦</p>
      </Reveal>

      {GROUPS.map((group, gi) => (
        <div key={group.label} className={gi === 0 ? 'mt-14 md:mt-20' : 'mt-20 md:mt-28'}>
          <Reveal>
            <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-plum-faint md:mb-10">
              {group.label}
            </p>
          </Reveal>
          <div className="grid items-end gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
            {group.notes.map((note, i) => (
              <Reveal key={note.from} delay={0.05 + i * 0.07} y={22}>
                <Envelope note={note} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
