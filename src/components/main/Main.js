import { useState } from 'react';
import { FavoriteEventsList } from './events/EventsList';
import { EventsList } from './events/EventsList';
import Eras from './eras/Eras';
import SortListOrderBtn from './events/SortListOrderBtn';
import AppDescriptionMsg from './home/AppDescriptionMsg';
import LoadingMsg from './home/LoadingMsg';
import UnknownKeywordMsg from './home/UnknownKeywordMsg';

function Main({
  keyword,
  isUnknownKeyword,
  isLoading,
  showFavorites,
  favoriteEvents,
  setFavoriteEvents,
  events,
  hasFavorites,
}) {
  const [eraRange, setEraRange] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [activeEra, setActiveEra] = useState(null);
  const yearToday = new Date().getFullYear();

  const sortedList = (events) =>
    events
      .filter(
        ({ year }) => !eraRange || (year >= eraRange[0] && year <= eraRange[1]),
      )
      .sort((a, b) => (ascendingOrder ? a.year - b.year : b.year - a.year));

  const sortedEvents = sortedList(events);
  const sortedFavorites = sortedList(favoriteEvents);
  const eventsNb = 3; // Minimal number of events to render SortListOrderBtn

  return (
    <main className="mx-auto max-w-7xl flex-1 px-6">
      {(() => {
        if (!keyword && !showFavorites) return <AppDescriptionMsg />;
        if (isLoading) return <LoadingMsg />;
        if (isUnknownKeyword) return <UnknownKeywordMsg />;

        return (
          <>
            <Eras
              yearToday={yearToday}
              events={events}
              onSetEraRange={setEraRange}
              showFavorites={showFavorites}
              favoriteEvents={favoriteEvents}
              ascendingOrder={ascendingOrder}
              onAscendingOrder={setAscendingOrder}
              activeEra={activeEra}
              onActiveEra={setActiveEra}
            />

            {sortedEvents.length >= eventsNb &&
              sortedFavorites.length >= eventsNb && (
                <SortListOrderBtn
                  ascendingOrder={ascendingOrder}
                  onAscendingOrder={setAscendingOrder}
                />
              )}

            {showFavorites && hasFavorites ? (
              <FavoriteEventsList
                keyword={keyword}
                yearToday={yearToday}
                favoriteEvents={favoriteEvents}
                onFavoriteEvents={setFavoriteEvents}
                sortedList={sortedFavorites}
              />
            ) : (
              <EventsList
                keyword={keyword}
                yearToday={yearToday}
                favoriteEvents={favoriteEvents}
                onFavoriteEvents={setFavoriteEvents}
                sortedList={sortedEvents}
              />
            )}
          </>
        );
      })()}
    </main>
  );
}

export default Main;
