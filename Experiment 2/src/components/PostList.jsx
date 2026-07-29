// src/components/PostList.jsx
//
// Assignment 5: React.memo prevents re-rendering unless props actually change.
// PostItem is the child that gets memoized; PostList maps over the ids.

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDeleted, postsSelectors } from "../features/posts/postsSlice";

const PLATFORM_COLORS = {
  pl1: "#1d9bf0",
  pl2: "#e1306c",
  pl3: "#0a66c2",
};

const STATUS_LABEL = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
};

const PostItem = React.memo(function PostItem({ id, onDelete, onRenderTick }) {
  onRenderTick(id);
  const post = useSelector((state) => postsSelectors.selectById(state, id));

  if (!post) return null;

  return (
    <li className="post-card">
      <div
        className="post-card__stripe"
        style={{ background: PLATFORM_COLORS[post.platformId] ?? "#999" }}
      />
      <div className="post-card__body">
        <p className="post-card__content">{post.content}</p>
        <div className="post-card__meta">
          <span className={`badge badge--${post.status}`}>
            {STATUS_LABEL[post.status] ?? post.status}
          </span>
          <span className="post-card__date">
            {new Date(post.scheduledAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <button
        className="icon-btn"
        aria-label="Delete post"
        onClick={() => onDelete(post.id)}
      >
        ✕
      </button>
    </li>
  );
});

export default function PostList({ ids, onRenderTick }) {
  const dispatch = useDispatch();

  // useCallback keeps a stable function reference so PostItem's props
  // don't change identity on every PostList render -> React.memo can skip.
  const handleDelete = useCallback(
    (id) => dispatch(postDeleted(id)),
    [dispatch]
  );

  if (ids.length === 0) {
    return <p className="empty-state">No posts match this filter yet.</p>;
  }

  return (
    <ul className="post-list">
      {ids.map((id) => (
        <PostItem
          key={id}
          id={id}
          onDelete={handleDelete}
          onRenderTick={onRenderTick}
        />
      ))}
    </ul>
  );
}
