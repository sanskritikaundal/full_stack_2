// Demonstrates the "API mocking" learning objective from the practical
// (Section 6 — Mock Service Worker). This talks to /api/events, which has
// no real backend; in tests it is intercepted by MSW (see src/mocks),
// and in the browser it simply isn't called by default (the app runs on
// local state — see src/App.jsx) so no server is required to use the app.
export async function fetchEvents() {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to load events");
  }
  return response.json();
}
