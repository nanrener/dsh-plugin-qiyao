window.__ModuleLoader__.load({
  id: 'qiyao-calendar',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const DATA = {"sun":{"name":"日曜日","glyph":"☉","planet":"太阳","theme":"自我、展现、名誉、向外表达","accent":"#B8792E","picks":["发一条你一直没敢发的动态","把作品集更新一版，挂出去","主动做一次汇报或者分享","拍一张可以当头像的照片","在会上把你的观点说出来","接一个需要露脸的机会","给自己写一段三句话的自我介绍","把一件做成的事，公开说一次"],"fit":["发自拍发动态","直播出镜","演讲分享","汇报述职","答辩","作品发布","拍视频","见重要的人","路演","更新主页简介","拍形象照","主持活动","参加比赛","公开演讲练习","领奖","接受采访","剪个人介绍片","发朋友圈","参加线下活动","上台发言"]},"moon":{"name":"月曜日","glyph":"☽","planet":"月亮","theme":"情绪、感受、家庭、休养","accent":"#6E7B8C","picks":["早点睡，今晚不刷手机","给家里打个电话，问问他们最近怎么样","写三行日记，只写感受，不写事","把攒着的情绪找个人说一说","做一顿自己真正想吃的饭","一个人散一次步，不带耳机","把照片翻一遍，挑几张存下来","允许自己今天少做一件事"],"fit":["睡懒觉","写日记","和家人通话","回家吃饭","做饭煲汤","散步","泡澡","冥想","看剧放空","撸猫遛狗","整理旧照片","倾诉聊天","看心理科普","换床单收拾床铺","喝点热的","早点睡","陪孩子","陪爸妈","独处发呆","写情绪记录"]},"mars":{"name":"火曜日","glyph":"♂","planet":"火星","theme":"行动、决断、体力、突破","accent":"#A8503F","picks":["那件拖了三周的事，今天开个头","把该拒绝的事，直接拒了","去运动一次，出到出汗","把房间彻底收拾一遍","见一个不太想见但必须见的人","定一个截止时间，写在明面上","干一件需要体力的活：搬、扛、跑","把最难啃的那部分先啃掉"],"fit":["健身跑步","撸铁","打球","搬家","大扫除","谈判","催款","维权投诉","办证跑腿","面试冲刺","赶工加班","剪片子赶稿","修理安装","上门对接","退货换货","找工作谈薪","硬着头皮开始","做决定拍板","开短会定事","找人理论"]},"mercury":{"name":"水曜日","glyph":"☿","planet":"水星","theme":"沟通、文字、学习、传递","accent":"#3F7E79","picks":["把一件说不清的事，写成三句话","回掉那条你一直没回的消息","要交的东西，先写出一个粗糙的版本","找个人把想法讲一遍，讲到对方听懂","把专业词换成大白话","打开一个空白文档，先写一百字","给一件拖着的沟通打个电话","学一个下周就能用上的小技巧"],"fit":["写文案","开会","做 PPT","写周报","改简历","面试","回消息清未读","打电话沟通","发邮件","写方案","改旧稿","做会议记录","对接客户","翻译","学英语背单词","看教程上课","考证刷题","写小红书笔记","剪视频脚本","报名咨询"]},"jupiter":{"name":"木曜日","glyph":"♃","planet":"木星","theme":"扩张、机遇、增长、学习、远行","accent":"#6D5F98","picks":["把搁置最久的那件事往前推一步","给一个很久没联系的人发条消息，问问近况","把想学的东西开个头，哪怕只看二十分钟","找比你懂得多的人请教一个问题","把手上这件事的野心放大一档，重新估个价","去一个没去过的地方，走条没走过的路","提一个你一直觉得“可能有点大”的想法","整理一份能拿出去见人的东西：作品、简历、方案"],"fit":["投简历","面试","谈合作","约人喝咖啡","请教前辈","报名课程","出差","订机票","办签证","出门旅行","学新技能","开新项目","拓客加好友","进社群","看展逛博物馆","读书","考证报名","做年度规划","发新品","投稿参赛"]},"venus":{"name":"金曜日","glyph":"♀","planet":"金星","theme":"审美、社交、合作、愉悦","accent":"#A96C82","picks":["给自己拍一张能用的照片","约一个人吃饭，别聊工作","把桌面或主页收拾好看一点","买一件真正用得上的好东西","把拖着的合作，往握手推一步","换个发型，或者换套穿搭","送一份不贵但用心的礼","去看一个展，或者一场电影"],"fit":["拍照修图","穿搭试衣","约会","聚餐","送礼","布置房间","剪 vlog","美化主页","逛展看电影","做头发美甲","买衣服鞋子","请客","谈合作签约","拍证件照","选礼物","参加婚礼","收拾妆容","布置工位","探店","陪家人吃饭"]},"saturn":{"name":"土曜日","glyph":"♄","planet":"土星","theme":"收束、责任、结算、沉淀","accent":"#76695A","picks":["把上个月没结的账算清楚","清一个抽屉、一个文件夹、一个群","把答应过但拖着的事列出来，划掉一件","给长期要做的事定个规矩：什么时候做、做到什么程度","复盘一件已经结束的事，写三行结论","该还的还了，该退的退了","检查一件你一直在维护的东西有没有松动：合同、保险、体检","关掉消息，一个人待一个小时"],"fit":["算账记账","报税","还信用卡","交房租","续签合同","续保","体检","归档文件","备份手机照片","断舍离清柜子","退订会员","清理关注列表","写月度总结","项目收尾","交作业交差","修家电","年检年审","整理账单","立规矩定计划","清理电脑桌面"]}}

    const WEEK = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn']
    const POPOVER_ID = 'qiyao-calendar-popover'

    const chipStyle = {
      display: 'inline-block',
      padding: '1px 8px',
      borderRadius: '999px',
      background: 'transparent',
      fontSize: '12px',
      lineHeight: '18px',
      whiteSpace: 'nowrap'
    }

    function todayInfo() {
      const now = new Date()
      const y = now.getFullYear()
      const m = now.getMonth() + 1
      const d = now.getDate()
      const dayNumber = Math.floor(Date.UTC(y, m - 1, d) / 86400000)
      const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
      const key = WEEK[weekday]
      const planet = DATA[key]
      const pick = planet.picks[dayNumber % planet.picks.length]
      const start = dayNumber % planet.fit.length
      const fit = []
      for (let i = 0; i < 6; i += 1) fit.push(planet.fit[(start + i) % planet.fit.length])
      return { m, d, planet, pick, fit }
    }

    function QiyaoAction() {
      const panelRef = React.useRef(null)
      const info = todayInfo()
      const planet = info.planet

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

          h(
            'div',
            {
              style: {
                marginTop: '12px',
                paddingTop: '8px',
                borderTop: '1px solid var(--dsw-alias-border-weak, rgba(0,0,0,0.07))',
                fontSize: '11px',
                opacity: 0.45
              }
            },
            '＋ 自定义事项：/qiyao help'
          )
        )
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
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
