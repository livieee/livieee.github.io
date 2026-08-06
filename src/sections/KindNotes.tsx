import { useEffect, useRef, useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 *
 * 结构回到最早那版：整张卡就是信封，封面直接读得到最有力的一句和落款，
 * 点一下掀开封口、展开整封信。信息不藏 —— 推荐语是这一整站里唯一
 * 「不是她自己说的」内容，价值就在于一眼被读到。
 *
 * 外观按参考图重做：近白带粉调、极柔的漫射投影（没有硬边）、
 * 花瓣形封蜡、署名用手写体当签名。之前那版米色 + 网格纹 + 纯色圆点
 * 是贴图感，这版靠层叠与柔光做体积。
 *
 * ⚠️ 只放真实收到过的原话。GROUPS 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 */

type Note = {
  text: string
  /** 封面上露出的那一句，取自正文 */
  lead: string
  from: string
  affil: string
  /** 与她的关系 / 时间，没有就不显示 */
  meta?: string
  /** 机构：做成信封上的邮票，也做成信纸的信头 —— 真实性靠这个立 */
  org: { name: string; logo: string }
  /** 可核验的出处。真实性最强的信号是"不用信我，自己去看" */
  source?: { label: string; href: string }
}

const CMU = { name: 'Carnegie Mellon University', logo: '/logos/cmu.png' }
const III = { name: 'CMU Integrated Innovation Institute', logo: '/logos/iii.png' }
const PEOPLEAI = { name: 'People.ai', logo: '/logos/peopleai.png' }

/** 她的 LinkedIn 推荐区 —— 两条同事推荐语的原始出处 */
// 用主页地址而不是 /details/recommendations/：未登录访客点后者会被
// LinkedIn 的 authwall 拦掉并重定向回主页，等于绕一圈
const LI_RECS = 'https://www.linkedin.com/in/olivia-zerun-xiao/'

const NOTES: Note[] = [
  {
    org: CMU,
    lead: 'The team she guided earned the highest score in the class.',
    text: 'Olivia demonstrated exceptional mentorship and leadership as a PM Course Advisor. The team she guided earned the highest score in the class, and their Product Plan/PRD was among the best I have seen in years of teaching the course.',
    from: 'Prof. Adrian Ott',
    affil: 'Carnegie Mellon University',
  },
  {
    org: III,
    lead: 'One of the best submissions we received.',
    text: 'Olivia’s work stood out as one of the best submissions we received—beautifully articulated, deeply insightful, and a brilliant synthesis of complex concepts. Her ability to communicate with clarity, nuance, and depth was truly commendable.',
    from: 'Sahaana Das',
    affil: 'Applied AI Course Team, CMU Integrated Innovation Institute',
  },
  {
    org: CMU,
    lead: 'Watching her development has been deeply rewarding.',
    text: 'Across several courses, Olivia’s contributions demonstrated a strong commitment to academic excellence and professional growth. Watching her development has been deeply rewarding.',
    from: 'Prof. Catherine Fang',
    affil: 'Carnegie Mellon University',
  },
  {
    org: CMU,
    lead: 'It was always a delight to answer your curious questions.',
    text: 'It was always a delight to answer your curious questions in all the classes we had together.',
    from: 'Prof. Stuart Evans',
    affil: 'Carnegie Mellon University',
  },
  {
    org: PEOPLEAI,
    lead: 'She has consistently proven to be an invaluable asset to our team.',
    text: 'I enjoyed working with Olivia for over a year at People.ai, and throughout this time, she has consistently proven to be an invaluable asset to our team. […] Olivia has a knack for effectively conveying complex ideas and concepts in a clear and concise manner, whether it be in written reports, presentations, or interpersonal interactions.',
    from: 'Tetiana Krytsyna',
    affil: 'Technical Success Engineer / Manual QA Engineer',
    meta: 'Senior to Olivia, worked alongside her · February 2024',
    source: { label: 'View on LinkedIn', href: LI_RECS },
  },
  {
    org: PEOPLEAI,
    lead: 'Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
    text: 'I had a pleasure to work with Olivia for over a year. She is a highly motivated, detail-oriented engineer with great technical skillset and work ethics. Olivia does not hesitate to pick up complex problems and lead them to successful resolution.',
    from: 'Vadym Rudenko',
    affil: 'Sr. Technical Success Engineer at People.ai',
    meta: 'Worked with Olivia on the same team · November 2023',
    source: { label: 'View on LinkedIn', href: LI_RECS },
  },
]

/** 慢而有重量的收尾 */
const EASE = 'cubic-bezier(.16,1,.3,1)'

/** 花瓣形封蜡的轮廓：n 瓣，外径 R、内径 r 交替，用二次曲线连起来 */
function scallop(n = 12, R = 46, r = 37) {
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const a1 = ((i + 0.5) / n) * Math.PI * 2
    const a2 = ((i + 1) / n) * Math.PI * 2
    const cx = 50 + Math.cos(a1) * R
    const cy = 50 + Math.sin(a1) * R
    const x = 50 + Math.cos(a2) * r
    const y = 50 + Math.sin(a2) * r
    pts.push(`Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  const sx = 50 + r
  return `M${sx.toFixed(2)} 50 ${pts.join(' ')} Z`
}

const SCALLOP = scallop()

function Seal({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[44px] z-40 block h-[42px] w-[42px] -translate-x-1/2"
      style={{
        opacity: open ? 0 : 1,
        transform: `translateX(-50%) scale(${open ? 0.4 : 1}) rotate(${open ? 90 : 0}deg)`,
        transformOrigin: 'center',
        transition: `transform .8s ${EASE}, opacity .45s ease`,
      }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <radialGradient id="sealOuter" cx="36%" cy="28%">
            <stop offset="0" stopColor="#FDF1F4" />
            <stop offset="1" stopColor="#F3D3DC" />
          </radialGradient>
          <radialGradient id="sealInner" cx="38%" cy="30%">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FAE3E9" />
          </radialGradient>
        </defs>
        <path d={SCALLOP} fill="url(#sealOuter)" />
        <circle cx="50" cy="50" r="30" fill="url(#sealInner)" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="26"
          fontStyle="italic"
          fill="#C0708C"
          style={{ fontFamily: 'Fraunces, Georgia, serif' }}
        >
          O
        </text>
      </svg>
    </span>
  )
}

/**
 * 邮票：真信封右上角本来就是贴邮票的地方，机构标识放这儿位置天然正确，
 * 一眼看出这封信来自哪儿。
 *
 * 齿孔没用 repeating-radial 遮罩 —— 那会在整张票面上打洞（像被虫蛀），
 * 齿孔只该在边上。改成白票面 + 虚线描边 + 投影，干净且一眼读得出是邮票。
 */
function Stamp({ org }: { org: Note['org'] }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-5 top-[18px] z-40 flex h-[46px] w-[39px] rotate-[3deg] items-center justify-center rounded-[3px] bg-white p-[5px]"
      style={{ boxShadow: '0 4px 10px -4px rgba(196,143,163,0.5)' }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[2px] border border-dashed border-[#C48FA3]/45">
        <img src={org.logo} alt="" className="h-[22px] w-[22px] object-contain" />
      </span>
    </span>
  )
}

function Envelope({
  note,
  open,
  onToggle,
}: {
  note: Note
  open: boolean
  /** open 交给父级 —— 自动演示要能替读者拆信 */
  onToggle: () => void
}) {
  const [hover, setHover] = useState(false)

  return (
    // pt 给掀开的封口留头顶空间；不能 overflow-hidden，否则封口会被切掉
    <article className="relative pt-[44px]" style={{ perspective: '1500px' }}>
      <button
        type="button"
        onClick={onToggle}
        onPointerEnter={(e) => e.pointerType !== 'touch' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-expanded={open}
        className="group/env block w-full text-left"
      >
        <div
          className="relative rounded-[1.3rem] px-6 pb-6 pt-[74px] transition-all duration-700 md:px-7"
          style={{
            background: 'linear-gradient(176deg, #FFFFFF 0%, #FEF8F9 55%, #FCF1F3 100%)',
            // 极柔的漫射投影，没有硬边 —— 参考图的质感全在这
            boxShadow: open
              ? '0 40px 70px -34px rgba(196,143,163,0.5), 0 6px 16px -8px rgba(196,143,163,0.18), inset 0 1px 0 rgba(255,255,255,0.9)'
              : hover
                ? '0 34px 60px -30px rgba(196,143,163,0.45), 0 5px 14px -8px rgba(196,143,163,0.16), inset 0 1px 0 rgba(255,255,255,0.9)'
                : '0 24px 48px -28px rgba(196,143,163,0.38), 0 3px 10px -6px rgba(196,143,163,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
            transform: `translateY(${open ? 0 : hover ? -4 : 0}px)`,
            transitionTimingFunction: EASE,
          }}
        >
          {/* 封口：绕顶边翻上去。两面分开画 —— 翻过来那面原本贴着信封内侧，更暗 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[62px] origin-top"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${open ? -152 : hover ? -8 : 0}deg)`,
              transition: `transform .9s ${EASE}`,
            }}
          >
            <svg
              viewBox="0 0 400 62"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{ backfaceVisibility: 'hidden', filter: 'drop-shadow(0 6px 10px rgba(196,143,163,0.26))' }}
            >
              <defs>
                <linearGradient id="flapF" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#FBEFF2" />
                </linearGradient>
              </defs>
              <path d="M0 0 H400 L200 62 Z" fill="url(#flapF)" />
              <path d="M0 0 L200 62 L400 0" fill="none" stroke="rgba(196,143,163,0.28)" strokeWidth="1" />
            </svg>
            <svg
              viewBox="0 0 400 62"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                filter: 'drop-shadow(0 -3px 8px rgba(196,143,163,0.22))',
              }}
            >
              <defs>
                <linearGradient id="flapB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBF0F3" />
                  <stop offset="1" stopColor="#FEFAFB" />
                </linearGradient>
              </defs>
              <path d="M0 0 H400 L200 62 Z" fill="url(#flapB)" />
            </svg>
          </div>

          <Seal open={open} />

          <Stamp org={note.org} />

          {/* 封面那句：拆开后收掉 —— 它本来就是信里的一句，
              开着时同一句读两遍是冗余，收掉还省下三四行高度 */}
          <div
            className="relative z-10 grid"
            style={{
              gridTemplateRows: open ? '0fr' : '1fr',
              opacity: open ? 0 : 1,
              transition: `grid-template-rows .7s ${EASE}, opacity .4s ease`,
            }}
          >
            <p
              className="overflow-hidden font-serif font-light leading-[1.32] text-plum"
              style={{ fontSize: 'clamp(1rem,1.75vw,1.25rem)', letterSpacing: '-0.012em' }}
            >
              {note.lead}
            </p>
          </div>

          {/* 整封信 */}
          <div
            className="relative z-10 grid"
            style={{
              gridTemplateRows: open ? '1fr' : '0fr',
              transition: `grid-template-rows .85s ${EASE}`,
            }}
          >
            <div className="overflow-hidden">
              <div
                className="mt-4 rounded-[0.7rem] px-4 py-4"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF9FA 100%)',
                  boxShadow: open
                    ? '0 14px 30px -20px rgba(196,143,163,0.5), inset 0 1px 0 rgba(255,255,255,0.9)'
                    : 'none',
                  transform: `translateY(${open ? 0 : 22}px)`,
                  opacity: open ? 1 : 0,
                  transition: `transform .9s ${EASE} .14s, opacity .55s ease .14s, box-shadow .8s ${EASE}`,
                }}
              >
                {/* 信头：像真的机构信笺，标识 + 姓名 + 关系日期 */}
                <div className="mb-3 flex items-center gap-2.5 border-b border-plum/10 pb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-plum/10">
                    <img src={note.org.logo} alt="" className="h-[18px] w-[18px] object-contain" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-plum">
                      {note.org.name}
                    </span>
                    {note.meta && (
                      <span className="mt-1 block text-[10.5px] leading-snug text-plum-faint">
                        {note.meta}
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-plum-muted">{note.text}</p>
              </div>
            </div>
          </div>

          {/* 落款：署名用手写体，像信末的签名 */}
          <footer className="relative z-10 mt-5 border-t border-plum/10 pt-4">
            <p className="font-hand text-[17px] leading-none text-plum">{note.from}</p>
            <p className="mt-2 text-[11.5px] leading-snug text-plum-muted">{note.affil}</p>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
              {note.source ? (
                // 真实性最强的信号：不用信我，自己去看。
                // 放在 button 里，所以用 span + onClick 手动开，避免嵌套交互元素
                <span
                  role="link"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(note.source!.href, '_blank', 'noopener,noreferrer')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(note.source!.href, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  className="cursor-pointer text-[11px] text-plum-faint underline decoration-plum/20 underline-offset-4 transition-colors hover:text-rose hover:decoration-rose/50"
                >
                  {note.source.label} ↗
                </span>
              ) : (
                <span />
              )}
              <span className="flex items-center gap-2 text-[11.5px] font-medium text-plum-muted transition-colors group-hover/env:text-plum">
                <span
                  aria-hidden
                  className="block h-px bg-plum/25 transition-all duration-500 group-hover/env:bg-rose"
                  style={{ width: open ? 26 : 18 }}
                />
                {open ? 'seal it back' : 'open the letter'}
              </span>
            </div>
          </footer>
        </div>
      </button>
    </article>
  )
}

/**
 * 随手发来的两段私信 —— 和上面六条不是一个语气，所以不塞进信封。
 * 和上面的信封是同一套纸，只是短一些 —— 原本做成聊天气泡，那太像
 * 在展示别人的私信了；收成便条，读的是那句话本身，不是它从哪儿来的。
 *
 * 用词照录、不改写、不补标点。只做两处取舍：
 *   - 同一条消息里连着发的几行合成一句（词序词形都没动）
 *   - 略去 "T_T" —— 那是情绪，不是评价
 * 只重绘、不贴原始截图：截图里有时间戳、头像和平台痕迹，
 * 那些是对方的隐私，不是内容。署名按她确认的口径：名 + 角色。
 */
const MESSAGES = {
  from: 'Victor',
  role: 'AI Valley founder',
  notes: [
    'i always need more hands and you are proactive rare trait to find',
    'you were one of the best ai valley ppl in terms of work ethic',
  ],
}

/** 每封信停留多久：按字数给时间，短信不必干等，长信不至于读不完 */
function holdFor(text: string) {
  return Math.min(7000, 2400 + text.split(/\s+/).length * 95)
}

/**
 * 横向信封带 + 自动演示。
 *
 * 它自己会演一遍：滑到一封 → 拆开 → 停够读完 → 收回 → 滑向下一封。
 * 「自动滑动」和「拆信」在这里是同一件事，而不是两个各自播放的动效。
 *
 * 但自动播放不能跟正在读的人抢方向盘，所以：
 *   - 只在整块进入视口时才播，离开就停
 *   - 悬停暂停
 *   - 用户一旦自己动（点信封 / 点箭头 / 拖动 / 触屏 / 滚轮）就**永久让位**
 *   - prefers-reduced-motion 下完全不播
 */
export function KindNotes() {
  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /** 当前拆开的是哪一封（null = 都合着） */
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  /** 自动演示走到第几封 */
  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hovering, setHovering] = useState(false)
  const taken = useRef(false)

  const takeOver = () => {
    taken.current = true
    setPlaying(false)
  }

  const sync = () => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8)
  }

  /** 把第 i 封滑到带子左缘（对齐内边距，和 snap 落点一致） */
  const slideTo = (i: number) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelectorAll('article')[i] as HTMLElement | undefined
    if (!card) return
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const left = card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - pad
    el.scrollTo({ left, behavior: 'smooth' })
  }

  const nudge = (dir: 1 | -1) => {
    takeOver()
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 24 : 360
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // 整块进视口才播；离开就停（别在看不见的地方空转）
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = railRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setPlaying(e.isIntersecting && !taken.current),
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 一封信的完整一拍：滑过去 → 拆开 → 停 → 收回 → 下一封
  useEffect(() => {
    if (!playing || hovering) return
    const timers: number[] = []
    const note = NOTES[cursor]
    slideTo(cursor)
    timers.push(window.setTimeout(() => setOpenIdx(cursor), 850))
    timers.push(window.setTimeout(() => setOpenIdx(null), 850 + holdFor(note.text)))
    timers.push(
      window.setTimeout(() => setCursor((c) => (c + 1) % NOTES.length), 850 + holdFor(note.text) + 700),
    )
    return () => timers.forEach(clearTimeout)
  }, [playing, hovering, cursor])

  if (NOTES.length === 0) return null

  return (
    <section id="notes" className="pb-4 pt-20 md:pb-8 md:pt-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <p className="label-text mb-6 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            Kind Notes I've Kept
          </p>
        </Reveal>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.15] text-plum">
            <WordReveal text="The part I can't write myself —" />{' '}
            <span className="italic text-orchid">
              <WordReveal text="in their words." delay={0.28} />
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <span className="mr-1 font-hand text-[15px] text-plum-muted">
              {playing && !hovering ? 'reading them for you ✦' : 'slide · open one ✦'}
            </span>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d)}
                disabled={d === -1 ? atStart : atEnd}
                aria-label={d === 1 ? 'Next note' : 'Previous note'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 bg-white text-[14px] text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-rose/50 disabled:pointer-events-none disabled:opacity-25"
              >
                {d === 1 ? '→' : '←'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={sync}
        onPointerEnter={(e) => e.pointerType !== 'touch' && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onPointerDown={takeOver}
        onWheel={takeOver}
        onTouchStart={takeOver}
        // min-h 给"拆开后最高的那封"预留：不留的话自动演示每拆一封，
        // 整页下方都会跟着上下跳。收窄卡片、拆开时收掉封面那句之后，
        // 实测最高一封从 764/804 降到 597px（桌面）/ 639px（手机，卡更窄
        // 所以同样的文字更高）——手机反而要留得更多。
        // 合着时多出来的空白由 section 减掉下边距吃掉。
        className="mt-8 flex min-h-[660px] snap-x snap-mandatory items-start gap-5 md:mt-12 md:min-h-[620px] overflow-x-auto overscroll-x-contain pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-14 md:gap-6 [&::-webkit-scrollbar]:hidden"
        style={{
          paddingLeft: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
          paddingRight: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
          scrollPaddingLeft: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
        }}
      >
        {NOTES.map((note, i) => (
          <Reveal key={note.from} delay={0.04 + i * 0.05} y={22} className="shrink-0 snap-start">
            <div className="w-[268px] sm:w-[296px] md:w-[318px]">
              <Envelope
                note={note}
                open={openIdx === i}
                onToggle={() => {
                  takeOver()
                  setOpenIdx((cur) => (cur === i ? null : i))
                }}
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* 两张便条：和信封同一套纸，只是短一些 */}
      <div className="mx-auto mt-4 max-w-5xl px-6 md:mt-8 md:px-10">
        <Reveal>
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-plum-faint">
            and some that came as short notes
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {MESSAGES.notes.map((note, i) => (
            <Reveal key={note} delay={0.08 + i * 0.12} y={18}>
              <figure className="relative h-full overflow-hidden rounded-[1.1rem] border border-plum/10 bg-cream-soft/80 px-6 py-5 md:py-6 shadow-[0_12px_30px_-22px_rgba(90,63,86,0.55)]">
                {/* 纸的上缘：一条比纸略深的窄边，像便条撕下来的那一侧 */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-rose/25" />
                <span
                  aria-hidden
                  className="absolute left-4 top-3 font-serif text-[42px] leading-none text-rose/20"
                >
                  “
                </span>
                <blockquote className="relative pl-6 font-serif text-[15px] font-light italic leading-relaxed text-plum md:text-[16px]">
                  {note}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* 两句都出自同一个人，署名就该只有一条 —— 每张卡各署一次，
            并排看过去像是两个人说的 */}
        <Reveal delay={0.4}>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 text-[12px]">
            <span aria-hidden className="h-px w-6 self-center bg-rose/50" />
            <span className="font-hand text-[17px] leading-none text-plum">{MESSAGES.from}</span>
            <span className="text-plum-muted">{MESSAGES.role}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
