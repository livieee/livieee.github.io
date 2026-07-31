import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { AuroraCanvas } from '@/components/AuroraCanvas'
import { LetterName, type LetterPhoto } from '@/components/LetterName'
import { PortraitCard } from '@/components/PortraitCard'

/** 字母照片：O-L-I-V-I-A 一字一故事（不与右侧主卡照片重复） */
const LETTER_PHOTOS: (LetterPhoto | null)[] = [
  {
    src: '/images/photo-overview.jpg',
    alt: 'A handwritten checklist of what Olivia cares about',
    caption: 'what I care about ✦',
  },
  {
    src: '/images/photo-friends.jpg',
    alt: 'Sharing a rooftop dinner with friends',
    caption: 'share moments with friends',
  },
  {
    src: '/images/photo-portrait.jpg',
    alt: 'Olivia, a simple selfie',
    caption: "hi, that's me ✦",
  },
  {
    src: '/images/photo-graduation.jpg',
    alt: 'Graduation day at UBC in Vancouver',
    caption: 'Vancouver, where it began',
  },
  {
    src: '/images/photo-cmu-friends.jpg',
    alt: 'Olivia with friends at CMU graduation',
    caption: 'CMU days 🎓',
  },
  {
    src: '/images/photo-conference.jpg',
    alt: 'Olivia at a global AI technology conference',
    caption: 'AI conference days',
  },
]

/** 编辑级首屏入场编排（一次性、< 2s）：
 *  导航 → eyebrow → 标题逐行 → 支撑句 + CTA → 照片卡展开（轻微旋转落位）
 *  → Meet Olivia 手写描线 → 特质错落 → OLIVIA 浮起
 */
export function Hero() {
  const reduce = useReducedMotion()
  const [nameTouched, setNameTouched] = useState(false)
  const [hintGone, setHintGone] = useState(false)

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="top" className="grain relative overflow-hidden">
      {/* 珍珠极光：暖象牙底 + 腮红粉/浅紫弥散（降透明度提高文字对比） */}
      <AuroraCanvas className="absolute inset-0 h-full w-full opacity-[0.85]" />
      {/* 极淡网格线 */}
      <div
        aria-hidden
        className="paper-grid absolute inset-0 opacity-[0.35]"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-[1400px] flex-col justify-center px-6 py-20 md:px-10 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-[49fr_43fr] md:gap-[8%]">
          {/* 左栏 49% */}
          <div>
            <motion.p {...rise(0.15)} className="label-text flex items-center gap-3 whitespace-nowrap">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orchid" />
              <span className="text-[11px] tracking-[0.22em] md:text-[12px]">AI Product · Programs · Partnerships</span>
            </motion.p>

            <h1 className="mt-5 font-serif text-[clamp(2.1rem,4.1vw,3.5rem)] font-light leading-[1.09] tracking-[-0.015em] text-plum">
              <motion.span {...rise(0.3)} className="block">
                User Empathy
              </motion.span>
              <motion.span {...rise(0.42)} className="block italic">
                <span className="bg-[linear-gradient(100deg,#D193A8_0%,#B98ACB_34%,#9DB8E8_68%,#DECDA6_100%)] bg-clip-text text-transparent">
                  Meaningful Connection
                </span>
              </motion.span>
              <motion.span {...rise(0.54)} className="block">
                Ideas in Motion.
              </motion.span>
            </h1>

            {/* 工作路径小标语：标题之后、按钮之前，视觉权重低于按钮 */}
            <motion.p {...rise(0.7)} className="mt-4 font-hand text-[17px] text-plum-muted/90 md:text-[18px]">
              insight <span aria-hidden className="text-plum-faint">→</span> alignment{' '}
              <span aria-hidden className="text-plum-faint">→</span> momentum{' '}
              <span aria-hidden className="text-orchid">✦</span>
            </motion.p>

            {/* CTA */}
            <motion.div {...rise(0.88)} className="mt-7 flex flex-nowrap items-center gap-3">
              <a
                href="#impact"
                className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream shadow-[0_10px_24px_-10px_rgba(58,36,64,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
              >
                Explore My Work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="/Olivia_Xiao_Resume.pdf"
                download
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-plum/25 bg-white/60 px-6 py-3 text-sm font-medium text-plum backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid hover:bg-lavender/40"
              >
                Download Résumé
              </a>
            </motion.div>
            {/* 移动端卡片插在 CTA 与 OLIVIA 之间；桌面端隐藏（卡片在右栏） */}
            <motion.div {...rise(0.98)} className="mt-8 md:hidden">
              <PortraitCard animateArrows={!reduce} />
            </motion.div>

            {/* 交互签名：缩小 ~20%，按钮之下的个人签名而非第二标题 */}
            <div
              className="group/name relative mt-7 w-fit"
              onPointerEnter={() => {
                if (!nameTouched) {
                  setNameTouched(true)
                  window.setTimeout(() => setHintGone(true), 2400)
                }
              }}
            >
              {/* 首次进入时短暂显示一次的手写提示 */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-7 left-2 rotate-[-3deg] whitespace-nowrap font-hand text-[15px] text-orchid transition-opacity duration-700 ${
                  nameTouched && !hintGone ? 'opacity-100' : 'opacity-0'
                }`}
              >
                a little story in every letter ✦
              </span>
              <h2 className="sr-only">Olivia</h2>
              <div aria-hidden className="leading-none" data-cursor="DISCOVER">
                <LetterName
                  text="OLIVIA"
                  photos={LETTER_PHOTOS}
                  baseDelay={1.35}
                  className="font-serif text-[clamp(3.1rem,8.8vw,8.2rem)] font-medium tracking-[-0.03em] text-plum"
                />
              </div>
            </div>

            {/* LinkedIn · Email：移动端在 OLIVIA 之后，桌面端紧随 CTA */}
            <motion.div {...rise(0.98)} className="mt-5 flex items-center gap-5 text-sm text-plum-muted md:mt-4">
              <a
                href="https://linkedin.com/in/olivia-zerun-xiao/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-rose-soft decoration-2 underline-offset-4 transition-colors hover:text-plum"
              >
                LinkedIn
              </a>
              <a
                href="mailto:olivia.zxiao@gmail.com"
                className="underline decoration-lavender-deep decoration-2 underline-offset-4 transition-colors hover:text-plum"
              >
                Email
              </a>
            </motion.div>
          </div>

          {/* 右栏 44%：Meet Olivia 翻转卡（移动端插在左栏 CTA 之后） */}
          <div className="hidden md:block">
            <PortraitCard animateArrows={!reduce} />
          </div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-label text-plum-faint"
        >
          <span className="h-10 w-px bg-gradient-to-b from-orchid to-transparent" />
          Scroll
        </motion.a>
      </div>
    </section>
  )
}
