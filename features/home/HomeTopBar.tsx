import React, { useState } from 'react';
import { View } from 'react-native';
import IconButton from '@/shared/ui/IconButton';
import CityPicker from '@/features/home/CityPicker';
import LeaguePicker from '@/features/home/LeaguePicker';

export default function HomeTopBar() {
  const [cityId, setCityId] = useState<string>();
  const [leagueId, setLeagueId] = useState<string>('pl');

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12, backgroundColor: '#fff', borderBottomColor: '#ECEDEF', borderBottomWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <CityPicker value={cityId} onChange={setCityId} />
          <LeaguePicker value={leagueId} onChange={setLeagueId} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconButton name="search" accessibilityLabel="Поиск" />
          <IconButton name="notifications-outline" dot accessibilityLabel="Уведомления" />
          <IconButton name="person-circle-outline" accessibilityLabel="Профиль" />
        </View>
      </View>
    </View>
  );
}
