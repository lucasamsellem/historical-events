import { useState, useRef } from 'react';
export { SearchInput, SearchHistoryIcon, SearchHistoryList };

function SearchInput({ inputValue, trimmedInput, onInputValue, onSetKeyword }) {
  const inputRef = useRef(null);

  function handleButtonClick(e) {
    e.preventDefault();
    if (trimmedInput !== '') onSetKeyword(trimmedInput);
    if (inputRef.current) inputRef.current.blur();
  }

  return (
    <form className="flex items-center">
      <button
        className="z-50 -mr-10 flex border-r-[1px] border-gray-300 pr-2 text-2xl text-gray-400"
        onClick={handleButtonClick}
      >
        <ion-icon name="search-outline" />
      </button>

      <input
        ref={inputRef}
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
          onInputValue={onInputValue}
          onSetKeyword={onSetKeyword}
          searchHistory={searchHistory}
        />
      )}
    </span>
  );
}

function SearchHistoryList({ onInputValue, searchHistory, onSetKeyword }) {
  function clearSearchHistory() {
    searchHistory.splice(0, searchHistory.length);
    localStorage.removeItem('searchHistory');
  }

  function handleSearchHistoryClick(keyword) {
    onInputValue(keyword);
    onSetKeyword(keyword);
  }

  return (
    <ul className="mt:mb-20 absolute right-6 top-14 z-50 grid max-h-52 w-52 overflow-y-auto overflow-x-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {searchHistory
        .map(({ keyword, time }, i) => (
          <li
            onClick={() => handleSearchHistoryClick(keyword)}
            key={i}
            className="flex cursor-pointer items-center justify-between gap-6 px-4 py-2 hover:bg-gray-100"
          >
            <strong>{keyword}</strong>
            <span className="text-sm text-gray-500">{time}</span>
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
