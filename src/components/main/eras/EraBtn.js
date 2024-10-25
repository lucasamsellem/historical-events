function EraBtn({
  activeEra,
  handleEraClick,
  era,
  start,
  end,
  eraBtnsToRender,
}) {
  const isSingleEraBtn = eraBtnsToRender.length === 1;

  return (
    <button
      className={`rounded-lg px-[0.8rem] py-2 text-[0.8rem] font-semibold text-white transition sm:px-4 sm:text-lg ${
        activeEra === era || isSingleEraBtn
          ? 'bg-indigo-700'
          : 'bg-indigo-300 hover:opacity-70'
      } ${isSingleEraBtn ? 'cursor-not-allowed' : ''}`}
      onClick={() => handleEraClick(start, end, era)}
      disabled={isSingleEraBtn}
    >
      {era}
    </button>
  );
}

export default EraBtn;
