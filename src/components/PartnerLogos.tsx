/**
 * Bosch × CMU 合作方标识 —— 两个透明底红色字标，等高对齐。
 * 两个 case 页共用，避免各写一套导致样式漂移。
 */
export function PartnerLogos({ note }: { note?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <img src="/logos/bosch-wordmark.png" alt="Bosch" className="h-[22px] w-auto" />
      <span aria-hidden className="font-hand text-[17px] text-plum-faint">×</span>
      <img src="/logos/cmu-mark.png" alt="Carnegie Mellon University" className="h-[30px] w-auto" />
      {note && (
        <span className="ml-1 border-l border-plum/15 pl-4 text-[11px] uppercase tracking-label text-plum-faint">
          {note}
        </span>
      )}
    </div>
  )
}
