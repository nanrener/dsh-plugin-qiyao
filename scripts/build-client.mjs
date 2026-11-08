// 生成 client.js：把 shared/items.mjs 与 data/qiyao.js 内联进浏览器端的 factory。
// 改动 shared/ 或 data/ 之后，运行：npm run build
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { planets } from '../data/qiyao.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')

// 七曜传统色（低饱和版）：只用于界面强调，不参与内容语义
const ACCENTS = {
  sun: '#B8792E',
  moon: '#6E7B8C',
  mars: '#A8503F',
  mercury: '#3F7E79',
  jupiter: '#6D5F98',
  venus: '#A96C82',
  saturn: '#76695A'
}

const SHARED_EXPORTS = [
  'WEEK_ORDER',
  'WEEKDAY_LABEL',
  'WEEKDAY_ORDER',
  'PREFIX_ALIASES',
  'FIT_SHOWN',
  'TODAY_SHOWN',
  'LATER_SHOWN',
  'MAX_LATER_DAYS',
  'pad2',
  'isoDate',
  'dateLabel',
  'dayNumber',
  'weekdayKey',
  'todayOf',
  'parseDatePrefix',
  'parseItemLine',
  'readItems',
  'pickFor',
  'fitFor'
]

const sharedSource = fs
  .readFileSync(path.join(root, 'shared', 'items.mjs'), 'utf8')
  .replace(/^export\s+/gm, '')

const sharedBundle = [
  'const QIYAO = (function () {',
  sharedSource,
  `return { ${SHARED_EXPORTS.join(', ')} }`,
  '})()'
].join('\n')

const payload = {}
for (const [key, planet] of Object.entries(planets)) {
  payload[key] = {
    name: planet.name,
    glyph: planet.glyph,
    planet: planet.planet,
    theme: planet.theme,
    accent: ACCENTS[key] ?? '#6B5BC4',
    picks: planet.picks,
    fit: planet.fit
  }
}

const body = fs.readFileSync(path.join(here, 'client-body.txt'), 'utf8')
if (!body.includes('/*__SHARED__*/')) {
  throw new Error('client-body.txt 缺少 /*__SHARED__*/ 占位，无法内联共享逻辑')
}

const out = body
  .replace('/*__SHARED__*/', () => sharedBundle)
  .replace('/*__DATA__*/ null', () => JSON.stringify(payload))
  .replace("/*__ITEMS_PATH__*/ ''", () =>
    JSON.stringify(process.env.QIYAO_ITEMS || path.join(os.homedir(), 'Documents', '七曜事项.txt'))
  )

fs.writeFileSync(path.join(root, 'client.js'), out, 'utf8')
console.log('client.js 已生成，大小', Buffer.byteLength(out), 'bytes')
