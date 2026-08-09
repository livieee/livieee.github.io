import { motion, useReducedMotion } from 'motion/react'

/**
 * 随滚动逐词点亮的段落，外加一层逐词入场。
 *
 * 两层动效各管一件事：
 * - **入场**（一次性）：每个词上浮 + 淡入 + 去模糊，错开 60ms。滚过去的人
 *   眼睛抓的是位移，只做颜色变化几乎无感 —— 这是实测反馈出来的：点亮明明
 *   在跑（Chromium 与 WebKit 都验过 0→5→11→13 词），但看着"没有动态"。
 * - **点亮**（跟随滚动）：把读者的滚动进度绑到阅读节奏上，滑多少亮多少。
 *   参考 Sentinel 那种下滑手感。
 *
 * 分两层套：外层 .lit-word 管颜色（滚动驱动），内层 motion.span 管位移与
 * 模糊（一次性）。挂在同一个元素上会互相覆盖 —— filter 会让子元素自成
 * 渲染上下文，但 color 照常继承，所以这个套法是安全的。
 *
 * 实现要点：
 * - 命名 view timeline 挂在段落上（view-timeline-name），每个词通过
 *   animation-timeline 引用它。不能让每个词各用自己的 view()：那样每个词
 *   看的是自己的可见度，同一行的词会一起亮，变成"一行一行跳"而不是逐词流过。
 * - 每个词用 animation-range 错开一小段区间，形成先后。
 * - 基线状态就是「已点亮」，动画只做增强；不支持 animation-timeline 的
 *   浏览器只是没有这一层，一个字都不会丢。
 */
export function ScrollLit({
  text,
  className = '',
  /** 点亮过程占滚动区间的起止（相对 cover 的百分比） */
  from = 12,
  to = 62,
  /** 逐词入场的整体延迟（秒） */
  delay = 0,
}: {
  text: string
  className?: string
  from?: number
  to?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)
  const span = (to - from) / Math.max(1, words.length)

  return (
    <p className={`lit-para ${className}`} aria-label={text}>
      {words.map((w, i) => {
        const start = from + i * span
        return (
          <span
            key={`${w}-${i}`}
            className="lit-word"
            aria-hidden
            // 每个词晚一点开始，且各自只用一小段区间点亮 —— 重叠一点更连贯
            style={{ ['--lit-range' as string]: `cover ${start.toFixed(2)}% cover ${(start + span * 2.2).toFixed(2)}%` }}
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: reduce ? 0 : '0.6em', filter: reduce ? 'none' : 'blur(7px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.75, delay: delay + (reduce ? 0 : i * 0.06), ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>{' '}
          </span>
        )
      })}
    </p>
  )
}
