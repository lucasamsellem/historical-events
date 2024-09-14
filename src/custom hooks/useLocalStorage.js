import { useEffect } from 'react';

function useLocalStorage({ setSearchHistory, setFavoriteEvents }) {
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const storedFavorites = localStorage.getItem('favoriteEvents');

    if (storedHistory) setSearchHistory(JSON.parse(storedHistory));
    if (storedFavorites) setFavoriteEvents(JSON.parse(storedFavorites));
  }, []);
}

export default useLocalStorage;
