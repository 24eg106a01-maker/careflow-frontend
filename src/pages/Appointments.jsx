import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

const initialForm = {
  doctorName: '',
  appointmentDate: '',
  appointmentTime: '',
  reason: '',
};

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await apiRequest('/appointments');
      setAppointments(
        Array.isArray(data) ? data : data?.content ?? data?.data ?? []
      );
    } catch (err) {
      setError(err.message || 'Unable to load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setForm(initialForm);
      setMessage('Appointment booked successfully.');
      await loadAppointments();
    } catch (err) {
      setError(err.message || 'Unable to book appointment.');
    } finally {
      setSaving(false);
    }
  }

  async function cancelAppointment(id) {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await apiRequest(`/appointments/${id}`, {
        method: 'DELETE',
      });

      setMessage('Appointment cancelled successfully.');
      await loadAppointments();
    } catch (err) {
      setError(err.message || 'Unable to cancel appointment.');
    }
  }

  return (
    <section className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CAREFLOW HEALTHCARE</p>
          <h1>Appointments</h1>
          <p className="page-description">
            Book appointments and manage your scheduled visits.
          </p>
        </div>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="content-layout">
        <section className="panel">
          <h2>Book an appointment</h2>

          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Doctor name
              <input
                name="doctorName"
                value={form.doctorName}
                onChange={handleChange}
                placeholder="Enter doctor name"
                required
              />
            </label>

            <label>
              Appointment date
              <input
                type="date"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                min={new Date().toLocaleDateString('en-CA')}
                required
              />
            </label>

            <label>
              Appointment time
              <input
                type="time"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Reason for visit
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Describe the reason for your visit"
                rows="3"
                required
              />
            </label>

            <button className="primary-button" disabled={saving}>
              {saving ? 'Booking...' : 'Book appointment'}
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Your appointments</h2>

          {loading ? (
            <p className="status-message">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="empty-inline">No appointments found.</p>
          ) : (
            <div className="record-grid">
              {appointments.map((appointment) => (
                <article className="record-card" key={appointment.id}>
                  <div className="card-top">
                    <h3>
                      {appointment.doctorName ||
                        appointment.doctor?.name ||
                        'Doctor'}
                    </h3>
                    <span className="status-badge">
                      {appointment.status || 'Scheduled'}
                    </span>
                  </div>

                  <p>
                    <strong>Date:</strong>{' '}
                    {appointment.appointmentDate || '-'}
                  </p>
                  <p>
                    <strong>Time:</strong>{' '}
                    {appointment.appointmentTime || '-'}
                  </p>
                  <p>
                    <strong>Reason:</strong> {appointment.reason || '-'}
                  </p>

                  {appointment.id != null &&
                    !['CANCELLED', 'COMPLETED'].includes(
                      String(appointment.status || '').toUpperCase()
                    ) && (
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => cancelAppointment(appointment.id)}
                      >
                        Cancel appointment
                      </button>
                    )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}