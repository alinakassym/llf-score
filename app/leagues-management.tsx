import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { fetchCities, selectCities } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchLeagueGroups,
  selectLeagueGroups,
} from "@/store/league-groups.slice";
import { fetchLeaguesByCityId, selectLeagues } from "@/store/leagues.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LeaguesManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cities = useAppSelector(selectCities);
  const leagues = useAppSelector(selectLeagues);
  const leagueGroups = useAppSelector(selectLeagueGroups);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(fetchCities()).unwrap(),
          dispatch(fetchLeagueGroups()).unwrap(),
        ]);
      } catch (error) {
        console.error("Failed to load data:", error);
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
      ? String(league.cityId) === selectedCityId
      : true;
    const matchesGroup = selectedGroupId
      ? league.leagueGroupId === selectedGroupId
      : true;
    return matchesSearch && matchesCity && matchesGroup;
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
          onPress={() => router.push("/management")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={16} color={c.text} />
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
            {
              borderColor: c.border,
              backgroundColor: c.card,
            },
          ]}
        >
          <Ionicons name="search" size={16} color={c.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: c.text }]}
            placeholder="Поиск лиги..."
            placeholderTextColor={c.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* City Filter */}
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

        {/* League Group Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              {
                backgroundColor: !selectedGroupId ? c.primary : c.card,
                borderColor: c.border,
              },
            ]}
            onPress={() => setSelectedGroupId(null)}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: !selectedGroupId ? "#fff" : c.text },
              ]}
            >
              Все группы
            </Text>
          </TouchableOpacity>
          {leagueGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedGroupId === group.id ? c.primary : c.card,
                  borderColor: c.border,
                },
              ]}
              onPress={() => setSelectedGroupId(group.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: selectedGroupId === group.id ? "#fff" : c.text },
                ]}
              >
                {group.name}
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
                        router.push({
                          pathname: "/league-edit",
                          params: { leagueId: league.id },
                        });
                      }}
                    >
                      <Ionicons name="pencil" size={16} color={c.primary} />
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
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#ef4444"
                      />
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
        onPress={() => router.push("/league-create")}
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
  searchContainer: {
    paddingLeft: 12,
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
  },
  searchInput: {
    marginLeft: -36,
    paddingLeft: 36,
    paddingRight: 16,
    height: 40,
    flex: 1,
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  leagueCard: {
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
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  leagueDetails: {
    fontSize: 12,
  },
  leagueActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
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
