import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { BackLink } from '@/components/BackLink'

/**
 * /writing —— 六篇课后反思。
 *
 * 原文是 CMU 课程作业，每篇四段：讲者摘要 / 讲者原话 / Personal Learning /
 * Possible Use Case。这里**只收后两段** —— 前两段是复述别人讲了什么、
 * 引用别人的原话，课堂客座讲座不是公开场合，不该替讲者发布。
 *
 * 文字按站上的语气压过一遍（原文是学生论文腔），但论点、例子、立场
 * 全部是她原文里的，没有新增观点。改写前后对照留在 PR 描述里。
 * 抬头的 Andrew ID 不上站。
 */

type Piece = {
  n: string
  topic: string
  title: string
  /** 她的思考 */
  body: string[]
  /** 她推演的用法 */
  useCase: string
}

const PIECES: Piece[] = [
  {
    n: '01',
    topic: 'Generative AI in robotics',
    title: 'Build on what already works',
    body: [
      'Generative AI did not replace the classical algorithms in robotics. It filled in where they ran out. That is the pattern worth copying — find the edge of the system you have, then extend it.',
      'The harder constraint is data. Robots differ by type and by gripper, so accuracy is won or lost in the corner cases. And in something like robotic surgery, trust is not a feature you add later; the fail-safe is the product.',
      'What stayed with me: choose the problems where AI’s particular strengths actually matter. Being able to automate something is not the same as it being worth automating.',
    ],
    useCase:
      'Warehouse robots that take instructions in plain language — "pick items for order #12345", "reorganise inventory by category" — so running them stops requiring someone who can program them.',
  },
  {
    n: '02',
    topic: 'AI infrastructure',
    title: 'Multimodal work is mostly trial and error',
    body: [
      'Multimodal models are far more data-hungry than the text-only ones, and the work around them is mostly trial and error. That puts the weight on tooling: if the infrastructure cannot keep up with how often you need to try something, the model is not the bottleneck.',
      'The advice that landed was to get your hands dirty with the workflows rather than the theory — and the observation that AI-assisted coding has made learning and building an order of magnitude easier. Both point the same way: the cost of trying something has collapsed, so the scarce thing is knowing what to try.',
    ],
    useCase:
      'Healthcare, where the data is already multimodal. Patient history, imaging and genomic profiles are the kind of load GPUs are good at, and precision medicine is what you get when you can hold all three at once.',
  },
  {
    n: '03',
    topic: 'Cheap models, and who they help',
    title: 'Efficient beats powerful',
    body: [
      'A cheaper model does not just help the people building models. It lowers the entry barrier for everyone downstream, which is where most of the value shows up.',
      'The shift this points to is that models have to become computationally efficient, not only more capable — closer to how a brain handles information. Capability alone stopped being the interesting axis.',
      'The counterweight is oversight. In an industry like insurance, automation improves claim accuracy and speed, but fairness and quality still need a person in the loop. The useful shape is hybrid, not autonomous.',
    ],
    useCase:
      'Drone inspection of bridges, power lines and pipelines — assets where a missed fault is expensive and a human inspection is dangerous. Pair the imaging with predictive analytics and the same system tells a property owner what to fix before it breaks.',
  },
  {
    n: '04',
    topic: 'Distributed computing',
    title: 'The shift from data volume to data quality',
    body: [
      'The part that reframed things for me: AI development has moved from wanting more data to wanting better data — and curation and filtering cost compute too. The spend does not go down, it moves.',
      'Which is why I think demand for high-performance GPUs keeps climbing, the way phone storage did. That reads as counterintuitive against how the market reacts to each efficiency breakthrough, but the two are not in conflict: scaling across machines and optimising within one machine solve different halves of the same problem.',
      'Distributed AI workflows used to be an abstraction to me. Seeing where they actually bite — drug discovery, quantitative trading, coding assistance — made the infrastructure side the part I want to understand better.',
    ],
    useCase:
      'Fraud detection on top of legacy financial infrastructure, where the limit is rarely the model and usually the system it has to run on. The same scheduling idea keeps e-commerce fulfilment from buckling at peak hours.',
  },
  {
    n: '05',
    topic: 'Measuring engineers',
    title: 'Lines of code is a bad proxy for contribution',
    body: [
      'Performance reviews still lean on lines of code and tickets closed. Those numbers miss depth, problem-solving and technical leadership entirely — the things a good engineer is actually valued for.',
      'Turning real contributions into qualitative insight changes who owns the story. An engineer stops being measured by a flawed indicator and starts being able to make the case themselves.',
      'The tension is privacy. Keeping the data local is what makes this adoptable inside a company — but building on third-party models reintroduces exactly the exposure that local storage was meant to avoid. That is the gap worth closing.',
    ],
    useCase:
      'Hiring. Evaluate candidates on what they have actually built rather than on a résumé and a whiteboard round — and give people the same view of their own gaps, with a path through them.',
  },
  {
    n: '06',
    topic: 'AI and software careers',
    title: 'Focus on software, not on being a programmer',
    body: [
      'The part I keep returning to is hiring. Fewer junior engineers are being hired, which raises a real question about where entry-level experience is supposed to come from now.',
      'If anyone can build software, the product role has to change shape. Defining features and coordinating teams was always the smaller half; when execution gets cheap, how you design, define and deliver is the whole job — and iteration cycles get fast enough that strategy has to keep up.',
      'None of which removes the need for oversight. Hallucination, security holes and integration with systems that already exist are still human problems. The expertise moves up the stack; it does not disappear.',
    ],
    useCase:
      'Development workflows where the repetitive parts — standard functions, test cases, security scanning before deploy — stop consuming the day, and what is left is the part that needed judgement anyway.',
  },
]

