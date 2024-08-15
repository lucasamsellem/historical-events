export default SearchInput;

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
    onSearchHistory((prev) => [...prev, { keyword: inputValue, time: now }]);
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
