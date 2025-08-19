import React, { useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import {
  Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton,
} from '@/components/ui/drawer';

export type DrawerItem = {
  id: string;
  label: string;
  icon?: any;
};

type Props = {
  items: DrawerItem[];
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  showItemIcon?: boolean;
};

export default function DrawerPicker({
  items, value, onChange, label = 'Выберите', showItemIcon = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => items.find(i => i.id === value) ?? items[0],
    [items, value]
  );

  return (
    <>
      <Pressable
        onPress={() => setOpen(v => !v)}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}
        accessibilityRole="button"
      >
        {showItemIcon && selected?.icon ? (
          <Image source={selected.icon} style={{ width: 18, height: 18, borderRadius: 4, marginRight: 6 }} />
        ) : null}
        <Text style={{ fontWeight: '700' }}>{selected?.label}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} />
      </Pressable>

      <Drawer isOpen={open} onClose={() => setOpen(false)} size="md" anchor="top">
        <DrawerBackdrop onPress={() => setOpen(false)} />
        <DrawerContent style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, overflow: 'hidden' }}>
          <DrawerHeader>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>{label}</Text>
            <DrawerCloseButton onPress={() => setOpen(false)} />
          </DrawerHeader>
          <DrawerBody>
            <View style={{ gap: 8 }}>
              {items.map((it) => {
                const active = it.id === selected?.id;
                return (
                  <Pressable
                    key={it.id}
                    onPress={() => { onChange?.(it.id); setOpen(false); }}
                    style={{
                      flexDirection: 'row', alignItems: 'center', gap: 12,
                      paddingVertical: 10, paddingHorizontal: 6, borderRadius: 10,
                      backgroundColor: active ? '#F2F3F5' : 'transparent',
                    }}
                  >
                    {showItemIcon && it.icon ? (
                      <Image source={it.icon} style={{ width: 28, height: 28, borderRadius: 6 }} />
                    ) : null}
                    <Text style={{ fontSize: 16, fontWeight: active ? '700' : '400' }}>{it.label}</Text>
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
