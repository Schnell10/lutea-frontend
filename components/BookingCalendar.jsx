import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useBookingStore } from '../store/useBookingStore';
import data from '../data-card.json';

export default function BookingCalendar() {
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const setDate = useBookingStore((s) => s.setDate);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const retreat = data.find((r) => r.id === selectedRetreatId);
  const availableDates = retreat?.dates || [];

  // Trouve le bloc sélectionné
  const selectedBlock = availableDates.find(({ start, end }) => {
    if (!selectedDate) return false;
    // Utiliser toLocaleDateString pour éviter les problèmes de timezone
    const selectedDateStr = selectedDate.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
    return selectedDateStr >= start && selectedDateStr <= end;
  });

  // Définit la vue initiale sur le mois de la première retraite
  useEffect(() => {
    if (availableDates.length > 0) {
      const firstRetreatDate = new Date(availableDates[0].start);
      setActiveStartDate(firstRetreatDate);
    }
  }, [availableDates]);

  // Récupère tous les jours disponibles pour les retraites
  function getAllRetreatDays(dates) {
    const days = new Set();
    dates.forEach(({ start, end }) => {
      let d = new Date(start + 'T00:00:00');
      const endDate = new Date(end + 'T00:00:00');
      while (d <= endDate) {
        days.add(d.toLocaleDateString('en-CA')); // Format YYYY-MM-DD
        d.setDate(d.getDate() + 1);
      }
    });
    return Array.from(days);
  }

  const validDays = getAllRetreatDays(availableDates);

  // Quand on clique sur un jour, on sélectionne tout le bloc
  function handleDayClick(date) {
    const bloc = getBlockForDate(date);
    if (bloc) {
      setDate(new Date(bloc.start));
    }
  }

  // Trouve le bloc correspondant à une date
  function getBlockForDate(date) {
    const iso = date.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
    const block = availableDates.find(({ start, end }) => {
      return iso >= start && iso <= end;
    });
    if (block) {
      return {
        ...block,
        start: block.start,
        end: block.end,
      };
    }
    return block;
  }

  return (
    <div className="booking-calendar">
      <h2 className="booking-calendar__title">Sélectionnez une date</h2>
      <Calendar
        maxDetail="month"
        value={selectedBlock ? [new Date(selectedBlock.start), new Date(selectedBlock.end)] : null}
        selectRange={false}
        onClickDay={handleDayClick}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        tileDisabled={({ date, view }) => {
          if (view !== 'month') return false;
          const iso = date.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
          return !validDays.includes(iso);
        }}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const iso = date.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
            // Bloc sélectionné : tous les jours du bloc sont colorés
            if (selectedBlock && iso >= selectedBlock.start && iso <= selectedBlock.end) {
              return 'booking-calendar__tile--selected';
            }
            // Bloc survolé
            if (hoveredBlock && iso >= hoveredBlock.start && iso <= hoveredBlock.end) {
              return 'booking-calendar__tile--hovered';
            }
            // Bloc réservable
            if (validDays.includes(iso)) {
              return 'booking-calendar__tile--available';
            }
          }
          return null;
        }}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const block = getBlockForDate(date);
            if (block) {
              return (
                <div
                  onMouseEnter={() => setHoveredBlock(block)}
                  onMouseLeave={() => setHoveredBlock(null)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    cursor: 'pointer',
                  }}
                />
              );
            }
          }
          return null;
        }}
      />
    </div>
  );
}
