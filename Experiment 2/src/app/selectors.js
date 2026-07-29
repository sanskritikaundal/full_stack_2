// src/app/selectors.js
//
// Cross-slice selectors live at the app level rather than inside a single
// feature slice, since they read from more than one domain (posts + ui).
// Still memoized with createSelector so filtering doesn't recompute unless
// posts or the filter actually change.

import { createSelector } from "@reduxjs/toolkit";
import { postsSelectors } from "../features/posts/postsSlice";
import { selectStatusFilter } from "../features/ui/uiSlice";

export const selectFilteredPostIds = createSelector(
  [postsSelectors.selectAll, selectStatusFilter],
  (posts, statusFilter) => {
    const filtered =
      statusFilter === "all"
        ? posts
        : posts.filter((post) => post.status === statusFilter);
    return filtered.map((post) => post.id);
  }
);
