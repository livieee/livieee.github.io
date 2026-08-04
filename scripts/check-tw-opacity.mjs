/**
 * Tailwind 透明度刻度检查。
 *
 * bg-white/92 这类值不在默认刻度上（只有 0/5/10/…/90/95/100），
 * Tailwind 不会生成对应的类，页面上表现为「底色整个消失」——
 * 不报错、不警告，肉眼很难发现。这个脚本在 build 前把它们拦下来。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const VALID = new Set(
  ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'],
)
const UTIL = 'bg|text|border|ring|from|via|to|divide|outline|shadow|decoration|placeholder|accent|caret|fill|stroke'
const PATTERN = new RegExp(`\\b(?:${UTIL})-[a-z]+(?:-[a-z]+)?/(\\d+)\\b`, 'g')

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

const bad = []
for (const file of walk('src')) {
  if (!['.tsx', '.ts', '.css'].includes(extname(file))) continue
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(PATTERN)) {
        if (!VALID.has(m[1])) bad.push(`${file}:${i + 1}  ${m[0]}`)
      }
    })
}

if (bad.length) {
  console.error(`\n✗ ${bad.length} Tailwind opacity value(s) not on the default scale — these classes are never generated:\n`)
  bad.forEach((b) => console.error('  ' + b))
  console.error('\n  Valid steps: ' + [...VALID].join(' ') + '\n')
  process.exit(1)
}
console.log('✓ Tailwind opacity values all on scale')
