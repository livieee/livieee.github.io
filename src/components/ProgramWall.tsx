/**
 * 03 卡片主视觉 · A 方案「ecosystem desk」——
 * 四格摊在桌面上，手绘虚线串成一条弧：
 * partner goal → program design → people in the room → momentum after
 *
 * 四格素材全部来自已确认的项目，不用任何不相干的图；
 * 合作方 logo 缩成角落的小印章，不喧宾夺主。
 */

const STAMPS = [
  '/logos/partners/zai.jpg',
  '/logos/partners/minimax.jpg',
  '/logos/partners/replit.jpg',
  '/logos/partners/vercel.jpg',
  '/logos/partners/gmicloud.jpg',
  '/logos/partners/dify.jpg',
]

const SHEET = [
  { t: '6:10', k: 'Opening keynotes' },
  { t: '6:30', k: 'The distribution challenge' },
  { t: '7:10', k: 'Building in the age of AI' },
  { t: '7:50', k: 'Beyond the horizon' },
]

export function ProgramWall() {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-lavender/40 via-cream-soft to-blush/30">
      {/* 串起四格的手绘弧线 */}
      <svg
        viewBox="0 0 300 200"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M78 52C104 44 128 52 146 66"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M222 78C236 100 230 122 212 134"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M150 150C130 158 106 156 88 146"
          stroke="#3A2440"
          strokeOpacity="0.2"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
      </svg>

      {/* ① partner goal —— 线上挑战赛页面 */}
      <div
        className="absolute left-[3%] top-[6%] w-[36%] -rotate-[3deg] overflow-hidden rounded-md bg-white shadow-[0_12px_28px_-14px_rgba(58,36,64,0.5)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .55s .05s ease-out both' }}
      >
        <div className="flex items-center gap-[3px] bg-plum/[0.06] px-1.5 py-[4px]">
          <span className="h-[4px] w-[4px] rounded-full bg-plum/20" />
          <span className="h-[4px] w-[4px] rounded-full bg-plum/20" />
          <span className="h-[4px] w-[4px] rounded-full bg-plum/20" />
        </div>
        <img
          src="/events/luma/glm.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[5/1] w-full object-cover"
        />
        <div className="px-2 pb-2 pt-1.5">
          <p className="text-[7px] font-semibold leading-tight text-plum">
            Global builder challenge
          </p>
          <p className="mt-1 font-serif text-[13px] leading-none text-rose">221</p>
        </div>
      </div>

      {/* ② program design —— 流程表 */}
      <div
        className="absolute right-[4%] top-[8%] w-[33%] rotate-[4deg] rounded-md bg-white px-2 py-2 shadow-[0_12px_28px_-14px_rgba(58,36,64,0.5)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .55s .18s ease-out both' }}
      >
        <p className="text-[6.5px] uppercase tracking-[0.16em] text-plum-faint">run of show</p>
        <ul className="mt-1 space-y-[3px]">
          {SHEET.map((r) => (
            <li key={r.t} className="flex items-center gap-1.5">
              <span className="font-serif text-[7.5px] leading-none text-rose">{r.t}</span>
              <span className="h-[1px] flex-1 bg-plum/12" />
              <span className="truncate text-[6px] leading-none text-plum-muted">{r.k}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ③ people in the room —— panel 现场 */}
      <figure
        className="absolute bottom-[6%] right-[6%] w-[38%] rotate-[-3deg] rounded-[5px] bg-white p-[3px] pb-[2px] shadow-[0_12px_28px_-14px_rgba(58,36,64,0.5)]"
        style={{ animation: 'annot-in .55s .3s ease-out both' }}
      >
        <img
          src="/events/gtc-fireside.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[16/10] w-full rounded-[3px] object-cover"
        />
      </figure>

      {/* ④ momentum after —— 被官方转发 */}
      <div
        className="absolute bottom-[15%] left-[4%] w-[31%] rotate-[2deg] rounded-md bg-white px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(58,36,64,0.5)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .55s .42s ease-out both' }}
      >
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-[7px] w-[7px] shrink-0 text-plum" fill="currentColor" aria-hidden>
            <path d="M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.9L0 1.6h7.6l5.2 6.9zm-1.3 19.6h2L6.5 3.7H4.3z" />
          </svg>
          <span className="text-[6px] font-semibold text-plum">reposted by the lab</span>
        </div>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="font-serif text-[13px] leading-none text-rose">3</span>
          <span className="text-[6px] leading-tight text-plum-faint">projects featured</span>
        </p>
      </div>

      {/* 四段弧的标签 */}
      <span className="absolute left-[42%] top-[2%] font-hand text-[9px] text-plum-muted">
        partner goal
      </span>
      <span className="absolute right-[1.5%] top-[47%] max-w-[22%] text-right font-hand text-[9px] leading-tight text-plum-muted">
        program design
      </span>
      <span className="absolute bottom-[1.5%] left-[40%] font-hand text-[9px] text-plum-muted">
        people in the room
      </span>
      <span className="absolute left-[2%] top-[42%] max-w-[22%] font-hand text-[9px] leading-tight text-plum-muted">
        momentum after
      </span>

      {/* 合作方印章 */}
      <div className="absolute bottom-[3%] left-[4%] flex -space-x-1">
        {STAMPS.map((src) => (
          <span
            key={src}
            className="h-[15px] w-[15px] overflow-hidden rounded-[3px] bg-white ring-1 ring-plum/10"
          >
            <img src={src} alt="" aria-hidden loading="lazy" className="h-full w-full object-contain" />
          </span>
        ))}
      </div>
    </div>
  )
}
