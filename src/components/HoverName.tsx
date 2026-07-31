import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

export type NamePhoto = { src: string; alt: string }

type HoverNameProps = {
  text: string
  photos: NamePhoto[]
  className?: string
  /** 每个字母进场延迟基准 */
  baseDelay?: number
}

/**
 * 大号排版名字 — 悬停/点按任意字母弹出一张照片（danielsun.space 式交互）。
 * 照片按字母位置循环分配，选中字母微微倾斜放大。
 */
export function HoverName({ text, photos, className, baseDelay = 0 }: HoverNameProps) {
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const letters = text.split('')

  return (
    <span className={`relative inline-flex select-none items-baseline ${className ?? ''}`} role="text" aria-label={text}>
      {letters.map((ch, i) => {
        const photo = photos[i % photos.length]
        const isActive = active === i
        return (
          <span
            key={i}
            className="relative inline-block"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(isActive ? null : i)}
            data-hover
          >
            <motion.span
              className="inline-block cursor-pointer transition-colors duration-300"
              style={{ color: isActive ? '#B98ACB' : undefined }}
              initial={{ opacity: 0, y: reduce ? 0 : '0.35em' }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: isActive && !reduce ? -4 : 0,
                scale: isActive && !reduce ? 1.06 : 1,
              }}
              transition={{
                opacity: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 0.35, ease: 'easeOut' },
                scale: { duration: 0.35, ease: 'easeOut' },
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>

            <AnimatePresence>
              {isActive && (
                <motion.span
                  key={`photo-${i}`}
                  className="pointer-events-none absolute left-1/2 top-0 z-30 block w-[130px] -translate-x-1/2 md:w-[170px]"
                  style={{ y: '-92%' }}
                  initial={{ opacity: 0, scale: 0.72, rotate: i % 2 === 0 ? -7 : 7 }}
                  animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -4 : 4 }}
                  exit={{ opacity: 0, scale: 0.78, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full rounded-xl border-4 border-white object-cover shadow-soft"
                    style={{ aspectRatio: '3/4' }}
                    draggable={false}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )
      })}
    </span>
  )
}
