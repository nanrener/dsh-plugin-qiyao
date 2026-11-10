// 断言式自测：npm test
// 用临时文件跑，不碰真实的事项文件。
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseDatePrefix, readItems } from '../shared/items.mjs'

let passed = 0
function ok(name, fn) {
  fn()
  passed += 1
  console.log('✅ ' + name)
}

const tmp = path.join(os.tmpdir(), 'qiyao-test-items.txt')
process.env.QIYAO_ITEMS = tmp

// ---- 纯逻辑：日期前缀 ----
ok('省略年份按今年', () => {
  const d = parseDatePrefix('11-20', { y: 2026, m: 11, d: 8 })
  assert.deepEqual(d, { y: 2026, m: 11, d: 20 })
})

ok('12 月写 01-05 算明年', () => {
  const d = parseDatePrefix('01-05', { y: 2026, m: 12, d: 20 })
  assert.deepEqual(d, { y: 2027, m: 1, d: 5 })
})

ok('过去没超过半年的日期仍按今年（已过期）', () => {
  const d = parseDatePrefix('12-01', { y: 2026, m: 12, d: 20 })
  assert.deepEqual(d, { y: 2026, m: 12, d: 1 })
})

ok('非法日期返回 null', () => {
  assert.equal(parseDatePrefix('2026-13-45', { y: 2026, m: 11, d: 8 }), null)
  assert.equal(parseDatePrefix('随便写', { y: 2026, m: 11, d: 8 }), null)
})

// ---- 纯逻辑：事项分组 ----
ok('今天 / 留给 / 过期三种都分对', () => {
  const text = ['每天的事', '周六|周六的事', '2026-11-09|后天的事', '2020-01-01|过期的事'].join('\n')
  const res = readItems(text, 'sun', 2026, 11, 8)
  assert.deepEqual(res.today, ['每天的事'])
  const labels = res.groups.map((g) => g.label)
  assert.ok(labels.includes('11月9日'))
  assert.ok(labels.some((l) => l.startsWith('周六')))
  assert.ok(!res.groups.some((g) => g.items.includes('过期的事')))
})

ok('超过 4 条不静默丢，给出总数', () => {
  const text = ['a', 'b', 'c', 'd', 'e', 'f'].join('\n')
  const res = readItems(text, 'sun', 2026, 11, 8)
  assert.equal(res.today.length, 4)
  assert.equal(res.todayTotal, 6)
})

// ---- 命令层 ----
fs.writeFileSync(tmp, ['每天的事', '周六|周六的事'].join('\n'), 'utf8')

const { apply } = await import('../index.js')

let handler = null
apply({
  effect(fn) {
    fn()
  },
  commands: {
    register(definition) {
      handler = definition.handler
      return () => {}
    }
  }
})

ok('add 明天 写成具体日期', () => {
  const before = fs.readFileSync(tmp, 'utf8')
  const res = handler({ rawInput: 'add 明天 发作品' })
  assert.equal(res.kind, 'success')
  const after = fs.readFileSync(tmp, 'utf8')
  assert.ok(after.length > before.length)
  assert.match(after, /\d{4}-\d{2}-\d{2}\|发作品/)
})

ok('同一条加两次不重复写', () => {
  const res = handler({ rawInput: 'add 明天 发作品' })
  assert.equal(res.kind, 'success')
  assert.match(res.text, /已经有了/)
  const lines = fs.readFileSync(tmp, 'utf8').trim().split(/\r?\n/)
  assert.equal(lines.filter((l) => l.endsWith('|发作品')).length, 1)
})

ok('add 每周五 写成周前缀', () => {
  handler({ rawInput: 'add 每周五 复盘' })
  assert.match(fs.readFileSync(tmp, 'utf8'), /周五\|复盘/)
})

ok('add 不带日期默认算今天，不会天天出现', () => {
  handler({ rawInput: 'add 大扫除' })
  const text = fs.readFileSync(tmp, 'utf8')
  assert.match(text, /^\d{4}-\d{2}-\d{2}\|大扫除$/m)
  assert.ok(!text.split(/\r?\n/).includes('大扫除'))
})

ok('add 每天 才写成天天出现', () => {
  handler({ rawInput: 'add 每天 喝水' })
  assert.ok(fs.readFileSync(tmp, 'utf8').split(/\r?\n/).includes('喝水'))
})

ok('看今天时把超出 4 条的部分写出来', () => {
  fs.writeFileSync(tmp, ['1', '2', '3', '4', '5'].join('\n'), 'utf8')
  const res = handler({ rawInput: '' })
  assert.equal(res.kind, 'success')
  assert.match(res.text, /还有 1 条/)
})

ok('非法日期参数报错而不是崩', () => {
  const res = handler({ rawInput: '2026-13-45' })
  assert.equal(res.kind, 'error')
})

ok('1970 年以前的日子不会打印 undefined', () => {
  const res = handler({ rawInput: '1900-01-01' })
  assert.equal(res.kind, 'success')
  assert.ok(!res.text.includes('undefined'))
  assert.ok(!/也适合：、/.test(res.text))
})

ok('items 只回 JSON，供浮层读取', () => {
  fs.writeFileSync(tmp, ['每天的事', '2026-11-10|今天的活'].join('\n'), 'utf8')
  const res = handler({ rawInput: 'items 2026-11-10' })
  assert.equal(res.kind, 'success')
  const data = JSON.parse(res.text)
  assert.deepEqual(data.today, ['每天的事', '今天的活'])
  assert.equal(data.todayTotal, 2)
})

fs.unlinkSync(tmp)
console.log(`\n全部通过：${passed} 项`)
