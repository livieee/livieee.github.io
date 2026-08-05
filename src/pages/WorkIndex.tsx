import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { tagStyle } from '@/components/TagTint'

/**
 * /work —— 作品索引页。
 *
 * 首页的 Selected Impact 是"叙事"：四个案例按故事顺序铺开、各带媒体与指标，
 * 一屏一个。这一页是"目录"：全部项目一览、可扫读、直接进各自的案例页。
 * 文案里不写具体数量 —— 项目会增减，写死了就得记着回来改。
 * 两者服务的不是同一件事，所以首页那一段保留，不做替换。
 *
 * 封面尽量用真实的产品界面 / 系统图 / 现场照，不用抽象插画 —— 索引页上
 * 封面是唯一的视觉证据。唯一的例外是 Yuto（见下方注释）。
 *
 * ⚠️ 文案与标签全部取自已有的首页卡片与各案例页，不新写、不加工。
 *    Yuto 那条沿用首页已脱敏的口径（不出现来源站点、品类、价格、收件人）。
 */

type Project = {
  n: string
  eyebrow: string
  title: string
  blurb: string
  tags: string[]
  img: string
  /** 有案例页就给路径；没有就留空，卡片不可点 */
  href?: string
  /** 没有案例页时的说明 */
  note?: string
}

const PROJECTS: Project[] = [
  {
    n: '01',
    eyebrow: 'AI Product Development · Theta Health',
    title: 'Giving clinicians their time back with a 0-to-1 AI Scribe',
    blurb:
      'From 5+ physician interviews to prompt design and workflow mapping — a HIPAA-compliant AI Scribe MVP, and its first clinic pilot.',
    tags: ['Product discovery', 'LLM prompt design', 'HIPAA-compliant infra', 'Clinical workflow'],
    // 整屏 UI 缩到卡片尺寸只剩噪点，裁到读得出的局部
    img: '/covers/theta.jpg',
    href: '/work/theta',
  },
  {
    n: '02',
    eyebrow: 'Enterprise AI Product · Bosch × CMU',
    title: 'Three disconnected tools, one continuous pipeline',
    blurb:
      'Enterprise teams lost the thread between query, analysis and charts. I designed the workflow that made it one.',
    tags: ['Product Strategy', 'Workflow Design', 'MVP Definition', 'PRDs'],
    img: '/covers/askdata.jpg',
    href: '/work/genai-analytics',
  },
  {
    n: '03',
    eyebrow: 'Multi-agent System · Bosch × CMU',
    title: 'Schema Extraction Agents',
    blurb:
      'A multi-agent system that reads messy enterprise PDFs — and only ships schema it can prove it trusts.',
    tags: ['System architecture', 'Validator design', 'Multi-agent'],
    // 架构总图在卡片尺寸下只剩噪点；这张判定树小图也读得清，
    // 而且正好画的就是这条卡片讲的'凭什么信'
    img: '/bosch/ic/decision-tree.png',
    href: '/work/bosch-schema',
  },
  {
    n: '04',
    eyebrow: 'GTM & AI Ecosystem Partnerships',
    title: 'Creating spaces where people come to build',
    blurb:
      'From global builder challenges to Bay Area hackathons and founder conversations — programs that connect partner goals with builders.',
    tags: ['Ecosystem Partnerships', 'Developer Programs', 'Program Strategy'],
    img: '/events/gtc-fireside.jpg',
    href: '/work/ai-valley',
  },
  {
    n: '05',
    eyebrow: 'Research & Interaction · IEEE Rising Stars 2026',
    title: 'Making inner states visible through living art',
    blurb:
      'An EEG-driven generative experience that turned real-time emotional signals into evolving visual art — Project Showcase, first place.',
    tags: ['Product UI', 'Experience framing', 'Research communication'],
    img: '/ieee/mode-calm.jpg',
    href: '/work/therapy-as-living-art',
  },
  {
    n: '06',
    eyebrow: 'Applied AI at Work · Yuto USA',
    title: 'Shipping AI the executive team uses daily',
    blurb:
      'At an advanced-materials company, I shipped a 0-to-1 forecasting product to production — built solo with agentic coding, fully traceable, with human override.',
    tags: ['Agentic coding', 'Technical program management', 'Market & GTM research'],
    // 只有这一条用抽象图：产品界面里全是真实的来源、品类与价格，
    // 按脱敏要求不能出现，所以不放真实截图
    img: '/images/case-industry.jpg',
    note: 'Internal product — no public case study',
  },
]

