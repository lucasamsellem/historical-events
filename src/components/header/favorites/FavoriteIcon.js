import { useEffect } from 'react';
import FavoritesCount from './FavoritesCount';

export default function FavoriteIcon({
  favoriteEvents,
  showFavorites,
  onShowFavorites,
  hasFavorites,
}) {
  useEffect(() => {
    if (!hasFavorites) onShowFavorites(false);
  }, [hasFavorites, showFavorites, onShowFavorites]);

  return (
    <span className="relative">
      <button
        className={`flex text-4xl text-white transition ${
          hasFavorites ? 'cursor-pointer' : ''
        }`}
        onClick={() => onShowFavorites(hasFavorites && !showFavorites)}
      >
        <ion-icon
          name={`bookmark${!showFavorites || !hasFavorites ? '-outline' : ''}`}
        />
      </button>

      {hasFavorites && <FavoritesCount favoriteEvents={favoriteEvents} />}
    </span>
  );
}
