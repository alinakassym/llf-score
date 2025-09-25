// features/TopBar.tsx
import { Option, Select } from "@/components/Select";
import { Colors } from "@/constants/theme";
import { CityPicker } from "@/features/CityPicker";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useCityStorage } from "@/hooks/useCityStorage";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useCallback, useEffect, useState } from "react";
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
  const { saveCity, loadCity } = useCityStorage();

  const [city, setCity] = useState<string>("");
  const [league, setLeague] = useState("pl");

  // Загружаем сохранённый город при старте
  useEffect(() => {
    if (status !== "succeeded" || cities.length === 0) return;
    (async () => {
      const saved = await loadCity();
      console.log("cities[0].id:", cities[0].id, "type:", typeof cities[0].id);
      setCity(
        saved && cities.some((c) => c.id === saved) ? saved : cities[0].id,
      );
    })();
  }, [status, cities, loadCity]);

  // Сохраняем выбор города
  const handleCityChange = useCallback(
    async (cityId: string) => {
      console.log("User selected city:", cityId, "type:", typeof cityId);
      setCity(cityId);
      await saveCity(String(cityId));
    },
    [saveCity],
  );

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
        <CityPicker value={city} onChange={handleCityChange} />

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
