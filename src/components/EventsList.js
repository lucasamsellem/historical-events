import Event from './Event';

export { EventsList, FavoriteEventsList };

function EventsList({ events, era, today, favoriteEvents, onFavoriteEvents }) {
  const sortedFilteredEras = events
    .filter((event) => {
      if (!era) return true;
      const [start, end] = era;
      return event.year >= start && event.year <= end;
    })
    .sort((a, b) => a.year - b.year);

  return (
    <ul className='events-list'>
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
        />
      ))}
    </ul>
  );
}

function FavoriteEventsList({ favoriteEvents, today, onFavoriteEvents }) {
  return (
    <ul className='events-list'>
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
        />
      ))}
    </ul>
  );
}
