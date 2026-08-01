import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  /** 最大倾斜角度（度） */
  max?: number
  /** hover 时的粉紫光晕 */
  glow?: boolean
}

/**
 * 指针跟随 3D 倾斜卡片 — 与 Hero 的 Meet Olivia 卡同一交互语言：
 * 光标划过时轻微 rotateX/rotateY，hover 亮起柔和粉紫光晕。
 */
export function TiltCard({ children, className, max = 3.5, glow = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div
      ref={ref}
      className={`relative [perspective:1200px] ${className ?? ''}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === 'touch') return
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        setTilt({ rx: -py * max, ry: px * max })
        setHover(true)
      }}
      onPointerLeave={() => {
        setTilt({ rx: 0, ry: 0 })
        setHover(false)
      }}
    >
      {glow && (
        <div
          aria-hidden
          className={`absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-rose/25 via-orchid/20 to-lavender-deep/25 blur-2xl transition-opacity duration-500 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div
        className="h-full transition-transform duration-300 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {children}
      </div>
    </div>
  )
}
