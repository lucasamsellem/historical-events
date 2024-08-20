import { useState } from 'react';

export { SearchInput, SearchHistoryIcon, SearchHistoryList };

function SearchInput({
  inputValue,
  onInputValue,
  onSetTheme,
  onSearchHistory,
}) {
  const handleButtonClick = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const trimmedInput = inputValue.trim();

    // Prevent empty spaces from being pushed to search history
    if (trimmedInput !== '') {
      onSetTheme(trimmedInput);

      onSearchHistory((prev) => {
        const updatedHistory = [...prev, { keyword: trimmedInput, time: now }];

        // Save search history to localStorage whenever it changes
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

        return updatedHistory;
      });
    }
  };

  return (
    <form className="flex items-center space-x-2">
      <button
        className="z-50 -mr-11 flex border-r-[1px] border-gray-300 pr-2 text-xl text-gray-400"
        onClick={handleButtonClick}
      >
        <ion-icon name="search-outline" />
      </button>

      <input
        type="text"
        placeholder="Enter a keyword"
        value={inputValue}
        onChange={(e) => onInputValue(e.target.value)}
        className="rounded-md border-none p-3 pl-12 focus:outline-none"
      />
    </form>
  );
}

function SearchHistoryIcon({ searchHistory, onInputValue }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const hasHistory = searchHistory.length > 0;

  return (
    <span
      className="relative"
      onClick={() => setDropdownVisible(!isDropdownVisible)}
    >
      <button
        className={`-ml-10 flex bg-none p-2 text-xl text-gray-400 focus:outline-none ${
          hasHistory ? 'flex' : 'hidden'
        }`}
      >
        <ion-icon name="time-outline" />
      </button>

      {hasHistory && isDropdownVisible && (
        <SearchHistoryList
          searchHistory={searchHistory}
          onInputValue={onInputValue}
        />
      )}
    </span>
  );
}

function SearchHistoryList({ searchHistory, onInputValue }) {
  const clearSearchHistory = () => {
    searchHistory.splice(0, searchHistory.length);
    localStorage.removeItem('searchHistory');
  };

  return (
    <ul className="mt:mb-20 absolute right-11 top-14 z-50 max-h-52 w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      {searchHistory
        .map((keyword, i) => (
          <li
            onClick={() => onInputValue(keyword.keyword)}
            key={i}
            className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100"
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
