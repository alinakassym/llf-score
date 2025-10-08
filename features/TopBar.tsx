// TopBar.tsx
import IconButton from "@/components/IconButton";
import { Colors } from "@/constants/theme";
import { CityPicker } from "@/features/CityPicker";
import { LeaguePicker } from "@/features/LeaguePicker";
import { useThemeMode } from "@/hooks/use-theme-mode";
import {
  selectCityId,
  selectLeagueId,
  setCityId,
  setLeagueId,
} from "@/store/general.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId);
  const leagueId = useAppSelector(selectLeagueId);

  const handleLoginPress = () => {
    router.push("/login");
  };

  // Функция для открытия страницы профиля
  const handleProfilePress = () => {
    router.push("/profile");
  };

  return (
    <LinearGradient
      colors={c.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container]}
    >
      <View style={[styles.left]}>
        <View style={[styles.btn, { backgroundColor: c.darkOpacity }]}>
          <CityPicker
            color={c.white}
            top={Platform.OS === "android" ? 143 : 175}
            value={cityId}
            onChange={(id) => dispatch(setCityId(id))}
          />
        </View>

        <View style={[styles.btn, { backgroundColor: c.darkOpacity }]}>
          <LeaguePicker
            color={c.white}
            top={Platform.OS === "android" ? 143 : 175}
            value={leagueId}
            onChange={(id) => dispatch(setLeagueId(id))}
          />
        </View>
      </View>
      <View style={styles.right}>
        <IconButton icon="search" color={c.white} onPress={handleLoginPress} />
        <IconButton icon="notifications" color={c.white} />
        <IconButton
          icon="person"
          color={c.white}
          onPress={handleProfilePress}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 8 },
  right: {
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  btn: {
    paddingHorizontal: 4,
    borderRadius: 8,
  },
});
