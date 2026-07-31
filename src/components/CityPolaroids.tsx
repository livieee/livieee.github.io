import { motion } from 'motion/react'

type City = {
  name: string
  theme: string
  caption: string
  pin: string
  photo?: { src: string; alt: string }
  extra?: string
  large?: boolean
}

const CITIES: City[] = [
  {
    name: 'Changsha',
    theme: 'Origins',
    caption: 'where my story began',
    pin: '#D193A8',
  },
  {
    name: 'Vancouver',
    theme: 'Foundation',
    caption: 'learning how technology works',
    pin: '#B98ACB',
    photo: {
      src: '/images/photo-graduation.jpg',
      alt: 'Olivia with classmates on graduation day at UBC, Vancouver',
    },
  },
  {
    name: 'Toronto',
    theme: 'Insight',
    caption: 'learning through product signals',
    pin: '#8FAE8B',
    extra: 'data became a way to understand, not a destination',
  },
  {
    name: 'Bay Area',
    theme: 'Possibility',
    caption: 'bringing product, people & ideas together',
    pin: '#D9A441',
    photo: {
      src: '/images/photo-cmu-graduation.jpg',
      alt: 'Olivia at her Carnegie Mellon University graduation, Bay Area chapter',
    },
    large: true,
  },
]

/**
 * 城市拍立得 — 每座城市一枚图钉 + 一张小卡片（有照片的用真实照片，
 * 没有照片的用手写便签卡）。悬停轻轻回正放大、浮现注脚；
 * 点击进入 Journey 对应阶段。
 */
export function CityPolaroids({ baseDelay = 0 }: { baseDelay?: number }) {
  return (
    <div className="relative">
      {/* 连接虚线 */}
      <div
        aria-hidden
        className="absolute left-[6%] right-[6%] top-[7px] hidden border-t-2 border-dashed border-orchid/30 md:block"
      />
      <ol className="flex flex-wrap items-start justify-between gap-x-4 gap-y-8">
        {CITIES.map((c, i) => (
          <motion.li
            key={c.name}
            initial={{ opacity: 0, y: 22, rotate: i % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              delay: baseDelay + i * 0.11,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative flex flex-col items-center ${c.large ? 'md:-mt-4' : ''}`}
          >
            {/* 图钉 */}
            <span className="relative z-10 mb-2 flex flex-col items-center">
              <span
                className="block h-3 w-3 rounded-full border-2 border-white shadow-md"
                style={{ background: c.pin }}
              />
              <span className="block h-2 w-[2px] bg-plum/20" />
            </span>

            <motion.a
              href="#journey"
              aria-label={`${c.name} — ${c.theme}: ${c.caption}. Jump to journey`}
              whileHover={{ scale: c.large ? 1.05 : 1.08, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`block ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
              data-hover
            >
              {c.photo ? (
                <div
                  className={`bg-white p-1.5 pb-2 shadow-soft transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-20px_rgb(58_36_64/0.28)] ${
                    c.large ? 'w-32 md:w-40' : 'w-24 md:w-28'
                  }`}
                >
                  <img
                    src={c.photo.src}
                    alt={c.photo.alt}
                    loading="lazy"
                    draggable={false}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5' }}
                  />
                </div>
              ) : (
                <div
                  className="paper-grid flex w-24 flex-col justify-center border border-plum/10 bg-cream-soft px-2.5 py-3 shadow-sm transition-shadow duration-300 group-hover:shadow-md md:w-28"
                  style={{ aspectRatio: '4/5' }}
                >
                  <span className="font-hand text-lg leading-tight text-plum">{c.theme}</span>
                  <span className="mt-1 font-hand text-sm leading-tight text-plum-faint">
                    {c.caption}
                  </span>
                </div>
              )}
            </motion.a>

            <div className="mt-2.5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-plum">
                {c.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-plum-faint">{c.theme}</p>
              {c.photo && (
                <p className="mx-auto mt-1 max-w-[130px] font-hand text-sm leading-tight text-plum-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {c.caption}
                </p>
              )}
              {c.extra && (
                <p className="mx-auto mt-1 max-w-[150px] font-hand text-[13px] leading-tight text-orchid">
                  “{c.extra}”
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
