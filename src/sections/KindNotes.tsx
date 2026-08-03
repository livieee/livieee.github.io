import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 * Kova Testimonial 式编辑排版：左列大字引文流，右列手绘樱枝陪衬。
 *
 * ⚠️ 只放真实收到过的原话。NOTES 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 *
 * 每条字段：
 *   text   原话（可保留原始语气与断句，不必润色）
 *   who    署名，可只写角色（如 'Engineering lead, Bosch × CMU'）
 *   where  来源，如 'Slack' / 'LinkedIn' / 'Email' / 'Handwritten card'
 */
type Note = { text: string; who: string; where?: string }

const NOTES: Note[] = []

/** 手绘樱枝线稿 —— 原创，陪衬引文 */
function SakuraSketch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 380" fill="none" className={className} aria-hidden>
      <path
        d="M60 368C88 300 92 246 84 196 76 150 88 112 118 84"
        stroke="#B98ACB"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M86 210C110 198 130 200 148 214" stroke="#B98ACB" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M90 150C72 138 62 122 60 102" stroke="#B98ACB" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      {[
        { x: 118, y: 84, r: 11 },
        { x: 148, y: 214, r: 9 },
        { x: 60, y: 102, r: 8.5 },
        { x: 84, y: 196, r: 6 },
        { x: 96, y: 300, r: 7 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy={-f.r * 0.72}
              rx={f.r * 0.42}
              ry={f.r * 0.66}
              transform={`rotate(${deg})`}
              fill="#F6BAD0"
              fillOpacity="0.55"
              stroke="#E87BA4"
              strokeOpacity="0.5"
              strokeWidth="0.9"
            />
          ))}
          <circle r={f.r * 0.2} fill="#E8B64C" fillOpacity="0.8" />
        </g>
      ))}
      <text x="130" y="352" fontSize="15" fill="#8A6E84" fillOpacity="0.85" style={{ fontFamily: 'Caveat, cursive' }}>
        words I keep ✦
      </text>
    </svg>
  )
}

export function KindNotes() {
  if (NOTES.length === 0) return null

  return (
    <section id="notes" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_240px]">
        <div>
          <Reveal>
            <p className="label-text mb-6 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
              Kind Notes I've Kept
            </p>
          </Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
            <WordReveal text="What it's like to work together —" />{' '}
            <span className="italic text-orchid">
              <WordReveal text="in their words." delay={0.28} />
            </span>
          </h2>

          <div className="mt-14">
            {NOTES.map((n, i) => (
              <Reveal key={n.text.slice(0, 32)} delay={i * 0.08} y={24}>
                <figure className={i === 0 ? '' : 'mt-12 border-t border-plum/10 pt-12'}>
                  <blockquote
                    className={`max-w-2xl font-serif font-light leading-[1.5] text-plum ${
                      i === 0 ? 'text-[1.5rem] md:text-[1.8rem]' : 'text-[1.2rem] md:text-[1.35rem]'
                    }`}
                  >
                    “{n.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span aria-hidden className="h-px w-8 self-center bg-rose/60" />
                    <span className="text-[13.5px] font-medium text-plum">{n.who}</span>
                    {n.where && (
                      <span className="text-[11px] uppercase tracking-label text-plum-faint">{n.where}</span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 右列：手绘樱枝，桌面端可见 */}
        <Reveal className="hidden md:block" delay={0.3}>
          <div className="sticky top-32">
            <SakuraSketch className="w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
