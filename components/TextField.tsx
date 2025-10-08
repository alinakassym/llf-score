// components/TextField.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  numberOfLines?: number;
};

export const TextField: FC<Props> = ({
  label,
  numberOfLines = 6,
  style,
  ...props
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={styles.textField}>
      {label && <Text style={[styles.label, { color: c.text }]}>{label}</Text>}
      <TextInput
        placeholderTextColor={c.muted}
        style={[
          styles.input,
          {
            color: c.text,
            backgroundColor: c.card,
            borderColor: c.border,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textField: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
});

export default TextField;
