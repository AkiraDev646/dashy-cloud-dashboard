const trendItems = [
  {
    name: 'Weather history',
    source: 'Coming from weather API',
    detail: 'Track recent temperatures and conditions for the user selected city.',
  },
  {
    name: 'Focus streak',
    source: 'Coming from DynamoDB',
    detail: 'Show how many days the user has set or completed a daily focus item.',
  },
  {
    name: 'Quote archive',
    source: 'Coming from quote API',
    detail: 'Keep simple record of previous daily quotes, for reflection.',
  },
  {
    name: 'Dashboard activity',
    source: 'Coming from app events',
    detail: 'Summarize recent dashboard visits and preference updates.',
  },
];

export default function Analytics() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Daily trends</span>
        <h3>See patterns behind your daily routine.</h3>
        <p>
          Dashy will use this page to show simple history and trends 
          from your weather, quote, focus, and dashboard preference data.
        </p>
      </div>

      <div className="signal-table">
        {trendItems.map((item) => (
          <article className="signal-row" key={item.name}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.source}</span>
            </div>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
