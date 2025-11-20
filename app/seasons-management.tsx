import TextField from "@/components/form/TextField";
import { Colors } from "@/constants/theme";
import { ManagementItemCard } from "@/features/management/ManagementItemCard";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { fetchCities, selectCities } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLeaguesByCityId, selectLeagues } from "@/store/leagues.slice";
import { fetchSeasons, selectSeasons } from "@/store/seasons.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const cities = useAppSelector(selectCities);
  const leagues = useAppSelector(selectLeagues);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(fetchSeasons()).unwrap(),
          dispatch(fetchCities()).unwrap(),
        ]);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  // Загружаем лиги когда выбран город
  useEffect(() => {
    if (selectedCityId) {
      dispatch(fetchLeaguesByCityId(String(selectedCityId)));
      setSelectedLeagueId(null); // Сбрасываем выбранную лигу при смене города
    }
  }, [selectedCityId, dispatch]);

  const filteredSeasons = seasons.filter((season) => {
    const matchesSearch = season.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCity = selectedCityId
      ? season.cityId === selectedCityId
      : true;

    const matchesLeague = selectedLeagueId
      ? String(season.leagueId) === selectedLeagueId
      : true;
    return matchesSearch && matchesCity && matchesLeague;
  });

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

      {/* Search and Filter */}
      <View style={styles.controls}>
        <TextField
          placeholder="Поиск сезона..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          leftIconSize={16}
          leftIconColor={c.textMuted}
          style={styles.searchField}
        />

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
                    selectedCityId === parseInt(city.id) ? c.primary : c.card,
                  borderColor: c.border,
                },
              ]}
              onPress={() => setSelectedCityId(parseInt(city.id))}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      selectedCityId === parseInt(city.id) ? "#fff" : c.text,
                  },
                ]}
              >
                {city.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* League Filter - показываем только когда выбран город */}
        {selectedCityId && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                {
                  backgroundColor: !selectedLeagueId ? c.primary : c.card,
                  borderColor: c.border,
                },
              ]}
              onPress={() => setSelectedLeagueId(null)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: !selectedLeagueId ? "#fff" : c.text },
                ]}
              >
                Все лиги
              </Text>
            </TouchableOpacity>
            {leagues.map((league) => (
              <TouchableOpacity
                key={league.id}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      selectedLeagueId === league.id ? c.primary : c.card,
                    borderColor: c.border,
                  },
                ]}
                onPress={() => setSelectedLeagueId(league.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: selectedLeagueId === league.id ? "#fff" : c.text,
                    },
                  ]}
                >
                  {league.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
                <ManagementItemCard
                  key={season.id}
                  title={season.name}
                  subtitle={new Date(season.date).toLocaleDateString("ru-RU")}
                  onEdit={() => {
                    Alert.alert(
                      "В разработке",
                      "Функция редактирования сезонов еще не реализована",
                    );
                  }}
                  onDelete={() => {
                    Alert.alert(
                      "В разработке",
                      "Функция удаления сезонов еще не реализована",
                    );
                  }}
                />
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
  searchField: {
    marginBottom: 16,
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
});
