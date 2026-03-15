import React, { useState, useEffect, useRef } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import Toast from '../components/Toast.jsx'
import { creationTools, styleTemplates } from '../mockData.js'

// Pet for hero
const PetHeroSmall = () => (
  <svg width="160" height="160" viewBox="0 0 220 220" fill="none">
    <defs>
      <radialGradient id="cHeroGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FDE68A"/>
        <stop offset="100%" stopColor="#F59E0B"/>
      </radialGradient>
    </defs>
    <ellipse cx="110" cy="170" rx="55" ry="45" fill="#F5B720"/>
    <ellipse cx="110" cy="155" rx="50" ry="40" fill="#F5B720"/>
    <ellipse cx="68" cy="188" rx="18" ry="12" fill="#E6A010" transform="rotate(-15 68 188)"/>
    <ellipse cx="152" cy="188" rx="18" ry="12" fill="#E6A010" transform="rotate(15 152 188)"/>
    <ellipse cx="110" cy="148" rx="22" ry="20" fill="#FBBF24"/>
    <circle cx="110" cy="100" r="48" fill="#C2855A"/>
    <ellipse cx="77" cy="64" rx="16" ry="20" fill="#A0612A" transform="rotate(-18 77 64)"/>
    <ellipse cx="143" cy="64" rx="16" ry="20" fill="#A0612A" transform="rotate(18 143 64)"/>
    <ellipse cx="77" cy="64" rx="9" ry="13" fill="#F9A8D4" transform="rotate(-18 77 64)"/>
    <ellipse cx="143" cy="64" rx="9" ry="13" fill="#F9A8D4" transform="rotate(18 143 64)"/>
    <circle cx="97" cy="98" r="7" fill="#1A1A1A"/>
    <circle cx="123" cy="98" r="7" fill="#1A1A1A"/>
    <circle cx="99" cy="95.5" r="2.5" fill="white"/>
    <circle cx="125" cy="95.5" r="2.5" fill="white"/>
    <ellipse cx="110" cy="113" rx="8" ry="5" fill="#E07070"/>
    <path d="M102 120 Q110 128 118 120" stroke="#C05050" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M85 72 L95 54 L110 68 L125 54 L135 72" fill="#F5B720" stroke="#E09910" strokeWidth="1.5"/>
    <rect x="83" y="70" width="54" height="8" rx="4" fill="#F5B720" stroke="#E09910" strokeWidth="1"/>
    <circle cx="95" cy="54" r="4" fill="#3B82F6"/>
    <circle cx="110" cy="66" r="4" fill="#EF4444"/>
    <circle cx="125" cy="54" r="4" fill="#3B82F6"/>
  </svg>
)

