import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLeaguesByCityId, selectLeagues } from "@/store/leagues.slice";
import { fetchCities, selectCities } from "@/store/cities.slice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LeaguesManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cities = useAppSelector(selectCities);
  const leagues = useAppSelector(selectLeagues);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchCities()).unwrap();
      } catch (error) {
        console.error("Failed to load cities:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (cities.length > 0) {
      cities.forEach((city) => {
        dispatch(fetchLeaguesByCityId(city.id));
      });
    }
  }, [cities, dispatch]);

  const filteredLeagues = leagues.filter((league) => {
    const matchesSearch = league.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCity = selectedCityId
      ? league.cityId === selectedCityId
      : true;
    return matchesSearch && matchesCity;
  });

  const groupedLeagues = filteredLeagues.reduce(
    (acc, league) => {
      if (!acc[league.cityName]) {
        acc[league.cityName] = [];
      }
      acc[league.cityName].push(league);
      return acc;
    },
    {} as Record<string, typeof leagues>,
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
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>
          Управление лигами
        </Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.controls}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <Ionicons name="search" size={20} color={c.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: c.text }]}
            placeholder="Поиск лиги..."
            placeholderTextColor={c.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              {
                backgroundColor: !selectedCityId ? c.primary : c.card,
                borderColor: c.border,
              },
            ]}
            onPress={() => setSelectedCityId(null)}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: !selectedCityId ? "#fff" : c.text },
              ]}
            >
              Все города
            </Text>
          </TouchableOpacity>
          {cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedCityId === city.id ? c.primary : c.card,
                  borderColor: c.border,
                },
              ]}
              onPress={() => setSelectedCityId(city.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: selectedCityId === city.id ? "#fff" : c.text },
                ]}
              >
                {city.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Leagues List */}
      <ScrollView style={styles.content}>
        {Object.keys(groupedLeagues).length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={64} color={c.textMuted} />
            <Text style={[styles.emptyStateText, { color: c.textMuted }]}>
              Лиги не найдены
            </Text>
          </View>
        ) : (
          Object.entries(groupedLeagues).map(([cityName, cityLeagues]) => (
            <View key={cityName} style={styles.cityGroup}>
              <Text style={[styles.cityGroupTitle, { color: c.text }]}>
                {cityName}
              </Text>
              {cityLeagues.map((league) => (
                <View
                  key={league.id}
                  style={[
                    styles.leagueCard,
                    { backgroundColor: c.card, borderColor: c.border },
                  ]}
                >
                  <View style={styles.leagueInfo}>
                    <Text style={[styles.leagueName, { color: c.text }]}>
                      {league.name}
                    </Text>
                    <Text
                      style={[styles.leagueDetails, { color: c.textMuted }]}
                    >
                      Группа: {league.leagueGroupName}
                    </Text>
                  </View>
                  <View style={styles.leagueActions}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        { backgroundColor: c.surface },
                      ]}
                      onPress={() => {
                        // TODO: Implement edit
                        console.log("Edit league:", league.id);
                      }}
                    >
                      <Ionicons name="pencil" size={18} color={c.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        { backgroundColor: c.surface },
                      ]}
                      onPress={() => {
                        // TODO: Implement delete
                        console.log("Delete league:", league.id);
                      }}
                    >
                      <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: c.primary }]}
        onPress={() => {
          // TODO: Implement add league
          console.log("Add new league");
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  controls: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterScroll: {
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
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
  cityGroup: {
    marginBottom: 24,
  },
  cityGroupTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  leagueCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  leagueDetails: {
    fontSize: 14,
  },
  leagueActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
