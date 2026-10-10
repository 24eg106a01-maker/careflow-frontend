import FeaturePage from '../components/FeaturePage';

export default function MedicalHistory() {
  return (
    <FeaturePage
      title="Medical History"
      endpoint="/consultations"
      emptyText="No medical history records found."
      renderItem={(c) => (
        <div className="medical-history-item">
          <div className="card-top">
            <h3>Consultation #{c.id}</h3>
            <span className="status-badge">
              {c.status || 'Recorded'}
            </span>
          </div>

          <p>
            <strong>Date:</strong> {c.consultationDate || '-'}
          </p>
          <p>
            <strong>Symptoms:</strong> {c.symptoms || '-'}
          </p>
          <p>
            <strong>Diagnosis:</strong> {c.diagnosis || '-'}
          </p>
          <p>
            <strong>Notes:</strong> {c.notes || '-'}
          </p>
          <p>
            <strong>Follow-up:</strong> {c.followUpDate || '-'}
          </p>

          <div className="subsection">
            <h4>Lab reports</h4>

            {Array.isArray(c.labReports) && c.labReports.length > 0 ? (
              <ul>
                {c.labReports.map((report, index) => (
                  <li key={report.id ?? index}>
                    {report.name || report.testName || 'Lab report'}
                    {report.result ? ` — ${report.result}` : ''}
                    {report.reportUrl && (
                      <>
                        {' — '}
                        <a
                          href={report.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View report
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No lab reports available.</p>
            )}
          </div>
        </div>
      )}
    />
  );
}