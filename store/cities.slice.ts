import { API_BASE_URL } from "@/config/env";
import { httpGet, httpPost, httpPut } from "@/services/http";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ImageSourcePropType } from "react-native";

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

// Параметры для создания города
type CreateCityParams = {
  id: number;
  name: string;
};

// Параметры для обновления города
type UpdateCityParams = {
  id: string;
  name: string;
};

// thunk для загрузки
export const fetchCities = createAsyncThunk<City[]>(
  "cities/fetchCities",
  async () => {
    const data = await httpGet<City[]>("/api/cities");
    const result = data.map(
      (c) =>
        ({
          ...c,
          id: String(c.id),
          icon: {
            uri: `${API_BASE_URL}/api/cities/${c.id}/icon?width=80&height=80`,
          },
        }) as City,
    );
    return result;
  },
);

// thunk для создания города
export const createCity = createAsyncThunk<City, CreateCityParams>(
  "cities/createCity",
  async (params: CreateCityParams) => {
    const response = await httpPost<City>("/api/cities", {
      id: params.id,
      name: params.name,
      icon: null,
    });

    return {
      ...response,
      id: String(response.id),
      icon: {
        uri: `${API_BASE_URL}/api/cities/${response.id}/icon?width=80&height=80`,
      },
    };
  },
);

// thunk для обновления города
export const updateCity = createAsyncThunk<
  City,
  UpdateCityParams,
  { state: { cities: CitiesState } }
>(
  "cities/updateCity",
  async (params: UpdateCityParams, { getState }) => {
    await httpPut(`/api/cities/${params.id}`, {
      id: parseInt(params.id),
      name: params.name,
      icon: null,
    });

    // Формируем обновленный город из существующих данных и параметров
    const state = getState();
    const existingCity = selectCities(state as RootState).find(
      (c) => c.id === params.id
    );

    return {
      id: params.id,
      name: params.name,
      icon: existingCity?.icon || {
        uri: `${API_BASE_URL}/api/cities/${params.id}/icon?width=80&height=80`,
      },
    };
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
      })
      .addCase(createCity.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(updateCity.fulfilled, (s, a) => {
        const index = s.items.findIndex((c) => c.id === a.payload.id);
        if (index !== -1) {
          s.items[index] = a.payload;
        }
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
