import { Reveal, WordReveal } from '@/components/Reveal'
import { TimelineNode, type TimelineEntry } from '@/components/TimelineNode'

/** 左巷 · Education（35%） */
const EDUCATION: TimelineEntry[] = [
  {
    id: 'cmu',
    org: 'Carnegie Mellon University',
    role: 'M.S. Software Management (Product)',
    period: '2024–2025',
    location: 'Mountain View, CA',
    logo: '/logos/cmu.png',
    accent: '#B98ACB',
    bullets: [
      { text: 'Bosch — GenAI Analytics & Multi-Agent Pipeline.', logo: '/logos/bosch.png' },
      { text: 'IEEE Rising Stars 2026 — 1st Place ×2: AgeTech Pitch & Project Showcase.', logo: '/logos/ieee.png' },
    ],
    reflection: 'Where engineering rigor met product judgment — and the path converged on AI.',
    photos: [
      { src: '/images/photo-cmu-graduation.jpg', alt: 'Olivia at CMU graduation', caption: 'graduation day ✦' },
      { src: '/images/photo-cmu-group-1.jpg', alt: 'Olivia with friends at CMU graduation', caption: 'with my crew 🎈' },
      { src: '/images/photo-cmu-group-2.jpg', alt: 'CMU MSSM 2025 cohort at graduation', caption: "MSSM '25 Cohort 🎓" },
    ],
  },
  {
    id: 'western',
    org: 'Western University',
    role: 'Master of Data Analytics',
    period: '2019–2020',
    location: 'London, Canada',
    logo: '/logos/western.png',
    accent: '#D193A8',
    reflection: 'The data lens I still read every product decision through.',
  },
  {
    id: 'ubc',
    org: 'University of British Columbia',
    role: 'B.Sc. Computer Science',
    period: '2014–2019',
    location: 'Vancouver, Canada',
    logo: '/logos/ubc.png',
    accent: '#8FAE8B',
    bullets: ["Dean's Honour List."],
    reflection: 'Foundations first; the rest of the journey stands on this.',
    photo: { src: '/images/photo-graduation.jpg', alt: 'Olivia at UBC graduation', caption: 'Vancouver, 2019' },
  },
]

/** 右巷 · Experience（65%） */
const EXPERIENCE: TimelineEntry[] = [
  {
    id: 'yuto',
    org: 'YUTO USA Corporation',
    role: 'Technical Product Market Analyst',
    period: '2026–Present',
    location: 'Santa Clara',
    logo: '/logos/yuto.png',
    logoWide: true,
    accent: '#B98ACB',
    bullets: [
      'Shipped a 0→1 forecasting product solo — now in daily executive use.',
      'Run technical programs across 5+ workstreams for top consumer-tech accounts.',
    ],
    reflection: 'Proof that the whole toolkit — product, programs, technical depth — was always heading here.',
    relatedWork: { label: 'Related Work', href: '#case-yuto' },
  },
  {
    id: 'aivalley',
    org: 'AI Valley',
    role: 'Program Manager Intern — AI Platform',
    period: '2026',
    location: 'Mountain View',
    logo: '/logos/aivalley.png',
    accent: '#D193A8',
    bullets: [
      'Ran the Bay Area developer program calendar — hackathons, sprints, demo days.',
      'Led DevRel for a global build challenge with a leading open-weights lab.',
    ],
    reflection: 'Programs are products too — they live or die on the same clarity and care.',
    relatedWork: { label: 'Related Work', href: '#case-aivalley' },
  },
  {
    id: 'theta',
    org: 'Theta Health',
    role: 'Product Intern — AI Health Product',
    period: '2025',
    location: 'Woodside',
    logo: '/logos/theta.png',
    accent: '#C79A4B',
    bullets: [
      'Shaped a HIPAA-compliant AI Scribe MVP from 5+ physician interviews.',
      'Reshaped the Healthcare MCP roadmap and landed the first clinic pilot.',
    ],
    reflection: 'Adoption is a human problem before it is a technical one.',
    relatedWork: { label: 'Related Work', href: '#case-theta' },
  },
  {
    id: 'xpertbay',
    org: 'Xpertbay',
    role: 'Product Manager',
    period: '2023–2024',
    location: 'Remote, Canada',
    logo: '/logos/xpertbay.png',
    logoWide: true,
    accent: '#8FAE8B',
    bullets: ['Owned a two-sided talent marketplace — activation, matching, NPS.'],
    reflection: 'First full product ownership — where I learned to trust the process of listening, then building.',
  },
  {
    id: 'peopleai',
    org: 'People.ai',
    role: 'Technical Product Analyst',
    period: '2021–2023',
    location: 'Toronto',
    logo: '/logos/peopleai.png',
    accent: '#B98ACB',
    bullets: [
      'Built a Tableau ROI dashboard spanning 50+ enterprise clients.',
      'Drove churn −6%, adoption +13% — company award for customer-first ownership.',
    ],
    reflection: 'Where I learned that enterprise trust is earned in the details.',
    relatedWork: { label: 'Related Work', href: '#case-peopleai' },
  },
  {
    id: 'adastra',
    org: 'Adastra North America',
    role: 'Data Science Consultant',
    period: '2020',
    location: 'Toronto',
    logo: '/logos/adastra.png',
    logoWide: true,
    accent: '#D193A8',
    reflection: 'The first step from pure data into client-facing product thinking.',
  },
]

