import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const navigate=useNavigate()

  async function submit(e) {
    e.preventDefault(); setError('')
    try {
      const {data}=await api.post('/auth/login',{email,password})
      localStorage.setItem('careflow_token',data.token)
      localStorage.setItem('careflow_user',JSON.stringify(data))
      navigate('/dashboard')
    } catch (err) { setError(err.response?.data?.message || 'Login failed') }
  }

  return <main className="auth">
    <form className="card" onSubmit={submit}>
      <h1>CareFlow</h1><p>Hospital Operations & Patient Care</p>
      {error && <div className="error">{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button>Login</button>
      <span>New patient? <Link to="/register">Register</Link></span>
    </form>
  </main>
}
