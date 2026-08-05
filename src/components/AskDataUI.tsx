import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const MODULES = [
  { id: 'ask', label: 'Ask', num: '01' },
  { id: 'sql', label: 'SQL', num: '02' },
  { id: 'analyze', label: 'Analyze', num: '03' },
  { id: 'visualize', label: 'Visualize', num: '04' },
  { id: 'reuse', label: 'Reuse', num: '05' },
] as const

type ModuleShellProps = {
  i: number
  num: string
  label: string
  active: boolean
  inView: boolean
  className?: string
  children: React.ReactNode
}

function ModuleShell({ i, num, label, active, inView, className = '', children }: ModuleShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.25 + i * 0.16, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-xl border p-2.5 transition-all duration-500 ${
        active
          ? 'border-[#7FA3CC]/70 bg-[#EFF5FB] shadow-[0_0_0_4px_rgba(127,163,204,0.16),0_12px_26px_-14px_rgba(78,110,150,0.4)]'
          : 'border-plum/10 bg-white/85'
      } ${className}`}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <span
          className={`rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide transition-colors duration-500 ${
            active ? 'bg-[#4E6E96] text-white' : 'bg-plum/[0.07] text-plum-faint'
          }`}
        >
          {num}
        </span>
        <span
          className={`text-[10px] font-medium tracking-wide transition-colors duration-500 ${
            active ? 'text-[#4E6E96]' : 'text-plum-muted'
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={`ml-auto h-1.5 w-1.5 rounded-full transition-all duration-500 ${
            active ? 'scale-110 bg-[#4E6E96]' : 'bg-plum/15'
          }`}
        />
      </div>
      {children}
    </motion.div>
  )
}

/**
 * AskData 产品界面 mockup —— 浏览器框内的分析工作台。
 * 五模块 Ask → SQL → Analyze → Visualize → Reuse 在卡片进入视野后依次点亮，
 * 随后循环高亮，像一段自动播放的 product tour。reduced-motion 下全部静态呈现。
 */
