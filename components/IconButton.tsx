import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { FlatIcon } from "./icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
  onPress?: () => void;
};

export default function IconButton({
  icon,
  size = "md",
  color = "#FFFFFF",
  showDot = false,
  onPress,
}: Props) {
  const getSizeParams = () => {
    switch (size) {
      case "sm":
        return {
          height: 32,
          maxWidth: 32,
          minWidth: 32,
        };
      case "md":
        return {
          height: 32,
          maxWidth: 32,
          minWidth: 32,
        };
      case "lg":
        return {
          height: 32,
          maxWidth: 32,
          minWidth: 32,
        };
      default:
        return {
          height: 32,
          maxWidth: 32,
          minWidth: 32,
        };
    }
  };
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...getSizeParams(),
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 50,
      }}
    >
      {["person", "notifications"].includes(icon) ? (
        <FlatIcon name={icon} size={20} color={color} />
      ) : (
        <Ionicons
          name={icon}
          size={icon === "person-circle-outline" ? 22 : 20}
          color={color}
        />
      )}
      {showDot && (
        <View
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            height: 6,
            width: 6,
            borderRadius: 4,
            backgroundColor: c.error,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
