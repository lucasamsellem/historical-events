const wikipediaPages = [
  'Reconquista',
  'Erwig',
  'World War II',
  'French Wars of Religion',
  'Charles the Bold',
  'Albacete',
  'Pedro de Valdivia',
  'Battle of Chacabuco',
  'The Merchant of Venice',
  'The Tempest',
  'Othello',
  'Emperor Gratian',
  'Constantius III',
  'Nero',
  'Law for the Prevention of Genetically Diseased Offspring',
  'Trajan',
  'Emperor Decius',
  'Battle of Jersey',
  'Robert-François Damiens',
  'Umberto I',
];

const removePunctuation = (string) =>
  string
    .split(' ')
    .map((word) => word.replace(/[,:;.!]/g, ''))
    .join(' ');

function WikipediaLinks({ event }) {
  const matchingWord = wikipediaPages.find((word) =>
    removePunctuation(event).includes(word),
  );

  return matchingWord ? (
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
  ) : null;
}

export { WikipediaLinks };
