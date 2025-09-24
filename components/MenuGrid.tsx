// components/MenuGrid.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { View } from "react-native";
import MenuButton from "./MenuButton";

export default function MenuGrid() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: c.background,
      }}
    >
      <MenuButton icon="list" label="Таблица" />
      <MenuButton icon="videocam-outline" label="LIVE" />
      <MenuButton icon="calendar-outline" label="Расписание" />
      <MenuButton icon="podium-outline" label="Результаты" />
      <MenuButton icon="football-outline" label="Бомбардиры" />
      <MenuButton icon="alert-circle-outline" label="Нарушители" />
      <MenuButton icon="images-outline" label="Фото" />
      <MenuButton icon="play-circle-outline" label="Видео" />
    </View>
  );
}
