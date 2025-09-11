import { configureStore } from "@reduxjs/toolkit";
import ui from "./ui.slice";
import general from "./general.slice";
import cities from "./cities.slice";
import leagues from "./leagues.slice";

export const store = configureStore({
  reducer: { ui, general, cities, leagues },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
