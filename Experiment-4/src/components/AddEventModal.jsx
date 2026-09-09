import React, { useState } from "react";
import { WEEK_DAYS, CATEGORIES } from "../data/initialEvents.js";

export default function AddEventModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(WEEK_DAYS[0]);
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: `evt-${Date.now()}`,
      title: title.trim(),
      day,
      time,
      category,
      completed: false,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Add event">
        <h2>Add event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="event-title">Title</label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Team standup"
              autoFocus
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="event-day">Day</label>
            <select id="event-day" value={day} onChange={(e) => setDay(e.target.value)}>
              {WEEK_DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="event-time">Time</label>
            <input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="event-category">Category</label>
            <select id="event-category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Add event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
