import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function MenuButton({ icon, label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 100,
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
        <Ionicons name={icon} size={28} color="#4568DC" />
      </View>
      <Text style={{ marginTop: 4, fontSize: 14, color: "#111" }}>{label}</Text>
    </Pressable>
  );
}
