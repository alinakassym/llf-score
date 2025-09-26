// TopBar.tsx
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
import React from "react";
import { StyleSheet, View } from "react-native";


export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId);
  const leagueId = useAppSelector(selectLeagueId);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: 1,
          borderBottomColor: c.border,
          backgroundColor: c.background,
        },
      ]}
    >
      <View style={styles.left}>
        <CityPicker value={cityId} onChange={(id) => dispatch(setCityId(id))} />
        <LeaguePicker
          value={leagueId}
          onChange={(id) => dispatch(setLeagueId(id))}
        />
      </View>
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  left: { flexDirection: "row", alignItems: "center" },
  right: { flexDirection: "row", alignItems: "center" },
});
