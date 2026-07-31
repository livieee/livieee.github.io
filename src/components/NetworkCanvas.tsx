import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const PALETTE = ['#B98ACB', '#D193A8', '#C9A8D4', '#DECDA6']

/**
 * Soft constellation — drifting points connected by faint lines.
 * Elegant, abstract, "connection" metaphor. Respects reduced motion.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number }
    let points: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.max(14, Math.min(42, Math.floor((w * h) / 26000)))
      points = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.2 + Math.random() * 2.2,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        a: 0.35 + Math.random() * 0.45,
      }))
    }

    const LINK = 130

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of points) {
        // gentle attraction toward mouse, soft repulsion when too close
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 160 && d > 40) {
          p.vx += (dx / d) * 0.008
          p.vy += (dy / d) * 0.008
        } else if (d <= 40 && d > 0) {
          p.vx -= (dx / d) * 0.02
          p.vy -= (dy / d) * 0.02
        }
        p.vx = Math.max(-0.4, Math.min(0.4, p.vx))
        p.vy = Math.max(-0.4, Math.min(0.4, p.vy))
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(185, 138, 203, ${(1 - d / LINK) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const p of points) {
        ctx.globalAlpha = p.a
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      draw()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      draw() // static single frame
    } else {
      raf = requestAnimationFrame(tick)
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
