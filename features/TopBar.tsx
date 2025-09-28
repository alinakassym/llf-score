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
import React from "react";
import { StyleSheet, View } from "react-native";

export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId);
  const leagueId = useAppSelector(selectLeagueId);

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
            top={175}
            value={cityId}
            onChange={(id) => dispatch(setCityId(id))}
          />
        </View>

        <View style={[styles.btn, { backgroundColor: c.darkOpacity }]}>
          <LeaguePicker
            color={c.white}
            top={175}
            value={leagueId}
            onChange={(id) => dispatch(setLeagueId(id))}
          />
        </View>
      </View>
      <View style={styles.right}>
        <IconButton icon="search" color={c.white} />
        <IconButton icon="notifications-outline" color={c.white} />
        <IconButton icon="person-circle-outline" color={c.white} />
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
    alignItems: "center",
    gap: 8,
  },
  btn: {
    paddingHorizontal: 4,
    borderRadius: 8,
  },
});
