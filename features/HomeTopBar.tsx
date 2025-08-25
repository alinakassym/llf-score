import React, { useState } from "react";
import { View } from "react-native";
import IconButton from "@/shared/ui/IconButton";
import CityPicker from "@/features/CityPicker";
import LeaguePicker from "@/features/LeaguePicker";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  setCityId,
  setLeagueId,
  selectCityId,
  selectLeagueId,
} from "@/shared/store/general.slice";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function HomeTopBar() {
  const { colors } = useAppTheme();

  const [open, setOpen] = useState<"city" | "league" | null>(null);

  const dispatch = useAppDispatch();
  const cityId = useAppSelector(selectCityId);
  const leagueId = useAppSelector(selectLeagueId);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomColor: "#ECEDEF",
        borderBottomWidth: 1,
        backgroundColor: colors.secondaryBg,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CityPicker
            value={cityId}
            onChange={(id) => dispatch(setCityId(id))}
            open={open === "city"}
            onOpenChange={(o) => setOpen(o ? "city" : null)}
          />
          <LeaguePicker
            value={leagueId}
            onChange={(id) => dispatch(setLeagueId(id))}
            open={open === "league"}
            onOpenChange={(o) => setOpen(o ? "league" : null)}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <IconButton name="search" accessibilityLabel="Поиск" />
          <IconButton
            name="notifications-outline"
            dot
            accessibilityLabel="Уведомления"
          />
          <IconButton
            name="person-circle-outline"
            accessibilityLabel="Профиль"
          />
        </View>
      </View>
    </View>
  );
}
