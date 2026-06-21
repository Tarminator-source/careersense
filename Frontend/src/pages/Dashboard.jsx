import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

const CAREERS = {
  0: "Network Security Engineer", 1: "Software Engineer",
  2: "UI/UX Engineer", 3: "Software Developer",
  4: "Database Developer", 5: "QA Engineer",
  6: "Web Developer", 7: "CRM Technical Developer",
  8: "Technical Supporter", 9: "Systems Security Administrator",
  10: "Applications Developer", 11: "Mobile Applications Developer",
}
const ICONS = { 0:'🔐', 1:'💻', 2:'🎨', 3:'⚙️', 4:'🗄️', 5:'🧪', 6:'🌐', 7:'📊', 8:'🛠️', 9:'🛡️', 10:'📱', 11:'📲' }

export default function Dashboard() {
  const navigate = useNavigate()
  const { isLoggedIn, userName, userEmail } = useSelector(state => state.auth)
  const { prediction, probability, messages } = useSelector(state => state.chat)

  if (!isLoggedIn) {
    navigate('/signin'); return null
  }

  const role = prediction !== null ? CAREERS[prediction] : null
  const icon = prediction !== null ? ICONS[prediction] : null
  const confidence = probability ? Math.round(probability * 100) : null

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">Welcome back, <span className="text-[#4ade80]">{userName}</span> 👋</h1>
          <p className="text-gray-400">Here's your CareerSense overview</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Chat Messages</p>
            <p className="text-3xl font-bold text-white">{messages.length}</p>
            <p className="text-[#4ade80] text-sm mt-1">Conversation history</p>
          </div>
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Confidence Score</p>
            <p className="text-3xl font-bold text-white">{confidence ? `${confidence}%` : 'N/A'}</p>
            <p className="text-[#4ade80] text-sm mt-1">Match accuracy</p>
          </div>
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <p className="text-3xl font-bold text-white">{role ? '✅' : '⏳'}</p>
            <p className="text-[#4ade80] text-sm mt-1">{role ? 'Career predicted' : 'Awaiting prediction'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career prediction card */}
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-[#4ade80]">🎯</span> Your Career Prediction
            </h2>
            {role ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">{icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{role}</h3>
                <div className="inline-flex items-center gap-2 bg-[#0a0f0a] border border-[#16a34a]/30 rounded-full px-3 py-1 mb-4">
                  <span className="w-2 h-2 bg-[#16a34a] rounded-full"></span>
                  <span className="text-[#4ade80] text-sm">{confidence}% match</span>
                </div>
                <br/>
                <button onClick={() => navigate('/result')}
                  className="px-6 py-2 bg-[#16a34a] rounded-xl text-sm font-semibold hover:bg-[#15803d] transition-all">
                  View Roadmap →
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No prediction yet. Chat with our AI to get your career recommendation.</p>
                <button onClick={() => navigate('/chat')}
                  className="px-6 py-3 bg-[#16a34a] rounded-xl font-semibold hover:bg-[#15803d] transition-all">
                  Start Chatting →
                </button>
              </div>
            )}
          </div>

          {/* Profile card */}
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-[#4ade80]">👤</span> Your Profile
            </h2>
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 bg-[#16a34a] rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto">
                {userName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-2 border-b border-[#1a2e1a]">
                  <span className="text-gray-400 text-sm">Name</span>
                  <span className="text-white font-medium">{userName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#1a2e1a]">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span className="text-white font-medium text-sm">{userEmail}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Account</span>
                  <span className="text-[#4ade80] font-medium text-sm">Active ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Chat with AI', icon: '💬', path: '/chat' },
              { label: 'View Results', icon: '🎯', path: '/result' },
              { label: 'Home', icon: '🏠', path: '/' },
              { label: 'Sign Out', icon: '🚪', path: null },
            ].map((action, i) => (
              <button key={i}
                onClick={() => action.path ? navigate(action.path) : navigate('/')}
                className="py-3 px-4 bg-[#0a0f0a] border border-[#1a2e1a] rounded-xl text-sm font-medium hover:border-[#16a34a]/50 hover:text-[#4ade80] transition-all flex flex-col items-center gap-2">
                <span className="text-2xl">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
