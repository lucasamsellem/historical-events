import { useState, useRef } from 'react';
import SearchHistoryList from './SearchHistoryList';
export { SearchInput, SearchHistoryIcon };

function SearchInput({ inputValue, trimmedInput, onInputValue, onSetKeyword }) {
  const searchInputRef = useRef(null);
  console.log(searchInputRef);

  function handleSearch(e) {
    e.preventDefault();
    if (trimmedInput) onSetKeyword(trimmedInput);
    searchInputRef?.current.blur();
  }

  return (
    <form className="flex items-center">
      <button
        className="z-50 -mr-10 flex border-r-[1px] border-gray-300 pr-2 text-2xl text-gray-400"
        onClick={handleSearch}
      >
        <ion-icon name="search-outline" />
      </button>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Enter a keyword"
        value={inputValue}
        onChange={(e) => onInputValue(e.target.value)}
        className="max-w-[16rem] rounded-md border-none px-14 py-3 font-medium focus:outline-none"
        autoFocus
      />
    </form>
  );
}

function SearchHistoryIcon({ onInputValue, searchHistory, onSetKeyword }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <span
      className="relative"
      onClick={() => setDropdownVisible(!isDropdownVisible)}
    >
      {searchHistory.length > 0 && (
        <>
          <button className="-ml-12 flex p-2 text-2xl text-gray-400 focus:outline-none">
            <ion-icon name="time-outline" />
          </button>

          {isDropdownVisible && (
            <SearchHistoryList
              onInputValue={onInputValue}
              onSetKeyword={onSetKeyword}
              searchHistory={searchHistory}
            />
          )}
        </>
      )}
    </span>
  );
}
