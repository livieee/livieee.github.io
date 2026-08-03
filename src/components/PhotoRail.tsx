import type { GalleryItem } from '@/components/Lightbox'

/**
 * 照片带 —— 自己走的横向展柜。
 *
 * 不再给一个「See all photos」按钮：多数人不会去点一个通往未知的按钮，
 * 但所有人都会看一条自己在动的带子。轨道整体左移，鼠标悬停暂停，
 * 点任意一张进灯箱；两份内容首尾相接，走到 -50% 时无缝回到起点。
 */

export function PhotoRail({
  items,
  onZoom,
  duration = 64,
  startAt = 0,
}: {
  items: GalleryItem[]
  onZoom: (i: number) => void
  duration?: number
  /** 从第几张开始排，避免和上方精选的几张一开场就重复 */
  startAt?: number
}) {
  const order = items.map((_, k) => (k + startAt) % items.length)
  const loop = [...order, ...order]

  return (
    <div
      className="group/rail relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      style={{
        // 用遮罩而不是实色渐变收边：背景是会随滚动变色的状态图，
        // 铺一层固定色的渐变会露馅。
        maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      }}
    >
      <ul
        className="flex w-max gap-4 px-6 will-change-transform group-hover/rail:[animation-play-state:paused] md:px-10"
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
                <span className="block overflow-hidden rounded-[1rem] border border-white/10 bg-black/40">
                  <img
                    src={it.src}
                    alt={k < order.length ? it.alt : ''}
                    aria-hidden={k >= order.length}
                    loading="lazy"
                    className="h-[168px] w-[252px] object-cover transition-transform duration-700 group-hover/ph:scale-[1.06] sm:h-[196px] sm:w-[294px]"
                  />
                </span>
                <span className="mt-2 block max-w-[252px] font-hand text-[13px] leading-tight text-white/50 transition-colors group-hover/ph:text-white/80 sm:max-w-[294px]">
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
