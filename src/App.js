import { useState } from 'react';

// COMPONENTS
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import useFetchData from './custom hooks/useFetchData';
import useLocalStorage from './custom hooks/useLocalStorage';

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

  const hasFavorites = favoriteEvents.length > 0;
  const trimmedInput = inputValue.trim();
  const today = new Date().getFullYear();
  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  useFetchData({
    theme,
    setEvents,
    setIsLoading,
    setShowFavorites,
    setIsUnknownKeyword,
    trimmedInput,
    now,
    setInputValue,
    setEventsYear,
    setSearchHistory,
  });

  useLocalStorage({
    setSearchHistory,
    setFavoriteEvents,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        theme={theme}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setTheme={setTheme}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        setShowFavorites={setShowFavorites}
        trimmedInput={inputValue}
      />

      <Main
        isLoading={isLoading}
        isUnknownKeyword={isUnknownKeyword}
        showFavorites={showFavorites}
        hasFavorites={hasFavorites}
        favoriteEvents={favoriteEvents}
        today={today}
        theme={theme}
        setFavoriteEvents={setFavoriteEvents}
        eventsYear={eventsYear}
        era={era}
        setEra={setEra}
        events={events}
      />

      <Footer />
    </div>
  );
}
