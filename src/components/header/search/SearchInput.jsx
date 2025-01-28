import { useRef } from 'react';
import SearchHistoryBtn from './SearchHistoryBtn';

function SearchInput({
  inputValue,
  trimmedInput,
  onInputValue,
  onKeyword,
  searchHistory,
}) {
  const searchInputRef = useRef(null);

  function handleSearch(e) {
    e.preventDefault();

    if (trimmedInput) onKeyword(trimmedInput);
    searchInputRef?.current.blur();
  }

  return (
    <>
      <form className="flex items-center">
        <button
          className="z-50 -mr-10 flex border-r-[1px] border-gray-300 pr-2 text-2xl text-gray-400 cursor-pointer"
          onClick={(e) => handleSearch(e)}
        >
          <ion-icon name="search-outline" />
        </button>

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Enter a keyword"
          value={inputValue}
          onChange={(e) => onInputValue(e.target.value)}
          className="max-w-[16rem] bg-white rounded-md border-none px-14 py-3 font-medium focus:outline-none"
          autoFocus
        />
      </form>

      <SearchHistoryBtn
        onInputValue={onInputValue}
        searchHistory={searchHistory}
        onKeyword={onKeyword}
      />
    </>
  );
}

export default SearchInput;
