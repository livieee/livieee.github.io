/**
 * 03 卡片主视觉 —— 一块"节目板"：
 * 中间是我运营的旗舰项目页面（浏览器窗口），周围钉三张拍立得，
 * 手绘线把它们串成 align partners → activate builders → make the room work。
 *
 * 刻意不让任何一家合作方的品牌图占据最大面积：中央是"一个我运营的项目页"，
 * 封面只作窄条 banner 出现。
 */

const PINS = [
  {
    src: '/events/luma/agent-recall.jpg',
    cap: 'Agent hackathon',
    cls: 'left-[1%] top-[3%] w-[26%] -rotate-[7deg]',
    delay: '.15s',
  },
  {
    src: '/events/luma/gtc-talk.jpg',
    cap: 'Founder program',
    cls: 'right-[1%] top-[2%] w-[25%] rotate-[6deg]',
    delay: '.28s',
  },
  {
    src: '/events/luma/women.jpg',
    cap: 'Women in Tech build day',
    cls: 'right-[2%] bottom-[5%] w-[26%] rotate-[-4deg]',
    delay: '.4s',
  },
]

export function ProgramBoard() {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-lavender/45 via-cream-soft to-blush/35">
      {/* 手绘连线 */}
      <svg
        viewBox="0 0 300 200"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d="M52 40C74 56 92 72 108 88"
          stroke="#3A2440"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M248 38C228 54 212 70 196 86"
          stroke="#3A2440"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M244 158C224 146 208 136 194 126"
          stroke="#3A2440"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
      </svg>

      {/* 中央：我运营的项目页 */}
      <div
        className="absolute left-1/2 top-[50%] w-[43%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.5deg] overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_-18px_rgba(58,36,64,0.45)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .6s .05s ease-out both' }}
      >
        <div className="flex items-center gap-[3px] bg-plum/[0.06] px-2 py-[5px]">
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="ml-1.5 truncate text-[6px] tracking-wide text-plum-faint">
            builder challenge · submissions
          </span>
        </div>
        <img
          src="/events/luma/glm.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[4/1] w-full object-cover"
        />
        <div className="px-2.5 pb-2.5 pt-2">
          <p className="text-[8.5px] font-semibold leading-tight text-plum">
            Build with GLM 5.1 — global builder challenge
          </p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-serif text-[15px] leading-none text-rose">221</span>
            <span className="text-[7px] leading-tight text-plum-faint">
              builders · one week · async
            </span>
          </div>
          <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-plum/10">
            <span className="block h-full w-[82%] rounded-full bg-rose/60" />
          </div>
        </div>
      </div>

      {/* 三张拍立得 */}
      {PINS.map((p) => (
        <figure
          key={p.cap}
          className={`absolute ${p.cls} rounded-[5px] bg-white p-[3px] pb-[2px] shadow-[0_10px_24px_-12px_rgba(58,36,64,0.5)]`}
          style={{ animation: `annot-in .6s ${p.delay} ease-out both` }}
        >
          <img src={p.src} alt="" aria-hidden loading="lazy" className="aspect-[3/2] w-full rounded-[3px] object-cover" />
          <figcaption className="px-[2px] pb-[1px] pt-[2px] text-center font-hand text-[7.5px] leading-tight text-plum-muted">
            {p.cap}
          </figcaption>
        </figure>
      ))}

      {/* 三个动作 */}
      <span className="absolute left-[2%] top-[37%] font-hand text-[10px] text-plum-muted">
        align partners
      </span>
      <span className="absolute bottom-[24%] left-[3%] font-hand text-[10px] text-plum-muted">
        activate builders
      </span>
      <span className="absolute right-[2%] top-[45%] max-w-[26%] text-right font-hand text-[10px] leading-tight text-plum-muted">
        make the room work
      </span>

      {/* 角落便签 */}
      <span className="absolute bottom-[5%] left-[3%] rotate-[-3deg] rounded-md border border-dashed border-rose/50 bg-white/95 px-2 py-[3px] font-hand text-[10px] leading-tight text-plum shadow-sm">
        lead program ✦
      </span>
    </div>
  )
}
