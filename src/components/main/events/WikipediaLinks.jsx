import wikipediaPages from '../../../data/wikipediaPages';
import removePunctuation from '../../../utils/removePunctuation';

function WikipediaLinks({ event }) {
  const matchingWord = wikipediaPages.find((word) =>
    removePunctuation(event.toLowerCase()).includes(word.toLowerCase())
  );

  return (
    matchingWord && (
      <a
        className="text-md flex rounded-full bg-white p-[0.4rem] text-gray-500 transition active:scale-90"
        href={`https://en.wikipedia.org/wiki/${matchingWord}`}
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="search-outline" />
      </a>
    )
  );
}

export { WikipediaLinks };
