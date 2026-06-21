import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetStep, setResetStep] = useState(1)
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Please fill in all fields.' }); return
    }
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) {
        setLoading(false)
        Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Invalid email or password.' }); return
      }
      dispatch(login({ name: data.name, email: form.email }))
      setLoading(false)
      navigate('/chat')
    } catch {
      setLoading(false)
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Try again.' })
    }
  }

  const handleReset = async () => {
    if (resetStep === 1) {
      if (!resetEmail) { Swal.fire({ icon: 'error', title: 'Error', text: 'Enter your email.' }); return }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-email/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      })
      const data = await res.json()
      if (!data.exists) { Swal.fire({ icon: 'error', title: 'Not found', text: 'No account with that email.' }); return }
      setResetStep(2)
    } else {
      if (newPass !== confirmPass) { Swal.fire({ icon: 'error', title: 'Error', text: 'Passwords do not match.' }); return }
      if (newPass.length < 6) { Swal.fire({ icon: 'error', title: 'Error', text: 'Password must be at least 6 characters.' }); return }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, new_password: newPass }),
      })
      const data = await res.json()
      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Password Reset!', text: 'You can now log in.' })
        setShowForgot(false); setResetStep(1); setResetEmail(''); setNewPass(''); setConfirmPass('')
      }
    }
  }

  const inputClass = "w-full bg-[#111711] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#16a34a] transition-colors"

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#16a34a] rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">🔐</div>
              <h2 className="text-2xl font-bold">Welcome back</h2>
              <p className="text-gray-400 mt-1">Sign in to continue your career journey</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                <input type="email" placeholder="you@email.com" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Password</label>
                <input type="password" placeholder="••••••••" value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})} className={inputClass} />
              </div>
              <button type="button" onClick={() => setShowForgot(true)}
                className="text-left text-[#4ade80] text-sm hover:text-[#16a34a] transition-colors">
                Forgot password?
              </button>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-[#16a34a] rounded-xl font-semibold hover:bg-[#15803d] transition-all disabled:opacity-50 mt-2">
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#4ade80] hover:text-[#16a34a] font-medium">Create one</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Reset Password</h3>
            <p className="text-gray-400 text-sm mb-6">{resetStep === 1 ? 'Enter your registered email.' : `New password for ${resetEmail}`}</p>
            {resetStep === 1
              ? <input type="email" placeholder="your@email.com" value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)} className={`${inputClass} mb-4`} />
              : <div className="flex flex-col gap-3 mb-4">
                  <input type="password" placeholder="New password" value={newPass}
                    onChange={e => setNewPass(e.target.value)} className={inputClass} />
                  <input type="password" placeholder="Confirm password" value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)} className={inputClass} />
                </div>
            }
            <div className="flex gap-3">
              <button onClick={handleReset} className="flex-1 py-3 bg-[#16a34a] rounded-xl font-semibold hover:bg-[#15803d] transition-all">
                {resetStep === 1 ? 'Next →' : 'Reset Password'}
              </button>
              <button onClick={() => { setShowForgot(false); setResetStep(1) }}
                className="flex-1 py-3 bg-[#0a0f0a] border border-[#1a2e1a] rounded-xl font-semibold hover:bg-[#1a2e1a] transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
