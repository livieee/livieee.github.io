import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type TimelineBullet = { text: string; logo?: string }

export type TimelineEntry = {
  id: string
  /** 机构名（如 Carnegie Mellon University / People.ai） */
  org: string
  /** 角色或学位 */
  role: string
  /** 时间段，如 2024–2025 */
  period: string
  /** 地点，如 Mountain View, CA */
  location: string
  /** logo 图片路径（无则用首字母印章） */
  logo?: string
  /** 横向字标 logo（如 YUTO / ADASTRA）用宽胶囊容器等比展示 */
  logoWide?: boolean
  /** 品牌色（印章/hover 光晕/点动画用） */
  accent: string
  /** 展开的 impact bullets（≤2 条；可带小 logo，如 Bosch / IEEE） */
  bullets?: Array<string | TimelineBullet>
  /** 一句反思/学习（手写体） */
  reflection?: string
  /** 存在作品集案例时的 Related Work 锚点（如 #case-theta） */
  relatedWork?: { label: string; href: string }
  /** 展开时甩出的拍立得照片（单张） */
  photo?: TimelinePhoto
  /** 多张照片时用叠放拍立得，点击换下一张 */
  photos?: TimelinePhoto[]
}

export type TimelinePhoto = { src: string; alt: string; caption?: string }

type TimelineNodeProps = {
  entry: TimelineEntry
  index: number
}

/**
 * 双巷 résumé 时间线节点。
 * 默认只显示 logo + 机构 + 角色 + 日期地点；hover 复色抬升并露出
 * “View chapter ↗”；点击就地展开 bullets + 一句反思 + Related Work。
 */
