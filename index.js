import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { planets, weekOrder } from './data/qiyao.js'

export const name = 'qiyao-calendar'
export const inject = ['commands']

/** 自定义事项文件：存在就读，不存在就整行不显示 */
const ITEMS_FILE = path.join(os.homedir(), 'Documents', '七曜事项.txt')
const FIT_SHOWN = 6
const TODAY_SHOWN = 4
const LATER_SHOWN = 2
const MAX_LATER_DAYS = 3

/** 周一…周日 的日常叫法，配上曜日名，两个都给 */
const WEEKDAY_LABEL = {
  moon: { week: '周一', yao: '月曜日' },
  mars: { week: '周二', yao: '火曜日' },
  mercury: { week: '周三', yao: '水曜日' },
  jupiter: { week: '周四', yao: '木曜日' },
  venus: { week: '周五', yao: '金曜日' },
  saturn: { week: '周六', yao: '土曜日' },
  sun: { week: '周日', yao: '日曜日' }
}

/** 显示顺序：周一到周日 */
const WEEKDAY_ORDER = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'sun']

/** 前缀写法 → 曜日 key。周一…周日、星期X、土/土曜/土曜日 都认 */
const PREFIX_ALIASES = {
  周一: 'moon',
  星期一: 'moon',
  周二: 'mars',
  星期二: 'mars',
  周三: 'mercury',
  星期三: 'mercury',
  周四: 'jupiter',
  星期四: 'jupiter',
  周五: 'venus',
  星期五: 'venus',
  周六: 'saturn',
  星期六: 'saturn',
  周日: 'sun',
  周天: 'sun',
  星期日: 'sun',
  星期天: 'sun',
  日: 'sun',
  日曜: 'sun',
  日曜日: 'sun',
  月: 'moon',
  月曜: 'moon',
  月曜日: 'moon',
  火: 'mars',
  火曜: 'mars',
  火曜日: 'mars',
  水: 'mercury',
  水曜: 'mercury',
  水曜日: 'mercury',
  木: 'jupiter',
  木曜: 'jupiter',
  木曜日: 'jupiter',
  金: 'venus',
  金曜: 'venus',
  金曜日: 'venus',
  土: 'saturn',
  土曜: 'saturn',
  土曜日: 'saturn'
}

const HELP = [
  '📖 七曜日程助手',
  '',
  '/qiyao              看今天',
  '/qiyao 2026-11-10   看指定日期',
  '',
  '自定义事项：在「文档」文件夹里建一个 七曜事项.txt，一行一条。',
  '  交周报            每天显示',
  '  周六|归档发票      只在周六显示（土曜日，两种写法都认）'
].join('\n')

function dayNumber(y, m, d) {
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000)
}

/** 解析 YYYY-MM-DD / YYYY/MM/DD / YYYY年M月D日；空输入取今天 */
function resolveDate(raw) {
  const s = String(raw ?? '').trim()
  if (!s) {
    const now = new Date()
    return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
  }
  const matched = /^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?$/.exec(s)
  if (!matched) return null
  const y = Number(matched[1])
  const m = Number(matched[2])
  const d = Number(matched[3])
  const probe = new Date(Date.UTC(y, m - 1, d))
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) {
    return null
  }
  return { y, m, d }
}

/** 一行 → { text, key }；key 为 null 表示每天显示 */
function parseItemLine(line) {
  const s = line.trim()
  if (!s || s.startsWith('#')) return null
  const matched = /^([^|｜:：]{1,6})\s*[|｜:：]\s*(.+)$/.exec(s)
  if (matched) {
    const key = PREFIX_ALIASES[matched[1].trim()]
    if (key) {
      const text = matched[2].trim()
      return text ? { text, key } : null
    }
  }
  return { text: s, key: null }
}

/** 读事项，分成「今天」和「留给某天」两类 */
function readItems(todayKey) {
  let raw
  try {
    raw = fs.readFileSync(ITEMS_FILE, 'utf8')
  } catch {
    return { today: [], later: new Map() }
  }

  const today = []
  const later = new Map()
  for (const line of raw.split(/\r?\n/)) {
    const item = parseItemLine(line)
    if (!item) continue
    if (item.key === null || item.key === todayKey) {
      if (today.length < TODAY_SHOWN) today.push(item.text)
    } else {
      const list = later.get(item.key) ?? []
      if (list.length < LATER_SHOWN) {
        list.push(item.text)
        later.set(item.key, list)
      }
    }
  }
  return { today, later }
}

function render({ y, m, d }) {
  const day = dayNumber(y, m, d)
  const weekdayKey = weekOrder[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
  const planet = planets[weekdayKey]

  const pick = planet.picks[day % planet.picks.length]

  const fit = []
  const start = day % planet.fit.length
  for (let i = 0; i < FIT_SHOWN; i += 1) {
    fit.push(planet.fit[(start + i) % planet.fit.length])
  }

  const lines = [
    `📅 ${planet.name}（${planet.glyph} ${planet.planet}）· ${m} 月 ${d} 日`,
    `✨ ${planet.planet}：${planet.theme}`,
    `✅ 今日首推：${pick}`,
    `📋 也适合：${fit.join('、')}`
  ]

  const { today, later } = readItems(weekdayKey)
  if (today.length > 0) lines.push(`📝 今天：${today.join('、')}`)

  let shown = 0
  for (const key of WEEKDAY_ORDER) {
    if (shown >= MAX_LATER_DAYS) break
    const list = later.get(key)
    if (!list || list.length === 0) continue
    const label = WEEKDAY_LABEL[key]
    lines.push(`📌 留给${label.week}（${label.yao}）：${list.join('、')}`)
    shown += 1
  }

  return lines.join('\n')
}

export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.commands.register({
        name: 'qiyao',
        description: '七曜日程参考：当日曜日基调、适配事项与自定义事项（不做吉凶预测）',
        input: { hint: '[YYYY-MM-DD]' },
        handler: (invocation) => {
          const raw = String(invocation.rawInput ?? '').trim()
          if (/^(help|帮助|-h|--help)$/i.test(raw)) {
            return { kind: 'success', text: HELP }
          }
          const target = resolveDate(raw)
          if (!target) {
            return {
              kind: 'error',
              text: `日期格式不对：${raw}\n用 /qiyao 2026-11-10 这样写，或直接 /qiyao 看今天。`
            }
          }
          return { kind: 'success', text: render(target) }
        }
      }),
    'qiyao command'
  )
}
