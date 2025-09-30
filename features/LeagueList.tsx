import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppSelector } from "@/store/hooks";
import {
  League,
  selectLeaguesByCity,
  selectLeaguesErrorForCity,
  selectLeaguesLoadingForCity,
} from "@/store/leagues.slice";
import { router } from "expo-router";
import React, { FC } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  cityId: string;
  onLeaguePress?: (league: League) => void;
};

export const LeagueList: FC<Props> = ({ cityId, onLeaguePress }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const cityLeagues = useAppSelector(selectLeaguesByCity(cityId));
  const isLoading = useAppSelector(selectLeaguesLoadingForCity(cityId));
  const error = useAppSelector(selectLeaguesErrorForCity(cityId));

  // Функция для навигации к странице лиги
  const handleLeaguePress = (league: League) => {
    // Вызываем пользовательский обработчик если он есть
    onLeaguePress?.(league);

    // Навигация к странице лиги
    router.push({
      pathname: "/league",
      params: {
        leagueId: league.id,
        leagueName: league.name,
        cityId: cityId,
      },
    });
  };

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

  if (error) {
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

  return (
    <View style={styles.container}>
      {cityLeagues.map((league, index) => (
        <TouchableOpacity
          key={league.id}
          activeOpacity={0.7}
          onPress={() => handleLeaguePress(league)}
          style={[
            styles.leagueItem,
            {
              backgroundColor: c.card,
              borderColor: c.border,
            },
            index === cityLeagues.length - 1 && styles.lastItem,
          ]}
        >
          <View style={styles.leagueContent}>
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

          {/* Индикатор нажатия */}
          <View style={[styles.chevron, { borderColor: c.textMuted }]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  centerContainer: {
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
  leagueItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 56,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  leagueContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leagueIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 12,
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  leagueGroup: {
    fontSize: 12,
  },
  chevron: {
    width: 6,
    height: 6,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    transform: [{ rotate: "45deg" }],
    marginLeft: 12,
  },
});