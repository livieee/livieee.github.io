import { useState } from 'react'

/**
 * 04 卡片主视觉 —— 每天早上自己出现在收件箱里的那份报表。
 *
 * 全部脱敏：不出现数据源名称、品类名称、任何真实价格、收件人。
 * 表格里的数字是示意用的形状，不是业务数据。
 */

/** 示意用的行：只表达「多个品类 · 有涨有跌」，不是真实数值 */
const ROWS = [
  { w: 58, d: 'up' as const },
  { w: 74, d: 'down' as const },
  { w: 46, d: 'up' as const },
  { w: 66, d: 'flat' as const },
]

const STEPS = ['sources', 'retry', 'read', 'report']

export function DailyReportCard() {
  const [step, setStep] = useState(0)

  return (
    <div
      className="relative aspect-[21/9] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-champagne/40 via-cream-soft to-lavender/35"
      onMouseEnter={() => setStep((n) => (n + 1) % STEPS.length)}
    >
      {/* 每天早上的那封邮件 */}
      <div
        className="absolute left-[6%] top-[8%] w-[62%] -rotate-1 overflow-hidden rounded-xl bg-white shadow-[0_22px_48px_-20px_rgba(58,36,64,0.5)] ring-1 ring-plum/10"
        style={{ animation: 'annot-in .6s .05s ease-out both' }}
      >
        <div className="flex items-center gap-1 bg-plum/[0.06] px-2.5 py-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-plum/25" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/20" />
          <span className="h-[5px] w-[5px] rounded-full bg-plum/10" />
          <span className="ml-1.5 text-[7.5px] tracking-wide text-plum-faint">09:13 · automated</span>
        </div>

        <div className="px-3 pb-3 pt-2.5">
          <p className="text-[11px] font-semibold leading-tight text-plum">Daily price report</p>
          <p className="mt-0.5 text-[8.5px] leading-tight text-plum-faint">
            seven grades · two industry sources
          </p>

          {/* 报表示意 —— 形状而非数据 */}
          <ul className="mt-2.5 space-y-[5px]">
            {ROWS.map((r, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span className="h-[6px] w-[16%] rounded-[2px] bg-plum/10" />
                <span
                  className="h-[6px] rounded-[2px] bg-plum/[0.09]"
                  style={{ width: `${r.w}%` }}
                />
                <span
                  className="ml-auto text-[8px] leading-none"
                  style={{
                    color: r.d === 'up' ? '#B4715E' : r.d === 'down' ? '#6E8F72' : '#9A8FA4',
                  }}
                >
                  {r.d === 'up' ? '▲' : r.d === 'down' ? '▼' : '–'}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-2.5 flex items-baseline gap-1.5 border-t border-plum/10 pt-2">
            <span className="font-serif text-[24px] leading-none text-orchid">337</span>
            <span className="text-[8.5px] leading-tight text-plum-faint">
              trading days on record
            </span>
          </div>
        </div>
      </div>

      {/* 流水线：四步，hover 逐步点亮 */}
      <div
        className="absolute bottom-[7%] right-[5%] w-[36%] rounded-lg border border-plum/10 bg-white/85 px-2.5 py-2 backdrop-blur-[2px]"
        style={{ animation: 'annot-in .6s .3s ease-out both' }}
      >
        <p className="text-[7px] uppercase tracking-[0.16em] text-plum-faint">runs itself</p>
        <ol className="mt-1.5 space-y-[5px]">
          {STEPS.map((k, i) => (
            <li key={k} className="flex items-center gap-1.5">
              <span
                className="h-[5px] w-[5px] shrink-0 rounded-full transition-colors duration-500"
                style={{ backgroundColor: i <= step ? '#B98ACB' : 'rgba(58,36,64,0.15)' }}
              />
              <span
                className="text-[8px] leading-none transition-colors duration-500"
                style={{ color: i <= step ? '#3A2440' : 'rgba(58,36,64,0.4)' }}
              >
                {k}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* 手写批注 */}
      <span className="absolute right-[6%] top-[10%] max-w-[28%] text-right font-hand text-[11px] leading-tight text-plum-muted">
        nobody presses go ✦
      </span>
    </div>
  )
}
