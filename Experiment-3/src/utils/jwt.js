// ---------------------------------------------------------------------------
// A minimal, dependency-free stand-in for a real JWT library.
//
// This produces tokens with the correct three-part shape
// (HEADER.PAYLOAD.SIGNATURE, base64url encoded) so they can be inspected
// on the Dashboard or pasted into jwt.io. The "signature" is a small
// non-cryptographic hash — enough to catch accidental tampering in this
// demo, but NOT a real security mechanism. A production system signs and
// verifies tokens on a server that holds the secret.
// ---------------------------------------------------------------------------

function base64urlEncode(obj) {
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str) {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const json = decodeURIComponent(escape(atob(b64)));
  return JSON.parse(json);
}

// Deterministic, non-cryptographic hash used to fake a signature.
function fakeSign(headerPart, payloadPart, secret) {
  const input = `${headerPart}.${payloadPart}.${secret}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).padStart(12, "0");
}

const MOCK_SECRET = "demo-not-a-real-secret";

export function createToken(payload, expiresInSeconds) {
  const header = { alg: "HS256-mock", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const headerPart = base64urlEncode(header);
  const payloadPart = base64urlEncode(fullPayload);
  const signaturePart = fakeSign(headerPart, payloadPart, MOCK_SECRET);

  return `${headerPart}.${payloadPart}.${signaturePart}`;
}

export function decodeToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const header = base64urlDecode(parts[0]);
    const payload = base64urlDecode(parts[1]);
    return { header, payload, signature: parts[2] };
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.payload.exp <= now;
}

export function getTokenExpiry(token) {
  const decoded = decodeToken(token);
  return decoded ? decoded.payload.exp : null;
}
