import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server.js";
import { fetchEvents } from "../api/eventsApi.js";

// Demonstrates API mocking with MSW: the network call in fetchEvents()
// is intercepted at the network layer, never hitting a real backend.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fetchEvents", () => {
  test("returns the mocked events from the handler", async () => {
    const events = await fetchEvents();
    expect(events).toEqual([
      { id: "mock-1", title: "Mock Event", day: "Monday", time: "10:00", category: "Work", completed: false },
    ]);
  });

  test("throws when the API responds with an error", async () => {
    server.use(
      http.get("/api/events", () => HttpResponse.json({ message: "Server error" }, { status: 500 }))
    );

    await expect(fetchEvents()).rejects.toThrow("Failed to load events");
  });
});
