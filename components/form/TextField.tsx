// components/TextField.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  numberOfLines?: number;
  error?: string;
  style?: StyleProp<ViewStyle>;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  leftIconSize?: number;
  leftIconColor?: string;
};

export const TextField: FC<Props> = ({
  label,
  numberOfLines = 6,
  error,
  style,
  leftIcon,
  leftIconSize = 16,
  leftIconColor,
  ...props
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const iconColor = leftIconColor || c.textMuted;

  return (
    <View style={[styles.textField, style]}>
      {label && <Text style={[styles.label, { color: c.text }]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: c.card,
            borderColor: error ? c.error : c.border,
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={leftIconSize}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          placeholderTextColor={c.muted}
          style={[
            styles.input,
            {
              color: c.text,
              paddingLeft: leftIcon ? leftIconSize + 20 : 16,
            },
          ]}
          {...props}
        />
      </View>
      {!!error && (
        <Text style={[styles.error, { color: c.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    position: "relative",
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
  },
  leftIcon: {
    position: "absolute",
    left: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
  },
});

export default TextField;
