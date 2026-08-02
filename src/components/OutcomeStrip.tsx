import { CountUp } from '@/components/CountUp'

/**
 * 成果面板 —— 放在 case 页 Hero 之后，让扫页的人一眼看到结果。
 * 两个 Bosch case 页共用，避免各写一套导致样式漂移。
 */
export type Outcome = {
  n: number
  prefix?: string
  suffix?: string
  /** 一行短标签，不要写成句子 */
  label: string
}

export function OutcomeStrip({ items, note = 'The outcome' }: { items: Outcome[]; note?: string }) {
  return (
    <div className="rounded-[1.6rem] border border-[#7FA3CC]/25 bg-[#EFF5FB]/45 px-6 py-6 md:px-8 md:py-7">
      <p className="label-text mb-5 text-[#4E6E96]">{note}</p>
      <dl
        className={`grid divide-y divide-plum/10 sm:divide-x sm:divide-y-0 ${
          items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        }`}
      >
        {items.map((v, n) => (
          <div key={v.label} className="py-4 first:pt-0 last:pb-0 sm:px-7 sm:py-0 sm:first:pl-0 sm:last:pr-0">
            <dd className="font-serif text-[2.5rem] font-light leading-none text-[#4E6E96] md:text-[2.9rem]">
              {v.prefix}
              <CountUp value={v.n} suffix={v.suffix} />
            </dd>
            <span
              aria-hidden
              className="mt-2.5 block h-[3px] w-14 origin-left rounded-full bg-[#7FA3CC] opacity-45"
              style={{
                transform: 'scaleX(0)',
                animation: `metric-underline .6s ${0.5 + n * 0.14}s ease-out forwards`,
              }}
            />
            <dt className="mt-3 text-[12.5px] leading-snug text-plum-muted sm:min-h-[34px]">{v.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
