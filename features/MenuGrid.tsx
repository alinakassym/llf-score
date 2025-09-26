// features/MenuGrid.tsx
import MenuButton from "@/components/MenuButton";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function MenuGrid() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const buttons = [
    { icon: "list", label: "Таблица" },
    { icon: "videocam-outline", label: "LIVE" },
    { icon: "calendar-outline", label: "Расписание" },
    { icon: "podium-outline", label: "Результаты" },
    { icon: "football-outline", label: "Бомбардиры" },
    { icon: "alert-circle-outline", label: "Нарушители" },
    { icon: "images-outline", label: "Фото" },
    { icon: "play-circle-outline", label: "Видео" },
  ];

  // Разбиваем на две строки по 4 кнопки
  const firstRow = buttons.slice(0, 4);
  const secondRow = buttons.slice(4, 8);

  return (
    <View
      style={{
        width: "94%",
        alignSelf: "center",
        gap: 8,
        borderRadius: 8,
      }}
    >
      {/* Первая строка */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {firstRow.map((button, index) => (
          <View key={index} style={{ flex: 1 }}>
            <MenuButton
              icon={button.icon as keyof typeof Ionicons.glyphMap}
              label={button.label}
            />
          </View>
        ))}
      </View>

      {/* Вторая строка */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {secondRow.map((button, index) => (
          <View key={index} style={{ flex: 1 }}>
            <MenuButton
              icon={button.icon as keyof typeof Ionicons.glyphMap}
              label={button.label}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
