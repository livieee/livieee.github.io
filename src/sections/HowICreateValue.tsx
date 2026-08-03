import { useEffect, useRef, useState } from 'react'
import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * How I Create Value —— 两段：
 *   ① What I bring to the table：手绘桌子 + 桌面上摆着的工具
 *   ② The hand I'd bring：四张牌背朝上，点一下抽开
 *
 * 视觉留在站点原有的米色 + 衬线体里；道具与牌背全部 SVG 手绘，
 * 不引照片素材，也不复刻任何既有牌面美术。
 * 牌面引文都有出处，来自她自己页面上的说法或她做过的事。
 */

type Card = {
  /** 牌名（底部缎带） */
  name: string
  /** 星顶单字 */
  zi: string
  /** 官方扫图（有则直接用图） */
  img?: string
  suit: 'spark' | 'target' | 'hands' | 'clock' | 'flow' | 'globe' | 'heart'
  title: string
  quote: string
  skills: string[]
}

const HAND: Card[] = [
  {
    name: 'THE CREATE',
    img: '/cards/create.webp',
    zi: '創',
    suit: 'spark',
    title: 'AI Product & Product Operations',
    quote: 'Turning user needs and messy cross-functional input into clear priorities and workflows that ship.',
    skills: ['Product discovery', 'Customer research', 'Product analytics', 'AI workflow design'],
  },
  {
    name: 'THE LIGHT',
    img: '/cards/light.webp',
    zi: '光',
    suit: 'target',
    title: 'GTM Strategy & Adoption',
    quote: 'Connecting what a product can do to the people who need it — launches, narratives, adoption.',
    skills: ['GTM strategy', 'Product launches', 'Metric definition', 'A/B testing & funnels'],
  },
  {
    name: 'THE MIRROR',
    img: '/cards/mirror.webp',
    zi: '鏡',
    suit: 'hands',
    title: 'Strategic Partnerships',
    quote: 'Turning promising conversations into collaborations both sides keep showing up for.',
    skills: ['Partner programs', 'Stakeholder management', 'Executive communication'],
  },
  {
    name: 'THE FLOWER',
    img: '/cards/flower.webp',
    zi: '花',
    suit: 'clock',
    title: 'Ecosystem & Program Execution',
    quote: 'Bringing companies, researchers and communities into the same room — and giving it a shape.',
    skills: ['Developer relations', 'Program design', 'Speaker sourcing', 'Cross-functional execution'],
  },
  {
    name: 'THE SHIELD',
    img: '/cards/shield.webp',
    zi: '盾',
    suit: 'flow',
    title: 'Agentic Coding & Automation',
    quote: 'Traceable, retryable, human-overridable — systems that guard their own quality.',
    skills: ['Agentic coding', 'Data pipelines', 'Vision-model OCR', 'CI & scheduling'],
  },
  {
    name: 'THE DREAM',
    img: '/cards/dream.webp',
    zi: '夢',
    suit: 'globe',
    title: 'Cross-Cultural Fluency',
    quote: 'One dream, spoken in two languages — at home in both US and China AI ecosystems.',
    skills: ['Bilingual 中文 / English', 'US–China ecosystems', 'Community bridge-building'],
  },
  {
    name: 'HOPE',
    img: '/cards/hope.webp',
    zi: '望',
    suit: 'heart',
    title: 'Warmth & Follow-Through',
    quote: 'I follow through and communicate clearly — so people would choose to work together again.',
    skills: ['Trust-building', 'Clear communication', 'Attentive to the room'],
  },
]

function SuitGlyph({ name }: { name: Card['suit'] }) {
  return {
    spark: (
      <>
        <path d="M11 2.6c.7 4 1.9 6.1 5.4 7.4-3.5 1.3-4.7 3.4-5.4 7.4-.7-4-1.9-6.1-5.4-7.4C9.1 8.7 10.3 6.6 11 2.6Z" />
        <path d="M17.6 14.4c.3 1.7.8 2.6 2.3 3.1-1.5.6-2 1.4-2.3 3.1-.3-1.7-.8-2.5-2.3-3.1 1.5-.5 2-1.4 2.3-3.1Z" />
      </>
    ),
    target: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <circle cx="11" cy="11" r="4.4" />
        <circle cx="11" cy="11" r="1" />
      </>
    ),
    hands: (
      <>
        <path d="M2.6 9.4 5.8 6.8l4.1 1.1L13 6.8l4.2 2.5" />
        <path d="M5.8 6.8v7.9c0 .9.8 1.6 1.8 1.5" />
        <path d="M17.2 9.4v6c0 .9-.8 1.6-1.7 1.5" />
        <path d="m8.1 13.1 2.6 2.4c.7.6 1.7.6 2.3-.1l3.6-3.9" />
      </>
    ),
    clock: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <path d="M11 6.2V11l3.4 2.1" />
      </>
    ),
    flow: (
      <>
        <circle cx="5" cy="11" r="2.4" />
        <circle cx="17" cy="5.5" r="2.4" />
        <circle cx="17" cy="16.5" r="2.4" />
        <path d="M7.2 10 14.8 6.4" />
        <path d="M7.2 12 14.8 15.6" />
      </>
    ),
    globe: (
      <>
        <circle cx="11" cy="11" r="8.2" />
        <ellipse cx="11" cy="11" rx="3.6" ry="8.2" />
        <path d="M3.2 11h15.6" />
      </>
    ),
    heart: (
      <path d="M11 18.4C6.2 14.9 3.2 11.9 3.2 8.6 3.2 6.2 5 4.4 7.3 4.4c1.5 0 2.9.8 3.7 2.1.8-1.3 2.2-2.1 3.7-2.1 2.3 0 4.1 1.8 4.1 4.2 0 3.3-3 6.3-7.8 9.8Z" />
    ),
  }[name]
}

function Suit({ name, className = '' }: { name: Card['suit']; className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <SuitGlyph name={name} />
    </svg>
  )
}

