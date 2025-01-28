import EarthIcon from '../footer/EarthIcon';
import SearchInput from './search/SearchInput';
import FavoriteIcon from './FavoriteBtn';

function Header({
  inputValue,
  trimmedInput,
  onInputValue,
  onKeyword,
  searchHistory,
  onSearchHistory,
  favoriteEvents,
  isFavoritesSection,
  onIsFavoritesSection,
  hasFavorites,
}) {
  return (
    <header className="mb-16 flex flex-col items-center justify-between gap-8 bg-indigo-500 py-4 sm:px-20 md:mb-20 md:flex-row md:px-8 lg:mb-20">
      <div className="flex items-center justify-center gap-4">
        <EarthIcon />
        <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl">
          {isFavoritesSection ? 'Favorite Events' : 'Historical Events'}
        </h1>
      </div>

      <div className="relative flex items-center gap-5">
        <SearchInput
          onInputValue={onInputValue}
          onKeyword={onKeyword}
          searchHistory={searchHistory}
          onSearchHistory={onSearchHistory}
          inputValue={inputValue}
          trimmedInput={trimmedInput}
        />
        <FavoriteIcon
          favoriteEvents={favoriteEvents}
          isFavoritesSection={isFavoritesSection}
          onIsFavoritesSection={onIsFavoritesSection}
          hasFavorites={hasFavorites}
        />
      </div>
    </header>
  );
}

export default Header;
