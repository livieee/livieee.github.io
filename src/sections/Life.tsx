import { motion } from 'motion/react'
import { Reveal, WordReveal } from '@/components/Reveal'

const MOMENTS = [
  {
    src: '/images/photo-cmu-graduation.jpg',
    alt: 'Olivia celebrating graduation at Carnegie Mellon University, holding a bouquet',
    note: 'closing one chapter, opening the next',
    rotate: '-rotate-2',
  },
  {
    src: '/images/photo-conference.jpg',
    alt: 'Olivia at a global IEEE AI technology conference, wearing a speaker badge',
    note: 'following emerging AI — and the people around it',
    rotate: 'rotate-1',
  },
  {
    src: '/images/photo-gallery.jpg',
    alt: 'Olivia in a sunlit art museum atrium, holding an exhibition book',
    note: 'design, culture & slow museum afternoons',
    rotate: '-rotate-1',
  },
]

const THREADS = [
  'Thoughtful conversations over good coffee',
  'Exploring the Bay Area, one trail and café at a time',
  'Connecting people from different backgrounds',
  'Food & shared experiences as a love language',
]

/**
 * Life — “A Little More Human”。拍立得照片 + 简短生活线索，
 * 轻松但有分寸，保持专业气质。
 */
export function Life() {
  return (
    <section id="life" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="label-text mb-6">Life</p>
      </Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="A little more" />{' '}
          <span className="italic text-rose">
            <WordReveal text="human." delay={0.2} />
          </span>
        </h2>
        <Reveal delay={0.15}>
          <p className="max-w-xs text-sm leading-relaxed text-plum-muted">
            The person behind the profile — what I notice, where I wander, and the people
            I like bringing together.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {MOMENTS.map((m, i) => (
          <Reveal key={m.src + i} delay={i * 0.1} y={24}>
            <motion.figure
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className={`bg-white p-2.5 pb-3 shadow-soft ${m.rotate}`}
              data-hover
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                draggable={false}
                className="w-full object-cover"
                style={{ aspectRatio: '4/5' }}
              />
              <figcaption className="mt-2.5 px-1 text-center font-hand text-lg leading-tight text-plum-muted">
                {m.note}
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-plum/10 pt-8">
        {THREADS.map((t, i) => (
          <Reveal key={t} delay={i * 0.06} y={10}>
            <p className="flex items-baseline gap-2 text-[13px] text-plum-muted">
              <span className="text-orchid">✦</span>
              {t}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
