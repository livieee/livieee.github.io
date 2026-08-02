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
  partners: string
  role: string
  cls: string
  delay: string
}

const PINS: Pin[] = [
  {
    src: '/events/gtc-fireside.jpg',
    type: 'Founder conversation',
    name: '2026 GTC Fireside Talk',
    partners: 'EPIC Connector · Peak Mojo · Z.ai',
    role: 'Host · partner development',
    cls: 'left-[0.5%] top-[1%] w-[26%] -rotate-2',
    delay: '.18s',
  },
  {
    src: '/events/luma/agent-recall.jpg',
    type: 'Agent hackathon',
    name: 'Total Agent Recall',
    partners: 'GMI Cloud · Dify · HydraDB · Photon',
    role: 'Marketing · sponsor coordination',
    cls: 'right-[0.5%] top-[0.5%] w-[26%] rotate-2',
    delay: '.3s',
  },
  {
    src: '/events/women-hackathon.jpg',
    type: 'Women in Tech build day',
    name: 'Build What You Love',
    partners: 'AI Valley · bem · MiniMax',
    role: 'Program team',
    cls: 'right-[1%] bottom-[2%] w-[27%] -rotate-2',
    delay: '.42s',
  },
]

const STAMPS = [
  { src: '/logos/partners/zai.jpg', alt: 'Z.ai' },
  { src: '/logos/partners/devpost.jpg', alt: 'Devpost' },
]

export function ProgramWall() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-lavender/45 via-cream-soft to-blush/30">
      {/* 手绘路线 */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M126 62C160 54 196 62 220 80"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M316 88C336 124 330 168 306 196"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M244 234C214 248 176 246 148 232"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
      </svg>

      {/* 中央：旗舰项目的页面局部 */}
      <div
        className="absolute left-1/2 top-[49%] w-[42%] -translate-x-1/2 -translate-y-1/2 -rotate-1 overflow-hidden rounded-xl bg-white shadow-[0_22px_48px_-20px_rgba(58,36,64,0.5)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .6s .05s ease-out both' }}
      >
        <div className="flex items-center gap-1 bg-plum/[0.06] px-2.5 py-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
        </div>

        <div className="px-3 pb-3 pt-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-semibold leading-tight text-plum">
              Global Builder Challenge
            </p>
            <span className="shrink-0 rounded-full bg-rose/12 px-1.5 py-[2px] text-[6.5px] font-medium leading-none text-rose">
              Program Lead · E2E
            </span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-serif text-[19px] leading-none text-rose">221</span>
            <span className="text-[7.5px] leading-tight text-plum-faint">builders · one week</span>
          </div>

          {/* 提交列表的示意 */}
          <ul className="mt-2.5 space-y-1.5">
            {[72, 58, 64].map((w, i) => (
              <li key={w} className="flex items-center gap-1.5 rounded-md bg-plum/[0.035] px-1.5 py-1">
                <span
                  className="h-[13px] w-[13px] shrink-0 rounded-[3px]"
                  style={{ backgroundColor: ['#D193A8', '#7A9CC6', '#8FAE8B'][i], opacity: 0.35 }}
                />
                <span className="flex-1">
                  <span className="block h-[3px] rounded-full bg-plum/15" style={{ width: `${w}%` }} />
                  <span className="mt-[3px] block h-[2px] w-[38%] rounded-full bg-plum/10" />
                </span>
              </li>
            ))}
          </ul>

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
            <span className="text-[6.5px] text-plum-faint">in partnership</span>
          </div>
        </div>
      </div>

      {/* 三张拍立得 */}
      {PINS.map((p) => (
        <Link
          key={p.name}
          to="/work/ai-valley"
          aria-label={`${p.name} — ${p.role}`}
          className={`group/pin absolute ${p.cls} rounded-[6px] bg-white p-[4px] pb-[3px] shadow-[0_12px_28px_-14px_rgba(58,36,64,0.55)] transition-transform duration-500 hover:z-20 hover:scale-[1.06] hover:rotate-0`}
          style={{ animation: `annot-in .6s ${p.delay} ease-out both` }}
        >
          <span className="relative block overflow-hidden rounded-[4px]">
            <img src={p.src} alt="" aria-hidden loading="lazy" className="aspect-[3/2] w-full object-cover" />

            {/* hover 才出现的事实层 */}
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-plum/92 via-plum/70 to-plum/10 p-1.5 opacity-0 transition-opacity duration-300 group-hover/pin:opacity-100">
              <span className="block text-[7.5px] font-semibold leading-tight text-cream">{p.name}</span>
              <span className="mt-[2px] block text-[6px] leading-tight text-cream/75">{p.partners}</span>
              <span className="mt-[3px] block text-[6px] leading-tight text-cream">{p.role}</span>
              <span className="mt-[3px] block text-[6px] font-medium leading-tight text-blush">
                View chapter ↗
              </span>
            </span>
          </span>
          <span className="block px-[2px] pt-[3px] text-center font-hand text-[8px] leading-tight text-plum-muted transition-opacity duration-300 group-hover/pin:opacity-0">
            {p.type}
          </span>
        </Link>
      ))}

      {/* 路线上的四个阶段 */}
      <span className="absolute left-[33%] top-[10%] font-hand text-[10.5px] text-plum-muted">
        partner goal
      </span>
      <span className="absolute right-[1%] top-[46%] max-w-[20%] text-right font-hand text-[10.5px] leading-tight text-plum-muted">
        program design
      </span>
      <span className="absolute bottom-[3%] left-[34%] font-hand text-[10.5px] text-plum-muted">
        people come together
      </span>
      <span className="absolute left-[1.5%] top-[40%] max-w-[20%] font-hand text-[10.5px] leading-tight text-plum-muted">
        momentum after
      </span>

      {/* 便签 */}
      <span
        className="absolute bottom-[9%] left-[2%] w-[29%] -rotate-2 rounded-md border border-dashed border-rose/50 bg-white/95 px-2 py-1.5 shadow-sm"
        style={{ animation: 'annot-in .6s .54s ease-out both' }}
      >
        <span className="block font-hand text-[10.5px] leading-tight text-plum">
          make the room work ✦
        </span>
        <span className="mt-[2px] block text-[6.5px] leading-tight text-plum-faint">
          align partners · welcome builders · follow through
        </span>
      </span>
    </div>
  )
}
