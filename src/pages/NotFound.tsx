import { Link } from 'react-router'

/** 找不到的页面 —— 与站点同一套手绘语言，给一条明确的回去的路。 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-cream px-6 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-[-15%] h-[420px] w-[420px] rounded-full bg-blush/45 blur-[120px]" />
        <div className="absolute -right-24 bottom-[-20%] h-[380px] w-[380px] rounded-full bg-lavender/45 blur-[110px]" />
      </div>

      {/* 一枚走丢的小樱牌 */}
      <svg viewBox="0 0 160 355" aria-hidden className="relative mb-8 h-[190px] w-auto -rotate-6 drop-shadow-[0_18px_36px_rgba(206,78,130,0.35)]">
        <rect x="3" y="3" width="154" height="349" rx="12" fill="#F4A8C4" />
        <rect x="10" y="10" width="140" height="335" rx="13" fill="#F6BAD0" stroke="#FFF1F5" strokeWidth="3" />
        <circle cx="80" cy="177" r="62" fill="#F9D3E1" stroke="#E0447F" strokeWidth="8" />
        <text
          x="80"
          y="196"
          textAnchor="middle"
          fill="#C13B6E"
          fontSize="52"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          ?
        </text>
      </svg>

      <p className="label-text relative mb-4">404</p>
      <h1 className="relative max-w-xl font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-light leading-tight text-plum">
        This page wandered off <span className="italic text-orchid">somewhere.</span>
      </h1>
      <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-plum-muted">
        The link may be old, or I may have moved things around. Everything worth reading is still
        one click away.
      </p>

      <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-plum px-6 py-3 text-[13.5px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-orchid"
        >
          Back to the homepage
        </Link>
        <Link
          to="/work"
          className="rounded-full border border-plum/20 bg-white/70 px-6 py-3 text-[13.5px] font-medium text-plum transition-colors hover:border-rose/50"
        >
          See selected work
        </Link>
      </div>

      <p className="relative mt-10 font-hand text-[16px] text-plum-muted">
        every card finds its way back ✦
      </p>
    </main>
  )
}
