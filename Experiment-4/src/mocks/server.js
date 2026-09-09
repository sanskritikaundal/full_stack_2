import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

// Used by tests to intercept network calls at the network layer,
// so tests never hit a real backend.
export const server = setupServer(...handlers);
