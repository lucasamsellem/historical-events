import { useState } from 'react';
import EventCard from './EventCard';
import SortListBtn from './buttons/SortListBtn';
export { EventsList };

function EventsList({
  events,
  keyword,
  eraRange,
  yearToday,
  isFavoritesSection,
  favoriteEvents,
  hasFavorites,
  onFavoriteEvents,
}) {
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const sortList = (events) =>
    events
      .filter(
        ({ year }) => !eraRange || (year >= eraRange[0] && year <= eraRange[1])
      )
      .sort((a, b) => (ascendingOrder ? a.year - b.year : b.year - a.year));

  const sortedList =
    isFavoritesSection && hasFavorites
      ? sortList(favoriteEvents)
      : sortList(events);

  return (
    <>
      {sortedList.length >= 5 && (
        <SortListBtn
          ascendingOrder={ascendingOrder}
          onAscendingOrder={setAscendingOrder}
        />
      )}

      <ul className="my-3 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {sortedList.map(({ event, day, month, year }) => (
          <EventCard
            key={event}
            event={event}
            day={day}
            month={month}
            year={year}
            yearToday={yearToday}
            favoriteEvents={favoriteEvents}
            onFavoriteEvents={onFavoriteEvents}
            keyword={keyword}
          />
        ))}
      </ul>
    </>
  );
}
