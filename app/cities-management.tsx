import TextField from "@/components/form/TextField";
import { Colors } from "@/constants/theme";
import { ManagementItemCard } from "@/features/management/ManagementItemCard";
import { useThemeMode } from "@/hooks/use-theme-mode";
import {
  deleteCity,
  fetchCities,
  selectCities,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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

export default function CitiesManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cities = useAppSelector(selectCities);

  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDeleteCity = (cityId: string, cityName: string) => {
    Alert.alert(
      "Удаление города",
      `Вы уверены, что хотите удалить город "${cityName}"? Это действие нельзя отменить.`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(deleteCity({ id: cityId })).unwrap();
              Alert.alert("Успех", `Город "${cityName}" успешно удален`);
            } catch (error) {
              console.error("Failed to delete city:", error);
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "Не удалось удалить город. Проверьте подключение к интернету и попробуйте снова.";
              Alert.alert("Ошибка удаления", errorMessage);
            }
          },
        },
      ],
    );
  };

  const handleEditCity = (cityId: string) => {
    router.push({
      pathname: "/city-edit",
      params: { cityId },
    });
  };

  const handleAddCity = () => {
    router.push("/city-create");
  };

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
          Управление городами
        </Text>
      </View>

      {/* Search */}
      <View style={styles.controls}>
        <TextField
          placeholder="Поиск города..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          leftIconSize={16}
          leftIconColor={c.textMuted}
        />
      </View>

      {/* Cities List */}
      <ScrollView style={styles.content}>
        {filteredCities.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={64} color={c.textMuted} />
            <Text style={[styles.emptyStateText, { color: c.textMuted }]}>
              Города не найдены
            </Text>
          </View>
        ) : (
          filteredCities.map((city) => (
            <ManagementItemCard
              key={city.id}
              title={city.name}
              onEdit={() => handleEditCity(city.id)}
              onDelete={() => handleDeleteCity(city.id, city.name)}
            />
          ))
        )}
        <View style={{ height: 78 }} />
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: c.primary }]}
        onPress={handleAddCity}
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
