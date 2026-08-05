/**
 * 随滚动逐词点亮的段落。
 *
 * 和 WordReveal 不一样：那个是进场时播一次就完了；这个把**读者的滚动进度**
 * 直接绑到阅读节奏上 —— 滑多少，字亮多少。参考 Sentinel 那种下滑手感。
 *
 * 实现要点：
 * - 命名 view timeline 挂在段落上（view-timeline-name），每个词通过
 *   animation-timeline 引用它。不能让每个词各用自己的 view()：那样每个词
 *   看的是自己的可见度，同一行的词会一起亮，变成"一行一行跳"而不是逐词流过。
 * - 每个词用 animation-range 错开一小段区间，形成先后。
 * - 基线状态就是「已点亮」，动画只做增强；不支持 animation-timeline 的
 *   浏览器（Safari 18 以下）只是没有这个效果，一个字都不会丢。
 */
export function ScrollLit({
  text,
  className = '',
  /** 点亮过程占滚动区间的起止（相对 cover 的百分比） */
  from = 12,
  to = 62,
}: {
  text: string
  className?: string
  from?: number
  to?: number
}) {
  const words = text.split(/\s+/).filter(Boolean)
  const span = (to - from) / Math.max(1, words.length)

  return (
    <p className={`lit-para ${className}`}>
      {words.map((w, i) => {
        const start = from + i * span
        return (
          <span
            key={`${w}-${i}`}
            className="lit-word"
            // 每个词晚一点开始，且各自只用一小段区间点亮 —— 重叠一点更连贯
            style={{ ['--lit-range' as string]: `cover ${start.toFixed(2)}% cover ${(start + span * 2.2).toFixed(2)}%` }}
          >
            {w}{' '}
          </span>
        )
      })}
    </p>
  )
}
