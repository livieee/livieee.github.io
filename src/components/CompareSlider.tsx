import { useRef, useState } from 'react'

type CompareSliderProps = {
  /** 左侧（Without）图片 */
  before: string
  /** 右侧（With）图片 */
  after: string
  beforeLabel?: string
  afterLabel?: string
  alt: string
  /** 容器宽高比，如 '8/9' */
  aspect?: string
}

/**
 * 拖动对比滑块：底层是 after 图，before 图通过 clip-path 从左侧盖上，
 * 拖动中缝手柄（或直接在图上拖）改变分界位置。
 */
export function CompareSlider({
  before,
  after,
  beforeLabel = 'Without Theta',
  afterLabel = 'With Theta',
  alt,
  aspect = '8/9',
}: CompareSliderProps) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const updateFromClientX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.min(96, Math.max(4, p)))
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={`${alt} — drag to compare ${beforeLabel} and ${afterLabel}`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 6))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 6))
      }}
      onPointerDown={(e) => {
        setDragging(true)
        e.currentTarget.setPointerCapture(e.pointerId)
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className="group relative w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-[0_24px_56px_-28px_rgba(90,63,86,0.4)] outline-none focus-visible:ring-2 focus-visible:ring-orchid/60"
      style={{ aspectRatio: aspect }}
    >
      {/* 底层：With Theta */}
      <img src={after} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover object-top" />
      {/* 覆盖层：Without Theta，按 pos 裁切 */}
      <img
        src={before}
        alt={alt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* 分界线 + 手柄 */}
      <div aria-hidden className="absolute inset-y-0 z-10 w-[2.5px] bg-white shadow-[0_0_10px_rgba(58,36,64,0.35)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-plum/15 bg-white text-[13px] text-plum shadow-[0_10px_24px_-8px_rgba(58,36,64,0.45)] transition-transform duration-300 group-hover:scale-110">
          ⇄
        </span>
      </div>

      {/* 标签 */}
      <span aria-hidden className="absolute left-3 top-3 z-10 rounded-full bg-plum/75 px-3 py-1 font-hand text-[14px] text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span aria-hidden className="absolute right-3 top-3 z-10 rounded-full bg-orchid/85 px-3 py-1 font-hand text-[14px] text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  )
}
