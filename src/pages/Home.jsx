import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import BottomSheet from '../components/BottomSheet.jsx'
import { petProfile, shortcutCards, moreFeatures } from '../mockData.js'

// Inline pet SVG for Home
const PetHero = () => (
  <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="heroGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FDE68A"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </radialGradient>
      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(245,183,32,0.35)"/>
        <stop offset="100%" stopColor="rgba(245,183,32,0)"/>
      </radialGradient>
    </defs>
    {/* Glow halo */}
    <ellipse cx="110" cy="195" rx="70" ry="18" fill="rgba(0,0,0,0.1)"/>
    <ellipse cx="110" cy="180" rx="90" ry="28" fill="url(#glowGrad)"/>
    {/* Hoodie body */}
    <ellipse cx="110" cy="170" rx="55" ry="45" fill="#F5B720"/>
    <ellipse cx="110" cy="155" rx="50" ry="40" fill="#F5B720"/>
    {/* Paws */}
    <ellipse cx="68" cy="188" rx="18" ry="12" fill="#E6A010" transform="rotate(-15 68 188)"/>
    <ellipse cx="152" cy="188" rx="18" ry="12" fill="#E6A010" transform="rotate(15 152 188)"/>
    {/* Hoodie details */}
    <ellipse cx="110" cy="148" rx="22" ry="20" fill="#FBBF24"/>
    {/* Head */}
    <circle cx="110" cy="100" r="48" fill="#C2855A"/>
    {/* Ears */}
    <ellipse cx="77" cy="64" rx="16" ry="20" fill="#A0612A" transform="rotate(-18 77 64)"/>
    <ellipse cx="143" cy="64" rx="16" ry="20" fill="#A0612A" transform="rotate(18 143 64)"/>
    <ellipse cx="77" cy="64" rx="9" ry="13" fill="#F9A8D4" transform="rotate(-18 77 64)"/>
    <ellipse cx="143" cy="64" rx="9" ry="13" fill="#F9A8D4" transform="rotate(18 143 64)"/>
    {/* Face */}
    <circle cx="97" cy="98" r="7" fill="#1A1A1A"/>
    <circle cx="123" cy="98" r="7" fill="#1A1A1A"/>
    <circle cx="99" cy="95.5" r="2.5" fill="white"/>
    <circle cx="125" cy="95.5" r="2.5" fill="white"/>
    {/* Nose */}
    <ellipse cx="110" cy="113" rx="8" ry="5" fill="#E07070"/>
    {/* Smile */}
    <path d="M102 120 Q110 128 118 120" stroke="#C05050" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Crown */}
    <path d="M85 72 L95 54 L110 68 L125 54 L135 72" fill="#F5B720" stroke="#E09910" strokeWidth="1.5"/>
    <rect x="83" y="70" width="54" height="8" rx="4" fill="#F5B720" stroke="#E09910" strokeWidth="1"/>
    <circle cx="95" cy="54" r="4" fill="#3B82F6"/>
    <circle cx="110" cy="66" r="4" fill="#EF4444"/>
    <circle cx="125" cy="54" r="4" fill="#3B82F6"/>
    {/* Gem in crown center */}
    <rect cx="108" cy="65" width="4" height="4" rx="1" fill="#60A5FA"/>
  </svg>
)