function starPath(cx: number, cy: number, R: number, r: number) {
  let d = ''
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (i * Math.PI) / 5 - Math.PI / 2
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `
  }
  return d + 'Z'
}


/** 跟随指针的星杖光标（星头对准指针位置） */
function WandCursor({ pos }: { pos: { x: number; y: number } | null }) {
  if (!pos) return null
  return (
    <span aria-hidden className="pointer-events-none absolute z-40" style={{ left: pos.x, top: pos.y }}>
      <svg
        viewBox="0 0 64 180"
        className="w-[42px]"
        style={{ transform: 'translate(-13px, -12px) rotate(32deg)', transformOrigin: '13px 12px' }}
      >
        <defs>
          <linearGradient id="wand-rod" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4A8C4" />
            <stop offset="1" stopColor="#E88BB0" />
          </linearGradient>
        </defs>
        <rect x="28.5" y="52" width="7" height="118" rx="3.5" fill="url(#wand-rod)" stroke="#D9689A" strokeWidth="0.9" />
        <rect x="27" y="60" width="10" height="7" rx="2" fill="#E8B64C" stroke="#C0913C" strokeWidth="0.8" />
        <rect x="27" y="158" width="10" height="7" rx="2" fill="#E8B64C" stroke="#C0913C" strokeWidth="0.8" />
        <circle cx="32" cy="30" r="21" fill="#FFF7E8" fillOpacity="0.85" stroke="#E8B64C" strokeWidth="3.2" />
        <circle cx="32" cy="30" r="25" fill="none" stroke="#E8B64C" strokeOpacity="0.45" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <circle
            key={deg}
            cx={32 + 25 * Math.cos((deg * Math.PI) / 180)}
            cy={30 + 25 * Math.sin((deg * Math.PI) / 180)}
            r="1.4"
            fill="#E8B64C"
          />
        ))}
        <path d={starPath(32, 30, 12.5, 5.2)} fill="#F7C93C" stroke="#C9951F" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M10 34c4-7 8-9 14-9-5 4-7 8-8 14-3-1-5-2.5-6-5Z" fill="#FFF1F5" stroke="#E8B64C" strokeWidth="0.9" />
        <path d="M54 34c-4-7-8-9-14-9 5 4 7 8 8 14 3-1 5-2.5 6-5Z" fill="#FFF1F5" stroke="#E8B64C" strokeWidth="0.9" />
      </svg>
      <span
        className="absolute -left-[3px] -top-[4px] text-[9px] text-[#E8B64C]"
        style={{ animation: 'star-twinkle 1.6s ease-in-out infinite' }}
      >
        ✦
      </span>
    </span>
  )
}

/** 牌背：大金星罗盘纹章（0.45 竖长比例，与官方扫图一致） */
function CardBack() {
  const star = (cx: number, cy: number, R: number, r: number) => {
    let d = ''
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? R : r
      const a = (i * Math.PI) / 5 - Math.PI / 2
      d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `
    }
    return d + 'Z'
  }
  return (
    <svg viewBox="0 0 160 355" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cb-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4A8C4" />
          <stop offset="1" stopColor="#EF97B8" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="154" height="349" rx="12" fill="url(#cb-pink)" />
      <rect x="10" y="10" width="140" height="335" rx="13" fill="#F6BAD0" stroke="#FFF1F5" strokeWidth="3" />

      {[
        [20, 21],
        [140, 21],
        [20, 334],
        [140, 334],
      ].map(([x, y]) => (
        <path key={`s${x}-${y}`} d={star(x, y, 8.5, 3.6)} fill="#F5C838" stroke="#C9951F" strokeWidth="0.8" strokeLinejoin="round" />
      ))}

      <circle cx="80" cy="177" r="62" fill="#F9D3E1" stroke="#E0447F" strokeWidth="8" />
      <circle cx="80" cy="177" r="53.5" fill="none" stroke="#C13B6E" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="80" cy="177" r="66.5" fill="none" stroke="#C13B6E" strokeWidth="0.8" strokeOpacity="0.55" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return i % 3 === 0 ? null : (
          <circle key={'g' + i} cx={80 + Math.cos(a) * 62} cy={177 + Math.sin(a) * 62} r="1.6" fill="#FFF1F5" fillOpacity="0.9" />
        )
      })}

      <path d="M80 125 L128 177 L80 229 L32 177 Z" fill="none" stroke="#E58AAE" strokeWidth="1.2" />
      <path d="M46 143 L114 143 L114 211 L46 211 Z" fill="none" stroke="#E58AAE" strokeWidth="1.2" />

      <path d={star(80, 177, 36, 14.5)} fill="#F7C93C" stroke="#C9951F" strokeWidth="1.6" strokeLinejoin="round" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
        return (
          <line key={'f' + i} x1="80" y1="177" x2={80 + Math.cos(a) * 36} y2={177 + Math.sin(a) * 36} stroke="#D89B22" strokeWidth="0.9" strokeOpacity="0.8" />
        )
      })}

      <circle cx="21" cy="177" r="11" fill="#F9D3E1" stroke="#E0447F" strokeWidth="3.5" />
      <path d="M17 170a8.5 8.5 0 1 0 9 2 7 7 0 0 1-9-2Z" fill="#F5C838" stroke="#C9951F" strokeWidth="0.7" />
      <circle cx="139" cy="177" r="7" fill="#F5C838" stroke="#C9951F" strokeWidth="0.8" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={'r' + i}
            x1={139 + Math.cos(a) * 8.5}
            y1={177 + Math.sin(a) * 8.5}
            x2={139 + Math.cos(a) * (i % 2 === 0 ? 14 : 11)}
            y2={177 + Math.sin(a) * (i % 2 === 0 ? 14 : 11)}
            stroke="#E8A62B"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        )
      })}

      {[
        [80, 113],
        [80, 241],
      ].map(([x, y]) => (
        <g key={`sh${x}-${y}`}>
          <path
            d={`M${x - 5.5} ${y - 6}h11v6.5c0 3.6-2.4 6-5.5 7.5-3.1-1.5-5.5-3.9-5.5-7.5Z`}
            fill="#B3222E"
            stroke="#7E1620"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <circle cx={x} cy={y} r="1.6" fill="#F5C838" />
        </g>
      ))}
    </svg>
  )
}

