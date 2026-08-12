import { ROLE_LABELS } from "../utils/permissions";

export default function RoleBadge({ role, size = "md" }) {
  return (
    <span className={`role-badge role-badge--${role} role-badge--${size}`}>
      <span className="role-badge__dot" />
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}
