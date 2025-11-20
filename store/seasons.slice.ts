import { httpGet } from "@/services/http";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Match = {
  id: number;
  dateTime: string;
  location: string;
  team1Id: number;
  team1Name: string;
  team2Id: number;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  tourId: number;
};

export type Tour = {
  id: number;
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  seasonId: number;
  matches: Match[];
};

export type Season = {
  id: number;
  name: string;
  date: string;
  leagueId: string;
  leagueName: string;
  cityId: number;
  cityName: string;
  leagueGroupId: number;
  leagueGroupName: string;
  tours: Tour[];
};

type SeasonsState = {
  items: Season[]; // Все сезоны для управления
  itemsByLeagueId: Record<string, Season>; // Последний сезон по leagueId
  loadingLeagues: string[]; // Какие лиги сейчас загружаются
  errorByLeagueId: Record<string, string | null>; // Ошибки по лигам
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: SeasonsState = {
  items: [],
  itemsByLeagueId: {},
  loadingLeagues: [],
  errorByLeagueId: {},
  status: "idle",
  error: null,
};

// thunk для загрузки всех сезонов
export const fetchSeasons = createAsyncThunk<Season[]>(
  "seasons/fetchSeasons",
  async () => {
    const response = await httpGet<{ seasons: Season[] }>("/api/seasons");
    return response.seasons;
  },
);

// thunk для загрузки последнего сезона по leagueId
export const fetchLastSeasonByLeagueId = createAsyncThunk<
  { leagueId: string; season: Season },
  string
>("seasons/fetchLastSeasonByLeagueId", async (leagueId: string) => {
  const season = await httpGet<Season>(
    `/api/leagues/${leagueId}/seasons/last`,
  );
  return { leagueId, season };
});

const seasonsSlice = createSlice({
  name: "seasons",
  initialState,
  reducers: {
    setSeasonForLeague: (
      s,
      a: PayloadAction<{ leagueId: string; season: Season }>
    ) => {
      s.itemsByLeagueId[a.payload.leagueId] = a.payload.season;
    },
    clearSeasons: (s) => {
      s.itemsByLeagueId = {};
      s.loadingLeagues = [];
      s.errorByLeagueId = {};
    },
    clearSeasonForLeague: (s, a: PayloadAction<string>) => {
      delete s.itemsByLeagueId[a.payload];
      s.loadingLeagues = s.loadingLeagues.filter(
        (leagueId) => leagueId !== a.payload,
      );
      delete s.errorByLeagueId[a.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSeasons
      .addCase(fetchSeasons.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchSeasons.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchSeasons.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message ?? "Failed to load seasons";
      })
      // fetchLastSeasonByLeagueId
      .addCase(fetchLastSeasonByLeagueId.pending, (s, a) => {
        const leagueId = a.meta.arg;
        if (!s.loadingLeagues.includes(leagueId)) {
          s.loadingLeagues.push(leagueId);
        }
        delete s.errorByLeagueId[leagueId];
      })
      .addCase(fetchLastSeasonByLeagueId.fulfilled, (s, a) => {
        const { leagueId, season } = a.payload;
        s.itemsByLeagueId[leagueId] = season;
        s.loadingLeagues = s.loadingLeagues.filter((id) => id !== leagueId);
        delete s.errorByLeagueId[leagueId];
      })
      .addCase(fetchLastSeasonByLeagueId.rejected, (s, a) => {
        const leagueId = a.meta.arg;
        s.loadingLeagues = s.loadingLeagues.filter((id) => id !== leagueId);
        s.errorByLeagueId[leagueId] =
          a.error.message ?? "Failed to load season";
        console.log(
          "seasonsSlice error for league",
          leagueId,
          s.errorByLeagueId[leagueId],
        );
      });
  },
});

export const { setSeasonForLeague, clearSeasons, clearSeasonForLeague } =
  seasonsSlice.actions;
export default seasonsSlice.reducer;

// селекторы
export type RootState = { seasons: SeasonsState }; // переопределится настоящим RootState из store.ts
export const selectSeasons = (s: RootState) => s.seasons.items;
export const selectSeasonsStatus = (s: RootState) => s.seasons.status;
export const selectSeasonsError = (s: RootState) => s.seasons.error;
export const selectSeasonByLeague = (leagueId: string) => (s: RootState) =>
  s.seasons.itemsByLeagueId[leagueId] || null;
export const selectSeasonLoadingForLeague =
  (leagueId: string) => (s: RootState) =>
    s.seasons.loadingLeagues.includes(leagueId);
export const selectSeasonErrorForLeague =
  (leagueId: string) => (s: RootState) =>
    s.seasons.errorByLeagueId[leagueId] || null;
