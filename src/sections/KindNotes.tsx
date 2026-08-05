import { useRef, useState } from 'react'
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
      className="pointer-events-none absolute left-1/2 top-[62px] z-40 block h-[52px] w-[52px] -translate-x-1/2"
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
      className="pointer-events-none absolute right-6 top-[24px] z-40 flex h-[54px] w-[46px] rotate-[3deg] items-center justify-center rounded-[3px] bg-white p-[5px]"
      style={{ boxShadow: '0 4px 10px -4px rgba(196,143,163,0.5)' }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[2px] border border-dashed border-[#C48FA3]/45">
        <img src={org.logo} alt="" className="h-[26px] w-[26px] object-contain" />
      </span>
    </span>
  )
}

function Envelope({ note }: { note: Note }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    // pt 给掀开的封口留头顶空间；不能 overflow-hidden，否则封口会被切掉
    <article className="relative pt-[64px]" style={{ perspective: '1500px' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={(e) => e.pointerType !== 'touch' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-expanded={open}
        className="group/env block w-full text-left"
      >
        <div
          className="relative rounded-[1.4rem] px-7 pb-7 pt-[104px] transition-all duration-700 md:px-8"
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
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[86px] origin-top"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${open ? -152 : hover ? -8 : 0}deg)`,
              transition: `transform .9s ${EASE}`,
            }}
          >
            <svg
              viewBox="0 0 400 86"
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
              <path d="M0 0 H400 L200 86 Z" fill="url(#flapF)" />
              <path d="M0 0 L200 86 L400 0" fill="none" stroke="rgba(196,143,163,0.28)" strokeWidth="1" />
            </svg>
            <svg
              viewBox="0 0 400 86"
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
              <path d="M0 0 H400 L200 86 Z" fill="url(#flapB)" />
            </svg>
          </div>

          <Seal open={open} />

          <Stamp org={note.org} />

          {/* 封面那句 */}
          <p
            className="relative z-10 font-serif font-light leading-[1.32] text-plum"
            style={{ fontSize: 'clamp(1.15rem,2.1vw,1.5rem)', letterSpacing: '-0.012em' }}
          >
            {note.lead}
          </p>

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
                className="mt-6 rounded-[0.8rem] px-5 py-5"
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
                <div className="mb-4 flex items-center gap-3 border-b border-plum/10 pb-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-plum/10">
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
                <p className="text-[14px] leading-relaxed text-plum-muted">{note.text}</p>
              </div>
            </div>
          </div>

          {/* 落款：署名用手写体，像信末的签名 */}
          <footer className="relative z-10 mt-7 border-t border-plum/10 pt-5">
            <p className="font-hand text-[19px] leading-none text-plum">{note.from}</p>
            <p className="mt-2.5 text-[12px] leading-snug text-plum-muted">{note.affil}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
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
 * 横向信封带。
 *
 * 不做自动滚动：信封是要点开读的，正读着被滑走会很烦
 * （照片带可以自动走，因为看照片不需要停留）。
 * 这里用 scroll-snap + 拖动 + 两个箭头，节奏交给读者。
 */
export function KindNotes() {
  if (NOTES.length === 0) return null

  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = () => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8)
  }

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 24 : 360
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="notes" className="py-24 md:py-32">
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

          {/* 左右箭头：到头就禁用，不做无限循环 */}
          <div className="flex items-center gap-2">
            <span className="mr-1 font-hand text-[15px] text-plum-muted">slide · open one ✦</span>
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

      {/* 满宽的带子：第一封与容器左边缘对齐，末尾留出同样的余量 */}
      <div
        ref={railRef}
        onScroll={sync}
        className="mt-10 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto overscroll-x-contain pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-14 md:gap-7 [&::-webkit-scrollbar]:hidden"
        style={{
          // 用内边距而不是前导空白元素：snap-mandatory 会跳过不是吸附点的空白，
          // 第一封会被直接吸到视口边上。scroll-padding 让吸附点落在内边距之后。
          paddingLeft: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
          paddingRight: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
          scrollPaddingLeft: 'max(24px, calc((100vw - 64rem) / 2 + 40px))',
        }}
      >
        {NOTES.map((note, i) => (
          <Reveal key={note.from} delay={0.04 + i * 0.05} y={22} className="shrink-0 snap-start">
            <div className="w-[300px] sm:w-[340px] md:w-[368px]">
              <Envelope note={note} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
