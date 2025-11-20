import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const ManagementItemCard: FC<Props> = ({
  title,
  subtitle,
  onEdit,
  onDelete,
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: c.card, borderColor: c.border },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.title, { color: c.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: c.textMuted }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: c.surface }]}
          onPress={onEdit}
        >
          <Ionicons name="pencil" size={16} color={c.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: c.surface }]}
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
