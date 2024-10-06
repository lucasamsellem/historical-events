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
  eventsYear,
  events,
  hasFavorites,
}) {
  const [era, setEra] = useState(null);
  const today = new Date().getFullYear();

  function formatEras(events) {
    return events
      .filter(({ year }) => {
        if (!era) return true;
        const [start, end] = era;
        return year >= start && year <= end;
      })
      .sort((a, b) => a.year - b.year);
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

        if (showFavorites && hasFavorites) {
          return (
            <>
              <Eras
                theme={theme}
                eventsYear={eventsYear}
                era={era}
                onSetEra={setEra}
                today={today}
              />
              <FavoriteEventsList
                favoriteEvents={favoriteEvents}
                onFavoriteEvents={setFavoriteEvents}
                today={today}
                theme={theme}
                sortedFilteredEras={formatEras(favoriteEvents)}
              />
            </>
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
              favoriteEvents={favoriteEvents}
              onFavoriteEvents={setFavoriteEvents}
              today={today}
              theme={theme}
              sortedFilteredEras={formatEras(events)}
            />
          </>
        );
      })()}
    </main>
  );
}

export default Main;
