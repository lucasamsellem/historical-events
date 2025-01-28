import { useState } from 'react';
import { EventsList } from './events/EventsList';
import Eras from './eras/ErasList';
import PresentationMsg from '../messages/PresentationMsg';
import UnknownKeywordMsg from '../messages/UnknownKeywordMsg';
import Loader from '../icons/Loader';

function Main({
  keyword,
  events,
  favoriteEvents,
  isLoading,
  isUnknownKeyword,
  isFavoritesSection,
  onFavoriteEvents,
  hasFavorites,
}) {
  const [eraRange, setEraRange] = useState(null);
  const yearToday = new Date().getFullYear();

  return (
    <main className="mx-auto max-w-7xl flex-1 px-6">
      {!keyword && !isFavoritesSection && <PresentationMsg />}
      {isLoading && <Loader />}
      {isUnknownKeyword && !isFavoritesSection && <UnknownKeywordMsg />}

      {!isLoading && !isUnknownKeyword && (
        <>
          <Eras
            yearToday={yearToday}
            events={events}
            onSetEraRange={setEraRange}
            isFavoritesSection={isFavoritesSection}
            favoriteEvents={favoriteEvents}
          />

          <EventsList
            events={events}
            keyword={keyword}
            eraRange={eraRange}
            yearToday={yearToday}
            isFavoritesSection={isFavoritesSection}
            favoriteEvents={favoriteEvents}
            onFavoriteEvents={onFavoriteEvents}
            hasFavorites={hasFavorites}
          />
        </>
      )}
    </main>
  );
}

export default Main;
