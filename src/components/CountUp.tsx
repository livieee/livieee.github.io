import { useInView } from 'motion/react'
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

/** 进入视口时做一次性 count-up（约 0.9s，克制缓动），只播一次。 */
export function CountUp({ prefix = '', value, suffix = '', className, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const target = Math.abs(value)
    let raf = 0
    let start: number | null = null
    const dur = 900 + delay * 1000
    const begin = performance.now()
    const tick = (now: number) => {
      if (start === null) start = begin + delay * 1000
      const p = Math.min(Math.max((now - start) / 900, 0), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(target * eased))
      if (p < 1 && now - begin < dur + 500) raf = requestAnimationFrame(tick)
      else setDisplay(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
