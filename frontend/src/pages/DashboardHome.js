const todaySummary = {
  greeting: 'Good morning',
  location: 'New York, NY',
  weather: {
    temperature: '72°F',
    condition: 'Partly cloudy',
    detail: 'Light breeze with clear skies later today.',
  },
  quote: {
    text: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'Robert Collier',
  },
  focus: {
    title: 'Build one cloud skill today',
    detail: 'Spend 30 minutes improving Dashy or reviewing an AWS service.',
  },
};

const widgets = [
  {
    label: 'Weather',
    value: todaySummary.weather.temperature,
    detail: todaySummary.weather.condition,
  },
  {
    label: 'Quote',
    value: 'Daily inspiration',
    detail: todaySummary.quote.author,
  },
  {
    label: 'Focus',
    value: todaySummary.focus.title,
    detail: 'Personal goal',
  },
];

export default function DashboardHome() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Today</span>
        <h3>{todaySummary.greeting}, welcome to Dashy.</h3>
        <p>
          Your daily dashboard brings weather, inspiration, and focus into one
          simple view powered by AWS.
        </p>
      </div>

      <div className="metric-grid">
        {widgets.map((widget) => (
          <article className="metric-card" key={widget.label}>
            <span>{widget.label}</span>
            <strong>{widget.value}</strong>
            <small>{widget.detail}</small>
          </article>
        ))}
      </div>

      <div className="split-layout">
        <section className="panel">
          <h4>{todaySummary.location}</h4>
          <p>
            {todaySummary.weather.temperature} and{' '}
            {todaySummary.weather.condition.toLowerCase()}.{' '}
            {todaySummary.weather.detail}
          </p>
        </section>

        <section className="panel">
          <h4>Daily Quote</h4>
          <p>"{todaySummary.quote.text}"</p>
          <p>{todaySummary.quote.author}</p>
        </section>
      </div>

      <section className="panel">
        <h4>Daily Focus</h4>
        <p>{todaySummary.focus.title}</p>
        <p>{todaySummary.focus.detail}</p>
      </section>
    </div>
  );
}
