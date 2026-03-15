import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PERSONALITIES = ['呆萌', '傲娇', '活泼', '贪吃']
const TRACKS = ['吃播', '颜值', '才艺', '故事']
const TRACK_ICONS = { '吃播': '🍗', '颜值': '✨', '才艺': '🎭', '故事': '📖' }

const AI_TAGS_MOCK = [
  { id: 'breed', label: '柴犬系', color: '#FEF3C7', text: '#D97706' },
  { id: 'personality', label: '傲娇型', color: '#FCE7F3', text: '#BE185D' },
  { id: 'look', label: '萌系外貌', color: '#EDE9FE', text: '#7C3AED' },
]

// Pet avatar placeholder SVGs
const PetAvatarPlaceholder = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="url(#petGrad)"/>
    <defs>
      <radialGradient id="petGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FDE68A"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </radialGradient>
    </defs>
    {/* body */}
    <ellipse cx="100" cy="130" rx="45" ry="40" fill="#C2855A"/>
    {/* head */}
    <circle cx="100" cy="85" r="35" fill="#C2855A"/>
    {/* ears */}
    <ellipse cx="72" cy="60" rx="12" ry="16" fill="#A0612A" transform="rotate(-15 72 60)"/>
    <ellipse cx="128" cy="60" rx="12" ry="16" fill="#A0612A" transform="rotate(15 128 60)"/>
    <ellipse cx="72" cy="60" rx="7" ry="10" fill="#F9A8D4" transform="rotate(-15 72 60)"/>
    <ellipse cx="128" cy="60" rx="7" ry="10" fill="#F9A8D4" transform="rotate(15 128 60)"/>
    {/* face */}
    <circle cx="89" cy="82" r="5" fill="#1A1A1A"/>
    <circle cx="111" cy="82" r="5" fill="#1A1A1A"/>
    <circle cx="90.5" cy="80.5" r="1.5" fill="white"/>
    <circle cx="112.5" cy="80.5" r="1.5" fill="white"/>
    <ellipse cx="100" cy="96" rx="6" ry="4" fill="#E07070"/>
    <path d="M94 101 Q100 107 106 101" stroke="#C05050" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* crown */}
    <path d="M78 62 L85 48 L100 58 L115 48 L122 62" fill="#F5B720" stroke="#E09910" strokeWidth="1"/>
    <circle cx="85" cy="48" r="3" fill="#3B82F6"/>
    <circle cx="100" cy="56" r="3" fill="#EF4444"/>
    <circle cx="115" cy="48" r="3" fill="#3B82F6"/>
  </svg>
)

// IP Cover placeholder
const IPCoverPlaceholder = () => (
  <div
    className="relative flex items-center justify-center overflow-hidden"
    style={{
      width: 180,
      height: 180,
      borderRadius: 24,
      background: 'linear-gradient(145deg, #F5B720, #F09628)',
      boxShadow: '0 12px 40px rgba(245,183,32,0.4)',
    }}
  >
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)'
    }}/>
    <PetAvatarPlaceholder size={160} />
    <div
      className="absolute bottom-3 left-0 right-0 flex justify-center"
    >
      <span
        className="font-pacifico italic text-white text-xl"
        style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        Laoto
      </span>
    </div>
  </div>
)

