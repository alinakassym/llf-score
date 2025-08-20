import type { ImageSourcePropType } from "react-native";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { httpGet } from "@/services/http";

const API_URL = "https://neat-onions-slide.loca.lt/api/cities";

export type City = {
  id: string;
  name: string;
  icon?: ImageSourcePropType;
};

type CitiesState = {
  items: City[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CitiesState = {
  items: [],
  status: "idle",
  error: null,
};

// thunk для загрузки
export const fetchCities = createAsyncThunk<City[]>(
  "cities/fetchCities",
  async () => {
    const data = await httpGet<City[]>(API_URL);
    const result = data.map(
      (c) => ({ ...c, icon: `${API_URL}/${c.id}/icon` }) as City,
    );
    return result;
  },
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (s, a: PayloadAction<City[]>) => {
      s.items = a.payload;
    },
    clearCities: (s) => {
      s.items = [];
      s.status = "idle";
      s.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchCities.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchCities.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message ?? "Failed to load cities";
      });
  },
});

export const { setCities, clearCities } = citiesSlice.actions;
export default citiesSlice.reducer;

// селекторы
export type RootState = { cities: CitiesState }; // переопределится настоящим RootState из store.ts
export const selectCities = (s: RootState) => s.cities.items;
export const selectCitiesStatus = (s: RootState) => s.cities.status;
export const selectCitiesError = (s: RootState) => s.cities.error;
