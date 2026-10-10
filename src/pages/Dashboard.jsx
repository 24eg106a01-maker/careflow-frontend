import { useNavigate } from 'react-router-dom'

const cards = [
  ['Appointments', 'Manage your appointments', '/appointments'],
  ['Medical History', 'View healthcare records', '/medical-history'],
  ['Prescriptions', 'View prescriptions', '/prescriptions'],
  ['Billing', 'View billing details', '/billing']
]

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('careflow_user') || '{}')
  const navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return <div className="app">
    <header><strong>CareFlow</strong><button onClick={logout}>Logout</button></header>
    <section className="content">
      <h1>Welcome, {user.name || 'Patient'}</h1>
      <p>Role: {user.role || 'PATIENT'}</p>
      <div className="grid">
        {cards.map(([title, description, path]) => (
          <button className="stat" key={path} type="button" onClick={() => navigate(path)}>
            <b>{title}</b><span>{description}</span>
          </button>
        ))}
      </div>
    </section>
  </div>
}
