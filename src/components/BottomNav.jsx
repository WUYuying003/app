import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  {
    id: 'square',
    label: 'Square',
    path: '/square',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
      </svg>
    ),
  },
  {
    id: 'creation',
    label: 'Creation',
    path: '/creation',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C12 3 8 7 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 7 12 3 12 3Z" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'} strokeLinecap="round"/>
        <path d="M12 15V21" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 21H16" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="11" r="2" fill={active ? '#F09628' : '#D1D5DB'}/>
      </svg>
    ),
  },
  {
    id: 'business',
    label: 'Business',
    path: '/business',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 7H18C18 7 19 7 19 8V18C19 19 18 19 18 19H6C5 19 5 18 5 18V8C5 7 6 7 6 7Z" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
        <path d="M9 7V5C9 5 9 4 10 4H14C15 4 15 5 15 5V7" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8"/>
        <path d="M5 11H19" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'home',
    label: 'Personal',
    path: '/home',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 9C8 9 9 6 12 6C15 6 16 9 16 9" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
        <ellipse cx="12" cy="13" rx="5" ry="6" stroke={active ? '#F09628' : '#9CA3AF'} strokeWidth="1.8" fill={active ? '#FEF3C7' : 'none'}/>
        <circle cx="9.5" cy="5" r="1.2" fill={active ? '#F09628' : '#9CA3AF'}/>
        <circle cx="14.5" cy="4.5" r="1" fill={active ? '#F09628' : '#9CA3AF'}/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30"
      style={{ boxShadow: '0 -2px 16px rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center justify-around px-2 pb-safe" style={{ height: 64 }}>
        {tabs.map((tab) => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 flex-1 py-2 transition-all duration-200"
            >
              {tab.icon(active)}
              <span
                className="text-xs font-semibold leading-none tracking-tight"
                style={{ color: active ? '#F09628' : '#9CA3AF', fontSize: 11 }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
