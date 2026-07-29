// src/components/StatusFilter.jsx
//
// Reads/writes ui.statusFilter — pure UI state, separate from posts data
// state, per the "Separation of UI state and data state" pattern.

import { useDispatch, useSelector } from "react-redux";
import { selectStatusFilter, statusFilterChanged } from "../features/ui/uiSlice";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export default function StatusFilter() {
  const dispatch = useDispatch();
  const current = useSelector(selectStatusFilter);

  return (
    <div className="status-filter">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`chip ${current === opt.value ? "chip--active" : ""}`}
          onClick={() => dispatch(statusFilterChanged(opt.value))}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
