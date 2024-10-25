import Event from './Event';
export { EventsList, FavoriteEventsList };

function EventsList({
  sortedList,
  yearToday,
  favoriteEvents,
  onFavoriteEvents,
  keyword,
}) {
  return (
    <ul className="my-3 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {sortedList.map(({ event, day, month, year }) => (
        <Event
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
  );
}

function FavoriteEventsList({
  sortedList,
  favoriteEvents,
  yearToday,
  onFavoriteEvents,
  keyword,
}) {
  return (
    <ul className="my-3 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {sortedList.map(({ event, day, month, year }) => (
        <Event
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
  );
}