export default function Onboarding({ onComplete }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState('right')
  const [uploaded, setUploaded] = useState(false)
  const [aiTags, setAiTags] = useState([...AI_TAGS_MOCK])
  const [nickname, setNickname] = useState('')
  const [selectedPersonalities, setSelectedPersonalities] = useState([])
  const [selectedTrack, setSelectedTrack] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const progress = step / 3

  const goNext = () => {
    setDirection('right')
    setStep((s) => Math.min(s + 1, 3))
  }
  const goBack = () => {
    setDirection('left')
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    setUploaded(true)
  }

  const togglePersonality = (p) => {
    setSelectedPersonalities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  const removeTag = (id) => {
    setAiTags((prev) => prev.filter((t) => t.id !== id))
  }

  const handleStart = () => {
    onComplete()
    navigate('/home')
  }

  const canProceed = step === 1
    ? uploaded
    : step === 2
    ? nickname.trim().length > 0
    : true

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFFBF0 0%, #FFF8E1 100%)' }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-14 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🐾</span>
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: '#F09628' }}
          >
            Pet-Pop
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-500">
              {step === 1 ? '上传照片' : step === 2 ? '填写信息' : '确认 IP'}
            </span>
            <span className="text-sm font-bold" style={{ color: '#F09628' }}>
              {step}/3
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #F5B720, #F09628)',
              }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex items-center gap-1"
                style={{ flex: 1, justifyContent: s === 1 ? 'flex-start' : s === 3 ? 'flex-end' : 'center' }}
              >
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: step >= s ? '#F09628' : '#E5E7EB',
                    transform: step === s ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div
        key={step}
        className={`flex-1 overflow-y-auto no-scrollbar px-6 ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
      >
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                上传宠物照片
              </h2>
              <p className="text-sm text-gray-500 mt-1">AI 将自动识别你的宠物特征</p>
            </div>

            {/* Drop zone */}
            <div
              className="relative flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200"
              style={{
                height: uploaded ? 220 : 200,
                borderRadius: 20,
                border: dragging
                  ? '2.5px dashed #F09628'
                  : uploaded
                  ? '2.5px solid #F5B720'
                  : '2.5px dashed #D1D5DB',
                background: dragging
                  ? '#FEF3C7'
                  : uploaded
                  ? 'linear-gradient(160deg, #FFFBF0, #FEF3C7)'
                  : '#F9FAFB',
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !uploaded && fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={() => setUploaded(true)}
              />
              {uploaded ? (
                <>
                  <div className="relative">
                    <PetAvatarPlaceholder size={140} />
                    <div
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: '#10B981' }}
                    >
                      ✓
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">照片已上传</p>
                </>
              ) : (
                <>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}
                  >
                    📷
                  </div>
                  <p className="text-sm font-semibold text-gray-600 text-center px-4">
                    拖拽照片到此处<br/>
                    <span className="text-gray-400">或</span>
                  </p>
                  <button
                    className="px-6 py-2.5 rounded-pill text-sm font-bold text-white transition-transform active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #F5B720, #F09628)' }}
                  >
                    点击上传
                  </button>
                  <p className="text-xs text-gray-400">支持 JPG、PNG，最大 10MB</p>
                </>
              )}
            </div>

            {/* AI Tags */}
            {uploaded && (
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: 'linear-gradient(135deg, #F5B720, #F09628)' }}
                  >
                    ✨
                  </div>
                  <span className="text-sm font-bold text-gray-700">AI 识别结果</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-sm font-semibold transition-all duration-200"
                      style={{ background: tag.color, color: tag.text }}
                    >
                      {tag.label}
                      <button
                        onClick={() => removeTag(tag.id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-xs hover:opacity-70"
                        style={{ background: `${tag.text}22`, color: tag.text }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {aiTags.length === 0 && (
                    <span className="text-sm text-gray-400 italic">已清除所有标签</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                打造你的 IP
              </h2>
              <p className="text-sm text-gray-500 mt-1">越详细，AI 生成效果越好</p>
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                宠物昵称 <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="给宠物起个响亮的名字..."
                maxLength={12}
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-800 placeholder-gray-300 outline-none transition-all duration-200"
                style={{
                  background: 'white',
                  border: nickname.trim() ? '2px solid #F5B720' : '2px solid #E5E7EB',
                  boxShadow: nickname.trim() ? '0 0 0 4px rgba(245,183,32,0.12)' : 'none',
                }}
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">{nickname.length}/12</span>
              </div>
            </div>

            {/* Personality chips */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                性格特征 <span className="text-gray-400 font-normal">（可多选）</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSONALITIES.map((p) => {
                  const sel = selectedPersonalities.includes(p)
                  return (
                    <button
                      key={p}
                      onClick={() => togglePersonality(p)}
                      className="px-4 py-2 rounded-pill text-sm font-bold transition-all duration-200 active:scale-95"
                      style={{
                        background: sel ? 'linear-gradient(135deg, #F5B720, #F09628)' : 'white',
                        color: sel ? 'white' : '#6B7280',
                        border: sel ? 'none' : '2px solid #E5E7EB',
                        boxShadow: sel ? '0 4px 12px rgba(245,183,32,0.3)' : 'none',
                      }}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Track selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                主攻赛道 <span className="text-gray-400 font-normal">（单选）</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {TRACKS.map((t) => {
                  const sel = selectedTrack === t
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTrack(t)}
                      className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 active:scale-95"
                      style={{
                        background: sel ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' : 'white',
                        border: sel ? '2px solid #F5B720' : '2px solid #E5E7EB',
                        boxShadow: sel ? '0 4px 16px rgba(245,183,32,0.25)' : 'none',
                      }}
                    >
                      <span className="text-2xl">{TRACK_ICONS[t]}</span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: sel ? '#D97706' : '#374151' }}
                      >
                        {t}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                你的 IP 诞生了！
              </h2>
              <p className="text-sm text-gray-500 mt-1">AI 已为你生成专属宠物 IP</p>
            </div>

            {/* IP Cover */}
            <div className="flex flex-col items-center gap-4">
              <div style={{ position: 'relative' }}>
                <IPCoverPlaceholder />
                {/* Sparkles */}
                <div className="absolute -top-3 -right-3 text-2xl animate-bounce">✨</div>
                <div className="absolute -bottom-2 -left-3 text-xl" style={{ animationDelay: '0.3s' }}>🌟</div>
              </div>

              {/* IP name */}
              <div className="text-center">
                <h3 className="font-pacifico italic text-3xl" style={{ color: '#F09628' }}>
                  {nickname || 'Laoto'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">你的专属宠物 IP</p>
              </div>

              {/* Track badge */}
              {selectedTrack && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-pill font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #F5B720, #F09628)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(245,183,32,0.4)',
                  }}
                >
                  <span>{TRACK_ICONS[selectedTrack]}</span>
                  <span>{selectedTrack}赛道</span>
                  <span className="text-xs opacity-80">推荐</span>
                </div>
              )}

              {/* Summary card */}
              <div
                className="w-full p-4 rounded-2xl"
                style={{ background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                <div className="flex flex-col gap-2.5">
                  {selectedPersonalities.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 w-14">性格</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedPersonalities.map((p) => (
                          <span
                            key={p}
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: '#FEF3C7', color: '#D97706' }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-14">等级</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                      style={{ background: '#F09628' }}
                    >
                      LV.1 新人
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-14">Token</span>
                    <span className="text-xs font-semibold text-gray-600">🎁 新手礼包 100 Token 已到账</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-6" />
      </div>

      {/* Bottom buttons */}
      <div className="flex-shrink-0 px-6 pb-10 pt-3 flex gap-3">
        {step > 1 && (
          <button
            onClick={goBack}
            className="flex-none w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all active:scale-95"
            style={{ background: '#F3F4F6', color: '#6B7280' }}
          >
            ←
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={goNext}
            disabled={!canProceed}
            className="flex-1 h-12 rounded-pill text-sm font-bold text-white transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: canProceed
                ? 'linear-gradient(135deg, #F5B720, #F09628)'
                : '#E5E7EB',
              boxShadow: canProceed ? '0 6px 20px rgba(245,183,32,0.4)' : 'none',
            }}
          >
            {step === 1 ? '下一步：填写信息' : '下一步：预览 IP'}
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="flex-1 h-12 rounded-pill text-sm font-bold text-white transition-all duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #F5B720, #F09628)',
              boxShadow: '0 6px 24px rgba(245,183,32,0.45)',
            }}
          >
            🐾 开始养成！
          </button>
        )}
      </div>
    </div>
  )
}
