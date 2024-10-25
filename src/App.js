import { useState } from 'react';

// Todo : afficher keyword favoris, era button active when only one choice

// COMPONENTS
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/Footer';
import FetchData from './components/data/FetchData';
import LocalStorage from './components/data/LocalStorage';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState(keyword);
  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownKeyword, setIsUnknownKeyword] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const trimmedInput = inputValue.trim();
  const hasFavorites = favoriteEvents.length > 0;

  FetchData({
    keyword,
    setEvents,
    setIsLoading,
    setShowFavorites,
    setIsUnknownKeyword,
    trimmedInput,
    setInputValue,
    setEventsYear,
    setSearchHistory,
  });

  LocalStorage({
    setSearchHistory,
    setFavoriteEvents,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        inputValue={inputValue}
        trimmedInput={trimmedInput}
        keyword={keyword}
        setInputValue={setInputValue}
        setKeyword={setKeyword}
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        setShowFavorites={setShowFavorites}
        hasFavorites={hasFavorites}
        favoriteEvents={favoriteEvents}
        showFavorites={showFavorites}
        setIsUnknownKeyword={setIsUnknownKeyword}
      />

      <Main
        isLoading={isLoading}
        isUnknownKeyword={isUnknownKeyword}
        showFavorites={showFavorites}
        favoriteEvents={favoriteEvents}
        keyword={keyword}
        setFavoriteEvents={setFavoriteEvents}
        eventsYear={eventsYear}
        events={events}
        hasFavorites={hasFavorites}
      />

      <Footer />
    </div>
  );
}
