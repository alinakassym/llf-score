import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export const GradientButton: FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  accessibilityLabel,
  style,
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const gradient: any = [c.primary, c.secondary, c.tertiary];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        opacity: isDisabled ? 0.7 : 1,
        ...(style as object),
      }}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        style={{
          flex: 1,
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={{ color: "#FFF", fontSize: 16, fontWeight: 600 as any }}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
