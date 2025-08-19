import { configureStore } from '@reduxjs/toolkit';
import ui from './ui.slice';
import general from './general.slice';

export const store = configureStore({
  reducer: { ui, general },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
