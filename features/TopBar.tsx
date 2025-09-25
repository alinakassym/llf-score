// features/TopBar.tsx
import { Colors } from "@/constants/theme";
import { CityPicker } from "@/features/CityPicker";
import { LeaguePicker } from "@/features/LeaguePicker";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useCityStorage } from "@/hooks/useCityStorage";
import { useLeagueStorage } from "@/hooks/useLeagueStorage";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);
  const { saveCity, loadCity } = useCityStorage();
  const { saveLeague, loadLeague } = useLeagueStorage();

  const [city, setCity] = useState<number | string>(0);
  const [league, setLeague] = useState<number | string>("pl");

  // Загружаем сохранённый город при старте
  useEffect(() => {
    if (status !== "succeeded" || cities.length === 0) return;
    (async () => {
      const saved = await loadCity();
      if (saved && typeof saved === "string") {
        setCity(+saved);
        return;
      }
      if (cities.length) {
        setCity(cities[0]?.id);
        return;
      }
    })();
  }, [status, cities, loadCity]);

  // Загружаем сохранённую лигу при старте
  useEffect(() => {
    (async () => {
      const saved = await loadLeague();
      if (saved && typeof saved === "string") {
        setLeague(saved);
        return;
      }
      // По умолчанию "pl" (Премьер лига)
      setLeague("pl");
    })();
  }, [loadLeague]);

  // Сохраняем выбор города
  const handleCityChange = useCallback(
    async (cityId: number | string) => {
      setCity(cityId);
      await saveCity(String(cityId));
    },
    [saveCity],
  );

  // Сохраняем выбор лиги
  const handleLeagueChange = useCallback(
    async (leagueId: number | string) => {
      setLeague(leagueId);
      await saveLeague(String(leagueId));
    },
    [saveLeague],
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

        <LeaguePicker value={league} onChange={handleLeagueChange} />
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
