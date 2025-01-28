import { useState } from 'react';
import { saveToLocalStorage } from '../../../hooks/useLocalStorage';
import { WikipediaLinks } from './WikipediaLinks';
import StarBtn from './buttons/StarBtn';

export default function EventCard({
  event,
  day,
  month,
  year,
  yearToday,
  onFavoriteEvents,
  favoriteEvents,
}) {
  const isFavoriteEvent = (events) => events.some((fav) => fav.event === event);
  const [isFavorite, setIsFavorite] = useState(isFavoriteEvent(favoriteEvents));

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    onFavoriteEvents((prev) => {
      const updatedFavorites = isFavoriteEvent(prev)
        ? prev.filter((fav) => fav.event !== event) // Avoid event duplications
        : [...prev, { event, day, month, year }];

      saveToLocalStorage('favoriteEvents', updatedFavorites);

      return updatedFavorites;
    });
  };

  return (
    <li className="grid h-fit gap-3 rounded-lg bg-indigo-500 p-5 text-white shadow-md transition-all">
      <header className="mb-2 flex items-center justify-between gap-6">
        <h3 className="text-2xl font-semibold">
          {day}/{month}/{year}
        </h3>
        <StarBtn handleFavorite={handleFavorite} isFavorite={isFavorite} />
      </header>

      <p className="text-base font-medium">{event}</p>

      <footer className="mt-3 flex items-center justify-between">
        <h5 className="text-sm italic opacity-60">
          {yearToday - year} years ago
        </h5>
        <WikipediaLinks event={event} />
      </footer>
    </li>
  );
}
