import Event from './Event';
import SortListOrderBtn from './buttons/SortListOrderBtn';
export { EventsList };

function EventsList({
  keyword,
  sortedList,
  yearToday,
  favoriteEvents,
  onFavoriteEvents,
  ascendingOrder,
  onAscendingOrder,
}) {
  return (
    <>
      {sortedList.length >= 5 && (
        <SortListOrderBtn
          ascendingOrder={ascendingOrder}
          onAscendingOrder={onAscendingOrder}
        />
      )}

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
    </>
  );
}
