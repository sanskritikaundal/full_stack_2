import React, { useState, useCallback } from "react";
import EventCard from "./EventCard.jsx";

/**
 * A single day's drop target. Drag-and-drop follows the three core
 * concepts from the practical: drag source (EventCard), drop target
 * (this column), and a state update on drop (onMoveEvent).
 */
function DayColumn({ day, events, draggedId, onDragStart, onMoveEvent, onDelete, onToggleComplete }) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // required so onDrop fires
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsOver(false), []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const eventId = e.dataTransfer.getData("text/plain");
      if (eventId) onMoveEvent(eventId, day);
    },
    [day, onMoveEvent]
  );

  return (
    <div
      className={`day-column${isOver ? " is-drop-target" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="day-column-header">{day}</div>
      <div className="event-list">
        {events.length === 0 && <p className="day-column-empty">No events</p>}
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isDragging={draggedId === event.id}
            onDragStart={onDragStart}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(DayColumn);
