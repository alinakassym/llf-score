// app/profile.tsx
import GradientButton from "@/components/buttons/GradientButton";
import ProfileHeader from "@/components/ProfileHeader";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import PlayerPosition from "@/features/PlayerPosition";
import PlayerTabs from "@/features/PlayerTabs";
import { app } from "@/firebaseConfig.js";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppSelector } from "@/store/hooks";
import {
  selectUserFullProfile,
  selectUserHasProfile,
  selectUserProfile,
} from "@/store/user.slice";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function ProfileScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const { signOut, user } = useSession();
  const router = useRouter();
  const logo = require("@/assets/images/adaptive-icon.png");
  const hasProfile = useAppSelector(selectUserHasProfile);
  const fullProfile = useAppSelector(selectUserFullProfile);
  const userProfile = useAppSelector(selectUserProfile);
  const isAdmin = userProfile?.role === "admin";

  // Состояние для показа/скрытия блока предупреждения
  const [showWarning, setShowWarning] = useState(true);

  // Сбрасываем состояние при монтировании компонента (при новом заходе)
  useEffect(() => {
    setShowWarning(true);
  }, []);

  // Используем данные из fullProfile если есть, иначе из user
  const displayName = fullProfile
    ? `${fullProfile.firstName} ${fullProfile.lastName}`
    : user?.displayName || user?.email || "Пользователь";
  const birthDate = fullProfile?.dateOfBirth || "Дата не указана";

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

  const handleRemindLater = () => {
    console.log("Remind later clicked");
    setShowWarning(false);
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
        <ProfileHeader title={displayName} year={birthDate} logo={logo} />
        {isAdmin ? (
          <View style={{ paddingHorizontal: 8, marginBottom: 46 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingHorizontal: 8,
                paddingVertical: 8,
                backgroundColor: c.bgOpacity,
                borderRadius: 8,
              }}
            >
              <View style={{ padding: 4 }}>
                <Text
                  style={{
                    color: c.text,
                    opacity: 0.85,
                    fontSize: 12,
                  }}
                >
                  Администратор
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <PlayerPosition
            title={"Кайрат (Алматы)"}
            subtitle={"30.12.2025"}
            logo={logo}
          />
        )}
      </LinearGradient>
      <PlayerTabs />
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
      >
        {!hasProfile && showWarning && (
          <View
            style={[
              styles.warningBlock,
              {
                backgroundColor: c.bgOpacity,
                borderColor: c.warning,
              },
            ]}
          >
            <Text style={[styles.warningTitle, { color: c.text }]}>
              Профиль не заполнен
            </Text>
            <Text style={[styles.warningText, { color: c.text }]}>
              Пожалуйста, заполните ваш профиль для полного использования
              приложения
            </Text>
            <GradientButton
              title="Заполнить профиль"
              onPress={() => {
                router.push("/create-profile");
              }}
              style={{ marginTop: 12 }}
            />
            <TouchableOpacity
              onPress={handleRemindLater}
              style={styles.remindLaterButton}
            >
              <Text style={[styles.remindLaterText, { color: c.textMuted }]}>
                Напомнить позже
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <GradientButton
          title="Выйти"
          onPress={() => handleSignOut()}
          style={{ marginBottom: 32 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  warningBlock: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
  },
  remindLaterButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  remindLaterText: {
    fontSize: 14,
    fontWeight: "400",
  },
});