export function Writing() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Writing">
          <BackLink />
          <Link to="/" className="font-serif text-[15px] text-plum transition-colors hover:text-orchid">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <p className="label-text mb-5 flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-orchid" />
            Writing
          </p>
        </Reveal>

        <h1 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.15] text-plum">
          <WordReveal text="Six things I thought about" />{' '}
          <span className="italic text-orchid">
            <WordReveal text="while the field moved." delay={0.26} />
          </span>
        </h1>

        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-plum-muted">
            Notes written after guest lectures at CMU in early 2025 — infrastructure, robotics,
            cheap models, and what all of it does to the job. These are my own takeaways only;
            what the speakers said stays in their room.
          </p>
        </Reveal>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
          {PIECES.map((p, i) => (
            <Reveal key={p.n} delay={0.05 + i * 0.04} y={24}>
              <article className="border-t border-plum/10 pt-8">
                <p className="mb-3 flex items-baseline gap-3">
                  <span aria-hidden className="font-serif text-[20px] font-light leading-none text-rose/45">
                    {p.n}
                  </span>
                  <span className="label-text">{p.topic}</span>
                </p>

                <h2 className="font-serif text-[22px] font-light leading-snug text-plum md:text-[26px]">
                  {p.title}
                </h2>

                <div className="mt-4 space-y-3.5">
                  {p.body.map((t) => (
                    <p key={t.slice(0, 32)} className="text-[15px] leading-relaxed text-plum-muted">
                      {t}
                    </p>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.1rem] border border-plum/10 bg-white/60 p-5">
                  <p className="mb-1.5 text-[10.5px] uppercase tracking-[0.18em] text-plum-faint">
                    Where I'd point it
                  </p>
                  <p className="text-[14px] leading-relaxed text-plum-muted">{p.useCase}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-plum/10 pt-8">
            <Link
              to="/work"
              className="rounded-full border border-plum/15 bg-white px-5 py-2.5 text-[13px] font-medium text-plum transition-colors hover:border-rose/50"
            >
              ← All work
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
