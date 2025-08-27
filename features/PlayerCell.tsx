// features/transfers/PlayerCell.tsx
import { View, Image, ImageSourcePropType } from "react-native";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type PlayerCellProps = {
  name: string;
  subtext?: string; // например, клуб/позиция (мелким)
  avatar?: ImageSourcePropType; // эмблема/фото
  size?: number; // размер аватарки
  right?: React.ReactNode; // опционально элемент справа (иконка статуса)
};

export default function PlayerCell({
  name,
  subtext,
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
        <Text style={{ fontSize: 14, fontWeight: "600", color: colors.text }}>
          {name}
        </Text>
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
