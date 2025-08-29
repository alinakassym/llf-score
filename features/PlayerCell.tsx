// features/transfers/PlayerCell.tsx
import { View, Image, ImageSourcePropType } from "react-native";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

export type PlayerCellProps = {
  name: string;
  subtext?: string; // например, клуб/позиция (мелким)
  position?: "up" | "down";
  avatar?: ImageSourcePropType; // эмблема/фото
  size?: number; // размер аватарки
  right?: React.ReactNode; // опционально элемент справа (иконка статуса)
};

export default function PlayerCell({
  name,
  subtext,
  position,
  avatar,
  size = 24,
  right,
}: PlayerCellProps) {
  const { colors } = useAppTheme();
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}
    >
      {avatar && (
        <Image
          source={avatar}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      )}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text,
            }}
          >
            {name}
          </Text>
          {position ? (
            <View style={{ paddingBottom: 2 }}>
              <Ionicons
                color={position === "up" ? colors.green : colors.red}
                name={position === "up" ? "arrow-up" : "arrow-down"}
                size={16}
              />
            </View>
          ) : null}
        </View>
        {subtext ? (
          <Text style={{ fontSize: 12, color: colors.textLight, opacity: 0.7 }}>
            {subtext}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}
