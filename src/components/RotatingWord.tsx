import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval, reduce])

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ minWidth: '5.2em', height: '1.14em', verticalAlign: 'bottom' }}
    >
      <motion.span
        key={i}
        className="gradient-text absolute left-0 top-0 inline-block whitespace-nowrap"
        initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {words[i]}
      </motion.span>
    </span>
  )
}
