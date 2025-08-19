import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useThemeMode } from '@/shared/theme/useThemeMode';
import { tokens, type ThemeTokens } from './tokens';

let setNWColorScheme: ((m:'light'|'dark')=>void)|null = null;
let NWStyleSheet: any = null;
try { setNWColorScheme = require('nativewind').setColorScheme; } catch {}
try { NWStyleSheet = require('nativewind').NativeWindStyleSheet; } catch {}

type Ctx = { colors: ThemeTokens; mode: 'light'|'dark' };
const ThemeCtx = createContext<Ctx>({ colors: tokens.light, mode: 'light' });

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeMode();
  const colors = useMemo(() => (mode === 'light' ? tokens.light : tokens.dark), [mode]);

  useEffect(() => {
    if (setNWColorScheme) setNWColorScheme(mode);
    else if (NWStyleSheet?.setColorScheme) NWStyleSheet.setColorScheme(mode);
  }, [mode]);

  return (
    <ThemeCtx.Provider value={{ colors, mode }}>
      <NavThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
        <GluestackUIProvider>
          {children}
        </GluestackUIProvider>
      </NavThemeProvider>
    </ThemeCtx.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeCtx);
}
