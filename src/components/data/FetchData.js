import { useEffect } from 'react';

function FetchData({
  theme,
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

    async function fetchData() {
      if (!theme) return;

      setIsLoading(true);
      setIsUnknownKeyword(false);
      setShowFavorites(false);

      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/historicalevents?text=${theme}`,
          options,
        );

        const unknownKeyword = Number(res.headers.get('content-length')) === 2;

        if (!unknownKeyword) {
          const data = await res.json();
          setEvents(data);

          const years = data.map((event) => event.year);
          setEventsYear(years);

          setSearchHistory((prev) => {
            const updatedHistory = [
              ...prev,
              { keyword: trimmedInput, time: now },
            ];

            localStorage.setItem(
              'searchHistory',
              JSON.stringify(updatedHistory),
            );

            return updatedHistory;
          });
        } else {
          setIsUnknownKeyword(true);
        }
      } catch (error) {
        console.error('Fetching data failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => abortController.abort();
  }, [theme]);
}

export default FetchData;
