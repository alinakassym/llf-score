import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { fetchCities, selectCities } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchLeaguesByCityId,
  selectLeagues,
} from "@/store/leagues.slice";
import { createSeason } from "@/store/seasons.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SeasonCreateScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cities = useAppSelector(selectCities);
  const leagues = useAppSelector(selectLeagues);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cityId, setCityId] = useState<string>("");
  const [leagueId, setLeagueId] = useState<string>("");
  const [saving, setSaving] = useState(false);
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

  // Загружаем лиги когда выбран город
  useEffect(() => {
    if (cityId) {
      dispatch(fetchLeaguesByCityId(cityId));
      setLeagueId(""); // Сбрасываем выбранную лигу при смене города
    }
  }, [cityId, dispatch]);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Ошибка", "Название сезона обязательно");
      return;
    }

    if (!date.trim()) {
      Alert.alert("Ошибка", "Дата начала сезона обязательна");
      return;
    }

    if (!cityId) {
      Alert.alert("Ошибка", "Выберите город");
      return;
    }

    if (!leagueId) {
      Alert.alert("Ошибка", "Выберите лигу");
      return;
    }

    setSaving(true);
    try {
      await dispatch(
        createSeason({
          name: name.trim(),
          date: date.trim(),
          leagueId: parseInt(leagueId),
        }),
      ).unwrap();

      Alert.alert("Успех", `Сезон "${name.trim()}" успешно создан`, [
        {
          text: "OK",
          onPress: () => router.push("/seasons-management"),
        },
      ]);
    } catch (error) {
      console.error("Failed to create season:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Не удалось создать сезон. Проверьте подключение к интернету и попробуйте снова.";

      Alert.alert("Ошибка создания", errorMessage, [
        {
          text: "Попробовать снова",
          onPress: handleCreate,
        },
        {
          text: "Отмена",
          style: "cancel",
        },
      ]);
    } finally {
      setSaving(false);
    }
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
          onPress={() => {
            if (saving) {
              Alert.alert(
                "Создание в процессе",
                "Пожалуйста, дождитесь завершения создания",
              );
              return;
            }
            router.push("/seasons-management");
          }}
          style={styles.backButton}
          disabled={saving}
        >
          <Ionicons
            name="arrow-back"
            size={16}
            color={saving ? c.textMuted : c.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>
          Создание сезона
        </Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.content}>
        {/* Season Name */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Название сезона <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="Например: Осень-2025"
            placeholderTextColor={c.textMuted}
            value={name}
            onChangeText={setName}
          />
          <Text style={[styles.hint, { color: c.textMuted }]}>
            Название сезона, например "Осень-2025"
          </Text>
        </View>

        {/* Season Date */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Дата начала сезона <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="Например: 2025-08-09T00:00:00Z"
            placeholderTextColor={c.textMuted}
            value={date}
            onChangeText={setDate}
          />
          <Text style={[styles.hint, { color: c.textMuted }]}>
            Дата в формате RFC 3339 (например: 2025-08-09T00:00:00Z)
          </Text>
        </View>

        {/* City Selection */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Город <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsContainer}
          >
            {cities.map((city) => (
              <TouchableOpacity
                key={city.id}
                style={[
                  styles.chip,
                  {
                    backgroundColor: cityId === city.id ? c.primary : c.card,
                    borderColor: c.border,
                  },
                ]}
                onPress={() => setCityId(city.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: cityId === city.id ? "#fff" : c.text },
                  ]}
                >
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* League Selection - показываем только когда выбран город */}
        {cityId && (
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: c.text }]}>
              Лига <Text style={{ color: "#ef4444" }}>*</Text>
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipsContainer}
            >
              {leagues.map((league) => (
                <TouchableOpacity
                  key={league.id}
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        leagueId === league.id ? c.primary : c.card,
                      borderColor: c.border,
                    },
                  ]}
                  onPress={() => setLeagueId(league.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: leagueId === league.id ? "#fff" : c.text },
                    ]}
                  >
                    {league.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Create Button */}
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: c.primary },
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={saving}
        >
          {saving ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.saveButtonText}>Создание...</Text>
            </>
          ) : (
            <>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Создать</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 12,
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  chipsContainer: {
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
