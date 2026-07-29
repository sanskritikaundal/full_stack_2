// src/components/RenderMeter.jsx
//
// Assignment 5: "Measure re-render improvements". Every time a PostItem
// renders, it reports its id here. Because PostItem is wrapped in
// React.memo and receives a stable onDelete callback (useCallback), adding
// a new post or changing the filter should NOT re-render unrelated rows —
// this panel makes that visible instead of just asserting it.

export default function RenderMeter({ renders, onClear }) {
  return (
    <div className="render-meter">
      <div className="render-meter__header">
        <h3>Render meter</h3>
        <button className="btn btn--ghost" onClick={onClear}>
          Clear
        </button>
      </div>
      <p className="render-meter__hint">
        Rows lighting up below just re-rendered. Try adding a post or
        deleting one — untouched rows should stay dark, thanks to
        React.memo + useCallback.
      </p>
      <div className="render-meter__pills">
        {renders.length === 0 && (
          <span className="render-meter__empty">No renders logged yet</span>
        )}
        {renders.map((r, i) => (
          <span key={i} className="render-meter__pill">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
