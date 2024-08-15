import { useEffect, useState } from 'react';

// COMPONENTS
import SearchInput from './components/SearchInput';
import { EventsList, FavoriteEventsList } from './components/EventsList';
import Eras from './components/Eras';

export default function App() {
  const [theme, setTheme] = useState('');
  const [inputValue, setInputValue] = useState(theme);
  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const [era, setEra] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownKeyword, setIsUnknownKeyword] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

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

        // Clear keyword input after loading
        setInputValue('');
      } catch (error) {
        console.error('Fetching data failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (theme) fetchData();
  }, [theme]);

  return (
    <div className='container'>
      <header>
        <EarthIcon />
        <span className='search-container'>
          <SearchInput
            theme={theme}
            inputValue={inputValue}
            onInputValue={setInputValue}
            onSetTheme={setTheme}
            searchHistory={searchHistory}
            onSearchHistory={setSearchHistory}
          />
          <SearchHistoryIcon
            searchHistory={searchHistory}
            onInputValue={setInputValue}
          />
        </span>
        <FavoriteIcon
          favoriteEvents={favoriteEvents}
          showFavorites={showFavorites}
          onShowFavorites={setShowFavorites}
        />
      </header>

      <main>
        {(() => {
          if (isLoading) {
            return <p className='loading'>LOADING...</p>;
          }

          if (isUnknownKeyword) {
            return <p className='unknown-keyword'>Unknown keyword</p>;
          }

          if (showFavorites) {
            return (
              <FavoriteEventsList
                favoriteEvents={favoriteEvents}
                today={today}
                onFavoriteEvents={setFavoriteEvents}
              />
            );
          }

          return (
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
          );
        })()}
      </main>

      <footer>
        <span>Lucas Amsellem</span>
        <EarthIcon />
      </footer>
    </div>
  );
}

function EarthIcon() {
  return (
    <span className='app-logo-container'>
      <img src={`${process.env.PUBLIC_URL}/earth.svg`} alt='Earth Icon' />
      <h1>HISTORICAL EVENTS</h1>
    </span>
  );
}

function FavoriteIcon({ favoriteEvents, showFavorites, onShowFavorites }) {
  const hasFavorites = favoriteEvents.length > 0;

  return (
    <span
      className='favorite-icon-container'
      onClick={() => onShowFavorites(hasFavorites && !showFavorites)}
    >
      <button className={`favorite-icon ${hasFavorites ? 'pointer' : ''}`}>
        <ion-icon name={`bookmark${!showFavorites ? '-outline' : ''}`} />
      </button>

      {hasFavorites && (
        <span className='favorite-count'>{favoriteEvents.length}</span>
      )}
    </span>
  );
}

function SearchHistoryIcon({ searchHistory, onInputValue }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const hasHistory = searchHistory.length > 0;

  return (
    <span
      className='seach-history-container'
      onClick={() => setDropdownVisible(!isDropdownVisible)}
    >
      <button className={`search-icon ${hasHistory && 'full-opacity'}`}>
        <ion-icon name='time-outline' />
      </button>

      {hasHistory && isDropdownVisible && (
        <SearchHistoryList
          searchHistory={searchHistory}
          onInputValue={onInputValue}
        />
      )}
    </span>
  );
}

function SearchHistoryList({ searchHistory, onInputValue }) {
  const setHistoryKeywordInput = (e) => onInputValue(e.target.innerText);

  return (
    <ul className='search-history-list'>
      {searchHistory
        .map((keyword) => (
          <li>
            <strong onClick={setHistoryKeywordInput}>{keyword.keyword}</strong>{' '}
            <span>{keyword.time}</span>
          </li>
        ))
        .toReversed()}
    </ul>
  );
}
