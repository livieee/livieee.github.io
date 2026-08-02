import { Reveal, WordReveal } from '@/components/Reveal'

/**
 * Kind Notes I've Kept —— 别人写给她的话，比自我描述更可信。
 *
 * ⚠️ 只放真实收到过的原话。NOTES 为空时整段不渲染，
 * 绝不使用占位或杜撰的推荐语。
 *
 * 每条字段：
 *   text   原话（可保留原始语气与断句，不必润色）
 *   who    署名，可只写角色（如 'Engineering lead, Bosch × CMU'）
 *   where  来源，如 'Slack' / 'LinkedIn' / 'Email' / 'Handwritten card'
 *   tone   配色：'blush' | 'lavender' | 'champagne'
 */
type Note = { text: string; who: string; where?: string; tone?: 'blush' | 'lavender' | 'champagne' }

const NOTES: Note[] = []

const TONES = {
  blush: 'from-blush/55 to-cream-soft',
  lavender: 'from-lavender/55 to-cream-soft',
  champagne: 'from-champagne/55 to-cream-soft',
} as const

const TILT = ['-rotate-[1.4deg]', 'rotate-[1deg]', '-rotate-[0.6deg]', 'rotate-[1.6deg]']

export function KindNotes() {
  if (NOTES.length === 0) return null

  return (
    <section id="notes" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
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

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {NOTES.map((n, i) => (
          <Reveal key={n.text.slice(0, 32)} delay={i * 0.08} y={28}>
            <figure
              data-hover
              className={`group relative h-full ${TILT[i % TILT.length]} rounded-[1.4rem] border border-plum/10 bg-gradient-to-br ${
                TONES[n.tone ?? 'blush']
              } p-7 pt-8 shadow-[0_18px_44px_-24px_rgba(90,63,86,0.4)] transition-all duration-500 hover:rotate-0 hover:-translate-y-1 md:p-8 md:pt-9`}
            >
              {/* 胶带 */}
              <span
                aria-hidden
                className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-[3px] bg-white/70 shadow-sm"
              />
              <blockquote className="font-serif text-[1.05rem] leading-relaxed text-plum md:text-[1.15rem]">
                “{n.text}”
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-plum/10 pt-4">
                <span className="text-[13px] font-medium text-plum">{n.who}</span>
                {n.where && (
                  <span className="text-[11.5px] uppercase tracking-label text-plum-faint">{n.where}</span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
