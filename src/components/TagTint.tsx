/**
 * 标签按「说的是哪一类事」上色，而不是逐个手写颜色。
 *
 * 逐个定色的话，每加一个新标签就得回来补一行，漏了就是灰的；按关键词归类，
 * 新标签自动落到对应色相。规则从上往下匹配，第一条命中的算数 —— 所以更具体
 * 的类别要排在前面（"Product Marketing" 归叙事，不归产品）。
 *
 * 全部用内联 rgba 而不是 Tailwind 的透明度类：这套色值不在默认刻度上，
 * 写成 bg-[#7A4A85]/12 那种是不会生成 CSS 的（这个坑本仓库踩过三次）。
 */

type Tint = { bg: string; fg: string; border: string }

const FAMILIES: { test: RegExp; tint: Tint }[] = [
  // 讲故事、对外沟通
  {
    test: /marketing|storytelling|communication|pitch|narrative|research communication/i,
    tint: { bg: 'rgba(209, 147, 168, 0.13)', fg: '#9A5F73', border: 'rgba(209, 147, 168, 0.28)' },
  },
  // 合作与生态
  {
    test: /partnership|ecosystem|developer program|program|gtm|market/i,
    tint: { bg: 'rgba(222, 168, 90, 0.16)', fg: '#8A6733', border: 'rgba(222, 168, 90, 0.32)' },
  },
  // 技术与系统
  {
    test: /infra|architecture|agentic|multi-agent|validator|technical|llm|prompt|hipaa|compliance/i,
    tint: { bg: 'rgba(106, 154, 122, 0.15)', fg: '#4E7359', border: 'rgba(106, 154, 122, 0.3)' },
  },
  // 设计与流程
  {
    test: /design|workflow|ui|experience|interaction|clinical/i,
    tint: { bg: 'rgba(126, 158, 200, 0.16)', fg: '#4E6E96', border: 'rgba(126, 158, 200, 0.32)' },
  },
  // 产品与策略（最泛，放最后）
  {
    test: /product|strategy|discovery|mvp|prd|definition|roadmap/i,
    tint: { bg: 'rgba(154, 116, 176, 0.15)', fg: '#7A4A85', border: 'rgba(154, 116, 176, 0.3)' },
  },
]

const NEUTRAL: Tint = {
  bg: 'rgba(58, 36, 64, 0.05)',
  fg: '#6E5A73',
  border: 'rgba(58, 36, 64, 0.1)',
}

export function tagTint(label: string): Tint {
  return FAMILIES.find((f) => f.test.test(label))?.tint ?? NEUTRAL
}

export function tagStyle(label: string) {
  const t = tagTint(label)
  return { backgroundColor: t.bg, color: t.fg, borderColor: t.border }
}
