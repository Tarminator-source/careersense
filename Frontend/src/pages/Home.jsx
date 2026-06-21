import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    { icon: '💬', title: 'Conversational AI', desc: 'Chat naturally with our AI advisor. No forms, no quizzes — just a real conversation about your skills and interests.' },
    { icon: '🎯', title: 'Accurate Predictions', desc: 'Our machine learning model analyses your profile and predicts your ideal IT career with a confidence score.' },
    { icon: '🗺️', title: 'Career Roadmap', desc: 'Get a personalised step-by-step roadmap showing exactly what to learn and do to reach your career goal.' },
    { icon: '📊', title: 'Dashboard', desc: 'Track your career prediction, view your roadmap, and manage your profile all in one place.' },
  ]

  const careers = ['Software Engineer', 'Data Scientist', 'UI/UX Designer', 'Network Security Expert', 'Mobile Developer', 'Cloud Architect']

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#111711] border border-[#1a2e1a] rounded-full px-4 py-2 text-[#4ade80] text-sm mb-8">
            <span className="w-2 h-2 bg-[#16a34a] rounded-full animate-pulse"></span>
            AI-Powered Career Guidance for IT Students — FUOYE
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Discover Your Ideal<br />
            <span className="text-[#4ade80]">IT Career Path</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            CareerSense uses artificial intelligence to understand your skills, interests, and personality — 
            then recommends the perfect IT career and guides you to get there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => navigate('/register')}
              className="px-8 py-4 bg-[#16a34a] rounded-xl font-semibold text-lg hover:bg-[#15803d] transition-all">
              Start Your Assessment →
            </button>
            <button onClick={() => navigate('/signin')}
              className="px-8 py-4 bg-[#111711] border border-[#1a2e1a] rounded-xl font-semibold text-lg hover:bg-[#1a2e1a] transition-all">
              Sign In
            </button>
          </div>

          {/* Career tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {careers.map((c, i) => (
              <span key={i} className="px-4 py-2 bg-[#111711] border border-[#1a2e1a] rounded-full text-sm text-gray-400">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How CareerSense Works</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Simple, intelligent, and personalised — designed specifically for IT students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-6 hover:border-[#16a34a]/50 transition-all">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 px-6 bg-[#0d150d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Get Started in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free in under a minute.' },
              { step: '02', title: 'Chat with AI', desc: 'Have a natural conversation with our AI advisor about your skills and interests.' },
              { step: '03', title: 'Get Your Path', desc: 'Receive your career prediction and a personalised roadmap to success.' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#16a34a] rounded-2xl flex items-center justify-center text-2xl font-bold mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-center">{s.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/register')}
            className="mt-16 px-8 py-4 bg-[#16a34a] rounded-xl font-semibold text-lg hover:bg-[#15803d] transition-all">
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a2e1a] py-8 px-6 text-center text-gray-500 text-sm">
        <p>© 2026 CareerSense — Final Year Project, Federal University Oye-Ekiti (FUOYE)</p>
      </footer>
    </div>
  )
}
