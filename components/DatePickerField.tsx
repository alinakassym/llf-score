// components/DatePickerField.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label?: string;
  value: string; // формат YYYY-MM-DD
  onChangeDate: (date: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

export const DatePickerField: FC<Props> = ({
  label,
  value,
  onChangeDate,
  error,
  style,
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [showPicker, setShowPicker] = useState(false);
  const [tempYear, setTempYear] = useState<number>(2000);
  const [tempMonth, setTempMonth] = useState<number>(1);
  const [tempDay, setTempDay] = useState<number>(1);

  // Инициализация временных значений из value
  React.useEffect(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      setTempYear(year);
      setTempMonth(month);
      setTempDay(day);
    }
  }, [value]);

  // Форматирование даты для отображения
  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return "";
    }
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleConfirm = () => {
    const formattedDate = `${tempYear}-${String(tempMonth).padStart(2, "0")}-${String(tempDay).padStart(2, "0")}`;
    onChangeDate(formattedDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  // Генерация массивов для выбора
  const years = Array.from(
    { length: 65 },
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: c.text }]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[
          styles.input,
          {
            backgroundColor: c.card,
            borderColor: error ? c.error : c.border,
          },
        ]}
      >
        <Text style={[styles.inputText, { color: value ? c.text : c.muted }]}>
          {value ? formatDisplayDate(value) : "Выберите дату"}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={c.muted} />
      </TouchableOpacity>

      {!!error && (
        <Text style={[styles.error, { color: c.error }]}>{error}</Text>
      )}

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.modalContent, { backgroundColor: c.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: c.text }]}>
                  Выберите дату
                </Text>
              </View>

              <View style={styles.pickerContainer}>
                {/* День */}
                <View style={styles.pickerColumn}>
                  <Text style={[styles.columnLabel, { color: c.textMuted }]}>
                    День
                  </Text>
                  <ScrollView style={styles.scrollView}>
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        onPress={() => setTempDay(day)}
                        style={[
                          styles.pickerItem,
                          tempDay === day && {
                            backgroundColor: c.primary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            {
                              color: tempDay === day ? c.white : c.text,
                            },
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Месяц */}
                <View style={styles.pickerColumn}>
                  <Text style={[styles.columnLabel, { color: c.textMuted }]}>
                    Месяц
                  </Text>
                  <ScrollView style={styles.scrollView}>
                    {months.map((month) => (
                      <TouchableOpacity
                        key={month}
                        onPress={() => setTempMonth(month)}
                        style={[
                          styles.pickerItem,
                          tempMonth === month && {
                            backgroundColor: c.primary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            {
                              color: tempMonth === month ? c.white : c.text,
                            },
                          ]}
                        >
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Год */}
                <View style={styles.pickerColumn}>
                  <Text style={[styles.columnLabel, { color: c.textMuted }]}>
                    Год
                  </Text>
                  <ScrollView style={styles.scrollView}>
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        onPress={() => setTempYear(year)}
                        style={[
                          styles.pickerItem,
                          tempYear === year && {
                            backgroundColor: c.primary,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            {
                              color: tempYear === year ? c.white : c.text,
                            },
                          ]}
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.button, { backgroundColor: c.card }]}
                >
                  <Text style={[styles.buttonText, { color: c.text }]}>
                    Отмена
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={[styles.button, { backgroundColor: c.primary }]}
                >
                  <Text style={[styles.buttonText, { color: c.white }]}>
                    Выбрать
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 14,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 320,
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  pickerColumn: {
    flex: 1,
  },
  columnLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  scrollView: {
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  pickerItemText: {
    fontSize: 14,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default DatePickerField;
