import { useEffect } from 'react';

const saveToLocalStorage = (item, data) =>
  localStorage.setItem(item, JSON.stringify(data));

const getFromLocalStorage = (item) => JSON.parse(localStorage.getItem(item));

function useLocalStorage(setSearchHistory, setFavoriteEvents) {
  useEffect(() => {
    const searchHistory = getFromLocalStorage('searchHistory');
    const favoriteEvents = getFromLocalStorage('favoriteEvents');

    if (searchHistory) setSearchHistory(searchHistory);
    if (favoriteEvents) setFavoriteEvents(favoriteEvents);
  }, [setSearchHistory, setFavoriteEvents]);
}

export { useLocalStorage, saveToLocalStorage };
