import { Accordion } from "@/components/Accordion";
import { Colors } from "@/constants/theme";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import { useThemeMode } from "@/hooks/use-theme-mode";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchLeaguesByCityId,
  selectLeagues,
  selectLeaguesStatus,
} from "@/store/leagues.slice";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export const CityAccordionList: FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const citiesStatus = useAppSelector(selectCitiesStatus);
  const leagues = useAppSelector(selectLeagues);
  const leaguesStatus = useAppSelector(selectLeaguesStatus);

  // Состояние для отслеживания загруженных лиг по городам
  const [loadedCities, setLoadedCities] = useState<Set<string>>(new Set());
  const [openCities, setOpenCities] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (citiesStatus === "idle") dispatch(fetchCities());
  }, [dispatch, citiesStatus]);

  // Функция для загрузки лиг при открытии аккордиона
  const handleAccordionToggle = useCallback(
    (cityId: string, isOpen: boolean) => {
      if (isOpen && !loadedCities.has(cityId)) {
        dispatch(fetchLeaguesByCityId(cityId));
        setLoadedCities((prev) => new Set([...prev, cityId]));
      }

      setOpenCities((prev) => {
        const newSet = new Set(prev);
        if (isOpen) {
          newSet.add(cityId);
        } else {
          newSet.delete(cityId);
        }
        return newSet;
      });
    },
    [dispatch, loadedCities]
  );

  // Загрузка лиг для первого города (открыт по умолчанию)
  useEffect(() => {
    if (cities.length > 0 && !loadedCities.has(cities[0].id)) {
      handleAccordionToggle(cities[0].id, true);
    }
  }, [cities, loadedCities, handleAccordionToggle]);

  if (citiesStatus === "loading") {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.loadingText, { color: c.textMuted }]}>
          Загрузка городов...
        </Text>
      </View>
    );
  }

  if (citiesStatus === "failed") {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: c.error }]}>
          Ошибка загрузки городов
        </Text>
      </View>
    );
  }

  // Компонент для отображения контента аккордиона
  const renderAccordionContent = (cityId: string) => {
    const isOpen = openCities.has(cityId);
    const isLoading = isOpen && leaguesStatus === "loading" && loadedCities.has(cityId);

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={c.primary} />
          <Text style={[styles.loadingText, { color: c.textMuted }]}>
            Загрузка лиг...
          </Text>
        </View>
      );
    }

    // Пока используем моковые данные для таблицы
    // В будущем здесь можно будет получать данные таблицы лиги по leagueId
    return (
      <View style={styles.tableContainer}>
        <LeagueTable rows={leagueMock} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cities.map((city, index) => (
        <View
          key={city.id}
          style={[
            styles.accordionContainer,
            { backgroundColor: c.background, borderColor: c.border },
          ]}
        >
          <Accordion
            title={
              <View style={styles.titleContainer}>
                {city.icon && (
                  <Image source={city.icon} style={styles.cityIcon} />
                )}
                <Text style={[styles.cityName, { color: c.text }]}>
                  {city.name}
                </Text>
              </View>
            }
            defaultOpen={index === 0}
            onToggle={(isOpen) => handleAccordionToggle(city.id, isOpen)}
          >
            {renderAccordionContent(city.id)}
          </Accordion>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
  accordionContainer: {
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cityIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  cityName: {
    fontSize: 14,
    fontWeight: "600",
  },
  tableContainer: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 24,
  },
});