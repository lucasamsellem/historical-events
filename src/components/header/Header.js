import EarthIcon from '../EarthIcon';
import { SearchInput } from './search/SearchInput';
import { SearchHistoryIcon } from './search/SearchInput';
import FavoriteIcon from './favorites/FavoriteIcon';
import Title from './Title';

function Header({
  inputValue,
  trimmedInput,
  onInputValue,
  onKeyword,
  searchHistory,
  onSearchHistory,
  favoriteEvents,
  showFavorites,
  onShowFavorites,
  hasFavorites,
}) {
  return (
    <header className="mb-16 flex flex-col items-center justify-between gap-8 bg-indigo-500 py-4 sm:px-20 md:mb-20 md:flex-row md:px-8 lg:mb-20">
      <div className="flex items-center justify-center gap-4">
        <EarthIcon />
        <Title showFavorites={showFavorites} />
      </div>

      <div className="relative flex items-center gap-2">
        <>
          <SearchInput
            onInputValue={onInputValue}
            onSetKeyword={onKeyword}
            searchHistory={searchHistory}
            onSearchHistory={onSearchHistory}
            inputValue={inputValue}
            trimmedInput={trimmedInput}
          />
          <SearchHistoryIcon
            inputValue={inputValue}
            searchHistory={searchHistory}
            onInputValue={onInputValue}
            onSetKeyword={onKeyword}
          />
        </>
        <FavoriteIcon
          favoriteEvents={favoriteEvents}
          showFavorites={showFavorites}
          onShowFavorites={onShowFavorites}
          hasFavorites={hasFavorites}
        />
      </div>
    </header>
  );
}

export default Header;
