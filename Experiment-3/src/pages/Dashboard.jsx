import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";
import RoleBadge from "../components/RoleBadge";
import ContentManager from "../components/ContentManager";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <section className="panel">
        <div className="panel__header">
          <div>
            <div className="panel__eyebrow">Signed in as</div>
            <h1 className="panel__title">{user?.name}</h1>
          </div>
          <RoleBadge role={user?.role} />
        </div>
        <p className="panel__hint">
          Your session stays active and renews itself automatically — you'll be signed out
          on its own if it ever goes stale, no action needed.
        </p>
      </section>

      {user?.role === "admin" && (
        <section className="panel panel--admin">
          <h2 className="panel__subtitle">Admin console</h2>
          <p className="panel__hint">
            User list — visible only to <code>admin</code>.
          </p>
          <table className="mock-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ada Cortez</td>
                <td><RoleBadge role="admin" size="sm" /></td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Milo Feng</td>
                <td><RoleBadge role="editor" size="sm" /></td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Priya Nair</td>
                <td><RoleBadge role="viewer" size="sm" /></td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      <section className={`panel panel--${user?.role}`}>
        <h2 className="panel__subtitle">
          {user?.role === "viewer" ? "Content feed" : "Content workspace"}
        </h2>
        <p className="panel__hint">
          {user?.role === "admin" && (
            <>Full control — create, edit, and delete any post.</>
          )}
          {user?.role === "editor" && (
            <>You can create and edit posts, but not delete them.</>
          )}
          {user?.role === "viewer" && <>Read-only — you can see posts but not change them.</>}
        </p>
        <ContentManager
          canCreate={hasPermission(user?.role, "create_content")}
          canEdit={hasPermission(user?.role, "edit_content")}
          canDelete={hasPermission(user?.role, "delete_content")}
          currentUserName={user?.name}
        />
      </section>

    </div>
  );
}
