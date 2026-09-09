import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json([
      { id: "mock-1", title: "Mock Event", day: "Monday", time: "10:00", category: "Work", completed: false },
    ]);
  }),
];
