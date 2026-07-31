import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export type LetterPhoto = { src: string; alt: string; caption: string }

type LetterNameProps = {
  text: string
  /** 与字母一一对应；null 表示该字母留白（不出照片） */
  photos: (LetterPhoto | null)[]
  className?: string
  baseDelay?: number
}

/**
 * OLIVIA 字母交互 — 悬停/聚焦/点按有照片的字母，在字母附近浮现一张
 * 拍立得照片 + 手写注脚；照片跟随鼠标轻微移动，离开后柔和淡出。
 */
export function LetterName({ text, photos, className, baseDelay = 0 }: LetterNameProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const [drift, setDrift] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()
  const letters = text.split('')
  const active = pinned ?? hovered

  // 点击外部关闭固定照片
  useEffect(() => {
    if (pinned === null) return
    const close = () => setPinned(null)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(null)
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [pinned])

  return (
    <span
      className={`relative inline-flex select-none items-baseline ${className ?? ''}`}
      role="group"
      aria-label={`${text} — interactive letters, each reveals a personal photo`}
    >
      {letters.map((ch, i) => {
        const item = photos[i] ?? null
        const isActive = item !== null && active === i
        // 留白字母：普通字符，不参与交互
        if (!item) {
          return (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0, y: reduce ? 0 : '0.3em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          )
        }
        return (
          <span key={i} className="relative inline-block">
            <motion.button
              type="button"
              aria-label={`Letter ${ch} — reveal photo`}
              aria-expanded={isActive}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => {
                setHovered(null)
                setDrift({ x: 0, y: 0 })
              }}
              onMouseMove={(e) => {
                if (reduce) return
                const r = e.currentTarget.getBoundingClientRect()
                setDrift({
                  x: ((e.clientX - r.left) / r.width - 0.5) * 10,
                  y: ((e.clientY - r.top) / r.height - 0.5) * 6,
                })
              }}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation()
                setPinned(isActive && pinned === i ? null : i)
              }}
              className="inline-block cursor-pointer outline-none transition-colors duration-300 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-orchid/60"
              style={{
                color: isActive ? (i % 2 === 0 ? '#D193A8' : '#B98ACB') : undefined,
              }}
              initial={{ opacity: 0, y: reduce ? 0 : '0.3em' }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: isActive && !reduce ? -3 : 0,
                scale: isActive && !reduce ? 1.05 : 1,
              }}
              transition={{
                opacity: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.7, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 0.3, ease: 'easeOut' },
                scale: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.span
                  key={`photo-${i}`}
                  className="absolute bottom-full z-40 mb-3 block w-[118px] md:mb-4 md:w-[140px] left-1/2 -translate-x-1/2 md:-left-3 md:translate-x-[-30%]"
                  initial={{ opacity: 0, scale: 0.82, y: 14, rotate: i % 2 === 0 ? -6 : 6 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: drift.y,
                    x: drift.x,
                    rotate: i % 2 === 0 ? -3 : 3,
                  }}
                  exit={{ opacity: 0, scale: 0.88, y: 10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <span className="block bg-white p-1.5 pb-2 shadow-[0_20px_44px_-14px_rgba(90,63,86,0.45)]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      draggable={false}
                      className="w-full object-cover"
                      style={{ aspectRatio: '4/5' }}
                    />
                    <span className="mt-1.5 flex items-start justify-between gap-2 px-0.5">
                      <span className="block font-hand text-[14px] leading-tight text-plum-muted">
                        {item.caption}
                      </span>
                      <button
                        type="button"
                        aria-label="Close photo"
                        onClick={() => setPinned(null)}
                        className="mt-0.5 shrink-0 font-sans text-[13px] leading-none text-plum-faint transition-colors hover:text-plum md:hidden"
                      >
                        ✕
                      </button>
                    </span>
                  </span>
                  {/* 拍立得下的小尖角 */}
                  <span className="mx-auto block h-2.5 w-2.5 -translate-y-[1px] rotate-45 bg-white shadow-[3px_3px_6px_-2px_rgba(90,63,86,0.2)]" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )
      })}
    </span>
  )
}
