import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { selectCities } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectLeagueGroups } from "@/store/league-groups.slice";
import { selectLeagues, updateLeague } from "@/store/leagues.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function LeagueEditScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();

  const leagues = useAppSelector(selectLeagues);
  const leagueGroups = useAppSelector(selectLeagueGroups);
  const cities = useAppSelector(selectCities);

  const league = leagues.find((l) => l.id === leagueId);

  const [name, setName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [order, setOrder] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (league) {
      console.log("league: ", league);
      setName(league.name);
      setSelectedCityId(String(league?.cityId));
      setSelectedGroupId(league.leagueGroupId);
      setOrder(String(league.order));
    }
  }, [league]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Ошибка", "Название лиги обязательно");
      return;
    }

    if (!selectedCityId) {
      Alert.alert("Ошибка", "Выберите город");
      return;
    }

    if (!selectedGroupId) {
      Alert.alert("Ошибка", "Выберите группу лиги");
      return;
    }

    if (!leagueId) {
      Alert.alert("Ошибка", "ID лиги не найден");
      return;
    }

    setSaving(true);
    try {
      await dispatch(
        updateLeague({
          id: leagueId,
          name: name.trim(),
          cityId: parseInt(selectedCityId),
          leagueGroupId: selectedGroupId,
          order: parseInt(order) || 0,
        }),
      ).unwrap();

      Alert.alert("Успех", `Лига "${name.trim()}" успешно обновлена`, [
        {
          text: "OK",
          onPress: () => router.push("/leagues-management"),
        },
      ]);
    } catch (error) {
      console.error("Failed to save league:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Не удалось сохранить изменения. Проверьте подключение к интернету и попробуйте снова.";

      Alert.alert("Ошибка сохранения", errorMessage, [
        {
          text: "Попробовать снова",
          onPress: handleSave,
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

  if (!league) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: c.background, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={c.primary} />
        <Text style={[styles.loadingText, { color: c.textMuted }]}>
          Загрузка данных лиги...
        </Text>
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
                "Сохранение в процессе",
                "Пожалуйста, дождитесь завершения сохранения",
              );
              return;
            }
            router.back();
          }}
          style={styles.backButton}
          disabled={saving}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={saving ? c.textMuted : c.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>
          Редактирование лиги
        </Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.content}>
        {/* League Name */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Название лиги <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="Введите название лиги"
            placeholderTextColor={c.textMuted}
            value={name}
            onChangeText={setName}
          />
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
                    backgroundColor:
                      selectedCityId === city.id ? c.primary : c.card,
                    borderColor: c.border,
                  },
                ]}
                onPress={() => setSelectedCityId(city.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: selectedCityId === city.id ? "#fff" : c.text },
                  ]}
                >
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* League Group Selection */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Группа лиги <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsContainer}
          >
            {leagueGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.chip,
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
                    styles.chipText,
                    { color: selectedGroupId === group.id ? "#fff" : c.text },
                  ]}
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Order */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Порядок сортировки
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="0"
            placeholderTextColor={c.textMuted}
            value={order}
            onChangeText={setOrder}
            keyboardType="numeric"
          />
          <Text style={[styles.hint, { color: c.textMuted }]}>
            Меньшее число = выше в списке
          </Text>
        </View>

        {/* League Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <Text style={[styles.infoLabel, { color: c.textMuted }]}>ID:</Text>
          <Text style={[styles.infoValue, { color: c.text }]}>{league.id}</Text>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: c.primary },
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.saveButtonText}>Сохранение...</Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Сохранить изменения</Text>
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  hint: {
    fontSize: 14,
    marginTop: 4,
  },
  chipsContainer: {
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "monospace",
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
});
