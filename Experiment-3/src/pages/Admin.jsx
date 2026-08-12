import { useAuth } from "../context/AuthContext";
import RoleBadge from "../components/RoleBadge";

export default function Admin() {
  const { user } = useAuth();

  return (
    <div className="page">
      <section className="panel panel--admin">
        <div className="panel__header">
          <div>
            <div className="panel__eyebrow">Route-level RBAC</div>
            <h1 className="panel__title">Admin console</h1>
          </div>
          <RoleBadge role={user?.role} />
        </div>
        <p className="panel__hint">
          Reaching this page required both a valid session and a role with the{" "}
          <code>manage_users</code> permission. Anyone else hitting <code>/admin</code>{" "}
          directly is redirected to <code>/unauthorized</code> by{" "}
          <code>ProtectedRoute</code>.
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
    </div>
  );
}
