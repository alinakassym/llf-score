import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
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

export default function SeasonCreateScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    Alert.alert("В разработке", "Функция создания сезона в разработке");
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
            placeholder="Например: 2025-08-09"
            placeholderTextColor={c.textMuted}
            value={date}
            onChangeText={setDate}
          />
          <Text style={[styles.hint, { color: c.textMuted }]}>
            Дата начала сезона в формате YYYY-MM-DD
          </Text>
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
