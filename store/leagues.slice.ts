import { API_BASE_URL } from "@/config/env";
import { httpGet } from "@/services/http";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type League = {
  cityId: string;
  cityName: string;
  id: string;
  leagueGroupId: number;
  leagueGroupName: string;
  name: string;
  order: number;
  icon?: { uri: string };
};

type LeaguesState = {
  items: League[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type leaguesData = {
  leagues: League[];
};

const initialState: LeaguesState = {
  items: [],
  status: "idle",
  error: null,
};

// thunk для загрузки лиг по cityId
export const fetchLeaguesByCityId = createAsyncThunk<League[], string>(
  "leagues/fetchLeaguesByCityId",
  async (cityId: string) => {
    const { leagues } = await httpGet<leaguesData>(
      `/api/leagues?cityId=${cityId}`,
    );
    const result = leagues.map(
      (c) =>
        ({
          ...c,
          id: String(c.id),
          icon: {
            uri: `${API_BASE_URL}/api/cities/${cityId}/icon?width=80&height=80`,
          },
        }) as League,
    );
    return result;
  },
);

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setLeagues: (s, a: PayloadAction<League[]>) => {
      s.items = a.payload;
    },
    clearLeagues: (s) => {
      s.items = [];
      s.status = "idle";
      s.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaguesByCityId.pending, (s, a) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchLeaguesByCityId.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchLeaguesByCityId.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message ?? "Failed to load leagues";
        console.log("leaguesSlice s.error", s.error);
      });
  },
});

export const { setLeagues, clearLeagues } = leaguesSlice.actions;
export default leaguesSlice.reducer;

// селекторы
export type RootState = { leagues: LeaguesState }; // переопределится настоящим RootState из store.ts
export const selectLeagues = (s: RootState) => s.leagues.items;
export const selectLeaguesStatus = (s: RootState) => s.leagues.status;
export const selectLeaguesError = (s: RootState) => s.leagues.error;
