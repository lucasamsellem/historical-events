import { useEffect, useState } from 'react';

// COMPONENTS
import { SearchInput, SearchHistoryIcon } from './components/SearchInput';
import { EventsList, FavoriteEventsList } from './components/EventsList';
import Eras from './components/Eras';
import EarthIcon from './components/EarthIcon';
import FavoriteIcon from './components/FavoriteIcon';

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
  const hasFavorites = favoriteEvents.length > 0;
  const trimmedInput = inputValue.trim();
  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const abortController = new AbortController();

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
          signal: abortController.signal,
        };

        const res = await fetch(
          `https://api.api-ninjas.com/v1/historicalevents?text=${theme}`,
          options,
        );

        // Display error msg when unknown keyword
        const unknownKeyword = Number(res.headers.get('content-length')) === 2;

        if (!unknownKeyword) {
          const data = await res.json();
          setEvents(data);

          const years = data.map((event) => event.year);
          setEventsYear(years);

          // Push valid keyword to search history list
          setSearchHistory((prev) => {
            const updatedHistory = [
              ...prev,
              { keyword: trimmedInput, time: now },
            ];

            // Save search history to localStorage
            localStorage.setItem(
              'searchHistory',
              JSON.stringify(updatedHistory),
            );

            return updatedHistory;
          });

          // Clear keyword input after loading
          setInputValue('');
        } else {
          setIsUnknownKeyword(true);
        }
      } catch (error) {
        console.error('Fetching data failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (theme) fetchData();

    return () => abortController.abort();
  }, [theme]);

  // Load search history from localStorage when the app loads
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const storedFavorites = localStorage.getItem('favoriteEvents');

    if (storedHistory) setSearchHistory(JSON.parse(storedHistory));
    if (storedFavorites) setFavoriteEvents(JSON.parse(storedFavorites));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mb-16 flex flex-col items-center justify-between gap-8 bg-indigo-500 py-4 sm:px-20 md:mb-20 md:flex-row md:px-8 lg:mb-20">
        <span className="flex items-center justify-center gap-4">
          <EarthIcon />
          <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl">
            HISTORICAL EVENTS
          </h1>
        </span>
        <span className="relative flex items-center gap-2">
          <>
            <SearchInput
              theme={theme}
              inputValue={inputValue}
              onInputValue={setInputValue}
              onSetTheme={setTheme}
              searchHistory={searchHistory}
              onSearchHistory={setSearchHistory}
              trimmedInput={trimmedInput}
            />
            <SearchHistoryIcon
              searchHistory={searchHistory}
              onInputValue={setInputValue}
              onSetTheme={setTheme}
            />
          </>
          <FavoriteIcon
            favoriteEvents={favoriteEvents}
            showFavorites={showFavorites}
            onShowFavorites={setShowFavorites}
            hasFavorites={hasFavorites}
          />
        </span>
      </header>

      <main className="mx-auto max-w-7xl flex-1 px-6">
        {(() => {
          if (isLoading) {
            return (
              <p className="text-center font-semibold text-gray-900">
                LOADING...
              </p>
            );
          }

          if (isUnknownKeyword) {
            return (
              <p className="text-center font-semibold text-gray-900">
                Unknown keyword. Try searching for a historical event, country,
                landmark, influencial person, or other notable topic.
              </p>
            );
          }

          if (showFavorites && hasFavorites) {
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

      <footer className="flex justify-center bg-indigo-500 py-2 text-center">
        <EarthIcon />
      </footer>
    </div>
  );
}
