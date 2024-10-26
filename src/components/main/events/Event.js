import { useState } from 'react';
import { saveToLocalStorage } from '../../../hooks/useLocalStorage';
import { WikipediaLinks } from './WikipediaLinks';
import StarIcon from './StarIcon';

export default function Event({
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
      <div className="mb-2 flex items-center justify-between gap-6">
        <h3 className="text-2xl font-semibold">
          {day}/{month}/{year}
        </h3>
        <StarIcon handleFavorite={handleFavorite} isFavorite={isFavorite} />
      </div>

      <p className="text-base font-medium">{event}</p>

      <div className="mt-3 flex items-center justify-between">
        <h5 className="text-sm italic opacity-60">
          {yearToday - year} years ago
        </h5>

        <WikipediaLinks event={event} />
      </div>
    </li>
  );
}
