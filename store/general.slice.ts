import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  cityId: number | string;
  leagueId: number | string;
};

const initialState: GeneralState = {
  cityId: 1,
  leagueId: 1,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCityId: (s, a: PayloadAction<number | string>) => {
      s.cityId = a.payload;
    },
    setLeagueId: (s, a: PayloadAction<number | string>) => {
      s.leagueId = a.payload;
    },
  },
});

export const { setCityId, setLeagueId } = generalSlice.actions;
export default generalSlice.reducer;

export const selectCityId = (s: { general: GeneralState }) => s.general.cityId;
export const selectLeagueId = (s: { general: GeneralState }) =>
  s.general.leagueId;
