import { createToken, decodeToken } from "./jwt";

// ---------------------------------------------------------------------------
// This file plays the role of a backend. It holds a mock user table and
// issues tokens the same shape a real auth server would. Swap login() and
// refreshAccessToken() for real axios.post("/auth/login" | "/auth/refresh")
// calls when you wire this up to an actual API — nothing else needs to
// change (see README).
// ---------------------------------------------------------------------------

const USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Ada Cortez" },
  { id: 2, username: "editor", password: "editor123", role: "editor", name: "Milo Feng" },
  { id: 3, username: "viewer", password: "viewer123", role: "viewer", name: "Priya Nair" },
];

const ACCESS_TOKEN_TTL = 60; // seconds — short so you can watch it expire
const REFRESH_TOKEN_TTL = 60 * 60 * 24; // 24 hours

const STORAGE_KEY = "jwt_rbac_demo_session";

function issueTokens(user) {
  const claims = { sub: user.id, username: user.username, role: user.role, name: user.name };
  return {
    accessToken: createToken(claims, ACCESS_TOKEN_TTL),
    refreshToken: createToken({ sub: user.id, type: "refresh" }, REFRESH_TOKEN_TTL),
  };
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    // simulate network latency
    setTimeout(() => {
      const user = USERS.find((u) => u.username === username && u.password === password);
      if (!user) {
        reject(new Error("Invalid username or password."));
        return;
      }
      const { accessToken, refreshToken } = issueTokens(user);
      const { password: _pw, ...safeUser } = user;
      resolve({ user: safeUser, accessToken, refreshToken });
    }, 450);
  });
}

export function refreshAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const decoded = decodeToken(refreshToken);
      const now = Math.floor(Date.now() / 1000);

      if (!decoded || decoded.payload.type !== "refresh" || decoded.payload.exp <= now) {
        reject(new Error("Refresh token invalid or expired. Please log in again."));
        return;
      }

      const user = USERS.find((u) => u.id === decoded.payload.sub);
      if (!user) {
        reject(new Error("User no longer exists."));
        return;
      }

      const { accessToken } = issueTokens(user);
      resolve({ accessToken });
    }, 350);
  });
}

// --- local storage helpers --------------------------------------------------

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export const DEMO_ACCOUNTS = USERS.map(({ username, password, role }) => ({
  username,
  password,
  role,
}));
