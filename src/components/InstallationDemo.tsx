import { useEffect, useRef, useState } from 'react'

/**
 * 展台装置的可运行复刻 —— 忠实还原 therapy-living-art-production.html 的界面：
 * 全屏生成艺术 + 左上标题 + 右下状态提示 + 右上 Explain 按钮，
 * Explain 面板从底部升起：五条频带胶囊（dB + 波形）与情绪雷达（arousal × valence）。
 *
 * 数据是本地模拟（真实系统由 Muse 2 经 LSL/WebSocket 推送），
 * 四个象限的频带偏移量沿用原实现里的取值。
 */

type Quad = 'FLOW' | 'EXCITED' | 'DISSIPATIVE' | 'OVERLOAD'

const QUAD_COLOR: Record<Quad, [number, number, number]> = {
  FLOW: [100, 220, 255],
  EXCITED: [255, 220, 100],
  DISSIPATIVE: [140, 150, 160],
  OVERLOAD: [255, 100, 180],
}

const BANDS = ['delta', 'theta', 'alpha', 'beta', 'gamma'] as const
type Band = (typeof BANDS)[number]

const BAND_META: Record<Band, { label: string; freq: string; range: [number, number] }> = {
  delta: { label: 'DELTA', freq: '0.5–4 Hz', range: [2, 15] },
  theta: { label: 'THETA', freq: '4–8 Hz', range: [3, 12] },
  alpha: { label: 'ALPHA', freq: '8–13 Hz', range: [5, 25] },
  beta: { label: 'BETA', freq: '13–30 Hz', range: [2, 20] },
  gamma: { label: 'GAMMA', freq: '30–100 Hz', range: [1, 8] },
}

/** 四个象限下各频带相对基线的偏移 —— 取自原实现 */
const ADJ: Record<Quad, Record<Band, number>> = {
  EXCITED: { delta: -2, theta: -1, alpha: -3, beta: 5, gamma: 2 },
  FLOW: { delta: -1, theta: 1, alpha: 5, beta: -2, gamma: 0 },
  DISSIPATIVE: { delta: 3, theta: 3, alpha: -2, beta: -4, gamma: -2 },
  OVERLOAD: { delta: 1, theta: 2, alpha: -5, beta: 6, gamma: 3 },
}

const BAND_COLOR: Record<Band, string> = {
  delta: '160,140,220',
  theta: '120,160,240',
  alpha: '120,200,200',
  beta: '160,200,140',
  gamma: '220,160,120',
}

function quadOf(a: number, v: number): Quad {
  if (a > 0 && v > 0) return 'EXCITED'
  if (a > 0 && v < 0) return 'OVERLOAD'
  if (a < 0 && v > 0) return 'FLOW'
  return 'DISSIPATIVE'
}

