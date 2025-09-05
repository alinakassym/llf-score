// app/leagues.tsx
import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "@/shared/ui/Screen";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function LeaguesScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId?: string }>();

  const { colors } = useAppTheme();

  return (
    <Screen style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 12 }}>
        Страница лиг — скоро тут будет контент
      </Text>
    </Screen>
  );
}
