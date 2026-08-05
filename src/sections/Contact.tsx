import { motion } from 'motion/react'
import { Reveal, WordReveal } from '@/components/Reveal'
import { ScrollLit } from '@/components/ScrollLit'
import { NetworkCanvas } from '@/components/NetworkCanvas'

const OPEN_TO = [
  'AI Product Operations',
  'GTM Strategy & Operations',
  'Strategic Partnerships',
  'Ecosystem & Developer Programs',
  'Technical Product Marketing',
  'AI Program Management',
]

/**
 * 三块「贴纸」就是三个真实入口，不是装饰。
 * 参考图里那排是纯图案；这里每一块都点得动 —— 一个看着像按钮的东西
 * 点不了，比不放更糟。
 */
const CHANNELS = [
  {
    emoji: '✉️',
    label: 'Email',
    sub: 'olivia.zxiao@gmail.com',
    href: 'mailto:olivia.zxiao@gmail.com',
    bg: '#F4D8E0',
    tilt: '-5deg',
  },
  {
    emoji: '💼',
    label: 'LinkedIn',
    sub: '/olivia-zerun-xiao',
    href: 'https://linkedin.com/in/olivia-zerun-xiao/',
    external: true,
    bg: '#E5DAF3',
    tilt: '3deg',
  },
  {
    emoji: '📄',
    label: 'Résumé',
    sub: 'PDF, one page',
    href: '/Olivia_Xiao_Resume.pdf',
    download: true,
    bg: '#EADFC6',
    tilt: '-3deg',
  },
  {
    emoji: '🐙',
    label: 'GitHub',
    sub: '@livieee',
    href: 'https://github.com/livieee',
    external: true,
    bg: '#D6E4D9',
    tilt: '4deg',
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-clip">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 bottom-[-30%] h-[560px] w-[560px] rounded-full bg-lavender/50 blur-[130px]" />
        <div className="absolute -right-32 top-[-20%] h-[480px] w-[480px] rounded-full bg-blush/50 blur-[120px]" />
      </div>
      <NetworkCanvas className="absolute inset-0 h-full w-full opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-44">
        <Reveal>
          <p className="label-text mb-6">Contact</p>
        </Reveal>

        {/* 一张浮在氛围层上的卡片：标题、入口、正文收在同一块白底里 */}
        <Reveal y={28}>
          <div className="max-w-2xl rounded-[1.8rem] border border-white/70 bg-white/85 p-7 shadow-[0_36px_80px_-40px_rgba(58,36,64,0.35)] backdrop-blur-md md:p-10">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] font-light leading-[1.05] text-plum">
              <WordReveal text="Let’s" />{' '}
              {/* 渐变字不能套 WordReveal：后者在内层加了 filter，子元素自成
                  渲染上下文，父级 background-clip: text 裁出来的渐变盖不到它，
                  字会整个变透明。所以动效直接挂在带渐变的这个元素本身 ——
                  transform / opacity 和 background-clip: text 不冲突 */}
              <motion.span
                className="gradient-text inline-block italic"
                initial={{ opacity: 0, y: 18, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                connect.
              </motion.span>
            </h2>

            <ul className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    {...(c.download ? { download: true } : {})}
                    className="group/tile flex w-full flex-col items-center rounded-[1rem] px-1.5 py-3 text-center transition-all duration-300 hover:-translate-y-1 sm:w-[132px] sm:px-3 sm:py-3.5"
                    style={{ transform: `rotate(${c.tilt})` }}
                  >
                    <span
                      aria-hidden
                      className="flex h-[54px] w-[54px] items-center justify-center rounded-[0.9rem] text-[26px] leading-none shadow-[0_10px_22px_-12px_rgba(58,36,64,0.5)] transition-transform duration-300 group-hover/tile:scale-[1.06] sm:h-[62px] sm:w-[62px] sm:rounded-[0.95rem] sm:text-[30px]"
                      style={{ backgroundColor: c.bg }}
                    >
                      {c.emoji}
                    </span>
                    <span className="mt-2.5 block text-[12.5px] font-medium leading-none text-plum">
                      {c.label}
                    </span>
                    <span className="mt-1 block w-full text-[10px] leading-tight text-plum-faint">
                      {c.sub}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ScrollLit
              className="mt-7 text-[15px] leading-relaxed md:text-base"
              text="I'm open to conversations about AI product operations, GTM strategy, partnerships, ecosystem programs, and collaborations worth building slowly — and to making friends who care about the same things."
            />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-8 flex max-w-3xl flex-wrap gap-2">
            {OPEN_TO.map((o) => (
              <span key={o} className="rounded-full border border-plum/15 bg-cream/70 px-4 py-1.5 text-[12px] font-medium text-plum-muted">
                {o}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-12 flex items-center gap-3 text-[13px] text-plum-faint">
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
