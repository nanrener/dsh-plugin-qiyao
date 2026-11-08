import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'package.json')
const next = process.argv[2]
if (!next || !/^\d+\.\d+\.\d+$/.test(next)) {
  console.error('用法: node scripts/set-version.mjs 1.7.1')
  process.exit(1)
}
const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
const data = JSON.parse(raw)
data.version = next
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`package.json -> ${data.version}`)
