import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
};

export default function IconButton({
  icon,
  size = "md",
  color = "#FFFFFF",
  onPress,
}: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const getSizeParams = () => {
    switch (size) {
      case "sm":
        return {
          height: 32,
          width: 32,
        };
      case "md":
        return {
          height: 32,
          width: 32,
        };
      case "lg":
        return {
          height: 32,
          width: 32,
        };
      default:
        return {
          height: 32,
          width: 32,
        };
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...getSizeParams(),
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 50,
      }}
    >
      <Ionicons
        name={icon}
        size={icon === "person-circle-outline" ? 22 : 20}
        color={color}
      />
    </TouchableOpacity>
  );
}
