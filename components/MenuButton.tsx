import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function MenuButton({ icon, label, onPress }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "24%",
        maxWidth: "24%",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={28} color={c.primary} />
      </View>
      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: 400,
          color: c.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
