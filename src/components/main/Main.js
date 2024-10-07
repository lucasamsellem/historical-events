import { useState } from 'react';
import { FavoriteEventsList } from './EventsList';
import { EventsList } from './EventsList';
import Eras from './Eras';

function Main({
  isLoading,
  isUnknownKeyword,
  showFavorites,
  favoriteEvents,
  theme,
  setFavoriteEvents,
  events,
  hasFavorites,
}) {
  const [eraRange, setEraRange] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const today = new Date().getFullYear();

  function sortList(events) {
    return events
      .filter(({ year }) => {
        if (!eraRange) return true; // No era selected, return all events
        const [start, end] = eraRange;
        return year >= start && year <= end; // Filter by eraRange range
      })
      .sort((a, b) => (ascendingOrder ? a.year - b.year : b.year - a.year));
  }

  return (
    <main className="mx-auto max-w-7xl flex-1 px-6">
      {(() => {
        if (!theme && !showFavorites) {
          return (
            <p className="px-10 text-center font-medium">
              Enter a country, landmark, influential figure, or notable topic in
              the search bar to discover related historical events.
            </p>
          );
        }

        if (isLoading) {
          return (
            <p className="animate-bounce text-center font-semibold text-gray-900">
              LOADING...
            </p>
          );
        }

        if (isUnknownKeyword) {
          return (
            <div className="text-center">
              <p className="mb-5 font-semibold text-gray-900">
                Unknown keyword...{' '}
              </p>
              <p className="italic opacity-50">
                Examples: 'world war', 'france', 'shakespeare'
              </p>
            </div>
          );
        }

        return (
          <>
            <Eras
              today={today}
              events={events}
              onSetEraRange={setEraRange}
              showFavorites={showFavorites}
              favoriteEvents={favoriteEvents}
              ascendingOrder={ascendingOrder}
              onAscendingOrder={setAscendingOrder}
            />

            {showFavorites && hasFavorites ? (
              <FavoriteEventsList
                theme={theme}
                today={today}
                favoriteEvents={favoriteEvents}
                onFavoriteEvents={setFavoriteEvents}
                sortedList={sortList(favoriteEvents)}
              />
            ) : (
              <EventsList
                theme={theme}
                today={today}
                favoriteEvents={favoriteEvents}
                onFavoriteEvents={setFavoriteEvents}
                sortedList={sortList(events)}
              />
            )}
          </>
        );
      })()}
    </main>
  );
}

export default Main;
