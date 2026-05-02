const signals = [
  {
    name: 'VPC traffic visibility',
    source: 'VPC Flow Logs',
    detail: 'Show accepted and rejected traffic patterns across subnets.',
  },
  {
    name: 'Threat detection',
    source: 'GuardDuty',
    detail: 'Surface findings and explain the recommended response path.',
  },
  {
    name: 'Application health',
    source: 'CloudWatch',
    detail: 'Track Lambda errors, latency, and API Gateway request volume.',
  },
  {
    name: 'Data access',
    source: 'DynamoDB',
    detail: 'Read dashboard records through least-privilege Lambda roles.',
  },
];

export default function Analytics() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Cloud signals</span>
        <h3>Analytics will connect dashboard views to AWS observability tools.</h3>
        <p>
          The goal is not only to show charts. Each signal should explain what
          service produced it, why it matters, and what an engineer would do next.
        </p>
      </div>

      <div className="signal-table">
        {signals.map((signal) => (
          <article className="signal-row" key={signal.name}>
            <div>
              <strong>{signal.name}</strong>
              <span>{signal.source}</span>
            </div>
            <p>{signal.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
