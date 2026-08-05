import type { GalleryItem } from '@/components/Lightbox'

/**
 * 照片带 —— 自己走的横向展柜。
 *
 * 不给「See all photos」按钮，也不做需要手动横拖的滚动条：多数人既不会点
 * 一个通往未知的按钮，也不会去拖一条看起来是静止的横条。但所有人都会看
 * 一条自己在动的带子。轨道整体左移，鼠标悬停暂停，点任意一张进灯箱；
 * 两份内容首尾相接，走到 -50% 时无缝回到起点。
 */

const SIZE = {
  sm: { img: 'h-[74px] w-[111px]', cap: 'max-w-[111px] text-[11px]', gap: 'gap-2.5' },
  md: { img: 'h-[168px] w-[252px] sm:h-[196px] sm:w-[294px]', cap: 'max-w-[252px] text-[13px] sm:max-w-[294px]', gap: 'gap-4' },
}

export function PhotoRail({
  items,
  onZoom,
  duration = 64,
  startAt = 0,
  size = 'md',
  tone = 'dark',
  bleed = true,
}: {
  items: GalleryItem[]
  onZoom: (i: number) => void
  duration?: number
  /** 从第几张开始排，避免和上方精选的几张一开场就重复 */
  startAt?: number
  size?: 'sm' | 'md'
  tone?: 'light' | 'dark'
  /** 是否撑出容器铺满视口宽 —— 卡片内部要关掉 */
  bleed?: boolean
}) {
  const order = items.map((_, k) => (k + startAt) % items.length)
  const loop = [...order, ...order]
  const s = SIZE[size]
  const dark = tone === 'dark'

  return (
    <div
      className={`group/rail relative overflow-hidden ${bleed ? 'left-1/2 w-screen -translate-x-1/2' : 'w-full'}`}
      style={{
        // 用遮罩而不是实色渐变收边：背景可能是会变色的图层，
        // 铺一层固定色的渐变会露馅。
        maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      }}
    >
      <ul
        className={`flex w-max ${s.gap} ${bleed ? 'px-6 md:px-10' : 'px-3'} will-change-transform group-hover/rail:[animation-play-state:paused]`}
        style={{ animation: `rail-scroll ${duration}s linear infinite` }}
      >
        {loop.map((i, k) => {
          const it = items[i]
          return (
            <li key={`${it.src}-${k}`} className="shrink-0">
              <button
                type="button"
                onClick={() => onZoom(i)}
                aria-label={`View larger: ${it.alt}`}
                className="group/ph block cursor-zoom-in text-left"
              >
                <span
                  className={`halftone relative block overflow-hidden rounded-[1rem] ${
                    dark ? 'border border-white/10 bg-black/40' : 'border border-plum/10 bg-white'
                  }`}
                >
                  <img
                    src={it.src}
                    alt={k < order.length ? it.alt : ''}
                    aria-hidden={k >= order.length}
                    loading="lazy"
                    className={`${s.img} object-cover transition-transform duration-700 group-hover/ph:scale-[1.06]`}
                  />
                </span>
                <span
                  className={`mt-2 block font-hand leading-tight transition-colors ${s.cap} ${
                    dark ? 'text-white/50 group-hover/ph:text-white/80' : 'text-plum-faint group-hover/ph:text-plum'
                  }`}
                >
                  {it.cap}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
