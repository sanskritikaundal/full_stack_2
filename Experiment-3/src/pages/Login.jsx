import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_ACCOUNTS } from "../utils/auth";
import RoleBadge from "../components/RoleBadge";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    try {
      await login(username, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message);
    }
  }

  function fillDemo(account) {
    setUsername(account.username);
    setPassword(account.password);
    setFormError(null);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__eyebrow">Access control demo</div>
        <h1 className="auth-card__title">Sign in to Clearance</h1>
        <p className="auth-card__subtitle">
          Frontend-only JWT auth — tokens are issued in your browser, no server involved.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span className="field__label">Username</span>
            <input
              className="field__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              className="field__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {formError && <div className="auth-form__error">{formError}</div>}

          <button className="btn btn--primary btn--block" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="demo-accounts">
          <div className="demo-accounts__label">Demo accounts — tap to autofill</div>
          <div className="demo-accounts__list">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.username}
                type="button"
                className="demo-chip"
                onClick={() => fillDemo(acc)}
              >
                <RoleBadge role={acc.role} size="sm" />
                <span className="demo-chip__creds">
                  {acc.username} / {acc.password}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
