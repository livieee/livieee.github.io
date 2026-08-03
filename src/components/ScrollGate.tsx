import { useEffect, useRef, useState } from 'react'

/**
 * 滚动穿越过渡（参考 dreamcore landing 的 fly-through）：
 *   CloudGate  —— 首屏之后：镜头拉进云层、云朵向两侧分开
 *   PortalGate —— 牌阵与工具星盘之间：金色法阵放大成传送门穿过去
 * 都是 sticky + 滚动进度驱动的纯 transform 动画。
 */

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const total = r.height - window.innerHeight
        if (total <= 0) return
        setP(Math.min(1, Math.max(0, -r.top / total)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])
  return p
}

/* ── 云层穿越：Hero → 作品区 ──────────────────────────────── */
const CLOUDS = [
  { x: -18, y: 18, size: 62, dx: -60, dy: 14, tint: 'rgba(248,191,211,0.55)', blur: 60 },
  { x: 62, y: 8, size: 70, dx: 58, dy: -10, tint: 'rgba(233,215,247,0.6)', blur: 70 },
  { x: 8, y: 58, size: 75, dx: -52, dy: 26, tint: 'rgba(255,255,255,0.75)', blur: 55 },
  { x: 58, y: 55, size: 80, dx: 62, dy: 22, tint: 'rgba(248,191,211,0.45)', blur: 75 },
  { x: 30, y: 30, size: 55, dx: 6, dy: -48, tint: 'rgba(255,249,243,0.8)', blur: 50 },
]

export function CloudGate() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  const ease = p * p * (3 - 2 * p) // smoothstep
  return (
    <div ref={ref} aria-hidden className="relative h-[150vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 底色：随进度淡出，露出下一节的米色 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-blush/40 via-cream-soft to-cream"
          style={{ opacity: 1 - ease }}
        />
        {/* 云朵：向四周分开 + 放大 */}
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.size}vmin`,
              height: `${c.size * 0.62}vmin`,
              background: `radial-gradient(ellipse at center, ${c.tint} 0%, transparent 68%)`,
              filter: `blur(${c.blur}px)`,
              transform: `translate(${ease * c.dx}vw, ${ease * c.dy}vh) scale(${1 + ease * 1.6})`,
              opacity: 1 - ease * 0.92,
            }}
          />
        ))}
        {/* 中央柔光：穿出瞬间最亮 */}
        <div
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,249,243,0.95) 0%, rgba(248,191,211,0.35) 45%, transparent 70%)',
            opacity: Math.sin(ease * Math.PI) * 0.85,
            transform: `translate(-50%, -50%) scale(${1 + ease * 2})`,
          }}
        />
        <p
          className="relative font-hand text-[19px] text-plum-muted"
          style={{ opacity: Math.max(0, 1 - ease * 2.6), transform: `scale(${1 + ease * 0.6})` }}
        >
          through the clouds, into the work ✦
        </p>
      </div>
    </div>
  )
}

/* ── 法阵传送门：牌阵 → 工具星盘 ────────────────────────────── */
function starPath(cx: number, cy: number, R: number, r: number) {
  let d = ''
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (i * Math.PI) / 5 - Math.PI / 2
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `
  }
  return d + 'Z'
}

export function PortalGate() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollProgress(ref)
  const ease = p * p * (3 - 2 * p)
  const G = '#C9A05C'
  return (
    <div ref={ref} aria-hidden className="relative h-[140vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 法阵环：放大穿过 */}
        <svg
          viewBox="0 0 200 200"
          className="w-[min(72vmin,560px)]"
          style={{
            transform: `scale(${1 + ease * 9}) rotate(${ease * 35}deg)`,
            opacity: ease < 0.72 ? 1 : Math.max(0, 1 - (ease - 0.72) / 0.28),
          }}
        >
          <circle cx="100" cy="100" r="96" fill="none" stroke={G} strokeOpacity="0.6" strokeWidth="0.9" />
          <circle cx="100" cy="100" r="90" fill="none" stroke={G} strokeOpacity="0.32" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="62" fill="none" stroke={G} strokeOpacity="0.4" strokeWidth="0.6" strokeDasharray="2 4" />
          <rect x="49" y="49" width="102" height="102" fill="none" stroke={G} strokeOpacity="0.35" strokeWidth="0.6" />
          <rect x="49" y="49" width="102" height="102" fill="none" stroke={G} strokeOpacity="0.35" strokeWidth="0.6" transform="rotate(45 100 100)" />
          <path d={starPath(100, 100, 30, 12)} fill="#E8B64C" fillOpacity="0.25" stroke="#C0913C" strokeWidth="0.7" />
        </svg>
        {/* 穿门金光 */}
        <div
          className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,243,216,0.95) 0%, rgba(232,182,76,0.3) 45%, transparent 72%)',
            opacity: Math.sin(ease * Math.PI) * 0.9,
            transform: `translate(-50%, -50%) scale(${0.6 + ease * 2.4})`,
          }}
        />
        {/* 向外飞散的星 */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 text-[#E8B64C]"
            style={{
              fontSize: 14,
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(${-40 - ease * 520}px)`,
              opacity: Math.max(0, Math.sin(ease * Math.PI) - 0.1),
            }}
          >
            ✦
          </span>
        ))}
        <p
          className="absolute bottom-[14%] font-hand text-[18px] text-plum-muted"
          style={{ opacity: Math.max(0, 1 - ease * 3) }}
        >
          step through the seal ✦
        </p>
      </div>
    </div>
  )
}
