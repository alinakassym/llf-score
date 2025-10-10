// app/profile.tsx
import GradientButton from "@/components/GradientButton";
import ProfileHeader from "@/components/ProfileHeader";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import PlayerPosition from "@/features/PlayerPosition";
import PlayerTabs from "@/features/PlayerTabs";
import { app } from "@/firebaseConfig.js";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ProfileScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const { signOut, user } = useSession();
  const router = useRouter();
  const logo = require("@/assets/images/adaptive-icon.png");

  // Используем данные пользователя или значения по умолчанию
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Пользователь";
  const userEmail = user?.email || "email@example.com";

  // выбираем правильный контейнер
  const Container: any = Platform.OS === "android" ? Animated.View : View;
  const containerProps =
    Platform.OS === "android"
      ? { entering: FadeIn.duration(60), exiting: FadeOut.duration(60) }
      : {};

  const handleSignOut = async () => {
    try {
      console.log("Logout profile");
      const auth = getAuth(app);
      await firebaseSignOut(auth);
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container
      style={{ flex: 1, backgroundColor: c.surface }}
      {...containerProps}
    >
      <LinearGradient
        colors={c.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ProfileHeader title={displayName} year={userEmail} logo={logo} />
        <PlayerPosition
          title={"User ID: " + (user?.uid?.slice(0, 8) || "N/A")}
          subtitle={"Email: " + userEmail}
          logo={logo}
        />
      </LinearGradient>
      <PlayerTabs />
      <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 24 }}>
        <GradientButton
          title="Выйти"
          onPress={() => handleSignOut()}
          style={{ marginBottom: 32 }}
        />
      </View>
    </Container>
  );
}
