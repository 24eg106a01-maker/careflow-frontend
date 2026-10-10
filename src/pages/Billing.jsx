import FeaturePage from '../components/FeaturePage';

function formatAmount(amount, currency = 'INR') {
  if (amount == null || amount === '') return '-';

  const value = Number(amount);
  if (!Number.isFinite(value)) return String(amount);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Billing() {
  return (
    <FeaturePage
      title="Billing"
      endpoint="/billing"
      emptyText="No billing records found."
      renderItem={(bill) => {
        const status = String(
          bill.paymentStatus || bill.status || 'Pending'
        ).toUpperCase();

        return (
          <div>
            <div className="card-top">
              <h3>Bill #{bill.id}</h3>
              <span
                className={`status-badge ${
                  status === 'PAID'
                    ? 'status-paid'
                    : status === 'OVERDUE'
                    ? 'status-overdue'
                    : ''
                }`}
              >
                {status}
              </span>
            </div>

            <p>
              <strong>Patient:</strong>{' '}
              {bill.patientName || bill.patient?.name || '-'}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {bill.description || bill.billDescription || '-'}
            </p>
            <p>
              <strong>Bill date:</strong>{' '}
              {bill.billDate || bill.createdAt || '-'}
            </p>
            <p>
              <strong>Due date:</strong> {bill.dueDate || '-'}
            </p>

            <div className="amount-panel">
              <span>Total amount</span>
              <strong>
                {formatAmount(
                  bill.amount ?? bill.totalAmount,
                  bill.currency || 'INR'
                )}
              </strong>
            </div>

            <p>
              <strong>Payment date:</strong>{' '}
              {bill.paymentDate || '-'}
            </p>
          </div>
        );
      }}
    />
  );
}