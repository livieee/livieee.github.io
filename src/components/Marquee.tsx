const ITEMS = [
  'AI Product',
  'GTM Strategy',
  'Strategic Partnerships',
  'Developer Ecosystems',
  'Program Execution',
  'Cross-Cultural Perspective',
]

export function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-plum/10 bg-cream-soft/60 py-5" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-lg font-light italic text-plum-muted md:text-xl">{item}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${i % 2 === 0 ? 'bg-orchid' : 'bg-rose-soft'}`} />
          </span>
        ))}
      </div>
    </div>
  )
}
