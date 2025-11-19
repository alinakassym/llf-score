import { API_BASE_URL } from "@/config/env";
import { httpDelete, httpGet, httpPost, httpPut } from "@/services/http";
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

// thunk для обновления лиги
export type UpdateLeagueParams = {
  id: string;
  name: string;
  cityId: number;
  leagueGroupId: number;
  order: number;
};

export const updateLeague = createAsyncThunk<
  League,
  UpdateLeagueParams,
  { state: { leagues: LeaguesState; cities: any; leagueGroups: any } }
>(
  "leagues/updateLeague",
  async (params: UpdateLeagueParams, { getState }) => {
    // API возвращает пустой ответ, поэтому не ожидаем данных
    await httpPut<{ league: League }>(
      `/api/leagues/${params.id}`,
      {
        name: params.name,
        order: params.order,
        cityId: params.cityId,
        leagueGroupId: params.leagueGroupId,
      },
    );

    // Формируем обновленную лигу из существующих данных и параметров
    const state = getState();
    const existingLeague = selectLeagues(state as RootState).find(
      (l) => l.id === params.id,
    );
    const cities = state.cities.items || [];
    const leagueGroups = state.leagueGroups.items || [];
    const city = cities.find((c: any) => c.id === String(params.cityId));
    const leagueGroup = leagueGroups.find(
      (g: any) => g.id === params.leagueGroupId,
    );

    return {
      ...existingLeague,
      id: params.id,
      name: params.name,
      cityId: String(params.cityId),
      cityName: city?.name || existingLeague?.cityName || "",
      leagueGroupId: params.leagueGroupId,
      leagueGroupName:
        leagueGroup?.name || existingLeague?.leagueGroupName || "",
      order: params.order,
      icon: existingLeague?.icon,
    } as League;
  },
);

// thunk для создания новой лиги
export type CreateLeagueParams = {
  name: string;
  cityId: number;
  leagueGroupId: number | null;
  order: number;
};

export const createLeague = createAsyncThunk<League, CreateLeagueParams>(
  "leagues/createLeague",
  async (params: CreateLeagueParams) => {
    const response = await httpPost<League>("/api/leagues", {
      name: params.name,
      order: params.order,
      cityId: params.cityId,
      leagueGroupId: params.leagueGroupId,
    });

    // API возвращает объект лиги напрямую, преобразуем id и cityId к строке
    return {
      ...response,
      id: String(response.id),
      cityId: String(response.cityId),
      icon: {
        uri: `${API_BASE_URL}/api/cities/${response.cityId}/icon?width=80&height=80`,
      },
    } as League;
  },
);

// thunk для удаления лиги
export type DeleteLeagueParams = {
  id: string;
  cityId: string;
};

export const deleteLeague = createAsyncThunk<
  DeleteLeagueParams,
  DeleteLeagueParams
>("leagues/deleteLeague", async (params: DeleteLeagueParams) => {
  await httpDelete(`/api/leagues/${params.id}`);
  // Возвращаем id и cityId для удаления из state
  return params;
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
      })
      .addCase(updateLeague.fulfilled, (s, a) => {
        const updatedLeague = a.payload;
        const cityId = String(updatedLeague.cityId);

        if (s.itemsByCityId[cityId]) {
          const index = s.itemsByCityId[cityId].findIndex(
            (l) => l.id === updatedLeague.id
          );
          if (index !== -1) {
            s.itemsByCityId[cityId][index] = updatedLeague;
          }
        }
      })
      .addCase(createLeague.fulfilled, (s, a) => {
        const newLeague = a.payload;
        const cityId = String(newLeague.cityId);

        // Добавляем новую лигу в список для соответствующего города
        if (!s.itemsByCityId[cityId]) {
          s.itemsByCityId[cityId] = [];
        }
        s.itemsByCityId[cityId].push(newLeague);
      })
      .addCase(deleteLeague.fulfilled, (s, a) => {
        const { id, cityId } = a.payload;

        // Удаляем лигу из списка для соответствующего города
        if (s.itemsByCityId[cityId]) {
          s.itemsByCityId[cityId] = s.itemsByCityId[cityId].filter(
            (l) => l.id !== id,
          );
        }
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
