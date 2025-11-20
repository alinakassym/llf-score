import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { createCity } from "@/store/cities.slice";
import { useAppDispatch } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function CityCreateScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Ошибка", "Название города обязательно");
      return;
    }

    if (!cityId.trim()) {
      Alert.alert("Ошибка", "ID города обязателен");
      return;
    }

    const id = parseInt(cityId);
    if (isNaN(id) || id <= 0) {
      Alert.alert("Ошибка", "ID города должен быть положительным числом");
      return;
    }

    setSaving(true);
    try {
      await dispatch(
        createCity({
          id,
          name: name.trim(),
        }),
      ).unwrap();

      Alert.alert("Успех", `Город "${name.trim()}" успешно создан`, [
        {
          text: "OK",
          onPress: () => router.push("/cities-management"),
        },
      ]);
    } catch (error) {
      console.error("Failed to create city:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Не удалось создать город. Проверьте подключение к интернету и попробуйте снова.";

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
          Создание города
        </Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.content}>
        {/* City ID */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: c.text }]}>
            ID города <Text style={{ color: "#ef4444" }}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: c.card, borderColor: c.border, color: c.text },
            ]}
            placeholder="Введите ID города"
            placeholderTextColor={c.textMuted}
            value={cityId}
            onChangeText={setCityId}
            keyboardType="numeric"
          />
          <Text style={[styles.hint, { color: c.textMuted }]}>
            Уникальный числовой идентификатор города
          </Text>
        </View>

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
});
