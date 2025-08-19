import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';          // можно заменить на RN Text, если хочешь
import { PickerMenu } from '@/shared/ui/PickerMenu';

const CITIES = ['Астана', 'Алматы', 'Шымкент', 'Актобе'];
const LEAGUES = ['Премьер лига', 'Первая лига', 'Кубок'];

export default function HomeTopBar() {
  const [city, setCity] = useState(CITIES[0]);
  const [league, setLeague] = useState(LEAGUES[0]);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderBottomColor: '#ECEDEF',
        borderBottomWidth: 1, // вместо теней — аккуратная разделительная линия
      }}
    >
      {/* 1. Ряд с селекторами */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <PickerMenu value={city} options={CITIES} onChange={setCity} label="Выберите город" />
          <PickerMenu value={league} options={LEAGUES} onChange={setLeague} label="Выберите лигу" />
        </View>

        {/* 2. Иконки справа (без функционала пока) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconBtn name="search" />
          <IconBtn name="notifications-outline" dot /> {/* красная точка как в макете */}
          <IconBtn name="person-circle-outline" />
        </View>
      </View>
    </View>
  );
}

function IconBtn({ name, dot }: { name: React.ComponentProps<typeof Ionicons>['name']; dot?: boolean }) {
  return (
    <Pressable
      onPress={() => {}}
      style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', position: 'relative' }}
    >
      <Ionicons name={name} size={22} />
      {dot ? (
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: 10,
            backgroundColor: '#FF3B30',
          }}
        />
      ) : null}
    </Pressable>
  );
}
