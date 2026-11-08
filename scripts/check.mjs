// 内容与构建一致性检查：npm run check
// 查四件事：数量对不对、有没有跨曜重复、首推和适配有没有撞车、client.js 是不是最新。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { planets } from '../data/qiyao.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')

const PICKS = 8
const FIT = 24
const THEME_WORDS = 4

const problems = []
const warnings = []

function norm(text) {
  return String(text).replace(/\s+/g, '').trim()
}

/** 同一个词只应该归一个曜日 */
const owner = new Map()

for (const [key, planet] of Object.entries(planets)) {
  if (planet.picks.length !== PICKS) {
    problems.push(`${key}.picks 应为 ${PICKS} 条，实际 ${planet.picks.length}`)
  }
  if (planet.fit.length !== FIT) {
    problems.push(`${key}.fit 应为 ${FIT} 条，实际 ${planet.fit.length}`)
  }

  const themeWords = planet.theme.split('、').filter(Boolean)
  if (themeWords.length !== THEME_WORDS) {
    problems.push(`${key}.theme 应为 ${THEME_WORDS} 个词（卡片一行放得下），实际 ${themeWords.length}：${planet.theme}`)
  }

  for (const field of ['picks', 'fit']) {
    const seen = new Set()
    for (const item of planet[field]) {
      const k = norm(item)
      if (seen.has(k)) problems.push(`${key}.${field} 内部重复：${item}`)
      seen.add(k)

      if (owner.has(k) && owner.get(k) !== key) {
        problems.push(`「${item}」同时出现在 ${owner.get(k)} 和 ${key}`)
      } else {
        owner.set(k, key)
      }
    }
  }

  for (const pick of planet.picks) {
    if (planet.fit.some((item) => norm(item) === norm(pick))) {
      warnings.push(`${key} 首推与适配字面相同：${pick}`)
    }
  }

  for (const item of [...planet.picks, ...planet.fit]) {
    if (/[“”]/.test(item)) problems.push(`${key} 里有弯引号：${item}`)
    if (/\s/.test(item)) problems.push(`${key} 里有空格（中英混举例）：${item}`)
  }
}

// client.js 是否是这批数据构建出来的
const clientPath = path.join(root, 'client.js')
if (!fs.existsSync(clientPath)) {
  problems.push('client.js 不存在，先跑 npm run build')
} else {
  const client = fs.readFileSync(clientPath, 'utf8')
  if (client.includes('/*__SHARED__*/') || client.includes('/*__DATA__*/')) {
    problems.push('client.js 里还有未替换的占位符，重新跑 npm run build')
  }

  const marker = 'const DATA = '
  const start = client.indexOf(marker)
  if (start < 0) {
    problems.push('client.js 里找不到 const DATA，构建产物结构变了')
  } else {
    const from = start + marker.length
    let depth = 0
    let end = -1
    let inString = false
    let escaped = false
    for (let i = from; i < client.length; i += 1) {
      const ch = client[i]
      if (inString) {
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === '"') inString = false
        continue
      }
      if (ch === '"') inString = true
      else if (ch === '{') depth += 1
      else if (ch === '}') {
        depth -= 1
        if (depth === 0) {
          end = i + 1
          break
        }
      }
    }
    if (end < 0) {
      problems.push('client.js 的 DATA 解析失败')
    } else {
      let inlined
      try {
        inlined = JSON.parse(client.slice(from, end))
      } catch (error) {
        problems.push('client.js 的 DATA 不是合法 JSON：' + error.message)
      }
      if (inlined) {
        for (const [key, planet] of Object.entries(planets)) {
          const got = inlined[key]
          if (!got) {
            problems.push(`client.js 缺少曜日 ${key}`)
            continue
          }
          if (JSON.stringify(got.picks) !== JSON.stringify(planet.picks)) {
            problems.push(`client.js 的 ${key}.picks 与 data/qiyao.js 不一致，重新 npm run build`)
          }
          if (JSON.stringify(got.fit) !== JSON.stringify(planet.fit)) {
            problems.push(`client.js 的 ${key}.fit 与 data/qiyao.js 不一致，重新 npm run build`)
          }
          if (got.theme !== planet.theme) {
            problems.push(`client.js 的 ${key}.theme 与 data/qiyao.js 不一致，重新 npm run build`)
          }
        }
      }
    }
  }
}

const totalPicks = Object.values(planets).reduce((n, p) => n + p.picks.length, 0)
const totalFit = Object.values(planets).reduce((n, p) => n + p.fit.length, 0)

console.log(`曜日 ${Object.keys(planets).length} 个 · 首推 ${totalPicks} 条 · 适配 ${totalFit} 条`)

for (const w of warnings) console.log('⚠️  ' + w)

if (problems.length) {
  for (const p of problems) console.error('❌ ' + p)
  console.error(`\n检查未通过：${problems.length} 个问题`)
  process.exit(1)
}

console.log('✅ 检查通过')
