// src/features/platforms/platformsSlice.js
//
// A simpler, non-normalized "domain slice" — deliberately kept as a flat
// list to contrast with the entity-adapter approach used for posts (see
// "State Design Patterns" section of the experiment: not every slice needs
// full normalization, only ones with heavy relational lookups).

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchPlatforms } from "../../api/mockApi";

export const fetchPlatforms = createAsyncThunk(
  "platforms/fetchPlatforms",
  async () => {
    return await apiFetchPlatforms();
  }
);

const platformsSlice = createSlice({
  name: "platforms",
  initialState: {
    list: [],
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatforms.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPlatforms.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPlatforms.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export default platformsSlice.reducer;

export const selectPlatforms = (state) => state.platforms.list;
export const selectPlatformsLoading = (state) => state.platforms.loading;
