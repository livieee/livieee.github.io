/**
 * 手绘风世界地图背景 — 经纬网 + 大陆轮廓 + 罗盘玫瑰，
 * Changsha → Vancouver → Toronto → San Francisco Bay Area → …
 * animate 模式下路线自绘、图钉依次落位（hero 入场第一步）。
 */
const ROUTE =
  'M150,840 C300,800 430,850 560,820 C690,790 790,850 920,820 C1050,790 1160,840 1240,800'
const EXT = 'M1240,800 C1300,775 1340,765 1400,740'

export const MAP_PINS = [
  { x: 150, y: 840, c: '#D193A8', label: 'Changsha', anchor: 'middle' as const },
  { x: 560, y: 820, c: '#B98ACB', label: 'Vancouver', anchor: 'middle' as const },
  { x: 920, y: 820, c: '#8FAE8B', label: 'Toronto', anchor: 'middle' as const },
  { x: 1240, y: 800, c: '#D9A441', label: 'SF Bay Area', anchor: 'middle' as const, big: true },
]

/* 大陆轮廓 — 手绘感闭合曲线 */
const LANDS = [
  // 北美
  'M560,200 C600,150 700,130 790,140 C880,150 950,130 1020,160 C1080,185 1110,230 1090,270 C1130,300 1140,360 1110,410 C1090,450 1100,500 1070,540 C1040,575 990,570 960,540 C930,580 880,600 830,585 C780,570 760,520 770,480 C720,460 680,420 670,370 C600,350 540,300 560,200 Z',
  // 南美
  'M760,700 C800,660 870,650 910,690 C940,730 930,800 900,860 C880,905 830,920 800,885 C770,850 740,770 760,700 Z',
  // 欧亚
  'M120,180 C180,120 300,110 390,140 C470,165 520,150 560,180 C520,215 480,240 430,235 C470,270 470,320 430,350 C390,380 330,370 300,340 C260,380 200,400 160,370 C190,330 190,290 160,260 C120,240 100,210 120,180 Z',
  // 东亚延伸
  'M390,140 C460,120 540,150 570,210 C590,260 560,320 510,340 C460,360 420,340 430,290 C400,260 370,190 390,140 Z',
  // 非洲
  'M330,430 C380,400 450,400 490,440 C520,480 510,550 480,610 C455,660 400,670 370,630 C340,590 300,480 330,430 Z',
  // 东南亚岛屿
  'M520,430 C545,420 570,430 575,450 C580,470 560,490 540,485 C520,480 505,445 520,430 Z',
  'M590,470 C610,460 635,470 635,490 C635,510 615,520 600,510 C585,500 575,480 590,470 Z',
]

export function JourneyMap({
  className,
  animate = false,
}: {
  className?: string
  animate?: boolean
}) {
  const meridians = Array.from({ length: 8 }, (_, i) => 120 + i * 170)
  const parallels = Array.from({ length: 5 }, (_, i) => 110 + i * 175)

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={className}
      fill="none"
    >
      {/* 经纬网 */}
      <g stroke="#B98ACB" strokeOpacity="0.14" strokeWidth="1">
        {meridians.map((x) => (
          <path key={`m${x}`} d={`M${x},-20 C${x - 25},300 ${x + 25},600 ${x},920`} />
        ))}
        {parallels.map((y) => (
          <path key={`p${y}`} d={`M-20,${y} C480,${y - 18} 960,${y + 18} 1460,${y}`} />
        ))}
      </g>

      {/* 大陆轮廓 */}
      <g stroke="#3A2440" strokeOpacity="0.09" strokeWidth="1.5" strokeLinejoin="round">
        {LANDS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* 罗盘玫瑰（右上） */}
      <g
        transform="translate(1332,148)"
        stroke="#3A2440"
        strokeOpacity="0.2"
        strokeWidth="1.2"
        fill="#3A2440"
        fillOpacity="0.2"
      >
        <circle r="27" fill="none" />
        <circle r="4" fill="none" />
        <path d="M0,-27 L5,0 L0,6 L-5,0 Z" />
        <path d="M0,27 L5,0 L0,-6 L-5,0 Z" fillOpacity="0.1" />
        <path d="M-27,0 L0,5 L6,0 L0,-5 Z" fillOpacity="0.1" />
        <path d="M27,0 L0,5 L-6,0 L0,-5 Z" fillOpacity="0.1" />
        <text
          y="-33"
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontSize="17"
          stroke="none"
          fill="#6E5A75"
          fillOpacity="0.55"
        >
          N
        </text>
      </g>

      {/* 主路线：自绘描线 */}
      <path
        d={ROUTE}
        stroke="#B98ACB"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={animate ? 1 : 0}
        style={animate ? { animation: 'map-trace 1.3s 0.15s ease-in-out forwards' } : undefined}
      />
      {/* 延伸至湾区之外（虚线） */}
      <path
        d={EXT}
        stroke="#B98ACB"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 9"
        opacity={animate ? 0 : 1}
        style={animate ? { animation: 'fade-in 0.5s 1.4s ease forwards' } : undefined}
      />

      {/* 城市节点 + 手写城市名：依次落位 */}
      <g>
        {MAP_PINS.map((p, i) => (
          <g
            key={p.label}
            opacity={animate ? 0 : 1}
            style={
              animate
                ? {
                    transformOrigin: `${p.x}px ${p.y}px`,
                    animation: `pin-pop 0.55s ${0.55 + i * 0.14}s cubic-bezier(0.34,1.56,0.64,1) forwards`,
                  }
                : undefined
            }
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={p.big ? 7 : 5.5}
              stroke={p.c}
              strokeWidth="1.8"
              fill="#FBF7F2"
            />
            <circle cx={p.x} cy={p.y} r={p.big ? 2.4 : 1.9} fill={p.c} />
            {(i === 0 || p.big) && (
              <text
                x={p.x}
                y={p.y - (p.big ? 18 : 15)}
                textAnchor={p.anchor}
                fontFamily="Caveat, cursive"
                fontSize={p.big ? 24 : 21}
                fill="#6E5A75"
                opacity="0.75"
                transform={`rotate(-2 ${p.x} ${p.y - 16})`}
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* 小星标 ✦ */}
      <g fill="#D193A8" fillOpacity="0.4">
        <path d="M300,240 l3,7 7,3 -7,3 -3,7 -3,-7 -7,-3 7,-3 Z" />
        <path d="M1240,470 l2.4,5.6 5.6,2.4 -5.6,2.4 -2.4,5.6 -2.4,-5.6 -5.6,-2.4 5.6,-2.4 Z" />
        <path d="M620,690 l2,4.8 4.8,2 -4.8,2 -2,4.8 -2,-4.8 -4.8,-2 4.8,-2 Z" />
      </g>
      <g fill="#B98ACB" fillOpacity="0.35">
        <path d="M900,210 l2.6,6.2 6.2,2.6 -6.2,2.6 -2.6,6.2 -2.6,-6.2 -6.2,-2.6 6.2,-2.6 Z" />
      </g>
    </svg>
  )
}
