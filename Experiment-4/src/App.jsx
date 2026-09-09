import React, { useState, useCallback, Suspense, lazy } from "react";
import Calendar from "./components/Calendar.jsx";
import { initialEvents } from "./data/initialEvents.js";

// Code-splitting: the modal (and its form logic) is only downloaded
// once the user actually asks to add an event, mirroring the
// "React.lazy + Suspense" section of the practical.
const AddEventModal = lazy(() => import("./components/AddEventModal.jsx"));

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedId, setDraggedId] = useState(null);

  // Add a new event/task.
  const handleAddEvent = useCallback((newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
  }, []);

  // Delete an existing event/task.
  const handleDeleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  // Toggle an event's completed state (a lightweight extra permission
  // alongside add/delete, wired the same way).
  const handleToggleComplete = useCallback((id) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, completed: !event.completed } : event))
    );
  }, []);

  // Drag-and-drop rescheduling: state update on drop.
  const handleMoveEvent = useCallback((id, newDay) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, day: newDay } : event)));
    setDraggedId(null);
  }, []);

  const handleDragStart = useCallback((e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedId(id);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Weekly calendar</h1>
          <p>Drag a card to a new day to reschedule it.</p>
        </div>
        <button type="button" className="add-event-button" onClick={() => setIsModalOpen(true)}>
          Add event
        </button>
      </header>

      <Calendar
        events={events}
        draggedId={draggedId}
        onDragStart={handleDragStart}
        onMoveEvent={handleMoveEvent}
        onDelete={handleDeleteEvent}
        onToggleComplete={handleToggleComplete}
      />

      {isModalOpen && (
        <Suspense fallback={<div className="modal-backdrop"><p className="modal-loading">Loading form…</p></div>}>
          <AddEventModal onAdd={handleAddEvent} onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
