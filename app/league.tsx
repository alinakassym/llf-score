// app/league.tsx
import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import LeagueHeader from "@/features/LeagueHeader";
import LeagueTabs from "@/features/LeagueTabs";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function LeagueScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const { leagueId } = useLocalSearchParams<{ leagueId?: string }>();

  const title = "League";
  const year = "2025";
  const logo = require("@/assets/images/adaptive-icon.png");

  // выбираем правильный контейнер
  const Container: any = Platform.OS === "android" ? Animated.View : View;
  const containerProps =
    Platform.OS === "android"
      ? { entering: FadeIn.duration(60), exiting: FadeOut.duration(60) }
      : {};

  return (
    <Screen>
      <Container style={{ flex: 1, paddingBottom: 32 }} {...containerProps}>
        <LeagueHeader
          title={title}
          year={year}
          logo={logo}
          onPressYear={() => {
            console.log("open year picker for league:", leagueId);
          }}
        />
        <LeagueTabs />
      </Container>
    </Screen>
  );
}
