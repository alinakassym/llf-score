// shared/ui/DrawerPicker.tsx
import React, { useMemo, useState } from "react";
import { Image, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@/components/ui/drawer";

export type DrawerItem = { id: string; label: string; icon?: any };

type Props = {
  items: DrawerItem[];
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  showItemIcon?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  color?: string;
  backgroundColor?: string;
  chevronColor?: string;
};

export const DrawerPickerSkeleton = ({
  label,
  color = "#111",
  chevronColor = "#000",
}: {
  label: string;
  color?: string;
  chevronColor?: string;
}) => {
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
      <Text style={{ fontWeight: "700", color }}>{label}</Text>
      <Ionicons name="chevron-down" size={16} color={chevronColor} />
    </View>
  );
};

export default function DrawerPicker({
  items,
  value,
  onChange,
  label,
  showItemIcon = true,
  open: openProp,
  onOpenChange,
  color,
  backgroundColor,
  chevronColor,
}: Props) {
  const isControlled = openProp !== undefined;
  const [openUncontrolled, setOpenUncontrolled] = useState(false);
  const open = isControlled ? (openProp as boolean) : openUncontrolled;

  const setOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const v =
      typeof next === "function"
        ? (next as (p: boolean) => boolean)(open)
        : next;
    if (isControlled) onOpenChange?.(v);
    else setOpenUncontrolled(v);
  };

  const selected = useMemo(
    () => items.find((i) => i.id === value) ?? items[0],
    [items, value],
  );

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
          <Image
            source={selected.icon}
            style={{ width: 18, height: 18, borderRadius: 4, marginRight: 6 }}
          />
        ) : null}
        <Text style={{ fontWeight: "700", color }}>{selected?.label}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={chevronColor}
        />
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
            backgroundColor,
            paddingHorizontal: 0,
          }}
        >
          {label && (
            <DrawerHeader style={{ paddingTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color }}>
                {label}
              </Text>
              <DrawerCloseButton onPress={() => setOpen(false)}>
                <Ionicons name="close" size={24} color={chevronColor} />
              </DrawerCloseButton>
            </DrawerHeader>
          )}
          <DrawerBody style={{ margin: 0 }}>
            <View style={{ margin: 0 }}>
              {items.map((it, index) => {
                const active = it.id === selected?.id;
                return (
                  <React.Fragment key={it.id}>
                    <Pressable
                      onPress={() => {
                        onChange?.(it.id);
                        setOpen(false);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        padding: 16,
                        backgroundColor: active ? "#a8a8a8" : "transparent",
                      }}
                    >
                      {showItemIcon && it.icon ? (
                        <Image
                          source={it.icon}
                          style={{ width: 28, height: 28, borderRadius: 6 }}
                        />
                      ) : null}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: active ? "700" : "400",
                          color,
                        }}
                      >
                        {it.label}
                      </Text>
                    </Pressable>
                    {index + 1 < items.length && <Divider />}
                  </React.Fragment>
                );
              })}
            </View>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
