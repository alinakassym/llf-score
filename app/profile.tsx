// app/profile.tsx
import React from "react";
import { Platform, ScrollView, View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { VStack } from "@/components/ui/vstack";
import Screen from "@/shared/ui/Screen";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import ProfileHeader from "@/features/ProfileHeader";
import PlayerPosition from "@/features/PlayerPosition";

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
        <ScrollView
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 0 }}
        >
          <VStack className="flex-1">
            <ProfileHeader title={"Ермек А."} year={dateOfBirth} logo={logo} />
            <PlayerPosition
              title={"Кайрат (Алматы)"}
              subtitle={"Конец контракта: 31.12.2025"}
              logo={logo}
            />
            <Text style={{ color: colors.text, fontSize: 18, padding: 16 }}>
              Profile
            </Text>
          </VStack>
        </ScrollView>
      </Container>
    </Screen>
  );
}
