const controls = [
  { label: 'IAM least privilege', status: 'Designing scoped roles' },
  { label: 'Secrets management', status: 'Use Secrets Manager for API config' },
  { label: 'Encryption', status: 'Plan KMS keys for sensitive data' },
  { label: 'Deployment safety', status: 'Add GitHub Actions checks' },
];

export default function Settings() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Security plan</span>
        <h3>Dashy should prove that the app was designed with cloud security in mind.</h3>
        <p>
          This page tracks the security controls that will be implemented as the
          project grows from a working prototype into a portfolio deployment.
        </p>
      </div>

      <div className="control-grid">
        {controls.map((control) => (
          <article className="panel" key={control.label}>
            <h4>{control.label}</h4>
            <p>{control.status}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
