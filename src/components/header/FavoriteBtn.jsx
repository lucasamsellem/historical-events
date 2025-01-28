import { useEffect } from 'react';

export default function FavoriteIcon({
  favoriteEvents,
  isFavoritesSection,
  onIsFavoritesSection,
  hasFavorites,
}) {
  useEffect(() => {
    if (!hasFavorites) onIsFavoritesSection(false);
  }, [hasFavorites, isFavoritesSection, onIsFavoritesSection]);

  return (
    <button
      className={`relative flex text-4xl text-white transition ${
        hasFavorites ? 'cursor-pointer' : ''
      }`}
      onClick={() => onIsFavoritesSection(hasFavorites && !isFavoritesSection)}
    >
      <ion-icon
        name={`bookmark${
          !isFavoritesSection || !hasFavorites ? '-outline' : ''
        }`}
      />

      {hasFavorites && (
        <span className="absolute bottom-5 left-5 rounded-full bg-yellow-400 px-2 py-0.5 text-sm text-white">
          {favoriteEvents.length}
        </span>
      )}
    </button>
  );
}
