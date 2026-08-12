import { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../utils/content";

const STATUS_OPTIONS = ["draft", "in review", "published"];

export default function ContentManager({ canCreate, canEdit, canDelete, currentUserName }) {
  const [posts, setPosts] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("draft");

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  function refresh() {
    setPosts(getPosts());
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createPost({ title: newTitle, status: "draft", authorName: currentUserName });
    setNewTitle("");
    setCreating(false);
    refresh();
  }

  function startEdit(post) {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditStatus(post.status);
  }

  function saveEdit(id) {
    updatePost(id, { title: editTitle.trim() || "Untitled post", status: editStatus });
    setEditingId(null);
    refresh();
  }

  function handleDelete(id) {
    deletePost(id);
    refresh();
  }

  return (
    <div className="content-manager">
      {canCreate && (
        <div className="content-manager__create">
          {creating ? (
            <form className="content-form" onSubmit={handleCreate}>
              <input
                className="field__input"
                placeholder="New post title…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              <button className="btn btn--primary" type="submit">
                Create
              </button>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => {
                  setCreating(false);
                  setNewTitle("");
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button className="btn btn--secondary" onClick={() => setCreating(true)}>
              + New post
            </button>
          )}
        </div>
      )}

      <ul className="content-list">
        {posts.map((post) => {
          const isEditing = editingId === post.id;
          return (
            <li className="content-list__item" key={post.id}>
              {isEditing ? (
                <div className="content-form content-form--inline">
                  <input
                    className="field__input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />
                  <select
                    className="field__input content-form__select"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn--primary" onClick={() => saveEdit(post.id)}>
                    Save
                  </button>
                  <button className="btn btn--ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="content-list__main">
                    <span className={`status-badge status-badge--${post.status.replace(" ", "-")}`}>
                      {post.status}
                    </span>
                    <span className="content-list__title">{post.title}</span>
                    <span className="content-list__author">— {post.authorName}</span>
                  </div>
                  <div className="content-list__actions">
                    {canEdit && (
                      <button className="btn btn--ghost btn--sm" onClick={() => startEdit(post)}>
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </li>
          );
        })}
        {posts.length === 0 && <li className="content-list__empty">No posts yet.</li>}
      </ul>
    </div>
  );
}
