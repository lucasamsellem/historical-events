function WikipediaBtn({ matchingWord }) {
  return (
    <a
      className="text-md flex rounded-full bg-white p-[0.4rem] transition active:scale-90"
      href={`https://en.wikipedia.org/wiki/${matchingWord}`}
      target="_blank"
      rel="noreferrer"
    >
      <ion-icon
        name="search-outline"
        style={{ color: 'rgb(99 102 241 / var(--tw-bg-opacity))' }}
      />
    </a>
  );
}

export default WikipediaBtn;
