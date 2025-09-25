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
import {
  fetchLeagues,
  selectLeagues,
  selectLeaguesCityId,
  selectLeaguesStatus,
} from "@/store/leagues.slice";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const citiesStatus = useAppSelector(selectCitiesStatus);
  const leagues = useAppSelector(selectLeagues);
  const leaguesStatus = useAppSelector(selectLeaguesStatus);
  const leaguesCityId = useAppSelector(selectLeaguesCityId);
  const { saveCity, loadCity } = useCityStorage();
  const { saveLeague, loadLeague } = useLeagueStorage();

  const [city, setCity] = useState<number | string>(0);
  const [league, setLeague] = useState<number | string>("pl");

  // Загружаем сохранённый город при старте
  useEffect(() => {
    if (citiesStatus !== "succeeded" || cities.length === 0) return;
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
  }, [citiesStatus, cities, loadCity]);

  // Загружаем лиги когда город изменился
  useEffect(() => {
    if (typeof city === "number" && city > 0) {
      // Загружаем лиги только если нужно (город изменился)
      if (leaguesCityId !== city) {
        dispatch(fetchLeagues(city));
      }
    }
  }, [city, dispatch, leaguesCityId]);

  // Загружаем сохранённую лигу когда лиги загрузились
  useEffect(() => {
    console.log("leagues: ", leagues);
    if (leaguesStatus !== "succeeded" || leagues.length === 0) return;
    (async () => {
      const saved = await loadLeague();
      console.log("leagues: ", leagues);
      if (saved && leagues.length > 0 && leagues.some((l) => l.id === saved)) {
        setLeague(saved);
        return;
      }
      // Выбираем первую лигу по умолчанию
      if (leagues.length > 0) {
        setLeague(leagues[0].id);
      }
    })();
  }, [leaguesStatus, leagues, loadLeague]);

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
    if (citiesStatus === "idle") dispatch(fetchCities());
  }, [dispatch, citiesStatus]);

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
