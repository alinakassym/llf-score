import React, { useMemo, useState } from 'react';
import { Pressable, View, ImageSourcePropType } from "react-native";
import { Image } from "@/components/ui/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@/components/ui/drawer";

import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type DrawerItem = {
  id: string;
  label: string;
  icon?: ImageSourcePropType;
};

type Props = {
  items: DrawerItem[];
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  showItemIcon?: boolean;
};

export const DrawerPickerSkeleton = ({ label }: { label: string }) => {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 6,
      }}
      accessibilityRole="button"
    >
      <Text style={{ fontWeight: "700", color: colors.text }}>{label}</Text>
      <Ionicons name="chevron-down" size={16} />
    </View>
  );
};

export default function DrawerPicker({
  items,
  value,
  onChange,
  label,
  showItemIcon = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => items.find((i) => i.id === value) ?? items[0],
    [items, value],
  );

  const { colors } = useAppTheme();

  return (
    <>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 6,
        }}
        accessibilityRole="button"
      >
        {showItemIcon && selected?.icon ? (
          <Image source={selected.icon} size="2xs" />
        ) : null}
        <Text style={{ fontWeight: "700", color: colors.text }}>
          {selected?.label}
        </Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} />
      </Pressable>

      <Drawer
        style={{ marginTop: 101 }}
        isOpen={open}
        onClose={() => setOpen(false)}
        size="auto"
        anchor="top"
      >
        <DrawerBackdrop onPress={() => setOpen(false)} />
        <DrawerContent
          style={{
            paddingVertical: 0,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            overflow: "hidden",
          }}
        >
          {label && (
            <DrawerHeader style={{ paddingTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>{label}</Text>
              <DrawerCloseButton onPress={() => setOpen(false)}>
                <Ionicons name="close" size={24} />
              </DrawerCloseButton>
            </DrawerHeader>
          )}
          <DrawerBody>
            <View style={{ gap: 8 }}>
              {items.map((it) => {
                const active = it.id === selected?.id;
                return (
                  <Pressable
                    key={it.id}
                    onPress={() => {
                      onChange?.(it.id);
                      setOpen(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 6,
                      borderRadius: 10,
                      backgroundColor: active ? "#F2F3F5" : "transparent",
                    }}
                  >
                    {showItemIcon && it.icon ? (
                      <Image source={it.icon} size="sm" />
                    ) : null}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: active ? "700" : "400",
                      }}
                    >
                      {it.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
