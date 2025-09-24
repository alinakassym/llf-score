import { useColorScheme } from "react-native";

export function useThemeMode() {
  return useColorScheme() ?? "light";
}
