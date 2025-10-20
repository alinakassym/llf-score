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
  leagueId: number;
  leagueName: string;
  cityId: number;
  cityName: string;
  leagueGroupId: number;
  leagueGroupName: string;
  tours: Tour[];
};

type SeasonsState = {
  itemsByLeagueId: Record<number, Season>; // Последний сезон по leagueId
  loadingLeagues: number[]; // Какие лиги сейчас загружаются
  errorByLeagueId: Record<number, string | null>; // Ошибки по лигам
};

const initialState: SeasonsState = {
  itemsByLeagueId: {},
  loadingLeagues: [],
  errorByLeagueId: {},
};

// thunk для загрузки последнего сезона по leagueId
export const fetchLastSeasonByLeagueId = createAsyncThunk<
  { leagueId: number; season: Season },
  number
>("seasons/fetchLastSeasonByLeagueId", async (leagueId: number) => {
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
      a: PayloadAction<{ leagueId: number; season: Season }>
    ) => {
      s.itemsByLeagueId[a.payload.leagueId] = a.payload.season;
    },
    clearSeasons: (s) => {
      s.itemsByLeagueId = {};
      s.loadingLeagues = [];
      s.errorByLeagueId = {};
    },
    clearSeasonForLeague: (s, a: PayloadAction<number>) => {
      delete s.itemsByLeagueId[a.payload];
      s.loadingLeagues = s.loadingLeagues.filter(
        (leagueId) => leagueId !== a.payload,
      );
      delete s.errorByLeagueId[a.payload];
    },
  },
  extraReducers: (builder) => {
    builder
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
export const selectSeasonByLeague = (leagueId: number) => (s: RootState) =>
  s.seasons.itemsByLeagueId[leagueId] || null;
export const selectSeasonLoadingForLeague =
  (leagueId: number) => (s: RootState) =>
    s.seasons.loadingLeagues.includes(leagueId);
export const selectSeasonErrorForLeague =
  (leagueId: number) => (s: RootState) =>
    s.seasons.errorByLeagueId[leagueId] || null;
