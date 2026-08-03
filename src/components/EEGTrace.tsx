/**
 * 五条频带的走线图。
 *
 * 不用网上找的示意图：一是授权说不清，二是那些图跟这个项目没关系。
 * 这里按五个频带**真实的频率与幅度关系**画 —— δ 慢而大，往 γ 走越来越快、
 * 越来越小；每条线由三个不同相位的正弦叠加，再套一层慢包络，所以起伏不
 * 规整，像真的信号而不是一排整齐的正弦。左侧标注频带名与频段范围。
 *
 * 频段口径与装置里的 Explain 模式一致（BAND_META）。
 */

const BANDS = [
  { k: 'δ', name: 'DELTA', hz: '0.5–4 Hz', freq: 2.4, amp: 12.5, c: '#7A9CC6' },
  { k: 'θ', name: 'THETA', hz: '4–8 Hz', freq: 4.4, amp: 10, c: '#7FD3E8' },
  { k: 'α', name: 'ALPHA', hz: '8–13 Hz', freq: 7.8, amp: 8, c: '#8FAE8B' },
  { k: 'β', name: 'BETA', hz: '13–30 Hz', freq: 14.5, amp: 5.4, c: '#C79A4B' },
  { k: 'γ', name: 'GAMMA', hz: '30–100 Hz', freq: 26, amp: 3.2, c: '#B98ACB' },
]

const W = 300
const STEP = 1.5
const N = Math.round(W / STEP)

/** 三个相位错开的正弦叠加 + 慢包络 —— 让走线不规整 */
function trace(mid: number, freq: number, amp: number, seed: number) {
  let d = ''
  for (let k = 0; k <= N; k++) {
    const x = k * STEP
    const t = (x / W) * Math.PI * 2
    const env = 0.62 + 0.38 * Math.sin(t * 0.85 + seed * 1.7)
    const y =
      mid -
      env *
        amp *
        (Math.sin(t * freq + seed) * 0.62 +
          Math.sin(t * freq * 2.07 + seed * 2.4) * 0.26 +
          Math.sin(t * freq * 0.43 + seed * 0.8) * 0.22)
    d += `${k === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)}`
  }
  return d
}

export function EEGTrace() {
  const rowH = 34
  const H = BANDS.length * rowH

  return (
    <div className="flex gap-4">
      {/* 频带标签：让这张图说得出自己画的是什么 */}
      <ul className="flex h-[170px] shrink-0 flex-col">
        {BANDS.map((b) => (
          <li key={b.name} className="flex flex-1 flex-col justify-center leading-none">
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif text-[15px]" style={{ color: b.c }}>
                {b.k}
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-white/45">{b.name}</span>
            </span>
            <span className="mt-1 text-[9px] tabular-nums text-white/25">{b.hz}</span>
          </li>
        ))}
      </ul>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-[170px] w-full" fill="none" aria-hidden>
        <defs>
          <filter id="eeg-glow" x="-4%" y="-40%" width="108%" height="180%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          {/* 两端淡出，走线像是从画面外流进来 */}
          <linearGradient id="eeg-fade" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.08" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.92" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="eeg-mask">
            <rect width={W} height={H} fill="url(#eeg-fade)" />
          </mask>
        </defs>

        <g mask="url(#eeg-mask)">
          {BANDS.map((b, r) => {
            const mid = r * rowH + rowH / 2
            const d = trace(mid, b.freq, b.amp, r * 1.3)
            return (
              <g key={b.name}>
                {/* 基线：只是一条极淡的参考，不构成网格 */}
                <line x1="0" y1={mid} x2={W} y2={mid} stroke={b.c} strokeOpacity="0.1" strokeWidth="0.6" />
                {/* 辉光垫底 */}
                <path
                  d={d}
                  stroke={b.c}
                  strokeOpacity="0.5"
                  strokeWidth="2.2"
                  filter="url(#eeg-glow)"
                  strokeLinecap="round"
                  style={{ animation: `route-draw 2.2s ${r * 0.16}s ease-out both` }}
                  strokeDasharray="1400"
                />
                <path
                  d={d}
                  stroke={b.c}
                  strokeOpacity="0.92"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeDasharray="1400"
                  style={{ animation: `route-draw 2.2s ${r * 0.16}s ease-out both` }}
                />
              </g>
            )
          })}
        </g>

        {/* 采样游标：横扫一遍，像仪器在读 */}
        <rect
          x="0"
          y="0"
          width="1"
          height={H}
          fill="#CBB8F5"
          opacity="0.5"
          style={{ animation: 'eeg-sweep 6.5s 2.2s linear infinite' }}
        />
      </svg>
    </div>
  )
}
