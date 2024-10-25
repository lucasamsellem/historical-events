function EraBtn({ activeEra, handleEraClick, era, start, end }) {
  return (
    <button
      className={`rounded-lg px-[0.8rem] py-2 text-[0.8rem] font-semibold text-white transition sm:px-4 sm:text-lg ${
        activeEra === era ? 'bg-indigo-700' : 'bg-indigo-300'
      }`}
      onClick={() => handleEraClick(start, end, era)}
    >
      {era}
    </button>
  );
}

export default EraBtn;