export function TimelineNode({ entry, index }: TimelineNodeProps) {
  const [open, setOpen] = useState(false)
  const [photoIdx, setPhotoIdx] = useState(0)
  const reduce = useReducedMotion()
  const { org, role, period, location, logo, logoWide, accent, bullets, reflection, relatedWork, photo, photos } = entry
  // 时间轴褪色：最近的满色，越往过去饱和度越低（下限 .35）
  const sat = Math.max(0.35, 1 - index * 0.16)
  const fade = Math.max(0.82, 1 - index * 0.035)
  const photoList = photos ?? (photo ? [photo] : [])

  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group/node relative pl-9 md:pl-11"
    >
      {/* 时间线圆点 */}
      <span
        aria-hidden
        className="absolute left-0 top-[26px] flex h-[15px] w-[15px] items-center justify-center md:h-[17px] md:w-[17px]"
      >
        <span
          className="absolute inset-0 rounded-full border border-dashed bg-cream transition-transform duration-500 group-hover/node:rotate-90 group-hover/node:scale-110"
          style={{ borderColor: accent }}
        />
        <span
          className="h-[5px] w-[5px] rounded-full transition-all duration-300 group-hover/node:scale-150"
          style={{ backgroundColor: accent }}
        />
      </span>

      {/* 卡片本体 */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
        className="group/card relative w-full cursor-pointer overflow-hidden rounded-2xl border border-plum/[0.08] bg-white/70 p-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-plum/[0.14] hover:bg-white/95 hover:shadow-[0_18px_40px_-18px_rgba(90,63,86,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid/50 sm:p-4"
        style={{ ['--accent' as string]: accent }}
      >
        {/* hover 时左侧一条品牌色 */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover/card:scale-y-100"
          style={{ backgroundColor: accent }}
        />

        <div className="flex items-start gap-3.5">
          {/* logo（默认去色，hover 复色；横向字标用宽胶囊） */}
          <span
            className={`flex shrink-0 items-center justify-center overflow-hidden border border-plum/10 bg-white px-1.5 shadow-xs transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:scale-[1.03] ${
              logoWide
                ? 'h-11 w-[76px] rounded-xl sm:h-12 sm:w-[84px]'
                : 'h-11 w-11 rounded-xl sm:h-12 sm:w-12'
            }`}
            title={org}
          >
            {logo ? (
              <img
                src={logo}
                alt={`${org} logo`}
                loading="lazy"
                className={`h-auto w-auto object-contain transition-all duration-500 ${
                  logoWide ? 'max-h-6 max-w-[64px] sm:max-h-7 sm:max-w-[72px]' : 'max-h-8 max-w-8 sm:max-h-9 sm:max-w-9'
                } ${
                  open
                    ? 'saturate-100 opacity-100'
                    : 'saturate-[var(--logo-sat)] opacity-[var(--logo-fade)] group-hover/card:saturate-100 group-hover/card:opacity-100'
                }`}
                style={{ '--logo-sat': sat, '--logo-fade': fade } as React.CSSProperties}
              />
            ) : (
              <span
                aria-hidden
                className={`flex h-full w-full items-center justify-center font-serif text-[15px] font-semibold text-white transition-all duration-500 ${
                  open
                    ? 'saturate-100 opacity-100'
                    : 'saturate-[var(--logo-sat)] opacity-[var(--logo-fade)] group-hover/card:saturate-100 group-hover/card:opacity-100'
                }`}
                style={{ backgroundColor: accent, '--logo-sat': sat, '--logo-fade': fade } as React.CSSProperties}
              >
                {org.charAt(0)}
              </span>
            )}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-balance font-serif text-[17px] font-medium leading-snug text-plum sm:text-[19px]">
              {org}
            </h3>
            <p className="mt-0.5 text-[13px] leading-snug text-plum-muted sm:text-[14px]">{role}</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-plum-faint sm:text-[12px]">
              {/* location 图标 */}
              <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" aria-hidden>
                <path
                  d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.4" fill="currentColor" />
              </svg>
              <span>{location}</span>
            </p>
          </div>

          {/* 右上：时间胶囊 + View chapter / close 提示 */}
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="rounded-full border border-plum/10 bg-cream-soft/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-plum-muted">
              {period}
            </span>
            <span
              aria-hidden
              className={`font-hand text-[13px] transition-all duration-300 ${
                open
                  ? 'text-plum-faint opacity-100'
                  : 'translate-y-1 text-orchid opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100'
              }`}
            >
              {open ? 'close ↓' : 'View chapter ↗'}
            </span>
          </div>
        </div>

        {/* 展开内容 */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="chapter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-dashed border-plum/15 pt-4 sm:flex sm:items-start sm:gap-5">
                <div className="min-w-0 flex-1">
                {bullets && bullets.length > 0 && (
                  <ul className="space-y-2">
                    {bullets.slice(0, 2).map((raw) => {
                      const b = typeof raw === 'string' ? { text: raw } : raw
                      return (
                        <li key={b.text} className="flex gap-2.5 text-[13.5px] leading-relaxed text-plum-muted">
                          {b.logo ? (
                            <span className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-plum/10 bg-white">
                              <img src={b.logo} alt="" loading="lazy" className="max-h-[13px] max-w-[13px] object-contain" />
                            </span>
                          ) : (
                            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                          )}
                          <span>{b.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
                {reflection && (
                  <p className="mt-3 font-hand text-[15px] leading-snug text-plum-muted">
                    <span aria-hidden className="mr-1.5" style={{ color: accent }}>✦</span>
                    {reflection}
                  </p>
                )}
                {relatedWork && (
                  <a
                    href={relatedWork.href}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-orchid/40 bg-lavender/30 px-3.5 py-1.5 text-[12px] font-medium text-plum transition-all duration-300 hover:-translate-y-0.5 hover:border-orchid hover:bg-lavender/60"
                  >
                    {relatedWork.label}
                    <span aria-hidden>→</span>
                  </a>
                )}
                </div>

                {/* 拍立得：展开时带旋转弹簧“甩”出来；多张时叠放，点击换下一张 */}
                {photoList.length > 0 && (
                  <div
                    role={photoList.length > 1 ? 'button' : undefined}
                    title={photoList.length > 1 ? 'Next photo' : undefined}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (photoList.length > 1) setPhotoIdx((i) => (i + 1) % photoList.length)
                    }}
                    className={`relative mx-auto mt-5 h-[152px] w-[124px] shrink-0 sm:mx-0 sm:mt-0 ${
                      photoList.length > 1 ? 'cursor-pointer' : ''
                    }`}
                  >
                    {photoList.map((p, i) => {
                      const pos = (i - photoIdx + photoList.length) % photoList.length // 0 = 顶层
                      const rot = pos === 0 ? (index % 2 ? -6 : 7) : pos === 1 ? -11 : 12
                      return (
                        <motion.figure
                          key={p.src}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55, rotate: 0, y: 18 }}
                          animate={
                            reduce
                              ? { opacity: 1 }
                              : {
                                  opacity: 1,
                                  scale: pos === 0 ? 1 : 0.94,
                                  rotate: rot,
                                  y: pos * -4,
                                  x: pos === 1 ? -7 : pos === 2 ? 7 : 0,
                                }
                          }
                          transition={{ type: 'spring', stiffness: 240, damping: 16, delay: pos === 0 ? 0.18 : 0.26 }}
                          className="absolute inset-x-0 top-0 rounded-[10px] border border-plum/10 bg-white p-1.5 pb-5 shadow-[0_14px_28px_-14px_rgba(90,63,86,0.45)]"
                          style={{ zIndex: photoList.length - pos }}
                        >
                          <img src={p.src} alt={p.alt} loading="lazy" className="h-[104px] w-full rounded-[6px] object-cover" />
                          {p.caption && (
                            <figcaption className="mt-2 truncate text-center font-hand text-[12px] leading-none text-plum-muted">
                              {p.caption}
                            </figcaption>
                          )}
                        </motion.figure>
                      )
                    })}
                    {photoList.length > 1 && (
                      <span
                        aria-hidden
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-[11px] text-plum-faint"
                      >
                        tap ↻ {photoIdx + 1}/{photoList.length}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}
