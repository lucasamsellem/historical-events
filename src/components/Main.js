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

  return (
    <main className="mx-auto max-w-7xl flex-1 px-6">
      {(() => {
        if (isLoading) {
          return (
            <p className="animate-bounce text-center font-semibold text-gray-900">
              LOADING...
            </p>
          );
        }

        if (isUnknownKeyword) {
          return (
            <p className="text-center font-semibold text-gray-900">
              Unknown keyword. Try searching for a historical event, country,
              landmark, influencial person, or other notable topic.
            </p>
          );
        }

        if (showFavorites && hasFavorites) {
          return (
            <FavoriteEventsList
              favoriteEvents={favoriteEvents}
              today={today}
              onFavoriteEvents={setFavoriteEvents}
              theme={theme}
            />
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
              events={events}
              era={era}
              isLoading={isLoading}
              today={today}
              favoriteEvents={favoriteEvents}
              onFavoriteEvents={setFavoriteEvents}
              theme={theme}
            />
          </>
        );
      })()}
    </main>
  );
}

export default Main;
