import { configureStore } from "@reduxjs/toolkit";
import cities from "./cities.slice";
import leagues from "./leagues.slice";
export const store = configureStore({
  reducer: { cities, leagues },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
