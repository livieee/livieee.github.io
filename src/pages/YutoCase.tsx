import { Link } from 'react-router'
import { Reveal, WordReveal } from '@/components/Reveal'
import { OutcomeStrip } from '@/components/OutcomeStrip'
import { BackLink } from '@/components/BackLink'
import { DailyReportCard } from '@/components/DailyReportCard'

/**
 * Applied AI at Work · Yuto USA — Innovation & Research Center, Santa Clara.
 *
 * 这一页讲的是一个双向的角色：一边把前沿科技客户接进来，一边把公司的技术能力
 * 变成别人真的会用的东西。四条线各自成章，不按时间线铺。
 *
 * ⚠️ 脱敏（按她逐条确认过的口径）：
 *   - 客户一律不实名，只留能辨识方向的暗示（"平台级 AR/VR 与机器人客户"）
 *   - 展会不写主办方名字，只写"一家头部科技公司的供应商技术开放日"
 *   - CPO / 光电封装相关的技术细节整段不写
 *   - 价格产品：不写来源站点、不写品类名、不写价格、不写收件人、
 *     不放仓库或 demo 链接（那个页面会露出品名和一个来源名，
 *     链过去等于把她的名字和它绑在一起）
 *   数字全部来自她本人提供的口径，或从仓库里实测得出。
 */

const TAGS = [
  'Strategic accounts',
  'Partner activation',
  'AI product 0→1',
  'Technical GTM',
]

/** 五层：从原始行情到一份可执行的建仓方案 */
const LAYERS = [
  {
    n: '01',
    name: 'Collection',
    body: 'Daily multi-source collection, with tax and grade differences reconciled into one comparable number.',
  },
  {
    n: '02',
    name: 'Forecasting',
    body: 'A model chosen by competition, not by preference — and re-challenged on every run.',
  },
  {
    n: '03',
    name: 'Strategy desk',
    body: 'Scenarios, cost ranking, and an RFQ loop, in the shape the business already thinks in.',
  },
  {
    n: '04',
    name: 'Allocation',
    body: 'A greedy engine proposes positions. Every one of them stays editable by hand.',
  },
  {
    n: '05',
    name: 'Reporting',
    body: 'A report generated and published on schedule. Nobody has to remember to send it.',
  },
]

const ACCOUNTS = [
  {
    who: 'A platform-scale AR/VR and robotics customer',
    what: 'Built the US-side interface and a cross-category coordination mechanism; drove share growth, NRE negotiation, and expansion into new categories.',
  },
  {
    who: 'A leading consumer-electronics customer',
    what: 'Produced technical proposals and project documentation across advanced packaging, wireless power, and circularity.',
  },
  {
    who: 'A consumer-goods customer',
    what: 'Supported multi-line packaging programs — new product introduction and line adaptation; owned meeting cadence and documentation.',
  },
  {
    who: 'A major e-commerce and logistics customer',
    what: 'Produced and localised a five-year strategy for their robotics business, in both languages.',
  },
]

function Chapter({
  n,
  label,
  title,
  intro,
  className = 'mt-24',
}: {
  n: string
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <Reveal className={className}>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-serif text-[15px] leading-none text-orchid">{n}</span>
        <span aria-hidden className="h-px w-6 shrink-0 bg-plum/20" />
        <p className="label-text">{label}</p>
      </div>
      <h2 className="max-w-2xl font-serif text-2xl font-light leading-snug text-plum md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-muted">{intro}</p>}
    </Reveal>
  )
}

