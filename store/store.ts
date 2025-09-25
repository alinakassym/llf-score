import { configureStore } from "@reduxjs/toolkit";
import cities from "./cities.slice";
export const store = configureStore({
  reducer: { cities },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
