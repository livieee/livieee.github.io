import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** 入场示范：字母短暂变色 + 半张拍立得探出收回（纯 CSS 动画，一次性） */
const DEMO_LETTER = 3
const DEMO_CSS = `
@keyframes letter-demo-lit {
  0%, 22%, 62%, 100% { color: inherit; transform: none; }
  34%, 52% { color: #B98ACB; transform: rotate(-3deg) scale(1.05); }
}
@keyframes letter-demo-peek {
  0%, 26%, 64%, 100% { opacity: 0; transform: translate(-22%, 34px) scale(0.78) rotate(6deg); }
  36%, 54% { opacity: 1; transform: translate(-22%, 10px) scale(0.86) rotate(3deg); }
}
.letter-demo-btn { animation: letter-demo-lit 2.7s ease-in-out 1 both; }
.letter-demo-photo { animation: letter-demo-peek 2.7s ease-in-out 1 both; }
@media (prefers-reduced-motion: reduce) {
  .letter-demo-btn, .letter-demo-photo { animation: none; display: none; }
}
`

export type LetterPhoto = { src: string; alt: string; caption: string }

type LetterNameProps = {
  text: string
  photos: LetterPhoto[]
  className?: string
  baseDelay?: number
  /** 用户首次与任意字母交互（hover/focus/tap）时触发一次 */
  onFirstInteract?: () => void
}

/**
 * OLIVIA 字母交互 — 悬停/聚焦/点按每个字母，在字母附近浮现一张
 * 拍立得照片 + 手写注脚。入场时先做一次「示范」：字母短暂变色、
 * 半张拍立得探出又收回，暗示可交互，无需提示文字。
 */
export function LetterName({ text, photos, className, baseDelay = 0, onFirstInteract }: LetterNameProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const letters = text.split('')
  const active = pinned ?? hovered
  const interactedRef = useRef(false)
  const firstInteract = () => {
    if (!interactedRef.current) {
      interactedRef.current = true
      onFirstInteract?.()
    }
  }

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
      <style>{DEMO_CSS}</style>
      {letters.map((ch, i) => {
        const item = photos[i % photos.length]
        const isActive = active === i
        const isDemoLetter = i === DEMO_LETTER
        return (
          <span key={i} className="relative inline-block">
            {isDemoLetter && !reduce && (
              <span
                aria-hidden
                className="letter-demo-photo pointer-events-none absolute bottom-full z-40 mb-3 block w-[110px] opacity-0 md:mb-5 md:w-[140px] left-1/2 -translate-x-1/2 md:left-0"
                style={{ animationDelay: `${baseDelay + 0.5}s` }}
              >
                <span className="block bg-white p-1.5 pb-2 shadow-[0_20px_44px_-14px_rgba(90,63,86,0.45)]">
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5' }}
                  />
                </span>
                <span className="mx-auto block h-2.5 w-2.5 -translate-y-[1px] rotate-45 bg-white shadow-[3px_3px_6px_-2px_rgba(90,63,86,0.2)]" />
              </span>
            )}
            <motion.button
              type="button"
              aria-label={`Letter ${ch} — reveal photo`}
              aria-expanded={isActive}
              onMouseEnter={() => {
                setHovered(i)
                firstInteract()
              }}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => {
                setHovered(i)
                firstInteract()
              }}
              onBlur={() => setHovered(null)}
              onClick={(e) => {
                e.stopPropagation()
                firstInteract()
                setPinned(isActive && pinned === i ? null : i)
              }}
              className={`inline-block cursor-pointer outline-none transition-colors duration-300 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-orchid/60 ${
                isDemoLetter && !reduce ? 'letter-demo-btn' : ''
              }`}
              style={{
                color: isActive ? (i % 2 === 0 ? '#D193A8' : '#B98ACB') : undefined,
                animationDelay: isDemoLetter && !reduce ? `${baseDelay + 0.5}s` : undefined,
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
              {ch === ' ' ? ' ' : ch}
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.span
                  key={`photo-${i}`}
                  className="absolute bottom-full z-40 mb-3 block w-[118px] md:mb-4 md:w-[140px] left-1/2 -translate-x-1/2 md:-left-3 md:translate-x-[-30%]"
                  initial={{ opacity: 0, scale: 0.82, y: 14, rotate: i % 2 === 0 ? -6 : 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
                  exit={{ opacity: 0, scale: 0.88, y: 10 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
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
