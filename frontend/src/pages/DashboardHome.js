const statusCards = [
  { label: 'Frontend hosting', value: 'S3 + CloudFront', state: 'Planned' },
  { label: 'Authentication', value: 'Amazon Cognito', state: 'Active' },
  { label: 'Network foundation', value: 'Custom VPC', state: 'Built' },
  { label: 'Private subnet', value: '10.0.2.0/24', state: 'Built' },
];

const buildSteps = [
  'React dashboard protected by Amplify Auth',
  'Terraform VPC with public and private subnets',
  'API Gateway and Lambda integration for live cloud data',
  'CloudWatch, GuardDuty, and Flow Logs security views',
];

export default function DashboardHome() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Project overview</span>
        <h3>Dashy turns AWS lab work into a job-ready cloud engineering story.</h3>
        <p>
          This dashboard is being built to show real infrastructure decisions:
          identity, network isolation, serverless APIs, observability, and
          security monitoring.
        </p>
      </div>

      <div className="metric-grid">
        {statusCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.state}</small>
          </article>
        ))}
      </div>

      <div className="split-layout">
        <section className="panel">
          <h4>Current architecture</h4>
          <div className="architecture-flow">
            <span>User</span>
            <span>Cognito</span>
            <span>React dashboard</span>
            <span>AWS APIs</span>
            <span>Cloud data</span>
          </div>
        </section>

        <section className="panel">
          <h4>Build roadmap</h4>
          <ul className="clean-list">
            {buildSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
