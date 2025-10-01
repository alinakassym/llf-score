// components/TableCell.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Image, ImageSourcePropType, Text, View } from "react-native";

export type PlayerCellProps = {
  text: string;
  subtext?: string;
  image?: ImageSourcePropType; // эмблема/фото
  size?: number; // размер аватарки
  right?: React.ReactNode; // опционально элемент справа (иконка статуса)
};

export default function TableCell({
  text,
  subtext,
  image,
  size = 32,
  right,
}: PlayerCellProps) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {image && (
        <Image
          source={image}
          style={{
            width: size,
            height: size,
            borderRadius: 4,
            backgroundColor: c.surface,
          }}
        />
      )}
      <View style={{ flexShrink: 1 }}>
        <Text
          style={{
            color: c.text,
            fontSize: 11,
            fontWeight: "700",
            flexShrink: 1,
          }}
        >
          {text}
        </Text>
        <View style={{ flexDirection: "column", gap: 0, marginTop: 2 }}>
          <Text style={{ color: c.textMuted, fontSize: 10 }}>{subtext}</Text>
        </View>
      </View>
      {right}
    </View>
  );
}
