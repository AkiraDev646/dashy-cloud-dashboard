const preferences = [
  {
    label: 'Weather location',
    value: 'New York, NY',
    detail: 'This will control which city the weather widget displays.',
  },
  {
    label: 'Temperature unit',
    value: 'Fahrenheit',
    detail: 'Users will be able to choose Fahrenheit or Celsius.',
  },
  {
    label: 'Quote category',
    value: 'Motivation',
    detail: 'Daily quotes can later be filtered by category or theme.',
  },
  {
    label: 'Daily focus',
    value: 'Enabled',
    detail: 'This will let users set or update their daily focus item.',
  },
];

export default function Settings() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">Preferences</span>
        <h3>Customize what Dashy shows each day.</h3>
        <p>
          This page will eventually save user preferences such as weather
          location, quote style, and daily focus settings.
        </p>
      </div>

      <div className="control-grid">
        {preferences.map((preference) => (
          <article className="panel" key={preference.label}>
            <h4>{preference.label}</h4>
            <p>{preference.value}</p>
            <p>{preference.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

