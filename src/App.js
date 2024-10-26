import { useState } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/Footer';
import useFetchData from './hooks/useFetchData';
import { useLocalStorage } from './hooks/useLocalStorage';

// Todo : afficher keyword favoris

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownKeyword, setIsUnknownKeyword] = useState(false);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const trimmedInput = inputValue.trim();
  const hasFavorites = favoriteEvents.length > 0;

  useFetchData(
    keyword,
    setEvents,
    setIsLoading,
    setShowFavorites,
    setIsUnknownKeyword,
    trimmedInput,
    setSearchHistory,
  );

  useLocalStorage(setSearchHistory, setFavoriteEvents);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        inputValue={inputValue}
        trimmedInput={trimmedInput}
        onInputValue={setInputValue}
        onKeyword={setKeyword}
        searchHistory={searchHistory}
        onSearchHistory={setSearchHistory}
        onShowFavorites={setShowFavorites}
        hasFavorites={hasFavorites}
        favoriteEvents={favoriteEvents}
        showFavorites={showFavorites}
      />

      <Main
        keyword={keyword}
        events={events}
        favoriteEvents={favoriteEvents}
        isLoading={isLoading}
        isUnknownKeyword={isUnknownKeyword}
        showFavorites={showFavorites}
        onFavoriteEvents={setFavoriteEvents}
        hasFavorites={hasFavorites}
      />

      <Footer />
    </div>
  );
}
