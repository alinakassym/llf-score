import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function MenuButton({ icon, label, onPress }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 8,
        backgroundColor: c.bgOpacity,
      }}
    >
      <View
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={18} color={c.primary} />
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
    </TouchableOpacity>
  );
}
