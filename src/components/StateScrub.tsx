import { useEffect, useRef, useState } from 'react'

/**
 * 滚动擦洗背景 —— 借 NovaAI 那套 scroll-scrub 的做法，但不用视频。
 *
 * 素材是展会现场真实产出的六个状态图。页面往下滚，背景就从 tense 一路
 * 走到 calm：滚动进度本身成了「一个人情绪变化」的时间轴，跟这一页在讲的
 * 事情是同一件事。
 *
 * 实现要点（对齐原方案）：
 * - progress = scrollY / (scrollHeight - innerHeight)，钳在 0–1
 * - 每帧 lerp 0.12 平滑，避免滚轮的离散跳变
 * - 只改 opacity/transform，不触发 layout
 * - prefers-reduced-motion 时直接停在第一帧
 */

/* 顺序不是随手排的：从紫（tired）起手接住页面原本的星云色，
   中段走过暖橙与黄绿的高唤醒，最后落到青（calm）——
   往下读一遍，背景刚好走完一次「从纷乱到平静」。 */
const FRAMES = [
  { src: '/ieee/st-violet.jpg', k: 'tired' },
  { src: '/ieee/st-warm.jpg', k: 'tense' },
  { src: '/ieee/st-yellow.jpg', k: 'restless' },
  { src: '/ieee/st-green.jpg', k: 'excited' },
  { src: '/ieee/st-blue.jpg', k: 'alert' },
  { src: '/ieee/st-cyan.jpg', k: 'calm' },
]

export function StateScrub() {
  const layerRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState(FRAMES[0].k)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const layer = layerRef.current
    if (!layer) return

    const imgs = Array.from(layer.querySelectorAll<HTMLElement>('[data-frame]'))
    const n = FRAMES.length - 1
    let target = 0
    let smooth = 0
    let raf = 0
    let lastLabel = -1

    const paint = (p: number) => {
      const pos = p * n
      imgs.forEach((el, i) => {
        // 相邻两帧交叉淡入，距离超过 1 就完全透明
        const o = Math.max(0, 1 - Math.abs(pos - i))
        el.style.opacity = String(o)
        el.style.transform = `scale(${1.06 - o * 0.04})`
      })
      const near = Math.round(pos)
      if (near !== lastLabel) {
        lastLabel = near
        setLabel(FRAMES[near].k)
      }
    }

    if (reduced) {
      paint(0)
      return
    }

    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    const tick = () => {
      smooth += (target - smooth) * 0.12
      paint(smooth)
      raf = requestAnimationFrame(tick)
    }

    read()
    smooth = target
    tick()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  return (
    <>
      <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {FRAMES.map((f) => (
          <img
            key={f.src}
            data-frame
            src={f.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-[opacity,transform]"
            style={{ filter: 'blur(38px) saturate(1.7) brightness(0.82)' }}
          />
        ))}
        {/* 压暗 + 中心留白，保证正文始终可读 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 38%, rgba(13,16,32,0.58) 0%, rgba(13,16,32,0.82) 52%, rgba(13,16,32,0.95) 100%)',
          }}
        />
      </div>

      {/* 当前状态读数：像展台上的仪表，同时告诉用户背景是有含义的 */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-6 right-6 z-20 hidden items-center gap-2 md:flex"
      >
        <span className="accent-badge">
          state
          <span className="tracking-[0.06em] text-[#CBB8F5]">{label}</span>
        </span>
      </div>
    </>
  )
}