/** 牌面中央的象征物画（原创绘制，粉白 + 金，置于深粉画框内） */
function CardArt({ name }: { name: string }) {
  switch (name) {
    case 'THE CREATE': // 打开的书
      return (
        <g stroke="#B03A66" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-54 8C-46 -10 -20 -18 -2 -13L-2 46C-20 41 -46 46 -54 32Z" fill="#FBEAF0" />
          <path d="M54 8C46 -10 20 -18 2 -13L2 46C20 41 46 46 54 32Z" fill="#F7D3E0" />
          <path d="M-2 -13L-2 46M2 -13L2 46" strokeWidth="1.2" />
          <path d="M-42 4c10 -7 24 -9 34 -6M-42 14c10 -7 24 -9 34 -6M-42 24c10 -7 24 -9 34 -6" fill="none" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M42 4c-10 -7 -24 -9 -34 -6M42 14c-10 -7 -24 -9 -34 -6M42 24c-10 -7 -24 -9 -34 -6" fill="none" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M0 -34l3.2 6.6 6.6 3.2-6.6 3.2-3.2 6.6-3.2-6.6-6.6-3.2 6.6-3.2Z" fill="#F5C838" stroke="#C9951F" strokeWidth="1" />
        </g>
      )
    case 'THE LIGHT': // 放光的日轮
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            const long = i % 2 === 0
            return (
              <path
                key={i}
                d={`M${Math.cos(a - 0.16) * 26} ${Math.sin(a - 0.16) * 26} L${Math.cos(a) * (long ? 52 : 40)} ${Math.sin(a) * (long ? 52 : 40)} L${Math.cos(a + 0.16) * 26} ${Math.sin(a + 0.16) * 26} Z`}
                fill={long ? '#F5C838' : '#F7D3E0'}
                stroke="#C9951F"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            )
          })}
          <circle cx="0" cy="0" r="24" fill="#F5C838" stroke="#C9951F" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="17" fill="none" stroke="#C9951F" strokeWidth="0.8" strokeOpacity="0.6" />
        </g>
      )
    case 'THE MIRROR': // 立镜
      return (
        <g stroke="#B03A66" strokeLinejoin="round" strokeLinecap="round">
          <ellipse cx="0" cy="2" rx="34" ry="46" fill="#F2A9C4" strokeWidth="1.8" />
          <ellipse cx="0" cy="2" rx="25" ry="37" fill="#FBEAF0" strokeWidth="1.2" />
          <path d="M-12 -18L4 24M-2 -24L14 18" stroke="#FFFFFF" strokeWidth="4" strokeOpacity="0.75" />
          <path d="M-10 -46l10 -8 10 8-10 6Z" fill="#F5C838" stroke="#C9951F" strokeWidth="1" />
          <path d="M-14 52c8 -6 20 -6 28 0" fill="none" strokeWidth="1.6" />
        </g>
      )
    case 'THE FLOWER': // 盛开的樱花
      return (
        <g stroke="#B03A66" strokeWidth="1.2" strokeLinejoin="round">
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d="M0 -8C-14 -22 -12 -40 0 -46 12 -40 14 -22 0 -8Z"
              fill={i % 2 === 0 ? '#F7D3E0' : '#FBEAF0'}
              transform={`rotate(${i * 72})`}
            />
          ))}
          <circle cx="0" cy="0" r="9" fill="#F5C838" stroke="#C9951F" />
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={'d' + i} cx={Math.cos((i / 5) * Math.PI * 2) * 13} cy={Math.sin((i / 5) * Math.PI * 2) * 13} r="1.6" fill="#C9951F" stroke="none" />
          ))}
          <path d="M-46 34c4 -6 12 -6 14 0-6 4 -12 2 -14 0Z" fill="#F7D3E0" strokeWidth="0.9" />
          <path d="M40 -40c3 -5 10 -5 12 0-5 3 -10 2 -12 0Z" fill="#FBEAF0" strokeWidth="0.9" />
        </g>
      )
    case 'THE SHIELD': // 带翼的盾
      return (
        <g stroke="#B03A66" strokeLinejoin="round" strokeLinecap="round">
          <path d="M2 -50C26 -42 32 -14 28 10 25 30 15 44 2 52-16 40 -28 22 -28 -6-28 -30 -16 -44 2 -50Z" fill="#FBEAF0" strokeWidth="1.8" />
          <path d="M-2 -46c-22 -12 -44 -6 -50 8 10 0 18 2 24 8-8 2 -14 6 -18 12 12 2 24 -2 32 -10Z" fill="#F7D3E0" strokeWidth="1.2" />
          <path d="M-6 -32c-16 -6 -30 -2 -36 6 8 0 14 2 20 6Z" fill="#FBEAF0" strokeWidth="0.9" />
          <circle cx="2" cy="-8" r="11" fill="#E4485C" strokeWidth="1.6" />
          <circle cx="-2" cy="-12" r="3" fill="#FFFFFF" stroke="none" opacity="0.85" />
          <path d="M2 14v22M-8 4h20" strokeWidth="1" strokeOpacity="0.5" />
        </g>
      )
    case 'THE DREAM': // 月与星
      return (
        <g stroke="#B03A66" strokeLinejoin="round">
          <path d="M14 -44A40 40 0 1 0 34 22 32 32 0 0 1 14 -44Z" fill="#F5C838" stroke="#C9951F" strokeWidth="1.6" />
          <path d="M-30 -30l2.6 5.4 5.4 2.6-5.4 2.6-2.6 5.4-2.6-5.4-5.4-2.6 5.4-2.6Z" fill="#F7D3E0" strokeWidth="1" />
          <path d="M-16 6l2 4.2 4.2 2-4.2 2-2 4.2-2-4.2-4.2-2 4.2-2Z" fill="#FBEAF0" strokeWidth="0.9" />
          <path d="M-40 36c0 -6 6 -10 12 -8 2 -6 12 -6 14 0 6 -2 12 2 12 8Z" fill="#FBEAF0" strokeWidth="1.2" />
        </g>
      )
    default: // HOPE — 带翼的红心 + 小皇冠
      return (
        <g stroke="#B03A66" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-22 -18c-14 -10 -34 -4 -38 8 8 -1 14 1 20 6-6 2 -11 5 -14 10 10 1 20 -3 26 -10Z" fill="#FBEAF0" strokeWidth="1.2" />
          <path d="M22 -18c14 -10 34 -4 38 8-8 -1 -14 1 -20 6 6 2 11 5 14 10-10 1 -20 -3 -26 -10Z" fill="#FBEAF0" strokeWidth="1.2" />
          <path d="M0 38C-28 16 -32 -6 -17 -16-7 -22 0 -15 0 -5 0 -15 7 -22 17 -16 32 -6 28 16 0 38Z" fill="#E4485C" strokeWidth="1.8" />
          <path d="M-8 -2c-3 -5 -1 -10 3 -12" stroke="#FFFFFF" strokeWidth="2.4" strokeOpacity="0.8" fill="none" />
          <path d="M-11 -34l4 8 7 -8 7 8 4 -8 2 12h-26Z" fill="#F5C838" stroke="#C9951F" strokeWidth="1.1" />
        </g>
      )
  }
}

