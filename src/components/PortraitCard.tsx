import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Trait = {
  /** 正面关键词（小写手写体） */
  word: string
  side: 'left' | 'right'
  color: string
  /** 背面编号区的内容 */
  num: string
  heading: string
  keyword: string
  sentence: string
  /** 补充小字（如地域范围） */
  extra?: string
}

const traits: Trait[] = [
  {
    word: 'customer-centric',
    side: 'left',
    color: '#D193A8',
    num: '01',
    heading: 'Notice what matters',
    keyword: 'customer-centric',
    sentence: 'listen for the need behind the request',
  },
  {
    word: 'connector',
    side: 'right',
    color: '#B98ACB',
    num: '02',
    heading: 'Connect the dots',
    keyword: 'connector',
    sentence: 'bring people, products & possibilities together',
  },
  {
    word: 'builder',
    side: 'left',
    color: '#8FAE8B',
    num: '03',
    heading: 'Create the path forward',
    keyword: 'builder',
    sentence: 'products, programs & practical next steps',
  },
  {
    word: 'cross-cultural',
    side: 'right',
    color: '#C79A4B',
    num: '04',
    heading: 'Adapt across contexts',
    keyword: 'cross-cultural',
    sentence: 'work across cultures, disciplines & contexts',
    extra: '🇨🇳 China · 🇨🇦 Canada · 🇺🇸 United States',
  },
]

