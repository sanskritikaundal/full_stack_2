import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import {
  login as loginRequest,
  refreshAccessToken,
  saveSession,
  loadSession,
  clearSession,
} from "../utils/auth";
import { isTokenExpired, decodeToken } from "../utils/jwt";

const AuthContext = createContext(null);

// Refresh this many seconds before the access token actually expires,
// so a silent renewal always lands before the user would see "0s".
const REFRESH_LEAD_SECONDS = 10;

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const refreshingRef = useRef(false);

  const isAuthenticated = Boolean(session?.accessToken && !isTokenExpired(session.refreshToken));

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginRequest(username, password);
      setSession(result);
      saveSession(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    clearSession();
  }, []);

  const refresh = useCallback(async () => {
    if (!session?.refreshToken) return;
    try {
      const { accessToken } = await refreshAccessToken(session.refreshToken);
      const updated = { ...session, accessToken };
      setSession(updated);
      saveSession(updated);
      return updated;
    } catch (err) {
      logout();
      throw err;
    }
  }, [session, logout]);

  // Single ticking effect that drives both automatic behaviors:
  //  1. Auto-refresh: silently renews the access token shortly before it expires.
  //  2. Auto-revoke: if the refresh token itself has expired, the session is
  //     cleared automatically — the person is signed out with no action needed.
  useEffect(() => {
    if (!session?.refreshToken) return;

    const id = setInterval(async () => {
      // Revoke: refresh token (the thing that actually keeps the session
      // alive) has expired — end the session automatically.
      if (isTokenExpired(session.refreshToken)) {
        logout();
        return;
      }

      // Auto-refresh: access token is about to run out — renew it quietly.
      const decoded = decodeToken(session.accessToken);
      if (!decoded) return;
      const secondsLeft = decoded.payload.exp - Math.floor(Date.now() / 1000);

      if (secondsLeft <= REFRESH_LEAD_SECONDS && !refreshingRef.current) {
        refreshingRef.current = true;
        try {
          await refresh();
        } catch {
          // refresh() already logs out on failure
        } finally {
          refreshingRef.current = false;
        }
      }
    }, 1000);

    return () => clearInterval(id);
  }, [session, logout, refresh]);

  const value = {
    user: session?.user ?? null,
    accessToken: session?.accessToken ?? null,
    refreshToken: session?.refreshToken ?? null,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
