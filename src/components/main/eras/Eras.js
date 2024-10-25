import { useEffect } from 'react';
import EraBtn from './EraBtn';

export default function Eras({
  yearToday,
  events,
  onSetEraRange,
  favoriteEvents,
  showFavorites,
  activeEra,
  onActiveEra,
}) {
  const selectedList = showFavorites ? favoriteEvents : events;

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

  // Reset era when user is on favorite events
  useEffect(() => {
    onActiveEra(null);
    onSetEraRange(null);
  }, [showFavorites, onSetEraRange, onActiveEra]);

  const handleEraClick = (start, end, era) => {
    const isEraActive = activeEra === era;
    onSetEraRange(isEraActive ? null : [start, end]);
    onActiveEra(isEraActive ? null : era);
  };

  const eraBtnsToRender = eras.filter(({ condition }) =>
    selectedList.some(({ year }) => condition(year)),
  );

  return (
    <div className="mb-10 flex items-center justify-center gap-5 sm:relative sm:flex-row sm:gap-8">
      {eraBtnsToRender.map(({ era, start, end }) => (
        <EraBtn
          key={era}
          activeEra={activeEra}
          handleEraClick={() => handleEraClick(start, end, era)}
          era={era}
          start={start}
          end={end}
          eraBtnsToRender={eraBtnsToRender}
        />
      ))}
    </div>
  );
}
