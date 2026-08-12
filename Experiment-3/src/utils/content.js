// ---------------------------------------------------------------------------
// A tiny localStorage-backed "posts" store. This plays the role of a
// content API — there's no server, but it behaves like real content data:
// it persists across reloads and every role reads from the same source.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "jwt_rbac_demo_posts";

const SEED_POSTS = [
  { id: "p1", title: "Release notes 1.4", status: "published", authorName: "Milo Feng" },
  { id: "p2", title: "Company handbook", status: "published", authorName: "Ada Cortez" },
  { id: "p3", title: "Onboarding guide v2", status: "in review", authorName: "Milo Feng" },
  { id: "p4", title: "Q3 roadmap update", status: "draft", authorName: "Milo Feng" },
];

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_POSTS;
  }
}

function writeAll(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getPosts() {
  return readAll().sort((a, b) => (a.id < b.id ? 1 : -1));
}

export function createPost({ title, status, authorName }) {
  const posts = readAll();
  const post = {
    id: `p${Date.now()}`,
    title: title.trim() || "Untitled post",
    status: status || "draft",
    authorName,
  };
  writeAll([...posts, post]);
  return post;
}

export function updatePost(id, updates) {
  const posts = readAll().map((p) => (p.id === id ? { ...p, ...updates } : p));
  writeAll(posts);
}

export function deletePost(id) {
  const posts = readAll().filter((p) => p.id !== id);
  writeAll(posts);
}
