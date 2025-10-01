// components/TableRatingCell.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export type PlayerCellProps = {
  text: string;
  position?: "up" | "down";
};

export default function TableRatingCell({ text, position }: PlayerCellProps) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      <Text
        style={{
          color: c.text,
          fontSize: 10,
          fontWeight: "700",
          flexShrink: 1,
        }}
      >
        {text}
      </Text>
      {position && (
        <Ionicons
          color={position === "up" ? c.green : c.red}
          name={position === "up" ? "arrow-up" : "arrow-down"}
          size={12}
        />
      )}
    </View>
  );
}
