import { useState } from 'react';

export { SearchInput, SearchHistoryIcon, SearchHistoryList };

function SearchInput({ inputValue, trimmedInput, onInputValue, onSetTheme }) {
  const handleButtonClick = (e) => {
    e.preventDefault();

    // Prevent empty spaces from being pushed to search history
    if (trimmedInput !== '') onSetTheme(trimmedInput);
  };

  return (
    <form className="flex items-center">
      <button
        className="z-50 -mr-10 flex border-r-[1px] border-gray-300 pr-2 text-2xl text-gray-400"
        onClick={handleButtonClick}
      >
        <ion-icon name="search-outline" />
      </button>

      <input
        type="text"
        placeholder="Enter a keyword"
        value={inputValue}
        onChange={(e) => onInputValue(e.target.value)}
        className="max-w-[16rem] rounded-md border-none px-14 py-3 focus:outline-none"
      />
    </form>
  );
}

function SearchHistoryIcon({ searchHistory, onSetTheme }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const hasHistory = searchHistory.length > 0;

  return (
    <span
      className="relative"
      onClick={() => setDropdownVisible(!isDropdownVisible)}
    >
      <button
        className={`-ml-12 flex bg-none p-2 text-2xl text-gray-400 focus:outline-none ${
          hasHistory ? 'flex' : 'hidden'
        }`}
      >
        <ion-icon name="time-outline" />
      </button>

      {hasHistory && isDropdownVisible && (
        <SearchHistoryList
          onSetTheme={onSetTheme}
          searchHistory={searchHistory}
        />
      )}
    </span>
  );
}

function SearchHistoryList({ searchHistory, onSetTheme }) {
  // Clear local storage when user clicks on trash icon
  const clearSearchHistory = () => {
    searchHistory.splice(0, searchHistory.length);
    localStorage.removeItem('searchHistory');
  };

  return (
    <ul className="mt:mb-20 absolute right-6 top-14 z-50 max-h-52 w-52 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      {searchHistory
        .map((keyword, i) => (
          <li
            onClick={() => onSetTheme(keyword.keyword)}
            key={i}
            className="flex cursor-pointer items-center justify-between gap-6 px-4 py-2 hover:bg-gray-100"
          >
            <strong>{keyword.keyword}</strong>
            <span className="text-sm text-gray-500">{keyword.time}</span>
          </li>
        ))
        .toReversed()}

      <button
        onClick={clearSearchHistory}
        className="flex w-full items-center justify-center bg-red-100 py-2 text-xl text-red-600 hover:bg-red-200"
      >
        <ion-icon name="trash-outline" />
      </button>
    </ul>
  );
}
