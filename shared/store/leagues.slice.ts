import type { ImageSourcePropType } from "react-native";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { httpGet } from "@/services/http";
import { API_BASE_URL } from "@/shared/config/env";

export type League = {
  id: string;
  name: string;
  cityId: string;
  icon?: ImageSourcePropType;
};

type LeaguesState = {
  items: League[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentCityId: string | null;
};

const initialState: LeaguesState = {
  items: [],
  status: "idle",
  error: null,
  currentCityId: null,
};

// thunk для загрузки лиг по cityId
export const fetchLeaguesByCityId = createAsyncThunk<League[], string>(
  "leagues/fetchLeaguesByCityId",
  async (cityId: string) => {
    const data = await httpGet<League[]>(`/api/leagues?cityId=${cityId}`);
    const result = data.map(
      (league) =>
        ({
          ...league,
          icon: {
            uri: `${API_BASE_URL}/api/leagues/${league.id}/icon?width=80&height=80`,
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
      s.currentCityId = null;
    },
    setCurrentCityId: (s, a: PayloadAction<string | null>) => {
      s.currentCityId = a.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaguesByCityId.pending, (s, a) => {
        s.status = "loading";
        s.error = null;
        s.currentCityId = a.meta.arg;
      })
      .addCase(fetchLeaguesByCityId.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchLeaguesByCityId.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message ?? "Failed to load leagues";
      });
  },
});

export const { setLeagues, clearLeagues, setCurrentCityId } =
  leaguesSlice.actions;
export default leaguesSlice.reducer;

// селекторы
export type RootState = { leagues: LeaguesState }; // переопределится настоящим RootState из store.ts
export const selectLeagues = (s: RootState) => s.leagues.items;
export const selectLeaguesStatus = (s: RootState) => s.leagues.status;
export const selectLeaguesError = (s: RootState) => s.leagues.error;
export const selectCurrentCityId = (s: RootState) => s.leagues.currentCityId;
