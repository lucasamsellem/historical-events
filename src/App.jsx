import { useState } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import EarthIcon from './components/icons/EarthIcon';
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
  const [isFavoritesSection, setIsFavoritesSection] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const trimmedInput = inputValue.trim();
  const hasFavorites = favoriteEvents.length > 0;

  useFetchData(
    keyword,
    setEvents,
    setIsLoading,
    setIsFavoritesSection,
    setIsUnknownKeyword,
    trimmedInput,
    setSearchHistory
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
        onIsFavoritesSection={setIsFavoritesSection}
        hasFavorites={hasFavorites}
        favoriteEvents={favoriteEvents}
        isFavoritesSection={isFavoritesSection}
      />

      <Main
        keyword={keyword}
        events={events}
        favoriteEvents={favoriteEvents}
        isLoading={isLoading}
        isUnknownKeyword={isUnknownKeyword}
        isFavoritesSection={isFavoritesSection}
        onFavoriteEvents={setFavoriteEvents}
        hasFavorites={hasFavorites}
      />

      <footer className="flex justify-center bg-indigo-500 py-2 text-center">
        <EarthIcon />
      </footer>
    </div>
  );
}
