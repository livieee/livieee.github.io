import { Link } from 'react-router'

/**
 * 钉在 AskData 视觉角落的小架构图 —— Bosch 多智能体 schema 抽取项目。
 * hover 轻微倾斜放大并露出 “View project ↗”，点击进入独立项目页。
 * 桌面端由父级绝对定位，移动端作为附注块内联展示。
 */
export function MiniArchCard({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/work/bosch-schema"
      className={`group/arch block w-44 sm:w-48 ${className}`}
      aria-label="View project: Multi-agent schema extraction"
    >
      <div className="relative rotate-[-3deg] rounded-2xl border border-plum/10 bg-white/95 p-3.5 pt-4 shadow-[0_14px_34px_-16px_rgba(78,110,150,0.4)] backdrop-blur-sm transition-all duration-300 group-hover/arch:rotate-0 group-hover/arch:scale-[1.05] group-hover/arch:shadow-[0_20px_44px_-16px_rgba(78,110,150,0.5)]">
        {/* 胶带 */}
        <span
          aria-hidden
          className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-5deg] rounded-[2px] bg-[#DCE7F2]/90 shadow-xs"
        />

        {/* 小架构图 */}
        <svg viewBox="0 0 150 56" className="w-full" aria-hidden>
          {/* agents */}
          {[8, 24, 40].map((y, i) => (
            <rect key={i} x="4" y={y} width="26" height="10" rx="3" fill="#EFF5FB" stroke="#7FA3CC" strokeWidth="1" />
          ))}
          {/* arrows to extractor */}
          {[13, 29, 45].map((y, i) => (
            <path key={i} d={`M30 ${y} C 46 ${y}, 48 28, 60 28`} fill="none" stroke="#B9CDE4" strokeWidth="1.2" />
          ))}
          {/* extractor */}
          <circle cx="72" cy="28" r="12" fill="#DCE7F2" stroke="#4E6E96" strokeWidth="1.2" />
          <text x="72" y="31" textAnchor="middle" fontSize="9" fill="#4E6E96">⌘</text>
          {/* arrow to validation */}
          <path d="M84 28 H100" fill="none" stroke="#B9CDE4" strokeWidth="1.2" markerEnd="url(#arch-arrow)" />
          <defs>
            <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#B9CDE4" />
            </marker>
          </defs>
          {/* validation */}
          <rect x="102" y="19" width="42" height="18" rx="5" fill="#F6EFE8" stroke="#D193A8" strokeWidth="1" />
          <text x="123" y="31" textAnchor="middle" fontSize="8.5" fill="#8A6E7E">validate ✓</text>
        </svg>

        <p className="mt-2 text-[8.5px] font-medium uppercase tracking-[0.18em] text-plum-faint">
          Earlier technical foundation ↗
        </p>
        <p className="mt-1 font-serif text-[13px] leading-tight text-plum">Multi-agent schema extraction</p>
        <p className="mt-0.5 text-[10px] text-plum-muted">Architecture + validation</p>

        {/* hover 露出 View project ↗ */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover/arch:opacity-100"
        >
          <span className="rotate-[-4deg] font-hand text-[17px] text-[#4E6E96]">View project ↗</span>
        </span>
      </div>
    </Link>
  )
}