function Card({ p, i }: { p: Project; i: number }) {
  const inner = (
    <>
      <span className="halftone relative block overflow-hidden rounded-[1.1rem] border border-plum/10 bg-cream-soft">
        <img
          src={p.img}
          alt=""
          aria-hidden
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover/w:scale-[1.05]"
        />
      </span>

      <span className="mt-5 flex items-baseline gap-3">
        <span aria-hidden className="font-serif text-[22px] font-light leading-none text-rose/45">
          {p.n}
        </span>
        <span className="label-text">{p.eyebrow}</span>
      </span>

      <h2 className="mt-3 font-serif text-[19px] font-light leading-snug text-plum md:text-[21px]">
        {p.title}
      </h2>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-plum-muted">{p.blurb}</p>

      <span className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border px-2.5 py-[3px] text-[10.5px] font-medium leading-none"
            style={tagStyle(t)}
          >
            {t}
          </span>
        ))}
      </span>

      <span className="mt-5 flex items-center gap-2 text-[12.5px] font-medium">
        {p.href ? (
          <>
            <span
              aria-hidden
              className="block h-px w-5 bg-plum/25 transition-all duration-500 group-hover/w:w-8 group-hover/w:bg-rose"
            />
            <span className="text-plum-muted transition-colors group-hover/w:text-plum">
              Read the case study
            </span>
          </>
        ) : (
          <span className="text-plum-faint">{p.note}</span>
        )}
      </span>
    </>
  )

  const cls =
    'group/w flex h-full flex-col rounded-[1.4rem] border border-plum/10 bg-white/60 p-5 transition-all duration-500 md:p-6'

  return (
    <Reveal delay={0.05 + i * 0.06} y={22} className="h-full">
      {p.href ? (
        <Link
          to={p.href}
          state={{ from: 'work' }}
          className={`${cls} hover:-translate-y-1 hover:border-rose/35 hover:bg-white`}
        >
          {inner}
        </Link>
      ) : (
        <article className={cls}>{inner}</article>
      )}
    </Reveal>
  )
}

export function WorkIndex() {
  return (
    <main className="min-h-screen bg-cream">
      {/* 与其他案例页同一套顶栏 */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Work index">
          <Link
            to="/"
            className="group/logo flex items-baseline gap-2 font-serif text-lg font-medium tracking-tight text-plum"
          >
            <span
              aria-hidden
              className="text-sm text-orchid/70 transition-transform duration-300 group-hover/logo:-translate-x-0.5"
            >
              ←
            </span>
            <span>Olivia Xiao</span>
          </Link>
          <div className="flex items-center gap-5">
            {/* 当前就在这一页，标出来而不是给一个转圈的链接 */}
            <span aria-current="page" className="text-[13px] font-medium text-plum">
              All work
            </span>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
        <Reveal>
          <p className="label-text mb-5 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            All work
          </p>
        </Reveal>

        <h1 className="max-w-3xl font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="Everything I've built —" />{' '}
          <span className="italic text-orchid">
            <WordReveal text="products, systems, and the programs around them." delay={0.24} />
          </span>
        </h1>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
            The same throughline runs through all of them — make it adopted, not just shipped.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 md:mt-16 md:grid-cols-2 md:gap-7">
          {PROJECTS.map((p, i) => (
            <Card key={p.n} p={p} i={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-plum/10 pt-8">
            <Link
              to="/#impact"
              className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              ← See them in context
            </Link>
            <a
              href="mailto:olivia.zxiao@gmail.com"
              className="rounded-full bg-rose px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-plum"
            >
              Say Hello
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