export function AskDataUI() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-18% 0px', amount: 0.35 })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [touring, setTouring] = useState(false)

  useEffect(() => {
    if (reduce || !inView) {
      setTouring(false)
      return
    }
    // 入场 stagger 结束后再启动循环高亮
    const start = window.setTimeout(() => setTouring(true), 1250)
    return () => window.clearTimeout(start)
  }, [inView, reduce])

  useEffect(() => {
    if (!touring) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % MODULES.length), 1500)
    return () => window.clearInterval(id)
  }, [touring])

  const lit = (i: number) => !reduce && inView && touring && active === i

  return (
    <div ref={ref} className="select-none">
      <div className="overflow-hidden rounded-[1.4rem] border border-plum/10 bg-[#F7FAFD] shadow-[0_24px_60px_-28px_rgba(78,110,150,0.35)]">
        {/* 浏览器 chrome */}
        <div className="flex items-center gap-3 border-b border-plum/[0.07] bg-white/80 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-blush-deep" />
            <i className="h-2.5 w-2.5 rounded-full bg-champagne-deep" />
            <i className="h-2.5 w-2.5 rounded-full bg-lavender-deep" />
          </span>
          <span className="flex flex-1 items-center justify-center">
            <span className="rounded-full bg-plum/[0.05] px-4 py-1 text-[10px] tracking-wide text-plum-faint">
              genai analytics suite · workspace
            </span>
          </span>
          <span className="w-10" aria-hidden />
        </div>

        {/* 工作台 */}
        <div className="grid grid-cols-12 gap-2 p-2.5 sm:gap-2.5 sm:p-3">
          {/* 01 Ask */}
          <ModuleShell i={0} num="01" label="Ask" active={lit(0)} inView={inView} className="col-span-12">
            <div className="flex items-center gap-2 rounded-lg border border-plum/[0.08] bg-white px-3 py-2">
              <span aria-hidden className="text-[12px] text-[#4E6E96]">✦</span>
              <span className="text-[11px] text-plum">Which SKUs drove Q3 revenue?</span>
              <span
                aria-hidden
                className="ml-auto hidden rounded-md border border-plum/10 px-1.5 py-0.5 text-[9px] text-plum-faint sm:block"
              >
                ⏎ ask
              </span>
            </div>
          </ModuleShell>

          {/* 02 SQL */}
          <ModuleShell i={1} num="02" label="SQL" active={lit(1)} inView={inView} className="col-span-12 sm:col-span-7">
            <pre className="overflow-x-auto font-mono text-[9.5px] leading-[1.7] text-plum-muted">
              <code>
                <span className="text-[#4E6E96]">SELECT</span> sku, <span className="text-[#4E6E96]">SUM</span>(revenue) <span className="text-[#4E6E96]">AS</span> total{'\n'}
                <span className="text-[#4E6E96]">FROM</span> sales{'\n'}
                <span className="text-[#4E6E96]">WHERE</span> quarter = <span className="text-rose">'Q3'</span>{'\n'}
                <span className="text-[#4E6E96]">GROUP BY</span> sku <span className="text-[#4E6E96]">ORDER BY</span> total <span className="text-[#4E6E96]">DESC</span>
              </code>
            </pre>
          </ModuleShell>

          {/* 04 Visualize（排在 SQL 右侧，编号按工作流） */}
          <ModuleShell i={3} num="04" label="Visualize" active={lit(3)} inView={inView} className="col-span-12 sm:col-span-5">
            <div className="flex h-[52px] items-end gap-1.5 px-1" aria-hidden>
              {[42, 68, 55, 88, 62].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#B9CDE4] to-[#7FA3CC]"
                  style={{ height: `${h}%`, opacity: 0.55 + i * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-1.5 border-t border-dashed border-plum/15 pt-1 text-right text-[9px] text-plum-faint">
              revenue by SKU
            </div>
          </ModuleShell>

          {/* 03 Analyze */}
          <ModuleShell i={2} num="03" label="Analyze" active={lit(2)} inView={inView} className="col-span-12 sm:col-span-7">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-plum/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-plum-muted">python · pandas</span>
              <span className="rounded-md bg-[#EDF3FA] px-1.5 py-0.5 text-[9px] text-[#4E6E96]">trend ↗</span>
              <span className="rounded-md bg-[#EDF3FA] px-1.5 py-0.5 text-[9px] text-[#4E6E96]">seasonality</span>
            </div>
            <p className="mt-2 font-mono text-[9.5px] leading-relaxed text-plum-faint">
              df.groupby('sku').revenue.agg(['sum','mean'])
            </p>
          </ModuleShell>

          {/* 05 Reuse */}
          <ModuleShell i={4} num="05" label="Reuse" active={lit(4)} inView={inView} className="col-span-12 sm:col-span-5">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 rounded-md border border-plum/[0.07] bg-white px-2 py-1 text-[9.5px] text-plum-muted">
                <span aria-hidden className="text-[#4E6E96]">⌘</span> saved query · Q3 revenue by SKU
              </p>
              <p className="flex items-center gap-1.5 rounded-md border border-plum/[0.07] bg-white px-2 py-1 text-[9.5px] text-plum-muted">
                <span aria-hidden className="text-[#4E6E96]">✦</span> glossary · revenue
              </p>
            </div>
          </ModuleShell>
        </div>
      </div>

      {/* 工作流图例：当前点亮模块同步高亮 */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] tracking-wide" aria-hidden>
        {MODULES.map((m, i) => (
          <span key={m.id} className="flex items-center gap-2">
            {i > 0 && <span className="text-plum/25">→</span>}
            <span
              className={`relative pb-0.5 transition-colors duration-500 ${
                lit(i) ? 'font-medium text-[#4E6E96]' : 'text-plum-faint'
              }`}
            >
              {m.label}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#7FA3CC] transition-transform duration-500"
                style={{ transform: lit(i) ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
