import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', age: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.age || !form.email || !form.password) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'All fields are required!' }); return
    }
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) {
        setLoading(false)
        Swal.fire({ icon: 'error', title: 'Error', text: 'An account with this email already exists.' }); return
      }
      dispatch(login({ name: form.name, email: form.email }))
      Swal.fire({ icon: 'success', title: 'Welcome to CareerSense!', showConfirmButton: false, timer: 1500 })
      setLoading(false)
      navigate('/chat')
    } catch {
      setLoading(false)
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong.' })
    }
  }

  const inputClass = "w-full bg-[#111711] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#16a34a] transition-colors"

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-[#111711] border border-[#1a2e1a] rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#16a34a] rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">🚀</div>
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <p className="text-gray-400 mt-1">Start your career discovery journey</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { key: 'age', label: 'Age', type: 'number', placeholder: '22' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
                { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm text-gray-400 mb-1 block">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})} className={inputClass} />
                </div>
              ))}
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-[#16a34a] rounded-xl font-semibold hover:bg-[#15803d] transition-all disabled:opacity-50 mt-2">
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#4ade80] hover:text-[#16a34a] font-medium">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
