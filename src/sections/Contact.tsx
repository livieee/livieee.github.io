import { Reveal, WordReveal } from '@/components/Reveal'
import { NetworkCanvas } from '@/components/NetworkCanvas'

const OPEN_TO = [
  'AI Product Operations',
  'GTM Strategy & Operations',
  'Strategic Partnerships',
  'Ecosystem & Developer Programs',
  'Technical Product Marketing',
  'AI Program Management',
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 bottom-[-30%] h-[560px] w-[560px] rounded-full bg-lavender/50 blur-[130px]" />
        <div className="absolute -right-32 top-[-20%] h-[480px] w-[480px] rounded-full bg-blush/50 blur-[120px]" />
      </div>
      <NetworkCanvas className="absolute inset-0 h-full w-full opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-44">
        <Reveal>
          <p className="label-text mb-6">Contact</p>
        </Reveal>
        <h2 className="max-w-4xl font-serif text-[clamp(2.2rem,6vw,4.4rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="Let’s build something" />{' '}
          <span className="gradient-text italic">
            <WordReveal text="meaningful." delay={0.35} />
          </span>
        </h2>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-plum-muted md:text-lg">
            I'm open to conversations about AI product operations, GTM strategy, partnerships,
            ecosystem programs, and collaborations worth building slowly.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-wrap gap-2">
            {OPEN_TO.map((o) => (
              <span key={o} className="rounded-full border border-plum/15 bg-cream/70 px-4 py-1.5 text-[12px] font-medium text-plum-muted">
                {o}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-plum px-8 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-orchid"
            >
              olivia.zxiao@gmail.com
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://linkedin.com/in/olivia-zerun-xiao/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-plum/25 px-8 py-3.5 text-sm font-medium text-plum transition-all duration-300 hover:border-orchid hover:bg-lavender/40"
            >
              LinkedIn
            </a>
            <a
              href="/Olivia_Xiao_Resume.pdf"
              download
              className="text-sm font-medium text-plum underline decoration-rose-soft decoration-2 underline-offset-4 transition-colors hover:text-orchid"
            >
              Download Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-14 flex items-center gap-3 text-[13px] text-plum-faint">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-orchid" />
            Based in the San Francisco Bay Area · Always up for a good conversation
          </p>
        </Reveal>
      </div>

      <footer className="relative z-10 border-t border-plum/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 text-[12px] text-plum-faint md:flex-row md:items-center md:px-10">
          <p>© 2026 Olivia Xiao — AI Product · GTM · Partnerships</p>
          <p className="font-serif italic">connect · build · grow</p>
        </div>
        {/* 巨型幽灵署名：底边被页脚裁切 */}
        <div aria-hidden className="pointer-events-none select-none">
          <p className="translate-y-[26%] text-center font-serif text-[clamp(5.5rem,19vw,16rem)] font-light leading-none tracking-tight text-orchid/[0.08]">
            Olivia
          </p>
        </div>
      </footer>
    </section>
  )
}
