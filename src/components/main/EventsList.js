import Event from './Event';
export { EventsList, FavoriteEventsList };

function EventsList({
  sortedFilteredEras,
  today,
  favoriteEvents,
  onFavoriteEvents,
  theme,
}) {
  return (
    <ul className="my-10 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {sortedFilteredEras.map(({ event, day, month, year }) => (
        <Event
          key={event}
          event={event}
          day={day}
          month={month}
          year={year}
          today={today}
          favoriteEvents={favoriteEvents}
          onFavoriteEvents={onFavoriteEvents}
          theme={theme}
        />
      ))}
    </ul>
  );
}

function FavoriteEventsList({
  sortedFilteredEras,
  favoriteEvents,
  today,
  onFavoriteEvents,
  theme,
}) {
  return (
    <ul className="my-10 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {sortedFilteredEras.map(({ event, day, month, year }) => (
        <Event
          key={event}
          event={event}
          day={day}
          month={month}
          year={year}
          today={today}
          favoriteEvents={favoriteEvents}
          onFavoriteEvents={onFavoriteEvents}
          theme={theme}
        />
      ))}
    </ul>
  );
}
