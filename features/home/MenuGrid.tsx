// features/home/MenuGrid.tsx
import { View } from "react-native";
import MenuButton from "./MenuButton";

export default function MenuGrid() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <MenuButton icon="videocam-outline" label="LIVE" />
      <MenuButton icon="calendar-outline" label="Расписание" />
      <MenuButton icon="podium-outline" label="Результаты" />
      <MenuButton icon="football-outline" label="Бомбардиры" />
      <MenuButton icon="alert-circle-outline" label="Нарушители" />
      <MenuButton icon="images-outline" label="Фото и видео" />
    </View>
  );
}
