import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const target = e.target as HTMLElement
      const label = target.closest('[data-cursor]')?.getAttribute('data-cursor') ?? ''
      const interactive = target.closest('a, button, [data-hover]')
      const inWand = !!target.closest('[data-wand]')
      dot.classList.toggle('is-wand', inWand)
      ring.classList.toggle('is-wand', inWand)
      ring.classList.toggle('has-label', !!label)
      ring.classList.toggle('is-hover', !label && !!interactive)
      const labelEl = ring.querySelector('.cursor-label')
      if (labelEl && labelEl.textContent !== label) labelEl.textContent = label
    }

    const loop = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  if (reduce) return null
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span className="cursor-label" />
      </div>
    </>
  )
}
