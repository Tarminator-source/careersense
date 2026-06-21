import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, userName } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const links = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'AI Advisor' },
    { path: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0a] border-b border-[#1a2e1a]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CS</span>
          </div>
          <span className="text-white font-bold text-lg">Career<span className="text-[#4ade80]">Sense</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.path} to={link.path}
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-[#4ade80]' : 'text-gray-400 hover:text-white'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Hi, <span className="text-white font-medium">{userName}</span></span>
              <button onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-900/30 border border-red-800/50 rounded-lg hover:bg-red-900/50 transition-all">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/signin" className="text-sm text-gray-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-[#16a34a] rounded-lg hover:bg-[#15803d] transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0f0a] border-t border-[#1a2e1a] px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white text-sm font-medium">{link.label}</Link>
          ))}
          {isLoggedIn
            ? <button onClick={handleLogout} className="text-left text-red-400 text-sm">Logout</button>
            : <>
                <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-gray-400 text-sm">Sign In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-[#4ade80] text-sm font-medium">Get Started</Link>
              </>
          }
        </div>
      )}
    </nav>
  )
}
