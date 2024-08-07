import { useEffect, useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState('');
  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const [era, setEra] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownKeyword, setIsUnknownKeyword] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  const nonEmptyFavoriteArr = favoriteEvents.length !== 0;
  const today = new Date().getFullYear();

  useEffect(() => {
    async function fetchData() {
      setShowFavorites(false);
      setIsLoading(true);
      setIsUnknownKeyword(false);

      try {
        const options = {
          method: 'GET',
          headers: {
            'x-api-key': 'kRnIzNo36l8B9S5rhLJv3A==ad72TC2KBwAXrszH',
          },
        };

        const res = await fetch(
          `https://api.api-ninjas.com/v1/historicalevents?text=${theme}`,
          options
        );

        // Display error msg when no theme fetched
        const contentLength = +res.headers.get('content-length');
        contentLength === 2 && setIsUnknownKeyword(true);

        const data = await res.json();
        setEvents(data);

        const years = data.map((event) => event.year);
        setEventsYear(years);
      } catch (error) {
        console.error('Fetching data failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (theme) fetchData();
  }, [theme]);

  const handleFavorites = () =>
    setShowFavorites(nonEmptyFavoriteArr && !showFavorites);

  return (
    <div className='container'>
      <header>
        <EarthIcon />

        <ThemeInput theme={theme} onSetTheme={setTheme} />

        <span className='icon favorites-icon' onClick={handleFavorites}>
          <img src='favorite.svg' alt='Favorite Icon' />
          {nonEmptyFavoriteArr && <span>{favoriteEvents.length}</span>}
        </span>
      </header>

      <main>
        {isLoading ? (
          <LoadingMsg />
        ) : isUnknownKeyword ? (
          <UnknownKeywordMsg />
        ) : showFavorites ? (
          <FavoriteEventsList
            favoriteEvents={favoriteEvents}
            today={today}
            onFavoriteEvents={setFavoriteEvents}
          />
        ) : (
          <>
            <Eras
              theme={theme}
              eventsYear={eventsYear}
              era={era}
              onSetEra={setEra}
              today={today}
            />
            <EventsList
              events={events}
              era={era}
              isLoading={isLoading}
              today={today}
              favoriteEvents={favoriteEvents}
              onFavoriteEvents={setFavoriteEvents}
            />
          </>
        )}
      </main>

      <footer>
        <strong>Lucas Amsellem</strong>
        <EarthIcon />
      </footer>
    </div>
  );
}

function EarthIcon() {
  return (
    <span className='app-logo-container'>
      <img src='earth.svg' alt='Earth Icon' />
      <h1>HISTORICAL EVENTS</h1>
    </span>
  );
}

function LoadingMsg() {
  return <p className='loading'>LOADING...</p>;
}

function UnknownKeywordMsg() {
  return <p className='unknown-keyword'>Unknown keyword</p>;
}

function ThemeInput({ theme, onSetTheme }) {
  const [inputValue, setInputValue] = useState(theme);

  const handleButtonClick = (e) => {
    e.preventDefault();
    onSetTheme(inputValue);
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Enter a keyword'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleButtonClick}>
        <img
          className='icon glass'
          src='magnifying-glass.svg'
          alt='Magnifying glass search icon'
        />
      </button>
    </form>
  );
}

function Eras({ theme, onSetEra, eventsYear, today }) {
  const [activeEra, setActiveEra] = useState(null);

  const handleEraClick = (start, end, era) => {
    if (activeEra === era) {
      onSetEra(null);
      setActiveEra(null);
    } else {
      onSetEra([start, end]);
      setActiveEra(era);
    }
  };

  const before1600 = eventsYear.some((year) => year < 1600);
  const between1600And1900 = eventsYear.some(
    (year) => year >= 1600 && year <= 1900
  );
  const after1900 = eventsYear.some((year) => year > 1900);

  if (!theme) return null;

  return (
    <div className='eras'>
      {before1600 && (
        <button
          className={activeEra === 'before1600' ? 'active' : ''}
          onClick={() => handleEraClick(0, 1600, 'before1600')}
        >
          0 - 1600
        </button>
      )}
      {between1600And1900 && (
        <button
          className={activeEra === 'between1600And1900' ? 'active' : ''}
          onClick={() => handleEraClick(1600, 1900, 'between1600And1900')}
        >
          1600 - 1900
        </button>
      )}
      {after1900 && (
        <button
          className={activeEra === 'after1900' ? 'active' : ''}
          onClick={() => handleEraClick(1900, today, 'after1900')}
        >
          1900 - today
        </button>
      )}
    </div>
  );
}

function EventsList({ events, era, today, favoriteEvents, onFavoriteEvents }) {
  const sortedFilteredEras = events
    .filter((event) => {
      if (!era) return true;
      const [start, end] = era;
      return event.year >= start && event.year <= end;
    })
    .sort((a, b) => a.year - b.year);

  return (
    <ul className='events-list'>
      {sortedFilteredEras.map((event) => (
        <Event
          key={event.event}
          event={event.event}
          day={event.day}
          month={event.month}
          year={event.year}
          today={today}
          favoriteEvents={favoriteEvents}
          onFavoriteEvents={onFavoriteEvents}
        />
      ))}
    </ul>
  );
}

function FavoriteEventsList({ favoriteEvents, today, onFavoriteEvents }) {
  return (
    <ul className='events-list'>
      {favoriteEvents.map((event, index) => (
        <Event
          key={index}
          event={event.event}
          day={event.day}
          month={event.month}
          year={event.year}
          today={today}
          favoriteEvents={favoriteEvents}
          onFavoriteEvents={onFavoriteEvents}
        />
      ))}
    </ul>
  );
}

function Event({
  event,
  day,
  month,
  year,
  today,
  favoriteEvents,
  onFavoriteEvents,
}) {
  const [isFavorite, setIsFavorite] = useState(
    favoriteEvents.some((fav) => fav.event === event)
  );

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteEvents((prev) => {
      if (prev.some((fav) => fav.event === event)) {
        return prev.filter((fav) => fav.event !== event);
      } else {
        return [...prev, { event, day, month, year }];
      }
    });
  };

  return (
    <li className='event'>
      <div className='event-header'>
        <h3 className='date'>
          {day}/{month}/{year}
        </h3>
        <button className='icon star' onClick={handleFavorite}>
          <svg
            height='3rem'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={isFavorite ? 'favorite' : ''}
          >
            <path
              d='M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z'
              stroke='#ffd43b'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>
      <p>{event}</p>
      <h5>{today - year} years ago</h5>
    </li>
  );
}
