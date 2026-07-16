import { useEffect } from "react";

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md text-sm shadow-lg z-50 font-display"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      {message}
    </div>
  );
}
