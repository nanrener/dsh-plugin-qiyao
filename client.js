window.__ModuleLoader__.load({
  id: 'qiyao-calendar',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const DATA = {"sun":{"name":"日曜日","glyph":"☉","planet":"太阳","theme":"自我、展现、名誉、向外表达","accent":"#B8792E","picks":["发一条你一直想发的动态","把作品集更新一版，发布出去","主动约一次当面聊","在会上把观点说出来","接一个需要露脸的机会","请一个想认识的人喝杯咖啡","把做成的事，讲给三个人听","写一段三句话的自我介绍"],"fit":["发自拍发动态","直播出镜","演讲分享","汇报述职","答辩","作品发布","拍视频","见重要的人","路演","更新主页简介","拍形象照","主持活动","参加比赛","领奖","接受采访","剪个人介绍片","参加线下活动","上台发言","公开演讲练习","报名才艺展示","当面提要求","主动加个好友","发一条朋友圈","发一条置顶内容"]},"moon":{"name":"月曜日","glyph":"☽","planet":"月亮","theme":"情绪、照料、家、休息","accent":"#6E7B8C","picks":["早点睡，今晚不刷手机","给家里打个电话","写三行日记，只写感受","把攒着的话找个人说一说","做一顿自己真正想吃的饭","一个人散一次步，不带耳机","把照片翻一遍，挑几张存下来","允许自己今天少做一件事"],"fit":["睡懒觉","陪爸妈吃饭","和家人通话","做饭煲汤","泡澡","冥想放空","看剧","撸猫遛狗","整理旧照片","倾诉聊天","换床单被罩","喝点热的","陪孩子玩","独处发呆","写情绪记录","泡脚","听老歌","给朋友回电话","逛菜市场","阳台晒太阳","写一张感谢卡","定一个睡觉闹钟","慢跑","做一次深呼吸练习"]},"mars":{"name":"火曜日","glyph":"♂","planet":"火星","theme":"行动、勇气、竞争、突破","accent":"#A8503F","picks":["那件拖了三周的事，今天开个头","把该拒绝的事，直接拒了","去运动一次，出到出汗","把一件要跑腿的事今天跑完","见一个不太想见但必须见的人","定一个截止时间，写在明面上","干一件需要体力的活","把最难啃的那部分先啃掉"],"fit":["游泳","撸铁","打球","搬家","大扫除","谈判","催款","维权投诉","办证跑腿","赶工加班","剪片子赶稿","修理安装","上门对接","退货换货","谈薪","开短会定事","找人理论","爬楼梯快走","体力搬运","处理纠纷","当面催进度","报个健身课","硬着头皮打电话","骑车出门跑一趟"]},"mercury":{"name":"水曜日","glyph":"☿","planet":"水星","theme":"沟通、文字、澄清、传递","accent":"#3F7E79","picks":["把一件说不清的事，写成三句话","回掉那条你一直没回的消息","要交的东西，先写出一个粗糙的版本","找个人把想法讲一遍，讲到对方听懂","把专业词换成大白话","给一件拖着的沟通打个电话","写给一个人看的说明，不要写给所有人","复述一遍你听到的需求，确认没听错"],"fit":["写文案","开会","做演示","写周报","改简历","面试","回消息清未读","打电话沟通","发邮件","写方案","改旧稿","做会议记录","对接客户","翻译","写笔记","做培训分享","解释方案","写说明文档","回复咨询","校对稿件","梳理资料","写会议邀请","发通知","当面把话说清楚"]},"jupiter":{"name":"木曜日","glyph":"♃","planet":"木星","theme":"扩张、机遇、增长、远行","accent":"#6D5F98","picks":["把一件事的范围放大一圈，重新估个价","给一个很久没联系的人发条消息","把想学的东西开个头，哪怕只看二十分钟","把一个问题问到第三层","提一个你一直觉得有点大的想法","去一个没去过的地方，走条没走过的路","把一件事的时间线拉长到一年，看它还成不成立","整理一份能拿出去见人的东西"],"fit":["投简历","报名课程","学新技能","读书","考证报名","出差","订机票","办签证","出门旅行","开新项目","拓客加好友","进社群","约一个跨行的朋友聊聊","请教前辈","逛博物馆","做年度规划","发新品","投稿参赛","拜访同行","参加行业活动","找导师聊","学英语背单词","申请进修","接一个更大的项目"]},"venus":{"name":"金曜日","glyph":"♀","planet":"金星","theme":"关系、审美、协调、价值","accent":"#A96C82","picks":["给一件天天用的东西，换个更好的版本","约一个人吃饭，别聊工作","把桌面或主页收拾好看一点","买一件真正用得上的好东西","把拖着的合作，往握手推一步","换个发型，或者换套穿搭","送一份不贵但用心的礼","去看一个展，或者一场电影"],"fit":["拍照修图","穿搭试衣","约会","聚餐","送礼","布置房间","美化主页","做头发美甲","买衣服鞋子","请客","谈合作签约","拍证件照","挑礼物","参加婚礼","布置工位","探店","陪家人吃饭","看展","挑一束花","换香薰","整理衣橱","请人喝杯咖啡","理发","逛商场试香"]},"saturn":{"name":"土曜日","glyph":"♄","planet":"土星","theme":"收束、责任、结算、沉淀","accent":"#76695A","picks":["把上个月没结的账算清楚","清一个抽屉、一个文件夹、一个群","把答应过但拖着的事列出来，划掉一件","给长期要做的事定个规矩","复盘一件已经结束的事，写三行结论","该还的还了，该退的退了","检查一件你一直在维护的东西有没有松动","关掉消息，一个人待一个小时"],"fit":["记一笔开销","报税","还信用卡","交房租","续签合同","续保","体检","归档文件","备份手机照片","断舍离清柜子","退订会员","清理关注列表","写月度总结","项目收尾","交作业交差","年检年审","整理发票","排下个月的日程","归档旧邮件","写一份交接说明","结清尾款","保养设备","整理保险单","补记台账"]}}

    // 日期与事项解析只有一份实现：shared/items.mjs，构建时原样内联成 QIYAO
    const QIYAO = (function () {
// 七曜共用的纯逻辑：日期、事项解析、轮换取词。
// 宿主（index.js）直接 import；浏览器端由 scripts/build-client.mjs 原样内联（去掉 export 关键字）。
// 这个文件里不允许出现 node:fs / node:path 之类的宿主专有依赖，否则浏览器端会挂。

const WEEK_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']

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

const FIT_SHOWN = 6
const TODAY_SHOWN = 4
const LATER_SHOWN = 2
const MAX_LATER_DAYS = 3

/** 省略年份时，超过这么多天仍算“今天之前”的日期，视为明年 */
const YEAR_ROLL_DAYS = 180

const DAY_MS = 86400000

function pad2(n) {
  return String(n).padStart(2, '0')
}

function isoDate(y, m, d) {
  return `${y}-${pad2(m)}-${pad2(d)}`
}

function dateLabel(m, d) {
  return `${m}月${d}日`
}

function dayNumber(y, m, d) {
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS)
}

/** 0=周日 … 6=周六 → 曜日 key */
function weekdayKey(y, m, d) {
  return WEEK_ORDER[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
}

function todayOf(now = new Date()) {
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
function parseDatePrefix(prefix, today = todayOf()) {
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
function parseItemLine(line, today = todayOf()) {
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
function readItems(text, todayKey, y, m, d) {
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
function pickFor(planet, day) {
  return planet.picks[day % planet.picks.length]
}

/** 当天适配：从 fit 池取连续 count 条，池长与 7 互质，不会每周同一条 */
function fitFor(planet, day, count = FIT_SHOWN) {
  const start = day % planet.fit.length
  const fit = []
  for (let i = 0; i < count; i += 1) fit.push(planet.fit[(start + i) % planet.fit.length])
  return fit
}

return { WEEK_ORDER, WEEKDAY_LABEL, WEEKDAY_ORDER, PREFIX_ALIASES, FIT_SHOWN, TODAY_SHOWN, LATER_SHOWN, MAX_LATER_DAYS, pad2, isoDate, dateLabel, dayNumber, weekdayKey, todayOf, parseDatePrefix, parseItemLine, readItems, pickFor, fitFor }
})()

    const POPOVER_ID = 'qiyao-calendar-popover'
    const ITEMS_PATH = "C:\\Users\\孙先生\\Documents\\七曜事项.txt"
    let PLUGIN_CTX = null

    const chipStyle = {
      display: 'inline-block',
      padding: '1px 8px',
      borderRadius: '999px',
      background: 'transparent',
      fontSize: '12px',
      lineHeight: '18px',
      whiteSpace: 'nowrap'
    }

    function todayInfo(now) {
      const at = now || new Date()
      const y = at.getFullYear()
      const m = at.getMonth() + 1
      const d = at.getDate()
      const day = QIYAO.dayNumber(y, m, d)
      const planet = DATA[QIYAO.weekdayKey(y, m, d)]
      return {
        y: y,
        m: m,
        d: d,
        planet: planet,
        pick: QIYAO.pickFor(planet, day),
        fit: QIYAO.fitFor(planet, day)
      }
    }

    /** 事项文件原文 → 今天要做的那几条（截断数和“还有几条”都交给共享实现） */
    function parseItems(text, info) {
      return QIYAO.readItems(text, QIYAO.weekdayKey(info.y, info.m, info.d), info.y, info.m, info.d)
    }

    function QiyaoAction(props) {
      const panelRef = React.useRef(null)
      const info = todayInfo()
      const planet = info.planet
      const sessionId = props && props.sessionId
      const [items, setItems] = React.useState(null)
      const [adding, setAdding] = React.useState(false)
      const [draft, setDraft] = React.useState('')
      const [message, setMessage] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [readError, setReadError] = React.useState('')

      function unwrap(res) {
        if (!res) return null
        if (res.ok === false) {
          const err = res.error || {}
          throw new Error(err.message || err.code || '读取失败')
        }
        if (res.text === undefined && res.value !== undefined) return res.value
        return res
      }

      function readItems() {
        const wf = PLUGIN_CTX && PLUGIN_CTX.remote && PLUGIN_CTX.remote.workspaceFiles
        if (!wf || !ITEMS_PATH) {
          setReadError('浮层拿不到文件通道')
          return Promise.resolve()
        }
        if (!sessionId) {
          setReadError('浮层拿不到会话标识：' + (props ? Object.keys(props).join(',') : 'no props'))
          return Promise.resolve()
        }
        return Promise.resolve(wf.read(sessionId, ITEMS_PATH, {}))
          .then((res) => {
            const data = unwrap(res)
            setReadError('')
            if (data) setItems(parseItems(data.text, info))
          })
          .catch((error) => {
            setReadError('读不到事项：' + (error && error.message ? error.message : String(error)))
          })
      }

      React.useEffect(() => {
        let alive = true
        readItems().catch(() => {
          if (alive) setItems(null)
        })
        return () => {
          alive = false
        }
      }, [sessionId])

      function submitItem() {
        const text = draft.trim()
        if (!text || busy) return
        const remote = PLUGIN_CTX && PLUGIN_CTX.remote
        if (!remote || !remote.commands || !sessionId) {
          setMessage('这个界面读不到宿主的命令通道')
          return
        }
        setBusy(true)
        Promise.resolve(remote.commands.execute(sessionId, '/qiyao add ' + text, []))
          .then((res) => {
            const data = unwrap(res)
            const out = (data && data.text) || (typeof data === 'string' ? data : '')
            setMessage(out ? String(out).split('\n')[0] : '已加上')
            setDraft('')
            setAdding(false)
            return readItems()
          })
          .catch((error) => {
            setMessage('没加上：' + (error && error.message ? error.message : String(error)))
          })
          .then(() => setBusy(false))
      }

      function toggle() {
        const panel = panelRef.current
        if (!panel) return
        if (typeof panel.showPopover === 'function') {
          if (panel.matches(':popover-open')) panel.hidePopover()
          else panel.showPopover()
          return
        }
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block'
      }

      const chips = info.fit.map((item) =>
        h(
          'span',
          {
            key: item,
            style: Object.assign({}, chipStyle, {
              border: '1px solid color-mix(in srgb, ' + planet.accent + ' 24%, transparent)'
            })
          },
          item
        )
      )

      return h(
        React.Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            onClick: toggle,
            title: '七曜日程参考',
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              height: '32px',
              padding: '0 10px',
              borderRadius: '16px',
              border: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.12))',
              background: 'transparent',
              color: 'inherit',
              font: 'inherit',
              fontSize: '13px',
              cursor: 'pointer'
            }
          },
          h('span', { style: { fontSize: '14px', color: planet.accent } }, planet.glyph),
          h('span', null, planet.name)
        ),
        h(
          'div',
          {
            ref: panelRef,
            id: POPOVER_ID,
            popover: 'auto',
            style: {
              position: 'fixed',
              top: '52px',
              right: '20px',
              left: 'auto',
              bottom: 'auto',
              margin: 0,
              width: '360px',
              maxWidth: 'calc(100vw - 40px)',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.12))',
              background: 'var(--dsw-alias-bg-elevated, #ffffff)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
              color: 'var(--dsw-alias-label-primary, inherit)',
              fontSize: '13px',
              lineHeight: '1.7'
            }
          },
          h(
            'div',
            { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' } },
            h(
              'div',
              { style: { fontWeight: 600, fontSize: '15px' } },
              planet.name,
              h(
                'span',
                { style: { fontWeight: 500, fontSize: '13px', opacity: 0.75 } },
                '（',
                h('span', { style: { color: planet.accent } }, planet.glyph),
                ' ' + planet.planet + '）'
              )
            ),
            h(
              'div',
              {
                style: {
                  fontSize: '12px',
                  opacity: 0.42,
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap'
                }
              },
              info.m + ' 月 ' + info.d + ' 日'
            )
          ),
          h(
            'div',
            { style: { marginTop: '4px', fontSize: '12px', opacity: 0.66, letterSpacing: '0.02em' } },
            h('span', { style: { color: planet.accent } }, '✦'),
            ' ' + planet.theme
          ),

          h(
            'div',
            {
              style: {
                marginTop: '12px',
                padding: '9px 12px',
                borderRadius: '10px',
                borderLeft: '3px solid ' + planet.accent,
                background: 'color-mix(in srgb, ' + planet.accent + ' 7%, transparent)'
              }
            },
            h(
              'div',
              { style: { fontSize: '11px', opacity: 0.5, marginBottom: '2px', letterSpacing: '0.04em' } },
              '今日首推'
            ),
            h('div', { style: { fontSize: '14px', fontWeight: 600, lineHeight: '1.5' } }, info.pick)
          ),

          h(
            'div',
            { style: { marginTop: '12px', fontSize: '11px', opacity: 0.5, marginBottom: '6px' } },
            '也适合'
          ),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, max-content)',
                gap: '7px 6px',
                alignItems: 'center'
              }
            },
            chips
          ),

          items && items.today.length
            ? h(
                'div',
                {
                  style: {
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.07))'
                  }
                },
                items.today.length
                  ? h(
                      'div',
                      null,
                      h(
                        'div',
                        { style: { fontSize: '11px', opacity: 0.5, marginBottom: '4px' } },
                        '今天要做'
                      ),
                      items.today.map((item, index) =>
                        h(
                          'div',
                          { key: index, style: { fontSize: '13px', lineHeight: '1.65' } },
                          h(
                            'span',
                            { style: { color: planet.accent, marginRight: '6px' } },
                            '·'
                          ),
                          item
                        )
                      ),
                      items.todayTotal > items.today.length
                        ? h(
                            'div',
                            { style: { fontSize: '11px', opacity: 0.45, marginTop: '2px' } },
                            '还有 ' + (items.todayTotal - items.today.length) + ' 条，在 /qiyao 里'
                          )
                        : null
                    )
                  : null
              )
            : null,
          h(
            'div',
            {
              style: {
                marginTop: '12px',
                paddingTop: '8px',
                borderTop: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.07))',
                fontSize: '11px'
              }
            },
            readError
              ? h(
                  'div',
                  { style: { opacity: 0.5, lineHeight: '1.6', marginBottom: '4px', wordBreak: 'break-all' } },
                  readError
                )
              : null,
            message ? h('div', { style: { opacity: 0.6, lineHeight: '1.6', marginBottom: '4px' } }, message) : null,
            adding
              ? h(
                  'div',
                  { style: { display: 'flex', gap: '6px', alignItems: 'center' } },
                  h('input', {
                    value: draft,
                    autoFocus: true,
                    placeholder: '明天 发作品',
                    onChange: (e) => setDraft(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        submitItem()
                      }
                      if (e.key === 'Escape') {
                        setAdding(false)
                        setDraft('')
                      }
                    },
                    style: {
                      flex: '1 1 auto',
                      minWidth: 0,
                      height: '26px',
                      padding: '0 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.16))',
                      background: 'transparent',
                      color: 'inherit',
                      font: 'inherit',
                      fontSize: '12px'
                    }
                  }),
                  h(
                    'button',
                    {
                      type: 'button',
                      onClick: submitItem,
                      disabled: busy,
                      style: {
                        height: '26px',
                        padding: '0 10px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'color-mix(in srgb, ' + planet.accent + ' 16%, transparent)',
                        color: 'inherit',
                        font: 'inherit',
                        fontSize: '12px',
                        cursor: busy ? 'default' : 'pointer'
                      }
                    },
                    busy ? '加…' : '加'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      onClick: () => {
                        setAdding(false)
                        setDraft('')
                      },
                      style: {
                        height: '26px',
                        width: '22px',
                        border: 'none',
                        background: 'transparent',
                        color: 'inherit',
                        opacity: 0.5,
                        font: 'inherit',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }
                    },
                    '×'
                  )
                )
              : h(
                  'button',
                  {
                    type: 'button',
                    onClick: () => {
                      setAdding(true)
                      setMessage('')
                    },
                    style: {
                      all: 'unset',
                      display: 'block',
                      width: '100%',
                      opacity: 0.45,
                      fontSize: '11px',
                      cursor: 'pointer'
                    }
                  },
                  items && items.today.length
                    ? '＋ 再加一件事'
                    : '＋ 加一件事'
                )
          )
        )
      )
    }

    return {
      inject: ['slots', 'remote', 'remote.workspaceFiles', 'remote.commands'],
      apply(ctx) {
        PLUGIN_CTX = ctx
        ctx.slots.inject('conversation.session.header.actions', () =>
          ctx.slots.register(
            {
              name: 'conversation.session.header.actions',
              id: 'qiyao-calendar',
              order: 15
            },
            QiyaoAction
          )
        )
      }
    }
  }
})
