import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'system' | 'light' | 'dark';

type UIState = { themeMode: ThemeMode };
const initialState: UIState = { themeMode: 'system' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = uiSlice.actions;
export default uiSlice.reducer;
