import React, { useMemo } from "react";
import DayColumn from "./DayColumn.jsx";
import { WEEK_DAYS } from "../data/initialEvents.js";

/**
 * Groups events by day with useMemo, so the (events -> map) computation
 * only re-runs when the events array actually changes — mirrors the
 * "useMemo — expensive computation optimization" section of the
 * practical (there it's a filter; here it's a full grouping pass, same
 * idea: cache a derived value, recompute only on the relevant dependency).
 */
export default function Calendar({ events, draggedId, onDragStart, onMoveEvent, onDelete, onToggleComplete }) {
  const eventsByDay = useMemo(() => {
    const map = Object.fromEntries(WEEK_DAYS.map((day) => [day, []]));
    for (const event of events) {
      (map[event.day] ?? (map[event.day] = [])).push(event);
    }
    for (const day of WEEK_DAYS) {
      map[day].sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [events]);

  return (
    <div className="calendar-grid">
      {WEEK_DAYS.map((day) => (
        <DayColumn
          key={day}
          day={day}
          events={eventsByDay[day]}
          draggedId={draggedId}
          onDragStart={onDragStart}
          onMoveEvent={onMoveEvent}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}
