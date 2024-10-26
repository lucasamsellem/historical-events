function Title({ showFavorites }) {
  return (
    <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl">
      {showFavorites ? 'Favorite Events' : 'Historical Events'}
    </h1>
  );
}

export default Title;
