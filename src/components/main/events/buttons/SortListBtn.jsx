function SortListBtn({ ascendingOrder, onAscendingOrder }) {
  return (
    <button
      className={`m-0 ml-auto cursor-pointer flex transform justify-center text-3xl text-indigo-500 transition duration-300 ease-in-out ${
        ascendingOrder ? '' : 'rotate-180'
      }`}
      onClick={() => onAscendingOrder(!ascendingOrder)}
    >
      <ion-icon name="arrow-down-circle-outline" />
    </button>
  );
}

export default SortListBtn;
