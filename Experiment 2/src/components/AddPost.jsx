// src/components/AddPost.jsx
//
// Assignment 1: dispatches the postAdded action creator (a synchronous
// CRUD reducer). Uses the "prepare" callback defined in postsSlice to
// generate an id and default fields.

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/posts/postsSlice";
import { selectPlatforms } from "../features/platforms/platformsSlice";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export default function AddPost() {
  const dispatch = useDispatch();
  const platforms = useSelector(selectPlatforms);
  const [content, setContent] = useState("");
  const [platformId, setPlatformId] = useState(platforms[0]?.id ?? "");
  const [status, setStatus] = useState("draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || !platformId) return;
    dispatch(postAdded({ content: content.trim(), platformId, status }));
    setContent("");
  };

  return (
    <form className="add-post" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <div className="add-post__row">
        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
        >
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn--primary">
          Add Post
        </button>
      </div>
    </form>
  );
}
