import { useState, useEffect } from 'react';
import EraBtn from './EraBtn';

export default function ErasList({
  yearToday,
  events,
  onSetEraRange,
  favoriteEvents,
  isFavoritesSection,
}) {
  const [activeEra, setActiveEra] = useState(null);
  const selectedList = isFavoritesSection ? favoriteEvents : events;

  const eras = [
    {
      era: '0 - 1600',
      start: 0,
      end: 1600,
      condition: (year) => year < 1600,
    },
    {
      era: '1600 - 1900',
      start: 1600,
      end: 1900,
      condition: (year) => year >= 1600 && year <= 1900,
    },
    {
      era: `1900 - ${yearToday}`,
      start: 1900,
      end: yearToday,
      condition: (year) => year > 1900,
    },
  ];

  // Reset era when user clicks on favorite events
  useEffect(() => {
    setActiveEra(null);
    onSetEraRange(null);
  }, [isFavoritesSection, onSetEraRange, setActiveEra]);

  const handleEra = (start, end, era) => {
    const isEraActive = activeEra === era;
    onSetEraRange(isEraActive ? null : [start, end]);
    setActiveEra(isEraActive ? null : era);
  };

  const eraBtns = eras.filter(({ condition }) =>
    selectedList.some(({ year }) => condition(year))
  );

  return (
    <ol className="mb-10 flex items-center justify-center gap-5 sm:relative sm:flex-row sm:gap-8">
      {eraBtns.map(({ era, start, end }) => (
        <li key={era}>
          <EraBtn
            key={era}
            activeEra={activeEra}
            handleEra={() => handleEra(start, end, era)}
            era={era}
            start={start}
            end={end}
            eraBtns={eraBtns}
          />
        </li>
      ))}
    </ol>
  );
}
