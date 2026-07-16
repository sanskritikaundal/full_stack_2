export default function ProgressBar({ percent, status }) {
  const color =
    status === "exceeded" ? "#B23A2E" : status === "danger" ? "#C9532C" : status === "warning" ? "#C98A2C" : "#4B7A5B";
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Characters used"
      className="w-full h-2 rounded-full overflow-hidden"
      style={{ background: "var(--ink-10)" }}
    >
      <div
        className="h-full transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  );
}