function SketchArrow({
  side,
  active,
  animate,
  delay,
  color,
}: {
  side: 'left' | 'right'
  active: boolean
  animate: boolean
  delay: number
  color: string
}) {
  return (
    <svg
      viewBox="0 0 44 22"
      className={`h-[13px] w-[24px] overflow-visible transition-colors duration-300 sm:h-[15px] sm:w-[28px] lg:h-[17px] lg:w-[32px] ${
        side === 'right' ? '-scale-x-100' : ''
      }`}
      style={{ color: active ? color : `${color}99` }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 19 C 15 21, 28 15, 40 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={animate ? undefined : 0}
        style={animate ? { animation: `arrow-draw 0.5s ease-out ${delay}s both` } : undefined}
      />
      <path
        d="M40 4 l-8.5 1.2 M40 4 l-3.2 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={animate ? undefined : 0}
        style={animate ? { animation: `arrow-draw 0.3s ease-out ${delay + 0.32}s both` } : undefined}
      />
    </svg>
  )
}

const FLIP_CSS = `
.flip-scene { perspective: 1400px; }
.flip-group {
  transform-style: preserve-3d;
  transition-property: transform !important;
  transition-duration: 650ms !important;
  transition-timing-function: cubic-bezier(0.32, 0.72, 0.35, 1) !important;
}
.flip-inner { transform-style: preserve-3d; }
.flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.flip-back { transform: rotateY(180deg); }
.flip-front { transform: rotateY(0deg); }
.flip-group.is-flipped { transform: rotateY(180deg) !important; }
@media (prefers-reduced-motion: reduce) {
  .flip-group { transition: none !important; }
}
`

export function PortraitCard({ animateArrows = true }: { animateArrows?: boolean }) {
  const [active, setActive] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const reduce = useReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  // 兜底清理：入场动画（0.55s 延迟 + 0.7s）结束后把 scene 的 transform 冻结为
  // rotate(2deg)（而不是删除），避免某些渲染环境在删除 inline transform 后
  // 丢失合成层、导致子元素 3D transform 不生效
  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const timer = window.setTimeout(() => {
      el.style.transform = 'rotate(2deg)'
    }, 1450)
    return () => window.clearTimeout(timer)
  }, [])

  // hover：卡片轻微上浮并旋转至水平；离开恢复 2° 倾斜
  useEffect(() => {
    const el = sceneRef.current
    if (!el || reduce) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = hovering ? 'rotate(0deg) translateY(-6px)' : 'rotate(2deg)'
  }, [hovering, reduce])

  const flip = () => {
    setTilt({ rx: 0, ry: 0 })
    setFlipped((f) => !f)
  }

  // 1–2° 轻微光标跟随倾斜，翻转时禁用；同时追踪光标位置驱动 flip me 标签
  const onTiltMove = (e: React.PointerEvent) => {
    const el = sceneRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (e.pointerType !== 'touch') {
      setCursor({ x: e.clientX - r.left, y: e.clientY - r.top })
      setHovering(true)
    }
    if (reduce || flipped || e.pointerType === 'touch') return
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 3, ry: px * 3 })
  }
  const onTiltLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setHovering(false)
  }

  // motion 入场动画会覆写 inline transform——动画结束后冻结为 rotate(2deg)
  const clearInlineTransform = () => {
    const el = sceneRef.current
    if (!el) return
    window.setTimeout(() => {
      el.style.transform = 'rotate(2deg)'
    }, 50)
  }

  const frontNote = (t: Trait, i: number) => {
    const isActive = i === active
    const enter = { delay: 1.05 + i * 0.13, duration: 0.45 }
    return (
      <motion.div
        key={t.word}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter}
        onMouseEnter={() => setActive(i)}
        onMouseLeave={() => setActive(null)}
        className={`cursor-default ${t.side === 'left' ? 'text-right' : 'text-left'}`}
      >
        <p
          className="whitespace-nowrap font-hand text-[18px] font-semibold leading-tight transition-colors duration-300 sm:text-[19px] xl:text-[22px]"
          style={{ color: t.color, opacity: isActive ? 1 : 0.92 }}
        >
          {t.word}
        </p>
        <div className={`mt-1 flex ${t.side === 'left' ? 'justify-end' : 'justify-start'}`}>
          <SketchArrow side={t.side} active={isActive} animate={animateArrows} delay={enter.delay + 0.25} color={t.color} />
        </div>
      </motion.div>
    )
  }

  // 光标跟随的 flip 提示：鼠标 hover 时贴在光标右上方；键盘聚焦时退到卡片顶角
  const followLabel = (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 rotate-[4deg] whitespace-nowrap rounded-md border border-dashed border-orchid/60 bg-white px-2.5 py-1 font-hand text-[15px] text-plum shadow-[0_10px_24px_-8px_rgba(90,63,86,0.4)] transition-opacity duration-200 ${
        hovering ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: cursor.x,
        top: cursor.y,
        transform: 'translate(14px, -140%) rotate(4deg)',
      }}
    >
      {flipped ? 'back to Olivia ↩' : 'flip me ↗'}
    </span>
  )
  // 键盘 / 触屏：无光标可跟，聚焦或点按时固定在卡片顶角
  const cornerLabel = (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-4 right-4 z-20 rotate-[4deg] whitespace-nowrap rounded-md border border-dashed border-orchid/60 bg-white px-2.5 py-1 font-hand text-[15px] text-plum shadow-[0_10px_24px_-8px_rgba(90,63,86,0.4)] transition-opacity duration-300 md:hidden ${
        hovering ? 'opacity-0' : ''
      } opacity-0 group-focus-visible/card:opacity-100 [@media(hover:none)]:opacity-100`}
    >
      {flipped ? 'back to Olivia ↩' : 'Tap to flip'}
    </span>
  )
  const flipLabel = (
    <>
      {followLabel}
      {cornerLabel}
    </>
  )

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, rotate: 5 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 2 }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={clearInlineTransform}
      className="flip-scene relative"
      ref={sceneRef}
      onPointerMove={onTiltMove}
      onPointerLeave={onTiltLeave}
    >
      <style>{FLIP_CSS}</style>
      {/* hover 时的柔和粉紫光晕 */}
      <div
        aria-hidden
        className={`absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-rose/35 via-orchid/30 to-lavender-deep/35 blur-2xl transition-opacity duration-700 ${
          hovering && !flipped ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? 'How I Work card — activate to flip back to portrait' : 'Meet Olivia card — activate to flip and see how I work'}
        onClick={flip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            flip()
          }
        }}
        className={`flip-group group/card relative cursor-pointer outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-orchid/60 ${
          !reduce && flipped ? 'is-flipped' : ''
        }`}
        style={{
          transform:
            reduce || flipped ? undefined : `rotateY(${tilt.ry}deg) rotateX(${tilt.rx}deg)`,
        }}
      >
        <div className="flip-inner relative">
          {/* ============ 正面 WHO I AM ============ */}
          <div
            aria-hidden={flipped}
            className={`flip-face flip-front relative rounded-2xl border border-white/70 paper-grid p-4 shadow-[0_44px_96px_-34px_rgba(90,63,86,0.6)] transition-opacity duration-500 sm:p-6 ${
              reduce && flipped ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <span className="absolute -top-3 left-6 rotate-[-5deg] rounded-md bg-orchid px-2.5 py-0.5 font-hand text-[16px] font-semibold text-white shadow">
              that's me ↘
            </span>
            <span className="absolute -top-3 right-4 rotate-[6deg] rounded-md border border-dashed border-rose/60 bg-white/90 px-2 py-0.5 font-hand text-[14px] text-plum shadow lg:-right-2 lg:top-8 lg:rotate-[8deg]">
              open to conversations ✦
            </span>

            <div className="mt-1 flex items-center justify-center gap-3 text-center">
              <svg viewBox="0 0 40 20" className="h-4 w-8 text-rose" fill="none" aria-hidden="true">
                <path
                  d="M2 10 q8 -8 16 0 q8 8 16 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={animateArrows ? undefined : 0}
                  style={animateArrows ? { animation: 'arrow-draw 0.6s ease-out 0.85s both' } : undefined}
                />
              </svg>
              <span className="font-hand text-[28px] font-semibold text-plum sm:text-[34px]">
                Meet Olivia ✦
              </span>
              <svg viewBox="0 0 40 20" className="h-4 w-8 -scale-x-100 text-rose" fill="none" aria-hidden="true">
                <path
                  d="M2 10 q8 -8 16 0 q8 8 16 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={animateArrows ? undefined : 0}
                  style={animateArrows ? { animation: 'arrow-draw 0.6s ease-out 0.95s both' } : undefined}
                />
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-1 sm:gap-2">
              <div className="flex flex-col justify-around py-6 pr-0.5 sm:py-8 sm:pr-1">
                {traits.filter((t) => t.side === 'left').map((t) => frontNote(t, traits.indexOf(t)))}
              </div>
              <div className="relative w-[240px] overflow-hidden rounded-xl sm:w-[260px] lg:w-[300px] xl:w-[330px]">
                <img
                  src="/images/photo-gallery-hero.jpg"
                  alt="Olivia (Zerun) Xiao holding a red book at the museum"
                  className="aspect-[3/4] w-full -rotate-1 rounded-xl object-cover shadow-[0_18px_40px_-16px_rgba(90,63,86,0.45)] transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-around py-6 pl-0.5 sm:py-8 sm:pl-1">
                {traits.filter((t) => t.side === 'right').map((t) => frontNote(t, traits.indexOf(t)))}
              </div>
            </div>

            <p className="mt-4 pb-3 text-center font-hand text-[16px] text-plum-muted sm:text-[18px]">
              curious about people & possibilities
            </p>
            {!flipped && flipLabel}
          </div>

          {/* ============ 背面 HOW I WORK ============ */}
          <div
            aria-hidden={!flipped}
            inert={!flipped ? true : undefined}
            className={`flip-face flip-back absolute inset-0 flex flex-col rounded-2xl border border-white/70 p-5 shadow-[0_44px_96px_-34px_rgba(90,63,86,0.6)] transition-opacity duration-500 sm:p-7 ${
              reduce && !flipped ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
            style={{
              background: 'linear-gradient(135deg, #F7E4EC 0%, #F2E9F8 52%, #EBE2F6 100%)',
            }}
          >
            <p className="text-center font-hand text-[26px] font-semibold text-plum sm:text-[28px] lg:text-[31px]">
              How I Work ✦
            </p>

            <div className="mt-3 flex flex-1 flex-col justify-around divide-y divide-plum/[0.07]">
              {traits.map((t) => (
                <div key={t.num} className="flex items-baseline gap-3 py-2.5 sm:py-3">
                  <span className="w-7 shrink-0 font-hand text-[18px] font-semibold sm:text-[20px]" style={{ color: t.color }}>
                    {t.num}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="font-hand text-[18px] font-semibold leading-tight text-plum sm:text-[20px] lg:text-[21px]">
                        {t.heading}
                      </span>
                      <span className="font-hand text-[15px] leading-tight sm:text-[16px] lg:text-[17px]" style={{ color: t.color }}>
                        {t.keyword}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-plum-muted sm:text-[13.5px] lg:text-[14.5px]">
                      {t.sentence}
                    </p>
                    {t.extra && (
                      <p className="mt-0.5 text-[12px] tracking-wide text-plum-faint sm:text-[12.5px]">{t.extra}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {flipped && flipLabel}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
