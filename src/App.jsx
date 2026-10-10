
import "./App.css";

const modules = [
  {
    title: "Appointments",
    description: "Book and manage hospital appointments.",
    icon: "📅",
    path: "/appointments",
  },
  {
    title: "Bills",
    description: "View hospital bills and payment status.",
    icon: "💳",
    path: "/bills",
  },
  {
    title: "Prescriptions",
    description: "View prescribed medicines and instructions.",
    icon: "💊",
    path: "/prescriptions",
  },
  {
    title: "Medical History",
    description: "Access medical records and history.",
    icon: "🏥",
    path: "/medical-history",
  },
];

export default function App() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>CareFlow</h1>
        <p>Hospital Operations and Patient Care Management</p>
      </header>

      <main className="main-content">
        <h2>Patient Dashboard</h2>
        <p className="subtitle">Manage your healthcare in one place.</p>

        <div className="module-grid">
          {modules.map((module) => (
            <a className="module-card" href={module.path} key={module.title}>
              <span className="module-icon">{module.icon}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <span className="view-link">View details →</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
