import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { planets } from './data/qiyao.js'
import {
  FIT_SHOWN,
  MAX_LATER_DAYS,
  PREFIX_ALIASES,
  WEEKDAY_LABEL,
  dateLabel,
  dayNumber,
  fitFor,
  isoDate,
  parseDatePrefix,
  pickFor,
  readItems,
  weekdayKey
} from './shared/items.mjs'

export const name = 'qiyao-calendar'
export const inject = ['commands']

/** 自定义事项文件：存在就读，不存在就整行不显示（QIYAO_ITEMS 仅供测试覆盖） */
const ITEMS_FILE = process.env.QIYAO_ITEMS || path.join(os.homedir(), 'Documents', '七曜事项.txt')

const HELP = [
  '📖 七曜日程助手',
  '',
  '/qiyao              看今天',
  '/qiyao 2026-11-10   看指定日期',
  '/qiyao add 明天 发作品   直接加一条',
  '',
  '自定义事项：在「文档」文件夹里建一个 七曜事项.txt，一行一条。',
  '  交周报            每天显示',
  '  周六|归档发票      只在周六显示（土曜日，两种写法都认）',
  '  2026-11-20|交材料  只在那一天显示，过了自动消失',
  '  11-20|交材料       省略年份，按今年算（已过去超过半年则算明年）',
  '',
  '加事项也可以直接说：add 明天 发作品 / add 每周五 复盘 / add 12月3日 交报告'
].join('\n')

const WEEKDAY_WORD = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0 }
const WEEK_TEXT = ['日', '一', '二', '三', '四', '五', '六']

/** 把「明天 发作品」这类口语 + 机器写法统一成文件里的一行 */
function composeItemLine(input, now = new Date()) {
  const raw = String(input ?? '').trim()
  if (!raw) return { error: '要加什么？例如：add 明天 发作品' }

  const today = { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }

  // 已经是机器写法
  const explicit = /^([^|｜:：]{1,12})\s*[|｜:：]\s*(.+)$/.exec(raw)
  if (explicit) {
    const prefix = explicit[1].trim().replace(/^每/, '')
    const text = explicit[2].trim()
    if (text && (PREFIX_ALIASES[prefix] || parseDatePrefix(prefix, today))) {
      return { line: `${prefix}|${text}` }
    }
  }

  const at = (offset) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset)

  let matched = /^(今天|今日|明天|明日|后天|大后天)\s*(.+)$/.exec(raw)
  if (matched) {
    const offset = { 今天: 0, 今日: 0, 明天: 1, 明日: 1, 后天: 2, 大后天: 3 }[matched[1]]
    const d = at(offset)
    return {
      line: `${isoDate(d.getFullYear(), d.getMonth() + 1, d.getDate())}|${matched[2].trim()}`,
      note: dateLabel(d.getMonth() + 1, d.getDate())
    }
  }

  matched = /^(每|下)?(?:周|星期|礼拜)([一二三四五六日天])\s*(.+)$/.exec(raw)
  if (matched) {
    const weekday = WEEKDAY_WORD[matched[2]]
    if (matched[1] === '下') {
      const base = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const delta = ((weekday - base.getDay() + 7) % 7) + 7
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + delta)
      return {
        line: `${isoDate(d.getFullYear(), d.getMonth() + 1, d.getDate())}|${matched[3].trim()}`,
        note: dateLabel(d.getMonth() + 1, d.getDate())
      }
    }
    return { line: `周${WEEK_TEXT[weekday]}|${matched[3].trim()}`, note: `每${WEEK_TEXT[weekday] === '日' ? '周日' : '周' + WEEK_TEXT[weekday]}` }
  }

  matched = /^(\d{1,2})\s*月\s*(\d{1,2})\s*[日号]?\s*(.+)$/.exec(raw)
  if (matched) {
    const date = parseDatePrefix(`${matched[1]}-${matched[2]}`, today)
    if (!date) return { error: `日期不对：${matched[1]}月${matched[2]}日` }
    return {
      line: `${isoDate(date.y, date.m, date.d)}|${matched[3].trim()}`,
      note: dateLabel(date.m, date.d)
    }
  }

  return { line: raw, note: '每天' }
}

/** 比较时忽略分隔符的全角/半角差异，也忽略首尾空格 */
function normalizeLine(line) {
  return String(line).replace(/[｜：]/g, (c) => (c === '｜' ? '|' : ':')).trim()
}

/** 追加一行到事项文件；已经存在就返回 duplicate，不写第二遍 */
function appendItem(line) {
  let existing = ''
  try {
    existing = fs.readFileSync(ITEMS_FILE, 'utf8')
  } catch {
    existing = ''
  }

  const target = normalizeLine(line)
  for (const raw of existing.split(/\r?\n/)) {
    if (raw.trim() && normalizeLine(raw) === target) return { duplicate: true }
  }

  const prefix = existing && !existing.endsWith('\n') ? '\n' : ''
  fs.mkdirSync(path.dirname(ITEMS_FILE), { recursive: true })
  fs.appendFileSync(ITEMS_FILE, `${prefix}${line}\n`, 'utf8')
  return { duplicate: false }
}

/** 解析 YYYY-MM-DD / YYYY/MM/DD / YYYY年M月D日；空输入取今天 */
function resolveDate(raw, now = new Date()) {
  const s = String(raw ?? '').trim()
  if (!s) return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
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

function readItemsFile() {
  try {
    return fs.readFileSync(ITEMS_FILE, 'utf8')
  } catch {
    return ''
  }
}

function render({ y, m, d }) {
  const day = dayNumber(y, m, d)
  const planet = planets[weekdayKey(y, m, d)]

  const lines = [
    `📅 ${planet.name}（${planet.glyph} ${planet.planet}）· ${m} 月 ${d} 日`,
    `✨ ${planet.planet}：${planet.theme}`,
    `✅ 今日首推：${pickFor(planet, day)}`,
    `📋 也适合：${fitFor(planet, day, FIT_SHOWN).join('、')}`
  ]

  const { today, todayTotal, groups } = readItems(readItemsFile(), weekdayKey(y, m, d), y, m, d)

  if (today.length > 0) {
    const rest = todayTotal - today.length
    lines.push(`📝 今天：${today.join('、')}${rest > 0 ? `（还有 ${rest} 条）` : ''}`)
  }

  for (const group of groups.slice(0, MAX_LATER_DAYS)) {
    const rest = group.total - group.items.length
    lines.push(`📌 留给${group.label}：${group.items.join('、')}${rest > 0 ? `（还有 ${rest} 条）` : ''}`)
  }

  if (groups.length > MAX_LATER_DAYS) {
    lines.push(`（另有 ${groups.length - MAX_LATER_DAYS} 组稍后的安排）`)
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

          const adding = /^(?:add|加|新增)\s+([\s\S]+)$/i.exec(raw)
          if (adding) {
            const composed = composeItemLine(adding[1])
            if (composed.error) return { kind: 'error', text: composed.error }

            let result
            try {
              result = appendItem(composed.line)
            } catch (error) {
              return { kind: 'error', text: `写入失败：${error instanceof Error ? error.message : String(error)}` }
            }

            if (result.duplicate) {
              return { kind: 'success', text: `这条已经有了，没重复写：${composed.line.replace('|', ' · ')}` }
            }

            const note = composed.note ? `（${composed.note}）` : ''
            return {
              kind: 'success',
              text: `已加到七曜日程${note}：${composed.line.replace('|', ' · ')}\n写在 ${ITEMS_FILE}`
            }
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
