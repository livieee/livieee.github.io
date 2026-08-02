import { useState } from 'react'
import { Link } from 'react-router'

/**
 * 03 卡片右侧的「Ecosystem Program Wall」。
 *
 * 中央是旗舰项目的页面局部（不放大号 Z.ai 品牌图，只留标题、少量提交界面
 * 和一个 Program Lead 角标），周围钉三张微微旋转的拍立得。
 * 默认只显示通用类型，hover 才叠出真实名称、合作方和角色 —— 首页说能力，
 * 详情页给证据。
 */

type Pin = {
  src: string
  /** 默认看到的通用类型 */
  type: string
  /** hover 后才出现的事实 */
  name: string
  role: string
  cls: string
  delay: string
}

const PINS: Pin[] = [
  {
    src: '/events/gtc-panel-crop.jpg',
    type: 'founder conversation',
    name: '2026 GTC Fireside Talk',
    role: 'Host',
    cls: 'left-[0.5%] top-[1%] w-[26%] -rotate-2',
    delay: '.18s',
  },
  {
    src: '/events/av-hackathon.jpg',
    type: 'agent hackathon',
    name: 'AI Valley Hackathon',
    role: '',
    cls: 'right-[0.5%] top-[0.5%] w-[25%] rotate-2',
    delay: '.3s',
  },
  {
    src: '/events/photostrip-tight.jpg',
    type: 'build day',
    name: 'Build What You Love',
    role: 'Program Team',
    cls: 'right-[1%] bottom-[2%] w-[26%] -rotate-2',
    delay: '.42s',
  },
]

const SHEET = [
  { t: '6:10', k: 'Opening keynotes' },
  { t: '6:30', k: 'The distribution challenge' },
  { t: '7:10', k: 'Building in the age of AI' },
  { t: '7:50', k: 'Beyond the horizon' },
]

const STAMPS = [
  { src: '/logos/partners/zai.jpg', alt: 'Z.ai' },
  { src: '/logos/partners/devpost.jpg', alt: 'Devpost' },
]

