import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";
import RoleBadge from "./RoleBadge";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__mark">◈</span>
        <span>Clearance</span>
      </div>

      <nav className="navbar__links">
        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {hasPermission(user?.role, "manage_users") && <Link to="/admin">Admin</Link>}
          </>
        )}
      </nav>

      <div className="navbar__account">
        {isAuthenticated ? (
          <>
            <RoleBadge role={user?.role} size="sm" />
            <span className="navbar__username">{user?.name}</span>
            <button className="btn btn--ghost" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <Link className="btn btn--primary" to="/login">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
