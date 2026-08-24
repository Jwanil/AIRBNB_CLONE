'use client';
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, isAfter, getDay } from 'date-fns';

type D = Date | null;

function MonthCalendar({ month, checkIn, checkOut, onDayClick, hovered, onDayHover }: {
  month: Date; checkIn: D; checkOut: D; onDayClick: (d: Date) => void; hovered: D; onDayHover: (d: D) => void;
}) {
  const today = new Date(); today.setHours(0,0,0,0);
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const startPad = getDay(startOfMonth(month));
  const rangeEnd = checkOut || hovered;

  const getStyle = (day: Date): React.CSSProperties => {
    const isPast = isBefore(day, today);
    const isStart = checkIn && isSameDay(day, checkIn);
    const isEnd = checkOut && isSameDay(day, checkOut);
    const inRange = checkIn && rangeEnd && !isBefore(rangeEnd, checkIn) && isAfter(day, checkIn) && isBefore(day, rangeEnd);
    return {
      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%', cursor: isPast ? 'not-allowed' : 'pointer', fontSize: 14,
      backgroundColor: isStart || isEnd ? '#222222' : inRange ? '#f0eded' : 'transparent',
      color: isStart || isEnd ? '#FFFFFF' : isPast ? '#C7C7C7' : '#222222',
      fontWeight: isStart || isEnd ? 600 : 400,
      textDecoration: isPast ? 'line-through' : 'none',
    };
  };

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 15, marginBottom: 16 }}>
        {format(month, 'MMMM yyyy')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0', marginBottom: 8 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 12, color: '#717171', paddingBottom: 8, fontWeight: 500 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
        {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} style={{ width: 36, height: 36 }} />)}
        {days.map((day, i) => {
          const isPast = isBefore(day, today);
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                style={getStyle(day)}
                onClick={() => !isPast && onDayClick(day)}
                onMouseEnter={() => !isPast && onDayHover(day)}
                onMouseLeave={() => onDayHover(null)}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useBooking } from '@/context/BookingContext';

export default function AvailabilitySection() {
  const today = new Date(); today.setHours(0,0,0,0);
  const { checkInDate, checkOutDate, setDateRange } = useBooking();
  const [checkIn, setCheckIn] = useState<D>(checkInDate);
  const [checkOut, setCheckOut] = useState<D>(checkOutDate);
  const [selecting, setSelecting] = useState<'in' | 'out'>('in');
  const [hovered, setHovered] = useState<D>(null);
  const [viewMonth, setViewMonth] = useState(checkInDate ? startOfMonth(checkInDate) : startOfMonth(today));

  const nextMonth = addMonths(viewMonth, 1);

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;
    if (selecting === 'in' || !checkIn) {
      setCheckIn(day);
      setCheckOut(null);
      setSelecting('out');
      setDateRange(day, null);
    } else {
      if (isBefore(day, checkIn) || isSameDay(day, checkIn)) {
        setCheckIn(day);
        setCheckOut(null);
        setSelecting('out');
        setDateRange(day, null);
      } else {
        setCheckOut(day);
        setSelecting('in');
        setDateRange(checkIn, day);
      }
    }
  };

  const nights = checkIn && checkOut
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
    : null;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 4px' }}>
        {checkIn && !checkOut ? 'Select checkout date' : checkIn && checkOut ? `${nights} night${nights !== 1 ? 's' : ''} in Candolim` : 'Select check-in date'}
      </h2>
      <p style={{ fontSize: 14, color: '#717171', margin: '0 0 20px' }}>
        {checkIn && checkOut
          ? `${format(checkIn, 'MMM d, yyyy')} – ${format(checkOut, 'MMM d, yyyy')}`
          : 'Minimum stay: 2 nights'}
      </p>

      {/* Calendar container */}
      <div style={{ border: '1px solid #DDDDDD', borderRadius: 16, padding: '20px 16px', display: 'inline-block', width: '100%', boxSizing: 'border-box' }}>
        {/* Month navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setViewMonth(m => subMonths(m, 1))}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #DDDDDD', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M15 18l-6-6 6-6" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setViewMonth(m => addMonths(m, 1))}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #DDDDDD', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M9 18l6-6-6-6" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Two-month grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 16px', alignItems: 'start' }}>
          <MonthCalendar month={viewMonth} checkIn={checkIn} checkOut={checkOut} onDayClick={handleDayClick} hovered={hovered} onDayHover={setHovered} />
          <div style={{ width: 1, backgroundColor: '#DDDDDD', alignSelf: 'stretch' }} />
          <MonthCalendar month={nextMonth} checkIn={checkIn} checkOut={checkOut} onDayClick={handleDayClick} hovered={hovered} onDayHover={setHovered} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <button
          onClick={() => { setCheckIn(null); setCheckOut(null); setSelecting('in'); setDateRange(null, null); }}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: '#222222', textDecoration: 'underline' }}
        >
          Clear dates
        </button>
      </div>
    </div>
  );
}
