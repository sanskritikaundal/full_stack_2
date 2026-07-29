# Content Studio — Redux Toolkit State Management

A working React + Redux Toolkit app built from **Unit 1, Experiment 2 —
Redux-Based Content State Management**. It implements centralized state for
posts and platforms with normalization, async data fetching, memoized
selectors, and render-optimized components.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

No backend is required — `src/api/mockApi.js` simulates network calls with
`setTimeout`, so `createAsyncThunk` has something real to await.

## Project structure

```
src/
├── api/
│   └── mockApi.js            # simulated backend (posts, platforms)
├── app/
│   ├── store.js              # configureStore — single source of truth
│   └── selectors.js          # cross-slice memoized selector
├── features/
│   ├── posts/
│   │   └── postsSlice.js     # createSlice + createAsyncThunk +
│   │                         # createEntityAdapter + createSelector
│   ├── platforms/
│   │   └── platformsSlice.js # simple flat-list slice
│   └── ui/
│       └── uiSlice.js        # UI state kept separate from data state
├── components/
│   ├── AddPost.jsx
│   ├── PostList.jsx          # React.memo + useCallback
│   ├── StatusFilter.jsx
│   ├── Analytics.jsx         # reads only from derived selectors
│   └── RenderMeter.jsx       # visualizes which rows re-rendered
├── App.jsx
├── main.jsx                  # <Provider store={store}>
└── index.css
```

## How each assignment maps to the code

**Assignment 1 — Redux Slice Implementation**
`features/posts/postsSlice.js` defines `initialState`, and the `postAdded`,
`postUpdated`, `postDeleted` reducers. `components/AddPost.jsx` and
`PostList.jsx` connect them to the UI via `useDispatch`/`useSelector`.

**Assignment 2 — Async Data Handling**
`fetchPosts` in `postsSlice.js` is a `createAsyncThunk` that calls the mock
API. `extraReducers` handles `pending` / `fulfilled` / `rejected`, and
`App.jsx` renders a loading state and an error state accordingly.

**Assignment 3 — State Normalization**
Posts are stored as `{ ids: [], entities: {} }` via `createEntityAdapter`
instead of a nested array, so lookups by id are O(1) and updates never
require scanning the whole list. `postsAdapter.setAll` / `addOne` /
`updateOne` / `removeOne` handle the flat structure for you.

**Assignment 4 — Selector Optimization**
`selectShortPosts`, `selectPostsByPlatform`, and `selectPostAnalytics` are
all built with `createSelector` (reselect, bundled with Redux Toolkit), so
they only recompute when the posts they depend on actually change — not on
every store update. `Analytics.jsx` is powered entirely by these.

**Assignment 5 — Performance Optimization**
`PostList.jsx` wraps each row in `React.memo` and passes it a
`useCallback`-stabilized delete handler, so unrelated rows don't re-render
when one post is added or removed. `RenderMeter.jsx` logs every actual
render so you can *see* the effect instead of taking it on faith — add a
post or switch the status filter and watch which rows light up.

## Notable design choices

- **`ui` slice vs `posts`/`platforms` slices** — the status filter lives in
  its own slice, separate from server-derived data, per the experiment's
  "Separation of UI state and data state" pattern.
- **`app/selectors.js`** — the filtered post-id list needs both `posts` and
  `ui` state, so it lives at the app level rather than inside a single
  feature slice, while still staying memoized with `createSelector`.
- **`sortComparer`** on the entity adapter keeps posts ordered by schedule
  date automatically, without a separate sort step in components.

## Extending it

- Point `src/api/mockApi.js` at a real backend by replacing the `fetch`
  calls — the thunks and reducers don't need to change.
- Add a `drafts` slice the same way `platforms` is structured if you want
  drafts to be a distinct domain from published/scheduled posts.
