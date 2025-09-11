// app/profile.tsx
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { VStack } from "@/components/ui/vstack";
import Screen from "@/shared/ui/Screen";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import ProfileHeader from "@/features/ProfileHeader";
import PlayerPosition from "@/features/PlayerPosition";
import PlayerTabs from "@/features/PlayerTabs";

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const dateOfBirth = "19.08.2005";
  const logo = require("@/assets/images/adaptive-icon.png");

  // выбираем правильный контейнер
  const Container: any = Platform.OS === "android" ? Animated.View : View;
  const containerProps =
    Platform.OS === "android"
      ? { entering: FadeIn.duration(60), exiting: FadeOut.duration(60) }
      : {};

  return (
    <Screen>
      <Container style={{ flex: 1 }} {...containerProps}>
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ProfileHeader title={"Ермек А."} year={dateOfBirth} logo={logo} />
        </LinearGradient>
        <VStack className="flex-1">
          <PlayerPosition
            title={"Кайрат (Алматы)"}
            subtitle={"Конец контракта: 31.12.2025"}
            logo={logo}
          />
          <PlayerTabs />
        </VStack>
      </Container>
    </Screen>
  );
}
