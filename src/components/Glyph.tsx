/**
 * 手绘感线条图标集 —— 替代 emoji。
 * 笔画刻意不完全对称、端点圆润、路径带轻微抖动，读起来像随手画的，
 * 而不是从图标库里拖出来的。
 */

type Props = {
  name: GlyphName
  className?: string
  /** 线宽，默认 1.5 */
  w?: number
}

export type GlyphName =
  | 'db-locked'
  | 'round-trip'
  | 'split-panes'
  | 'bar-chart'
  | 'invoice'
  | 'wrench'
  | 'database'
  | 'eye'
  | 'trash'
  | 'spark'
  | 'target'
  | 'retry'
  | 'ledger'
  | 'laurel'

const PATHS: Record<GlyphName, (w: number) => React.ReactNode> = {
  /* 数据库 + 斜杠：不能直连 */
  'db-locked': (w) => (
    <>
      <ellipse cx="11" cy="6.4" rx="6.4" ry="2.6" strokeWidth={w} />
      <path d="M4.6 6.6v4.2c.1 1.4 2.9 2.5 6.4 2.5 1.2 0 2.4-.13 3.4-.37" strokeWidth={w} />
      <path d="M4.6 11.2v4.1c.1 1.4 2.9 2.5 6.4 2.5.5 0 1-.02 1.5-.07" strokeWidth={w} />
      <path d="M14.2 14.4l6.4 6.6" strokeWidth={w} />
      <path d="M20.7 14.3l-6.6 6.8" strokeWidth={w} />
    </>
  ),
  /* 出去又回来的手动往返 */
  'round-trip': (w) => (
    <>
      <path d="M4 8.4h11.4c3 0 4.7 1.7 4.6 3.7-.1 1.9-1.8 3.3-4.5 3.3H6.2" strokeWidth={w} />
      <path d="M8.7 5.2 4.3 8.5l4.3 3.1" strokeWidth={w} />
      <path d="M9.4 12.5 6 15.5l3.5 2.9" strokeWidth={w} />
    </>
  ),
  /* 三块互不相连的面板 */
  'split-panes': (w) => (
    <>
      <rect x="2.6" y="4.4" width="5.6" height="15.1" rx="1.4" strokeWidth={w} />
      <rect x="9.4" y="4.2" width="5.5" height="9.4" rx="1.4" strokeWidth={w} />
      <rect x="16.1" y="9.4" width="5.4" height="10.2" rx="1.4" strokeWidth={w} />
    </>
  ),
  /* 柱状图：分析师 */
  'bar-chart': (w) => (
    <>
      <path d="M3.4 20.4h17.3" strokeWidth={w} />
      <path d="M6.4 20.2V12.6" strokeWidth={w} />
      <path d="M10.6 20.3V6.9" strokeWidth={w} />
      <path d="M14.8 20.2v-9.8" strokeWidth={w} />
      <path d="M19 20.3V9.1" strokeWidth={w} />
    </>
  ),
  /* 单据：采购 */
  invoice: (w) => (
    <>
      <path d="M5.2 3.6h13.4v15.2l-2.2-1.4-2.2 1.5-2.2-1.4-2.3 1.5-2.2-1.4-2.3 1.4z" strokeWidth={w} />
      <path d="M8.4 8.1h7.3" strokeWidth={w} />
      <path d="M8.3 11.6h5.1" strokeWidth={w} />
    </>
  ),
  /* 扳手：工程师 */
  wrench: (w) => (
    <>
      <path d="M15.6 3.4a4.9 4.9 0 0 0-4.3 7.3L4 18.1l2.2 2.3 7.4-7.5a4.9 4.9 0 0 0 6.6-6.1l-2.9 2.9-2.5-.4-.5-2.5z" strokeWidth={w} />
    </>
  ),
  database: (w) => (
    <>
      <ellipse cx="12" cy="6" rx="6.6" ry="2.6" strokeWidth={w} />
      <path d="M5.4 6.2v11.4c0 1.4 2.9 2.6 6.6 2.6s6.6-1.2 6.6-2.6V6.1" strokeWidth={w} />
      <path d="M5.5 11.9c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.6-2.5" strokeWidth={w} />
    </>
  ),
  eye: (w) => (
    <>
      <path d="M2.6 12.2C5 8.3 8.4 6.4 12 6.4s7.1 2 9.4 5.8c-2.3 3.8-5.7 5.8-9.3 5.8s-7.1-2-9.5-5.8z" strokeWidth={w} />
      <circle cx="12" cy="12.2" r="2.5" strokeWidth={w} />
    </>
  ),
  trash: (w) => (
    <>
      <path d="M4.4 6.6h15.3" strokeWidth={w} />
      <path d="M9.4 6.4V4.2h5.3v2.3" strokeWidth={w} />
      <path d="M6.4 6.8l.9 12.6c.05.9.8 1.5 1.7 1.5h6c.9 0 1.6-.6 1.7-1.5l.9-12.5" strokeWidth={w} />
    </>
  ),
  /* 四角星：AI 提示 */
  spark: (w) => (
    <>
      <path d="M12 3.2c.9 4.3 2.4 6 6.6 6.9-4.2.9-5.7 2.6-6.5 6.9-.9-4.3-2.4-6-6.6-6.9 4.2-.9 5.6-2.5 6.5-6.9z" strokeWidth={w} />
      <path d="M18.4 15.6c.4 1.9 1.1 2.7 2.9 3.1-1.8.4-2.5 1.2-2.9 3.1-.4-1.9-1-2.7-2.8-3.1 1.8-.4 2.4-1.2 2.8-3.1z" strokeWidth={w} />
    </>
  ),
  /* 靶心：置信度打分 */
  target: (w) => (
    <>
      <circle cx="12" cy="12" r="8.6" strokeWidth={w} />
      <circle cx="12" cy="12.1" r="4.7" strokeWidth={w} />
      <circle cx="12" cy="12" r="1.3" strokeWidth={w} />
    </>
  ),
  /* 回环箭头：重试 */
  retry: (w) => (
    <>
      <path d="M20 12.2a8 8 0 1 1-2.6-5.9" strokeWidth={w} />
      <path d="M20.3 3.6v5.1h-5.2" strokeWidth={w} />
    </>
  ),
  /* 账本：全量日志 */
  ledger: (w) => (
    <>
      <path d="M5.4 3.8h13.2v16.6H5.5z" strokeWidth={w} />
      <path d="M8.6 3.9v16.4" strokeWidth={w} />
      <path d="M11.4 8.2h4.6" strokeWidth={w} />
      <path d="M11.3 11.9h4.7" strokeWidth={w} />
      <path d="M11.4 15.5h3.1" strokeWidth={w} />
    </>
  ),
  /* 桂冠：榜单第一 */
  laurel: (w) => (
    <>
      <path d="M12 4.2c-2.6 1.9-3.9 4.5-3.8 7.5.1 2.9 1.4 5.4 3.8 7.4" strokeWidth={w} />
      <path d="M12 4.3c2.6 1.9 3.8 4.5 3.7 7.5-.1 2.9-1.3 5.4-3.7 7.3" strokeWidth={w} />
      <path d="M8.2 8.4 5.4 7.3M8 12.1l-3.1-.2M8.6 15.6l-2.7 1.2" strokeWidth={w} />
      <path d="m15.8 8.4 2.9-1.1M16 12.1l3.1-.2M15.4 15.6l2.8 1.2" strokeWidth={w} />
    </>
  ),
}

export function Glyph({ name, className = '', w = 1.5 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[name](w)}
    </svg>
  )
}
