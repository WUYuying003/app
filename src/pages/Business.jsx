import React, { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import { petProfile, activities, vipPlans } from '../mockData.js'

const TABS = ['活动', '周边商城', 'VIP服务', '签约合作']

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const calc = () => {
      const now = Date.now()
      const target = new Date(deadline).getTime()
      const diff = Math.max(target - now, 0)
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1">
      {[
        { v: pad(timeLeft.days), l: '天' },
        { v: pad(timeLeft.hours), l: '时' },
        { v: pad(timeLeft.mins), l: '分' },
        { v: pad(timeLeft.secs), l: '秒' },
      ].map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-0.5">
            <span
              className="font-black text-white text-xs px-1.5 py-0.5 rounded-md"
              style={{ background: '#1A1A1A', minWidth: 22, textAlign: 'center' }}
            >
              {item.v}
            </span>
            <span className="text-xs text-gray-500 font-semibold">{item.l}</span>
          </div>
          {i < 3 && <span className="text-gray-400 font-bold text-xs">:</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-5">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl"
        style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}
      >
        🐾
      </div>
      <div className="text-center">
        <p className="text-gray-700 font-bold text-base">建设中，敬请期待</p>
        <p className="text-gray-400 text-sm mt-1">更多精彩功能即将上线</p>
      </div>
    </div>
  )
}

export default function Business() {
  const [activeTab, setActiveTab] = useState('活动')
  const [joinedActivities, setJoinedActivities] = useState([])

  const handleJoin = (id) => {
    if (!joinedActivities.includes(id)) {
      setJoinedActivities((prev) => [...prev, id])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 80 }}>

        {/* ── HEADER ── */}
        <div
          className="px-5 pt-14 pb-4"
          style={{ background: 'white' }}
        >
          <h1 className="text-xl font-black text-gray-900 mb-4">商务中心</h1>

          {/* IP Achievement card */}
          <div
            className="relative overflow-hidden p-4 rounded-card"
            style={{
              background: 'linear-gradient(135deg, #F5B720 0%, #F09628 100%)',
              borderRadius: 18,
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative flex items-center gap-4">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border-2 border-white/30"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                🐾
              </div>
              {/* Stats */}
              <div className="flex-1">
                <p className="text-white font-black text-base">Laoto</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="text-center">
                    <p className="text-white font-black text-lg leading-none">{petProfile.followers}</p>
                    <p className="text-white/70 text-xs mt-0.5">粉丝</p>
                  </div>
                  <div className="w-px h-8 bg-white/30"/>
                  <div className="text-center">
                    <p className="text-white font-black text-lg leading-none">{petProfile.contentCount}</p>
                    <p className="text-white/70 text-xs mt-0.5">内容</p>
                  </div>
                  <div className="w-px h-8 bg-white/30"/>
                  <div>
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.25)' }}
                    >
                      <span className="text-white text-xs">✓</span>
                      <span className="text-white font-bold text-xs">{petProfile.track}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div
          className="flex px-4 pt-3 pb-0 border-b border-gray-100 sticky top-0 z-10"
          style={{ background: 'white' }}
        >
          {TABS.map((tab, i) => {
            const active = activeTab === tab
            const locked = tab === '签约合作'
            return (
              <button
                key={tab}
                onClick={() => !locked && setActiveTab(tab)}
                className="flex-1 flex flex-col items-center gap-1.5 pb-3 pt-1 transition-all"
                style={{ opacity: locked ? 0.4 : 1 }}
              >
                <div className="flex items-center gap-1">
                  {locked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="2" y="5" width="8" height="6" rx="1.5" fill="#9CA3AF"/>
                      <path d="M4 5V3.5C4 2.12 4.895 1 6 1C7.105 1 8 2.12 8 3.5V5" stroke="#9CA3AF" strokeWidth="1.2" fill="none"/>
                    </svg>
                  )}
                  <span
                    className="text-sm font-bold"
                    style={{ color: active ? '#F09628' : '#6B7280' }}
                  >
                    {tab}
                  </span>
                </div>
                {/* Active indicator */}
                <div
                  className="h-0.5 rounded-full transition-all duration-200"
                  style={{
                    width: active ? '60%' : 0,
                    background: 'linear-gradient(90deg, #F5B720, #F09628)',
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="px-4 py-4">

          {/* 活动 Tab */}
          {activeTab === '活动' && (
            <div className="flex flex-col gap-4">
              {activities.map((act) => {
                const joined = joinedActivities.includes(act.id)
                return (
                  <div
                    key={act.id}
                    className="overflow-hidden rounded-card"
                    style={{
                      borderRadius: 18,
                      background: 'white',
                      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="px-4 py-3 flex items-center justify-between"
                      style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}
                    >
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: act.tagColor, color: 'white' }}
                      >
                        {act.tag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-500 font-semibold">截止</span>
                        <CountdownTimer deadline={act.deadline} />
                      </div>
                    </div>
                    {/* Card body */}
                    <div className="p-4">
                      <h3 className="font-black text-gray-900 text-base leading-tight mb-1.5">
                        {act.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{act.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            🏆 奖励：<span className="font-bold text-gray-700">{act.prize}</span>
                          </span>
                          <span className="text-xs text-gray-400">
                            👥 {act.joined.toLocaleString()} 人已报名
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoin(act.id)}
                          className="px-4 py-2 rounded-pill text-xs font-bold text-white transition-all active:scale-95"
                          style={{
                            background: joined
                              ? '#10B981'
                              : 'linear-gradient(135deg, #F5B720, #F09628)',
                            boxShadow: joined
                              ? 'none'
                              : '0 3px 10px rgba(245,183,32,0.35)',
                          }}
                        >
                          {joined ? '✓ 已报名' : '立即报名'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* 周边商城 Tab */}
          {activeTab === '周边商城' && <ComingSoon />}

          {/* VIP服务 Tab */}
          {activeTab === 'VIP服务' && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 font-medium">选择适合你的 VIP 方案</p>
              {vipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="relative overflow-hidden p-5 rounded-card transition-all"
                  style={{
                    borderRadius: 18,
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #1A1A1A 0%, #374151 100%)'
                      : 'white',
                    border: plan.highlight ? 'none' : '2px solid #E5E7EB',
                    boxShadow: plan.highlight
                      ? '0 8px 32px rgba(0,0,0,0.18)'
                      : '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #F5B720, #F09628)', color: 'white' }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  {/* Plan name + price */}
                  <div className="mb-4">
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#6B7280' }}
                    >
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-black text-4xl"
                        style={{ color: plan.highlight ? '#F5B720' : '#1A1A1A' }}
                      >
                        {plan.price}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: plan.highlight ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  {/* Features */}
                  <div className="flex flex-col gap-2 mb-5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: plan.highlight
                              ? 'rgba(245,183,32,0.2)'
                              : 'rgba(245,183,32,0.15)',
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="#F09628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#374151' }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* CTA button */}
                  <button
                    className="w-full py-3.5 rounded-pill text-sm font-bold transition-all active:scale-95"
                    style={
                      plan.highlight
                        ? {
                            background: 'linear-gradient(135deg, #F5B720, #F09628)',
                            color: 'white',
                            boxShadow: '0 6px 20px rgba(245,183,32,0.4)',
                          }
                        : {
                            background: '#F3F4F6',
                            color: '#374151',
                          }
                    }
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 签约合作 Tab (locked) */}
          {activeTab === '签约合作' && <ComingSoon />}
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  )
}