// Result image placeholder
const GeneratedImage = ({ template }) => {
  const configs = {
    royal: { bg: ['#7C3AED', '#5B21B6'], emoji: '👑', label: 'Royal Portrait' },
    cute: { bg: ['#EC4899', '#BE185D'], emoji: '🌸', label: 'Cute Style' },
    cool: { bg: ['#2563EB', '#1D4ED8'], emoji: '😎', label: 'Cool Vibe' },
    fantasy: { bg: ['#8B5CF6', '#6D28D9'], emoji: '✨', label: 'Fantasy World' },
  }
  const cfg = configs[template] || configs.royal
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: '100%',
        height: 240,
        borderRadius: 20,
        background: `linear-gradient(145deg, ${cfg.bg[0]}, ${cfg.bg[1]})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)' }}
      />
      <div className="flex flex-col items-center gap-3">
        <span className="text-7xl">{cfg.emoji}</span>
        <PetHeroSmall />
        <div
          className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
        >
          <span className="text-white text-xs font-bold opacity-80">{cfg.label}</span>
          <span className="text-white/60 text-xs">AI Generated</span>
        </div>
      </div>
      {/* Watermark */}
      <div className="absolute top-3 right-3">
        <span
          className="text-white/70 font-black text-xs px-2 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.2)' }}
        >
          🐾 Pet-Pop
        </span>
      </div>
    </div>
  )
}

const TOOLS = [
  { id: 'resize', label: '改尺寸', icon: '⊞' },
  { id: 'edit', label: 'AI修图', icon: '✦' },
  { id: 'restore', label: '图像修复', icon: '🔄' },
  { id: 'erase', label: '消除背景', icon: '✂️' },
]

// Sub-flow states: null | 'upload' | 'template' | 'loading' | 'result'
export default function Creation() {
  const [promoVisible, setPromoVisible] = useState(true)
  const [aiFlow, setAiFlow] = useState(null) // null means grid view
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [loadingPct, setLoadingPct] = useState(0)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [uploadedFile, setUploadedFile] = useState(false)
  const fileRef = useRef()
  const timerRef = useRef()

  const startLoading = () => {
    setAiFlow('loading')
    setLoadingPct(0)
    let pct = 0
    timerRef.current = setInterval(() => {
      pct += Math.random() * 18 + 5
      if (pct >= 100) {
        pct = 100
        clearInterval(timerRef.current)
        setTimeout(() => setAiFlow('result'), 300)
      }
      setLoadingPct(Math.min(pct, 100))
    }, 180)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const handlePublish = () => {
    setToast({ visible: true, message: '已发布到广场 🎉' })
    setTimeout(() => {
      setAiFlow(null)
      setSelectedTemplate(null)
      setUploadedFile(false)
    }, 2800)
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 80 }}>

        {/* ── HERO SECTION ── */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{ height: 220 }}
        >
          {/* Gold overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(160deg, rgba(245,183,32,0.85) 0%, rgba(240,150,40,0.75) 100%)' }}
          />
          {/* Pet background */}
          <div
            className="absolute inset-0 flex items-center justify-end pr-6"
            style={{ background: 'linear-gradient(160deg, #F5B720, #F09628)' }}
          >
            <PetHeroSmall />
          </div>
          {/* Text overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                <span className="text-lg">🐾</span>
              </div>
              <span className="text-white/90 font-bold text-sm">Pet-Pop AI</span>
            </div>
            <p className="text-white font-black leading-tight" style={{ fontSize: 22 }}>
              THERE'S NO<br/>SUPERSTAR I<br/>CAN'T CREATE!
            </p>
            {/* Dots */}
            <div className="flex gap-1.5 mt-3">
              {[0,1,2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? 'white' : 'rgba(255,255,255,0.4)' }}/>
              ))}
            </div>
          </div>
        </div>

        {/* ── VIP PROMO ── */}
        {promoVisible && (
          <div
            className="mx-4 mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              ✨
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">AI 生成内容 · 首月 ¥9</p>
              <p className="text-white/70 text-xs mt-0.5">生成直播文案、图片、排版，一键搞定</p>
            </div>
            <button
              className="flex-shrink-0 px-3 py-1.5 rounded-pill text-xs font-bold text-white transition-all active:scale-95"
              style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              Try Now
            </button>
            <button
              onClick={() => setPromoVisible(false)}
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ── EARN POINTS ── */}
        <div className="flex items-center justify-between px-5 mt-4">
          <h2 className="text-base font-black text-gray-900">AI 创作工坊</h2>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-bold"
            style={{ background: '#FEF3C7', color: '#D97706' }}
          >
            🪙 赚积分
            <span>?</span>
          </button>
        </div>

        {/* ── AI IMAGES FLOW ── */}
        {aiFlow && (
          <div className="mx-4 mt-3">
            {/* Back button */}
            {aiFlow !== 'loading' && (
              <button
                onClick={() => { setAiFlow(null); setSelectedTemplate(null); setUploadedFile(false) }}
                className="flex items-center gap-1.5 text-sm font-bold text-gray-500 mb-4"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                返回
              </button>
            )}

            {/* Upload step */}
            {aiFlow === 'upload' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-black text-gray-900">上传宠物照片</h3>
                <div
                  className="flex flex-col items-center justify-center gap-3 cursor-pointer"
                  style={{
                    height: 180,
                    borderRadius: 18,
                    border: uploadedFile ? '2px solid #F5B720' : '2px dashed #D1D5DB',
                    background: uploadedFile ? '#FFFBF0' : '#F9FAFB',
                  }}
                  onClick={() => { setUploadedFile(true) }}
                >
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={() => setUploadedFile(true)}/>
                  {uploadedFile ? (
                    <>
                      <div className="text-4xl">✅</div>
                      <p className="text-sm font-semibold text-gray-600">照片已上传</p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl">📷</div>
                      <p className="text-sm text-gray-500">点击上传照片</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => uploadedFile && setAiFlow('template')}
                  disabled={!uploadedFile}
                  className="w-full py-3.5 rounded-pill text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #F5B720, #F09628)' }}
                >
                  下一步：选择风格
                </button>
              </div>
            )}

            {/* Template step */}
            {aiFlow === 'template' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-black text-gray-900">选择生成风格</h3>
                <div className="grid grid-cols-2 gap-3">
                  {styleTemplates.map((t) => {
                    const sel = selectedTemplate === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl transition-all active:scale-95"
                        style={{
                          background: sel ? t.color : '#F9FAFB',
                          border: sel ? '2px solid #F5B720' : '2px solid #E5E7EB',
                          boxShadow: sel ? '0 4px 16px rgba(245,183,32,0.25)' : 'none',
                        }}
                      >
                        <span className="text-3xl">{t.emoji}</span>
                        <span className="text-sm font-bold text-gray-700">{t.label}</span>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => selectedTemplate && startLoading()}
                  disabled={!selectedTemplate}
                  className="w-full py-3.5 rounded-pill text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #F5B720, #F09628)' }}
                >
                  ✨ 开始 AI 生成
                </button>
              </div>
            )}

            {/* Loading step */}
            {aiFlow === 'loading' && (
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                      animation: 'spin 2s linear infinite',
                    }}
                  >
                    ✨
                  </div>
                  <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
                    <span>AI 正在创作...</span>
                    <span style={{ color: '#F09628' }}>{Math.round(loadingPct)}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                    <div
                      className="h-full rounded-full transition-all duration-150"
                      style={{
                        width: `${loadingPct}%`,
                        background: 'linear-gradient(90deg, #F5B720, #F09628)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">正在生成高清宠物写真，请稍候...</p>
                </div>
              </div>
            )}

            {/* Result step */}
            {aiFlow === 'result' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900">生成完成！</h3>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: '#D1FAE5', color: '#059669' }}
                  >
                    ✓ 高清
                  </span>
                </div>
                <GeneratedImage template={selectedTemplate} />
                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 rounded-pill text-sm font-bold text-gray-600 border-2 border-gray-200 transition-all active:scale-95"
                  >
                    💾 保存
                  </button>
                  <button
                    onClick={handlePublish}
                    className="flex-2 px-6 py-3 rounded-pill text-sm font-bold text-white transition-all active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #F5B720, #F09628)',
                      boxShadow: '0 6px 20px rgba(245,183,32,0.4)',
                      flex: 2,
                    }}
                  >
                    🚀 一键发布
                  </button>
                </div>
                <button
                  onClick={() => { setSelectedTemplate(null); setAiFlow('template') }}
                  className="w-full py-2.5 rounded-pill text-sm font-semibold text-gray-500"
                  style={{ background: '#F3F4F6' }}
                >
                  重新生成
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── MAIN GRID (when no flow) ── */}
        {!aiFlow && (
          <>
            <div className="grid grid-cols-2 gap-3 mx-4 mt-3">
              {creationTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => tool.id === 'ai-images' && setAiFlow('upload')}
                  className="relative flex flex-col justify-between p-4 overflow-hidden transition-all active:scale-95"
                  style={{
                    borderRadius: 18,
                    background: `linear-gradient(145deg, ${tool.gradient[0]}, ${tool.gradient[1]})`,
                    minHeight: 130,
                  }}
                >
                  {/* Badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-3xl">{tool.emoji}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: tool.badgeColor,
                        color: 'white',
                        fontSize: 10,
                      }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-black text-gray-800 text-sm leading-tight">{tool.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-snug">{tool.sublabel}</p>
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.6)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2L8 6L4 10" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* ── TOOLS ROW ── */}
            <div className="mx-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-gray-700">Tools</h3>
                <button className="text-xs font-bold" style={{ color: '#F09628' }}>More →</button>
              </div>
              <div className="flex gap-2">
                {TOOLS.map((t) => (
                  <button
                    key={t.id}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all active:scale-95"
                    style={{ background: '#F3F4F6' }}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-gray-600 font-semibold leading-tight text-center" style={{ fontSize: 10 }}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />

      {/* ── TOAST ── */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast({ ...toast, visible: false })}
        type="success"
      />
    </div>
  )
}
