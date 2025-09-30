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
  itemsByCityId: Record<string, League[]>; // Лиги по городам
  loadingCities: string[]; // Какие города сейчас загружаются
  errorByCityId: Record<string, string | null>; // Ошибки по городам
};

type leaguesData = {
  leagues: League[];
};

const initialState: LeaguesState = {
  itemsByCityId: {},
  loadingCities: [],
  errorByCityId: {},
};

// thunk для загрузки лиг по cityId
export const fetchLeaguesByCityId = createAsyncThunk<
  { cityId: string; leagues: League[] },
  string
>("leagues/fetchLeaguesByCityId", async (cityId: string) => {
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
  return { cityId, leagues: result };
});

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setLeaguesForCity: (
      s,
      a: PayloadAction<{ cityId: string; leagues: League[] }>
    ) => {
      s.itemsByCityId[a.payload.cityId] = a.payload.leagues;
    },
    clearLeagues: (s) => {
      s.itemsByCityId = {};
      s.loadingCities = [];
      s.errorByCityId = {};
    },
    clearLeaguesForCity: (s, a: PayloadAction<string>) => {
      delete s.itemsByCityId[a.payload];
      s.loadingCities = s.loadingCities.filter(cityId => cityId !== a.payload);
      delete s.errorByCityId[a.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaguesByCityId.pending, (s, a) => {
        const cityId = a.meta.arg;
        if (!s.loadingCities.includes(cityId)) {
          s.loadingCities.push(cityId);
        }
        delete s.errorByCityId[cityId];
      })
      .addCase(fetchLeaguesByCityId.fulfilled, (s, a) => {
        const { cityId, leagues } = a.payload;
        s.itemsByCityId[cityId] = leagues;
        s.loadingCities = s.loadingCities.filter(id => id !== cityId);
        delete s.errorByCityId[cityId];
      })
      .addCase(fetchLeaguesByCityId.rejected, (s, a) => {
        const cityId = a.meta.arg;
        s.loadingCities = s.loadingCities.filter(id => id !== cityId);
        s.errorByCityId[cityId] =
          a.error.message ?? "Failed to load leagues";
        console.log("leaguesSlice error for city", cityId, s.errorByCityId[cityId]);
      });
  },
});

export const { setLeaguesForCity, clearLeagues, clearLeaguesForCity } = leaguesSlice.actions;
export default leaguesSlice.reducer;

// селекторы
export type RootState = { leagues: LeaguesState }; // переопределится настоящим RootState из store.ts
export const selectLeaguesByCity = (cityId: string) => (s: RootState) =>
  s.leagues.itemsByCityId[cityId] || [];
export const selectLeaguesLoadingForCity = (cityId: string) => (s: RootState) =>
  s.leagues.loadingCities.includes(cityId);
export const selectLeaguesErrorForCity = (cityId: string) => (s: RootState) =>
  s.leagues.errorByCityId[cityId] || null;

// Обратная совместимость для старых компонентов
export const selectLeagues = (s: RootState) =>
  Object.values(s.leagues.itemsByCityId).flat();
export const selectLeaguesStatus = (s: RootState) =>
  s.leagues.loadingCities.length > 0 ? "loading" : "succeeded";
export const selectLeaguesError = (s: RootState) =>
  Object.values(s.leagues.errorByCityId).find(error => error !== null) || null;
