# Interactive Calendar — Experiment 4

An implementation of Unit 1 / Experiment 4 ("Interactive Calendar Optimization &
Testing"): a weekly calendar built with React, optimized against unnecessary
re-renders, and covered by React Testing Library + MSW tests.

Theme: a soft, minimal, "royal" palette — deep plum and antique gold on ivory
paper — kept deliberately quiet (one accent color, thin hairlines, no heavy
card shadows).

## Features

- **Add an event** — the "Add event" button opens a form (title, day, time,
  category).
- **Delete an event** — the `×` on any card removes it.
- **Mark complete** — the checkbox on a card toggles a done state.
- **Drag-and-drop rescheduling** — drag a card onto another day's column to
  move it there.

## Run it in VS Code

1. Unzip the project and open the folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the printed local URL (usually `http://localhost:5173`) in your browser.

## Run the tests

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # with a coverage report (Section 7 of the practical)
```

Tests use [Vitest](https://vitest.dev) with a Jest-compatible API
(`describe`/`test`/`expect`), [React Testing Library](https://testing-library.com/react)
for behavior-focused component tests, and [MSW](https://mswjs.io) to mock the
`/api/events` endpoint at the network layer.

## Where each concept from the practical lives

| Concept | File |
| --- | --- |
| `React.memo` (avoid unnecessary re-renders) | `src/components/EventCard.jsx`, `src/components/DayColumn.jsx` |
| `useMemo` (cache a derived computation) | `src/components/Calendar.jsx` (grouping events by day) |
| `useCallback` (stable handler references) | `src/App.jsx` |
| `React.lazy` + `Suspense` (code splitting) | `src/App.jsx` (the Add Event modal) |
| Drag-and-drop (source / target / state update) | `src/components/EventCard.jsx`, `src/components/DayColumn.jsx` |
| React Testing Library | `src/tests/EventCard.test.jsx`, `src/tests/App.test.jsx` |
| MSW API mocking | `src/mocks/`, `src/tests/eventsApi.test.js` |
| Test coverage | `npm run test:coverage` |

## Optional: enable MSW in the browser

The app runs entirely on local React state by default, so no backend or
service worker is required to use it. If you want to wire the app up to
`fetchEvents()` from `src/api/eventsApi.js` for a live demo of MSW in the
browser (not just in tests), generate the service worker file once:

```bash
npx msw init public/ --save
```

Then start `worker.start()` from `src/mocks/browser.js` before rendering the
app in `src/main.jsx`, guarded behind a dev-only check.

## Project structure

```
interactive-calendar/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/App.css
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── DayColumn.jsx
│   │   ├── EventCard.jsx
│   │   └── AddEventModal.jsx
│   ├── data/initialEvents.js
│   ├── api/eventsApi.js
│   ├── mocks/ (handlers.js, server.js, browser.js)
│   └── tests/ (EventCard.test.jsx, App.test.jsx, eventsApi.test.js, setup.js)
```
