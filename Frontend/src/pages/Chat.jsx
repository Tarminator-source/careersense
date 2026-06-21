import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setPrediction, clearChat } from '../store/chatSlice'
import Navbar from '../components/Navbar'

const API_URL = import.meta.env.VITE_API_URL

const CAREERS = {
  0: "Network Security Engineer", 1: "Software Engineer",
  2: "UI/UX Engineer", 3: "Software Developer",
  4: "Database Developer", 5: "QA Engineer",
  6: "Web Developer", 7: "CRM Technical Developer",
  8: "Technical Supporter", 9: "Systems Security Administrator",
  10: "Applications Developer", 11: "Mobile Applications Developer",
}

export default function Chat() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { messages } = useSelector(state => state.chat)
  const { isLoggedIn, userName } = useSelector(state => state.auth)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9))
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!isLoggedIn) { navigate('/signin'); return }
    if (messages.length === 0) {
      dispatch(addMessage({
        role: 'assistant',
        content: `Hi ${userName}! 👋 I'm your CareerSense AI Advisor. I'm here to help you discover your perfect IT career path.\n\nLet's start with something simple — **what subjects or topics in IT do you enjoy the most?** For example: coding, networks, design, databases, security...`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    dispatch(addMessage(userMsg))
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          session_id: sessionId,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()

      dispatch(addMessage({
        role: 'assistant',
        content: data.response,
        prediction: data.prediction,
        probability: data.probability,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))

      if (data.prediction !== undefined && data.prediction !== null) {
        dispatch(setPrediction({ prediction: data.prediction, probability: data.probability }))
      }
    } catch {
      dispatch(addMessage({
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const handleNewChat = () => {
    dispatch(clearChat())
    setTimeout(() => {
      dispatch(addMessage({
        role: 'assistant',
        content: `Hi ${userName}! 👋 Ready for a fresh start? Tell me — **what IT topics interest you the most?**`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    }, 100)
  }

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#4ade80]">$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pt-20 pb-4">
        {/* Chat header */}
        <div className="flex items-center justify-between py-4 border-b border-[#1a2e1a] mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#16a34a] rounded-xl flex items-center justify-center text-lg">🤖</div>
            <div>
              <h2 className="font-semibold text-white">CareerSense AI</h2>
              <p className="text-xs text-[#4ade80]">● Online — Ready to help</p>
            </div>
          </div>
          <button onClick={handleNewChat}
            className="px-4 py-2 text-sm bg-[#111711] border border-[#1a2e1a] rounded-lg hover:bg-[#1a2e1a] transition-all text-gray-400">
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">🤖</div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-[#16a34a] text-white rounded-br-sm'
                  : 'bg-[#111711] border border-[#1a2e1a] text-gray-200 rounded-bl-sm'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} className="text-sm leading-relaxed" />
                {msg.prediction !== undefined && msg.prediction !== null && (
                  <div className="mt-3 p-3 bg-[#0a0f0a] border border-[#16a34a]/50 rounded-xl">
                    <p className="text-xs text-[#4ade80] font-medium mb-1">🎯 Career Prediction</p>
                    <p className="font-bold text-white">{CAREERS[msg.prediction]}</p>
                    {msg.probability && <p className="text-xs text-gray-400 mt-1">{Math.round(msg.probability * 100)}% confidence match</p>}
                    <button onClick={() => navigate('/result')}
                      className="mt-2 w-full py-2 bg-[#16a34a] rounded-lg text-sm font-semibold hover:bg-[#15803d] transition-all">
                      View Full Results & Roadmap →
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-[#1a2e1a] border border-[#16a34a]/30 rounded-lg flex items-center justify-center text-sm ml-3 mt-1 flex-shrink-0">
                  {userName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center text-sm mr-3 mt-1">🤖</div>
              <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-3 flex gap-3 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message... (Press Enter to send)"
            rows={1}
            className="flex-1 bg-transparent text-white placeholder:text-gray-600 resize-none focus:outline-none text-sm leading-relaxed max-h-32"
            style={{ overflowY: 'auto' }}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            className="w-10 h-10 bg-[#16a34a] rounded-xl flex items-center justify-center hover:bg-[#15803d] transition-all disabled:opacity-40 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
