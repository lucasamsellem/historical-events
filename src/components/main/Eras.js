import { useState, useEffect } from 'react';
import EraBtn from './EraBtn';

export default function Eras({
  today,
  events,
  onSetEraRange,
  favoriteEvents,
  showFavorites,
  ascendingOrder,
  onAscendingOrder,
}) {
  const [activeEra, setActiveEra] = useState(null);
  const selectedList = showFavorites ? favoriteEvents : events;
  const before1600 = selectedList.some((event) => event.year < 1600);
  const between1600And1900 = selectedList.some(
    (event) => event.year >= 1600 && event.year <= 1900,
  );
  const after1900 = selectedList.some((event) => event.year > 1900);

  useEffect(() => {
    setActiveEra(null);
    onSetEraRange(null);
  }, [showFavorites, onSetEraRange]);

  const handleEraClick = (start, end, era) => {
    if (activeEra === era) {
      onSetEraRange(null);
      setActiveEra(null);
    } else {
      onSetEraRange([start, end]);
      setActiveEra(era);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-16">
      {before1600 && (
        <EraBtn
          activeEra={activeEra}
          handleEraClick={handleEraClick}
          start={0}
          end={1600}
          era="0 - 1600"
        />
      )}

      {between1600And1900 && (
        <EraBtn
          activeEra={activeEra}
          handleEraClick={handleEraClick}
          start={1600}
          end={1900}
          era="1600 - 1900"
        />
      )}

      {after1900 && (
        <EraBtn
          activeEra={activeEra}
          handleEraClick={handleEraClick}
          start={1900}
          end={today}
          era="1900 - today"
        />
      )}

      <button
        className={`absolute right-1 ml-auto flex transform text-3xl text-indigo-500 transition duration-300 ease-in-out ${ascendingOrder ? '' : 'rotate-180'}`}
        onClick={() => onAscendingOrder(!ascendingOrder)}
      >
        <ion-icon name="arrow-down-circle-outline" />
      </button>
    </div>
  );
}