export function ProgramWall() {
  const [cur, setCur] = useState<{ x: number; y: number } | null>(null)

  return (
    <Link
      to="/work/ai-valley"
      aria-label="AI Valley programs — open the case study"
      className="wall-board group/wall relative block aspect-[3/2] w-full cursor-none overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-lavender/45 via-cream-soft to-blush/30"
      onPointerMove={(e) => {
        if (e.pointerType === 'touch') return
        const r = e.currentTarget.getBoundingClientRect()
        setCur({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onPointerLeave={() => setCur(null)}
    >
      {/* 手绘路线 */}
      <svg
        viewBox="0 0 400 300"
        className="wall-route absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M126 62C160 54 196 62 220 80"
          stroke="#3A2440"
          strokeOpacity="0.4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
        <path
          d="M316 88C336 124 330 168 306 196"
          stroke="#3A2440"
          strokeOpacity="0.4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
        <path
          d="M244 234C214 248 176 246 148 232"
          stroke="#3A2440"
          strokeOpacity="0.4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
      </svg>

      {/* 中央：旗舰项目的页面局部 */}
      <div
        className="flagship group/flag absolute left-1/2 top-[50%] w-[47%] -translate-x-1/2 -translate-y-1/2 -rotate-1 overflow-hidden rounded-xl bg-white shadow-[0_22px_48px_-20px_rgba(58,36,64,0.5)] ring-1 ring-rose/30 transition-transform duration-500 hover:scale-[1.03]"
        style={{ animation: 'annot-in .6s .05s ease-out both' }}
      >
        <div className="flex items-center gap-1 bg-rose/[0.14] px-2.5 py-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-rose/40" />
          <span className="h-[5px] w-[5px] rounded-full bg-rose/30" />
          <span className="h-[5px] w-[5px] rounded-full bg-rose/20" />
        </div>

        <div className="px-3 pb-3 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="h-[12px] w-[12px] shrink-0 overflow-hidden rounded-[3px] bg-white ring-1 ring-plum/10">
              <img src="/logos/partners/zai.jpg" alt="" aria-hidden loading="lazy" className="h-full w-full object-contain" />
            </span>
            <span className="text-[8.5px] leading-tight text-plum-muted">
              the brief — a new model ships in two weeks
            </span>
          </div>

          <div className="mt-2 flex items-start justify-between gap-2 border-t border-plum/8 pt-2">
            <p className="text-[11.5px] font-semibold leading-tight text-plum">
              Global Builder Challenge
            </p>
            <span className="shrink-0 rounded-full bg-rose/12 px-1.5 py-[2px] text-[8px] font-medium leading-none text-rose">
              Program Lead · E2E
            </span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-serif text-[27px] leading-none text-rose">221</span>
            <span className="text-[9px] leading-tight text-plum-faint">builders · one week</span>
          </div>

          {/* 提交进度 */}
          <div className="mt-2 h-[4px] w-full overflow-hidden rounded-full bg-plum/10">
            <span className="block h-full w-[86%] rounded-full bg-rose/55" />
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            {['#D193A8', '#B98ACB', '#7A9CC6', '#8FAE8B'].map((c) => (
              <span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ backgroundColor: c, opacity: 0.4 }} />
            ))}
            <span className="ml-1 text-[8px] text-plum-faint">submissions in review</span>
          </div>

          {/* 合作印章 */}
          <div className="mt-2.5 flex items-center gap-1.5 border-t border-plum/8 pt-2">
            {STAMPS.map((st) => (
              <span
                key={st.alt}
                className="h-[13px] w-[13px] overflow-hidden rounded-[3px] bg-white ring-1 ring-plum/10"
              >
                <img src={st.src} alt="" aria-hidden loading="lazy" className="h-full w-full object-contain" />
              </span>
            ))}
            
          </div>

          <span className="mt-1.5 block h-[9px] overflow-hidden">
            <span className="block text-[8px] font-medium leading-tight text-rose opacity-0 transition-opacity duration-300 group-hover/flag:opacity-100">
              Flagship program · View chapter ↗
            </span>
          </span>
        </div>
      </div>

      {/* 三张拍立得 */}
      {PINS.map((p) => (
        <span
          key={p.name}
          className={`group/pin absolute ${p.cls} rounded-[6px] bg-white p-[4px] pb-[3px] shadow-[0_12px_28px_-14px_rgba(58,36,64,0.55)] transition-all duration-500 hover:z-20 hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.05] hover:bg-white/70 hover:backdrop-blur-[2px] hover:shadow-[0_20px_40px_-16px_rgba(58,36,64,0.55)]`}
          style={{ animation: `annot-in .6s ${p.delay} ease-out both` }}
        >
          <span className="relative block overflow-hidden rounded-[4px]">
            <img
              src={p.src}
              alt=""
              aria-hidden
              loading="lazy"
              className="aspect-[3/2] w-full object-cover saturate-[0.9] transition-all duration-500 group-hover/pin:scale-[1.03] group-hover/pin:opacity-[0.7] group-hover/pin:saturate-[0.75]"
            />

            {/* hover 才出现的事实层 */}
            <span className="absolute inset-x-[6%] bottom-[7%] translate-y-1.5 scale-95 rounded-[5px] border border-white/70 bg-white/55 px-2 pb-1.5 pt-1.5 opacity-0 shadow-[0_8px_20px_-8px_rgba(58,36,64,0.45)] backdrop-blur-md transition-all duration-300 group-hover/pin:translate-y-0 group-hover/pin:scale-100 group-hover/pin:opacity-100">
              <span className="block text-[9px] font-semibold leading-tight text-plum">{p.name}</span>
              {p.role && (
                <span className="mt-[3px] block text-[7.5px] leading-tight text-plum-muted">{p.role}</span>
              )}
            </span>
          </span>
          <span className="relative block px-[2px] pt-[3px] text-center text-[10px] leading-tight">
            <span className="font-hand text-plum-muted transition-opacity duration-300 group-hover/pin:opacity-0">
              {p.type}
            </span>
            <span className="absolute inset-0 font-medium text-rose opacity-0 transition-opacity duration-300 group-hover/pin:opacity-100">
              View chapter ↗
            </span>
          </span>
        </span>
      ))}

      {/* program design —— 当晚的流程表 */}
      <span
        className="absolute left-[1%] top-[37%] w-[24%] -rotate-2 rounded-md bg-white/95 px-2 py-1.5 shadow-[0_10px_24px_-14px_rgba(58,36,64,0.5)] ring-1 ring-plum/8"
        style={{ animation: 'annot-in .6s .5s ease-out both' }}
      >
        <span className="block text-[8px] uppercase tracking-[0.14em] text-plum-faint">run of show</span>
        <span className="mt-1 block space-y-[3px]">
          {SHEET.map((r) => (
            <span key={r.t} className="flex items-center gap-1">
              <span className="font-serif text-[9px] leading-none text-rose">{r.t}</span>
              <span className="h-[1px] flex-1 bg-plum/12" />
              <span className="max-w-[56%] truncate text-[7px] leading-none text-plum-muted">{r.k}</span>
            </span>
          ))}
        </span>
      </span>

      {/* 路线上的四个阶段 */}
      <span className="absolute left-[30%] top-[2%] font-hand text-[10.5px] leading-none text-plum-muted">
        partner goal
      </span>
      <span className="absolute left-[2%] top-[62%] font-hand text-[10.5px] leading-none text-plum-muted">
        program design
      </span>
      <span className="absolute bottom-[2%] left-[36%] font-hand text-[10.5px] leading-none text-plum-muted">
        people come together
      </span>
      <span className="absolute right-[2%] top-[46%] max-w-[24%] text-right font-hand text-[10.5px] leading-tight text-plum-muted">
        momentum after
      </span>

      {/* 便签 */}
      <span
        className="absolute bottom-[3%] left-[1%] w-[29%] -rotate-2 rounded-md border border-dashed border-rose/50 bg-white/95 px-2 py-1.5 shadow-sm"
        style={{ animation: 'annot-in .6s .54s ease-out both' }}
      >
        <span className="block font-hand text-[13px] leading-tight text-plum">
          make the room work ✦
        </span>
        <span className="mt-[3px] block text-[8px] leading-tight text-plum-faint">
          align partners · welcome builders · follow through
        </span>
      </span>

      {/* 跟随光标的胶囊 —— 与 Theta 卡片同一套 */}
      {cur && (
        <span
          aria-hidden
          className="pointer-events-none absolute z-30 whitespace-nowrap rounded-full bg-rose px-4 py-1.5 font-hand text-[15px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(209,147,168,0.75)]"
          style={{
            left: cur.x,
            top: cur.y,
            transform: 'translate(12px, -130%) rotate(3deg)',
          }}
        >
          Tap to view ↗
        </span>
      )}
    </Link>
  )
}
