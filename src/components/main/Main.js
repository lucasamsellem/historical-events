import { useState } from 'react';
import { EventsList } from './events/EventsList';
import Eras from './eras/Eras';
import AppDescriptionMsg from './home/AppDescriptionMsg';
import LoadingMsg from './home/LoadingMsg';
import UnknownKeywordMsg from './home/UnknownKeywordMsg';

function Main({
  keyword,
  events,
  favoriteEvents,
  isLoading,
  isUnknownKeyword,
  showFavorites,
  onFavoriteEvents,
  hasFavorites,
}) {
  const [eraRange, setEraRange] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const yearToday = new Date().getFullYear();

  const sortList = (events) =>
    events
      .filter(
        ({ year }) => !eraRange || (year >= eraRange[0] && year <= eraRange[1]),
      )
      .sort((a, b) => (ascendingOrder ? a.year - b.year : b.year - a.year));

  const isFavoritesList =
    showFavorites && hasFavorites ? sortList(favoriteEvents) : sortList(events);

  return (
    <main className="mx-auto max-w-7xl flex-1 px-6">
      {(() => {
        if (!keyword && !showFavorites) return <AppDescriptionMsg />;
        if (isLoading) return <LoadingMsg />;
        if (isUnknownKeyword && !showFavorites) return <UnknownKeywordMsg />;

        return (
          <>
            <Eras
              yearToday={yearToday}
              events={events}
              onSetEraRange={setEraRange}
              showFavorites={showFavorites}
              favoriteEvents={favoriteEvents}
            />

            <EventsList
              keyword={keyword}
              yearToday={yearToday}
              favoriteEvents={favoriteEvents}
              onFavoriteEvents={onFavoriteEvents}
              sortedList={isFavoritesList}
              ascendingOrder={ascendingOrder}
              onAscendingOrder={setAscendingOrder}
            />
          </>
        );
      })()}
    </main>
  );
}

export default Main;
