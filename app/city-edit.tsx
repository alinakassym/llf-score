import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { selectCities, updateCity } from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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

export default function CityEditScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cityId } = useLocalSearchParams<{ cityId: string }>();

  const cities = useAppSelector(selectCities);
  const city = cities.find((c) => c.id === cityId);

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (city) {
      setName(city.name);
    }
  }, [city]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Ошибка", "Название города обязательно");
      return;
    }

    if (!cityId) {
      Alert.alert("Ошибка", "ID города не найден");
      return;
    }

    setSaving(true);
    try {
      await dispatch(
        updateCity({
          id: cityId,
          name: name.trim(),
        }),
      ).unwrap();

      Alert.alert("Успех", `Город "${name.trim()}" успешно обновлен`, [
        {
          text: "OK",
          onPress: () => router.push("/cities-management"),
        },
      ]);
    } catch (error) {
      console.error("Failed to save city:", error);
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

  if (!city) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: c.background, justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={c.primary} />
        <Text style={[styles.loadingText, { color: c.textMuted }]}>
          Загрузка данных города...
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
            router.push("/cities-management");
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
          Редактирование города
        </Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.content}>
        {/* City Name */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            Название города <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="Введите название города"
            placeholderTextColor={c.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* City Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: c.card, borderColor: c.border },
          ]}
        >
          <Text style={[styles.infoLabel, { color: c.textMuted }]}>ID:</Text>
          <Text style={[styles.infoValue, { color: c.text }]}>{city.id}</Text>
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
              <Ionicons name="checkmark" size={16} color="#fff" />
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
  loadingText: {
    marginTop: 16,
    fontSize: 12,
    textAlign: "center",
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
    fontSize: 12,
    fontFamily: "monospace",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
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
    fontSize: 14,
    fontWeight: "600",
  },
});
