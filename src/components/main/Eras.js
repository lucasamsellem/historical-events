import { useState } from 'react';
import EraBtn from './EraBtn';

export default function Eras({ onSetEra, eventsYear, today }) {
  const [activeEra, setActiveEra] = useState(null);

  const handleEraClick = (start, end, era) => {
    if (activeEra === era) {
      onSetEra(null);
      setActiveEra(null);
    } else {
      onSetEra([start, end]);
      setActiveEra(era);
    }
  };

  const before1600 = eventsYear.some((year) => year < 1600);
  const between1600And1900 = eventsYear.some(
    (year) => year >= 1600 && year <= 1900,
  );
  const after1900 = eventsYear.some((year) => year > 1900);

  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-16">
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
    </div>
  );
}
