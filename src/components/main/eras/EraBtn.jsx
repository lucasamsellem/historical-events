function EraBtn({ activeEra, handleEra, era, start, end, eraBtns }) {
  const isSingleEraBtn = eraBtns.length === 1;

  return (
    <button
      className={`rounded-lg cursor-pointer px-[0.8rem] py-2 text-[0.8rem] font-semibold text-white transition sm:px-4 sm:text-lg ${
        activeEra === era || isSingleEraBtn
          ? 'bg-indigo-700'
          : 'bg-indigo-300 hover:bg-indigo-400'
      } ${isSingleEraBtn ? 'cursor-not-allowed' : ''}`}
      onClick={() => handleEra(start, end, era)}
      disabled={isSingleEraBtn}
    >
      {era}
    </button>
  );
}

export default EraBtn;