/** 牌面（自绘版，供缺扫图的牌用）：星顶汉字 + 深粉画框 + 象征物画 + 缎带名牌 */
function CardFace({ card, content = false }: { card: Card; content?: boolean }) {
  return (
    <svg viewBox="0 0 244 540" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cf-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5AFC9" />
          <stop offset="1" stopColor="#EE9BBB" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="244" height="540" rx="16" fill="url(#cf-pink)" />
      <rect x="13" y="15" width="218" height="510" rx="11" fill="#FFF6EE" stroke="#EFB8CD" strokeWidth="1" />
      <rect x="23" y="28" width="198" height="438" rx="14" fill="none" stroke="#EE86AD" strokeWidth="5" />
      <rect x="27" y="32" width="190" height="430" rx="12" fill={content ? '#FFF9F3' : '#CE4E82'} stroke="#A83464" strokeWidth="2" />

      {/* 左日 右月 */}
      <circle cx="23" cy="250" r="8" fill="#F5C838" stroke="#C9951F" strokeWidth="0.9" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a2 = (i / 10) * Math.PI * 2
        return (
          <line
            key={'sr' + i}
            x1={23 + Math.cos(a2) * 9.5}
            y1={250 + Math.sin(a2) * 9.5}
            x2={23 + Math.cos(a2) * 15}
            y2={250 + Math.sin(a2) * 15}
            stroke="#E8A62B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )
      })}
      <path d="M215 238a13.5 13.5 0 1 0 12 5 11 11 0 0 1-12-5Z" fill="#F5C838" stroke="#C9951F" strokeWidth="1" />

      {/* 中央象征物（content 版不画，留给文字） */}
      {!content && (
        <g transform="translate(122 240)">
          <CardArt name={card.name} />
        </g>
      )}

      {/* 底部金星 + 缎带名牌 */}
      <path d={starPath(122, 462, 13, 5.4)} fill="#F7C93C" stroke="#C9951F" strokeWidth="1" strokeLinejoin="round" />
      <path d="M46 476 L26 487 L46 498 Z" fill="#E87BA4" stroke="#A83464" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M198 476 L218 487 L198 498 Z" fill="#E87BA4" stroke="#A83464" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="44" y="470" width="156" height="32" rx="4" fill="#F09CBC" stroke="#A83464" strokeWidth="1.6" />
      <text
        x="122"
        y="492"
        textAnchor="middle"
        fontSize="16"
        letterSpacing="2.5"
        fill="#43202E"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 700 }}
      >
        {card.name}
      </text>
      <text
        x="122"
        y="521"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="5"
        fill="#B03A66"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 600 }}
      >
        OLIVIA
      </text>

      {/* 星顶汉字 */}
      <path d={starPath(122, 34, 30, 12.4)} fill="#F7C93C" stroke="#C9951F" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="122" y="42" textAnchor="middle" fontSize="21" fill="#3F2430" style={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}>
        {card.zi}
      </text>
    </svg>
  )
}

/* ── 桌上的工具：只列有据可查的 ──────────────────────────────── */
/** 法阵上的摆法：外环 12 枚符印、内环 9 枚，坐标是百分比（圆心 50,50） */
const PLATE = [
  // 外环 r=44%，从正上方起每 30°
  { n: 'Claude', c: 'AI', l: '/logos/tools/claude.jpg', x: 50, y: 6 },
  { n: 'Cursor', c: 'AI coding', l: '/logos/tools/cursor.png', x: 72, y: 11.9 },
  { n: 'OpenAI', c: 'AI', l: '/logos/tools/openai.png', x: 88.1, y: 28 },
  { n: 'Figma', c: 'design', l: '/logos/tools/figma.jpg', x: 94, y: 50 },
  { n: 'Notion', c: 'docs & specs', l: '/logos/tools/notion.jpg', x: 88.1, y: 72 },
  { n: 'Python', c: 'code', l: '/logos/tools/python.png', x: 72, y: 88.1 },
  { n: 'GitHub Actions', c: 'automation', l: '/logos/tools/github.jpg', x: 50, y: 94 },
  { n: 'Luma', c: 'events', l: '/logos/tools/luma.jpg', x: 28, y: 88.1 },
  { n: 'Vercel', c: 'deploy', l: '/logos/tools/vercel.png', x: 11.9, y: 72 },
  { n: 'Discord', c: 'community', l: '/logos/tools/discord.jpg', x: 6, y: 50 },
  { n: 'LinkedIn', c: 'outreach', l: '/logos/tools/linkedin.png', x: 11.9, y: 28 },
  { n: 'X', c: 'outreach', l: '/logos/tools/x.png', x: 28, y: 11.9 },
  // 内环 r=22%，从正上方起每 40°
  { n: 'LangGraph', c: 'agents', l: '/logos/tools/langgraph.png', x: 50, y: 28 },
  { n: 'Replit', c: 'prototyping', l: '/logos/tools/replit.png', x: 64.1, y: 33.1 },
  { n: 'Tableau', c: 'data viz', l: '/logos/tools/tableau.jpg', x: 71.7, y: 46.2 },
  { n: 'Streamlit', c: 'data apps', l: '/logos/tools/streamlit.png', x: 69.1, y: 61 },
  { n: 'Cloudflare', c: 'infra', l: '/logos/tools/cloudflare.png', x: 57.5, y: 70.7 },
  { n: 'Databricks', c: 'data', l: '/logos/tools/databricks.png', x: 42.5, y: 70.7 },
  { n: 'Google Cloud', c: 'cloud', l: '/logos/tools/gcloud.png', x: 30.9, y: 61 },
  { n: 'Airtable', c: 'ops', l: '/logos/tools/airtable.png', x: 28.3, y: 46.2 },
  { n: 'Miro', c: 'workshops', l: '/logos/tools/miro.jpg', x: 35.9, y: 33.1 },
]

/** 工具法阵 —— 和牌阵地面的金色魔法阵同一套语言 */
function ToolSeal({ className = '' }: { className?: string }) {
  const G = '#C9A05C'
  const ticks = Array.from({ length: 28 }).map((_, i) => {
    const a = (i / 28) * Math.PI * 2
    return { x: 100 + Math.cos(a) * 82, y: 100 + Math.sin(a) * 82 }
  })
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      {/* 中心淡粉光 */}
      <defs>
        <radialGradient id="toolseal-wash" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F8BFD3" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#F8BFD3" stopOpacity="0.12" />
          <stop offset="1" stopColor="#F8BFD3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#toolseal-wash)" />

      {/* 外环两圈 + 刻度点 */}
      <circle cx="100" cy="100" r="97" stroke={G} strokeOpacity="0.55" strokeWidth="1.1" />
      <circle cx="100" cy="100" r="92" stroke={G} strokeOpacity="0.3" strokeWidth="0.7" />
      {ticks.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r="1.1" fill={G} fillOpacity="0.5" />
      ))}
      <circle cx="100" cy="100" r="76" stroke={G} strokeOpacity="0.22" strokeWidth="0.7" strokeDasharray="2 5" />

      {/* 内环 + 八芒星（两个错位正方形） */}
      <circle cx="100" cy="100" r="52" stroke={G} strokeOpacity="0.5" strokeWidth="0.9" />
      <rect x="63.2" y="63.2" width="73.5" height="73.5" stroke={G} strokeOpacity="0.4" strokeWidth="0.8" />
      <rect
        x="63.2"
        y="63.2"
        width="73.5"
        height="73.5"
        stroke={G}
        strokeOpacity="0.4"
        strokeWidth="0.8"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="30" stroke={G} strokeOpacity="0.35" strokeWidth="0.7" />

      {/* 日月 —— 呼应卡面 */}
      <circle cx="34" cy="100" r="7" stroke={G} strokeOpacity="0.55" strokeWidth="0.9" />
      <path d="M32 94.6a7 7 0 1 0 4.8 12.2 8.6 8.6 0 0 1-4.8-12.2Z" fill={G} fillOpacity="0.4" />
      <circle cx="166" cy="100" r="6" fill={G} fillOpacity="0.45" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <line
            key={'r' + i}
            x1={166 + Math.cos(a) * 8}
            y1={100 + Math.sin(a) * 8}
            x2={166 + Math.cos(a) * 11.5}
            y2={100 + Math.sin(a) * 11.5}
            stroke={G}
            strokeOpacity="0.5"
            strokeWidth="0.9"
          />
        )
      })}

      {/* 中央金星 */}
      <path d={starPath(100, 100, 16, 6.5)} fill="#E8B64C" fillOpacity="0.85" stroke="#C0913C" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="2.2" fill="#FFF3D8" />
    </svg>
  )
}

