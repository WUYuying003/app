import React, { useState } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import { squarePosts } from '../mockData.js'

const TRACKS = ['全部', '吃播', '颜值', '才艺', '故事']

const PetCard = ({ post, height }) => (
  <div
    className="relative overflow-hidden rounded-card transition-all active:scale-95"
    style={{ borderRadius: 16, height }}
  >
    {/* Pet image placeholder */}
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(145deg, ${post.bgColor}, ${post.bgColor}cc)` }}
    >
      <span style={{ fontSize: height * 0.35 }}>{post.emoji}</span>
    </div>
    {/* Gradient overlay */}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
    />
    {/* Track badge */}
    <div className="absolute top-2 left-2">
      <span
        className="text-white font-bold px-2 py-0.5 rounded-full"
        style={{ background: 'rgba(0,0,0,0.35)', fontSize: 10 }}
      >
        {post.track}
      </span>
    </div>
    {/* Bottom info */}
    <div className="absolute bottom-0 left-0 right-0 p-2.5">
      <p className="text-white font-bold text-sm leading-tight">{post.petName}</p>
      <p className="text-white/70 text-xs">{post.owner}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-xs text-red-400">❤️</span>
        <span className="text-white/90 font-semibold text-xs">
          {post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}
        </span>
      </div>
    </div>
  </div>
)

export default function Square() {
  const [activeTrack, setActiveTrack] = useState('全部')
  const [searchVal, setSearchVal] = useState('')

  const filtered = squarePosts.filter((p) =>
    activeTrack === '全部' || p.track === activeTrack
  )

  // Split into two columns
  const col1 = filtered.filter((_, i) => i % 2 === 0)
  const col2 = filtered.filter((_, i) => i % 2 === 1)

  const getHeight = (post) => post.aspectRatio === 'tall' ? 210 : 160

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── HEADER ── */}
      <div
        className="flex-shrink-0 px-4 pt-14 pb-3"
        style={{ background: 'white', boxShadow: '0 1px 0 rgba(0,0,0,0.06)' }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-black text-gray-900">宠物广场</h1>
          <button
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: '#F3F4F6' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="#6B7280" strokeWidth="1.8"/>
              <path d="M13 13L16 16" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl mb-3"
          style={{ background: '#F3F4F6' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="#9CA3AF" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="搜索宠物 IP、赛道、标签..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
          />
        </div>

        {/* Track tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TRACKS.map((t) => {
            const active = activeTrack === t
            return (
              <button
                key={t}
                onClick={() => setActiveTrack(t)}
                className="flex-shrink-0 px-4 py-1.5 rounded-pill text-sm font-bold transition-all duration-200 active:scale-95"
                style={{
                  background: active ? 'linear-gradient(135deg, #F5B720, #F09628)' : '#F3F4F6',
                  color: active ? 'white' : '#6B7280',
                  boxShadow: active ? '0 3px 10px rgba(245,183,32,0.35)' : 'none',
                }}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── WATERFALL FEED ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3" style={{ paddingBottom: 80 }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-5xl">🐾</span>
            <p className="text-gray-500 font-semibold text-sm">暂无内容，快来发布第一条吧！</p>
          </div>
        ) : (
          <div className="flex gap-3">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-3">
              {col1.map((post) => (
                <PetCard key={post.id} post={post} height={getHeight(post)} />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-3" style={{ marginTop: 24 }}>
              {col2.map((post) => (
                <PetCard key={post.id} post={post} height={getHeight(post)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FAB ── */}
      <button
        className="fab-bounce absolute flex items-center justify-center rounded-full shadow-xl transition-all active:scale-90"
        style={{
          width: 52,
          height: 52,
          bottom: 78,
          right: 16,
          background: 'linear-gradient(135deg, #F5B720, #F09628)',
          boxShadow: '0 6px 20px rgba(245,183,32,0.5)',
          zIndex: 20,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 4V18M4 11H18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  )
}
