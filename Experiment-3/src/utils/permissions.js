export const ROLE_PERMISSIONS = {
  admin: [
    "view_dashboard",
    "manage_users",
    "create_content",
    "edit_content",
    "delete_content",
    "view_reports",
  ],
  editor: ["view_dashboard", "create_content", "edit_content", "view_reports"],
  viewer: ["view_dashboard"],
};

export const ROLE_LABELS = {
  admin: "Administrator",
  editor: "Editor",
  viewer: "Viewer",
};

export function hasPermission(role, permission) {
  return Boolean(ROLE_PERMISSIONS[role]?.includes(permission));
}

export function permissionsFor(role) {
  return ROLE_PERMISSIONS[role] ?? [];
}