export function HowICreateValue() {
  const [active, setActive] = useState<number | null>(null)
  const [dealt, setDealt] = useState(false)
  const [flash, setFlash] = useState(false)
  const [wand, setWand] = useState<{ x: number; y: number } | null>(null)
  const [wandTool, setWandTool] = useState<{ x: number; y: number } | null>(null)
  const [sealPaused, setSealPaused] = useState(false)
  const putBack = () => {
    setActive(null)
    setFlash(true)
    window.setTimeout(() => setFlash(false), 950)
  }
  const fanRef = useRef<HTMLDivElement>(null)

  // 进入视口时才「发牌」：四张从法阵中心散开
  useEffect(() => {
    const el = fanRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDealt(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">How I Work</p>
      </Reveal>
      <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
        <WordReveal text="The magic" />{' '}
        <span className="italic text-orchid">
          <WordReveal text="behind the work." delay={0.3} />
        </span>
      </h2>

      {/* ── ① 四个领域：环形牌阵，点击抽出 ─────────────────────── */}
      <Reveal className="mt-16">
        <p className="text-center font-hand text-[17px] text-plum-muted">
          {active === null ? 'go on — draw one ✦' : 'tap it again to put it back ✦'}
        </p>
      </Reveal>

      <Reveal className="mt-4" y={30}>
        <div
          ref={fanRef}
          data-wand
          className="relative mx-auto h-[430px] w-full max-w-5xl cursor-none select-none md:h-[590px] [&_button]:cursor-none"
          onPointerMove={(e) => {
            if (e.pointerType === 'touch') return
            const r = e.currentTarget.getBoundingClientRect()
            setWand({ x: e.clientX - r.left, y: e.clientY - r.top })
          }}
          onPointerLeave={() => setWand(null)}
          style={{ perspective: '2100px' }}
        >
          {/* 地面法阵 */}
          <svg
            viewBox="0 0 800 300"
            className="pointer-events-none absolute bottom-[4%] left-1/2 w-[680px] max-w-[94%] -translate-x-1/2"
            fill="none"
            aria-hidden
            style={{
              transition: 'filter .6s, opacity .6s',
              opacity: active !== null ? 1 : 0.9,
              filter: active !== null ? 'drop-shadow(0 0 12px rgba(199,154,75,0.4))' : 'none',
            }}
          >
            <ellipse cx="400" cy="150" rx="380" ry="120" stroke="#C9A45C" strokeOpacity="0.8" strokeWidth="2.4" />
            <ellipse cx="400" cy="150" rx="356" ry="112" stroke="#C9A45C" strokeOpacity="0.55" strokeWidth="1.2" />
            {Array.from({ length: 28 }).map((_, i) => {
              const a2 = (i / 28) * Math.PI * 2
              return (
                <line
                  key={'tick' + i}
                  x1={400 + Math.cos(a2) * 356}
                  y1={150 + Math.sin(a2) * 112}
                  x2={400 + Math.cos(a2) * 380}
                  y2={150 + Math.sin(a2) * 120}
                  stroke="#C9A45C"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              )
            })}
            {/* 八芒罗盘（两个套叠方形的投影） */}
            <path d="M400 57 L700 150 L400 243 L100 150 Z" stroke="#D193A8" strokeOpacity="0.5" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
            <path d="M188 84 L612 84 L612 216 L188 216 Z" stroke="#D193A8" strokeOpacity="0.5" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
            <ellipse cx="400" cy="150" rx="366" ry="115" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="0.9" strokeDasharray="7 11" />
            <ellipse cx="400" cy="150" rx="322" ry="101" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="1" />
            <ellipse cx="400" cy="150" rx="236" ry="74" stroke="#C9A45C" strokeOpacity="0.4" strokeWidth="1" />
            <ellipse cx="400" cy="150" rx="150" ry="47" stroke="#C9A45C" strokeOpacity="0.3" strokeWidth="0.9" strokeDasharray="4 8" />
            <ellipse cx="400" cy="150" rx="60" ry="19" stroke="#C9A45C" strokeOpacity="0.55" strokeWidth="1.2" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a3 = (i / 12) * Math.PI * 2
              return (
                <line
                  key={'sun' + i}
                  x1={400 + Math.cos(a3) * 66}
                  y1={150 + Math.sin(a3) * 21}
                  x2={400 + Math.cos(a3) * 88}
                  y2={150 + Math.sin(a3) * 28}
                  stroke="#C9A45C"
                  strokeOpacity="0.5"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              )
            })}
            <circle cx="400" cy="150" r="4.5" fill="#C9A45C" fillOpacity="0.6" />
            {/* 六芒星 */}
            <path d="M400 56 659.8 197 140.2 197Z" stroke="#C9A45C" strokeOpacity="0.42" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M400 244 659.8 103 140.2 103Z" stroke="#C9A45C" strokeOpacity="0.42" strokeWidth="1.1" strokeLinejoin="round" />
            {/* 小行星轨道 */}
            <circle cx="636" cy="106" r="26" stroke="#C9A45C" strokeOpacity="0.5" strokeWidth="0.9" />
            <circle cx="636" cy="106" r="14" stroke="#C9A45C" strokeOpacity="0.35" strokeWidth="0.7" />
            <circle cx="636" cy="106" r="4" fill="#C9A45C" fillOpacity="0.65" />
            {/* 方位 */}
            {[
              { t: '北', x: 400, y: 34 },
              { t: '南', x: 400, y: 274 },
              { t: '東', x: 758, y: 156 },
              { t: '西', x: 42, y: 156 },
            ].map((m) => (
              <g key={m.t}>
                <circle cx={m.x} cy={m.y - 6} r="15" stroke="#C9A45C" strokeOpacity="0.5" strokeWidth="0.9" />
                <text
                  x={m.x}
                  y={m.y}
                  textAnchor="middle"
                  fontSize="16"
                  fill="#D9B87A"
                  fillOpacity="0.9"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {m.t}
                </text>
              </g>
            ))}
          </svg>

          {/* 樱花瓣 */}
          {[
            { left: 5, size: 16, dur: 10.5, delay: 0 },
            { left: 13, size: 12, dur: 13, delay: 2.4 },
            { left: 22, size: 19, dur: 9.5, delay: 5 },
            { left: 31, size: 13, dur: 14.5, delay: 1.2 },
            { left: 40, size: 17, dur: 11, delay: 3.8 },
            { left: 49, size: 11, dur: 15.5, delay: 6.6 },
            { left: 58, size: 18, dur: 10, delay: 2 },
            { left: 67, size: 13, dur: 13.5, delay: 4.4 },
            { left: 76, size: 20, dur: 9, delay: 0.8 },
            { left: 85, size: 12, dur: 14, delay: 5.8 },
            { left: 92, size: 16, dur: 11.5, delay: 3 },
            { left: 97, size: 11, dur: 12.5, delay: 7.4 },
            { left: 18, size: 22, dur: 12, delay: 8.6 },
            { left: 63, size: 21, dur: 13.8, delay: 9.5 },
          ].map((pt, i) => (
            <svg
              key={'p' + i}
              viewBox="0 0 20 20"
              aria-hidden
              className="pointer-events-none absolute -top-3 z-20"
              style={{
                left: `${pt.left}%`,
                width: pt.size,
                height: pt.size,
                animation: `petal-drift ${pt.dur}s ${pt.delay}s linear infinite`,
              }}
            >
              <defs>
                <linearGradient id={'petal' + i} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={i % 3 === 0 ? '#FBD0DF' : '#F8BFD3'} />
                  <stop offset="1" stopColor={i % 3 === 1 ? '#EE8FB4' : '#F3A3C2'} />
                </linearGradient>
              </defs>
              <path
                d="M10 17C6 13 4.2 9 5.6 5.6 6.9 2.9 9 2.3 10 4.2 11 2.3 13.1 2.9 14.4 5.6 15.8 9 14 13 10 17Z"
                fill={'url(#petal' + i + ')'}
                stroke="#E87BA4"
                strokeOpacity="0.45"
                strokeWidth="0.5"
              />
            </svg>
          ))}


          <WandCursor pos={wand} />

          <div className="ring-scale absolute inset-0">
          {/* 牌圈后的暖金光 */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(233,199,120,0.2) 0%, rgba(233,199,120,0.08) 45%, rgba(255,255,255,0) 68%)',
              animation: 'glow-soft 5.5s ease-in-out infinite',
            }}
          />

          {/* 环形牌阵 */}
          <div
            className="absolute left-1/2 top-[42%]"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -46%) rotateX(15deg)',
            }}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: 'ring-spin 50s linear infinite',
                animationPlayState: active === null && dealt ? 'running' : 'paused',
              }}
            >
              {HAND.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Draw ${c.name} — ${c.title}`}
                  className="absolute left-1/2 top-1/2 h-[310px] w-[140px] outline-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: !dealt
                      ? `translate(-50%, -50%) rotate(${(i - 3) * 2.5}deg) scale(0.92)`
                      : `translate(-50%, -50%) rotateY(${(i * 360) / 7}deg) translateZ(252px)`,
                    transition: 'transform .95s cubic-bezier(.2,.75,.2,1)',
                    transitionDelay: dealt ? `${i * 0.1}s` : '0s',
                    pointerEvents: dealt && active === null ? 'auto' : 'none',
                  }}
                >
                  <span
                    className="relative block h-full w-full transition-transform duration-300 hover:scale-[1.045]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <span
                      className="absolute inset-0 overflow-hidden rounded-[1rem] shadow-[0_16px_36px_-16px_rgba(58,36,64,0.42)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg) translateZ(0.4px)',
                        opacity: active === i ? 0 : active !== null ? 0.25 : 1,
                        transition: 'opacity .5s',
                      }}
                    >
                      <CardBack />
                    </span>
                    <span
                      className="absolute inset-0 overflow-hidden rounded-[1rem] shadow-[0_16px_36px_-16px_rgba(58,36,64,0.42)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(0.4px)',
                        opacity: active === i ? 0 : active !== null ? 0.25 : 1,
                        transition: 'opacity .5s',
                      }}
                    >
                      {c.img ? (
                        <img src={c.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <CardFace card={c} />
                      )}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 收牌时的粉色绽放 */}
          {flash && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[3%] left-1/2 h-[150px] w-[660px] max-w-[92%] -translate-x-1/2 rounded-[50%] border-2 border-rose/60"
                style={{ animation: 'seal-cast .95s ease-out both' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[43%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(209,147,168,0.4) 0%, rgba(246,181,205,0.2) 45%, rgba(255,255,255,0) 70%)',
                  animation: 'pink-bloom .95s ease-out both',
                }}
              />
            </>
          )}

          </div>

          {/* 抽出的牌 */}
          {active !== null && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[3%] left-1/2 h-[150px] w-[660px] max-w-[92%] -translate-x-1/2 rounded-[50%] border border-[#E9C778]/60"
                style={{ animation: 'seal-cast 1.1s ease-out both' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[43%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(199,154,75,0.2) 0%, rgba(209,147,168,0.12) 45%, rgba(255,255,255,0) 70%)',
                  animation: 'halo-in .8s ease-out both, glow-soft 2.8s 1s ease-in-out infinite',
                }}
              />
              {[
                { tx: '-150px', ty: '-90px' },
                { tx: '150px', ty: '-84px' },
                { tx: '-180px', ty: '30px' },
                { tx: '182px', ty: '36px' },
                { tx: '-70px', ty: '-160px' },
                { tx: '76px', ty: '-166px' },
              ].map((sp, i) => (
                <span
                  key={'spark' + i}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[43%] z-40 text-[15px] text-[#E9B54C]"
                  style={
                    {
                      '--tx': sp.tx,
                      '--ty': sp.ty,
                      animation: `sparkle-burst .9s ${0.35 + i * 0.05}s ease-out both`,
                    } as React.CSSProperties
                  }
                >
                  ✦
                </span>
              ))}
              <button
                type="button"
                onClick={putBack}
                aria-label={`${HAND[active].title} — tap to put back`}
                className="absolute left-1/2 top-[43%] z-30 h-[430px] w-[195px] -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ perspective: '1300px' }}
              >
                <span
                  className="relative block h-full w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    animation: 'card-reveal 1.15s cubic-bezier(.25,.7,.25,1) both',
                  }}
                >
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_26px_54px_-22px_rgba(58,36,64,0.45)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardBack />
                  </span>

                  {/* 牌面（混合版：奶白面板 + 深梅文字） */}
                  <span
                    className="absolute inset-0 overflow-hidden rounded-[1.1rem] shadow-[0_26px_54px_-22px_rgba(58,36,64,0.45)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <CardFace card={HAND[active]} content />
                    <span className="absolute bottom-[17%] left-[13%] right-[13%] top-[13%] flex flex-col items-center text-center">
                      <span className="flex items-center justify-center text-[#B03A66]">
                        <Suit name={HAND[active].suit} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="mt-2 block font-serif text-[15.5px] font-medium leading-snug text-plum">
                        {HAND[active].title}
                      </span>
                      <span aria-hidden className="mt-2 flex w-3/4 items-center gap-2">
                        <span className="h-px flex-1 bg-[#C9A05C]/55" />
                        <span className="text-[8px] text-[#C0913C]">◆</span>
                        <span className="h-px flex-1 bg-[#C9A05C]/55" />
                      </span>
                      <span className="mt-2 block font-hand text-[13px] leading-snug text-plum-muted">
                        “{HAND[active].quote}”
                      </span>
                      <span className="mt-auto block space-y-1 pb-1">
                        {HAND[active].skills.map((sk) => (
                          <span key={sk} className="flex items-baseline justify-center gap-1.5 text-[11px] text-plum-muted">
                            <span aria-hidden className="text-[8.5px] text-[#C0913C]">✦</span>
                            {sk}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </button>

            </>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-24">
        <p className="text-center font-hand text-[16px] text-plum-muted">
          … and these are what I reach for to do it ↓
        </p>
      </Reveal>

      {/* ── ② 工具法阵：What I bring to the table ───────────────── */}
      <Reveal className="mt-8" y={28}>
        <div
          data-wand
          className="relative cursor-none"
          onPointerMove={(e) => {
            if (e.pointerType === 'touch') return
            const r = e.currentTarget.getBoundingClientRect()
            setWandTool({ x: e.clientX - r.left, y: e.clientY - r.top })
          }}
          onPointerLeave={() => setWandTool(null)}
        >
          <WandCursor pos={wandTool} />
          {/* 左翼：搁着的一叠牌 */}
          <div
            aria-hidden
            className="absolute left-[1%] top-1/2 hidden -translate-y-1/2 xl:block 2xl:left-[3%]"
            style={{ animation: 'annot-in .7s .35s ease-out both' }}
          >
            <div className="relative h-[158px] w-[112px]">
              {[
                { pos: 'left-10 top-3', rot: '-rotate-[16deg]', delay: 0, dur: 5.4 },
                { pos: 'left-5 top-1.5', rot: '-rotate-[7deg]', delay: 1.1, dur: 6.2 },
                { pos: 'left-0 top-0', rot: 'rotate-[3deg]', delay: 2.3, dur: 5.8 },
              ].map((c, i) => (
                <span key={i} className={`absolute ${c.pos} h-[134px] w-[60px]`}>
                  <span
                    className="block h-full w-full"
                    style={{ animation: `float-soft ${c.dur}s ${c.delay}s ease-in-out infinite` }}
                  >
                    <span
                      className={`block h-full w-full ${c.rot} overflow-hidden rounded-[7px] shadow-[0_12px_26px_-10px_rgba(206,78,130,0.55)]`}
                    >
                      <CardBack />
                    </span>
                  </span>
                </span>
              ))}
              <span
                aria-hidden
                className="absolute -right-1 -top-2 text-[11px] text-[#E8B64C]"
                style={{ animation: 'star-twinkle 2.8s .6s ease-in-out infinite' }}
              >
                ✦
              </span>
            </div>
          </div>

          {/* 右翼：翻开的魔法书（浮动 + 页面法阵自转 + 星光） */}
          <svg
            aria-hidden
            viewBox="0 0 150 110"
            className="absolute right-[0%] top-1/2 hidden w-[132px] -translate-y-1/2 rotate-[6deg] xl:block 2xl:right-[2%]"
            style={{ animation: 'float-soft 6.5s .8s ease-in-out infinite' }}
          >
            {/* 封底 */}
            <path d="M8 22C30 10 60 8 75 16 90 8 120 10 142 22l-4 66c-20-9-46-8-63 2-17-10-43-11-63-2Z" fill="#EF97B8" stroke="#D9689A" strokeWidth="1.4" />
            {/* 书页 */}
            <path d="M14 24C33 14 60 13 75 21l-2 62c-14-7-38-6-61 2Z" fill="#FFF9F3" stroke="#E3C08A" strokeWidth="1" />
            <path d="M136 24C117 14 90 13 75 21l2 62c14-7 38-6 61 2Z" fill="#FFF6EC" stroke="#E3C08A" strokeWidth="1" />
            {/* 左页：法阵小图（自转） */}
            <g style={{ animation: 'spin-slow 26s linear infinite', transformOrigin: '44px 48px', transformBox: 'view-box' } as React.CSSProperties}>
              <circle cx="44" cy="48" r="15" fill="none" stroke="#C9A05C" strokeOpacity="0.7" strokeWidth="1" />
              <circle cx="44" cy="48" r="10.5" fill="none" stroke="#C9A05C" strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="2 3" />
              <path d={starPath(44, 48, 6.5, 2.7)} fill="#F7C93C" stroke="#C9951F" strokeWidth="0.7" strokeLinejoin="round" />
            </g>
            {/* 右页：字行 */}
            {[34, 42, 50, 58, 66].map((y, i) => (
              <line key={y} x1="86" y1={y + 2} x2={i % 2 === 0 ? 126 : 118} y2={y} stroke="#B9A98F" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
            ))}
            {/* 书签带 */}
            <path d="M100 84l3 14 5-6 6 4-3-13Z" fill="#E0447F" fillOpacity="0.8" />
            {/* 翻页时投在右页上的浮影 */}
            <path
              d="M136 24C117 14 90 13 75 21l2 62c14-7 38-6 61 2Z"
              fill="#8A6E84"
              style={
                {
                  animation: 'page-turn-shadow 7s ease-in-out infinite',
                  transformOrigin: '76px 52px',
                  transformBox: 'view-box',
                } as React.CSSProperties
              }
            />
            {/* 翻动的书页：绕书脊从右翻到左 */}
            <g
              style={
                {
                  animation: 'page-turn 7s ease-in-out infinite',
                  transformOrigin: '76px 52px',
                  transformBox: 'view-box',
                } as React.CSSProperties
              }
            >
              <path d="M136 24C117 14 90 13 75 21l2 62c14-7 38-6 61 2Z" fill="#FFF4E2" stroke="#E3C08A" strokeWidth="1" />
              {[34, 42, 50, 58, 66].map((y, i) => (
                <line
                  key={'tp' + y}
                  x1="86"
                  y1={y + 2}
                  x2={i % 2 === 0 ? 124 : 116}
                  y2={y}
                  stroke="#C9B394"
                  strokeOpacity="0.55"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              ))}
            </g>
            {/* 页边金饰 */}
            <path d="M20 30c3-2 6-3 9-3M121 27c3 0 6 1 9 3" stroke="#E8B64C" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span
            aria-hidden
            className="absolute right-[4%] top-[38%] hidden text-[12px] text-[#E8B64C] xl:block"
            style={{ animation: 'star-twinkle 3s .4s ease-in-out infinite' }}
          >
            ✦
          </span>
          <span
            aria-hidden
            className="absolute right-[1.5%] top-[44%] hidden text-[8px] text-[#E8B64C] xl:block"
            style={{ animation: 'star-twinkle 2.4s 1.5s ease-in-out infinite' }}
          >
            ✦
          </span>

          {/* 两翼氛围星 */}
          {[
            { left: '7%', top: '22%', size: 13, delay: 0 },
            { left: '13%', top: '58%', size: 9, delay: 1.6 },
            { left: '20%', top: '34%', size: 7, delay: 3.1 },
            { left: '9%', top: '80%', size: 8, delay: 2.2 },
            { left: '80%', top: '26%', size: 8, delay: 0.9 },
            { left: '90%', top: '46%', size: 13, delay: 2.7 },
            { left: '84%', top: '72%', size: 9, delay: 4.2 },
            { left: '93%', top: '14%', size: 7, delay: 1.2 },
          ].map((st, i) => (
            <span
              key={'as' + i}
              aria-hidden
              className="pointer-events-none absolute hidden text-[#E8B64C] md:block"
              style={{
                left: st.left,
                top: st.top,
                fontSize: st.size,
                animation: `star-twinkle 3.6s ${st.delay}s ease-in-out infinite`,
              }}
            >
              ✦
            </span>
          ))}
          {/* 飘落的樱花瓣 */}
          {[
            { left: 8, size: 14, dur: 12, delay: 0.6 },
            { left: 24, size: 18, dur: 10, delay: 3.2 },
            { left: 47, size: 12, dur: 14, delay: 1.4 },
            { left: 68, size: 17, dur: 11, delay: 5 },
            { left: 88, size: 13, dur: 13, delay: 2.2 },
          ].map((pt, i) => (
            <svg
              key={'tp' + i}
              viewBox="0 0 20 20"
              aria-hidden
              className="pointer-events-none absolute -top-2 z-20"
              style={{
                left: `${pt.left}%`,
                width: pt.size,
                height: pt.size,
                animation: `petal-drift ${pt.dur}s ${pt.delay}s linear infinite`,
              }}
            >
              <defs>
                <linearGradient id={'toolpetal' + i} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={i % 2 === 0 ? '#FBD0DF' : '#F8BFD3'} />
                  <stop offset="1" stopColor={i % 2 === 1 ? '#EE8FB4' : '#F3A3C2'} />
                </linearGradient>
              </defs>
              <path
                d="M10 17C6 13 4.2 9 5.6 5.6 6.9 2.9 9 2.3 10 4.2 11 2.3 13.1 2.9 14.4 5.6 15.8 9 14 13 10 17Z"
                fill={'url(#toolpetal' + i + ')'}
                stroke="#E87BA4"
                strokeOpacity="0.45"
                strokeWidth="0.5"
              />
            </svg>
          ))}

          <div>
            {/* 金色法阵 + 符印，居中 */}
            <div className="relative mx-auto w-full max-w-[530px]">
              {/* 暖光 */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(232,182,76,0.14) 0%, rgba(248,191,211,0.10) 45%, rgba(248,191,211,0) 70%)',
                }}
              />
              <div
                className="relative aspect-square"
                style={{ animation: 'toolseal-breathe 7s ease-in-out infinite' }}
                onPointerEnter={(e) => e.pointerType !== 'touch' && setSealPaused(true)}
                onPointerLeave={() => setSealPaused(false)}
              >
                {/* 法阵底纹连同日月极慢自转 */}
                <div
                  className="absolute inset-0"
                  style={{
                    animation: 'spin-slow 260s linear infinite',
                    animationPlayState: sealPaused ? 'paused' : 'running',
                  }}
                >
                  <ToolSeal className="h-full w-full" />
                </div>

                {/* 双环轨道：外环顺转、内环逆转，符印反向自转保持正立 */}
                {[
                  { items: PLATE.slice(0, 12), dur: 150, dir: 'normal', back: 'reverse' },
                  { items: PLATE.slice(12), dur: 110, dir: 'reverse', back: 'normal' },
                ].map((ring) => (
                  <div
                    key={ring.dur}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      animation: `spin-slow ${ring.dur}s linear infinite ${ring.dir}`,
                      animationPlayState: sealPaused ? 'paused' : 'running',
                    }}
                  >
                    {ring.items.map((t, i) => (
                      <span
                        key={t.n}
                        style={{
                          left: `${t.x}%`,
                          top: `${t.y}%`,
                          animation: `annot-in .55s ${0.08 * i}s ease-out both`,
                        }}
                        className="group/tool pointer-events-auto absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      >
                        <span
                          className="block"
                          style={{
                            animation: `spin-slow ${ring.dur}s linear infinite ${ring.back}`,
                            animationPlayState: sealPaused ? 'paused' : 'running',
                          }}
                        >
                          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_18px_-8px_rgba(206,78,130,0.55)] ring-1 ring-[#C9A05C]/50 transition-transform duration-300 group-hover/tool:-translate-y-1 group-hover/tool:scale-110">
                            <img src={t.l} alt={t.n} loading="lazy" className="h-full w-full object-contain" />
                          </span>
                          <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-hand text-[12px] text-plum-muted opacity-0 transition-opacity duration-300 group-hover/tool:opacity-100">
                            {t.n} · <span className="text-[#C0913C]">{t.c}</span>
                          </span>
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center font-hand text-[15px] text-plum-muted">
                hover a charm ✦
              </p>
            </div>
          </div>
        </div>
      </Reveal>

    </section>
  )
}
