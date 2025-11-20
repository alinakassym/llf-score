import TextField from "@/components/form/TextField";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSeasons, selectSeasons } from "@/store/seasons.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SeasonsManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const seasons = useAppSelector(selectSeasons);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchSeasons()).unwrap();
      } catch (error) {
        console.error("Failed to load seasons:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const filteredSeasons = seasons.filter((season) =>
    season.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedSeasons = filteredSeasons.reduce(
    (acc, season) => {
      const key = `${season.cityName} - ${season.leagueName}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(season);
      return acc;
    },
    {} as Record<string, typeof seasons>,
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: c.background, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity
          onPress={() => router.push("/management")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={16} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>
          Управление сезонами
        </Text>
      </View>

      {/* Search */}
      <View style={styles.controls}>
        <TextField
          placeholder="Поиск сезона..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          leftIconSize={16}
          leftIconColor={c.textMuted}
        />
      </View>

      {/* Seasons List */}
      <ScrollView style={styles.content}>
        {Object.keys(groupedSeasons).length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={c.textMuted} />
            <Text style={[styles.emptyStateText, { color: c.textMuted }]}>
              Сезоны не найдены
            </Text>
          </View>
        ) : (
          Object.entries(groupedSeasons).map(([groupName, groupSeasons]) => (
            <View key={groupName} style={styles.seasonGroup}>
              <Text style={[styles.seasonGroupTitle, { color: c.text }]}>
                {groupName}
              </Text>
              {groupSeasons.map((season) => (
                <View
                  key={season.id}
                  style={[
                    styles.seasonCard,
                    { backgroundColor: c.card, borderColor: c.border },
                  ]}
                >
                  <View style={styles.seasonInfo}>
                    <Text style={[styles.seasonName, { color: c.text }]}>
                      {season.name}
                    </Text>
                    <Text
                      style={[styles.seasonDetails, { color: c.textMuted }]}
                    >
                      {new Date(season.date).toLocaleDateString("ru-RU")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  controls: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 16,
  },
  seasonGroup: {
    marginBottom: 24,
  },
  seasonGroupTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  seasonCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  seasonInfo: {
    flex: 1,
  },
  seasonName: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  seasonDetails: {
    fontSize: 12,
  },
});