export function YutoCase() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/85 shadow-[0_1px_0_0_rgba(58,36,64,0.06)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10" aria-label="Case">
          <BackLink />
          <Link to="/" className="font-serif text-[15px] text-plum transition-colors hover:text-orchid">
            ⌐ Hi, I'm Olivia <span aria-hidden className="text-orchid">↘</span>
          </Link>
        </nav>
      </header>

      <article className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-plum/10">
              <img src="/logos/yuto.png" alt="Yuto" className="h-5 w-5 object-contain" />
            </span>
            <p className="label-text">Applied AI at Work</p>
          </div>
        </Reveal>

        <h1 className="max-w-3xl font-serif text-[clamp(2rem,5.4vw,3.6rem)] font-light leading-[1.08] text-plum">
          <WordReveal text="The interface between frontier customers" />{' '}
          <span className="italic text-orchid">
            <WordReveal text="and what we can actually build." delay={0.3} />
          </span>
        </h1>

        <Reveal delay={0.18}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            The role runs in two directions. One way, I hold the relationships with frontier-technology
            customers from the US side. The other way, I turn what we learn there into things people
            use — internal tools, technical proposals, and the materials the centre goes to market with.
            The work spans several frontier hardware categories.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-orchid/35 bg-lavender/40 px-3.5 py-1.5 text-[11.5px] font-medium text-plum"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-label text-plum-faint">
            Yuto USA · Innovation &amp; Research Center, Santa Clara · 2026–present
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.3}>
          <OutcomeStrip
            variant="pastel"
            note="From the product I built"
            items={[
              { n: 13, label: 'forecasting models benchmarked walk-forward' },
              { n: 7.5, suffix: '%', label: 'one-month error, down from 9.2%' },
              { n: 90, suffix: '%', label: 'directional accuracy at one month' },
            ]}
          />
        </Reveal>

        {/* ── 01 · 战略客户 ─────────────────────────────────────── */}
        <Chapter
          n="01"
          label="Strategic accounts & partnerships"
          title="Being the person on this side of the ocean"
          intro="Several North American frontier-technology accounts, held from the US side: building the interface, growing share, and getting commercial terms to land. Customers are described, not named."
          className="mt-20"
        />
        <Reveal className="mt-8" y={24}>
          <ul className="grid gap-4 md:grid-cols-2">
            {ACCOUNTS.map((a, i) => (
              <li
                key={a.who}
                className="rounded-[1.2rem] border border-plum/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                style={{ animation: `annot-in .5s ${0.1 + i * 0.08}s ease-out both` }}
              >
                <p className="font-serif text-[16px] font-light leading-snug text-plum">{a.who}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{a.what}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── 02 · 生态活动 ─────────────────────────────────────── */}
        <Chapter
          n="02"
          label="Ecosystem & partner activation"
          title="A trade booth is a channel, if you treat it like one"
          intro="I led our technical showcase at a major technology company's supplier tech day. The brief was to exhibit. What I wanted was a way in."
        />
        <Reveal className="mt-8" y={24}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: 'End to end', v: 'Content, booth flow, a dual-screen content loop, on-site hosting and travel.' },
              { k: '11 supplier decks', v: 'Benchmarked and reviewed against ours before anything went on a screen.' },
              { k: '100+ people', v: 'Procurement leads and engineers across multiple departments, in one day.' },
            ].map((c, i) => (
              <div
                key={c.k}
                className="rounded-[1.2rem] border border-plum/10 bg-white/70 p-5"
                style={{ animation: `annot-in .5s ${0.1 + i * 0.1}s ease-out both` }}
              >
                <p className="font-serif text-[17px] font-light leading-none text-orchid">{c.k}</p>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-plum-muted">{c.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-5" delay={0.1}>
          <p className="max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            It opened several new procurement touchpoints — the kind that are hard to create from a
            cold email and easy to create when an engineer is already standing in front of the part.
          </p>
        </Reveal>

        {/* ── 03 · 产品化 ───────────────────────────────────────── */}
        <Chapter
          n="03"
          label="Product commercialization"
          title="A decision tool, built alone, used daily by the person deciding"
          intro="A commodity price forecasting and procurement product — five layers, from collection to a report that sends itself. I built it end to end. The business lead uses it for real purchasing decisions, which is the only test that counts."
        />

        <Reveal className="mt-8" y={26}>
          <div className="rounded-[1.4rem] border border-plum/10 bg-white/60 p-5 md:p-7">
            <DailyReportCard />
            <p className="mt-4 text-[12px] leading-relaxed text-plum-faint">
              Illustrative view. Sources, categories and figures are omitted — this is internal
              commercial data.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8" y={24}>
          <ol className="grid gap-3 md:grid-cols-5">
            {LAYERS.map((l, i) => (
              <li
                key={l.n}
                className="rounded-[1.1rem] border border-plum/10 bg-white/70 p-4"
                style={{ animation: `annot-in .5s ${0.08 + i * 0.07}s ease-out both` }}
              >
                <p className="font-serif text-[13px] leading-none text-orchid">{l.n}</p>
                <p className="mt-2 text-[13px] font-medium leading-none text-plum">{l.name}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-plum-muted">{l.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Chapter
          n="—"
          label="The part that decides whether anyone trusts it"
          title="A visible “?” beats a plausible wrong number"
          intro="One source publishes its numbers as an image, so the pipeline reads them with a vision model. Accuracy is not the interesting problem. Two specific failures are, because both produce output that looks right."
          className="mt-16"
        />
        <Reveal className="mt-8" y={24}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                k: 'Rounding to a comfortable number',
                v: 'A model that reads 712 and writes 700 has produced a number a human will never question.',
              },
              {
                k: 'Drifting a row',
                v: 'A price that lands one line off is still a real price — just attached to the wrong thing.',
              },
            ].map((c, i) => (
              <div
                key={c.k}
                className="rounded-[1.2rem] border border-rose/25 bg-blush/25 p-5"
                style={{ animation: `annot-in .5s ${0.1 + i * 0.1}s ease-out both` }}
              >
                <p className="font-medium text-[14px] leading-snug text-plum">{c.k}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-plum-muted">{c.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-5" delay={0.1}>
          <p className="max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            So the instruction is to never guess a digit. Uncertain characters come through as
            placeholders for a human to resolve. Around that: upsampling before reading,
            cross-checks that reject a reading when two different rows return the same value, and
            diagnostic fields recording which row and which column the model believed it was reading.
          </p>
        </Reveal>

        <Chapter
          n="—"
          label="Designing for “nobody presses go”"
          title="The failure mode isn't a bug. It's a person being on holiday."
          className="mt-16"
        />
        <Reveal className="mt-8" y={24}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Several staggered attempts, one report. Scheduled jobs get skipped under load, so the run tries again and marks the day done on first success.',
              'Retries per source, then a different route entirely when direct access keeps failing.',
              'Each row files itself under the date the data claims, not the date it was fetched — a Monday collection of Friday’s numbers lands on Friday.',
              'Silence is a valid outcome. No update, no report. An empty inbox means nothing changed, not that something broke.',
            ].map((t, i) => (
              <li
                key={t}
                className="flex gap-3 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 text-[13.5px] leading-relaxed text-plum-muted"
                style={{ animation: `annot-in .5s ${0.08 + i * 0.08}s ease-out both` }}
              >
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orchid" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-5" delay={0.1}>
          <p className="max-w-2xl text-[15px] leading-relaxed text-plum-muted">
            The forecast keeps re-testing itself too: every run replays the backtest and only raises
            a flag when a challenger model wins decisively. And every proposed position stays
            editable — the tool argues, the person decides.
          </p>
        </Reveal>

        {/* ── 04 · 技术 GTM ─────────────────────────────────────── */}
        <Chapter
          n="04"
          label="Technical GTM & market intelligence"
          title="Turning what's coming into what we choose"
          intro="Research that ends in a decision — which technologies the centre invests in, and how it describes itself to the outside."
        />
        <Reveal className="mt-8" y={24}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Led a government R&D grant application through 14+ revisions under strict word limits.',
              'Led NDA drafting for a research collaboration with a semiconductor partner.',
              'Produced technology roadmap and supplier-landscape studies that fed the centre’s technology selection.',
              'Built the centre’s external capability and marketing materials.',
            ].map((t, i) => (
              <li
                key={t}
                className="flex gap-3 rounded-[1.1rem] border border-plum/10 bg-white/60 p-4 text-[13.5px] leading-relaxed text-plum-muted"
                style={{ animation: `annot-in .5s ${0.08 + i * 0.08}s ease-out both` }}
              >
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── 脱敏说明 ─────────────────────────────────────────── */}
        <Reveal className="mt-16" y={20}>
          <p className="max-w-2xl border-t border-plum/10 pt-6 text-[12.5px] leading-relaxed text-plum-faint">
            Internal work at Yuto USA. Customers, event hosts, data sources, product categories and
            figures are generalised or omitted throughout. Everything described here is work I did;
            nothing confidential is reproduced.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <div className="flex flex-wrap items-center gap-4 border-t border-plum/10 pt-8">
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
      </article>
    </main>
  )
}
