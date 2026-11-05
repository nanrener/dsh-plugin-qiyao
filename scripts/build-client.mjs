// 生成 client.js：把 data/qiyao.js 的内容内联进浏览器端的 factory。
// 改动 data/qiyao.js 之后，运行：node scripts/build-client.mjs
import fs from 'node:fs'
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

const body = fs.readFileSync(path.join(here, 'client-body.txt'), 'utf8')
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

const out = body.replace('/*__DATA__*/ null', JSON.stringify(payload))
fs.writeFileSync(path.join(root, 'client.js'), out, 'utf8')
console.log('client.js 已生成，大小', Buffer.byteLength(out), 'bytes')
