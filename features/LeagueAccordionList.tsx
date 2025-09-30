import { Accordion } from "@/components/Accordion";
import { Colors } from "@/constants/theme";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppSelector } from "@/store/hooks";
import {
  League,
  selectLeagues,
  selectLeaguesStatus,
} from "@/store/leagues.slice";
import React, { FC } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

type Props = {
  cityId: string;
};

export const LeagueAccordionList: FC<Props> = ({ cityId }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const leagues = useAppSelector(selectLeagues);
  const leaguesStatus = useAppSelector(selectLeaguesStatus);

  // Фильтруем лиги для конкретного города
  const cityLeagues = leagues;

  if (leaguesStatus === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={c.primary} />
        <Text style={[styles.loadingText, { color: c.textMuted }]}>
          Загрузка лиг...
        </Text>
      </View>
    );
  }

  if (leaguesStatus === "failed") {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: c.error }]}>
          Ошибка загрузки лиг
        </Text>
      </View>
    );
  }

  if (cityLeagues.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.emptyText, { color: c.textMuted }]}>
          Лиги не найдены
        </Text>
      </View>
    );
  }

  // Компонент для отображения контента лиги (таблица команд)
  const renderLeagueContent = (league: League) => {
    return (
      <View style={styles.tableContainer}>
        <LeagueTable rows={leagueMock} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cityLeagues.map((league, index) => (
        <View
          key={league.id}
          style={[
            styles.accordionContainer,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <Accordion
            title={
              <View style={styles.titleContainer}>
                {league.icon && (
                  <Image source={league.icon} style={styles.leagueIcon} />
                )}
                <View style={styles.leagueInfo}>
                  <Text style={[styles.leagueName, { color: c.text }]}>
                    {league.name}
                  </Text>
                  <Text style={[styles.leagueGroup, { color: c.textMuted }]}>
                    {league.leagueGroupName}
                  </Text>
                </View>
              </View>
            }
            defaultOpen={index === 0} // Первая лига открыта по умолчанию
          >
            {renderLeagueContent(league)}
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
    paddingVertical: 24,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 24,
  },
  loadingText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
  accordionContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  leagueIcon: {
    width: 28,
    height: 28,
    borderRadius: 4,
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 13,
    fontWeight: "600",
  },
  leagueGroup: {
    fontSize: 11,
    marginTop: 2,
  },
  tableContainer: {
    paddingBottom: 12,
  },
});
