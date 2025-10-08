import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { FlatIcon } from "./icons";

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
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...getSizeParams(),
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
    </TouchableOpacity>
  );
}
