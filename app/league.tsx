// app/league.tsx
import React from "react";
import { Platform, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import LeagueHeader from "@/features/LeagueHeader";
import LeagueTabs from "@/features/LeagueTabs";
import Screen from "@/shared/ui/Screen";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function LeagueScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId?: string }>();

  const { colors } = useAppTheme();

  // TODO: позже подменим реальные данные по leagueId
  const title = "League";
  const year = "2025";
  const logo = require("@/assets/images/adaptive-icon.png"); // временный логотип

  return (
    <Screen>
      <Animated.View
        entering={FadeIn.duration(60)}
        exiting={FadeOut.duration(60)}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 0 }}
        >
          <VStack className="flex-1">
            <LeagueHeader
              title={title}
              year={year}
              logo={logo}
              onPressYear={() => {
                // TODO: открыть выбор сезона (ActionSheet/DrawerPicker)
                console.log("open year picker for league:", leagueId);
              }}
            />
            <LeagueTabs />
          </VStack>
        </ScrollView>
      </Animated.View>
    </Screen>
  );
}
