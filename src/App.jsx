import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Onboarding from './pages/Onboarding.jsx'
import Home from './pages/Home.jsx'
import Creation from './pages/Creation.jsx'
import Square from './pages/Square.jsx'
import Business from './pages/Business.jsx'

export default function App() {
  const [onboarded, setOnboarded] = useState(false)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={onboarded ? <Navigate to="/home" replace /> : <Navigate to="/onboard" replace />}
        />
        <Route
          path="/onboard"
          element={<Onboarding onComplete={() => setOnboarded(true)} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/creation" element={<Creation />} />
        <Route path="/square" element={<Square />} />
        <Route path="/business" element={<Business />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
