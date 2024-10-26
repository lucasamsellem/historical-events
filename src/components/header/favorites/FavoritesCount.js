function FavoritesCount({ favoriteEvents }) {
  return (
    <span className="absolute bottom-5 left-5 rounded-full bg-yellow-400 px-2 py-0.5 text-sm text-white">
      {favoriteEvents.length}
    </span>
  );
}

export default FavoritesCount;
