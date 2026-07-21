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
    const [weatherLoadedAt, setWeatherLoadedAt] = useState(Date.now());
    const [clockTick, setClockTick] = useState(Date.now());
    const weatherLocalTimestamp = weather.localTime
      ? weather.localTime * 1000 + (clockTick - weatherLoadedAt)
      : null;

    const weatherLocalTime = weatherLocalTimestamp
      ? new Date(weatherLocalTimestamp).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'UTC',
        })
      : null;

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
  async function fetchWeather(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    return response.json();
  }

  async function updateWeather(url) {
    try {
      const data = await fetchWeather(url);

      setWeather({
      temperature: data.temperature,
      condition: data.condition,
      detail: data.detail,
      localTime: data.localTime,
      isDaytime: data.isDaytime,
    });
    setLocation(data.location);
    setWeatherLoadedAt(Date.now());
    setClockTick(Date.now());

    } catch (error) {
      console.error(error);
    }
  }

  let weatherInterval;

function startWeatherUpdates(url) {
  updateWeather(url);

  weatherInterval = setInterval(() => {
    updateWeather(url);
  }, 600000);
}

if (!navigator.geolocation) {
  startWeatherUpdates(weatherApiUrl);

  return () => clearInterval(weatherInterval);
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    const localizedWeatherUrl = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}`;

    startWeatherUpdates(localizedWeatherUrl);
  },
  () => {
    startWeatherUpdates(weatherApiUrl);
  }
);

return () => clearInterval(weatherInterval);
}, []);

useEffect(() => {
  const clockInterval = setInterval(() => {
    setClockTick(Date.now());
  }, 60000);

  return () => clearInterval(clockInterval);
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
        <section className={`weather-hero-card ${weather.isDaytime === false ? 'weather-night' : 'weather-day'}`}>
      <div>
        <p className="weather-location">{location}</p>
        <h4>{weather.temperature}</h4>
        <p className="weather-condition">{weather.condition}</p>
          {weatherLocalTime && <p className="weather-time">Local time: {weatherLocalTime}</p>}
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
