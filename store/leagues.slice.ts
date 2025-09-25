import { httpGet } from "@/services/http";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type League = {
  id: string;
  name: string;
};

type LeaguesState = {
  items: League[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cityId: number | null; // для отслеживания для какого города загружены лиги
};

const initialState: LeaguesState = {
  items: [],
  status: "idle",
  error: null,
  cityId: null,
};

// thunk для загрузки лиг по cityId
export const fetchLeagues = createAsyncThunk<League[], number>(
  "leagues/fetchLeagues",
  async (cityId) => {
    const data = await httpGet<League[]>(`/api/leagues?cityId=${cityId}`);
    return data;
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
      s.cityId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (s, a) => {
        s.status = "loading";
        s.error = null;
        s.cityId = a.meta.arg; // сохраняем cityId для которого загружаем
      })
      .addCase(fetchLeagues.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchLeagues.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message ?? "Failed to load leagues";
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
export const selectLeaguesCityId = (s: RootState) => s.leagues.cityId;