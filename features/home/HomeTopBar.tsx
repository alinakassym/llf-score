import React, { useState } from 'react';
import { View } from 'react-native';
import IconButton from '@/shared/ui/IconButton';
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
        paddingTop: 52,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderBottomColor: '#ECEDEF',
        borderBottomWidth: 1,
      }}
    >
      
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <PickerMenu value={city} options={CITIES} onChange={setCity} label="Выберите город" />
          <PickerMenu value={league} options={LEAGUES} onChange={setLeague} label="Выберите лигу" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconButton name="search" accessibilityLabel="Поиск" />
          <IconButton name="notifications-outline" dot />
          <IconButton name="person-circle-outline" accessibilityLabel="Профиль" />
        </View>
      </View>
    </View>
  );
}
