import { configureStore } from "@reduxjs/toolkit";
import cities from "./cities.slice";
import general from "./general.slice";
import leagues from "./leagues.slice";
import seasons from "./seasons.slice";
import user from "./user.slice";
export const store = configureStore({
  reducer: { general, cities, leagues, seasons, user },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
