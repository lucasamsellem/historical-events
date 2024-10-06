import EarthIcon from '../header/EarthIcon';
import { SearchInput } from '../header/SearchInput';
import { SearchHistoryIcon } from '../header/SearchInput';
import FavoriteIcon from '../header/FavoriteIcon';

function Header({
  theme,
  setInputValue,
  setTheme,
  searchHistory,
  setSearchHistory,
  inputValue,
  trimmedInput,
  favoriteEvents,
  showFavorites,
  setShowFavorites,
  hasFavorites,
  setIsUnknownKeyword,
}) {
  return (
    <header className="mb-16 flex flex-col items-center justify-between gap-8 bg-indigo-500 py-4 sm:px-20 md:mb-20 md:flex-row md:px-8 lg:mb-20">
      <span className="flex items-center justify-center gap-4">
        <EarthIcon />

        <h1 className="text-2xl font-bold text-white md:text-lg lg:text-2xl">
          {showFavorites ? 'Favorite Events' : 'Historical Events'}
        </h1>
      </span>

      <span className="relative flex items-center gap-2">
        <>
          <SearchInput
            theme={theme}
            onInputValue={setInputValue}
            onSetTheme={setTheme}
            searchHistory={searchHistory}
            onSearchHistory={setSearchHistory}
            inputValue={inputValue}
            trimmedInput={trimmedInput}
          />
          <SearchHistoryIcon
            inputValue={inputValue}
            searchHistory={searchHistory}
            onInputValue={setInputValue}
            onSetTheme={setTheme}
          />
        </>
        <FavoriteIcon
          favoriteEvents={favoriteEvents}
          showFavorites={showFavorites}
          onShowFavorites={setShowFavorites}
          hasFavorites={hasFavorites}
          setIsUnknownKeyword={setIsUnknownKeyword}
        />
      </span>
    </header>
  );
}

export default Header;
