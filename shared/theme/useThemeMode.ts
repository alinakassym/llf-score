import { useColorScheme } from 'react-native';
import { useAppSelector } from '@/shared/store/hooks';

export function useThemeMode(): 'light' | 'dark' {
  const pref = useAppSelector(s => s.ui.themeMode); // system | light | dark
  const device = useColorScheme() ?? 'light';
  return pref === 'system' ? (device as 'light' | 'dark') : pref;
}