export function InstallationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bandRefs = useRef<Record<Band, HTMLCanvasElement | null>>({
    delta: null,
    theta: null,
    alpha: null,
    beta: null,
    gamma: null,
  })
  const avRef = useRef<HTMLCanvasElement>(null)

  const [explain, setExplain] = useState(false)
  const [stage, setStage] = useState<'idle' | 'connecting' | 'live'>('idle')
  const [quad, setQuad] = useState<Quad>('FLOW')
  const [values, setValues] = useState<Record<Band, number>>({
    delta: 0,
    theta: 0,
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  // 进入视口后模拟「戴上设备 → 信号稳定」
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && stage === 'idle') {
          window.setTimeout(() => setStage('connecting'), 1200)
          window.setTimeout(() => setStage('live'), 3000)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [stage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const fit = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fit()
    window.addEventListener('resize', fit)

    const P = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      s: Math.random() * 1.6 + 0.7,
      life: Math.random() * Math.PI * 2,
    }))

    let raf = 0
    let t = 0
    let a = -0.4
    let v = 0.5
    let ta = -0.4
    let tv = 0.5
    let tick = 0
    const bandHist: Record<Band, number[]> = {
      delta: [],
      theta: [],
      alpha: [],
      beta: [],
      gamma: [],
    }

    const loop = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      t += 1
      tick += 1

      if (tick > 260) {
        ta = (Math.random() - 0.5) * 1.6
        tv = (Math.random() - 0.5) * 1.6
        tick = 0
      }
      a += (ta - a) * 0.006
      v += (tv - v) * 0.006
      const q = quadOf(a, v)
      const [cr, cg, cb] = QUAD_COLOR[q]

      // 拖尾衰减：不同象限不同
      const fade = q === 'OVERLOAD' ? 0.2 : q === 'EXCITED' ? 0.14 : q === 'FLOW' ? 0.08 : 0.04
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, w, h)

      const energy = (a + 1) / 2

      P.forEach((p, i) => {
        if (q === 'FLOW') {
          const ang = Math.atan2(p.y - 0.5, p.x - 0.5)
          p.vx = Math.cos(ang + t * 0.001) * 0.0006
          p.vy = Math.sin(ang + t * 0.001) * 0.0006
        } else if (q === 'EXCITED') {
          p.vx += (0.5 - p.x) * 0.000006
          p.vy = -0.0009 - energy * 0.0009
        } else if (q === 'DISSIPATIVE') {
          p.vy += 0.000015
          p.vx *= 0.99
        } else {
          p.vx += (Math.random() - 0.5) * 0.0012
          p.vy += (Math.random() - 0.5) * 0.0012
          p.vx *= 0.9
          p.vy *= 0.9
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        p.life += q === 'OVERLOAD' ? 0.1 : 0.02
        const pulse = Math.sin(p.life) * 0.4 + 0.6
        const R = p.s * (q === 'EXCITED' ? 9 : 11) * (1 + energy * 0.35)
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, R)
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${pulse * 0.42})`)
        g.addColorStop(0.4, `rgba(${cr},${cg},${cb},${pulse * 0.14})`)
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, R, 0, Math.PI * 2)
        ctx.fill()

        // FLOW 下画晶体连线
        if (q === 'FLOW' && i % 3 === 0) {
          P.forEach((p2, j) => {
            if (j <= i || j % 3 !== 0) return
            const dx = (p2.x - p.x) * w
            const dy = (p2.y - p.y) * h
            const d = Math.hypot(dx, dy)
            if (d < 110) {
              ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(1 - d / 110) * 0.16})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(p.x * w, p.y * h)
              ctx.lineTo(p2.x * w, p2.y * h)
              ctx.stroke()
            }
          })
        }
      })

      // 中央人形光晕
      const cx = w / 2
      const cy = h / 2
      const scale = Math.min(w, h) / 3.6
      const breath = 1 + Math.sin(t * (q === 'EXCITED' ? 0.03 : 0.012)) * 0.03
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 2.6)
      aura.addColorStop(0, `rgba(${cr},${cg},${cb},0.18)`)
      aura.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.08)`)
      aura.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = aura
      ctx.beginPath()
      ctx.arc(cx, cy, scale * 2.6, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(breath, breath)
      ctx.fillStyle = `rgba(${cr},${cg},${cb},0.14)`
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.5)`
      ctx.lineWidth = scale * 0.055
      ctx.shadowBlur = 18
      ctx.shadowColor = `rgba(${cr},${cg},${cb},0.5)`
      ctx.lineCap = 'round'
      // 头
      ctx.beginPath()
      ctx.ellipse(0, -scale * 1.2, scale * 0.24, scale * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      // 躯干
      ctx.beginPath()
      ctx.moveTo(-scale * 0.1, -scale * 0.82)
      ctx.bezierCurveTo(-scale * 0.3, -scale * 0.66, -scale * 0.32, -scale * 0.2, -scale * 0.24, scale * 0.3)
      ctx.lineTo(scale * 0.24, scale * 0.3)
      ctx.bezierCurveTo(scale * 0.32, -scale * 0.2, scale * 0.3, -scale * 0.66, scale * 0.1, -scale * 0.82)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      // 手臂（姿态随象限）
      const armY = q === 'EXCITED' ? -scale * 1.05 : q === 'FLOW' ? 0 : scale * 0.4
      const armX = q === 'EXCITED' ? scale * 0.66 : q === 'FLOW' ? scale * 0.7 : scale * 0.42
      ctx.beginPath()
      ctx.moveTo(-scale * 0.27, -scale * 0.55)
      ctx.quadraticCurveTo(-armX * 0.8, (armY - scale * 0.5) / 2, -armX, armY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(scale * 0.27, -scale * 0.55)
      ctx.quadraticCurveTo(armX * 0.8, (armY - scale * 0.5) / 2, armX, armY)
      ctx.stroke()
      // 腿
      ctx.lineWidth = scale * 0.06
      ctx.beginPath()
      ctx.moveTo(-scale * 0.13, scale * 0.3)
      ctx.quadraticCurveTo(-scale * 0.2, scale * 0.85, -scale * 0.22, scale * 1.42)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(scale * 0.13, scale * 0.3)
      ctx.quadraticCurveTo(scale * 0.2, scale * 0.85, scale * 0.22, scale * 1.42)
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.restore()

      // 频带数值与波形
      if (t % 4 === 0) {
        const next = {} as Record<Band, number>
        BANDS.forEach((b, bi) => {
          const [lo, hi] = BAND_META[b].range
          const mid = (lo + hi) / 2
          const amp = (hi - lo) * 0.25
          const chaos = q === 'OVERLOAD' ? 1.8 : q === 'FLOW' ? 0.6 : q === 'DISSIPATIVE' ? 0.7 : 1.2
          const val = Math.max(
            lo,
            Math.min(hi, mid + ADJ[q][b] + Math.sin(t * 0.012 + bi * 1.5) * amp * 0.6 * chaos),
          )
          next[b] = val
          const hist = bandHist[b]
          hist.push(val)
          if (hist.length > 90) hist.shift()
        })
        setValues(next)
        setQuad(q)
      }

      if (explain) {
        BANDS.forEach((b) => {
          const c = bandRefs.current[b]
          if (!c) return
          const cc = c.getContext('2d')
          if (!cc) return
          const r = c.getBoundingClientRect()
          if (c.width !== r.width * dpr) {
            c.width = r.width * dpr
            c.height = r.height * dpr
            cc.setTransform(dpr, 0, 0, dpr, 0, 0)
          }
          const bw = r.width
          const bh = r.height
          cc.clearRect(0, 0, bw, bh)
          const hist = bandHist[b]
          if (hist.length < 2) return
          const [lo, hi] = BAND_META[b].range
          cc.strokeStyle = `rgba(${BAND_COLOR[b]},0.85)`
          cc.lineWidth = 1.8
          cc.lineJoin = 'round'
          cc.shadowBlur = 8
          cc.shadowColor = `rgba(${BAND_COLOR[b]},0.7)`
          cc.beginPath()
          hist.forEach((val, i) => {
            const x = (i / 89) * bw
            const n = (val - lo) / (hi - lo)
            const y = bh - (n * bh * 0.7 + bh * 0.15)
            i === 0 ? cc.moveTo(x, y) : cc.lineTo(x, y)
          })
          cc.stroke()
          cc.shadowBlur = 0
        })

        const av = avRef.current
        if (av) {
          const ac = av.getContext('2d')
          const r = av.getBoundingClientRect()
          if (ac) {
            if (av.width !== r.width * dpr) {
              av.width = r.width * dpr
              av.height = r.height * dpr
              ac.setTransform(dpr, 0, 0, dpr, 0, 0)
            }
            const aw = r.width
            const ah = r.height
            ac.clearRect(0, 0, aw, ah)
            const ax = aw / 2
            const ay = ah / 2
            ac.strokeStyle = 'rgba(100,200,255,0.18)'
            ac.lineWidth = 1
            ac.beginPath()
            ac.moveTo(ax, 0)
            ac.lineTo(ax, ah)
            ac.moveTo(0, ay)
            ac.lineTo(aw, ay)
            ac.stroke()
            const dx = ax + v * aw * 0.34
            const dy = ay - a * ah * 0.34
            ac.strokeStyle = 'rgba(120,180,255,0.28)'
            ac.lineWidth = 1.6
            ac.beginPath()
            ac.moveTo(ax, ay)
            ac.lineTo(dx, dy)
            ac.stroke()
            const dg = ac.createRadialGradient(dx, dy, 0, dx, dy, 11)
            dg.addColorStop(0, 'rgba(170,215,255,1)')
            dg.addColorStop(0.4, 'rgba(120,180,255,0.75)')
            dg.addColorStop(1, 'rgba(120,180,255,0)')
            ac.fillStyle = dg
            ac.beginPath()
            ac.arc(dx, dy, 11, 0, Math.PI * 2)
            ac.fill()
          }
        }
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
    }
  }, [explain])

  return (
    <figure className="overflow-hidden rounded-[1.6rem] border border-plum/12 bg-black shadow-[0_28px_64px_-30px_rgba(58,36,64,0.6)]">
      <div className="relative aspect-[16/10] w-full">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* 左上：常驻标题 */}
        <div className="pointer-events-none absolute left-5 top-5 md:left-7 md:top-7">
          <p className="text-[15px] font-light leading-tight tracking-[0.03em] text-white/85 md:text-[18px]">
            Therapy as a Living Art
          </p>
          <p className="mt-1 text-[10.5px] font-light tracking-[0.04em] text-white/50 md:text-[11.5px]">
            An EEG-driven interactive installation
          </p>
        </div>

        {/* 右上：Explain */}
        <button
          type="button"
          onClick={() => setExplain((e) => !e)}
          aria-pressed={explain}
          className="absolute right-5 top-5 rounded-md border border-[#6496FF]/35 bg-[#6496FF]/10 px-4 py-2 text-[12px] font-medium text-white/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:border-[#6496FF]/60 hover:bg-[#6496FF]/20 hover:text-white md:right-7 md:top-7"
        >
          {explain ? 'Close' : 'Explain'}
        </button>

        {/* 右下：状态提示 */}
        <p className="pointer-events-none absolute bottom-5 right-5 text-[11px] font-light tracking-[0.04em] text-white/60 md:bottom-7 md:right-7 md:text-[12px]">
          {stage === 'idle'
            ? 'Wear the EEG band to begin.'
            : stage === 'connecting'
              ? 'Tuning in…'
              : 'Live interaction'}
        </p>

        {/* 底部：Explain 面板 */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end gap-4 px-4 pb-4 transition-all duration-700 md:gap-6 md:px-6 md:pb-6"
          style={{
            transform: explain ? 'translateY(0)' : 'translateY(105%)',
            opacity: explain ? 1 : 0,
            background: 'linear-gradient(to top, rgba(0,10,30,0.55) 0%, transparent 100%)',
          }}
        >
          {/* 五条频带胶囊 */}
          <div className="flex min-w-0 flex-1 gap-2 md:gap-3">
            {BANDS.map((b) => (
              <div
                key={b}
                className="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-2xl border border-[#64C8FF]/15 bg-[#001428]/35 p-2 backdrop-blur-md md:p-3"
              >
                <span className="text-center text-[7.5px] font-light uppercase tracking-[0.16em] text-white/65 md:text-[8.5px]">
                  {BAND_META[b].label}
                  <span className="mt-0.5 block text-[6px] tracking-normal text-white/35 md:text-[6.5px]">
                    {BAND_META[b].freq}
                  </span>
                </span>
                <span className="font-mono text-[15px] font-light tabular-nums text-[#64DCFF] md:text-[18px]" style={{ textShadow: '0 0 10px rgba(100,220,255,0.7)' }}>
                  {Math.round(values[b])}
                  <span className="ml-0.5 text-[7px] opacity-60">dB</span>
                </span>
                <canvas
                  ref={(el) => {
                    bandRefs.current[b] = el
                  }}
                  className="h-[34px] w-full rounded-lg bg-white/[0.03] md:h-[46px]"
                  aria-hidden
                />
              </div>
            ))}
          </div>

          {/* 情绪雷达 */}
          <div className="hidden shrink-0 flex-col items-center gap-2 rounded-[1.2rem] border border-[#64C8FF]/15 bg-[#001428]/40 p-3 backdrop-blur-md sm:flex md:p-4">
            <span className="text-[6.5px] font-light uppercase tracking-[0.18em] text-[#64C8FF]/70">
              Emotional state
            </span>
            <div className="relative h-[86px] w-[86px] rounded-full border border-[#64C8FF]/25 md:h-[104px] md:w-[104px]">
              <canvas ref={avRef} className="h-full w-full" aria-hidden />
              {[
                { t: 'tense', cls: 'left-[16%] top-[16%] text-[#FFB4C8]' },
                { t: 'excited', cls: 'right-[14%] top-[16%] text-[#B4FFC8]' },
                { t: 'tired', cls: 'bottom-[16%] left-[18%] text-[#C8C8E6]' },
                { t: 'calm', cls: 'bottom-[16%] right-[18%] text-[#B4E6FF]' },
              ].map((q) => (
                <span key={q.t} className={`pointer-events-none absolute ${q.cls} text-[6.5px] font-medium`}>
                  {q.t}
                </span>
              ))}
            </div>
            <span className="text-[6px] font-light tracking-[0.08em] text-white/35">arousal × valence</span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full border border-[#64FFB4]/25"
                  style={{
                    backgroundColor: stage === 'live' ? 'rgba(100,255,180,1)' : 'rgba(50,100,80,0.25)',
                    boxShadow: stage === 'live' ? '0 0 12px rgba(100,255,180,0.9)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-plum/10 bg-white/70 px-4 py-2.5">
        <span className="font-hand text-[14px] text-plum-muted">
          the actual installation interface — try Explain ✦
        </span>
        <span className="text-[11px] text-plum-faint">
          current state: <span className="font-medium text-plum">{quad.toLowerCase()}</span>
        </span>
      </figcaption>
    </figure>
  )
}
