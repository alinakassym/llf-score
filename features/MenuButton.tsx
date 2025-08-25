import { Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function MenuButton({ icon, label, onPress }: Props) {
  const { colors } = useAppTheme();
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
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: 400,
          color: colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
