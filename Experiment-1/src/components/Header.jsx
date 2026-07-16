import { Moon, Sun } from "lucide-react";

export default function Header({ dark, onToggleDark }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--ink-50)" }}>
          Dispatch desk
        </p>
        <h1 className="text-2xl sm:text-3xl font-display" style={{ color: "var(--ink)" }}>
          Post Composer
        </h1>
      </div>
      <button
        type="button"
        onClick={onToggleDark}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="p-2 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2"
        style={{ border: "1px solid var(--ink-20)", color: "var(--ink)", outlineColor: "var(--seal)" }}
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}
