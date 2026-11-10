// 七曜共用的纯逻辑：日期、事项解析、轮换取词。
// 宿主（index.js）直接 import；浏览器端由 scripts/build-client.mjs 原样内联（去掉 export 关键字）。
// 这个文件里不允许出现 node:fs / node:path 之类的宿主专有依赖，否则浏览器端会挂。

export const WEEK_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']

/** 周一…周日 的日常叫法，配上曜日名，两个都给 */
export const WEEKDAY_LABEL = {
  moon: { week: '周一', yao: '月曜日' },
  mars: { week: '周二', yao: '火曜日' },
  mercury: { week: '周三', yao: '水曜日' },
  jupiter: { week: '周四', yao: '木曜日' },
  venus: { week: '周五', yao: '金曜日' },
  saturn: { week: '周六', yao: '土曜日' },
  sun: { week: '周日', yao: '日曜日' }
}

/** 显示顺序：周一到周日 */
export const WEEKDAY_ORDER = ['moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'sun']

/** 前缀写法 → 曜日 key。周一…周日、星期X、土/土曜/土曜日 都认 */
export const PREFIX_ALIASES = {
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

export const FIT_SHOWN = 6
export const TODAY_SHOWN = 4
export const LATER_SHOWN = 2
export const MAX_LATER_DAYS = 3

/** 省略年份时，超过这么多天仍算“今天之前”的日期，视为明年 */
const YEAR_ROLL_DAYS = 180

const DAY_MS = 86400000

/** 正数取模：1970 年以前的 dayNumber 是负数，直接 % 会得到负下标 */
function mod(n, len) {
  return ((n % len) + len) % len
}

export function pad2(n) {
  return String(n).padStart(2, '0')
}

export function isoDate(y, m, d) {
  return `${y}-${pad2(m)}-${pad2(d)}`
}

export function dateLabel(m, d) {
  return `${m}月${d}日`
}

export function dayNumber(y, m, d) {
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS)
}

/** 0=周日 … 6=周六 → 曜日 key */
export function weekdayKey(y, m, d) {
  return WEEK_ORDER[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
}

export function todayOf(now = new Date()) {
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
}

function validDate(y, m, d) {
  const probe = new Date(Date.UTC(y, m - 1, d))
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) {
    return null
  }
  return { y, m, d }
}

/**
 * 前缀写成日期：2026-11-20 / 2026/11/20 / 2026年11月20日 / 11-20（省略年份）。
 * 省略年份时按今年算；如果算出来已经过去很久（>180 天），当作明年，
 * 这样 12 月写 01-05 不会被判成“去年”。
 * today 传 { y, m, d }，不传取本地今天。
 */
export function parseDatePrefix(prefix, today = todayOf()) {
  const s = String(prefix ?? '').trim()
  if (!s) return null

  let y
  let m
  let d
  let matched = /^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?$/.exec(s)
  if (matched) {
    y = Number(matched[1])
    m = Number(matched[2])
    d = Number(matched[3])
    return validDate(y, m, d)
  }

  matched = /^(\d{1,2})[-/.月](\d{1,2})日?$/.exec(s)
  if (!matched) return null
  m = Number(matched[1])
  d = Number(matched[2])

  const todayDN = dayNumber(today.y, today.m, today.d)
  const sameYear = validDate(today.y, m, d)
  if (!sameYear) return null
  if (todayDN - dayNumber(sameYear.y, sameYear.m, sameYear.d) > YEAR_ROLL_DAYS) {
    return validDate(today.y + 1, m, d)
  }
  return sameYear
}

/** 一行 → { text, key?, date? }；key 为 null 表示每天显示 */
export function parseItemLine(line, today = todayOf()) {
  const s = String(line ?? '').trim()
  if (!s || s.startsWith('#')) return null

  const matched = /^([^|｜:：]{1,12})\s*[|｜:：]\s*(.+)$/.exec(s)
  if (matched) {
    const prefix = matched[1].trim()
    const text = matched[2].trim()
    if (!text) return null
    const key = PREFIX_ALIASES[prefix]
    if (key) return { text, key }
    const date = parseDatePrefix(prefix, today)
    if (date) return { text, date }
  }
  return { text: s, key: null }
}

/**
 * 读事项，分成「今天」和「留给某天」。
 * 返回的 today / groups[].items 只截取前 N 条用于显示，
 * 但同时给出 total，界面可以写“还有 N 条”，不会静默丢失。
 */
export function readItems(text, todayKey, y, m, d) {
  const today = { y, m, d }
  const todayDN = dayNumber(y, m, d)
  const items = []
  const dateLater = new Map()
  const weekLater = new Map()
  let todayTotal = 0

  for (const line of String(text ?? '').split(/\r?\n/)) {
    const item = parseItemLine(line, today)
    if (!item) continue

    if (item.date) {
      const dn = dayNumber(item.date.y, item.date.m, item.date.d)
      if (dn === todayDN) {
        todayTotal += 1
        if (items.length < TODAY_SHOWN) items.push(item.text)
      } else if (dn > todayDN) {
        const bucket = dateLater.get(dn) ?? { dn, y: item.date.y, m: item.date.m, d: item.date.d, items: [], total: 0 }
        bucket.total += 1
        if (bucket.items.length < LATER_SHOWN) bucket.items.push(item.text)
        dateLater.set(dn, bucket)
      }
      continue
    }

    if (item.key === null || item.key === todayKey) {
      todayTotal += 1
      if (items.length < TODAY_SHOWN) items.push(item.text)
    } else {
      const bucket = weekLater.get(item.key) ?? { items: [], total: 0 }
      bucket.total += 1
      if (bucket.items.length < LATER_SHOWN) bucket.items.push(item.text)
      weekLater.set(item.key, bucket)
    }
  }

  const groups = []
  for (const g of [...dateLater.values()].sort((a, b) => a.dn - b.dn)) {
    const label = g.y === y ? dateLabel(g.m, g.d) : `${g.y}年${g.m}月${g.d}日`
    groups.push({ label, items: g.items, total: g.total })
  }
  for (const key of WEEKDAY_ORDER) {
    const bucket = weekLater.get(key)
    if (!bucket) continue
    const label = WEEKDAY_LABEL[key]
    groups.push({ label: `${label.week}（${label.yao}）`, items: bucket.items, total: bucket.total })
  }

  return { today: items, todayTotal, groups, groupsTotal: groups.length }
}

/** 当天首推：picks 长度与 7 互质，每天顺着走一条 */
export function pickFor(planet, day) {
  return planet.picks[mod(day, planet.picks.length)]
}

/** 当天适配：从 fit 池取连续 count 条，池长与 7 互质，不会每周同一条 */
export function fitFor(planet, day, count = FIT_SHOWN) {
  const start = mod(day, planet.fit.length)
  const fit = []
  for (let i = 0; i < count; i += 1) fit.push(planet.fit[(start + i) % planet.fit.length])
  return fit
}
