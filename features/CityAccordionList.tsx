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
import React, { FC, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const CityAccordionList: FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCities());
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.loadingText, { color: c.textMuted }]}>
          Загрузка городов...
        </Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: c.error }]}>
          Ошибка загрузки городов
        </Text>
      </View>
    );
  }

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
          >
            <View style={styles.tableContainer}>
              <LeagueTable rows={leagueMock} />
            </View>
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
    marginHorizontal: 16,
    marginVertical: 8,
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
    fontSize: 16,
    fontWeight: "600",
  },
  tableContainer: {
    paddingBottom: 16,
  },
});