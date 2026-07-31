import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { AuroraCanvas } from '@/components/AuroraCanvas'
import { LetterName, type LetterPhoto } from '@/components/LetterName'
import { PortraitCard } from '@/components/PortraitCard'

/** 字母照片：个人故事，不是技能说明 */
const LETTER_PHOTOS: LetterPhoto[] = [
  {
    src: '/images/photo-conference.jpg',
    alt: 'Olivia at an AI conference, exploring emerging technology',
    caption: 'curious about what technology could become',
  },
  {
    src: '/images/photo-graduation.jpg',
    alt: 'Olivia with classmates on graduation day at UBC',
    caption: 'the people who make the journey worthwhile',
  },
  {
    src: '/images/photo-gallery.jpg',
    alt: 'Olivia spending a slow afternoon at the museum',
    caption: 'design, culture & slow museum afternoons',
  },
  {
    src: '/images/photo-cmu-graduation.jpg',
    alt: 'Olivia at her CMU graduation in the Bay Area',
    caption: 'new places, new contexts, new possibilities',
  },
  {
    src: '/images/photo-conference.jpg',
    alt: 'Olivia at a professional builder community event',
    caption: 'learning alongside builders and communities',
  },
  {
    src: '/images/photo-gallery-hero.jpg',
    alt: 'Olivia holding a red book, an everyday moment',
    caption: 'finding meaning in the small things',
  },
]

/** 编辑级首屏入场编排（一次性、< 2s）：
 *  导航 → eyebrow → 标题逐行 → 支撑句 + CTA → 照片卡展开（轻微旋转落位）
 *  → Meet Olivia 手写描线 → 特质错落 → OLIVIA 浮起
 */
export function Hero() {
  const reduce = useReducedMotion()
  const [nameTouched, setNameTouched] = useState(false)

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
      {/* 珍珠极光：暖象牙底 + 腮红粉/浅紫弥散 */}
      <AuroraCanvas className="absolute inset-0 h-full w-full" />
      {/* 极淡网格线 */}
      <div
        aria-hidden
        className="paper-grid absolute inset-0 opacity-[0.35]"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 78%)',
        }}
      />
      {/* 克制的星标点缀 */}
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <g fill="#D193A8" fillOpacity="0.35">
          <path d="M240,240 l3,7 7,3 -7,3 -3,7 -3,-7 -7,-3 7,-3 Z" />
          <path d="M1290,560 l2.4,5.6 5.6,2.4 -5.6,2.4 -2.4,5.6 -2.4,-5.6 -5.6,-2.4 5.6,-2.4 Z" />
        </g>
        <g fill="#B98ACB" fillOpacity="0.3">
          <path d="M860,170 l2.6,6.2 6.2,2.6 -6.2,2.6 -2.6,6.2 -2.6,-6.2 -6.2,-2.6 6.2,-2.6 Z" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 py-24 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[59fr_41fr] md:gap-8 lg:gap-10">
          {/* 左栏 56% */}
          <div>
            <motion.p {...rise(0.15)} className="label-text flex items-center gap-3 whitespace-nowrap">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orchid" />
              <span className="text-[11px] tracking-[0.22em] md:text-[12px]">AI Product · Partner Programs · Ecosystem</span>
            </motion.p>

            <h1 className="mt-5 font-serif text-[clamp(2.3rem,4.9vw,4rem)] font-light leading-[1.09] tracking-[-0.015em] text-plum">
              <motion.span {...rise(0.3)} className="block">
                AI Product.
              </motion.span>
              <motion.span {...rise(0.42)} className="block italic">
                <span className="bg-[linear-gradient(100deg,#D193A8_0%,#B98ACB_34%,#9DB8E8_68%,#DECDA6_100%)] bg-clip-text text-transparent">
                  Human Connection.
                </span>
              </motion.span>
              <motion.span {...rise(0.54)} className="block">
                Meaningful Growth.
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.72)}
              className="mt-5 max-w-[560px] text-base leading-relaxed text-plum-muted md:text-lg"
            >
              I help emerging AI products become easier to understand, adopt, and
              grow through thoughtful GTM and partnerships.
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

            {/* 交互名字：保持在首屏内，不抢标题 */}
            <div className="group/name relative mt-7 w-fit">
              {/* 极简提示：鼠标进入姓名区域即淡出 */}
              <motion.span
                {...rise(1.7)}
                aria-hidden
                className={`pointer-events-none absolute -top-5 right-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.22em] text-plum-faint/70 transition-opacity duration-500 group-hover/name:opacity-0 md:-right-6 ${
                  nameTouched ? 'opacity-0' : ''
                }`}
              >
                <span className="hidden md:inline">Hover ↗</span>
                <span className="md:hidden">Tap ↗</span>
                <svg viewBox="0 0 34 14" className="h-[10px] w-[22px] text-plum-faint/60" fill="none">
                  <path d="M2 11 C 10 12, 20 9, 30 3 M30 3 l-6 0.6 M30 3 l-1.8 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.span>
              <h2 className="sr-only">Olivia</h2>
              <div aria-hidden className="leading-none" data-cursor="DISCOVER">
                <LetterName
                  text="OLIVIA"
                  photos={LETTER_PHOTOS}
                  baseDelay={1.35}
                  onFirstInteract={() => setNameTouched(true)}
                  className="font-serif text-[clamp(3.9rem,11vw,10.2rem)] font-medium tracking-[-0.03em] text-plum"
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
