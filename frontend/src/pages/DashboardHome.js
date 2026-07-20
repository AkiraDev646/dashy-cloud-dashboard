import { useEffect, useState } from 'react';

const quoteApiUrl = 'https://9g9u8vvljk.execute-api.us-east-1.amazonaws.com/quote';
const weatherApiUrl = 'https://9g9u8vvljk.execute-api.us-east-1.amazonaws.com/weather';

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

  export default function DashboardHome() {
    const [quote, setQuote] = useState(todaySummary.quote);
    const [quoteStatus, setQuoteStatus] = useState('Loading quote from AWS...');
    const [weather, setWeather] = useState(todaySummary.weather);
    const [location, setLocation] = useState(todaySummary.location);

useEffect(() => {
    async function loadQuote() {
      try {
        const response = await fetch(quoteApiUrl);

        if (!response.ok) {
          throw new Error('Quote API request failed');
        }

        const data = await response.json();

        setQuote({
          text: data.quote,
          author: data.author,
        });
        setQuoteStatus('Live from AWS Lambda');
      } catch (error) {
        setQuoteStatus('Using fallback quote');
      }
    }

    loadQuote();
  }, []);

  useEffect(() => {
  async function loadWeather() {
    try {
      const response = await fetch(weatherApiUrl);

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();

      setWeather({
        temperature: data.temperature,
        condition: data.condition,
        detail: data.detail,
      });
      setLocation(data.location);
    } catch (error) {
      console.error(error);
    }
  }

  loadWeather();
}, []);

      const widgets = [
    {
      label: 'Weather',
      value: weather.temperature,
      detail: weather.condition,
    },

    {
      label: 'Quote',
      value: 'Daily inspiration',
      detail: quote.author,
    },
    {
      label: 'Focus',
      value: todaySummary.focus.title,
      detail: 'Personal goal',
    },
  ];

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
        <section className="weather-hero-card">
  <div>
      <p className="weather-location">{location}</p>
      <h4>{weather.temperature}</h4>
      <p className="weather-condition">{weather.condition}</p>
      <p className="weather-detail">{weather.detail}</p>
    </div>

  <div className="weather-art" aria-hidden="true">
    <div className="weather-sun"></div>
    <div className="weather-cloud weather-cloud-one"></div>
    <div className="weather-cloud weather-cloud-two"></div>
  </div>
        </section>


        <section className="panel quote-panel">
          <div className="panel-header-row">
          <h4>Daily Quote</h4>
          </div>


  <p className="quote-text">"{quote.text}"</p>
  <p className="quote-author">{quote.author}</p>
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
