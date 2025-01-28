function WikipediaBtn({ matchingWord }) {
  return (
    <a
      className="text-md flex rounded-full bg-white p-[0.4rem] text-gray-400 transition active:scale-90"
      href={`https://en.wikipedia.org/wiki/${matchingWord}`}
      target="_blank"
      rel="noreferrer"
    >
      <ion-icon name="search-outline" />
    </a>
  );
}

export default WikipediaBtn;
