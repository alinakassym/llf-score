import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  description: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export const ManagementCard: FC<Props> = ({
  title,
  description,
  onPress,
  style,
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const content = (
    <>
      <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      <Text style={[styles.description, { color: c.textMuted }]}>
        {description}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, { backgroundColor: c.card }, style]}
        onPress={onPress}
      >
        <View style={styles.content}>
          <View style={{ flex: 1 }}>{content}</View>
          <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.card }, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 12,
  },
});
