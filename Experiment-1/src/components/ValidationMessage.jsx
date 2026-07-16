import { Check, AlertTriangle } from "lucide-react";

export default function ValidationMessage({ status, remaining, maxChars }) {
  const config = {
    valid: { icon: Check, text: "Valid post — ready to save", color: "#4B7A5B" },
    warning: { icon: AlertTriangle, text: `Getting close — ${remaining} characters left`, color: "#C98A2C" },
    danger: { icon: AlertTriangle, text: `Almost full — ${remaining} characters left`, color: "#C9532C" },
    exceeded: { icon: AlertTriangle, text: `Over the limit by ${Math.abs(remaining)} characters`, color: "#B23A2E" },
  }[status];

  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 text-sm font-medium font-display transition-colors duration-200"
      style={{ color: config.color }}
    >
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      <span>{config.text}</span>
      <span className="ml-auto opacity-60 font-mono">max {maxChars.toLocaleString()}</span>
    </div>
  );
}
