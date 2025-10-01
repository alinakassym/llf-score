// features/transfers/PlayerCell.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageSourcePropType, Text, View } from "react-native";

export type PlayerCellProps = {
  index: number;
  name: string;
  subtext?: string; // например, клуб/позиция (мелким)
  position?: "up" | "down";
  avatar?: ImageSourcePropType; // эмблема/фото
  size?: number; // размер аватарки
  right?: React.ReactNode; // опционально элемент справа (иконка статуса)
};

export default function PlayerCell({
  index,
  name,
  subtext,
  position,
  avatar,
  size = 32,
  right,
}: PlayerCellProps) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View
      style={{
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,
      }}
    >
      {avatar && (
        <Image
          source={avatar}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: c.background,
          }}
        />
      )}
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: c.text,
            }}
          >
            {name}
          </Text>
          {position ? (
            <View>
              <Ionicons
                color={position === "up" ? c.green : c.red}
                name={position === "up" ? "arrow-up" : "arrow-down"}
                size={16}
              />
            </View>
          ) : null}
        </View>
        {subtext ? (
          <Text
            style={{
              fontSize: 12,
              color: c.textMuted,
            }}
          >
            {subtext}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}
