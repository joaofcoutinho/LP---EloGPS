'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  dias: number;
  horas: number;
  min: number;
  seg: number;
}

function calcTime(): TimeLeft {
  const target = new Date('2026-04-24T09:00:00-03:00').getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, min: 0, seg: 0 };
  return {
    dias:  Math.floor(diff / 86_400_000),
    horas: Math.floor((diff % 86_400_000) / 3_600_000),
    min:   Math.floor((diff % 3_600_000)  / 60_000),
    seg:   Math.floor((diff % 60_000)     / 1_000),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(calcTime);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.dias,  label: 'dias'  },
    { value: time.horas, label: 'horas' },
    { value: time.min,   label: 'min'   },
    { value: time.seg,   label: 'seg'   },
  ];

  return (
    <div className="flex items-end gap-3">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-end gap-3">
          <div className="text-center">
            <div
              className="text-4xl font-bold tabular-nums leading-none"
              style={{ fontFamily: 'var(--font-lato)', color: '#994F24' }}
            >
              {String(value).padStart(2, '0')}
            </div>
            <div
              className="text-[10px] tracking-[0.2em] uppercase mt-1"
              style={{ color: '#7A8790' }}
            >
              {label}
            </div>
          </div>
          {i < 3 && (
            <span
              className="text-2xl font-bold mb-4"
              style={{ color: '#475B6D' }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
