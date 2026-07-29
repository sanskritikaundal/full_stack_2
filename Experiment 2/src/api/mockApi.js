// src/api/mockApi.js
//
// A tiny mock "backend" so the app can demonstrate createAsyncThunk's
// pending / fulfilled / rejected lifecycle without needing a real server.
// Swap this out for real fetch("/api/...") calls whenever a backend exists.

const MOCK_POSTS = [
  {
    id: "p1",
    content: "Launching our new product today! 🚀",
    platformId: "pl1",
    scheduledAt: "2026-08-01T09:00:00Z",
    status: "scheduled",
  },
  {
    id: "p2",
    content: "Behind the scenes of our design process.",
    platformId: "pl2",
    scheduledAt: "2026-08-02T14:30:00Z",
    status: "draft",
  },
  {
    id: "p3",
    content: "Quick tip",
    platformId: "pl1",
    scheduledAt: "2026-08-03T11:00:00Z",
    status: "scheduled",
  },
  {
    id: "p4",
    content:
      "A longer post that goes into detail about our quarterly roadmap and what customers can expect over the next few months.",
    platformId: "pl3",
    scheduledAt: "2026-08-05T16:00:00Z",
    status: "published",
  },
];

const MOCK_PLATFORMS = [
  { id: "pl1", name: "X / Twitter", color: "#1d9bf0" },
  { id: "pl2", name: "Instagram", color: "#e1306c" },
  { id: "pl3", name: "LinkedIn", color: "#0a66c2" },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiFetchPosts({ shouldFail = false } = {}) {
  await delay(700);
  if (shouldFail) {
    throw new Error("Network error: unable to reach posts service");
  }
  return MOCK_POSTS;
}

export async function apiFetchPlatforms() {
  await delay(400);
  return MOCK_PLATFORMS;
}

export async function apiCreatePost(post) {
  await delay(300);
  return { ...post, id: post.id ?? `p${Date.now()}` };
}
