# JWT Authentication + RBAC Demo (Frontend Only)

A React + Vite project implementing JWT-based auth and role-based
route protection — **without a backend**. Token issuing/verification
is simulated entirely in the browser so you can run and demo the
whole flow with zero server setup.

## What's included

| Topic | Where it lives |
|---|---|
| JWT structure & token generation | `src/utils/jwt.js` |
| Mock backend (user table, login, refresh) | `src/utils/auth.js` |
| Token storage (localStorage) | `src/utils/auth.js` |
| Axios interceptors (attach token, handle 401) | `src/utils/axiosInstance.js` |
| Token expiry + refresh mechanism | `src/context/AuthContext.jsx` + `axiosInstance.js` |
| RBAC permissions map | `src/utils/permissions.js` |
| Protected routes | `src/components/ProtectedRoute.jsx` |
| Conditional UI by role | `src/components/Navbar.jsx`, `src/pages/Dashboard.jsx` |
| Auth state management | `src/context/AuthContext.jsx` |

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Demo accounts

| Username | Password | Role |
|---|---|---|
| admin | admin123 | admin |
| editor | editor123 | editor |
| viewer | viewer123 | viewer |

Log in on the Login page, or click one of the demo-account chips to
autofill the form.

## Things to try

- Log in as `viewer` and try visiting `/admin` directly — you'll get
  redirected to `/unauthorized` (RBAC enforced at the route level).
- Log in as `admin` and open the Dashboard — the "Admin" nav link and
  the amber admin panel only appear for roles with the `manage_users`
  permission.
- Watch the "Access token expires in" counter on the Dashboard — the
  access token is intentionally short-lived (60s) so you can see it
  expire, then click "Refresh token now" to see the refresh flow mint
  a new one without logging in again.
- Click "GET /posts/1" on the Dashboard — fires a real request through
  the axios instance, which auto-attaches
  `Authorization: Bearer <token>` via the request interceptor, against
  the public jsonplaceholder test API.
- Open the "Decoded access token" panel — the header/payload/signature
  strip is color-coded; hover a segment to see its full base64url value.

## Why there's no backend

`src/utils/auth.js` plays the role of a backend: it holds a mock user
table and issues tokens the same shape a real server would
(`HEADER.PAYLOAD.SIGNATURE`, base64url encoded). The rest of the app —
interceptors, protected routes, RBAC, conditional rendering — is
written exactly as it would be against a real API.

To wire this up to a real backend later:
1. Replace `login()` and `refreshAccessToken()` in `src/utils/auth.js`
   with real `axios.post("/auth/login", ...)` / `/auth/refresh` calls.
2. Have the server sign tokens with a real secret/private key
   (e.g. using `jsonwebtoken` in Node).
3. Point `axiosInstance.js`'s `baseURL` at your real API.

Everything else (RBAC, route guards, conditional rendering, token
lifecycle handling) needs no changes.

## Notes on the mock JWT

`src/utils/jwt.js` builds tokens with the correct three-part JWT shape
so you can inspect them (e.g. paste the raw token into jwt.io to see
header/payload). The "signature" is a simple non-cryptographic hash —
enough to catch accidental tampering in this demo, but **not** a real
security mechanism. A production system must sign and verify tokens on
a server that holds the secret.

## Design

Dark "access clearance" theme: Space Grotesk for headings, Inter for
body text, JetBrains Mono for tokens/code. Each role (admin / editor /
viewer) has its own accent color, reused consistently in badges, the
token inspector, and the permissions list.
