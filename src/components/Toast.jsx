import React, { useEffect } from 'react'

export default function Toast({ message, visible, onHide, type = 'success' }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2800)
      return () => clearTimeout(t)
    }
  }, [visible, onHide])

  if (!visible) return null

  const colors = {
    success: { bg: '#1A1A1A', icon: '🎉' },
    info: { bg: '#3B82F6', icon: 'ℹ️' },
    warning: { bg: '#F59E0B', icon: '⚠️' },
  }
  const { bg, icon } = colors[type] || colors.success

  return (
    <div
      className="toast-in fixed z-50 flex items-center gap-3 px-5 py-3.5 rounded-pill shadow-xl"
      style={{
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        background: bg,
        minWidth: 220,
        maxWidth: 320,
        whiteSpace: 'nowrap',
      }}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-white font-semibold text-sm">{message}</span>
    </div>
  )
}
