import wikipediaPages from '../../../data/wikipediaPages';
import WikipediaBtn from './buttons/WikipediaBtn';
import removePunctuation from '../../../utils/removePunctuation';

function WikipediaLinks({ event }) {
  const matchingWord = wikipediaPages.find((word) =>
    removePunctuation(event.toLowerCase()).includes(word.toLowerCase()),
  );

  return matchingWord && <WikipediaBtn matchingWord={matchingWord} />;
}

export { WikipediaLinks };
