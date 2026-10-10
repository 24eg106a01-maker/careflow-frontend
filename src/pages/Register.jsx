import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Register() {
  const [form,setForm]=useState({name:'',email:'',password:'',phone:''})
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const change=e=>setForm({...form,[e.target.name]:e.target.value})
  async function submit(e){
    e.preventDefault(); setError('')
    try { await api.post('/auth/register',form); navigate('/login') }
    catch(err){ setError(err.response?.data?.message || 'Registration failed') }
  }
  return <main className="auth">
    <form className="card" onSubmit={submit}>
      <h1>Patient Registration</h1>
      {error && <div className="error">{error}</div>}
      <input name="name" placeholder="Full name" onChange={change} required />
      <input name="email" type="email" placeholder="Email" onChange={change} required />
      <input name="password" type="password" placeholder="Password" onChange={change} required />
      <input name="phone" placeholder="Phone" onChange={change} />
      <button>Create Account</button>
      <span>Already registered? <Link to="/login">Login</Link></span>
    </form>
  </main>
}
