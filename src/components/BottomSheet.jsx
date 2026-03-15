import React from 'react'

export default function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <>
      <div className="sheet-overlay" onClick={onClose} style={{ top: 0, zIndex: 50 }} />
      <div
        className="sheet-panel fixed bottom-0 left-1/2 bg-white z-50 overflow-hidden"
        style={{
          width: 390,
          transform: 'translateX(-50%)',
          borderRadius: '24px 24px 0 0',
          maxHeight: '75vh',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        )}
        {/* Content */}
        <div className="overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(75vh - 80px)' }}>
          {children}
        </div>
      </div>
    </>
  )
}
