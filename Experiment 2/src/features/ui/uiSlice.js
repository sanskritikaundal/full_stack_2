// src/features/ui/uiSlice.js
//
// Demonstrates "Separation of UI state and data state" from the experiment's
// State Design Patterns section. Nothing here is server data — it's purely
// view/filter state, kept in its own slice so it can evolve independently.

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    statusFilter: "all", // 'all' | 'draft' | 'scheduled' | 'published'
    renderLog: [], // used by the Performance demo to visualize re-renders
  },
  reducers: {
    statusFilterChanged(state, action) {
      state.statusFilter = action.payload;
    },
    renderLogged(state, action) {
      state.renderLog.push(action.payload);
      if (state.renderLog.length > 50) state.renderLog.shift();
    },
  },
});

export const { statusFilterChanged, renderLogged } = uiSlice.actions;
export default uiSlice.reducer;

export const selectStatusFilter = (state) => state.ui.statusFilter;
