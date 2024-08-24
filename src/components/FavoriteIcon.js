export default function FavoriteIcon({
  favoriteEvents,
  showFavorites,
  onShowFavorites,
  hasFavorites,
}) {
  return (
    <span
      className="relative"
      onClick={() => onShowFavorites(hasFavorites && !showFavorites)}
    >
      <button
        className={`flex text-4xl text-white transition ${
          hasFavorites ? 'cursor-pointer' : ''
        }`}
      >
        <ion-icon name={`bookmark${!showFavorites ? '-outline' : ''}`} />
      </button>

      {hasFavorites && (
        <span className="absolute bottom-5 left-5 rounded-full bg-yellow-400 px-2 py-0.5 text-sm text-white">
          {favoriteEvents.length}
        </span>
      )}
    </span>
  );
}
