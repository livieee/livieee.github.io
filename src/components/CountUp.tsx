import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  /** 静态前缀（符号），如 +、−、~ —— 全程显示 */
  prefix?: string
  /** 目标数值（非负，只滚绝对值） */
  value: number
  /** 后缀，如 %、+ */
  suffix?: string
  className?: string
  /** stagger 延迟（秒） */
  delay?: number
}

/**
 * 进入视口时做一次性 count-up，只播一次。
 *
 * 触发点故意压到视口下沿往上 30%：挂在下沿触发的话，指标条刚冒头就开始跑，
 * 等人把它滚到眼前 0.9s 早跑完了 —— 看到的永远是终值，像根本没动过。
 */
export function CountUp({ prefix = '', value, suffix = '', className, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -35% 0px' })
  const [display, setDisplay] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    const target = Math.abs(value)
    // 关掉动效的人直接给终值，不做滚动也不做上浮
    if (reduce) {
      setDisplay(target)
      return
    }
    let raf = 0
    let start: number | null = null
    const DUR = 1800
    const dur = DUR + delay * 1000
    const begin = performance.now()
    const tick = (now: number) => {
      if (start === null) start = begin + delay * 1000
      const p = Math.min(Math.max((now - start) / DUR, 0), 1)
      const eased = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(Math.round(target * eased))
      if (p < 1 && now - begin < dur + 500) raf = requestAnimationFrame(tick)
      else setDisplay(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, delay, reduce])

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-block',
        // 数字一边滚一边上浮落位：只滚数值的话，扫过去的人容易以为它本来就是终值
        opacity: inView || reduce ? 1 : 0,
        transform: inView || reduce ? 'none' : 'translateY(10px)',
        transition: reduce ? undefined : 'opacity 520ms ease-out, transform 640ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
