import React, { useState } from 'react';
import { Modal, View, Pressable, Text, FlatList, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label?: string;
};

export function PickerMenu({ value, options, onChange, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 12,
          backgroundColor: '#F2F3F5',
        }}
      >
        <Text style={{ fontWeight: '600' }}>{value}</Text>
        <Ionicons name="chevron-down" size={16} />
      </Pressable>

      <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setOpen(false)} />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: '#fff',
            padding: 14,
            maxHeight: '60%',
          }}
        >
          {label ? <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8 }}>{label}</Text> : null}
          <FlatList
            data={options}
            keyExtractor={(i) => i}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 6,
                  borderRadius: 10,
                  backgroundColor: item === value ? '#F2F3F5' : 'transparent',
                }}
              >
                <Text style={{ fontSize: 16 }}>{item}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          />
          <Pressable onPress={() => setOpen(false)} style={{ alignSelf: 'center', paddingVertical: 10 }}>
            <Text style={{ color: '#666' }}>Отмена</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
