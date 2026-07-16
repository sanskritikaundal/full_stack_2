export default function PlatformSelector({ platforms, selected, onSelect }) {
  return (
    <div role="radiogroup" aria-label="Choose a platform" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {platforms.map((p) => {
        const Icon = p.icon;
        const active = p.id === selected.id;
        return (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(p)}
            className="group relative flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded font-display transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: active ? "var(--paper)" : "var(--paper-dim)",
              border: `1.5px dashed ${active ? p.seal : "var(--ink-30)"}`,
              color: active ? p.ink : "var(--ink-60)",
              boxShadow: active ? "0 3px 0 0 var(--ink-15)" : "none",
              transform: active ? "translateY(-2px)" : "translateY(0)",
              outlineColor: p.seal,
            }}
          >
            {/* perforation dots along the top edge, like a real stamp */}
            <span aria-hidden="true" className="absolute -top-1.5 left-0 right-0 flex justify-between px-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="block w-1.5 h-1.5 rounded-full" style={{ background: "var(--page-bg)" }} />
              ))}
            </span>
            <Icon size={20} strokeWidth={1.75} />
            <span className="text-xs tracking-wide">{p.label}</span>
            {active && (
              <span
                className="absolute -bottom-2 -right-2 rounded-full flex items-center justify-center w-5 h-5 text-[10px] font-bold"
                style={{ background: p.seal, color: "var(--paper)" }}
                aria-hidden="true"
              >
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
