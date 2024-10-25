import { useEffect } from 'react';
import setLocalStorage from '../../helper/setLocalStorage';

function FetchData({
  keyword,
  setEvents,
  setIsLoading,
  setShowFavorites,
  setIsUnknownKeyword,
  trimmedInput,
  setEventsYear,
  setSearchHistory,
}) {
  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const abortController = new AbortController();

    const options = {
      method: 'GET',
      headers: {
        'x-api-key': 'kRnIzNo36l8B9S5rhLJv3A==ad72TC2KBwAXrszH',
      },
      signal: abortController.signal,
    };

    (async () => {
      if (!keyword) return;

      setIsLoading(true);
      setIsUnknownKeyword(false);
      setShowFavorites(false);

      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/historicalevents?text=${keyword}`,
          options,
        );
        const unknownKeyword = Number(res.headers.get('content-length')) === 2;

        if (unknownKeyword) return setIsUnknownKeyword(true);

        const data = await res.json();
        const years = data.map((event) => event.year);
        setEvents(data);
        setEventsYear(years);
        setSearchHistory((prev) => {
          const updatedHistory = [
            ...prev,
            { keyword: trimmedInput, time: now },
          ];

          setLocalStorage('searchHistory', updatedHistory);

          return updatedHistory;
        });
      } catch (error) {
        console.error('Fetching data failed:', error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [keyword]);
}

export default FetchData;
