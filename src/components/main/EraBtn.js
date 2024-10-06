function EraBtn({ activeEra, handleEraClick, start, end, era }) {
  const isActive = activeEra === era;

  return (
    <button
      className={`rounded-lg px-10 py-2 text-base font-semibold text-white transition sm:text-xl ${
        isActive ? 'bg-indigo-500' : 'bg-indigo-300'
      } hover:bg-indigo-500`}
      onClick={() => handleEraClick(start, end, era)}
    >
      {era}
    </button>
  );
}

export default EraBtn;
