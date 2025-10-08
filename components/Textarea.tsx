import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  numberOfLines?: number;
};

export const Textarea: FC<Props> = ({
  numberOfLines = 6,
  style,
  ...props
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <TextInput
      multiline
      numberOfLines={numberOfLines}
      textAlignVertical="top"
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
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
});

export default Textarea;
