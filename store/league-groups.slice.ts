import { httpGet } from "@/services/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type LeagueGroup = {
  id: number;
  name: string;
  description?: string;
  order: number;
};

type LeagueGroupsState = {
  items: LeagueGroup[];
  loading: boolean;
  error: string | null;
};

type LeagueGroupsData = {
  leagueGroups: LeagueGroup[];
};

const initialState: LeagueGroupsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLeagueGroups = createAsyncThunk<LeagueGroup[]>(
  "leagueGroups/fetchLeagueGroups",
  async () => {
    const { leagueGroups } = await httpGet<LeagueGroupsData>(
      "/api/leagues/groups",
    );
    return leagueGroups;
  },
);

const leagueGroupsSlice = createSlice({
  name: "leagueGroups",
  initialState,
  reducers: {
    clearLeagueGroups: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagueGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeagueGroups.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchLeagueGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load league groups";
        console.error("leagueGroupsSlice error:", state.error);
      });
  },
});

export const { clearLeagueGroups } = leagueGroupsSlice.actions;
export default leagueGroupsSlice.reducer;

// Селекторы
export type RootState = { leagueGroups: LeagueGroupsState };
export const selectLeagueGroups = (state: RootState) => state.leagueGroups.items;
export const selectLeagueGroupsLoading = (state: RootState) =>
  state.leagueGroups.loading;
export const selectLeagueGroupsError = (state: RootState) =>
  state.leagueGroups.error;
