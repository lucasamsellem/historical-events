import Event from './Event';

export { EventsList, FavoriteEventsList };

function EventsList({
  events,
  era,
  today,
  favoriteEvents,
  onFavoriteEvents,
  theme,
}) {
  const sortedFilteredEras = events
    .filter((event) => {
      if (!era) return true;
      const [start, end] = era;
      return event.year >= start && event.year <= end;
    })
    .sort((a, b) => a.year - b.year);

  return (
    <ul className="my-10 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {sortedFilteredEras.map((event) => (
        <Event
          key={event.event}
          event={event.event}
          day={event.day}
          month={event.month}
          year={event.year}
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
  favoriteEvents,
  today,
  onFavoriteEvents,
  theme,
}) {
  return (
    <ul className="my-10 mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
      {favoriteEvents.map((event) => (
        <Event
          key={event.event}
          event={event.event}
          day={event.day}
          month={event.month}
          year={event.year}
          today={today}
          favoriteEvents={favoriteEvents}
          onFavoriteEvents={onFavoriteEvents}
          theme={theme}
        />
      ))}
    </ul>
  );
}
