
export default function FeaturePage({
  title = "Hospital Management",
  description = "Manage hospital operations efficiently.",
}) {
  return (
    <div className="feature-page">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
