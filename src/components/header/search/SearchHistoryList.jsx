function SearchHistoryList({
  onInputValue,
  searchHistory,
  onKeyword,
  onIsDropdownActive,
}) {
  function clearSearchHistory() {
    searchHistory.splice(0, searchHistory.length);
    localStorage.removeItem('searchHistory');
  }

  // Add history keyword to the search input
  function handleSearchHistory(keyword) {
    onInputValue(keyword);
    onKeyword(keyword);
    onIsDropdownActive(false);
  }

  return (
    <ul className="mt:mb-20 absolute right-6 top-14 z-50 grid max-h-52 w-52 overflow-y-auto overflow-x-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {searchHistory
        .map(({ keyword, time }, i) => (
          <li
            key={i}
            className="flex cursor-pointer items-center justify-between gap-6 px-4 py-2 transition hover:bg-gray-100"
            onClick={() => handleSearchHistory(keyword)}
          >
            <strong>{keyword}</strong>
            <span className="text-sm text-gray-500">{time}</span>
          </li>
        ))
        .toReversed()}

      <button
        onClick={clearSearchHistory}
        className="flex w-full items-center justify-center bg-red-100 py-2 text-xl text-red-600 transition hover:bg-red-200"
      >
        <ion-icon name="trash-outline" />
      </button>
    </ul>
  );
}

export default SearchHistoryList;
