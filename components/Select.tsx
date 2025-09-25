import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { VuesaxIcon } from "./icons";

export type Option = { id: string; label: string };

type Props = {
  value: string;
  onChange: (id: string) => void;
  options: Option[];
  top?: number;
};

export const Select: FC<Props> = ({ value, onChange, options, top = 164 }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((o) => o.id === value),
    [options, value],
  );

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={[styles.button]}>
        <Text numberOfLines={1} style={[styles.buttonText, { color: c.text }]}>
          {selected?.label ?? "Выбрать"}
        </Text>
        <VuesaxIcon name="chevron" size={16} color={c.text} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.sheet,
            {
              backgroundColor: c.background,
              borderColor: c.border,
              top,
            },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = item.id === value;
              return (
                <Pressable
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: pressed
                        ? scheme === "light"
                          ? "#F5F5F5"
                          : "rgba(255,255,255,0.06)"
                        : "transparent",
                    },
                  ]}
                >
                  <Text style={{ color: c.text, fontSize: 14, flex: 1 }}>
                    {item.label}
                  </Text>
                  {isSelected ? (
                    <Text style={{ color: c.primary, fontSize: 16 }}>●</Text>
                  ) : null}
                </Pressable>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={[styles.sep, { backgroundColor: c.border }]} />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  buttonText: { fontSize: 14 },
  backdrop: {
    position: "absolute",
    top: 124,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    maxHeight: "60%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  sep: { height: 1, opacity: 0.6 },
});
