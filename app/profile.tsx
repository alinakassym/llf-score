// app/profile.tsx
import ProfileHeader from "@/components/ProfileHeader";
import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import PlayerPosition from "@/features/PlayerPosition";
import PlayerTabs from "@/features/PlayerTabs";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ProfileScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
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
          colors={c.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ProfileHeader title={"Ермек А."} year={dateOfBirth} logo={logo} />
          <PlayerPosition
            title={"Кайрат (Алматы)"}
            subtitle={"Конец контракта: 31.12.2025"}
            logo={logo}
          />
        </LinearGradient>
        <PlayerTabs />
      </Container>
    </Screen>
  );
}
