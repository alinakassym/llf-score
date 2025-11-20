import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type Option = {
  id: string;
  label: string;
  icon?: ImageSourcePropType;
};

type Props = {
  value: string;
  onChange: (id: string) => void;
  options: Option[];
  top?: number;
  color?: string;
};

export const Select: FC<Props> = ({
  value,
  onChange,
  options,
  top = 164,
  color = "#000",
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>();

  // Анимированные значения для высоты выпадающего списка и прозрачности
  const dropdownHeight = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (value && options.length) {
      const findedOption: Option | undefined = options.find(
        (o) => o.id === value,
      );
      setSelected(findedOption);
    }
  }, [value, options]);

  // Анимация открытия/закрытия выпадающего списка
  useEffect(() => {
    if (open) {
      // Открытие: плавное увеличение высоты без отскока
      dropdownHeight.value = withTiming(1, {
        duration: 200, // Быстрая анимация 150мс
      });
      // Появление фона с прозрачностью
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      // Закрытие: быстрое уменьшение высоты
      dropdownHeight.value = withTiming(0, {
        duration: 150, // Еще быстрее при закрытии
      });
      // Исчезание фона
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [open]);

  // Стили для анимации выпадающего списка
  const animatedDropdownStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: dropdownHeight.value }], // Масштабирование по вертикали (0 = свернуто, 1 = развернуто)
    opacity: opacity.value, // Прозрачность (0 = невидимо, 1 = видимо)
  }));

  // Стили для анимации затемненного фона
  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value, // Плавное появление/исчезание фона
  }));

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        style={[styles.button]}
      >
        {selected?.icon && (
          <Image source={selected.icon} style={styles.buttonIcon} />
        )}
        <Text numberOfLines={1} style={[styles.buttonText, { color: color }]}>
          {selected?.label ?? "Выбрать"}
        </Text>
        <Ionicons name="chevron-down" size={14} color={color} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="none"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable onPress={() => setOpen(false)}>
          <Animated.View
            style={[styles.backdrop, animatedBackdropStyle, { top: top - 49 }]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: c.background,
              borderColor: c.border,
              top,
              transformOrigin: "top",
            },
            animatedDropdownStyle,
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              const isSelected = item.id === value;
              return (
                <Pressable
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: pressed
                        ? scheme === "light"
                          ? "#F5F5F5"
                          : "rgba(255,255,255,0.06)"
                        : "transparent",
                    },
                  ]}
                >
                  {item.icon && (
                    <Image source={item.icon} style={styles.optionIcon} />
                  )}
                  <Text style={{ color: c.text, fontSize: 14, flex: 1 }}>
                    {item.label}
                  </Text>
                  {isSelected ? (
                    <Text style={{ color: c.primary, fontSize: 16 }}>●</Text>
                  ) : null}
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={[styles.sep, { backgroundColor: c.border }]} />
            )}
          />
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  buttonText: {
    maxWidth: 72,
    fontSize: 14,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  buttonIcon: {
    marginRight: 4,
    width: 16,
    height: 16,
  },
  backdrop: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    maxHeight: "60%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  sep: { height: 1, opacity: 0.6 },
});
