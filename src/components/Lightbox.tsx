import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * 放大查看：点缩略图 zoom 进全屏，左右滑动浏览同组图片。
 * item.link 存在时，图片下方给一个显眼的外链按钮（如「View on LinkedIn ↗」）。
 */
export type GalleryItem = {
  src: string
  alt: string
  cap?: string
  /** 外部出处链接 */
  link?: { href: string; label: string }
}

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const touchX = useRef<number | null>(null)
  const go = useCallback(
    (d: 1 | -1) => onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex],
  )
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  const cur = items[index]
  const many = items.length > 1

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <figure
        key={cur.src}
        className="flex max-h-full flex-col items-center"
        style={{ animation: 'lightbox-in .34s cubic-bezier(.2,.8,.25,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cur.src}
          alt={cur.alt}
          className="max-h-[74vh] max-w-[92vw] rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
        />
        {cur.cap && (
          <figcaption className="mt-4 max-w-[70ch] text-center text-[13px] text-white/75">{cur.cap}</figcaption>
        )}
        {cur.link && (
          <a
            href={cur.link.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-plum shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0A66C2]" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
            </svg>
            {cur.link.label}
            <span aria-hidden>↗</span>
          </a>
        )}
      </figure>

      {many && (
        <>
          {[
            { d: -1 as const, cls: 'left-3 md:left-8', g: '←', label: 'Previous' },
            { d: 1 as const, cls: 'right-3 md:right-8', g: '→', label: 'Next' },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={(e) => {
                e.stopPropagation()
                go(b.d)
              }}
              className={`absolute ${b.cls} top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-white/30`}
            >
              {b.g}
            </button>
          ))}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-[15px] text-white/70">
            {index + 1} / {items.length} · swipe or ← →
          </span>
        </>
      )}

      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        ×
      </button>
    </div>,
    document.body,
  )
}
