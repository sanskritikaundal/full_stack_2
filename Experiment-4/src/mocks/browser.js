import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

// Optional: only needed if you wire the app up to call fetchEvents()
// from src/api/eventsApi.js in the browser instead of using local state.
// See README.md "Optional: enable MSW in the browser".
export const worker = setupWorker(...handlers);
