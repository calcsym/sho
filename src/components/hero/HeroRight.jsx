import { useMemo, useState } from 'react';

function safeTel(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  return digits ? `tel:${digits}` : '';
}

function getMonthCells(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const daysInMonth = last.getDate();
  const startDow = first.getDay(); // Sun=0

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function HeroRight({ data }) {
  const measurements = data?.measurements ?? {};
  const contact = data?.contact ?? {};

  const [mode, setMode] = useState('agency'); // agency | freelancer

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now),
    [now]
  );
  const cells = useMemo(() => getMonthCells(year, monthIndex), [year, monthIndex]);

  const selectedDay = 11; // or: now.getDate()

  return (
    <aside className="heroRight">
      <div className="hrTopRow">
        <div className="hrSegment" role="tablist" aria-label="Agency or Freelancer">
          <button
            type="button"
            className={`hrSegBtn ${mode === 'agency' ? 'active' : ''}`}
            onClick={() => setMode('agency')}
          >
            Agency
          </button>
          <button
            type="button"
            className={`hrSegBtn ${mode === 'freelancer' ? 'active' : ''}`}
            onClick={() => setMode('freelancer')}
          >
            Freelancer
          </button>
        </div>
      </div>

      <div className="hrInfoRow">
        <div className="hrMeasurements">
          <div className="hrLine">
            <span className="hrKey">Height:</span>
            <span className="hrVal">{measurements.height ?? '-'}</span>
          </div>
          <div className="hrLine">
            <span className="hrKey">Bust:</span>
            <span className="hrVal">{measurements.bust ?? '-'}</span>
          </div>
          <div className="hrLine">
            <span className="hrKey">Waist:</span>
            <span className="hrVal">{measurements.waist ?? '-'}</span>
          </div>
          <div className="hrLine">
            <span className="hrKey">Hips:</span>
            <span className="hrVal">{measurements.hips ?? '-'}</span>
          </div>
          <div className="hrLine">
            <span className="hrKey">Shoes:</span>
            <span className="hrVal">{measurements.shoes ?? '-'}</span>
          </div>
        </div>

        <div className="hrContactCard">
          <div className="hrContactTitle">Email :</div>

          {contact.email ? (
            <a className="hrContactLink" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          ) : (
            <div className="hrContactLink">-</div>
          )}

          {contact.phone ? (
            <a className="hrContactLink" href={safeTel(contact.phone)}>
              {contact.phone}
            </a>
          ) : (
            <div className="hrContactLink">-</div>
          )}
        </div>
      </div>

      <div className="hrCalendarCard">
        <div className="hrCalendarHeader">
          <div className="hrCalendarTitle">Calendar</div>
          <div className="hrCalendarSub">
            {monthLabel} {year}
          </div>
        </div>

        <div className="hrCalendarGrid">
          {cells.map((d, idx) => (
            <div
              key={`${d ?? 'x'}-${idx}`}
              className={`hrDay ${d ? '' : 'empty'} ${d === selectedDay ? 'selected' : ''}`}
            >
              {d ?? ''}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
