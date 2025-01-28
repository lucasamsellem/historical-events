import { useState } from 'react';
import SearchHistoryList from './SearchHistoryList';

function SearchHistoryBtn({ onInputValue, searchHistory, onKeyword }) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  if (!searchHistory.length) return null;

  return (
    <>
      <button
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        className="relative cursor-pointer -ml-16 flex p-2 text-2xl text-gray-400 focus:outline-none"
      >
        <ion-icon name="time-outline" />
      </button>

      {isDropdownActive && (
        <SearchHistoryList
          onInputValue={onInputValue}
          onKeyword={onKeyword}
          searchHistory={searchHistory}
          onIsDropdownActive={setIsDropdownActive}
        />
      )}
    </>
  );
}

export default SearchHistoryBtn;