/** 背景淡路线：Vancouver → Toronto → Bay Area */
const ROUTE = [
  { city: 'Vancouver', color: '#8FAE8B' },
  { city: 'Toronto', color: '#D193A8' },
  { city: 'Bay Area', color: '#B98ACB' },
]

/**
 * The Journey So Far — 双巷 résumé 时间线。
 * 左 35% Education / 右 65% Experience，共用一个时间叙事但视觉分栏，
 * 便于 recruiter 快速扫读；背景一条淡地理路线呼应真实迁移。
 */
export function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-white/50">
      {/* 背景淡路线（非主结构，仅地理呼应） */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.5]" fill="none">
          <path
            d="M120 620 C 320 560, 520 600, 700 520 S 1020 380, 1120 300"
            stroke="#B98ACB"
            strokeOpacity="0.18"
            strokeWidth="1.6"
            strokeDasharray="2 7"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute bottom-[16%] left-[8%] flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `${ROUTE[0].color}66` }} />
          <span className="font-hand text-[13px] text-plum-faint/70">{ROUTE[0].city}</span>
        </div>
        <div className="absolute bottom-[30%] left-[44%] flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `${ROUTE[1].color}66` }} />
          <span className="font-hand text-[13px] text-plum-faint/70">{ROUTE[1].city}</span>
        </div>
        <div className="absolute bottom-[10%] right-[6%] flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `${ROUTE[2].color}66` }} />
          <span className="font-hand text-[13px] text-plum-faint/70">{ROUTE[2].city}</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        {/* 标题区 */}
        <Reveal>
          <p className="label-text mb-5 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            Journey
          </p>
        </Reveal>
        <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3.1rem)] font-light leading-[1.12] text-plum">
          <WordReveal text="The Journey So Far ✦" />
        </h2>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-plum-muted">
            From data and technology to AI products, programs, and partnerships.
          </p>
        </Reveal>

        {/* 双巷：Education 35% / Experience 65%（lg 起才分栏，中等宽度保持单列不挤） */}
        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-[38fr_62fr] lg:gap-16">
          {/* 移动端：Experience 先（order-1），Education 后（order-2） */}
          {/* Education */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="mb-8">
                <h3 className="flex items-center gap-3 font-serif text-[24px] font-normal text-plum md:text-[26px]">
                  <span aria-hidden className="text-orchid">
                    {/* graduation cap */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                      <path d="M22 9.5 12 5 2 9.5l10 4.5 10-4.5Z" />
                      <path d="M6 11.8v4.4c0 1.1 2.7 2.6 6 2.6s6-1.5 6-2.6v-4.4" />
                      <path d="M22 9.5V15" />
                    </svg>
                  </span>
                  Education
                </h3>
                <p className="mt-1.5 pl-[34px] font-hand text-[15px] text-plum-faint">where it started</p>
              </div>
            </Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="absolute bottom-2 left-[7px] top-8 w-0 border-l border-dashed border-orchid/40 md:left-[8px]"
              />
              <ol className="space-y-6 md:space-y-7">
                {EDUCATION.map((e, i) => (
                  <TimelineNode key={e.id} entry={e} index={i} />
                ))}
              </ol>
            </div>
          </div>

          {/* Experience */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="mb-8">
                <h3 className="flex items-center gap-3 font-serif text-[24px] font-normal text-plum md:text-[26px]">
                  <span aria-hidden className="text-rose">
                    {/* briefcase */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                      <rect x="3" y="7" width="18" height="13" rx="2.5" />
                      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
                      <path d="M3 12.5c3 1.1 6 1.7 9 1.7s6-.6 9-1.7" />
                    </svg>
                  </span>
                  Experience
                </h3>
                <p className="mt-1.5 pl-[34px] font-hand text-[15px] text-plum-faint">little big steps</p>
              </div>
            </Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="absolute bottom-2 left-[7px] top-8 w-0 border-l border-dashed border-rose/40 md:left-[8px]"
              />
              <ol className="space-y-5 md:space-y-6">
                {EXPERIENCE.map((e, i) => (
                  <TimelineNode key={e.id} entry={e} index={i} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
