import { useState } from 'react';

export default function Eras({ theme, onSetEra, eventsYear, today }) {
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

  if (!theme) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-16">
      {before1600 && (
        <button
          className={`rounded-lg px-10 py-2 text-base font-semibold text-white transition sm:text-xl ${
            activeEra === 'before1600' ? 'bg-indigo-500' : 'bg-indigo-300'
          } hover:bg-indigo-500`}
          onClick={() => handleEraClick(0, 1600, 'before1600')}
        >
          0 - 1600
        </button>
      )}
      {between1600And1900 && (
        <button
          className={`rounded-lg px-10 py-2 text-base font-semibold text-white transition sm:text-xl ${
            activeEra === 'between1600And1900'
              ? 'bg-indigo-500'
              : 'bg-indigo-300'
          } hover:bg-indigo-500`}
          onClick={() => handleEraClick(1600, 1900, 'between1600And1900')}
        >
          1600 - 1900
        </button>
      )}
      {after1900 && (
        <button
          className={`rounded-lg px-10 py-2 text-base font-semibold text-white transition sm:text-xl ${
            activeEra === 'after1900' ? 'bg-indigo-500' : 'bg-indigo-300'
          } hover:bg-indigo-500`}
          onClick={() => handleEraClick(1900, today, 'after1900')}
        >
          1900 - today
        </button>
      )}
    </div>
  );
}
