import { useEffect } from 'react';

export default function FavoriteIcon({
  favoriteEvents,
  showFavorites,
  onShowFavorites,
  hasFavorites,
  setIsUnknownKeyword,
}) {
  useEffect(() => {
    if (!hasFavorites) onShowFavorites(false);
  }, [hasFavorites, showFavorites, onShowFavorites]);

  function handleShowFavorites() {
    setIsUnknownKeyword(false);
    onShowFavorites(hasFavorites && !showFavorites);
  }

  return (
    <span className="relative">
      <button
        className={`flex text-4xl text-white transition ${
          hasFavorites ? 'cursor-pointer' : ''
        }`}
        onClick={handleShowFavorites}
      >
        <ion-icon
          name={`bookmark${!showFavorites || !hasFavorites ? '-outline' : ''}`}
        />
      </button>

      {hasFavorites && (
        <span className="absolute bottom-5 left-5 rounded-full bg-yellow-400 px-2 py-0.5 text-sm text-white">
          {favoriteEvents.length}
        </span>
      )}
    </span>
  );
}
