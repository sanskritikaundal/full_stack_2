// src/App.jsx
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPostsLoading,
  selectPostsError,
} from "./features/posts/postsSlice";
import { fetchPlatforms } from "./features/platforms/platformsSlice";
import { selectFilteredPostIds } from "./app/selectors";

import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import StatusFilter from "./components/StatusFilter";
import Analytics from "./components/Analytics";
import RenderMeter from "./components/RenderMeter";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const filteredIds = useSelector(selectFilteredPostIds);

  const [renders, setRenders] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPlatforms());
  }, [dispatch]);

  // Stable callback so it doesn't defeat React.memo on PostItem
  const handleRenderTick = useCallback((id) => {
    setRenders((prev) => [...prev.slice(-24), id]);
  }, []);

  const clearRenders = useCallback(() => setRenders([]), []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Redux Social Media Dashboard</h1>
        <p className="app__subtitle">Redux Toolkit State Management Experiment</p>
      </header>

      <main className="app__content">
        <Analytics />

        <section className="panel">
          <h2>Create New Post</h2>
          <AddPost />
        </section>

        <section className="panel">
          <div className="panel__row">
            <h2>Posts</h2>
            <StatusFilter />
          </div>

          {loading === "pending" && (
            <p className="status-line">Loading posts…</p>
          )}
          {loading === "failed" && (
            <p className="status-line status-line--error">
              Failed to load posts: {error}
            </p>
          )}
          {(loading === "succeeded" || loading === "idle") && (
            <PostList ids={filteredIds} onRenderTick={handleRenderTick} />
          )}
        </section>

        <section className="panel">
          <RenderMeter renders={renders} onClear={clearRenders} />
        </section>
      </main>
    </div>
  );
}