export default function Home() {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [petIndex, setPetIndex] = useState(0)

  const xpPercent = (petProfile.xp / petProfile.xpMax) * 100

  return (
    <div
      className="relative flex flex-col h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5B720 0%, #F09628 55%, #E8871A 100%)' }}
    >
      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2 flex-shrink-0">
        <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.22)' }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect y="0" width="20" height="2.5" rx="1.25" fill="white"/>
            <rect y="5.75" width="14" height="2.5" rx="1.25" fill="white"/>
            <rect y="11.5" width="20" height="2.5" rx="1.25" fill="white"/>
          </svg>
        </button>

        {/* Follower area (center) */}
        <div className="flex items-center gap-2">
          {/* Platform avatar stack */}
          <div className="flex items-center" style={{ marginRight: 4 }}>
            {petProfile.platforms.map((p, i) => (
              <div
                key={p.name}
                className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 border-white font-bold"
                style={{
                  background: i === 0 ? '#FF2442' : i === 1 ? '#1A1A1A' : '#E1306C',
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: 3 - i,
                  position: 'relative',
                  fontSize: 14,
                }}
              >
                {p.emoji}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">{petProfile.followers}</p>
            <p className="text-white/75 text-xs font-medium leading-none mt-0.5">全网粉丝</p>
          </div>
        </div>

        <button className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.22)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="white" fillOpacity=".85"/>
            <circle cx="10" cy="10" r="9" stroke="white" strokeOpacity=".6" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
      </div>

      {/* ── RIGHT FLOATING SIDEBAR ── */}
      <div
        className="absolute right-3 flex flex-col gap-2 z-20"
        style={{ top: 110 }}
      >
        {[
          { label: '商城', icon: '🛍️', color: '#A78BFA' },
          { label: '活动', icon: '⭐', color: '#F472B6' },
        ].map((item) => (
          <button
            key={item.label}
            className="relative flex flex-col items-center gap-0.5 px-2 py-2 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              minWidth: 44,
            }}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-bold" style={{ color: '#374151', fontSize: 10 }}>{item.label}</span>
            {/* Red dot badge */}
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
            >
              <span className="text-white font-bold" style={{ fontSize: 9 }}>●</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── SPEECH BUBBLE ── */}
      <div className="flex justify-center px-10 mt-1 flex-shrink-0">
        <div
          className="relative px-5 py-2.5 rounded-pill text-sm font-bold"
          style={{ background: 'rgba(255,255,255,0.92)', color: '#374151', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
        >
          {petProfile.bubble}
          {/* Bubble tail */}
          <div
            className="absolute left-1/2 -bottom-2"
            style={{
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '10px solid rgba(255,255,255,0.92)',
            }}
          />
        </div>
      </div>

      {/* ── PET HERO ── */}
      <div className="relative flex justify-center items-center flex-shrink-0 mt-1">
        {/* Left arrow */}
        <button
          className="absolute left-3 w-9 h-9 rounded-full flex items-center justify-center z-10 active:scale-90 transition-transform"
          style={{ background: 'rgba(255,255,255,0.3)' }}
          onClick={() => setPetIndex((i) => (i - 1 + 3) % 3)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Circular glow platform */}
        <div
          className="relative flex items-center justify-center pulse-ring"
          style={{
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)',
          }}
        >
          <div style={{ marginTop: 20 }}>
            <PetHero />
          </div>
        </div>

        {/* Right arrow */}
        <button
          className="absolute right-3 w-9 h-9 rounded-full flex items-center justify-center z-10 active:scale-90 transition-transform"
          style={{ background: 'rgba(255,255,255,0.3)' }}
          onClick={() => setPetIndex((i) => (i + 1) % 3)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── NAME + LEVEL + XP ── */}
      <div className="flex flex-col items-center px-8 -mt-2 flex-shrink-0">
        {/* Name */}
        <h1
          className="font-pacifico italic text-white"
          style={{ fontSize: 36, textShadow: '0 3px 12px rgba(0,0,0,0.2)' }}
        >
          {petProfile.name}
        </h1>

        {/* Level + XP bar */}
        <div className="flex items-center gap-3 mt-2 w-full max-w-xs">
          <div
            className="flex-shrink-0 px-3 py-1 rounded-pill text-white text-xs font-black"
            style={{
              background: '#F09628',
              border: '2px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            LV.{petProfile.level}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/80 text-xs font-semibold">
                {petProfile.xp}/{petProfile.xpMax}
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            >
              <div
                className="h-full rounded-full xp-bar"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SHORTCUT CARDS ── */}
      <div className="flex gap-3 px-4 mt-4 flex-shrink-0">
        {shortcutCards.map((card) => (
          <button
            key={card.id}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-card glass-card transition-all active:scale-95"
            style={{
              borderRadius: 18,
              boxShadow: card.featured
                ? '0 6px 20px rgba(245,183,32,0.35)'
                : '0 2px 12px rgba(0,0,0,0.08)',
              transform: card.featured ? 'translateY(-4px)' : 'none',
              background: card.featured
                ? 'rgba(255,255,255,0.38)'
                : 'rgba(255,255,255,0.22)',
            }}
          >
            <span className="text-2xl">{card.icon}</span>
            <span
              className="text-xs font-bold leading-tight text-center"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              {card.label}
            </span>
            {card.count !== null && (
              <span
                className="text-xs font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.3)', color: 'white' }}
              >
                {card.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── MORE BUTTON ── */}
      <div className="flex justify-center mt-4 px-6 flex-shrink-0">
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 px-8 py-2.5 rounded-pill text-sm font-bold transition-all active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.22)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            color: 'white',
          }}
        >
          更多玩法
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 11L2 5H12L7 11Z" fill="white" fillOpacity=".8"/>
          </svg>
        </button>
      </div>

      {/* Spacer for bottom nav */}
      <div className="flex-1" />

      {/* ── BOTTOM NAV ── */}
      <BottomNav />

      {/* ── BOTTOM SHEET ── */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="更多玩法">
        <div className="grid grid-cols-3 gap-4 p-5">
          {moreFeatures.map((f) => (
            <button
              key={f.id}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95"
              style={{ background: '#F9FAFB' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}
              >
                {f.icon}
              </div>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                {f.label}
              </span>
            </button>
          ))}
        </div>
        <div className="h-4" />
      </BottomSheet>
    </div>
  )
}
