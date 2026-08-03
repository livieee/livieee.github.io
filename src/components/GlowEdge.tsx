import { useEffect, useRef } from 'react'
import './BorderGlow.css'

/**
 * BorderGlow 的轮廓版变体：只画「朝向光标的一段渐变描边 + 内侧柔光」，
 * 用透明环遮罩实现，可以压在任意渐变背景的面板上。
 * 用法：塞进任何 position:relative 且带圆角的容器即可，事件挂在父元素上。
 */
export function GlowEdge() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = x - cx
      const dy = y - cy
      let kx = Infinity
      let ky = Infinity
      if (dx !== 0) kx = cx / Math.abs(dx)
      if (dy !== 0) ky = cy / Math.abs(dy)
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      if (deg < 0) deg += 360
      el.style.setProperty('--edge-proximity', (edge * 100).toFixed(2))
      el.style.setProperty('--cursor-angle', `${deg.toFixed(2)}deg`)
    }
    const onLeave = () => {
      el.style.setProperty('--edge-proximity', '0')
    }
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)
    return () => {
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <span ref={ref} aria-hidden className="glow-edge" />
}
