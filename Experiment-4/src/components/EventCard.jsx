import React from "react";

const CATEGORY_COLORS = {
  Work: "var(--work)",
  Personal: "var(--personal)",
  Health: "var(--health)",
};

/**
 * EventCard is wrapped in React.memo (see export at the bottom).
 * With stable callback props (handleDragStart/onDelete/onToggleComplete
 * are all wrapped in useCallback in App.jsx) this card only re-renders
 * when its own `event` prop actually changes — not on every parent
 * re-render. This mirrors the "React.memo — component level
 * optimization" section of the practical.
 */
function EventCard({ event, onDragStart, onDelete, onToggleComplete, isDragging }) {
  return (
    <div
      className={`event-card${isDragging ? " is-dragging" : ""}`}
      style={{ "--category-color": CATEGORY_COLORS[event.category] }}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      data-testid={`event-${event.id}`}
    >
      <div className="event-card-top">
        <div className="event-card-main">
          <input
            type="checkbox"
            className="event-checkbox"
            checked={event.completed}
            onChange={() => onToggleComplete(event.id)}
            aria-label={`Mark "${event.title}" as ${event.completed ? "not done" : "done"}`}
          />
          <span>
            <span className="event-time">{event.time}</span>
            <span className={`event-title${event.completed ? " is-completed" : ""}`}>
              {event.title}
            </span>
          </span>
        </div>
        <button
          type="button"
          className="event-delete"
          onClick={() => onDelete(event.id)}
          aria-label={`Delete "${event.title}"`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default React.memo(EventCard);
