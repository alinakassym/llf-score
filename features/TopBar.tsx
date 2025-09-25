// features/TopBar.tsx
import { Option, Select } from "@/components/Select";
import { Colors } from "@/constants/theme";
import { CityPicker } from "@/features/CityPicker";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { fetchCities, selectCities, selectCitiesStatus } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const LEAGUES: Option[] = [
  { id: "pl", label: "Премьер лига" },
  { id: "fl", label: "Первая лига" },
  { id: "youth", label: "Юношеская" },
  { id: "leagueA", label: "Лига A" },
  { id: "leagueB", label: "Лига B" },
  { id: "leagueC", label: "Лига C" },
];

export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);

  const [city, setCity] = useState<string>("");
  const [league, setLeague] = useState("pl");

  // Выбираем первый город по умолчанию когда города загрузились
  useEffect(() => {
    if (cities.length > 0 && !city) {
      setCity(cities[0].id);
    }
  }, [cities, city]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCities());
  }, [dispatch, status]);

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
        <CityPicker value={city} onChange={setCity} />

        <Select value={league} onChange={setLeague} options={LEAGUES} />
      </View>

      {/* справа пока пусто — добавим иконки позже */}
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
