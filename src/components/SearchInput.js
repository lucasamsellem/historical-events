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

    onSetTheme(inputValue);

    onSearchHistory((prev) => {
      const updatedHistory = [...prev, { keyword: inputValue, time: now }];

      // Save search history to localStorage whenever it changes
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  return (
    <form>
      <button className='glass' onClick={handleButtonClick}>
        <ion-icon name='search-outline' />
      </button>

      <input
        type='text'
        placeholder='Enter a keyword'
        value={inputValue}
        onChange={(e) => onInputValue(e.target.value)}
      />
    </form>
  );
}

function SearchHistoryIcon({ searchHistory, onInputValue }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const hasHistory = searchHistory.length > 0;

  return (
    <span onClick={() => setDropdownVisible(!isDropdownVisible)}>
      <button className={`search-icon ${hasHistory && 'full-opacity'}`}>
        <ion-icon name='time-outline' />
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
  // Put keyword text in search input when clicked on keyword from search history
  const setHistoryKeywordInput = (e) => onInputValue(e.target.innerText);

  const clearSearchHistory = () => {
    // Empty the array
    searchHistory.splice(0, searchHistory.length);
    localStorage.removeItem('searchHistory');
  };

  return (
    <ul className='search-history-list'>
      {searchHistory
        .map((keyword, i) => (
          <li key={i}>
            <strong onClick={setHistoryKeywordInput}>{keyword.keyword}</strong>{' '}
            <span>{keyword.time}</span>
          </li>
        ))
        .toReversed()}
      <button onClick={clearSearchHistory}>
        <ion-icon name='trash-outline' />
      </button>
    </ul>
  );
}
